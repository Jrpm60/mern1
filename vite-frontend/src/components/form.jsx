import {useState} from "react";

function Form () {

    const[result, setResult] = useState('');

    const handleClick = () => {

        setResult("Form submitted successfully!");
        
    }

    return (
        <>    
            <h1>Hola</h1>  

            <div>{result}</div>     

            <input
                type="text"
                data-testid="input-name"
                id="name"
                nombre="name"
            />
            <br/>

            <input
                type="email"
                data-testid="input-email"
                id="email"
                nombre="email"
            />
            <br/>

            <button 
                data-testid="submit-btn"
                onClick={handleClick}>Click</button>

            <br/>


        </>

    )

}

export default Form