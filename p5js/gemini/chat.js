let chatBox, userInput, sendButton;

document.addEventListener("DOMContentLoaded", () => {
    chatBox = document.getElementById("chat-box");
    userInput = document.getElementById("user-input");
    sendButton = document.getElementById("send-btn");

    sendButton.addEventListener("click", handleChat);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") handleChat();
    });
});

// Handle user chat input
async function handleChat() {
    let message = userInput.value.trim();
    if (message === "") return;

    addMessage("User", message);
    userInput.value = "";

    try {
        let response = await generateContent(message);

        console.log("Full API Response:", response); // Debugging log

        addMessage("AI", response); // Ensure this is a string
    } catch (error) {
        console.error("Chat error:", error);
        addMessage("AI", "Sorry, something went wrong.");
    }
}


// Add messages to chat box
function addMessage(sender, text) {
    let msgDiv = document.createElement("div");

    // Replace newlines with <br> to preserve formatting
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text.replace(/\n/g, "<br>")}`;
    msgDiv.style.marginBottom = "8px";
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

