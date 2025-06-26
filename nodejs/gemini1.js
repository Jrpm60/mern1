// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    
  });
  const config = {
    temperature: 0.75,
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: 'text/plain',
    systemInstruction: [
        {
          text: `Quiero que el usuario introduzca una direccion en un formato libre y obtener una respuesta de texto estructurado .
Texto libre:  san pedro 17 en Irun 20305
el resultado seria:
{
calle:"San Pedro, 17",
ciudad:"irun",
zip:"20305",
provincia:"Guipuzcoa",
pais:"España"
}`,
        }
    ],
  };
  const model = 'gemini-2.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
