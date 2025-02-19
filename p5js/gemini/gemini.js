let API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

async function generateContent(prompt, model = "gemini-1.5-flash") {
  let REQUEST_URL = `${API_URL}/${model}:generateContent?key=${GOOGLE_API_KEY}`;

  let res = await fetch(REQUEST_URL, {
    method: "POST",
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: String(prompt) } // Ensure this is a string
          ]
        }
      ]
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    let errorText = await res.text(); // Get error details
    console.error(`API Error: ${res.status} - ${res.statusText}\n${errorText}`);
    return `Error ${res.status}: ${res.statusText}`;
  }

  let json = await res.json();

  // Extract AI response properly
  let responseText = json?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!responseText) {
    console.error("Invalid API response:", json);
    return "Sorry, I couldn't process that request.";
  }

  return responseText;
}


