// Initialize challenges from localStorage
document.addEventListener("DOMContentLoaded", loadChallenges);

// Handle adding a new challenge
document.getElementById("add-challenge-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const title = document.getElementById("challenge-title").value.trim();
    const description = document.getElementById("challenge-description").value.trim();
    const level = document.getElementById("challenge-level").value;

    if (title && description && level) {
        // Add the challenge to the list
        addChallengeToDOM(title, description, level);
        saveChallengesToLocalStorage();

        // Reset the form
        this.reset();
    }
});

// Load challenges from localStorage
function loadChallenges() {
    const challenges = JSON.parse(localStorage.getItem("challenges")) || [];
    challenges.forEach(challenge => {
        addChallengeToDOM(challenge.title, challenge.description, challenge.level);
    });
}

// Save challenges to localStorage
function saveChallengesToLocalStorage() {
    const challenges = [];
    document.querySelectorAll("#challenges-list li").forEach(item => {
        const title = item.querySelector(".title").textContent;
        const description = item.querySelector(".description").textContent;
        const level = item.querySelector(".difficulty").textContent.toLowerCase();
        challenges.push({ title, description, level });
    });
    localStorage.setItem("challenges", JSON.stringify(challenges));
}

// Add a challenge to the DOM
function addChallengeToDOM(title, description, level) {
    const challengesList = document.getElementById("challenges-list");

    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <h4 class="title">${title}</h4>
        <p class="description">${description}</p>
        <span class="difficulty ${level}">${level}</span>
        <button class="delete-challenge">Delete</button>
    `;
    challengesList.appendChild(listItem);

    // Handle delete button
    listItem.querySelector(".delete-challenge").addEventListener("click", function() {
        listItem.remove();
        saveChallengesToLocalStorage();
    });
}