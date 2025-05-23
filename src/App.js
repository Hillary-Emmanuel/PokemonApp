// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy-loaded components
const HomePage = lazy(() => import("./Components/HomePage/HomePage"));
const PokemonDetails = lazy(() =>
  import("./Components/PokemonDetails/PokemonDetails")
);

function App() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Suspense>
  );
}

export default App;
