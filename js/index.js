const selectInput = () => html.input.select();

const setInputValue = (text) => {
  inputs = inputs.map(e => {
    !e.added && (e.value = text.toLowerCase());
    return e;
  });
  setTimeout(updateUi, 0);
}

const onInput = () => {
  if (!won) {
    setInputValue(html.input.value);
    if (inputs.length > 1)
      inputs[inputs.length - 2].animate = false;
  } else {
    html.input.style.disabled = true;
  }
}

function onWordSubmit(e) {
  if (won) return;
  e.preventDefault();
  inputs[inputs.length - 1].added = true;
  if (inputs.length !== initLifes)
    inputs.push(getNewRow());
  else
    modal = `You lost word is ${word}`;

  html.input.value = "";
  setInputValue("");
  won = inputs.filter(e => e.value === word && e.added).length !== 0 || inputs.filter(e => e.added).length === initLifes;

  updateUi();
}

function removeModal() {
  modal = "";
  updateUi();
}

function updateUi() {
  html.app.innerHTML = `<button onclick="selectInput()" class="wordle">
    ${Array(initLifes).fill(0).map((e, cI) => {
    const added = (inputs.at(cI)?.added ? (inputs.at(cI)?.animate ? 'add' : 'added') : '');

    return `<div class="column">
        ${Array(words[0].length).fill(0).map((e, tI) => {
      const value = inputs.at(cI)?.value[tI];
      const color = value === word[tI] ? "#0f0" : (word.includes(value) ? "orange" : "darkgray");

      return `<div class="tile ${added}" style="--color: ${color};">${value ? value : ""}</div>`;
    }).join("")}
      </div>`}).join("")}
  </button>${won && modal !== "" ? `<div class="alert" onclick="removeModal()">
    <p>${modal}</p>
    <button >ok</button>
  </div>` : ""}`;
}

function reset() {
  word = getRandomWord();
  inputs = [getNewRow()];
  modal = "You won";
  won = false;
  updateUi();
  selectInput();
}

reset();
updateUi();