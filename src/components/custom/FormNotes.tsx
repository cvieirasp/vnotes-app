import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuid } from "uuid";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import RichTextInput from "./RichTextInput";
import TagInput from "./TagInput";
import Note from "@/models/Note";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Título deve conter no mínimo dois caracteres.",
  }),
  content: z.string().min(2, {
    message: "Conteúdo deve conter no mínimo dois caracteres.",
  }),
  tags: z.array(z.string()),
});

type Props = {
  note?: Note;
  addNote: (note: Note) => void;
  editNote: (note: Note) => void;
  onClose: () => void;
};

const FormNotes = ({ note, addNote, editNote, onClose }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (note) {
      form.setValue("title", note.title);
      form.setValue("content", note.content);
      form.setValue("tags", note.tags);
    }
  }, [note, form]);

  const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
    if (note) {
      const editedNote = {
        ...note,
        ...values,
      } as Note;
      editNote(editedNote);
      onClose();
      return;
    }
    const newNote = {
      ...values,
      date: new Date().getTime(),
      id: uuid(),
    } as Note;
    addNote(newNote);
    onClose();
  };

  return (
    <div className="relative">
      <Button
        className="absolute right-1 m-0 h-8 w-8 bg-transparent hover:bg-transparent"
        type="button"
        variant="default"
        size="icon"
        onClick={onClose}
      >
        <X className="text-primary" size={16} />
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Nota</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">TÍTULO</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">CONTEÚDO</FormLabel>
                    <FormControl>
                      <RichTextInput
                        content={field.value}
                        setContent={(value) => form.setValue("content", value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">TAGS</FormLabel>
                    <FormControl>
                      <TagInput
                        tags={field.value}
                        setTag={(value) => form.setValue("tags", value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" variant="default">
                Salvar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormNotes;
