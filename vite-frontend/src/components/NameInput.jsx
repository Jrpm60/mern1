

export default function NameInput({setNombreChange}) {
    return (
        <input
            type="text"
            placeholder="Introduce tu Nombre"
            name="nombre" id="nombre"
            onChange={(e)=> setNombreChange(e.target.value)}
        />
    )
}

export function EdadInput({setEdadChange}) {
    return (
        <input
            type="number"
            placeholder="Introduce tu Edad"
            name="edad" id="edad"
            onChange={(e)=> setEdadChange(e.target.value)}
        />
    )
}