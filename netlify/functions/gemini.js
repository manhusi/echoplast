export const handler = async (event) => {
    // Handle CORS
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    try {
        if (event.httpMethod === "OPTIONS") {
            return {
                statusCode: 200,
                headers,
                body: "ok"
            };
        }

        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: "Method Not Allowed" })
            };
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("Critical: GEMINI_API_KEY is missing in environment variables.");
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: "Server configuration error: Missing API Key" })
            };
        }

        let body;
        try {
            body = JSON.parse(event.body);
        } catch (e) {
            console.error("Failed to parse request body:", e);
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: "Invalid JSON body" })
            };
        }

        // Use the model explicitly selected by the user
        const model = "gemini-2.5-flash";

        console.log(`Forwarding request to Gemini (${model})...`);

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", JSON.stringify(data));
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify(data)
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };

    } catch (err) {
        console.error("Unhandled Function Error:", err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: err.message })
        };
    }
};
