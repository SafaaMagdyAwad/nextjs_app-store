import Image from "next/image";
import NavbarLink from './NavbarLink';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Navbar() {
    const session = await getServerSession(authOptions);
  // console.log("Session in Navbar:", session);
  
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">
        <Image
          src="/icon.png"
          alt="Logo"
          width={40}
          height={40}
        />
      </div>
      <ul className="flex space-x-4">
        <NavbarLink  session={session} />
      </ul>
    </nav>
  );
}
