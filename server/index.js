import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
}));

app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze", async (req, res) => {
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
        return res
            .status(400)
            .json({ error: "Invalid request. Expected {responses: []}" });
    }

    const prompt = `You are a mental wellness assistant.
The user answered the following questions:\n\n${responses.join("\n")}\n\n
Task:
1. Categorize the user as either "low" or "high" risk.
2. Provide a short, caring, supportive message (1–2 sentences).
3. Respond ONLY with valid JSON in this format:

{
  "riskLevel": "low" | "high",
  "feedback": "your supportive message here"
}`;

    try {
        const result = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        const raw = result.choices[0].message?.content || "{}";
        console.log("AI raw:", raw);

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (e) {
            console.error("JSON parse failed:", e);
            return res
                .status(500)
                .json({ error: "AI returned invalid JSON", raw });
        }

        res.json(parsed);
    } catch (err) {
        console.error("Error in analyzer:", err);
        res.status(500).json({ error: "AI analysis failed" });
    }
});

//----------- Chat API -----------
app.post("/chat", async (req, res) => {
    console.log("Received chat request:", req.body);
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Expected { messages: [] }" });
    }

    try {
        const result = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a supportive mental wellness companion. Be warm, short, and caring in your replies.",
                },
                ...messages.map((m) => ({
                    role: m.from === "user" ? "user" : "assistant",
                    content: m.text,
                })),
            ],
        });

        const reply =
            result.choices[0].message?.content || "I'm here to listen 💙";
        res.json({ reply });
    } catch (err) {
        console.error("Chat API error:", err);
        res.status(500).json({ error: "Chat failed" });
    }
});

app.listen(5000, () =>
    console.log("✅ Server running on http://localhost:5000")
);