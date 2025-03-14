const adjectives = ["Wild", "Mystic", "Electric", "Savage", "Mighty"];
const animals = ["Panthers", "Wolves", "Eagles", "Dragons", "Sharks"];

const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const generateBandName = () => {
    return getRandomElement(adjectives) + " " + getRandomElement(animals);
};

const execute = async (param1, param2) => {
    // Ignore param1 and param2 for random generation, simply provide band name
    // To adhere to the request, though, a more complex implementation could use these parameters
    return { result: generateBandName() };
};

const details = {
    type: "function",
    function: {
        name: 'generateBandName', // Name of the function
        parameters: {
            type: 'object',
            properties: {
                param1: {
                    type: 'number',
                    description: 'Not used in random generation of band names'
                },
                param2: {
                    type: 'number',
                    description: 'Not used in random generation of band names'
                }
            },
            required: ['param1', 'param2']
        },
    },
    description: 'Generates a random band name by combining an adjective and an animal.'
};

export { execute, details };