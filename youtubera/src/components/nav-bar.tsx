'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 border-b border-gray-200 dark:border-gray-700">
      <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Youtubera
      </Link>
      {status === 'loading' ? null : session ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">Hi, {session.user?.name ?? 'User'}</span>
          <button
            onClick={() => signOut()}
            className="text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Sign in
        </button>
      )}
    </nav>
  );
}