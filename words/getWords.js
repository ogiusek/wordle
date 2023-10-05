function log_words() {
  const url = 'https://raw.githubusercontent.com/Icepickle/wordlist/master/words2.txt';
  fetch(url)
    .then(response => response.text())
    .then(result => {
      const words = result
        .split(result[2])
        .filter(e => e.length === 5);
      console.log(words.join(','));

    }).catch(console.log);
}