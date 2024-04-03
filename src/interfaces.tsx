interface PokemonType {
  name: string;
  image: string;
}

interface PokemonDetails extends Pokemon {
  resistances: {
    name: string;
    damage_multiplier: number;
    damage_relation: string;
  }[];

  evolution: {
    name: string;
    pokedexId: string;
  }[];

  preEvolution: {
    name: string;
    pokedexIdd: string;
  };

  image: string;
}

interface Pokemon {
  name: string;
  apiTypes: PokemonType[];
  apiResistances: PokemonDetails['resistances'];
  apiEvolutions: PokemonDetails['evolution'];
  apiPreEvolution: PokemonDetails['preEvolution'];

  stats: {
    HP: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };

  image: string;
  pokedexId: number;
  apiGeneration: number;
}