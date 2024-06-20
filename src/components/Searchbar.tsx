import { Input } from "./ui/input";

interface SearchbarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const Searchbar = ({ setSearchQuery }: SearchbarProps) => {
  return (

    <Input
      className="max-h-[50px] focus:border-none py-3 px-3  
      rounded-3xl focus:shadow-lg hover:shadow-lg animate-in transition-all duration-300 placeholder:text-[#c3c4c4]"
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search for a Task Name"
    />

  );
};

export default Searchbar;
