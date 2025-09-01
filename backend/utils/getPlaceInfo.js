import { GoogleGenAI } from "@google/genai";

async function getPlaceInfo(req, res) {
  const { city, location } = req.body;

  if (!city || !location) {
    return res.status(400).json({ error: "city and location are required" });
  }

  const prompt = `
You are an AI assistant tasked with providing detailed information for the place "${location}" located in "${city}".

Please return a JSON object including:

- name: string, official name of the place
- description: string, brief engaging description
- virtualTourCoords: object with numeric "lat" and "lng" fields for virtual street view
- photos: array of 5 to 6 descriptive photo keywords or tags for the place
- rating: float from 0 to 5
- address: string, full address
- otherDetails: object, any additional info

Output the JSON only, strictly valid JSON without any extra text or formatting.
`;

  try {
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

    const placeInfo = JSON.parse(cleanJsonText);

    res.json(placeInfo);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to fetch place information" });
  }
}

export default getPlaceInfo;
