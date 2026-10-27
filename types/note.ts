export interface Note {
  id: string;
  title: string;
  tag: string;
  content: string;
  createdAt: string;
}

export interface CreateNoteInput {
  title: string;
  tag: string;
  content: string;
}
