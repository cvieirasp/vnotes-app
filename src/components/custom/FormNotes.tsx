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
  id?: string;
  setNotes: (notes: Note[]) => void;
  onClose: () => void;
};

const FormNotes = ({ id, setNotes, onClose }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (id) {
      if (typeof Storage !== "undefined") {
        const notesFromStorage = localStorage.getItem("notes");
        const notesJSON = notesFromStorage ? JSON.parse(notesFromStorage) : [];
        const findedNote = notesJSON.find((note: Note) => note.id === id);

        if (findedNote) {
          form.setValue("title", findedNote.title);
          form.setValue("content", findedNote.content);
          form.setValue("tags", findedNote.tags);
        }
      }
    }
  }, [id, form]);

  const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    // Verifica se o navegador suporta o armazenamento local
    if (typeof Storage !== "undefined") {
      const notesFromStorage = localStorage.getItem("notes");
      const notesJSON = notesFromStorage ? JSON.parse(notesFromStorage) : [];

      const findedNote = notesJSON.find((note: Note) => note.id === id);

      if (findedNote) {
        const updatedNote = { ...findedNote, ...values };
        const updatedNotes = notesJSON.map((note: Note) =>
          note.id === id ? updatedNote : note
        );
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        onClose();
        return;
      }

      const newNote = { ...values, date: new Date().getTime(), id: uuid() };
      const insertedNotes = [...notesJSON, newNote];
      localStorage.setItem("notes", JSON.stringify(insertedNotes));
      setNotes(insertedNotes);
      onClose();
    } else {
      console.error("Seu navegador não suporta armazenamento local.");
    }
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
