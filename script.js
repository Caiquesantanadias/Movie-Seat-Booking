const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizzard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];

const wrongletters = [];


//update the Wrong letters
function updateWrongLetterEl() {
    wrongLettersEl.innerHTML = `
    ${wrongletters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongletters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
    const erros = wrongletters.length;

    if(index < erros ) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
    })

}

//show notification 
function showNotification() {
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  },2300)
}


//show hidden word

function displayWord() {
    wordEl.innerHTML = `
      ${selectedWord
        .split('')
        .map(
          letter => `
          <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
          </span>
          `
        )
        .join('')}        
    `
const innerWord = wordEl.innerText.replace(/\n/g, '')

if (innerWord === selectedWord) {
  finalMessage.innerText = 'Congratulations! You Won !! :)'
  popup.style.display = 'flex';

}

}
// keydown letter press
window.addEventListener('keydown', e => {
 
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if(selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      } 
    } else { 
      if(!wrongletters.includes(letter)) {
        wrongletters.push(letter);

        updateWrongLetterEl();
      } else {
        showNotification()
      }
    }
  }

})

displayWord();