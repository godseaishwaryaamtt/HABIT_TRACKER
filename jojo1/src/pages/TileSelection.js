import React from "react";
import { Link } from "react-router-dom";

const people = [
  { name: "Josna", image: "/jojo.png" },
  { name: "Aishwarya", image: "/aish.png" },
  { name: "Other", image: "/other.png" },
  {name : "Pepper", image: "/other.png"},
];

const TileSelection = () => {
  return (
    <div className="screen bg1">
      <div className="tiles">
        {people.map((person, index) => (
          <Link
            key={index}
            to={`/habit-tracker/${person.name.toLowerCase()}`} // Navigate to the habit tracking page
            className="tile clickable-tile "
          >
            <img
              src={person.image}
              alt={person.name}
              className="tile-image"
            />
            <p className="tile-name">{person.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TileSelection;