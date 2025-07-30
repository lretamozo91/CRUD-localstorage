import { useEffect, useState } from 'react';
import CharacterForm from './components/CharacterForm';
import CharacterList from './components/CharacterList';
import { Button } from 'react-bootstrap';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Leer datos desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('characters');
    if (stored) {
      setCharacters(JSON.parse(stored));
    }
  }, []);

  // Actualizar localStorage cuando cambian los personajes
  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  const addCharacter = (character) => {
    setCharacters([...characters, character]);
  };

  const updateCharacter = (updatedCharacter) => {
    setCharacters(characters.map(char => 
      char.id === updatedCharacter.id ? updatedCharacter : char
    ));
    setEditingCharacter(null);
  };

  const deleteCharacter = (id) => {
    setCharacters(characters.filter(char => char.id !== id));
  };

  return (
    <div className="container">
      <h1 className='mb-5'>CRUD de personajes de anime</h1>

      <Button className="mb-4" variant="success" onClick={handleShowModal}>
        Agregar personaje
      </Button>

      <CharacterForm 
        showModal={showModal}
        handleClose={handleCloseModal}
        addCharacter={addCharacter} 
        editingCharacter={editingCharacter}
        updateCharacter={updateCharacter}
      />

      <CharacterList 
        handleShowModal={handleShowModal}
        characters={characters} 
        onEdit={setEditingCharacter}
        onDelete={deleteCharacter}
      />
    </div>
  );
};

export default App;
