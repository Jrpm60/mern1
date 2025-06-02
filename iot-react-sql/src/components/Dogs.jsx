import { useEffect, useState } from 'react';

function Dogs() {
  const [dogs, setDogs] = useState([]);
  const [selectDog, setSelectDog] = useState([]);

const handleSelect = (event) => {
    console.log(event.target.selectedOptions);
    const arrSelected = Array.from(event.target.selectedOptions, x=> x.value);
    setSelectDog(arrSelected);
  }

  useEffect(() => {
    const fetchDogs = () => {
      fetch(`https://dog.ceo/api/breeds/list/all`)      
        .then(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch dogs: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          const topLevelBreeds = Object.keys(data.message);
          setDogs(topLevelBreeds);
          console.log('Dog breeds:', topLevelBreeds);
        })
        .catch(err => {
          console.error(`Error fetching dogs:`, err);
        });
    };

    fetchDogs();
  }, []);

  return (
    <div>
      <h2>List of Dogs</h2>

        <select multiple onChange={handleSelect}>
            {dogs.map((breed, index) => (
            <option key={index} value={breed}>{breed}</option>
            ))}
        </select>

            Mi perro favorito es {selectDog}

            {selectDog.map((dog) => (
            <div>{dog}</div>
            ))}

        <ul>
            {dogs.map((breed, index) => (
            <option value={breed}>{breed}</option>
            ))}
        </ul>
      
    </div>
  );
}

export default Dogs;