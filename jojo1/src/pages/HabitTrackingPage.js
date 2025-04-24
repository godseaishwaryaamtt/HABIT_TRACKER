import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

export default function HabitTrackingPage() {
  const [missions, setMissions] = useState([]);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [newHabit, setNewHabit] = useState('');
  const [newPoints, setNewPoints] = useState('');

  const habitsRef = collection(db, "habits");
  const userDocRef = doc(db, "users", "defaultUser");

  // Fetch habits + XP/Coins on load
  useEffect(() => {
    const fetchData = async () => {
      const habitsSnapshot = await getDocs(habitsRef);
      const habitsFromDB = habitsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMissions(habitsFromDB);

      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        setXp(data.xp || 0);
        setCoins(data.coins || 0);
      } else {
        await setDoc(userDocRef, { xp: 0, coins: 0 });
      }
    };

    fetchData();
  }, []);

  const updateUserStats = async (newXP, newCoins) => {
    await updateDoc(userDocRef, { xp: newXP, coins: newCoins });
  };

  const handleComplete = async (points) => {
    const newXP = xp + points;
    const newCoins = coins + points * 2;
    setXp(newXP);
    setCoins(newCoins);
    await updateUserStats(newXP, newCoins);
  };

  const handleMiss = async (points) => {
    const newXP = Math.max(xp - points, 0);
    const newCoins = Math.max(coins - points * 2, 0);
    setXp(newXP);
    setCoins(newCoins);
    await updateUserStats(newXP, newCoins);
  };

  const handleAddHabit = async () => {
    if (!newHabit.trim() || !newPoints) return;

    const newMission = {
      name: newHabit,
      points: parseInt(newPoints),
    };

    const docRef = await addDoc(habitsRef, newMission);
    setMissions([...missions, { id: docRef.id, ...newMission }]);
    setNewHabit('');
    setNewPoints('');
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "habits", id));
    setMissions(missions.filter(m => m.id !== id));
  };

  const handleEdit = async (id) => {
    const name = prompt("Edit habit name:");
    const points = prompt("Edit habit points:");
    if (name && points) {
      const updated = { name, points: parseInt(points) };
      await updateDoc(doc(db, "habits", id), updated);
      setMissions(missions.map(m => m.id === id ? { ...m, ...updated } : m));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bbg.jpg')" }}
    >
      <div className="bg-white text-black p-6 rounded-xl w-full max-w-md shadow-2xl bg-opacity-90">
        <h1 className="text-3xl font-bold mb-4 text-pink-600">🎮 Pixel Habit Tracker</h1>

        <p className="mb-2 text-lg">⭐ XP: {xp}</p>
        <p className="mb-4 text-lg">💰 Coins: {coins}</p>

        <ul className="space-y-4 mb-6">
          {missions.map((mission) => (
            <li
              key={mission.id}
              className="flex justify-between items-center bg-pink-100 p-3 rounded-lg"
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

        <input
          type="text"
          placeholder="New habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="p-2 rounded w-full text-black mb-2 border border-gray-300"
        />
        <input
          type="number"
          placeholder="Points"
          value={newPoints}
          onChange={(e) => setNewPoints(e.target.value)}
          className="p-2 rounded w-full text-black mb-4 border border-gray-300"
        />
        <button
          onClick={handleAddHabit}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full"
        >
          ➕ Add Habit
        </button>
      </div>
    </div>
  );
}
