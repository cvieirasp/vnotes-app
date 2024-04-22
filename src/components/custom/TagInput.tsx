import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";

type Props = {
  tags: string[];
  setTag: (tags: string[]) => void;
};

function TagInput({ tags, setTag }: Props) {
  const [inputTag, setInputTag] = useState("");

  const handleChangeInputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };

  const handleKeyDownInputTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  const handleAddTag = () => {
    if (inputTag.trim() === "") return;
    setTag([...tags, inputTag.trim()]);
    setInputTag("");
  };

  const handleRemoveTag = (tag: string) => {
    const tagsFiltered = tags.filter((t) => t !== tag);
    setTag(tagsFiltered);
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              className="flex items-center gap-2 text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded"
              key={index}
            >
              #{tag}
              <Button
                className="bg-transparent hover:bg-transparent"
                size="icon"
                onClick={() => handleRemoveTag(tag)}
              >
                <X className="text-primary" size={16} />
              </Button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-2">
        <Input
          className="w-[24%] text-sm bg-transparent border px-4 py-2 rounded outline-none"
          type="text"
          placeholder="Adicionar tag"
          value={inputTag}
          onChange={handleChangeInputTag}
          onKeyDown={handleKeyDownInputTag}
        />

        <Button
          size="icon"
          type="button"
          className="bg-secondary text-primary rounded border border-primary hover:text-secondary"
          onClick={handleAddTag}
        >
          <PlusIcon size={16} />
        </Button>
      </div>
    </div>
  );
}

export default TagInput;
