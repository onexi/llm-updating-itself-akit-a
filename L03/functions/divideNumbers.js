const divideNumbers = async (param1, param2) => {
  if (param2 === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return { result: param1 / param2 };
};

const details = {
  type: "function",
  function: {
    name: 'divideNumbers', // A name that indicates the operation of division
    parameters: {
      type: 'object',
      properties: {
        param1: {
          type: 'number',
          description: 'The dividend.'
        },
        param2: {
          type: 'number',
          description: 'The divisor. Must not be zero.'
        }
      },
      required: ['param1', 'param2']
    },
  },
  description: 'Divides the first number by the second number and returns the result.'
};

export { divideNumbers as execute, details };