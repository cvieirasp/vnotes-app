import Note from "@/models/Note";

export const notesReducer = (
  state: Note[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; payload: any }
) => {
  const payload = action.payload as Note;
  switch (action.type) {
    case "ADD": {
      const note = { ...payload };
      const newNotes = [...state, note];
      return newNotes;
    }

    case "EDIT": {
      const notesCopy = [...state];
      const { editValue } = action.payload;
      let foundNote = notesCopy.find((note) => note.id === payload.id);
      if (foundNote) {
        foundNote = { ...foundNote, ...editValue };
      }
      return notesCopy;
    }

    case "REMOVE":
      return state.filter((note) => note.id !== payload.id);

    case "REORDER": {
      const reordered = [...action.payload.reorderedCards];
      return reordered as Note[];
    }

    default:
      return state;
  }
};
