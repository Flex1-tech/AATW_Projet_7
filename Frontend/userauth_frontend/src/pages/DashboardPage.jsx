import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Components & Assets
import HeadingLogo from "../components/HeadingLogo";
import Loader from "../components/Loader";
import Logo from "../assets/logo.svg";
import { HeadingIcon, LogOut } from "lucide-react";

function DashboardPage() {
  // -------------------------
  // State Management
  // -------------------------
  const [userData, setUserData] = useState(null); // store user info
  const [sidebarOpen, setSidebarOpen] = useState(false); // toggle sidebar
  const [userMenuOpen, setUserMenuOpen] = useState(false); // toggle user dropdown

  const location = useLocation();
  const token = location.state?.token; // get token from previous page

  // -------------------------
  // Helper function: Format date/time
  // -------------------------
  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    const dateStr = date.toLocaleDateString("en-GB"); // DD/MM/YYYY
    const timeStr = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); // HH:MM
    return `${dateStr} ${timeStr}`;
  };

  // -------------------------
  // Logout function
  // -------------------------
  const logout = async () => {
    console.log("Logout started...");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        console.log("Logout successful (token revoked on backend)");
      } else {
        console.warn("Logout request returned non-OK status:", response.status);
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      // Clear local/session storage
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      console.log("Local tokens cleared");
    }
  };

  // -------------------------
  // Fetch user data on component mount
  // -------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, [token]);

  // -------------------------
  // Show loader while fetching data
  // -------------------------
  if (!userData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader />
      </div>
    );
  }

  // -------------------------
  // JSX: Render
  // -------------------------
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-neutral-primary-soft border-b border-default">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">

            {/* Left side: Sidebar toggle & welcome */}
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="sm:hidden text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                {/* Hamburger icon */}
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M5 7h14M5 12h14M5 17h10"
                  />
                </svg>
              </button>
              <span className="text-20 font-bold">Bienvenue {userData.nom}</span>
            </div>

            {/* User dropdown menu */}
            <div className="flex items-center">
              <div className="flex items-center ms-3 relative">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-60 z-[300] bg-white border border-default-medium rounded-lg shadow-lg w-44">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-default-medium">
                      <p className="text-sm font-medium text-heading">{userData.nom} {userData.prenom}</p>
                      <p className="text-sm text-body truncate">{userData.email}</p>
                    </div>
                    {/* Menu items */}
                    <ul className="p-2 text-sm text-body font-medium">
                      <li className="hover:bg-gray-200 rounded-md">
                        <span className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                          Dashboard
                        </span>
                      </li>
                      <li className="hover:bg-gray-200 rounded-md">
                        <span className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                          Deconnexion
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="top-bar-sidebar"
        className={`fixed top-[67px] left-0 z-40 w-64 h-full transition-transform sm:translate-x-0 bg-white border-e border-default ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Logo */}
          <a href="#" className="flex items-center ps-2.5 mb-5 gap-2">
            <HeadingLogo size="w-8 h-8" logo={Logo} />
            <span className="self-center text-lg text-heading font-semibold whitespace-nowrap">UserAuth</span>
          </a>

          {/* Menu Items */}
          <ul className="space-y-2 font-medium">
            <li className="rounded-md flex flex-col gap-2">
              {/* Dashboard Link */}
              <span className="cursor-pointer hover:bg-gray-200 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg
                  className="w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </span>

              {/* Logout Link */}
              <Link to="/loginPage" onClick={logout} className="hover:h-full cursor-pointer">
                <span className="flex hover:bg-gray-200 py-[6px]">
                  <LogOut size={20} className="ml-2" />
                  <span className="ms-3">Deconnection</span>
                </span>
              </Link>
            </li>
            {/* Additional menus can be added here */}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64 mt-14">
        <h2 className="text-lg font-semibold mb-4">Sessions</h2>
        <div className="space-y-4">
          {userData.sessions.map((session) => (
            <div key={session.id} className="border rounded-lg p-4 bg-neutral-secondary-soft">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-medium">ID:</span>
                <span className="bg-gray-200 px-2 py-1 rounded">{session.id}</span>

                <span className="font-medium">Country:</span>
                <span className="bg-gray-200 px-2 py-1 rounded">{session.country ?? "Not found"}</span>

                <span className="font-medium">Start:</span>
                <span className="bg-gray-200 px-2 py-1 rounded">{formatDateTime(session.login_at)}</span>

                <span className="font-medium">End:</span>
                <span className="bg-gray-200 px-2 py-1 rounded">{formatDateTime(session.logout_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
