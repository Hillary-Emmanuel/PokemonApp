import React, { useState } from "react";
import CardItem from "./CardItem";
import "./Card.css";

const Card = ({ pokemon, loading, infoPokemon }) => {
  const [visibleIndex, setVisibleIndex] = useState(0); // Track which image is currently visible

  if (loading) return <h1>Loading...</h1>;
  if (!pokemon || pokemon.length === 0) return <h2>No Pokémon found</h2>;

  const getRandomColor = () => {
    const colors = [
      "rgb(204, 191, 114)",
      "#a2dbb1",
      "#dee7f8",
      "#90EE90",
      "#fa5151",
      "#FFE4B5",
      "#AFEEEE",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Pokemon App</h1>
      <div className="card-container">
        {pokemon.map((item, index) => (
          <CardItem
            key={item.id}
            index={index}
            visibleIndex={visibleIndex}
            setVisibleIndex={setVisibleIndex}
            item={item}
            infoPokemon={infoPokemon}
            getRandomColor={getRandomColor}
          />
        ))}
      </div>
    </>
  );
};

export default Card;
