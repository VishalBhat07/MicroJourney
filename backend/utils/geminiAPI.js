import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

async function generateTourStops(city, interests) {
  const prompt = `You are a helpful AI assistant generating personalized walking tours for travelers.

Create a walking tour for the city of "${city}" tailored to the user's interests in "${interests}".

Please return a JSON array of stops in the order they should be visited.  
Each stop is an object with the following fields:
- name: string, the name of the stop or landmark
- description: string, a brief engaging trivia or information about the stop (1-3 sentences)
- coordinates: an object with numeric fields "lat" and "lng" for the stop's latitude and longitude
- estimatedMinutesAtStop: number, approx time in minutes a visitor should spend at the stop

Your output must be strictly valid JSON without any extra text, explanations, or formatting.  
Do not include markdown or code block fences.  
Provide at least 5 stops if possible, covering interesting or iconic places related to the interests.

Example output:
[
  {
    "name": "Eiffel Tower",
    "description": "The world-famous Paris landmark offering spectacular city views.",
    "coordinates": { "lat": 48.8584, "lng": 2.2945 },
    "estimatedMinutesAtStop": 40
  },
  ...
]  
`;
  const ai = new GoogleGenAI({});

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  function extractJson(text) {
    return text
      .replace(/```json/gi, "") // remove ```json (case-insensitive)
      .replace(/```/g, "") // remove remaining ```
      .trim();
  }

  const cleanJsonText = extractJson(response.text);

  console.log("Cleaned JSON text:", cleanJsonText);

  const stops = JSON.parse(cleanJsonText);

  return stops;
}

export default generateTourStops;
