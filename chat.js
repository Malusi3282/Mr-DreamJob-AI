
const setupTextarea = document.getElementById('setup-textarea');
const chatGptResponse = document.getElementById('chatgpt-response');
const conversationContainer = document.getElementById('conversation-container'); // Add this line
//const apiKey = "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";
const apiKey = "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";
const url = "https://api.openai.com/v1/completions";

document.getElementById("send-btn").addEventListener("click", function() {
    console.log("Send button clicked"); // Debugging message
    const question = setupTextarea.value.trim();
    if (question) {
        console.log("Question:", question); // Debugging message
        appendToConversation(question, 'user-message'); // Append user message with user-message class
        setupTextarea.value = ""; // Clear textarea after sending
        chatGptResponse.innerText = `Thinking...`;
        fetchBotReply(question);
    }
});

function fetchBotReply(question) {
 

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            'model': 'gpt-3.5-turbo-instruct',
            'prompt': question,
            'max_tokens': 150
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch response from the server.');
        }
        return response.json();
    })
    .then(data => {

        if (data.choices && data.choices.length > 0) {
            const response = data.choices[0].text.trim();
            appendToConversation(response, 'bot-message');
            chatGptResponse.innerText = response;
        } else {
            chatGptResponse.innerText = 'No response received.';
        }
    })
    .catch(error => {
        console.error('Error:', error);

        chatGptResponse.innerText = 'Sorry, an error occurred while processing your request. Please try again now.';
    });
}


function appendToConversation(message, messageType) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', messageType, 'message-appear');
    conversationContainer.appendChild(messageElement);
    conversationContainer.scrollTop = conversationContainer.scrollHeight;

}
/* another file */

document.getElementById("send-btn").addEventListener("click", function() {
    console.log("Send button clicked");
    const questionInput = setupTextarea.value.trim(); // Trim leading and trailing whitespace
    
})



 // toggle button
  
 document.addEventListener("DOMContentLoaded", function () {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const navbar = document.getElementById("navbar");
  
    sidebarToggle.addEventListener("click", function () {
        // Toggle the visibility of the navbar
        navbar.style.display = navbar.style.display === "none" ? "block" : "none";
    });
  });

