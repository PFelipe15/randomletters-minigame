import React from 'react';
import { FaPlay, FaCog, FaHistory, FaUser, FaGamepad } from 'react-icons/fa';
import Settings from './settings';

interface ModalProps {
  showSettings: boolean;
  playerName: string;
  setPlayerName: (name: string) => void;
  handleStartGame: () => void;
  handleSettings: () => void;
  handleShowHistory: () => void;
  handleCloseModal: () => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  timeLimit: number;
  setTimeLimit: (time: number) => void;
  letterCount: number;
  setLetterCount: (count: number) => void;
  saveGameHistory: boolean;
  setSaveGameHistory: (save: boolean) => void;
  difficultSequencesCompleted: number;
}

const Modal: React.FC<ModalProps> = ({
  showSettings,
  playerName,
  setPlayerName,
  handleStartGame,
  handleSettings,
  handleShowHistory,
  handleCloseModal,
  difficulty,
  setDifficulty,
  timeLimit,
  setTimeLimit,
  letterCount,
  setLetterCount,
  saveGameHistory,
  setSaveGameHistory,
  difficultSequencesCompleted
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-md" onClick={handleCloseModal}></div>
      {!showSettings ? (
        <div className="text-center border-4 border-game-accent p-14 rounded-3xl shadow-2xl bg-gray-800 text-white transform hover:scale-105 transition-transform duration-300 ease-in-out relative">
          <h1 className="text-5xl font-extrabold mb-6 text-game-accent animate-bounce">
            Random Letters <FaGamepad className="inline-block ml-2" />
          </h1>
          <p className="text-xl mb-4">
            Pressione as teclas na sequência correta o mais rápido possível! Você está pronto para o desafio?
          </p>
          <div className="mb-6 space-x-4">
            <FaUser size={30} className="inline-block text-game-accent" />
            <input
              type="text"
              placeholder="Digite seu nome"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="text-center px-4 py-2 rounded-lg shadow-inner bg-gray-700 text-white"
            />
          </div>
          <div className="flex gap-4 justify-center items-center">
            <button
              onClick={handleStartGame}
              className="bg-primary text-white rounded-full shadow-lg p-3 transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <FaPlay className="text-3xl" />
            </button>
            <button
              onClick={handleSettings}
              className="bg-primary text-white rounded-full shadow-lg p-3 transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <FaCog className="text-3xl" />
            </button>
            <button
              onClick={handleShowHistory}
              className="bg-primary text-white rounded-full shadow-lg p-3 transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <FaHistory className="text-3xl" />
            </button>
          </div>
        </div>
      ) : (
        <Settings
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          timeLimit={timeLimit}
          setTimeLimit={setTimeLimit}
          letterCount={letterCount}
          setLetterCount={setLetterCount}
          saveGameHistory={saveGameHistory}
          setSaveGameHistory={setSaveGameHistory}
          handleCloseModal={handleCloseModal}
          difficultSequencesCompleted={difficultSequencesCompleted}
        />
      )}
    </div>
  );
};

export default Modal;
