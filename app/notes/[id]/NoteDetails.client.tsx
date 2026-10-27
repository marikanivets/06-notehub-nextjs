// src/app/notes/[id]/NoteDetails.client.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';
import css from '@/components/NoteDetails/NoteDetails.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <button onClick={() => router.back()} className={css.backBtn}>
        &larr; Back to Notes
      </button>
      
      <article className={css.card}>
        <div className={css.meta}>
          <span className={css.tag}>#{note.tag}</span>
          <span className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h1 className={css.title}>{note.title}</h1>
        <div className={css.content}>
          <p>{note.content}</p>
        </div>
      </article>
    </div>
  );
}
