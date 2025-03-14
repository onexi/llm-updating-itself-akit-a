const napTimeCalculator = async (cupsOfCoffee, hoursSinceLastNap) => {
  // Assuming every cup of coffee shortens the ideal nap time by 10 minutes, and
  // every hour since the last nap increases the need by 5 minutes
  const BASE_NAP_LENGTH = 90; // 90 minutes is a full sleep cycle and a commonly suggested nap length
  let idealNapLength = BASE_NAP_LENGTH - cupsOfCoffee * 10 + hoursSinceLastNap * 5;

  // Ensure that the nap length is not negative and does not exceed a full sleep cycle
  idealNapLength = Math.max(20, idealNapLength); // Minimal 20 minutes for a power nap
  idealNapLength = Math.min(BASE_NAP_LENGTH, idealNapLength); // Cap the nap at one full sleep cycle

  return { result: idealNapLength };
};

const details = {
  type: "function",
  function: {
    name: 'napTimeCalculator',
    parameters: {
      type: 'object',
      properties: {
        cupsOfCoffee: {
          type: 'number',
          description: 'The number of cups of coffee consumed prior to the nap'
        },
        hoursSinceLastNap: {
          type: 'number',
          description: 'The number of hours since the person last took a nap'
        }
      },
      required: ['cupsOfCoffee', 'hoursSinceLastNap']
    },
  },
  description: 'Calculates the perfect nap length based on coffee consumption and time since the last nap'
};

export { napTimeCalculator as execute, details };