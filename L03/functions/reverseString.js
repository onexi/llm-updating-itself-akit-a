const execute = async (inputString) => {
  if (typeof inputString !== 'string') {
    throw new Error('Input must be a string.');
  }
  
  const reversedString = inputString.split('').reverse().join('');
  return { result: reversedString };
};

const details = {
  type: "function",
  function: {
    name: 'reverseString',
    parameters: {
      type: 'object',
      properties: {
        inputString: {
          type: 'string',
          description: 'The string to be reversed'
        }
      },
      required: ['inputString']
    },
  },
  description: 'Reverses a given string and returns the reversed string.'
};

export { execute, details };