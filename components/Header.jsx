"use client";

import Link from "next/link";
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding } from "react-icons/fa";
import Logo from "./Logo";
import destroySession from "@/app/services/destroySession";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/authContext";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    const { success, error } = await destroySession();
    if (success) {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      toast.error(error);
    }
  };

  return (
    <header className="bg-neutral-100	">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
            {/* Big Screen Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/cars"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-neutral-700 hover:text-white"
                >
                  Cars
                </Link>
                {/* Logged In Only */}
                {isAuthenticated && (
                  <>
                    <Link
                      href="/rented"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-neutral-700 hover:text-white"
                    >
                      Rented
                    </Link>
                    <Link
                      href="/cars/add"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-neutral-700 hover:text-white"
                    >
                      Add Car
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Right Side Menu */}
          <div className="ml-auto">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Logged Out Only */}
              {!isAuthenticated && (
                <>
                  <Link
                    href="/login"
                    className="mr-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaSignInAlt className="inline mr-1" /> Login
                  </Link>
                  <Link
                    href="/register"
                    className="mr-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaUser className="inline mr-1" />
                    Register
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Link href="/cars/my">
                    <FaBuilding className="inline mr-1" /> My Cars
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mx-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaSignOutAlt className="inline mr-1" />
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            href="/cars"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
          >
            Cars
          </Link>
          {/* Logged In Only */}
          {isAuthenticated && (
            <>
              <Link
                href="/rented"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
              >
                Rented
              </Link>
              <Link
                href="/cars/add"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
              >
                Add Car
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
