console.log('Welcome to Holberton School, what is your name?');

process.stdin.on('readable', () => {
  const name = process.stdin.read();
  if (name) process.stdout.write(`Your name is: ${name.toString('utf-8')}`);
});

process.stdin.on('end', () => {
  console.log('This important software is now closing ');
});
