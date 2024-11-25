// Initialize skills from localStorage
document.addEventListener("DOMContentLoaded", loadSkills);

// Add new skill
document.getElementById("add-skill-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const skillName = document.getElementById("skill-name").value.trim();
    const skillLevel = document.getElementById("skill-level").value;

    if (skillName) {
        addSkill(skillName, skillLevel);
        saveSkillsToLocalStorage();
        document.getElementById("add-skill-form").reset();
        updateChart();
    }
});

// Load skills from localStorage
function loadSkills() {
    const skills = JSON.parse(localStorage.getItem("skills")) || [];
    skills.forEach(skill => {
        addSkillToDOM(skill.name, skill.level);
    });
    updateChart();
}

// Save skills to localStorage
function saveSkillsToLocalStorage() {
    const skills = [];
    document.querySelectorAll("#skills-list li").forEach(item => {
        const name = item.querySelector(".skill-name").textContent;
        const level = item.querySelector(".skill-level").textContent.toLowerCase();
        skills.push({ name, level });
    });
    localStorage.setItem("skills", JSON.stringify(skills));
}

// Add skill to the list and DOM
function addSkill(name, level) {
    addSkillToDOM(name, level);
}

// Add skill element to the DOM
function addSkillToDOM(name, level) {
    const skillsList = document.getElementById("skills-list");
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span class="skill-name">${name}</span> - 
        <span class="skill-level">${capitalizeFirstLetter(level)}</span>
        <div class="progress-bar-container">
            <div class="progress-bar ${level}" style="width: ${getProgressWidth(level)};"></div>
        </div>
        <button class="delete-skill">Delete</button>
    `;
    skillsList.appendChild(listItem);

    // Delete skill
    listItem.querySelector(".delete-skill").addEventListener("click", function() {
        listItem.remove();
        saveSkillsToLocalStorage();
        updateChart();
    });
}

// Helper functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getProgressWidth(level) {
    switch (level) {
        case "beginner": return "33%";
        case "intermediate": return "66%";
        case "advanced": return "100%";
        default: return "0";
    }
}

// Chart.js code for circular chart
function updateChart() {
    const skills = JSON.parse(localStorage.getItem("skills")) || [];
    const levelCounts = { beginner: 0, intermediate: 0, advanced: 0 };

    skills.forEach(skill => {
        if (levelCounts[skill.level] !== undefined) {
            levelCounts[skill.level]++;
        }
    });

    const skillsChart = document.getElementById("skillsChart");

    // Show or hide the chart based on skill count
    if (skills.length === 0) {
        skillsChart.style.display = "none";
        return;
    } else {
        skillsChart.style.display = "block";
    }

    const ctx = skillsChart.getContext("2d");

    // Check if the chart instance exists and is a Chart object before destroying
    if (window.skillsChart && typeof window.skillsChart.destroy === "function") {
        window.skillsChart.destroy();
    }

    window.skillsChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Beginner", "Intermediate", "Advanced"],
            datasets: [{
                data: [levelCounts.beginner, levelCounts.intermediate, levelCounts.advanced],
                backgroundColor: ["#FF6384", "#36A2EB", "#4CAF50"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}