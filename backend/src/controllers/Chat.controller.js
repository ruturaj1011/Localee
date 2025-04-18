import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const chatWithAI = async (req, res) => {
  const { prompt, user } = req.body;

  if (!prompt) {
    return res.status(400).json({ reply: "Please enter a question." });
  }

  let context = `You are a smart assistant for a platform called Localee that connects users to local vendors and service providers like electricians, plumbers, salon services, etc.\n`;

  context += `
Reply concisely using markdown-style bullet points or numbered lists:
• Each service or data point must be on a new line
• Use this format:
  - **Field**: Value
• Avoid repeating "undefined" or showing empty fields
• Do NOT group too many details in one line
• Add a heading like **Services Offered** or **Latest Booking** for better clarity
• Avoid long paragraphs, and always separate sections with a newline
• Only use emojis for greetings or friendly tone—not in lists
`;

  context += `
Project Name: Localee

Tech Stack: MERN Stack (MongoDB, Express.js, React.js, Node.js)

Overview:
Localee is a full-stack web app that connects users with local service providers such as electricians, plumbers, beauticians, lawyers, tutors, brokers, photographers, and more. It aims to digitize local services and offer users a fast, trusted, and location-based booking experience.

User Features:
- Explore services based on category, location, rating, and pricing
- Adjustable radius filter using geolocation
- View vendor profiles with service details, images, ratings, and reviews
- Book/cancel/reschedule services
- Rate and review vendors
- Access booking history

Vendor Features:
- Register/login via a separate vendor portal
- Add/edit/delete service listings with full details
- Set pricing, descriptions, working hours, and availability
- Dedicated dashboard to manage bookings and reviews
- Receive user feedback for quality improvement

Additional Integrations:
- Google Map for map-based service location filtering
- Tailwind CSS for responsive design
- AI chatbot planned for user/vendor assistance
- Future: Payment gateway integration

Goal:
Localee aims to empower local service providers with digital tools and provide users with a simple, fast, and secure way to access trustworthy nearby services. It addresses real-world needs such as home repairs, tutoring, legal advice, grooming, and freelance bookings.

`;

  if (user) {
    context += `The user is logged in as a ${user.role}. Name: ${user.name}. Email: ${user.email}.\n`;

    // Add services offered by the user
    if (user.servicesOffered && user.servicesOffered.length > 0) {
      context += `\n**Services Offered**:\n`;
      user.servicesOffered.forEach((service) => {
        context += `- **Service Name**: ${service.serviceName}\n`;
        context += `  **Category**: ${service.category}\n`;
        context += `  **Description**: ${
          service.description || "Not provided"
        }\n`;
        context += `  **Location**: ${
          service.location
            ? `${service.location.city}, ${service.location.state}`
            : "Not provided"
        }\n\n`;
      });
    }

    // Add booking details for the user
    if (user.bookings && user.bookings.length > 0) {
      context += `\n**Latest Booking**:\n`;
      const recentBooking = user.bookings[0]; // Get the most recent booking
      context += `- **Customer Name**: ${recentBooking.customerName}\n`;
      context += `- **Service**: ${recentBooking.serviceCategory}\n`;
      context += `- **Status**: ${recentBooking.status}\n`;
      context += `- **Date**: ${new Date(
        recentBooking.date
      ).toLocaleDateString()}\n`;
      context += `- **Time**: ${recentBooking.time}\n`;
      context += `- **Notes**: ${recentBooking.notes || "No notes"}\n\n`;
    }

    context += `Give helpful and personalized answers based on the user's profile.`;
  } else {
    context += `The user is not logged in. Only answer general questions and ask them to log in for personalized help.`;
  }

  context += `\nIf the question is unrelated to LocalLink, reply: "Sorry, I can only help with queries related to LocalLink services."`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: context },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply =
      response.data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't understand that.";
    res.json({ reply });
  } catch (err) {
    console.error("AI Chat Error:", err?.response?.data || err.message);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
};
