import css from '../components/Home/Home.module.css';

export default function HomePage() {
  return (
    <main className={css.container}>
      <section>
        <h1 className={css.title}>Welcome to NoteHub!</h1>
        <p className={css.description}>
          Your ultimate workspace for creating, organizing, and managing your personal notes efficiently. 
          Stay productive and never lose a brilliant idea again.
        </p>
      </section>
    </main>
  );
}
