import axios from 'axios';
import { Note } from 'types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://goit.study',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await api.get<Note[]>('/notes');
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
