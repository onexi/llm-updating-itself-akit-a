const isPrime = (number) => {
  if (number <= 1) return false; // Numbers less than or equal to 1 are not prime
  if (number <= 3) return true; // 2 and 3 are prime numbers

  // If divisible by 2 or 3, it's not prime
  if (number % 2 === 0 || number % 3 === 0) return false;

  // Check for divisibility by all other numbers up to the square root
  for (let i = 5; i * i <= number; i += 6) {
    if (number % i === 0 || number % (i + 2) === 0) return false;
  }
  
  return true;
};

const execute = async (param1) => {
  // Assuming `param1` is the number to be checked
  const result = isPrime(param1);
  return { result };
};

const details = {
  type: "function",
  function: {
    name: 'isPrime', // The name of the function
    parameters: {
      type: 'object',
      properties: {
        param1: {
          type: 'number',
          description: 'The number to be checked whether it is a prime number or not.'
        }
      },
      required: ['param1']
    },
  },
  description: 'Checks if a given number is a prime number.'
};

export { execute, details };