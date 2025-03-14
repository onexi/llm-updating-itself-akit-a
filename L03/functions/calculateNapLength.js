const calculateNapLength = async (cupsOfCoffee, hoursSinceLastCup) => {
  // Assuming that one cup of coffee reduces the ideal nap length by 10 minutes,
  // while each hour since the last cup slightly increases it, up to a max of 90 minutes.
  const BASE_NAP_LENGTH = 90; // Ideal nap length without coffee in minutes
  const COFFEE_REDUCTION = 10; // Reduction of nap time per cup of coffee
  const HOUR_INCREMENT = 5; // Increment of nap time for each hour since the last cup of coffee
  
  let napLength = BASE_NAP_LENGTH - (cupsOfCoffee * COFFEE_REDUCTION);
  napLength += hoursSinceLastCup * HOUR_INCREMENT;
  
  // Cap the nap length to be between 10 minutes and 90 minutes
  napLength = Math.max(10, Math.min(napLength, BASE_NAP_LENGTH));

  return { result: napLength };
};

const details = {
  type: "function",
  function: {
    name: 'calculateNapLength', // Indicates the function's purpose
    parameters: {
      type: 'object',
      properties: {
        param1: {
          type: 'number',
          description: 'The number of cups of coffee consumed'
        },
        param2: {
          type: 'number',
          description: 'The number of hours since the last cup of coffee was consumed'
        }
      },
      required: ['param1', 'param2']
    },
  },
  description: 'Determines the ideal length of a nap in minutes based on the amount of coffee consumed and the time elapsed since the last cup'
};

export { calculateNapLength as execute, details };