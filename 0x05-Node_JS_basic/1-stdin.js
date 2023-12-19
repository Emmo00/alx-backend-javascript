console.log('Welcome to Holberton School, what is your name?');

process.stdin.on('data', (name) => {
  process.stdout.write(`Your name is: ${name.toString('utf-8')}`);
  console.log('This important software is now closing ');
  process.exit();
});
