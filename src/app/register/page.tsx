'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

   async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;
    const gender = (form.elements.namedItem('gender') as HTMLSelectElement)?.value;

    try {
      const res = await fetch('https://fakestoreapi.com/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          gender,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Registration failed. Please try again.');
        return;
      }

      // create session for this user
      const signInRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      redirect('/'); 
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input name="name" type="text" placeholder="Name" required className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="w-full p-2 border rounded" />
        <select name="gender" required className="w-full p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
