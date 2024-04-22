import { Edit2Icon, PinIcon, TrashIcon } from "lucide-react";
import { Parser } from "html-to-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  date: number;
  content: string;
  tags: string[];
  isPinned: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onPin: () => void;
};

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPin,
}: Props) {
  return (
    <>
      <Card className="bg-background hover:shadow-xl transition-all ease-in-out">
        <CardHeader>
          <CardTitle>
            <div className="flex items-top justify-between">
              <span>{title}</span>
              <PinIcon
                className={`${
                  isPinned ? "text-primary" : "text-slate-300"
                } cursor-pointer`}
                size={16}
                onClick={onPin}
              />
            </div>
          </CardTitle>
          <CardDescription>{new Date(date).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-600 mt-2">
            {Parser().parse(content)}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-between mt-2">
            <div className="text-xs text-slate-500">{tags.join(" ")}</div>

            <div className="flex items-center gap-2">
              <Edit2Icon
                className="text-slate-500 hover:text-green-600 cursor-pointer"
                size={16}
                onClick={onEdit}
              />
              <TrashIcon
                className="text-slate-500 hover:text-red-500 cursor-pointer"
                size={16}
                onClick={onDelete}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default NoteCard;
