const readline = require('readline');

// Create an interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display welcome message and prompt for name
rl.question('Welcome to Holberton School, what is your name? ', (name) => {
  // Respond with personalized message
  console.log(`Your name is: ${name}`);

  // Close the interface and display closing message
  rl.close();
  console.log('This important software is now closing\n');
});

// Handle unexpected errors
rl.on('error', (err) => {
  console.error(err.message);
});
