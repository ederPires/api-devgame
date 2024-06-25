// Importe as classes necessárias
import { CreateGameInput } from '../dtos/inputs/create-game-inputs';
import { GameResolver } from '../resolvers/game-resovers';
import { Game } from './models/game-model';

// Crie uma função para criar um novo jogo
async function createGame(inputData: CreateGameInput): Promise<Game> {
  const gameResolver = new GameResolver(/* Injetar dependências aqui, se necessário */);

  // Chame o método CreateGame do resolver com os dados fornecidos
  const newGame = await gameResolver.CreateGame(inputData);

  return newGame;
}

// Use a função para criar um novo jogo com os dados fornecidos
const inputData: CreateGameInput = {
  dateRelease: new Date("2024-06-23T00:00:00Z"),
  description: "Lorem ipson teste",
  name: "Novo game",
  rating: 7,
  site: "www.siteteste.com",
  genreId: "0f219fbd-60e8-477a-a6b0-4f682a3ec113"
};

createGame(inputData)
  .then((createdGame) => {
    console.log("Novo jogo criado:", createdGame);
  })
  .catch((error) => {
    console.error("Erro ao criar o jogo:", error);
  });
