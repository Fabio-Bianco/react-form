
// Importiamo React e gli hook useState e useEffect
import { useState, useEffect } from 'react';
// Importiamo le icone di FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
//  Importiamo tutti gli stili

import './style/elegante.css';
import './style/moderno.css';
import './style/minimal.css';
import './style/novanta.css';

// Importiamo la lista dei film
import moviesData from './data/movies';

const App = () => {
  const [movies, setMovies] = useState(moviesData);
  const [newTitle, setNewTitle] = useState('');
  const [stile, setStile] = useState('elegante');

  // Stato per tracciare i tasti digitati per l'easter egg
  const [keyBuffer, setKeyBuffer] = useState('');

  // Funzione per aggiungere film
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTitle.trim() === '') return;

    const newMovie = {
      id: Date.now(),
      title: newTitle,
      description: ''
    };

    setMovies([...movies, newMovie]);
    setNewTitle('');
  };

  // Funzione per rimuovere film
  const handleDelete = (idToDelete) => {
    const updatedMovies = movies.filter((film) => film.id !== idToDelete);
    setMovies(updatedMovies);
  };

  // Easter Egg: attiva stile segreto scrivendo "k"
  useEffect(() => {
    const handleKey = (event) => {
      const char = event.key.toLowerCase();
      console.log('Tasto premuto:', char); // 🔍 Debug

      setKeyBuffer((prevBuffer) => {
        const newBuffer = prevBuffer + char;
        console.log('Buffer attuale:', newBuffer); // 🔍 Debug

        if (newBuffer.includes('k')) {
          console.log('Attivato stile novanta!');
          setStile('novanta');
        }

        // Limitiamo la lunghezza del buffer per evitare che cresca all'infinito
        return newBuffer.slice(-10); // Max 10 caratteri
      });
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={`list-movie ${stile}`}>
      <h1>Film d'autore 🎬</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titolo del nuovo film"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <button type="submit">
  <FontAwesomeIcon icon={faPlus} />
</button>

      </form>

      <ul>
        {movies.map((film) => (
          <li key={film.id}>
            {film.title}
            <button onClick={() => handleDelete(film.id)}>
  <FontAwesomeIcon icon={faTrash} />
</button>

          </li>
        ))}
      </ul>

      <div className="style-buttons">
        <button onClick={() => setStile('elegante')}>d'assai</button>
        <button onClick={() => setStile('moderno')}>modern</button>
        <button onClick={() => setStile('minimal')}>minimal</button>
      </div>
    </div>
  );
};

export default App;
