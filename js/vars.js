const html = {
  input: document.getElementById('input'),
  app: document.getElementById('app')
};

const initLifes = 6;
let inputs = [];
let word = "";
let won = false;
let modal = "You Won";


const getNewRow = () => { return { value: "", added: false, animate: true } };
const getRandomWord = () => words[Math.floor(words.length * Math.random())];
