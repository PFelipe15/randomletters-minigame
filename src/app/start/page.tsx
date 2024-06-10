'use client'
import { useState, useEffect, useRef } from 'react';
import * as React from "react"
 import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
export default function Start() {
  const [sequence, setSequence] = useState(['']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [inputLetter, setInputLetter] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [progress, setProgress] = useState(0)
  const lettersArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const timeRef =   useRef<NodeJS.Timeout | null>(null);  
  const { toast } = useToast()

  useEffect(() => {
    const newSequence = Array.from({ length: 5 }, () => lettersArray[Math.floor(Math.random() * lettersArray.length)]);
    setSequence(newSequence);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      timeRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
    }

    return () => clearTimeout(timeRef.current);
  }, [highScore, score, timeLeft]);

 useEffect(() => {
   const timer = setTimeout(() => setProgress(progress + 1), 1000);
   return () => clearTimeout(timer);
 }, [progress]);

  const handleKeyPress = (event:KeyboardEvent) => {
    const { key } = event;
    if (key.toUpperCase() === sequence[currentIndex]) {
      setCurrentIndex(currentIndex + 1);
      setInputLetter('');
      setScore(score + 1);
      if (currentIndex + 1 === sequence.length) {
        alert('Parabéns, você completou a sequência!');
      }
    } else {
      setInputLetter(key.toUpperCase());
      setGameOver(true);
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
    setScore(0)
    setProgress(0);
    setCurrentIndex(0);
    setTimeLeft(10);
    const newSequence = Array.from({ length: 5 }, () => lettersArray[Math.floor(Math.random() * lettersArray.length)]);
    setSequence(newSequence);
  }; 
  
return (
  <div className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
    <div className="space-y-8 text-center px-20 py-8 rounded-3xl shadow-lg bg-black opacity-90">
      <h2 className="text-6xl font-bold mb-8">Random Letter</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card bg-gray-800 p-4 rounded-xl shadow-md">
          <div className="text-xl">Tempo:</div>
          <div className="text-3xl font-bold">{timeLeft}s</div>
        </div>
        <div className="card bg-gray-800 p-4 rounded-xl shadow-md">
          <div className="text-xl">Pontuação:</div>
          <div className="text-3xl font-bold">{score}</div>
        </div>
        <div className="card bg-gray-800 p-4 rounded-xl shadow-md">
          <div className="text-xl">Recorde:</div>
          <div className="text-3xl font-bold">{highScore}</div>
        </div>
      </div>
      <div className="card bg-gray-800 p-4 rounded-xl shadow-md mb-8">
        <div className="text-xl">Sequência:</div>
        <div className="text-3xl font-bold space-x-2">
          {sequence.map((letter, index) => (
            <span key={index} className={currentIndex === index ? 'text-4xl text-yellow-300' : 'text-3xl'}>
              {letter}
            </span>
          ))}
        </div>
      </div>
      
       
      {gameOver && <div className="card bg-red-500 p-4 rounded-xl shadow-md">
        <div className="text-3xl font-bold">Fim de jogo!</div>
      </div>}
      <Progress value={progress}  max={10}  />
      <div className='flex gap-4 items-center justify-center'>

      <button onClick={restartGame} className="text-xl bg-green-500 px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-110">Reiniciar</button>
      <button onClick={restartGame} className="text-xl bg-green-500 px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-110">Voltar</button>
      </div>
    </div>
  </div>
);


}
