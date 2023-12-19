function displayMessage(str) {
  process.stdout.write(str);
  process.stdout.write('\n');
}

module.exports = displayMessage;
