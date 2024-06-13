import React from 'react';

interface HistoryProps {
  gameHistory: Array<{
    playerName: string;
    score: number;
    highScore: number;
    difficulty: string;
    date: string;
  }>;
  handleCloseHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ gameHistory, handleCloseHistory }) => {
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
                <tr>
                  <th className="p-6 mx-5 text-gray-400 uppercase font-semibold">Nome do Jogador</th>
                  <th className="p-6 text-gray-400 uppercase font-semibold">Pontuação</th>
                  <th className="p-6 text-gray-400 uppercase font-semibold">Recorde</th>
                  <th className="p-6 text-gray-400 uppercase font-semibold">Dificuldade</th>
                  <th className="p-12 text-gray-400 uppercase font-semibold">Data</th>
                </tr>
              </thead>
              <tbody>
                {gameHistory.sort((a, b) => b.highScore - a.highScore).slice(0, 6).map((game, index) => (
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
  );
};

export default History;
