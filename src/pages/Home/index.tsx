import { useCallback, useEffect, useReducer, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import Modal from "react-modal";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import FormNotes from "@/components/custom/FormNotes";
import NoteCard from "@/components/custom/NoteCard";
import StrictModeDroppable from "@/components/custom/StrictModeDroppable ";
import Note from "@/models/Note";
import { notesReducer } from "@/reducers";
import { reorder } from "@/utils/helper";

type ModalProps = {
  isOpen: boolean;
  note?: Note;
};

const HomePage = () => {
  const [openNoteForm, setOpenNoteForm] = useState<ModalProps>({
    isOpen: false,
  });

  const getNotes = () => {
    if (typeof Storage !== "undefined") {
      const notesFromStorage = localStorage.getItem("notes");
      const notesJSON = notesFromStorage ? JSON.parse(notesFromStorage) : [];
      return notesJSON;
    }
    console.error("Seu navegador não suporta armazenamento local.");
    return null;
  };

  const setNotes = (notes: Note[]) => {
    if (typeof Storage !== "undefined") {
      const notesString = JSON.stringify(notes);
      localStorage.setItem("notes", notesString);
      return;
    }
    console.error("Seu navegador não suporta armazenamento local.");
  };

  const notesLocal = getNotes();

  const [notes, notesDispatch] = useReducer(
    notesReducer,
    notesLocal ? notesLocal : []
  );

  useEffect(() => {
    setNotes(notes);
  }, [notes]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log(result);
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const reordered: Note[] = reorder<Note>(
        [...notes],
        result.source.index,
        result.destination.index
      );

      notesDispatch({
        type: "REORDER",
        payload: {
          reorderedCards: reordered,
        },
      });
    },
    [notes]
  );

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

  const handleEditNote = (note: Note) => {
    setOpenNoteForm({
      isOpen: true,
      note,
    });
  };

  const addNote = (note: Note) => {
    notesDispatch({
      type: "ADD",
      payload: note,
    });
  };

  const editNote = (note: Note) => {
    notesDispatch({
      type: "EDIT",
      payload: note,
    });
  };

  const handleDeleteNote = (note: Note) => {
    notesDispatch({
      type: "REMOVE",
      payload: note,
    });
  };

  return (
    <>
      <div className="container mx-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="NOTE" direction="horizontal">
            {(provided, snapshot) => (
              <div
                className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-8"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {notes.map((note: Note, index: number) => (
                  <Draggable
                    key={note.id}
                    index={index}
                    draggableId={`draggable-${note.id}`}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <NoteCard
                          key={note.id}
                          title={note.title}
                          date={note.date}
                          content={note.content}
                          tags={note.tags.map((tag) => `#${tag}`)}
                          isPinned={false}
                          onEdit={() => handleEditNote(note)}
                          onDelete={() => handleDeleteNote(note)}
                          onPin={() => {}}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
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
          note={openNoteForm.note}
          addNote={(note: Note) => addNote(note)}
          editNote={(note: Note) => editNote(note)}
          onClose={handleCloseNoteForm}
        />
      </Modal>
    </>
  );
};

export default HomePage;
