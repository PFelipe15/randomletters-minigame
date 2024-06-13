 ## Getting Started

First, install the required dependencies by running:

```bash
npm install
# or
yarn install
# or
pnpm install
# or any other package manager you prefer
```
second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# MiniGame: Random Letter

O mini game "Random Letter" desafia os jogadores a pressionar as teclas corretas conforme uma sequência aleatória de letras é exibida na tela. O objetivo é acertar o máximo de letras possível dentro do limite de tempo estabelecido.

## Descrição do Jogo

O jogador será apresentado a uma sequência de letras aleatórias que aparecem na tela. Cada letra será exibida por um período de tempo limitado. O jogador deve pressionar a tecla correspondente à letra exibida antes que ela desapareça. O jogo mantém um registro do histórico de partidas e exibe um ranking dos melhores jogadores.

## Funcionalidades

- **Tempo Limite:** O jogo possui um tempo limite, e o jogador deve tentar acertar o máximo de letras dentro desse tempo.
- **Pontuação:** O jogador ganha pontos por cada letra que acertar.
- **Recorde de Pontuação:** Mantém o registro da pontuação mais alta alcançada pelo jogador.
- **Sequências Difíceis:** Em níveis mais difíceis, o jogador pode enfrentar sequências mais longas.
- **Histórico de Jogos:** O jogo mantém um histórico das partidas anteriores, incluindo o nome do jogador, pontuação e data.
- **Ranking:** Exibe um ranking dos melhores jogadores com base na pontuação mais alta.
- **Escolha de Dificuldade:** O jogador pode escolher a dificuldade do jogo, afetando a complexidade das sequências apresentadas.
- **Personalização de Nome:** Permite ao jogador inserir seu nome antes de iniciar a partida.

## Funcionalidades de Controle

- **Tecla de Letra:** Pressione a tecla correspondente à letra exibida na tela.
- **Reiniciar:** Permite reiniciar o jogo a qualquer momento.
- **Voltar:** Volta para a tela anterior ou menu principal do jogo.

## Componentes e Hooks Utilizados

- **useState:** Para controlar o estado do jogo, como a sequência de letras, pontuação, etc.
- **useEffect:** Utilizado para lidar com efeitos colaterais, como controle de tempo e eventos do teclado.
- **Progress Component:** Componente para exibir a barra de progresso do tempo restante.
- **lucide-react:** Utilizado para exibir ícones.

## Como Jogar

1. Ao iniciar o jogo, o jogador pode inserir seu nome e escolher a dificuldade.
2. Uma sequência de letras aleatórias é apresentada na tela.
3. Pressione a tecla correspondente à letra exibida o mais rápido possível.
4. Continue pressionando as teclas corretas para ganhar pontos.
5. O jogo termina quando o tempo acabar ou se você pressionar a tecla errada.
6. Se você conseguir uma pontuação alta, seu nome será exibido no ranking.
7. Tente bater seu próprio recorde e subir no ranking!

Divirta-se jogando o mini game "Random Letter" e teste seus reflexos e agilidade!
