import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import "../MyNavbar/index.css";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

export default function MyNavbar() {
  const location = useLocation();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  }

  return (
    <>
      <Disclosure as="nav" className="my-navbar shadow-xl sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-[1262px] py-1 px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center">
                <div className="flex items-center w-full justify-between">
                  <Link
                    className={`  ${location.pathname === "/" ? "active" : ""
                      } text-3xl font-semibold font-primary flex items-center justify-between gap-x-2`}
                    to="/"
                  >
                    <img
                      className="h-10 rounded w-auto navbar-logo"
                      src="/assets/logo.jpeg"
                      alt="logo"
                    />
                    <h1>AI Chef Master</h1>
                  </Link>
                  <div className="hidden sm:block">
                    <div className="flex self-start space-x-4 ">
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        to="/"
                        className={`nav-link ${location.pathname === "/" ? "active" : ""
                          } rounded-md px-3 py-2 text-sm font-medium bg-[#00544f]`}
                      >
                        Home
                      </Link>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        to="/product"
                        className={`nav-link ${location.pathname === "/product" ? "active" : ""
                          } rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        Product
                      </Link>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        to="/career"
                        className={`nav-link ${location.pathname === "/career" ? "active" : ""
                          } rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        Career
                      </Link>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        to="/company"
                        className={`nav-link ${location.pathname === "/company" ? "active" : ""
                          } rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        Company
                      </Link>
                      {user ? (
                        <button
                          onClick={handleLogout}
                          className={`nav-link rounded-md px-3 py-2 text-sm font-medium`}
                        >
                          Logout
                        </button>
                      ) : (
                        <Link
                          onClick={() => window.scrollTo(0, 0)}
                          to="/login"
                          className={`nav-link ${location.pathname === "/login" ? "active" : ""
                            } rounded-md px-3 py-2 text-sm font-medium`}
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="sm:hidden">
                    <Disclosure.Button className="text-black font-extrabold p-2" onClick={() => setIsOpen(!open)}>
                      {isOpen ? (
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            {isOpen && (
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setIsOpen(false);
                    }}
                    to="/"
                    className={`nav-link ${location.pathname === "/" ? "active" : ""
                      } rounded-md px-3 py-2 text-sm font-medium bg-[#00544f]`}
                  >
                    Home
                  </Link>
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setIsOpen(false);
                    }}
                    to="/product"
                    className={`nav-link ${location.pathname === "/product" ? "active" : ""
                      } rounded-md px-3 py-2 text-sm font-medium`}
                  >
                    Product
                  </Link>
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setIsOpen(false);
                    }}
                    to="/career"
                    className={`nav-link ${location.pathname === "/career" ? "active" : ""
                      } rounded-md px-3 py-2 text-sm font-medium`}
                  >
                    Career
                  </Link>
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setIsOpen(false);
                    }}
                    to="/company"
                    className={`nav-link ${location.pathname === "/company" ? "active" : ""
                      } rounded-md px-3 py-2 text-sm font-medium`}
                  >
                    Company
                  </Link>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className={`w-full nav-link rounded-md px-3 py-2 text-sm font-medium text-start`}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    </>
  );
}
