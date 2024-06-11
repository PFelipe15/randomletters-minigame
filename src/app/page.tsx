/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react';
import { FaGamepad, FaPlay, FaCog, FaUser } from 'react-icons/fa';
import Start from '@/components/layout/start';

export default function Home() {
  const [playerName, setPlayerName] = useState('Jogador');
  const [showModal, setShowModal] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [difficulty, setDifficulty] = useState('facil');
  const [timeLimit, setTimeLimit] = useState(15);
  const [letterCount, setLetterCount] = useState(5);
  const [difficultSequencesCompleted, setDifficultSequencesCompleted] = useState(0);
  const [saveGameHistory, setSaveGameHistory] = useState(false);

  const handleStartGame = () => {
    setShowModal(false);
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

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
      setTimeLimit(10);
      setLetterCount(12);
    } else if (value === 'muito_dificil') {
      setTimeLimit(5);
      setLetterCount(15);
    }
  };

  const handleSettingsSave = () => {
    setShowSettings(false);
  };

  const handleSaveGameHistoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveGameHistory(e.target.checked);
  };

  return (
    <div className="relative min-h-screen bg-game-background">
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
          {!showSettings ? (
            <div className="text-center border-4 border-game-accent p-14 rounded-3xl shadow-2xl bg-black text-white transform hover:scale-105 transition-transform duration-300 ease-in-out relative">
              <h1 className="text-5xl font-extrabold mb-6 text-game-accent animate-bounce">
                Random Letters <FaGamepad className="inline-block ml-2" />
              </h1>
              <p className="text-xl mb-4">
                Pressione as teclas na sequência correta o mais rápido possível!
                Você está pronto para o desafio?
              </p>
              <div className="mb-6 space-x-4">
                <FaUser className="inline-block text-game-accent" />
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="text-center px-4 py-2 rounded-lg shadow-inner bg-gray-700 text-white"
                />
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button onClick={handleStartGame} className="bg-primary text-white rounded-full shadow-lg p-3 transform hover:scale-110 transition-transform duration-300 ease-in-out">
                  <FaPlay className="text-3xl" />
                </button>
                <button onClick={handleSettings} className="bg-primary text-white rounded-full shadow-lg p-3 transform hover:scale-110 transition-transform duration-300 ease-in-out">
                  <FaCog className="text-3xl" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center border-4 border-game-accent p-14 rounded-3xl shadow-2xl bg-black text-white transform hover:scale-105 transition-transform duration-300 ease-in-out relative">
              <h2 className="text-4xl font-bold mb-4">Configurações</h2>
              <div className="mb-6">
                <label className="text-xl mb-2 block">Dificuldade</label>
                <select value={difficulty} onChange={handleDifficultyChange} className="text-center px-4 py-2 rounded-lg shadow-inner bg-gray-700 text-white">
                  <option value="facil">Fácil</option>
                  <option value="medio">Médio</option>
                  <option value="dificil">Difícil</option>
                  <option value="muito_dificil" disabled={difficultSequencesCompleted < 5}>Muito difícil</option>
                </select>
                <p className="text-sm mt-2 text-red-500">
                  Para desbloquear o modo "Muito difícil", complete 5 sequências no modo "Difícil".
                </p>
              </div>
              <div className="mb-4">
                <label className="text-xl mb-2 block">Tempo Limite</label>
                <input type="number" value={timeLimit} readOnly className="text-center px-4 py-2 rounded-lg shadow-inner bg-gray-700 text-white" />
              </div>
              <div className="mb-4">
                <label className="text-xl mb-2 block">Quantidade de Letras</label>
                <input type="number" value={letterCount} readOnly className="text-center px-4 py-2 rounded-lg shadow-inner bg-gray-700 text-white" />
              </div>
              <div className="flex items-center justify-center gap-4 mb-6">
                <label className="text-xl mb-2 block">Salvar Histórico de Partida</label>
                <input type="checkbox" checked={saveGameHistory} onChange={handleSaveGameHistoryChange} className="rounded-lg shadow-inner bg-gray-700 text-white" />
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button onClick={handleSettingsSave} className="bg-primary text-white rounded-full shadow-lg p-3 transform hover:scale-110 transition-transform duration-300 ease-in-out">
                  Salvar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {!showModal && (
        <Start
          playerName={playerName}
          onBack={handleShowModal}
          timeLimit={timeLimit}
          letterCount={letterCount}
          setDifficultSequencesCompleted={setDifficultSequencesCompleted}
          difficulty={difficulty}
          saveGameHistory={saveGameHistory}
        />
      )}
    </div>
  );
}
