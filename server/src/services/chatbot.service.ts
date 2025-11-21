// This object (chatbotResponses) would be in this file or imported
const chatbotResponses = {
  greeting: "Habari! I'm Alakara's AI assistant. I can help with post-harvest for mangoes, tomatoes, and oranges. What's on your mind?",
  general: "I can provide advice on harvesting, storage, and transport for mangoes, tomatoes, and oranges. Please specify the crop and your question.",
  mango: {
    harvesting: "Harvest mangoes when they are physiologically mature (full-rounded shoulders). Clip them with a 1-2cm stem to avoid sap burn.",
    storage: "Store mature-green mangoes at 10-13°C. Ripe mangoes can be stored at 7-10°C for a few days.",
    transport: "Transport in cool, ventilated trucks, preferably during early morning or night. Use cushioned crates to prevent bruising."
  },
  tomato: {
    harvesting: "Harvest tomatoes at the 'breaker' stage (first signs of color) for long-distance transport. For local markets, harvest at the pink or red stage.",
    storage: "Store tomatoes at 12-15°C. Never refrigerate below 10°C, as this causes chilling injury and loss of flavor.",
    transport: "Use rigid plastic crates, not bags. Avoid stacking more than 2-3 layers high without proper support."
  },
  orange: {
    harvesting: "Harvest oranges by clipping them from the tree, leaving no stem. Do not pull them. Harvest based on color and size (check market requirements).",
    storage: "Store oranges at 5-8°C with high humidity (85-90%). Proper ventilation is key to prevent mold.",
    transport: "Use firm, ventilated boxes. Ensure the fruit is packed snugly to prevent movement and bruising during transit."
  }
};

// The same logic from your component, now on the server
export const generateBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Crop-specific responses
  if (message.includes('mango')) {
    if (message.includes('harvest')) return chatbotResponses.mango.harvesting;
    if (message.includes('storage') || message.includes('store')) return chatbotResponses.mango.storage;
    if (message.includes('transport')) return chatbotResponses.mango.transport;
    return "I can help you with mango harvesting, storage, and transport. What specific aspect would you like to know about?";
  }
  
  if (message.includes('tomato')) {
    if (message.includes('harvest')) return chatbotResponses.tomato.harvesting;
    if (message.includes('storage') || message.includes('store')) return chatbotResponses.tomato.storage;
    if (message.includes('transport')) return chatbotResponses.tomato.transport;
    return "I can help you with tomato harvesting, storage, and transport. What specific aspect would you like to know about?";
  }
  
  if (message.includes('orange')) {
    if (message.includes('harvest')) return chatbotResponses.orange.harvesting;
    if (message.includes('storage') || message.includes('store')) return chatbotResponses.orange.storage;
    if (message.includes('transport')) return chatbotResponses.orange.transport;
    return "I can help you with orange harvesting, storage, and transport. What specific aspect would you like to know about?";
  }

  // General topics
  if (message.includes('loss') || message.includes('reduce')) {
    return "To reduce post-harvest losses: 1) Harvest at the right time, 2) Handle carefully, 3) Store properly, 4) Transport efficiently. Which crop are you working with?";
  }
  
  if (message.includes('price') || message.includes('market')) {
    return "For current market prices and best selling times, check our Market Data section. Generally, morning hours (6-10 AM) are best for selling fresh produce.";
  }
  
  if (message.includes('hello') || message.includes('hi') || message.includes('habari')) {
    return "Habari! I'm here to help you reduce post-harvest losses. Which crop would you like advice on - mangoes, tomatoes, or oranges?";
  }

  // Default response
  return chatbotResponses.general;
};