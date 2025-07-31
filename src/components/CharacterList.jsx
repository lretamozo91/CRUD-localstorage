import { Button, Table } from "react-bootstrap";

const CharacterList = ({ characters, onEdit, onDelete }) => {
  
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Personaje</th>
          <th>Anime</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
          {characters.map(char => (
            <tr key={char.id}>
              <td>{char.id}</td>
              <td><strong>{char.personaje}</strong></td>
              <td>{char.anime}</td>
              <td>
                <Button className="me-3" variant="primary" onClick={() => onEdit(char)}>Editar</Button>
                <Button variant="danger" onClick={() => onDelete(char.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default CharacterList;
