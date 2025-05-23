// src/components/HomePage.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../Card/Card";
import PokemonDetails from "../PokemonDetails/PokemonDetails"; // This acts like Pokeinfo
import "./HomePage.css";

function HomePage() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [pokeDex, setPokeDex] = useState(null);

  const fetchPokemonList = useCallback(async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemonDetails(res.data.results);
    setLoading(false);
  }, [url]);

  const getPokemonDetails = async (results) => {
    const detailedData = await Promise.all(
      results.map(async (pokemon) => {
        const result = await axios.get(pokemon.url);
        return result.data;
      })
    );
    detailedData.sort((a, b) => a.id - b.id);
    setPokeData(detailedData);
  };

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  return (
    <div className="container">
      <div className="left-content">
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPokemon={(poke) => setPokeDex(poke)}
        />
        <div className="btn-group">
          {prevUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(prevUrl);
              }}
            >
              Previous
            </button>
          )}
          {nextUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="right-content">
        <PokemonDetails data={pokeDex} />
      </div>
    </div>
  );
}

export default HomePage;
