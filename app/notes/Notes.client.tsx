'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes, createNote } from '../../lib/api';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from '../../components/NotesPage/NotesPage.module.css';

export default function NotesClient() {
  const queryClient = useQueryClient();
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

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

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
          <NoteList notes={data?.notes || []} />
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      )}

            {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm 
            onSubmit={(newNote) => createMutation.mutate(newNote)} 
            onClose={() => setIsModalOpen(false)} 
          />
        </Modal>
      )}
    </main>
  );
}
