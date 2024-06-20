'use client'

import { ListFilter, Plus, Search } from "lucide-react";
import Logo from "../../public/tinylist.png";
import { Button } from "./ui/button";
import { useState, useRef, useEffect } from "react";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { useRouter } from "next/router";

interface HeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ setSearchQuery }: HeaderProps) => {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [user, setUser] = useState<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userDetails = localStorage.getItem("UserDetails");
      if (userDetails) {
        try {
          const parsedUser = JSON.parse(userDetails);
          setUser(parsedUser);
          // console.log("current user:", parsedUser);
        } catch (error) {
          console.error("Error parsing user details from localStorage:", error);
        }
      }
    }
  }, []);

  const currentTime = new Date();
  const time = currentTime.getHours();
  const getCurrentGreeting = () => {
    if (time < 12) {
      return "Morning";
    } else if (time >= 12 && time < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("UserDetails");
    router.push("/auth/login")
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <Image src={Logo} alt="Logo" width={160} height={70} />
        {/* button */}
        <div>
          {!user ? (
            <Button onClick={() => router.push("/auth/login")}>
              SignIn / SignUp
            </Button>
          ) : (
            <Button onClick={handleLogout} className="bg-red-500">
              Logout
            </Button>
          )}

        </div>
      </div>
      {/* Message- Searchbar */}
      <div className="flex sm:justify-between sm:flex-row flex-col sm:gap-0 gap-4">
        {/* Display user name if available */}
        {user ? (
          <h2 className="font-semibold text-3xl">
            Hello, Good {getCurrentGreeting()}, {user.name}
          </h2>
        ) : <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-3xl">
            Hello, Good {getCurrentGreeting()}
          </h2>
          <p className=" text-red-500 font-medium text-xs">Signin/Signup to see Your Tasks</p>
        </div>}
        {/* searchbar */}
        <div className="gap-8 items-center sm:flex hidden" ref={searchRef}>
          <ListFilter size={28} />{" "}
          {showSearchbar ? (
            <Searchbar setSearchQuery={setSearchQuery} />
          ) : (
            <Search className="cursor-pointer" onClick={() => setShowSearchbar(true)} />
          )}
        </div>
        <div className="sm:hidden block">
          <Searchbar setSearchQuery={setSearchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Header;
