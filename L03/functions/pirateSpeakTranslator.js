const pirateSpeakTranslator = (sentence) => {
  const dictionary = {
    hello: "ahoy",
    hi: "yo-ho-ho",
    my: "me",
    friend: "matey",
    beer: "grog",
    yes: "aye",
    no: "nay",
    goodbye: "yo ho ho"
  };

  return sentence
    .split(/\b/)
    .map(word => dictionary[word.toLowerCase()] || word)
    .join('');
};

const execute = async (englishSentence) => {
  const pirateSentence = pirateSpeakTranslator(englishSentence);
  return { result: pirateSentence };
};

const details = {
  type: "function",
  function: {
    name: 'pirateSpeakTranslator',
    parameters: {
      type: 'object',
      properties: {
        englishSentence: {
          type: 'string',
          description: 'The English sentence to be translated into pirate speak'
        }
      },
      required: ['englishSentence']
    },
  },
  description: 'Translates an English sentence into pirate speak using a predefined dictionary'
};

export { execute, details };