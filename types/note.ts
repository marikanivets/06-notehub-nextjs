export type NoteTag = 'personal' | 'work' | 'study' | 'health' | 'other';

export interface Note {
  id: string;
  title: string;
  tag: NoteTag;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteInput {
  title: string;
  tag: NoteTag;
  content: string;
}

export interface ApiResponse {
  notes: Note[];
  totalPages: number;
}
