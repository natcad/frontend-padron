// Example SearchForm.jsx (pseudo-code)
import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ nombre, apellido, dni });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
      <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchForm;

