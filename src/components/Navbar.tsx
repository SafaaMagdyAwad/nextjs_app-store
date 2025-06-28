import Image from "next/image";
import NavbarLink from './NavbarLink'
export default function Navbar() {
  
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
        <NavbarLink />
      </ul>
    </nav>
  );
}
