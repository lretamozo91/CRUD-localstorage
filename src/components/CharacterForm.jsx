import { useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

const CharacterForm = ({ showModal, closeModal, addCharacter, editingCharacter, updateCharacter }) => {
  
  const [personaje, setPersonaje] = useState('');
  const [anime, setAnime] = useState('');

  useEffect(() => {
    if (editingCharacter) {
      setPersonaje(editingCharacter.personaje);
      setAnime(editingCharacter.anime);
    } else {
      setPersonaje('');
      setAnime('');
    }
  }, [editingCharacter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!personaje || !anime) return;

    if (editingCharacter) {
      updateCharacter({
        id: editingCharacter.id,
        personaje,
        anime,
      });
    } else {
      addCharacter({
        id: Date.now(),
        personaje,
        anime,
      });
    }
    setPersonaje('');
    setAnime('');
  };


  return (
    <>
      <Modal show={showModal} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editingCharacter ? 'Editar personaje' : 'Agregar personaje'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicPersonaje">
              <Form.Label>Personaje</Form.Label>
              <Form.Control 
                type="text" 
                value={personaje}
                placeholder="Personaje" 
                onChange={(e) => setPersonaje(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAnime">
              <Form.Label>Anime</Form.Label>
              <Form.Control 
                type="text" 
                value={anime}
                placeholder="Anime" 
                onChange={(e) => setAnime(e.target.value)}  
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button variant="primary" type="submit">
              {editingCharacter ? 'Actualizar' : 'Agregar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CharacterForm;
