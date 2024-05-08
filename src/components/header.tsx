import { ListFilter, Plus, Search } from "lucide-react";
import Logo from "../../public/tinylist.png"
import { Button } from "./ui/button";
import { useState, useRef, useEffect } from "react";
import Searchbar from "./Searchbar";
import Image from "next/image";

interface HeaderProps{
  setSearchQuery:React.Dispatch<React.SetStateAction<string>>
}
const Header = ({setSearchQuery}:HeaderProps) => {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
 

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (searchRef.current && !searchRef?.current?.contains(event.target)) {
        setShowSearchbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <Image src={Logo} alt="Logo" width={160} height={70} />
        {/* button */}
        <div>
          <Button>
            Add New Task{" "}
            <span>
              <Plus size={18} className="ml-2" strokeWidth={3} />
            </span>
          </Button>
        </div>
      </div>
      {/* Message- Searchbar */}
      <div className="flex justify-between">
        <h2 className=" font-semibold text-3xl">
          Hello Good Morning, Saurabh Singh.
        </h2>
        {/* searchbar */}
        <div className="flex gap-8 items-center" ref={searchRef}>
          <ListFilter size={28} />{" "}
          {showSearchbar ? (
            <Searchbar setSearchQuery={setSearchQuery} />
          ) : (
            <Search className="cursor-pointer" onClick={() => setShowSearchbar(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
