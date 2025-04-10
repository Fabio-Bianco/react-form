
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



    const NewId = Date.now(); // Genera un ID unico basato sul timestamp

    console.log('Nuovo film aggiunto:', newTitle); //  Debug

    const newMovie = {
      id: NewId,
      title: newTitle,
      description: '',


    };

    setMovies([...movies, newMovie]); // Aggiungi il nuovo film alla lista  
    setNewTitle(''); // Pulisci il campo di input
  };

  // Funzione per rimuovere film
  const handleDelete = (idToDelete) => {
    const filmDeleted = movies.find((film) => film.id === idToDelete);
    const updatedMovies = movies.filter((film) => film.id !== idToDelete);
    setMovies(updatedMovies); // Aggiorna la lista dei film
    console.log(' Film rimosso:', filmDeleted.title);
  };

  // Easter Egg: attiva stile segreto scrivendo "k"
  useEffect(() => {
    const handleKey = (event) => {
      const char = event.key.toLowerCase();
      console.log('Tasto premuto:', char); //  Debug

      setKeyBuffer((prevBuffer) => {
        const newBuffer = prevBuffer + char;
        console.log('Buffer attuale:', newBuffer); //  Debug

        if (newBuffer.includes('§')) {
          console.log('Attivato stile novanta!');
          setStile('novanta');
        }

        return; 
      });
    };

    addEventListener('keydown', handleKey);
    return () => removeEventListener('keydown', handleKey);
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
