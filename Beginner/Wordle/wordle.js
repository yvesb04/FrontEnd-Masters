const ANSWER_LENGTH = 5;
const NUM_ANSWERS = 6;
const letters = document.querySelectorAll(".game-word");

async function init() {
  let rowNumber = 0;
  let currentWord = "";

  const wordAPI = await fetch(
    "https://words.dev-apis.com/word-of-the-day?random=1"
  );
  const wordJSON = await wordAPI.json();
  const wordOfDay = wordJSON.word;

  console.log(wordOfDay);

  document.addEventListener("keyup", function (event) {
    const letter = event.key;
    if (letter === "Enter") {
      handleEnter(letter);
    } else if (letter === "Backspace") {
      handleBackSpace(letter);
    } else if (isLetter(letter) == true) {
      handleLetter(letter);
    }
    console.log(currentWord);
  });

  async function handleEnter(enter) {
    if (currentWord.length === 5) {
      // TODO
      const validateWord = await fetch(
        "https://words.dev-apis.com/validate-word",
        {
          method: "POST",
          body: JSON.stringify({ word: currentWord }),
        }
      );
      const validation = await validateWord.json();
      wordIsValid = validation.validWord;

        //Check first for correct
      for (let i = 0; i < 5; i++) {
        if (currentWord[i] == wordOfDay[i]) {
          letters[rowNumber * ANSWER_LENGTH + i].classList.add(
            "letter-correct"
          );
        }
      }



      if (currentWord === wordOfDay) {
        alert("YOU WON");
      } else if (wordIsValid) {
        //Check if word exists and identify words colors
        //Go next line
        rowNumber++;
        currentWord = "";
      }
    }
  }
  function handleBackSpace(backspace) {
    if (currentWord != "") {
      currentWord = currentWord.slice(0, -1);
      letters[rowNumber * ANSWER_LENGTH + currentWord.length].innerHTML = "";
    }
  }
  function handleLetter(letter) {
    if (currentWord.length < ANSWER_LENGTH) {
      currentWord += letter;
      letters[rowNumber * ANSWER_LENGTH + currentWord.length - 1].innerHTML =
        letter;
      console.log(letters);
    }
  }
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

init();
