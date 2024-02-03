const canvas = document.getElementById('canvas')    //   Obtendo elemento do documento
const ctx = canvas.getContext('2d')   //  Retornando um contexto de desenho no canvas

// Estado é mutável
let state = initialState()

// Posicionamento
const x = c => Math.round(c * canvas.width / state.cols)
const y = r => Math.round(r * canvas.height / state.rows)

// Desenho do laço do jogo
const draw = () => {
  // limpa
  ctx.fillStyle = '#232323'
  ctx.fillRect(0, 0, canvas.width, canvas.height)   //  Zera o tabuleiro imprimindo outro limpo e substituindo o passado

  // desenha cobra
  ctx.fillStyle = 'rgb(0,200,50)'
  state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))    //  Percorre as coordenadas do tabuleiro e imprime a cobra 

  // desenha maçãs
  ctx.fillStyle = 'rgb(255,50,0)'
  ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))    //  Percorre as coordenadas do tabuleiro e imprime a maçã

  // adiciona choque
  if (state.snake.length == 0) {
    ctx.fillStyle = 'rgb(255,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)   //  Implementa a chance da cobra se chocar e reiniciar o jogo
  }

  // adiciona contagem de maçãs
  ctx.fillStyle = 'rgb(255,255,255)'
  ctx.fillText('N° de Maçãs: ' + (state.snake.length - 1), 10, 15, canvas.height - 10)
}

// Eventos do teclado
window.addEventListener('keydown', e => {   //  Direcionamento da cobra pelo teclado 
  switch (e.key) {
    case 'w': case 'h': case 'ArrowUp': state = enqueue(state, NORTH); break
    case 'a': case 'j': case 'ArrowLeft': state = enqueue(state, WEST); break
    case 's': case 'k': case 'ArrowDown': state = enqueue(state, SOUTH); break
    case 'd': case 'l': case 'ArrowRight': state = enqueue(state, EAST); break
  }
})

/**
 * LAÇO PRINCIPAL DO JOGO
 */

const step = t1 => t2 => {    //  Atualiza loop do jogo
  if (t2 - t1 > 100) {
    state = next(state)
    draw()
    window.requestAnimationFrame(step(t2))
  } else {
    window.requestAnimationFrame(step(t1))
  }
}

draw(); window.requestAnimationFrame(step(0))
