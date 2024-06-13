/* eslint-disable react/no-unescaped-entities */
'use client'
import { useEffect, useState } from 'react';
import { FaGamepad, FaPlay, FaCog, FaUser, FaHistory } from 'react-icons/fa';
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
  const [showHistory, setShowHistory] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);

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
      setTimeLimit(8);
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

  const handleShowHistory = () => {
    loadGameHistory();
    setShowHistory(true);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
  };

  const loadGameHistory = () => {
    const storedHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    setGameHistory(storedHistory);
  };

  const getRowClassName = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-green-500';
      case 1:
        return 'bg-yellow-500';
      case 2:
        return 'bg-orange-500';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div className="relative min-h-screen bg-game-background">
      {showModal && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="absolute  inset-0 bg-opacity-50 backdrop-blur-md"></div>
          {!showSettings ? (
            <div className="text-center border-4 border-game-accent p-14 rounded-3xl shadow-2xl bg-gray-800 text-white transform hover:scale-105 transition-transform duration-300 ease-in-out relative">
              <h1 className="text-5xl font-extrabold mb-6 text-game-accent animate-bounce">
                Random Letters <FaGamepad className="inline-block ml-2" />
              </h1>
              <p className="text-xl mb-4">
                Pressione as teclas na sequência correta o mais rápido possível!
                Você está pronto para o desafio?
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
                  <option
                    value="muito_dificil"
                    disabled={difficultSequencesCompleted < 5}
                  >
                    Muito difícil
                  </option>
                </select>
                <p className="text-sm mt-2 text-red-500">
                  Para desbloquear o modo "Muito difícil", complete 5 sequências
                  no modo "Difícil".
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
                <label className="text-xl mb-2 block">
                  Quantidade de Letras
                </label>
                <input
                  type="number"
                  value={letterCount}
                  readOnly
                  className="text-center px-4 py-2 rounded-lg shadow-inner bg-gray-700 text-white"
                />
              </div>
              <div className="flex items-center justify-center gap-4 mb-6">
                <label className="text-xl mb-2 block">
                  Salvar Histórico de Partida
                </label>
                <input
                  type="checkbox"
                  checked={saveGameHistory}
                  onChange={handleSaveGameHistoryChange}
                  className="rounded-lg shadow-inner bg-gray-700 text-white"
                />
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={handleSettingsSave}
                  className="bg-primary text-white rounded-full shadow-lg p-3 transform hover:scale-110 transition-transform duration-300 ease-in-out"
                >
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
      {showHistory && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-opacity-50 backdrop-blur-md"></div>
          <div className="text-center border-4 border-game-accent p-14 rounded-3xl shadow-2xl bg-black text-white transform hover:scale-105 transition-transform duration-300 ease-in-out relative">
            <h2 className="text-4xl font-bold mb-8">Histórico de Partidas</h2>
            <div className="w-full max-w-3xl overflow-x-auto">
              {gameHistory.length === 0 ? (
                <p className="text-xl text-gray-300">Nenhum jogo salvo.</p>
              ) : (
                <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
                  <thead>
                    <tr >
                      <th className="p-6 mx-5 text-gray-400 uppercase font-semibold">
                        Nome do Jogador
                      </th>
                      <th className="p-6  text-gray-400 uppercase font-semibold">
                        Pontuação
                      </th>
                      <th className="p-6  text-gray-400 uppercase font-semibold">
                        Recorde
                      </th>
                      <th className="p-6  text-gray-400 uppercase font-semibold">
                        Dificudade
                      </th>
                      <th className="p-12  text-gray-400 uppercase font-semibold">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameHistory
                      .sort((a, b) => b.highScore - a.highScore)
                      .map((game, index) => (
                        <tr key={index} className={`text-white ${getRowClassName(index)}`}>
                          <td className="py-4 px-6">{game.playerName}</td>
                          <td className="py-4 px-6">{game.score}</td>
                          <td className="py-4 px-6">{game.highScore}</td>
                          <td className="py-4 px-6">{game.difficulty}</td>
                          <td className="py-4 px-6">{game.date}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
            <button
              onClick={handleCloseHistory}
              className="mt-8 bg-primary text-white rounded-full shadow-lg px-6 py-3 transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
