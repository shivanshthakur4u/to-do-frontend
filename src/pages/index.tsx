import Header from "@/components/header";
import TaskBody from "@/components/taskBody";
import useDebounce from "@/lib/useDebounce";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500)
  return (
    <main
      className={`px-5 pt-5 pb-0 flex flex-col w-full h-screen ${inter.className}`}
    >
      <Header setSearchQuery={setSearchQuery} />
      
      <TaskBody debouncedSearch={debouncedSearch} />

    </main>
  );
}
