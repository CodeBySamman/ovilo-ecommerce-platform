"use client";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSession, signOut } from "next-auth/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [showdropdown, setShowdropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const searchHandler = (e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/categoryResults/${search.trim()}`);
    }
  };

  return (
    <nav className="bg-[#1E3A8A] text-white shadow-md sticky top-0 z-[300]">
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 lg:px-6 py-4 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl lg:text-4xl font-bold text-[#FFFFFF] whitespace-nowrap"
        >
          <span className="text-[#FBBF24]">O</span>vilo
        </Link>

        {/* Desktop Menu Trigger */}
        <div className="relative">
          <button
            onBlur={() => {
              setTimeout(() => {
                setOpen(false);
              }, 300);
            }}
            className="text-3xl"
          >
            {open ? (
              <RxCross2 onClick={() => setOpen(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setOpen(true)} />
            )}
          </button>

          {/* List return */}
          {open && (
            <div className="absolute cursor-pointer top-14 right-0 bg-white text-black shadow-md rounded-lg z-[110] hidden md:flex border border-gray-200 flex-col gap-4 py-6 px-8 min-w-[180px]">
              <button onClick={() => router.push("/")}>Home</button>
              <button onClick={() => router.push("/products2")}>
                Products
              </button>
              <button onClick={() => router.push("/categories2")}>
                Categories
              </button>
              <button onClick={() => router.push("/deals")}>Deals</button>
              <button onClick={() => router.push("/contact")}>Contact</button>
            </div>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={searchHandler}
            placeholder="Search by category..."
            className="
        w-52
        lg:w-72
        xl:w-80
        border-2
        border-gray-400
        rounded-full
        px-4
        py-2
        text-white
        outline-0
        "
          />

          <Link href="/cart" className="relative text-2xl shrink-0">
            <FiShoppingCart className="text-3xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              2
            </span>
          </Link>

          {session && (
            <div className="relative">
              <button
                onClick={() => setShowdropdown(!showdropdown)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowdropdown(false);
                  }, 300);
                }}
                className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md whitespace-nowrap"
              >
                👤 {session.user.name || "User"}
                {showdropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>

              {showdropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-44 z-[9999]">
                  {" "}
                  <ul className="text-sm">
                    <button
                      onClick={() => router.push("/admin/dashboard")}
                      className="cursor-pointer block w-full text-left px-4 py-2 text-black"
                    >
                      Dashboard
                    </button>
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-300 text-red-500"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {!session && (
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 whitespace-nowrap"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-white">
            <span className="text-[#FBBF24]">O</span>vilo
          </Link>

          {/* Menu togle */}
          <button onClick={() => setOpen2(!open2)} className="text-3xl">
            {open2 ? <RxCross2 /> : <GiHamburgerMenu />}
          </button>
        </div>

        {open2 && (
          <div className="mt-4 flex flex-col gap-4 cursor-pointer">
            {/* input section */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={searchHandler}
              placeholder="Search by category..."
              className="
          w-full
          border
          border-gray-400
          rounded-full
          px-4
          py-2
          bg-transparent
          text-white
          "
            />

            <button onClick={() => router.push("/")}>Home</button>
            <button onClick={() => router.push("/products2")}>Products</button>
            <button onClick={() => router.push("/categories2")}>
              Categories
            </button>
            <button onClick={() => router.push("/deals")}>Deals</button>
            <button onClick={() => router.push("/contact")}>Contact</button>

            <Link href="/cart" className="flex items-center gap-2">
              <FiShoppingCart />
              Cart
            </Link>

            {session ? (
              <div className="border border-gray-600 rounded-lg p-3">
                <button
                  onClick={() => setShowdropdown(!showdropdown)}
                    onBlur={() => {
                  setTimeout(() => {
                    setShowdropdown(false);
                  }, 300);
                }}
                  className="flex items-center justify-between w-full"
                >
                  <span>👤 {session.user.name}</span>

                  {showdropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>

                {showdropdown && (
                  <div className="mt-3 flex flex-col gap-2">
                    <button
                      onClick={() => router.push("/admin/dashboard")}
                      className="bg-white text-black px-3 py-2 rounded"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={() => signOut()}
                      className="bg-red-500 py-2 rounded"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-600 text-center py-2 rounded-full"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
