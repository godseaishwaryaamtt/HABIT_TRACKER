import React, { useState } from 'react';

const initialMissions = [
  { id: 1, name: "🛏️ Make your bed", points: 10 },
  { id: 2, name: "💧 Drink water", points: 5 },
  { id: 3, name: "📵 No phone for 1hr", points: 15 },
];

export default function App() {
  const [missions, setMissions] = useState(initialMissions);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [newHabit, setNewHabit] = useState('');
  const [newPoints, setNewPoints] = useState('');

  const handleComplete = (points) => {
    setXp(xp + points);
    setCoins(coins + points * 2);
  };

  const handleMiss = (points) => {
    setXp(prev => Math.max(prev - points, 0));
    setCoins(prev => Math.max(prev - points * 2, 0));
  };

  const handleAddHabit = () => {
    if (!newHabit.trim() || !newPoints) return;
    const newMission = {
      id: Date.now(),
      name: newHabit,
      points: parseInt(newPoints),
    };
    setMissions([...missions, newMission]);
    setNewHabit('');
    setNewPoints('');
  };

  const handleDelete = (id) => {
    setMissions(missions.filter(m => m.id !== id));
  };

  const handleEdit = (id) => {
    const name = prompt("Edit habit name:");
    const points = prompt("Edit habit points:");
    if (name && points) {
      setMissions(missions.map(m => m.id === id ? { ...m, name, points: parseInt(points) } : m));
    }
  };

  return (
    <div className="min-h-screen bg-pixelPurple text-white p-6 font-mono flex flex-col items-center gap-6">
      <div className="pixel-avatar"></div>
      <h1 className="text-3xl text-pixelPink font-bold animate-level-up">🎮 Pixel Habit Tracker</h1>

      <div className="bg-white/10 p-4 rounded-xl w-full max-w-md shadow-lg">
        <p className="mb-2 text-lg">⭐ XP: {xp}</p>
        <p className="mb-4 text-lg">💰 Coins: {coins}</p>

        <ul className="space-y-4">
          {missions.map((mission) => (
            <li
              key={mission.id}
              className="flex justify-between items-center bg-pixelPink/20 p-3 rounded-lg"
            >
              <span>{mission.name}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleComplete(mission.points)}
                  className="bg-green-500 px-2 py-1 rounded hover:bg-green-600"
                >✅</button>
                <button
                  onClick={() => handleMiss(mission.points)}
                  className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                >❌</button>
                <button
                  onClick={() => handleEdit(mission.id)}
                  className="bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
                >✏️</button>
                <button
                  onClick={() => handleDelete(mission.id)}
                  className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-800"
                >🗑️</button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <input
            type="text"
            placeholder="New habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            className="p-2 rounded w-full text-black mb-2"
          />
          <input
            type="number"
            placeholder="Points"
            value={newPoints}
            onChange={(e) => setNewPoints(e.target.value)}
            className="p-2 rounded w-full text-black mb-2"
          />
          <button
            onClick={handleAddHabit}
            className="bg-pixelPink text-white px-4 py-2 rounded hover:bg-pink-700 w-full"
          >
            ➕ Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}
