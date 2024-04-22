import { useEffect, useState } from "react";
import Modal from "react-modal";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import FormNotes from "@/components/custom/FormNotes";
import NoteCard from "@/components/custom/NoteCard";
import Note from "@/models/Note";

type ModalProps = {
  isOpen: boolean;
  id?: string;
};

const HomePage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [openNoteForm, setOpenNoteForm] = useState<ModalProps>({
    isOpen: false,
  });

  useEffect(() => {
    // Verifica se o navegador suporta o armazenamento local
    if (typeof Storage !== "undefined") {
      const notesFromStorage = localStorage.getItem("notes");
      const notesJSON = notesFromStorage ? JSON.parse(notesFromStorage) : [];
      setNotes(notesJSON);
    } else {
      console.error("Seu navegador não suporta armazenamento local.");
    }
  }, []);

  const handleOpenNoteForm = () => {
    setOpenNoteForm({
      isOpen: true,
    });
  };

  const handleCloseNoteForm = () => {
    setOpenNoteForm({
      isOpen: false,
    });
  };

  const handleEditNote = (id: string) => {
    setOpenNoteForm({
      isOpen: true,
      id,
    });
  };

  const handleDeleteNote = (id: string) => {
    // Verifica se o navegador suporta o armazenamento local
    if (typeof Storage !== "undefined") {
      const notesFromStorage = localStorage.getItem("notes");
      const notesJSON = notesFromStorage ? JSON.parse(notesFromStorage) : [];
      const findedNote = notesJSON.find((note: Note) => note.id === id);
      if (findedNote) {
        const updatedNotes = notesJSON.filter((note: Note) => note.id !== id);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
      }
    } else {
      console.error("Seu navegador não suporta armazenamento local.");
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              title={note.title}
              date={note.date}
              content={note.content}
              tags={note.tags.map((tag) => `#${tag}`)}
              isPinned={false}
              onEdit={() => handleEditNote(note.id)}
              onDelete={() => handleDeleteNote(note.id)}
              onPin={() => {}}
            />
          ))}
        </div>
      </div>

      <Button
        className=" absolute right-10 bottom-10 w-16 h-16 flex items-center justify-center rounded-full bg-primary"
        onClick={() => handleOpenNoteForm()}
      >
        <PlusIcon size={24} />
      </Button>

      <Modal
        className="w-[48%] max-h-[80%] bg-background rounded-md mx-auto mt-16 p-4 overflow-y-auto"
        isOpen={openNoteForm.isOpen}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        ariaHideApp={false}
      >
        <FormNotes
          id={openNoteForm.id}
          setNotes={setNotes}
          onClose={handleCloseNoteForm}
        />
      </Modal>
    </>
  );
};

export default HomePage;
