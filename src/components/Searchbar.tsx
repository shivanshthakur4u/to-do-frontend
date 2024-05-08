import { Input } from "./ui/input";

interface SearchbarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const Searchbar = ({ setSearchQuery }: SearchbarProps) => {
  return (
    <div className="py-2 px-3 border rounded-3xl w-full animate-in transition-all duration-500">
      <Input
        placeholder="Search By Title"
        className="focus:outline-none border-none outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
