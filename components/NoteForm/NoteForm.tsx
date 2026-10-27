'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CreateNoteInput, NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSubmit: (data: CreateNoteInput) => void;
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
    .min(10, 'Content is too short!')
    .required('Content is required!'),
});

export default function NoteForm({ onSubmit, onClose }: NoteFormProps) {
  const initialValues: CreateNoteInput = {
    title: '',
    tag: 'Personal',
    content: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
        onClose();
      }}
    >
      {({ isSubmitting }) => (
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
            <Field as="textarea" name="content" placeholder="Content" />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" onClick={onClose} className={css.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className={css.submitBtn}>
              Add Note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
