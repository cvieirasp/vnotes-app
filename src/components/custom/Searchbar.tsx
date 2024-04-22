import { ChangeEventHandler } from "react";
import { X, SearchIcon } from "lucide-react";

import { Input } from "../ui/input";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  handleSearch: () => void;
  handleClearSearch: () => void;
};

export const Searchbar = ({
  value,
  onChange,
  handleSearch,
  handleClearSearch,
}: Props) => {
  return (
    <div className="w-80 flex items-center pl-0 pr-4 bg-slate-100 rounded-md hover:outline-none hover:ring-1 hover:ring-ring hover:ring-offset-0">
      <Input
        className="w-full text-xs bg-transparent py-[11px] outline-none border-0 focus-visible:ring-0"
        placeholder="Pesquisar notas..."
        value={value}
        onChange={onChange}
      />

      {value && (
        <X
          className="text-slate-500 mr-2 cursor-pointer hover:text-primary"
          size={16}
          onClick={handleClearSearch}
        />
      )}

      <SearchIcon
        className="text-slate-400 cursor-pointer hover:text-primary"
        size={24}
        onClick={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
