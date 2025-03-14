const convertTemperature = async (temperature, targetScale) => {
  let result;
  if (targetScale === 'C') {
    result = (temperature - 32) * 5/9; // Convert Fahrenheit to Celsius
  } else if (targetScale === 'F') {
    result = (temperature * 9/5) + 32; // Convert Celsius to Fahrenheit
  } else {
    throw new Error('Invalid target scale. Use "C" for Celsius or "F" for Fahrenheit.');
  }
  return { result: result };
};

const details = {
  type: "function",
  function: {
    name: 'convertTemperature',
    parameters: {
      type: 'object',
      properties: {
        temperature: {
          type: 'number',
          description: 'The temperature value to convert'
        },
        targetScale: {
          type: 'string',
          description: 'The target temperature scale "C" for Celsius or "F" for Fahrenheit'
        }
      },
      required: ['temperature', 'targetScale']
    },
  },
  description: 'Converts temperatures between Celsius and Fahrenheit'
};

export { convertTemperature as execute, details };