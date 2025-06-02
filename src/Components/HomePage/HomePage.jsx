// src/components/HomePage.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../Card/Card";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import "./HomePage.css";

function HomePage() {
  const [pokeData, setPokeData] = useState([]);
  const [allPokeData, setAllPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [pokeDex, setPokeDex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    setAllPokeData(detailedData); // Save full data for search reference
  };

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  // Handle search
  const handleSearch = () => {
    if (searchTerm === "") {
      setPokeData(allPokeData);
    } else {
      const filtered = allPokeData.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPokeData(filtered);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="container">
      <div className="left-content">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

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
