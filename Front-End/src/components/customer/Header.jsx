import { ChevronDownIcon, User } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function DropDown() {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-full group bg-white/10 hover:bg-white/20">
            <User className="w-6 h-6" />
            <ChevronDownIcon className="w-4 h-4" />
          </MenuButton>
        </div>

        <MenuItems className="absolute right-0 z-10 w-56 py-2 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => {
                  localStorage.removeItem("userId");
                  localStorage.clear();
                  navigate("/home");
                }}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  active ? "bg-red-50 text-red-700" : "text-gray-700"
                }`}
              >
                Sign out
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => {
                  navigate("/home");
                }}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  active ? "bg-red-50 text-red-700" : "text-gray-700"
                }`}
              >
                Go to Home Page
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    );
  }

  return (
    <header className="relative z-10 shadow-lg bg-emerald-600">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white">Customer Dashboard</h1>
        <DropDown />
      </div>
    </header>
  );
}

export default Header;
