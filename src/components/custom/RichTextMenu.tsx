import { Editor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import {
  BoldIcon,
  Code2Icon,
  CodeIcon,
  EraserIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  ParkingSquareIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  TrashIcon,
  UndoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  editor: Editor | null;
};

const RichTextMenu = ({ editor }: Props) => {
  //const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const baseClass = "";

  return (
    <div className="flex gap-1 w-full bg-muted p-2">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(baseClass, editor.isActive("bold") ? "is-active" : "")}
        type="button"
        size="icon"
      >
        <BoldIcon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(baseClass, editor.isActive("italic") ? "is-active" : "")}
        type="button"
        size="icon"
      >
        <ItalicIcon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(baseClass, editor.isActive("strike") ? "is-active" : "")}
        type="button"
        size="icon"
      >
        <StrikethroughIcon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(baseClass, editor.isActive("code") ? "is-active" : "")}
        type="button"
        size="icon"
      >
        <CodeIcon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        type="button"
        size="icon"
      >
        <EraserIcon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().clearNodes().run()}
        type="button"
        size="icon"
      >
        <TrashIcon size={16} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(
          baseClass,
          editor.isActive("paragraph") ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <ParkingSquareIcon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          baseClass,
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <Heading1Icon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          baseClass,
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <Heading2Icon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          baseClass,
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <Heading3Icon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cn(
          baseClass,
          editor.isActive("heading", { level: 4 }) ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <Heading4Icon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cn(
          baseClass,
          editor.isActive("heading", { level: 5 }) ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <Heading5Icon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cn(
          baseClass,
          editor.isActive("heading", { level: 6 }) ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <Heading6Icon size={16} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          baseClass,
          editor.isActive("bulletList") ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <ListIcon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          baseClass,
          editor.isActive("orderedList") ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <ListOrderedIcon size={16} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          baseClass,
          editor.isActive("codeBlock") ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <Code2Icon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          baseClass,
          editor.isActive("blockquote") ? "is-active" : ""
        )}
        type="button"
        size="icon"
      >
        <QuoteIcon size={16} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        type="button"
        size="icon"
      >
        <UndoIcon size={16} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        type="button"
        size="icon"
      >
        <RedoIcon size={16} />
      </Button>
    </div>
  );
};

export default RichTextMenu;
