import { Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Donate", href: "/donate" },
];

export default function Navbar() {
  return (
    <Menu as="nav" className="sticky z-30 transition ease-out duration-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto">
            <div className="relative flex items-center justify-between h-16 border-b">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Menu.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Menu.Button>
              </div>
              <div className="flex-1 flex items-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 mr-4 inline-flex  items-center">
                  <Link href="/">
                    <a
                      className="inline-flex lg:hidden w-auto"
                      rel="noreferrer"
                    >
                      We Rise Together
                    </a>
                  </Link>
                  <Link href="/">
                    <a
                      className="hidden font-semibold lg:inline-flex"
                      rel="noreferrer"
                    >
                      We Rise Together
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6 absolute right-0 self-center">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a className=" text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="sm:hidden">
              <div className="origin-top-right absolute w-full p-1 right-0 rounded-b-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {navigation.map((item) => (
                  <Menu.Item key={item.name} className="static">
                    <Link href={item.href}>
                      <a
                        className="block text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-4 rounded-md text-sm font-medium"
                        rel="noreferrer"
                      >
                        {item.name}
                      </a>
                    </Link>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
