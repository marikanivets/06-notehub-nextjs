// src/app/notes/Notes.client.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import css from '@/components/NotesPage/NotesPage.module.css';

const ITEMS_PER_PAGE = 6;

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.tag.toLowerCase().includes(search.toLowerCase())
  );


  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedNotes = filteredNotes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isLoading) return <p>Loading, please wait...</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>My Notes</h1>
      
      <SearchBox value={search} onChange={handleSearchChange} />
      
      <NoteList notes={paginatedNotes} />
      
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
