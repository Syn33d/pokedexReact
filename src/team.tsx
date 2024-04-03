import { useEffect, useState } from "react";

function team() {
    const [capturedPokemons, setCapturedPokemons] = useState([]);
  
    useEffect(() => {
      const storedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');
      setCapturedPokemons(storedPokemons);
    }, []);
  
    const releasePokemon = (index: number) => {
      const newCapturedPokemons = [...capturedPokemons];
      newCapturedPokemons.splice(index, 1);
      setCapturedPokemons(newCapturedPokemons);
      localStorage.setItem('capturedPokemons', JSON.stringify(newCapturedPokemons));
    };
  
    return (
        <div>
            <h1>Mon équipe</h1>
            <div>
                {capturedPokemons.map((pokemon: Pokemon, index: number) => (
                    <div key={index}>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <div>{pokemon.name}</div>
                        <button className="btn btn-danger" onClick={() => releasePokemon(index)}>Relâcher</button>
                    </div>
                ))}
            </div>
        </div>
    );
  };
  
  export default team;