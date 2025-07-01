"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("Login failed: Invalid credentials");
    } else {
      window.location.href = "/";
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border my-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border my-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-2 w-full">
        Login
      </button>

      <button
        type="button"
        onClick={() => signIn("facebook", { callbackUrl: "/" })}
        className="bg-blue-800 text-white px-4 py-2 mt-2 w-full"
      >
        Login with Facebook
      </button>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-red-600 text-white px-4 py-2 mt-2 w-full"
      >
        Login with Google
      </button>

      <p className="text-sm mt-4 text-center">
        Don’t have an account?
        <Link href="/register" className="text-blue-500 underline">
          Register
        </Link>
      </p>
    </form>
  );
}
