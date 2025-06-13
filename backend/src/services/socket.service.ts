import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  username?: string;
}

// Store active users and their socket connections
const activeUsers = new Map<string, Set<string>>(); // userId -> Set of socketIds
const socketToUser = new Map<string, string>(); // socketId -> userId

export const initializeSocket = (io: Server) => {
  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      socket.userId = decoded.userId;
      socket.username = decoded.username;
      
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.username} connected`);

    // Add user to active users
    if (socket.userId) {
      if (!activeUsers.has(socket.userId)) {
        activeUsers.set(socket.userId, new Set());
      }
      activeUsers.get(socket.userId)!.add(socket.id);
      socketToUser.set(socket.id, socket.userId);

      // Join user's personal room
      socket.join(`user:${socket.userId}`);

      // Emit online status
      socket.broadcast.emit('user:online', {
        userId: socket.userId,
        username: socket.username,
      });
    }

    // Handle joining course/chapter rooms for community features
    socket.on('join:course', (courseId: string) => {
      socket.join(`course:${courseId}`);
    });

    socket.on('join:chapter', (chapterId: string) => {
      socket.join(`chapter:${chapterId}`);
    });

    // Handle private messages
    socket.on('message:send', async (data: {
      receiverId: string;
      encryptedContent: string;
    }) => {
      try {
        // Save message to database
        const [message] = await db('private_messages')
          .insert({
            sender_id: socket.userId,
            receiver_id: data.receiverId,
            encrypted_content: data.encryptedContent,
          })
          .returning('*');

        // Send to receiver if online
        io.to(`user:${data.receiverId}`).emit('message:receive', {
          id: message.id,
          senderId: socket.userId,
          senderUsername: socket.username,
          encryptedContent: data.encryptedContent,
          createdAt: message.created_at,
        });

        // Send confirmation to sender
        socket.emit('message:sent', {
          id: message.id,
          tempId: data.tempId,
        });

        // Create notification
        await db('notifications').insert({
          user_id: data.receiverId,
          type: 'message',
          data: JSON.stringify({
            senderId: socket.userId,
            senderUsername: socket.username,
            messageId: message.id,
          }),
        });
      } catch (error) {
        socket.emit('message:error', {
          tempId: data.tempId,
          error: 'Failed to send message',
        });
      }
    });

    // Handle typing indicators
    socket.on('typing:start', (data: { receiverId: string }) => {
      io.to(`user:${data.receiverId}`).emit('typing:update', {
        userId: socket.userId,
        username: socket.username,
        isTyping: true,
      });
    });

    socket.on('typing:stop', (data: { receiverId: string }) => {
      io.to(`user:${data.receiverId}`).emit('typing:update', {
        userId: socket.userId,
        username: socket.username,
        isTyping: false,
      });
    });

    // Handle watch together sessions
    socket.on('watch:create', async (data: {
      guestId: string;
      videoUrl: string;
    }) => {
      try {
        const [session] = await db('watch_sessions')
          .insert({
            host_id: socket.userId,
            guest_id: data.guestId,
            video_url: data.videoUrl,
          })
          .returning('*');

        // Notify guest
        io.to(`user:${data.guestId}`).emit('watch:invite', {
          sessionId: session.id,
          hostId: socket.userId,
          hostUsername: socket.username,
          videoUrl: data.videoUrl,
        });

        socket.emit('watch:created', {
          sessionId: session.id,
        });
      } catch (error) {
        socket.emit('watch:error', 'Failed to create watch session');
      }
    });

    socket.on('watch:sync', async (data: {
      sessionId: string;
      currentTime: number;
      isPlaying: boolean;
    }) => {
      try {
        // Update session in database
        await db('watch_sessions')
          .where('id', data.sessionId)
          .update({
            current_time: data.currentTime,
            is_playing: data.isPlaying,
          });

        // Get session details
        const session = await db('watch_sessions')
          .where('id', data.sessionId)
          .first();

        if (session) {
          // Sync with other participant
          const otherUserId = session.host_id === socket.userId 
            ? session.guest_id 
            : session.host_id;

          io.to(`user:${otherUserId}`).emit('watch:update', {
            sessionId: data.sessionId,
            currentTime: data.currentTime,
            isPlaying: data.isPlaying,
          });
        }
      } catch (error) {
        socket.emit('watch:error', 'Failed to sync watch session');
      }
    });

    // Handle community posts
    socket.on('post:create', async (data: {
      courseId?: string;
      chapterId?: string;
      content: string;
    }) => {
      try {
        const [post] = await db('community_posts')
          .insert({
            author_id: socket.userId,
            course_id: data.courseId,
            chapter_id: data.chapterId,
            content: data.content,
          })
          .returning('*');

        const postWithAuthor = {
          ...post,
          author: {
            id: socket.userId,
            username: socket.username,
          },
        };

        // Emit to relevant rooms
        if (data.chapterId) {
          io.to(`chapter:${data.chapterId}`).emit('post:new', postWithAuthor);
        } else if (data.courseId) {
          io.to(`course:${data.courseId}`).emit('post:new', postWithAuthor);
        }
      } catch (error) {
        socket.emit('post:error', 'Failed to create post');
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User ${socket.username} disconnected`);

      if (socket.userId) {
        // Remove from active users
        const userSockets = activeUsers.get(socket.userId);
        if (userSockets) {
          userSockets.delete(socket.id);
          if (userSockets.size === 0) {
            activeUsers.delete(socket.userId);
            
            // Emit offline status
            socket.broadcast.emit('user:offline', {
              userId: socket.userId,
              username: socket.username,
            });
          }
        }
        socketToUser.delete(socket.id);
      }
    });
  });
};

// Helper function to check if user is online
export const isUserOnline = (userId: string): boolean => {
  return activeUsers.has(userId);
};

// Helper function to get user's socket IDs
export const getUserSockets = (userId: string): string[] => {
  return Array.from(activeUsers.get(userId) || []);
};