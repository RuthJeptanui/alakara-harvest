import axios from 'axios';

const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
// Fallback model if Mistral is busy: "google/flan-t5-large"

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  const apiKey = process.env.HUGGING_FACE_API_KEY;

  if (!apiKey) {
    console.warn("Hugging Face API Key missing. Using fallback logic.");
    return fallbackLogic(userMessage);
  }

  try {
    // Construct a prompt that gives the AI a persona
    const systemPrompt = `You are Alakara Harvest, an expert agricultural assistant for Kenyan farmers. 
    You help with post-harvest loss reduction for Mangoes, Tomatoes, and Oranges. 
    Keep answers concise, practical, and helpful for a farmer.
    User Question: "${userMessage}"
    Answer:`;

    const response = await axios.post<{ generated_text?: string }[]>(
      HF_API_URL,
      { 
        inputs: systemPrompt,
        parameters: { 
          max_new_tokens: 250, // Limit length
          temperature: 0.7,    // Creativity balance
          return_full_text: false 
        } 
      },
      {
        headers: { Authorization: `Bearer ${apiKey}` }
      }
    );

    // Hugging Face returns an array. We want the generated text.
    let aiText = response.data[0]?.generated_text || "";
    
    // Cleanup: sometimes models repeat the prompt, remove it if necessary
    aiText = aiText.replace(systemPrompt, '').trim();

    if (!aiText) return fallbackLogic(userMessage);

    return aiText;

  } catch (error) {
    console.error("AI Service Error:", error);
    return fallbackLogic(userMessage);
  }
};

// Keep your original logic as a reliable fallback if the API is down/slow
const fallbackLogic = (message: string): string => {
  const msg = message.toLowerCase();
  if (msg.includes('mango')) return "For mangoes, harvest when shoulders are full. Store at 13°C.";
  if (msg.includes('tomato')) return "Harvest tomatoes at breaker stage. Store between 12-15°C.";
  if (msg.includes('orange')) return "Clip oranges carefully. Store at 5-8°C with high humidity.";
  return "I can help with harvesting, storage, and market advice for mangoes, tomatoes, and oranges. What do you need help with?";
};