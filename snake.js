const base = require('./base')  // Importar arquivo "base.js"
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

// Constantes de movimentação
const NORTH = { x: 0, y: -1 }  //  Cordenadas para realizar a movimentação na dreção do Norte
const SOUTH = { x: 0, y: 1 }  //  Cordenadas para realizar a movimentação na dreção do Sul
const EAST = { x: 1, y: 0 }  //  Cordenadas para realizar a movimentação na dreção do Leste
const WEST = { x: -1, y: 0 }  //  Cordenadas para realizar a movimentação na dreção do Oeste

const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y  // Operação com os pontos 

// Funções de ações
const willEat = state => pointEq(nextHead(state))(state.apple)  //  Quando chegar no ponto que antes era a determinada maçã se tornará mais um elemento da cobra
const willCrash = state => state.snake.find(pointEq(nextHead(state)))   //  Quando qualquer ponto da cobra se chocar com ela mesma, será reiniciada
const validMove = move => state =>
  state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0  //  Verifica se está se movimentando

// Próximos valores baseados no estado atual
const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves    //  Verificar se os movimentos do usuário são válidos e realizá-los
const nextApple = state => willEat(state) ? rndPos(state) : state.apple   //  Verificar se a maçã foi comida para que, caso seja verdade, gerar outra posição para a mesma
const nextHead = state => state.snake.length == 0
  ? { x: 2, y: 2 }
  : {
    x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
  }
const nextSnake = state => willCrash(state)   //  Verificar se a cobra se quebrou para poder reiniciar
  ? []
  : (willEat(state)   //  Caso tenha comido a maçã, irá aumentar
    ? [nextHead(state)].concat(state.snake)
    : [nextHead(state)].concat(dropLast(state.snake)))

// Aleatoriedade
const rndPos = table => ({    //  Delimitando as codernadas da tabela em x e y
  x: rnd(0)(table.cols - 1),
  y: rnd(0)(table.rows - 1)
})

// Estado inicial
const initialState = () => ({   //  Definindo as codernadas do mapa, da cobra que será iniciada e também da maçã
  cols: 20,
  rows: 14,
  moves: [EAST],
  snake: [],
  apple: { x: 16, y: 2 },
})

const next = spec({   //  Um novo mapa formado a partir dos acontecimentos 
  rows: prop('rows'),
  cols: prop('cols'),
  moves: nextMoves,
  snake: nextSnake,
  apple: nextApple
})

const enqueue = (state, move) => validMove(move)(state)   //  Recebe e organizar os movimentos inseridos pelo usuário
  ? merge(state)({ moves: state.moves.concat([move]) })
  : state

module.exports = { EAST, NORTH, SOUTH, WEST, initialState, enqueue, next, }   //  Realiza exportação das funções
