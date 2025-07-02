import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {session ? (
        <div className=" p-6 rounded-lg shadow-md text-center">
          <Image
            src={session.user?.image || "/default-profile.png"}
            alt={session.user?.name || "Profile"}
            width={96}
            height={96}
            className="rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{session.user?.name}</h2>
          <p className="text-gray-600">{session.user?.email}</p>
          <Link href="/orderHistory">Order History</Link>
        </div>
      ) : (
        <p className="text-gray-500">You are not logged in.</p>
      )}
    </div>
  );
}
