type Note = {
  id: string;
  title: string;
  date: number;
  content: string;
  tags: string[];
  isPinned: boolean;
};

export default Note;
