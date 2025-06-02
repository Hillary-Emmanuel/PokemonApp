// src/components/Card/CardItem.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const CardItem = ({
  item,
  infoPokemon,
  getRandomColor,
  index,
  visibleIndex,
  setVisibleIndex,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && index === visibleIndex) {
      const timeout = setTimeout(() => {
        setVisibleIndex((prev) => prev + 1);
      }, 1000); // 1000ms = 1 second delay

      return () => clearTimeout(timeout);
    }
  }, [inView, index, visibleIndex, setVisibleIndex]);

  return (
    <Link to={`/pokemon/${item.id}`}>
      <div
        className="card"
        style={{ backgroundColor: getRandomColor() }}
        onClick={() => infoPokemon(item)}
        ref={ref}
      >
        <h2>#{item.id}</h2>
        {index <= visibleIndex ? (
          <img
            src={item.sprites.front_default}
            alt={item.name}
            loading="lazy"
          />
        ) : (
          <div style={{ height: "96px" }} /> // Empty placeholder for unloaded image
        )}
        <h2>{item.name}</h2>
        <p>Height: {item.height}</p>
        <p>Weight: {item.weight}</p>
        <p>Species: {item.species?.name || "Unknown"}</p>
      </div>
    </Link>
  );
};

export default CardItem;
