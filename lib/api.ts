import axios from 'axios';
import { Note, CreateNoteInput, ApiResponse, NoteTag } from '../types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://goit.study',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (search?: string, page?: number): Promise<ApiResponse> => {
  const { data } = await api.get<ApiResponse>('/notes', {
    params: {
      search: search || undefined,
      page: page || 1,
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteInput): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
