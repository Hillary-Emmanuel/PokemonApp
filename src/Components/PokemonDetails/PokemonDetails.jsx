import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InView } from "react-intersection-observer";
import "./PokemonDetails.css";

const knownTypes = [
  "grass",
  "fire",
  "water",
  "bug",
  "normal",
  "poison",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "ghost",
  "ice",
  "dragon",
  "dark",
  "steel",
  "flying",
];

const fallbackColors = [
  "#a8a878",
  "#f08030",
  "#6890f0",
  "#78c850",
  "#f8d030",
  "#c03028",
  "#a040a0",
  "#e0c068",
  "#98d8d8",
  "#7038f8",
];

function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();
  }, [id]);

  function getTypeStyle(typeName) {
    const normalized = typeName.toLowerCase();
    if (knownTypes.includes(normalized)) {
      return { className: `type-${normalized}` };
    } else {
      const randomColor =
        fallbackColors[Math.floor(Math.random() * fallbackColors.length)];
      return { style: { backgroundColor: randomColor, color: "white" } };
    }
  }

  if (!data) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading Pokémon details...</p>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
      <div className="pokemon-details-container">
        <div
          className={`pokemon-header type-${data.types[0].type.name.toLowerCase()}`}
        >
          <h1 className="pokemon-name">
            {data.name} <span className="pokemon-id">#{data.id}</span>
          </h1>

          <InView triggerOnce threshold={0.1}>
            {({ inView, ref }) => (
              <div ref={ref}>
                {inView && (
                  <img
                    className="pokemon-image"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                    alt={data.name}
                  />
                )}
              </div>
            )}
          </InView>

          <div className="pokemon-types">
            {data.types.map((t, i) => {
              const { className, style } = getTypeStyle(
                t.type.name.toLowerCase()
              );
              return (
                <span
                  key={i}
                  className={`type-badge ${className || ""}`}
                  style={style}
                >
                  {t.type.name}
                </span>
              );
            })}
          </div>
        </div>

        {/* 🔽 TABS */}
        <div className="tab-header">
          <button
            className={activeTab === "general" ? "active" : ""}
            onClick={() => setActiveTab("general")}
          >
            General Info
          </button>
          <button
            className={activeTab === "abilities" ? "active" : ""}
            onClick={() => setActiveTab("abilities")}
          >
            Abilities
          </button>
          <button
            className={activeTab === "stats" ? "active" : ""}
            onClick={() => setActiveTab("stats")}
          >
            Base Stats
          </button>
        </div>

        {/* 🔽 CONTENT */}
        <div className="pokemon-info">
          {activeTab === "general" && (
            <div className="group">
              <p>Height: {data.height}</p>
              <p>Weight: {data.weight}</p>
              <p>Species: {data.species?.name || "Unknown"}</p>
            </div>
          )}

          {activeTab === "abilities" && (
            <div className="abilities">
              {data.abilities.map((poke, index) => (
                <div className="group" key={index}>
                  <p>{poke.ability.name}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "stats" && (
            <div className="base-stat">
              {data.stats.map((poke, index) => (
                <div key={index} className="stat-row">
                  <span className="stat-name">{poke.stat.name}</span>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{ width: `${poke.base_stat}%` }}
                    />
                  </div>
                  <span className="stat-value">{poke.base_stat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PokemonDetails;
