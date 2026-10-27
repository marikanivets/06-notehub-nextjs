'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from '../../components/NotesPage/NotesPage.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  const notesList = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <main className={css.container}>
      <h1 className={css.title}>My Notes</h1>
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <SearchBox value={search} onChange={setSearch} />
        <button onClick={() => setIsModalOpen(true)} className={css.addBtn}>
          Add Note
        </button>
      </div>

      {isLoading && !data ? (
        <p>Loading, please wait...</p>
      ) : (
        <>
          {/* Рендерим список только если есть заметки */}
          {notesList.length > 0 ? (
            <NoteList notes={notesList} />
          ) : (
            <p>No notes found.</p>
          )}
          
          {/* Рендерим пагинацию только если страниц больше одной */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </main>
  );
}

