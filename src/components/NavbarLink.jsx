"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLink() {
  const navbarItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    {
      name: "Categories",
      href: "#",
      subItems: [
        { name: "Furniture", href: "/categories/furniture" },
        { name: "Smartphones", href: "/categories/smartphones" }
      ]
    },
  ];

  const path = usePathname();

  return (
    <ul className="flex gap-4">
      {navbarItems.map(({ name, href, subItems }) => (
        <li key={name} className="relative group">
          <Link
            href={href}
            className={`hover:underline ${
              path === href ? "text-blue-600 font-bold" : ""
            }`}
          >
            {name}
          </Link>

          {subItems && (
            <ul className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded p-2 z-10">
              {subItems.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
