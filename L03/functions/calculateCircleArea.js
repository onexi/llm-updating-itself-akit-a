const execute = async (radius) => {
  // Calculate area of a circle given the radius
  const area = Math.PI * radius * radius;
  return { result: area };
};

const details = {
  type: "function",
  function: {
    name: 'calculateCircleArea',
    parameters: {
      type: 'object',
      properties: {
        param1: {
          type: 'number',
          description: 'Radius of the circle'
        },
        param2: {
          type: 'number',
          description: 'Unused parameter, included for structure consistency'
        }
      },
      required: ['param1']
    },
  },
  description: 'Calculates the area of a circle given its radius.'
};

export { execute, details };