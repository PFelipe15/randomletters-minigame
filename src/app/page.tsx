'use client'
import { useState, useEffect } from 'react';
import Modal from '@/components/layout/modal';
import History from '@/components/layout/history';
import GameStart from '@/components/layout/start';

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

  const handleCloseModal = () => {
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

  return (
    <div className="relative min-h-screen bg-game-background">
      {showModal && (
        <Modal
          showSettings={showSettings}
          playerName={playerName}
          setPlayerName={setPlayerName}
          handleStartGame={handleStartGame}
          handleSettings={handleSettings}
          handleShowHistory={handleShowHistory}
          handleCloseModal={handleCloseModal}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          timeLimit={timeLimit}
          setTimeLimit={setTimeLimit}
          letterCount={letterCount}
          setLetterCount={setLetterCount}
          saveGameHistory={saveGameHistory}
          setSaveGameHistory={setSaveGameHistory}
          difficultSequencesCompleted={difficultSequencesCompleted}
        />
      )}
      {!showModal && (
        <GameStart
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
        <History gameHistory={gameHistory} handleCloseHistory={handleCloseHistory} />
      )}
    </div>
  );
}
