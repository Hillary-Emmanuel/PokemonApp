import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ pokemon, loading, infoPokemon }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!pokemon || pokemon.length === 0) {
    return <h2>No Pokémon found</h2>;
  }

  // Function to get a random background color
  const getRandomColor = () => {
    const colors = [
      "rgb(204, 191, 114)", // gold
      "#a2dbb1", // hot pink
      "#dee7f8", // sky blue
      "#90EE90", // light green
      "#fa5151", // light salmon
      "#FFE4B5", // moccasin
      "#AFEEEE", // pale turquoise
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Pokemon App</h1>
      <div className="card-container">
        {pokemon.map((item) => (
          <Link to={`/pokemon/${item.id}`} key={item.id}>
            <div
              className="card"
              style={{ backgroundColor: getRandomColor() }}
              onClick={() => infoPokemon(item)}
            >
              <h2>#{item.id}</h2>
              <img src={item.sprites.front_default} alt={`${item.name}`} />
              <h2>{item.name}</h2>
              <p>Height: {item.height}</p>
              <p>Weight: {item.weight}</p>
              <p>Species: {item.species?.name || "Unknown"}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Card;
