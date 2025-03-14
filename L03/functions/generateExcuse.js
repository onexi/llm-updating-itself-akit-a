const execute = async (latenessLevel, randomSeed) => {
  const getExcuse = (level, seed) => {
    const excuses = [
      { believability: 1, messages: ["I overslept, sorry!", "My alarm didn't go off."] },
      { believability: 2, messages: ["The traffic was terrible.", "I got lost on my way here."] },
      { believability: 3, messages: ["I had a flat tire.", "The train was delayed."] },
      { believability: 4, messages: ["There was a power outage at my place.", "I had to take a detour due to a road closure."] },
      { believability: 5, messages: ["I had a medical emergency.", "I was helping someone in need."] }
    ];

    const filteredExcuses = excuses.filter(excuse => excuse.believability === level);
    if (filteredExcuses.length === 0) {
      return "No excuse available for the given believability level.";
    }

    const selectedExcuseGroup = filteredExcuses[0];
    const excuseIndex = seed % selectedExcuseGroup.messages.length;
    return selectedExcuseGroup.messages[excuseIndex];
  };

  return { result: getExcuse(latenessLevel, randomSeed) };
};

const details = {
  type: "function",
  function: {
    name: 'generateExcuse', 
    parameters: {
      type: 'object',
      properties: {
        latenessLevel: {
          type: 'number',
          description: 'The believability level of the excuse, from 1 (least believable) to 5 (most believable).'
        },
        randomSeed: {
          type: 'number',
          description: 'A seed value to randomly select an excuse within the believability level range.'
        }
      },
      required: ['latenessLevel', 'randomSeed']
    },
  },
  description: 'Generates an excuse for being late to work based on a believability level and a random seed.'
};

export { execute, details };