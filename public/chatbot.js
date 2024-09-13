const chatbox = document.getElementById("chatbox");
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const openChatButton = document.getElementById("open-chat");
const closeChatButton = document.getElementById("close-chat");

let isChatboxOpen = true; // Set the initial state to open

// Function to toggle the chatbox visibility
function toggleChatbox() {
    chatContainer.classList.toggle("hidden");
    isChatboxOpen = !isChatboxOpen; // Toggle the state
}

// Add an event listener to the open chat button
openChatButton.addEventListener("click", toggleChatbox);

// Add an event listener to the close chat button
closeChatButton.addEventListener("click", toggleChatbox);

// Add an event listener to the send button
sendButton.addEventListener("click", function () {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
        addUserMessage(userMessage);
        respondToUser(userMessage);
        userInput.value = "";
    }
});

userInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const userMessage = userInput.value;
        addUserMessage(userMessage);
        respondToUser(userMessage);
        userInput.value = "";
    }
});

let messages = [];

function addUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2", "text-right");
    messageElement.innerHTML = `<p class="bg-[#09dbcc] text-black rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
    messages.append(`User: ${message}`);
}

function addBotMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2");
    messageElement.innerHTML = `<p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
    messages.append(`You: ${message}`);
}

function respondToUser(userMessage) {
    // Replace this with your chatbot logic
    fetch("/api/talk", {
        method: "POST",
        body: JSON.stringify({
            prompt: `History ${JSON.stringify(messages)}. ${userMessage}`
        })
    }).then((res)=>res.json()).then((res)=>{
        if(res.status === 200) {
            addBotMessage(res.result);
        }
    });
}

// Automatically open the chatbox on page load
// toggleChatbox();