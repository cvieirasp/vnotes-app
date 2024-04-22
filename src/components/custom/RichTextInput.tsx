import { EditorContent, HTMLContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import RichTextMenu from "./RichTextMenu";

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs.
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs.
    },
  }),
];

type Props = {
  content: string;
  setContent: (content: HTMLContent) => void;
};

const RichTextInput = ({ content, setContent }: Props) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "m-4 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  editor?.on("create", ({ editor }) => {
    if (!content) return;
    console.log("Editor created with content", content);
    editor.commands.setContent(content, false);
  });

  return (
    <div className="flex flex-col gap-4 w-full border border-gray-300 rounded-md p-2 mt-4 overflow-y-auto">
      <RichTextMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextInput;
