import React, { useState } from 'react';

const generos = ['hombre', 'mujer', 'No binario', 'fluido' , 'otro'];

export default function Review() {
  const [personas, setPersonas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError]= useState('');
  const [mostrar, setMostrar]= useState(false);
  const [genero, setGenero] = useState('');

    const handleAddPersona = () => {
            setError ('');
        if (!edad || edad<0) {
            setError ('error de edad');
            return;
        }
        if (!nombre || !nombre.startsWith('P')) {
            setError ('El nombre tiene que empezar por P');
            return;
        }
        const newPersona = {nombre, edad: parseInt(edad), email, genero};
        console.log(newPersona);
        setPersonas([...personas, newPersona]);

        //setPersonas( prev => [...prev, newPersona]); 
    };

    const handleList =() => {
        setMostrar (!mostrar);
    };
 
  

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add a Person</h2>
            <input
                placeholder="Name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                placeholder="Edad"
                type="number"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
            />
            <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <select name="genero" id="genero" onChange={(e) => setGenero(e.target.value)}>
                {generos.map((gen, index) => (
                <option key={index} value={gen}>{gen}</option>
                ))}
            </select>

            {error && (
                <div>{error}</div>
            )}

            <button onClick={handleAddPersona}>Add</button>

            <h3>People List:</h3>

            <button onClick={handleList}>{mostrar ? "Ocultar" : "Mostrar"}</button>

            {mostrar && (      
            <ul>
                {personas.map((persona, index) =>
                <li key={index}>
                    {persona.nombre} - 
                    {persona.edad} - 
                    {persona.email} -
                    {persona.genero}</li>
                )}
            </ul>
            )}
            
        </div>
    );
}



{/*
    
    - Agregar una propiedad de email.
    
    - Al añadir una persona:
        - validar que la edad sea mayor que 0 y not null.
        - validar que el nombre no es nulo y empieza por la letra P.

    - Mostrar una lista de personas.

    - Agregar un botón para mostrar/ocultar la lista de personas. 
        - Recordar que hay que cambiar el texto del boton según el estado de la lista (mostrar/ocultar).
        - Utilizar un booleano (mostrarPersonas true/false) para controlar el estado de la lista.
    
    - Agregar un select list (drop down) con generos, 
        por ejemplo: const generos = ['hombre', 'mujer', 'binario', 'otro'];
   
    - Modificar la lista de generos con:
        const generos = [
            { key: 'h', label: 'Hombre' },
            { key: 'm', label: 'Mujer' },
            { key: 'b', label: 'Binario' },
            { key: 'o', label: 'Otro' }
            ];

    */}