import React, { useEffect, useState } from "react";
import { TypeImage } from "./App";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function details() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [imageEvolution, setImageEvolution] = useState<string>('');
    const [imagePreEvolution, setImagePreEvolution] = useState<string>('');
 
    useEffect(() => {
        axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${id}`).then(response =>
            setPokemon(response.data))
    }, [id]);

    function getResistances(resistances: PokemonDetails['resistances']) {
        return resistances.map((resistance, index) => (
            <React.Fragment key={index}>
                {index !== 0 && <br />} {/* Ajoute un saut de ligne sauf pour le premier élément */}
                <div>
                    <strong>Résistance:</strong> {resistance.name}
                </div>
                <div>
                    <strong>Multiplicateur de dégâts:</strong> {resistance.damage_multiplier}x
                </div>
                <div>
                    <strong>Relation:</strong> {resistance.damage_relation}
                </div>
            </React.Fragment>
        ));
    }

    function getEvolutions(evolution: PokemonDetails['evolution'][0], preEvolution: PokemonDetails['preEvolution']) {
        return (
            <React.Fragment>
                {preEvolution.name ? (

                    axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon?.apiPreEvolution.pokedexIdd}`).then(response => {
                        setImagePreEvolution(response.data.image);
                    }),

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong>Evolution précédente : </strong> &nbsp; {preEvolution.pokedexIdd} {preEvolution.name} &nbsp; <img src={imagePreEvolution} style={{ width: 50, height: 50 }} />
                        <br />
                    </div>
                ) : (
                    <div>
                        <strong>Evolution précédente : </strong> aucune
                    </div>
                )}

                {evolution ? (
                    axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon?.apiEvolutions[0].pokedexId}`).then(response => {
                        setImageEvolution(response.data.image);
                    }),

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong>Evolution suivante : </strong> &nbsp; {evolution.pokedexId} {evolution.name} &nbsp; <img src={imageEvolution} style={{ width: 50, height: 50 }} />
                        <br />
                    </div>
                ) : (
                    <div>
                        <strong>Evolution suivante : </strong> aucune
                    </div>
                )}
            </React.Fragment>
        );
    }

    const evoliEvolutions: PokemonDetails['evolution'][] = [
        [
            { name: 'Pyroli', pokedexId: '136' },
            { name: 'Aquali', pokedexId: '134' },
            { name: 'Voltali', pokedexId: '135' },
            { name: 'Mentali', pokedexId: '196' },
            { name: 'Noctali', pokedexId: '197' },
            { name: 'Givrali', pokedexId: '471' },
            { name: 'Phyllali', pokedexId: '470' },
            { name: 'Nymphali', pokedexId: '700' },
        ],
    ];

    function getEvolutionOfEvoli() {
        return (
            <React.Fragment>
                <strong>Evolutions :</strong>
                {evoliEvolutions[0].map((evo, index) => (
                    <div key={index}>
                        {evo.pokedexId} {evo.name}
                    </div>
                ))}
            </React.Fragment>
        );
    }

    //   const fetchPokemonSuivant = async (pokemon: Pokemon) => {
    //     try {
    //       const response = await axios.get<PokemonDetails>(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon.pokedexId + 1}`);
    //       setSelectedPokemon(response.data);
    //     } catch (error) {
    //       console.error('Error fetching Pokemon details:', error);
    //     }
    //     scrollToTop();
    //   };

    //   const fetchPokemonPrecedent = async (pokemon: Pokemon) => {
    //     try {
    //       const response = await axios.get<PokemonDetails>(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon.pokedexId - 1}`);
    //       setSelectedPokemon(response.data);
    //     } catch (error) {
    //       console.error('Error fetching Pokemon details:', error);
    //     }
    //     scrollToTop();
    //   };

    return (
        <div>
            {pokemon && (
                <>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.image} alt={pokemon.name} />
                    <h3>Type(s)</h3>
                    <div className='centered-types'><TypeImage types={pokemon.apiTypes} /></div>
                    <br />
                    <h3>Stats</h3>
                    <div className="centered-stats">
                        <table>
                            <tbody>
                                <tr>
                                    <td>HP</td>
                                    <td>{pokemon.stats.HP}</td>
                                </tr>
                                <tr>
                                    <td>Attack</td>
                                    <td>{pokemon.stats.attack}</td>
                                </tr>
                                <tr>
                                    <td>Defense</td>
                                    <td>{pokemon.stats.defense}</td>
                                </tr>
                                <tr>
                                    <td>Special Attack</td>
                                    <td>{pokemon.stats.special_attack}</td>
                                </tr>
                                <tr>
                                    <td>Special Defense</td>
                                    <td>{pokemon.stats.special_defense}</td>
                                </tr>
                                <tr>
                                    <td>Speed</td>
                                    <td>{pokemon.stats.speed}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />

                    <h3>Resistances</h3>
                    <div className="centered-resistances">
                        <table>
                            <tbody>
                                <tr>
                                    <td>{getResistances(pokemon.apiResistances)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <h3>Family</h3>
                    <div className="centered-family">
                        <table>
                            <tbody>
                                <tr>
                                    <td>{pokemon.pokedexId === 133 ? getEvolutionOfEvoli() : getEvolutions(pokemon.apiEvolutions[0], pokemon.apiPreEvolution)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <button className="btn btn-primary" onClick={() => fetchPokemonPrecedent(pokemon)}>
      Pokemon Précédent
    </button>
    <button className="btn btn-primary" onClick={() => fetchPokemonSuivant(pokemon)}>
      Pokemon Suivant
    </button> */}
                    <br />
                    <button className="btn btn-primary">
                        <Link to={'../display.tsx'}>Retour</Link>
                    </button>

                    {/* {showScrollButton && (
      <button className="scroll-button" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowAltCircleUp} />
      </button>
    )} */}
                </>
            )}
        </div>
    );
}

export default details;