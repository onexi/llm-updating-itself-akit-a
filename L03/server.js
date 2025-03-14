import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";

const app = express();
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const model = 'gpt-4-1106-preview';

app.use(express.static(path.resolve(process.cwd(), './public')));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

let state = {
    chatgpt: false,
    assistant_id: "",
    assistant_name: "",
    dir_path: "",
    news_path: "",
    thread_id: "",
    user_message: "",
    run_id: "",
    run_status: "",
    vector_store_id: "",
    tools: [],
    parameters: []
};

app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), './public/index.html'));
});

async function getFunctions() {
    const files = fs.readdirSync(path.resolve(process.cwd(), "./functions"));
    const openAIFunctions = {};

    for (const file of files) {
        if (file.endsWith(".js")) {
            const moduleName = file.slice(0, -3);
            const modulePath = `./functions/${moduleName}.js`;
            const { details, execute } = await import(modulePath);

            openAIFunctions[moduleName] = {
                "details": details,
                "execute": execute
            };
        }
    }
    return openAIFunctions;
}

function generate_prompt(prmpt) {
    return `Generate a JavaScript function to ${prmpt}. The function MUST be wrapped in a code block with \`\`\`javascript and \`\`\`. It should export "execute" and "details" as follows:
    \`\`\`javascript
    const execute = async (param1, param2) => {
      // Function implementation
      return { result: /* operation */ };
    };
  
    const details = {
      type: "function",
      function: {
        name: 'functionName', // Replace with an appropriate name
        parameters: {
          type: 'object',
          properties: {
            param1: {
              type: 'number',
              description: 'Description of param1'
            },
            param2: {
              type: 'number',
              description: 'Description of param2'
            }
          },
          required: ['param1', 'param2']
        },
      },
      description: 'Function description'
    };
  
    export { execute, details };
    \`\`\`
    Ensure the function name and description match the specific operation requested.`;
  }
  
 
function addFunctionAsFile(mes) {
    const code_start_delimiter = "```javascript";
    const end_delimiter = "```";
    const code_start_index = mes.indexOf(code_start_delimiter);
    const code_end_index = mes.lastIndexOf(end_delimiter);
    if (code_start_index >= 0 && code_end_index > code_start_index) {
        const code_part = mes.slice(code_start_index + code_start_delimiter.length, code_end_index).trim();
        console.log("Extracted code:", code_part);
        const funcNameMatch = code_part.match(/name:\s*['"](\w+)['"]/);
        if (funcNameMatch) {
            const funcname = funcNameMatch[1];
            try {
                fs.writeFileSync("./functions/" + funcname + ".js", code_part);
                console.log(`Function "${funcname}" has been added!`);
                return funcname;
            } catch (file_write_error) {
                console.error(`File write failed: ${file_write_error}`);
            }
        }
    }
    console.error("Failed to extract function name or code block");
    console.error("Full message content:", mes);
    return "";
}
  
app.post('/api/execute-function', async (req, res) => {
    const { functionName, parameters } = req.body;
    console.log("Received functionName:", functionName);
    console.log("Received parameters:", parameters);

    const functions = await getFunctions();

    if (!functions[functionName]) {
        return res.status(404).json({ error: 'Function not found' });
    }

    try {
        const result = await functions[functionName].execute(...Object.values(parameters));
        console.log(`Result: ${JSON.stringify(result)}`);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Function execution failed', details: err.message });
    }
});

app.post('/api/openai-call', async (req, res) => {
    const { user_message } = req.body;
    const functions = await getFunctions();
    const availableFunctions = Object.values(functions).map(fn => fn.details);
    
    let messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: user_message }
    ];

    try {
        const response = await openai.chat.completions.create({
            model: model,
            messages: messages,
            tools: availableFunctions
        });

        const assistantResponse = response.choices[0].message;
        messages.push(assistantResponse);

        if (assistantResponse.tool_calls) {
            for (const toolCall of assistantResponse.tool_calls) {
                const functionName = toolCall.function.name;
                const parameters = JSON.parse(toolCall.function.arguments);

                const result = await functions[functionName].execute(...Object.values(parameters));

                messages.push({
                    role: "tool",
                    content: JSON.stringify(result),
                    tool_call_id: toolCall.id
                });
            }

            const finalResponse = await openai.chat.completions.create({
                model: model,
                messages: messages
            });

            res.json({ message: finalResponse.choices[0].message.content, state: state });
        } else {
            const AiGeneratedResponse = await openai.chat.completions.create({
                model: model,
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: generate_prompt(user_message) }
                ]
            });
            const generatedFunctionName = addFunctionAsFile(AiGeneratedResponse.choices[0].message.content);
            if (generatedFunctionName) {
                res.json({ message: `New function '${generatedFunctionName}' has been created and saved.`, state: state });
            } else {
                res.json({ message: "Failed to generate and save function.", state: state });
            }
        }
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'OpenAI API failed', details: error.message });
    }
});


app.post('/api/prompt', async (req, res) => {
    state = req.body;
    try {
        res.status(200).json({ message: `got prompt ${state.user_message}`, "state": state });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'User Message Failed', "state": state });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/api/get-functions', async (req, res) => {
    try {
      const functions = await getFunctions();
      const functionList = Object.entries(functions).map(([name, data]) => ({
        name: name,
        description: data.details.description
      }));
      
      res.json({ 
        functions: functionList,
        state: state 
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to get functions',
        details: error.message 
      });
    }
  });
  
  

