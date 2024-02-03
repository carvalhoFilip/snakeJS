//Funções de apoio
const adjust = n => f => xs => mapi(x => i => i == n ? f(x) : x)(xs)    //  
const dropFirst = xs => xs.slice(1)   //  Recebe xs e retorna um vetor xs referente a primeira movimentacao da cobra
const dropLast = xs => xs.slice(0, xs.length - 1)    // Recebe xs e retorna um vetor xs com comeco e fim
const id = x => x    //  Recebe um id 'x' e retorna ele próprio
const k = x => y => x   //  Recebe como parametro x e y e retorna o primeiro parametro passado que é x 
const map = f => xs => xs.map(f)    // Recebe os parametros f e xs e retorna um vetor xs recebendo f 
const mapi = f => xs => xs.map((x, i) => f(x)(i))    // Recebe f , xs e um vetor xs com parametros x e i e retorna uma funcao com os parametros do vetor xs
const merge = o1 => o2 => Object.assign({}, o1, o2)   // Recebe dois vetores e retorna um objeto com começo e fim
const mod = x => y => ((y % x) + x) % x   // Recebe y e x e retorna o resto da divisão "y/x"
const objOf = k => v => ({ [k]: v })    // Recebe k e v e retorna um objeto com base nesse k e v recebidos
const pipe = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x)   // Recebe parametros e aplica uma funcao em reduce , transformando os parametros recebidos em um unico resultado 
const prop = k => o => o[k]    // Recebe dois parametros e extrai o valor de 'k' desse objeto 'o' 
const range = n => m => Array.apply(null, Array(m - n)).map((_, i) => n + i)    //  Cria um intervalo entre números 
const rep = c => n => map(k(c))(range(0)(n))    // Recebe dois parametros e retorna um vetor com uma funcao range dentro dele
const rnd = min => max => Math.floor(Math.random() * max) + min   // Recebe um valor minimo e maximo para determinar um intervalo de valores possiveis e retorna um valor aleatorio dentro deste intervalo
const spec = o => x => Object.keys(o)    // Recebe um objeto 'o' e então recebe um valor 'k' e então pega as chaves desse objeto e mapeia. Sobre as chaves contrói um novo objeto. A partir desse k , executa a função que se esconde sob essa chave e aplica essa função nesse x passado como argumento e depois reduz a mesclagem, então simplesmente mescla todas variações de objetos, em apenas um objeto
  .map(k => objOf(k)(o[k](x)))
  .reduce((acc, o) => Object.assign(acc, o))

module.exports = { adjust, dropFirst, dropLast, id, k, map, merge, mod, objOf, pipe, prop, range, rep, rnd, spec }    //  Realiza exportação das funções
