'use client';

import { useState } from 'react';
import { CreateNoteInput, NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSubmit: (data: CreateNoteInput) => void;
  onClose: () => void;
}

export default function NoteForm({ onSubmit, onClose }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<NoteTag>('personal');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onSubmit({ title, tag, content });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h2>Create New Note</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <select value={tag} onChange={(e) => setTag(e.target.value as NoteTag)}>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="study">Study</option>
        <option value="health">Health</option>
        <option value="other">Other</option>
      </select>
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        required 
      />
      <div className={css.actions}>
        <button type="button" onClick={onClose}>Cancel</button>
        <button type="submit">Add Note</button>
      </div>
    </form>
  );
}
