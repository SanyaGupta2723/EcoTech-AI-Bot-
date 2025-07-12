// server/server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Loads environment variables from .env
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000

// Middleware
app.use(express.json()); // To parse JSON request bodies
// Configure CORS to allow your frontend to make requests
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend URL in production
}));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 1000; // 1 second base delay

// Chat API Endpoint
app.post('/api/chat', async (req, res) => {
    const userPrompt = req.body.prompt; // Get the user's message from frontend

    if (!userPrompt) {
        return res.status(400).json({ error: { message: "Prompt is required." } });
    }

    if (!GEMINI_API_KEY) {
        console.error("Server-side GEMINI_API_KEY is not set.");
        return res.status(500).json({ error: { message: "Server configuration error: AI service key missing." } });
    }

    let retries = 0;
    let lastError = null;

    while (retries < MAX_RETRIES) {
        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
            const payload = { contents: [{ role: "user", parts: [{ text: userPrompt }] }] };

            console.log(`Sending request to Gemini API (Attempt ${retries + 1}/${MAX_RETRIES})...`);
            const aiResponse = await axios.post(apiUrl, payload, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 30000 // 30 second timeout for AI response
            });

            // Successfully received response from Gemini API
            return res.json(aiResponse.data); // Send AI response back to frontend

        } catch (error) {
            lastError = error;
            // Check if it's an API error response
            if (error.response) {
                console.error(`Gemini API Error Status: ${error.response.status}, Data:`, error.response.data);

                // Handle 500 (overloaded) specifically for retries
                if (error.response.status === 500 && error.response.data?.error?.message?.includes('overloaded')) {
                    retries++;
                    if (retries < MAX_RETRIES) {
                        const delay = RETRY_DELAY_MS * Math.pow(2, retries - 1) + Math.random() * 500; // Exponential backoff with jitter
                        console.warn(`Model overloaded. Retrying in ${delay}ms... (Attempt ${retries}/${MAX_RETRIES})`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                        continue; // Continue to next retry
                    } else {
                        // Max retries reached
                        console.error("Max retries reached for overloaded model.");
                        return res.status(503).json({ error: { message: "AI service is currently unavailable due to high load. Please try again later." } });
                    }
                }
                // Handle 401 Unauthorized
                else if (error.response.status === 401) {
                    console.error("Backend received 401: Unauthorized API Key. Check Google Cloud Console permissions.");
                    return res.status(401).json({ error: { message: "Backend API key is unauthorized or invalid." } });
                }
                // Handle other HTTP errors (400, 404, etc.)
                else {
                    return res.status(error.response.status).json({
                        error: {
                            message: error.response.data?.error?.message || `AI API error: ${error.response.status} ${error.response.statusText}`
                        }
                    });
                }
            }
            // Handle network errors or other issues that prevent a response
            else if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') { // Axios timeout or network issue
                console.error("AI API request timed out or network error:", error.message);
                retries++;
                if (retries < MAX_RETRIES) {
                    const delay = RETRY_DELAY_MS * Math.pow(2, retries - 1) + Math.random() * 500;
                    console.warn(`Timeout/Network error. Retrying in ${delay}ms... (Attempt ${retries}/${MAX_RETRIES})`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                } else {
                    return res.status(504).json({ error: { message: "AI service connection timed out after multiple attempts." } });
                }
            }
            else {
                // Generic error for any other unexpected issues
                console.error("Unexpected error calling AI API:", error);
                return res.status(500).json({ error: { message: "An unexpected error occurred on the server while contacting AI." } });
            }
        }
    }
    // Fallback if loop somehow exits without returning (shouldn't happen with current logic)
    res.status(500).json({ error: { message: "An unhandled server error occurred." } });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend proxy running on http://localhost:${PORT}`);
    console.log("Ensure GEMINI_API_KEY is set in server/.env file.");
});