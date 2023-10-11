////////////////////////  TASK I  ////////////////////////////////

function moveLetter(word) {
    if (word.length <= 1) {
      return word;
    }
  
    return word.slice(1) + word[0];
  }
  
  const modifiedWord = moveLetter("selector");
  console.log(modifiedWord);