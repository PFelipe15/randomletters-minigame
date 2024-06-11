'use client'
import { useState, useEffect, useRef } from 'react';
import { Progress } from "@/components/ui/progress";
import { User } from 'lucide-react';

export default function Start({ playerName, onBack, timeLimit, letterCount, setDifficultSequencesCompleted, difficulty }) {
  const [sequence, setSequence] = useState(['']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [inputLetter, setInputLetter] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [wrongKey, setWrongKey] = useState('');
  const [correctKeys, setCorrectKeys] = useState<number[]>([]);
  const lettersArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const newSequence = Array.from({ length: letterCount }, () => lettersArray[Math.floor(Math.random() * lettersArray.length)]);
    setSequence(newSequence);
  }, [letterCount]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      timeRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !gameOver) {
      setGameOver(true);
      
      if (score > highScore) {
        setHighScore(score);
      }
    }

    return () => clearTimeout(timeRef.current);
  }, [timeLeft, gameOver]);

  useEffect(() => {
    if (!gameOver) {
      progressRef.current = setTimeout(() => setProgress(progress + 1), 1000);
    }
    return () => clearTimeout(progressRef.current);
  }, [progress, gameOver]);

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    if (key.toUpperCase() === sequence[currentIndex]) {
      setCurrentIndex(currentIndex + 1);
      setInputLetter('');
      setScore(score + 1);
      setCorrectKeys([...correctKeys, currentIndex]); // Adiciona o índice da tecla correta ao array
      if (currentIndex === sequence.length - 1) {
        alert("Conseguiu passar da sequência, nova sequência sendo formada");
        setProgress(0);
        setTimeLeft(timeLimit);
        const newSequence = Array.from({ length: letterCount }, () => lettersArray[Math.floor(Math.random() * lettersArray.length)]);
        setSequence(newSequence);
        setCurrentIndex(0);
        setCorrectKeys([]);

        if (difficulty === 'dificil') {
          setDifficultSequencesCompleted((prev) => prev + 1);
        }
      }
    } else {
      setInputLetter(key.toUpperCase());
      setGameOver(true);
      setWrongKey(key.toUpperCase());
      if (score > highScore) {
        setHighScore(score);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [currentIndex, sequence]);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setProgress(0);
    setTimeLeft(timeLimit);
    setCurrentIndex(0);
    setWrongKey('');
    setCorrectKeys([]);
    const newSequence = Array.from({ length: letterCount }, () => lettersArray[Math.floor(Math.random() * lettersArray.length)]);
    setSequence(newSequence);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-10  text-white">
      <div className="space-y-8 text-center px-20 py-8 rounded-3xl shadow-lg bg-black opacity-90">
        <h2 className="text-6xl font-bold mb-8">Random Letter</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card bg-gray-800 p-4 rounded-xl shadow-md transition transform hover:scale-105">
            <div className="text-xl">Tempo:</div>
            <div className="text-3xl font-bold">{timeLeft}s</div>
          </div>
          <div className="card bg-gray-800 p-4 rounded-xl shadow-md transition transform hover:scale-105">
            <div className="text-xl">Pontuação:</div>
            <div className="text-3xl font-bold">{score}</div>
          </div>
          <div className="card bg-gray-800 p-4 rounded-xl shadow-md transition transform hover:scale-105">
            <div className="text-xl">Recorde:</div>
            <div className="text-3xl font-bold">{highScore}</div>
          </div>
          <div className=" flex items-center justify-center my-2 col-span-3">
             <span className=" flex gap-2 min-w-[20px] justify-center items-center text-3xl font-bold ml-2"> <User size={25}/> {playerName}</span>
          </div>
        </div>
        <div className="card bg-gray-800 p-4 rounded-xl shadow-md mb-8 transition transform hover:scale-105">
          <div className="text-xl">Sequência:</div>
          <div className="text-3xl font-bold space-x-2">
            {sequence.map((letter, index) => (
              <span key={index} className={currentIndex === index ? 'text-4xl text-yellow-300' : (correctKeys.includes(index) ? 'text-4xl text-green-500' : 'text-3xl')}>
                {letter}
              </span>
            ))}
          </div>
        </div>
        {gameOver && (
          <div className="card bg-red-500 p-4 rounded-xl shadow-md transition transform hover:scale-105">
            <div className="text-3xl font-bold">Fim de jogo!</div>
            {wrongKey && (
              <div className="text-xl font-bold text-yellow-300">Tecla errada: {wrongKey}</div>
            )}
            {timeLeft === 0 && gameOver && (
              <div className="text-xl font-bold text-yellow-300">Tempo chegou a 0</div>
            )}
          </div>
        )}
        <Progress value={progress} max={timeLimit} className="mb-8" />
        <div className='flex gap-4 items-center justify-center'>
          <button onClick={restartGame} className="text-xl bg-green-500 px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-110">Reiniciar</button>
          <button onClick={onBack} className="text-xl bg-green-500 px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-110">Voltar</button>
        </div>
      </div>
    </div>
  );
}
