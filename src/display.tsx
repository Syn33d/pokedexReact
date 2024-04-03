import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { TypeImage } from "../src/App.tsx";
import { Link } from "react-router-dom";
import './App.css';


function display() {
    const [selectedGeneration, setSelectedGeneration] = useState<number>(0);
    const [pokemons, setPokemon] = useState<Pokemon[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedName, setSelectedName] = useState<string>('');
    const [selectedId, setSelectedId] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100);

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = () => {
        axios('https://pokebuildapi.fr/api/v1/pokemon').then((response) => {
            setPokemon(response.data);
            if (selectedGeneration === 0) {
                setItemsPerPage(100);
            }
        });
    };


    const handleGenerationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const generation = Number(event.target.value);
        setSelectedGeneration(generation);
        setCurrentPage(1);

        if (generation !== 0) {
            axios(`https://pokebuildapi.fr/api/v1/pokemon/generation/${generation}`).then((response) => {
                setItemsPerPage(response.data.length);
            });
        } else {
            fetchPokemons();
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const filterByGeneration = (pokemonList: Pokemon[]) => {
        if (selectedGeneration === 0) {
            return pokemonList;
        }
        return pokemonList.filter(pokemon => pokemon.apiGeneration === selectedGeneration);
    };

    const filterByType = (pokemonList: Pokemon[]) => {
        if (selectedType === '') {
            return pokemonList;
        }
        return pokemonList.filter(pokemon => pokemon.apiTypes.some(type => type.name.toLowerCase().includes(selectedType.toLowerCase())));
    }

    const filterByName = (pokemonList: Pokemon[]) => {
        if (selectedName === '') {
            return pokemonList;
        }
        return pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(selectedName.toLowerCase()));
    }

    const filterById = (pokemonList: Pokemon[]) => {
        if (selectedId === 0) {
            return pokemonList;
        }
        return pokemonList.filter(pokemon => pokemon.pokedexId === selectedId);
    }

    const scrollToTable = () => {
        const tableElement = document.getElementById('table');

        if (tableElement) {
            tableElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const capturePokemon = (pokemon: Pokemon) => {
        let capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');
        capturedPokemons.push(pokemon);
        localStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));
    };

    const pokemonsToDisplay = filterById(filterByType(filterByName(filterByGeneration(pokemons))));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pokemonsToDisplay.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(pokemons.length / itemsPerPage);

    return (
        <div className="form-group">
            <button className="btn btn-danger">
                <Link to={'/'}>Cancel Pokemons</Link>
            </button>

            <button className="btn btn-danger">
                <Link to={'/team.tsx'}>Mon Équipe</Link>
            </button>

            <label>
                Génération: {selectedGeneration} &nbsp;
                <select className="form-control" value={selectedGeneration} onChange={handleGenerationChange}>
                    <option value="0">Toutes</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </label>

            {selectedGeneration === 0 ? (<p>Nombre de pokemons : {pokemons.length}</p>) : (<p>Nombre de pokemons de la génération {selectedGeneration} : {pokemonsToDisplay.length} sur <span>{pokemons.length}</span></p>)}


            <div>
                <label>
                    <input className='form-control' placeholder="Rechercher un pokemon" value={selectedName} onChange={(event) => setSelectedName(event.target.value)} />
                </label>
            </div>

            <div>
                <label>
                    <input className='form-control' placeholder="Rechercher un type" value={selectedType} onChange={(event) => setSelectedType(event.target.value)} />
                </label>
            </div>

            <div>
                <label>
                    <input className='form-control' placeholder="Pokemon par ID" onChange={(event) => setSelectedId(Number(event.target.value))} />
                </label>
            </div>

            <table id="tbl-users" className="table table-hover">
                <thead id="table">
                    <tr>
                        <th>#</th>
                        <th>Apparence</th>
                        <th>Nom</th>
                        <th>Type(s)</th>
                        <th>HP</th>
                        <th>Attaque</th>
                        <th>Défense</th>
                        <th>Attaque spéciale</th>
                        <th>Défense spéciale</th>
                        <th>Speed</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((pokemon) => (
                        <tr key={pokemon.pokedexId}>
                            <td>{pokemon.pokedexId}</td>
                            <td><img src={pokemon.image} alt={pokemon.name} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{pokemon.name}</td>
                            <td><TypeImage types={pokemon.apiTypes} /></td>
                            <td>{pokemon.stats.HP}</td>
                            <td>{pokemon.stats.attack}</td>
                            <td>{pokemon.stats.defense}</td>
                            <td>{pokemon.stats.special_attack}</td>
                            <td>{pokemon.stats.special_defense}</td>
                            <td>{pokemon.stats.speed}</td>
                            <td>
                                <button onClick={() => capturePokemon(pokemon)}>Capturer</button>
                                <Link to={`/details/${pokemon.pokedexId}`}>Voir les détails</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedGeneration === 0 && (
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => {
                        handlePageChange(currentPage - 1)
                        scrollToTable();
                    }}>
                        Précédent
                    </button>

                    <select className="button-like-select" value={currentPage} onChange={(event) => {
                        handlePageChange(Number(event.target.value));
                        scrollToTable();
                    }}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>

                    <button disabled={currentPage === totalPages} onClick={() => {
                        handlePageChange(currentPage + 1)
                        scrollToTable();
                    }}>
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
}
export default display;