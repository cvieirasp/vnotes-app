import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Profile from "@/components/custom/Profile";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Searching...");
  };

  const handleChangeSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleOnLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-background flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to="/">
        <h2 className="text-xl font-medium text-primary py-2">VNotes</h2>
      </Link>
      <Searchbar
        value={searchQuery}
        onChange={({ target }) => handleChangeSearch(target.value)}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      <Profile onLogout={handleOnLogout} />
    </nav>
  );
};

export default Navbar;
