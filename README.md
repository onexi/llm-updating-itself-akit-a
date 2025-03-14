[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/gQNXeTiZ)
# FunctionAgents
Call Function from LLM

## Summary
 In this Pset05, based on L03, I implemented a feature that automatically generates new functions based on user input and adds them as available tools for GPT.

## Main features
1. Automatic generation of new functions based on user input
2. Saving the generated functions to a file and dynamically loading them
3. Utilization of the generated functions by GPT

## Examples of prompts that are easy to respond to
This program handles requests such as  "Create a function that does the following..." quite easily. However, while this program could create a function that divides two numbers, it was difficult to create a function that abstracts "Divide 9 by 2".
- Numerical calculations: "Create a function that multiplies two numbers."
- Text processing: "Generate a function that reverses a string."
- Jokes: "Write a function that generates excuses for being late to work, rated by believability."

## Usage
1. Start the server: node server.js
2. Access http://localhost:3000 in your browser.
3. Enter a function generation request in the user message field.
4. Click the "Run Agent" button to generate a new function.