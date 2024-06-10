'use client'
import Link from 'next/link';
import { useState } from 'react';
import { FaGamepad } from 'react-icons/fa';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-primary">
      {!gameStarted ? (
        <div className="text-center border-4 border-primary p-10 rounded-3xl shadow-2xl bg-white transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h1 className="text-5xl font-extrabold mb-6 text-primary animate-pulse">
            Random Letters <FaGamepad className="inline-block ml-2" />
          </h1>
          <p className="text-xl mb-10 justify-center items-center text-gray-700 flex flex-col gap-4">
            Pressione as teclas na sequência correta o mais rápido possível!
            Você está pronto para o desafio?
           
          </p>

          <Link
            // onClick={startGame}
            href={'/start'}
            className="px-6 py-3 bg-primary text-white rounded-lg  shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            Iniciar Jogo
          </Link>
        </div>
      ) : (
        <Game />
      )}
    </main>
  );
}

function Game() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-white">O jogo começou!</h2>
    </div>
  );
}
