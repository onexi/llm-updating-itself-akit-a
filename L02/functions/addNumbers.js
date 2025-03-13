const execute = async (numbers) => {
    if (Array.isArray(numbers)) {
        return { result: numbers.reduce((a, b) => a + b, 0) };
    } else if (typeof numbers === 'object') {
        return { result: Object.values(numbers).reduce((a, b) => a + b, 0) };
    } else {
        throw new Error('Invalid input: expected an array or object of numbers');
    }
};

const details = {
    type: "function",
    function: {
        name: 'addNumbers',
        parameters: {
            type: 'object',
            properties: {
                numbers: {
                    type: 'array',
                    items: {
                        type: 'number'
                    },
                    description: 'An array of numbers to add'
                }
            },
            required: ['numbers']
        },
    },
    description: 'This function adds an array of numbers and returns the result.'
};

export { execute, details };
