exports.up = function(knex) {
  return knex.schema
    // Users table
    .createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('username').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password'); // Can be null for OAuth users
      table.string('mobile_number');
      table.boolean('mobile_verified').defaultTo(false);
      table.string('profile_picture');
      table.text('bio');
      table.boolean('is_youtuber').defaultTo(false);
      table.boolean('is_verified').defaultTo(false);
      table.boolean('is_private').defaultTo(false);
      table.jsonb('oauth_providers').defaultTo('[]'); // ['google', 'github']
      table.string('github_username');
      table.integer('profile_views').defaultTo(0);
      table.date('joined_date').defaultTo(knex.fn.now());
      table.timestamps(true, true);
    })
    
    // Courses table (converted YouTube playlists)
    .createTable('courses', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('youtube_playlist_id').unique().notNullable();
      table.string('title').notNullable();
      table.text('description');
      table.string('thumbnail');
      table.string('channel_name');
      table.string('channel_id');
      table.uuid('creator_id').references('id').inTable('users').onDelete('SET NULL');
      table.integer('total_duration'); // in seconds
      table.integer('chapter_count').defaultTo(0);
      table.jsonb('tags').defaultTo('[]');
      table.boolean('is_educational').defaultTo(true);
      table.timestamps(true, true);
    })
    
    // Chapters table (video segments based on timestamps)
    .createTable('chapters', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('course_id').references('id').inTable('courses').onDelete('CASCADE');
      table.string('youtube_video_id').notNullable();
      table.string('title').notNullable();
      table.text('description');
      table.integer('order_index').notNullable();
      table.integer('start_time').notNullable(); // in seconds
      table.integer('end_time').notNullable(); // in seconds
      table.integer('duration').notNullable(); // in seconds
      table.string('thumbnail');
      table.jsonb('exercise_links').defaultTo('[]');
      table.jsonb('quiz_data'); // Generated by Gemini API
      table.timestamps(true, true);
    })
    
    // User progress tracking
    .createTable('user_progress', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('course_id').references('id').inTable('courses').onDelete('CASCADE');
      table.uuid('chapter_id').references('id').inTable('chapters').onDelete('CASCADE');
      table.integer('progress_seconds').defaultTo(0); // Current position in video
      table.boolean('completed').defaultTo(false);
      table.timestamp('last_watched_at');
      table.timestamps(true, true);
      table.unique(['user_id', 'chapter_id']);
    })
    
    // User streaks and activity
    .createTable('user_activity', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.date('activity_date').notNullable();
      table.integer('minutes_watched').defaultTo(0);
      table.integer('chapters_completed').defaultTo(0);
      table.timestamps(true, true);
      table.unique(['user_id', 'activity_date']);
    })
    
    // User certificates
    .createTable('certificates', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('course_id').references('id').inTable('courses').onDelete('CASCADE');
      table.string('certificate_number').unique().notNullable();
      table.string('user_display_name').notNullable();
      table.timestamp('issued_at').defaultTo(knex.fn.now());
      table.string('certificate_url');
      table.timestamps(true, true);
    })
    
    // Community posts
    .createTable('community_posts', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('author_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('course_id').references('id').inTable('courses').onDelete('CASCADE');
      table.uuid('chapter_id').references('id').inTable('chapters').onDelete('CASCADE');
      table.text('content').notNullable();
      table.boolean('is_educational').defaultTo(true);
      table.integer('likes_count').defaultTo(0);
      table.integer('replies_count').defaultTo(0);
      table.timestamps(true, true);
    })
    
    // Community replies
    .createTable('community_replies', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('post_id').references('id').inTable('community_posts').onDelete('CASCADE');
      table.uuid('author_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('parent_reply_id').references('id').inTable('community_replies').onDelete('CASCADE');
      table.text('content').notNullable();
      table.boolean('is_educational').defaultTo(true);
      table.integer('likes_count').defaultTo(0);
      table.timestamps(true, true);
    })
    
    // User follows
    .createTable('user_follows', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('follower_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('following_id').references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
      table.unique(['follower_id', 'following_id']);
    })
    
    // Private messages
    .createTable('private_messages', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('sender_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('receiver_id').references('id').inTable('users').onDelete('CASCADE');
      table.text('encrypted_content').notNullable(); // Encrypted message
      table.boolean('is_read').defaultTo(false);
      table.timestamp('read_at');
      table.timestamps(true, true);
    })
    
    // Watch sessions (for synced watching)
    .createTable('watch_sessions', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('host_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('guest_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('video_url').notNullable();
      table.integer('current_time').defaultTo(0);
      table.boolean('is_playing').defaultTo(false);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    
    // Notifications
    .createTable('notifications', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.enum('type', ['follow', 'message', 'reply', 'post', 'achievement']).notNullable();
      table.jsonb('data').notNullable();
      table.boolean('is_read').defaultTo(false);
      table.boolean('email_sent').defaultTo(false);
      table.timestamps(true, true);
    })
    
    // User preferences
    .createTable('user_preferences', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.boolean('email_on_follow').defaultTo(true);
      table.boolean('email_on_message').defaultTo(true);
      table.boolean('email_on_reply').defaultTo(true);
      table.boolean('email_on_post').defaultTo(false);
      table.boolean('autoplay_videos').defaultTo(true);
      table.string('preferred_language').defaultTo('en');
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_preferences')
    .dropTableIfExists('notifications')
    .dropTableIfExists('watch_sessions')
    .dropTableIfExists('private_messages')
    .dropTableIfExists('user_follows')
    .dropTableIfExists('community_replies')
    .dropTableIfExists('community_posts')
    .dropTableIfExists('certificates')
    .dropTableIfExists('user_activity')
    .dropTableIfExists('user_progress')
    .dropTableIfExists('chapters')
    .dropTableIfExists('courses')
    .dropTableIfExists('users');
};