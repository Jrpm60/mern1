import {useState} from "react";
import { sumar, validar_email} from "../utils/utils";


function Test_1({nombreDeUsuario}) {

    const[num1, setNum1] = useState(0);
    const[num2, setNum2] = useState(0);
    const[result, setResult] = useState(0);
    const[email, setEmail] = useState('');

    const handleClick = () => {
        // sumar y devolver el resultado
        const res = parseFloat(num1) + parseFloat(num2) ;
        setResult (res);
    }

    const handleEmail = () => {

        setResult(validar_email(email));
        
    }

    return (
        <>    
            <h1>Hola {nombreDeUsuario}</h1>
            
            NUM1:
            <input
                type="number"
                id="num1"
                nombre="num1"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
            />
            <br/>
            
            NUM2:
            <input
                type="number"
                id="num2"
                nombre="num2"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
            />
            <br/>

            <button onClick={handleClick}>Sumar</button>

            <br/>
            Correo Electronico
            <br/>
            <input
                type="email"
                id="email"
                nombre="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>

            <button onClick={handleEmail}>Verificar</button>

            RESULT: {result ? "True":"False"}

        </>

    )

}

export default Test_1