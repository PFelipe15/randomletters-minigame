/* eslint-disable react/no-unescaped-entities */
import React from 'react';

interface SettingsProps {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  timeLimit: number;
  setTimeLimit: (time: number) => void;
  letterCount: number;
  setLetterCount: (count: number) => void;
  saveGameHistory: boolean;
  setSaveGameHistory: (save: boolean) => void;
  handleCloseModal: () => void;
  difficultSequencesCompleted: number;  
}

const Settings: React.FC<SettingsProps> = ({
  difficulty,
  setDifficulty,
  timeLimit,
  setTimeLimit,
  letterCount,
  setLetterCount,
  saveGameHistory,
  setSaveGameHistory,
  handleCloseModal,
  difficultSequencesCompleted
}) => {
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDifficulty(value);

    if (value === 'facil') {
      setTimeLimit(15);
      setLetterCount(5);
    } else if (value === 'medio') {
      setTimeLimit(10);
      setLetterCount(8);
    } else if (value === 'dificil') {
      setTimeLimit(8);
      setLetterCount(12);
    } else if (value === 'muito_dificil') {
      setTimeLimit(5);
      setLetterCount(15);
    }
  };

  return (
    <div className="text-center border-4 border-game-accent p-14 rounded-3xl shadow-2xl bg-black text-white transform hover:scale-105 transition-transform duration-300 ease-in-out relative">
      <h2 className="text-4xl font-bold mb-4">Configurações</h2>
      <div className="mb-6">
        <label className="text-xl mb-2 block">Dificuldade</label>
        <select
          value={difficulty}
          onChange={handleDifficultyChange}
          className="text-center px-4 py-2 rounded-lg shadow-inner bg-gray-700 text-white"
        >
          <option value="facil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="dificil">Difícil</option>
          <option value="muito_dificil" disabled={difficultSequencesCompleted < 5}>
            Muito difícil
          </option>
        </select>
        <p className="text-sm mt-2 text-red-500">
          Para desbloquear o modo "Muito difícil", complete 5 sequências no modo "Difícil".
        </p>
      </div>
      <div className="mb-4">
        <label className="text-xl mb-2 block">Tempo Limite</label>
        <input
          type="number"
          value={timeLimit}
          readOnly
          className="text-center px-4 py-2 rounded-lg shadow-inner bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="text-xl mb-2 block">Quantidade de Letras</label>
        <input
          type="number"
          value={letterCount}
          readOnly
          className="text-center px-4 py-2 rounded-lg shadow-inner bg-gray-700 text-white"
        />
      </div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <label className="text-xl mb-2 block">Salvar Histórico de Partida</label>
        <input
          type="checkbox"
          checked={saveGameHistory}
          onChange={(e) => setSaveGameHistory(e.target.checked)}
          className="rounded-lg shadow-inner bg-gray-700 text-white"
        />
      </div>
      <div className="flex gap-4 justify-center items-center">
        <button
          onClick={handleCloseModal}
          className="bg-primary text-white rounded-full shadow-lg p-3 transform hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default Settings;
