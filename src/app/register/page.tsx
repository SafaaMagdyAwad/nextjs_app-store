'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
//call backend
    if (!res.ok) {
      setError('Registration failed. Please try again.');
      return;
    }
    if (res.ok) {
      // Auto-login after registration
      await signIn('credentials', {
        email: form.email.value,
        password: form.password.value,
        callbackUrl: '/',
      });
    } else {
      const data = await res.json();
      setError(data.message || 'Registration failed');
    }
  }
//api    
  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
