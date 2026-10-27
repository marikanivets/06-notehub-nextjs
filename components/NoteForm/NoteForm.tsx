'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { CreateNoteInput, NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too short!')
    .max(50, 'Title is too long!')
    .required('Title is required!'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as NoteTag[])
    .required('Tag is required!'),
  content: Yup.string()
    .max(500, 'Content is too long! Max 500 characters.'), // По ТЗ: необязательное, макс 500
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const initialValues: CreateNoteInput = {
    title: '',
    tag: 'Personal',
    content: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={(values) => {
        createMutation.mutate(values);
      }}
    >
      {() => (
        <Form className={css.form}>
          <h2>Create New Note</h2>
          
          <div className={css.fieldWrapper}>
            <Field type="text" name="title" placeholder="Title" />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <Field as="select" name="tag">
              <option value="Personal">Personal</option>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <Field as="textarea" name="content" placeholder="Content (optional)" />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button 
              type="button" 
              onClick={onClose} 
              className={css.cancelBtn}
              disabled={createMutation.isPending}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={css.submitBtn}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Adding...' : 'Add Note'}
            </button>
          </div>
          
          {createMutation.isError && (
            <p className={css.errorGlobal}>Failed to create note. Try again.</p>
          )}
        </Form>
      )}
    </Formik>
  );
}

