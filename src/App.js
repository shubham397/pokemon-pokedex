import React, { useState } from "react";
import "./App.css";

export function App(props) {
  const [pokemonName, setPokemonName] = useState("");
  const [type, setType] = useState([]);
  const [image, setImage] = useState("");
  const [weakness, setWeakness] = useState([]);
  const search = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName.toLowerCase())
      .then((result) => result.json())
      .then((result) => {
        setImage(result?.sprites?.other?.["official-artwork"]?.front_default);
        let temp = [];
        result?.types?.map((pokemon) => temp.push(pokemon?.type?.name));
        setType(temp);

        let weakTemp = new Set();
        result?.types?.map((pokemon) => {
          fetch(pokemon?.type?.url)
            .then((r) => r.json())
            .then((r) => {
              r?.damage_relations?.double_damage_from?.map((type) =>
                weakTemp.add(type.name)
              );
              setWeakness(Array.from(weakTemp));
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <input
        placeholder="Pokemon Name"
        value={pokemonName}
        onChange={(e) => {
          setPokemonName(e.target.value);
        }}
      />
      <br />
      <button onClick={search}>Search</button>
      {type.length > 0 && (
        <>
          <br />
          <img alt="Pokemon" src={image} width="200" height="200" />

          <div className="typeDiv">
            <h3>Type</h3>
            <div className="innerTypeDiv">
              {type.map((t, index) => {
                return <p className="type">{t}</p>;
              })}
            </div>
          </div>

          <div className="weaknessDiv">
            <h3>Weakness</h3>
            <div className="innerWeaknessDiv">
              {weakness.map((t, index) => {
                return <p className="weakness">{t}</p>;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
