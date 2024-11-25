// Initialize chart data from localStorage or create empty data
let chartData = JSON.parse(localStorage.getItem('skillsChartData')) || {
    skills: []
};

// Array of colors for different skills
const colors = [
    'rgba(75,192,192,1)',   // Teal
    'rgba(255,99,132,1)',   // Pink
    'rgba(255,206,86,1)',   // Yellow
    'rgba(54,162,235,1)',   // Blue
    'rgba(153,102,255,1)',  // Purple
    'rgba(255,159,64,1)'    // Orange
];

// Create an initial chart
const ctx = document.getElementById('skillsChart').getContext('2d');
const skillsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Skill Progress Over Time'
            },
            legend: {
                display: true,
                position: 'bottom',
                onClick: function(e, legendItem) {
                    const index = legendItem.datasetIndex;
                    const skillName = chartData.skills[index].name;
                    if (confirm(`Видалити навик "${skillName}"?`)) {
                        removeSkill(index);
                    }
                },
                labels: {
                    generateLabels: function(chart) {
                        const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                        labels.forEach(label => {
                            label.text += ' (click to remove)';
                        });
                        return labels;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Progress (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time Period'
                }
            }
        }
    }
});

// Function to generate month labels based on data length
function generateMonthLabels(length) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const labels = [];

    for (let i = 0; i < length; i++) {
        const monthIndex = (currentMonth - (length - 1) + i + 12) % 12;
        labels.push(months[monthIndex]);
    }
    return labels;
}

// Function to update the chart with stored data
function updateChart() {
    const datasets = chartData.skills.map((skill, index) => ({
        label: skill.name,
        data: skill.progress,
        borderColor: colors[index % colors.length],
        fill: false,
        tension: 0.1
    }));

    const maxLength = Math.max(...chartData.skills.map(skill => skill.progress.length));
    const labels = generateMonthLabels(maxLength);

    skillsChart.data.labels = labels;
    skillsChart.data.datasets = datasets;
    skillsChart.update();
}

// Function to add new skill data
function addSkillData(skillName, progressValues) {
    // Check if skill already exists
    if (chartData.skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
        alert('Цей навик вже існує! Виберіть інше ім\'я.');
        return;
    }

    // Convert progress values to numbers and validate
    const progress = progressValues.split(',')
        .map(value => parseInt(value.trim(), 10))
        .filter(value => !isNaN(value) && value >= 0 && value <= 100);

    if (progress.length === 0) {
        alert('Будь ласка, введіть коректні значення прогресу (від 0 до 100)');
        return;
    }

    // Add new skill
    chartData.skills.push({
        name: skillName,
        progress: progress
    });

    // Save to localStorage
    localStorage.setItem('skillsChartData', JSON.stringify(chartData));

    // Update chart
    updateChart();
}

// Function to remove skill
function removeSkill(index) {
    chartData.skills.splice(index, 1);
    localStorage.setItem('skillsChartData', JSON.stringify(chartData));
    updateChart();
}

// Handle form submission
document.getElementById('data-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const skillName = document.getElementById('skill-name').value;
    const progressValues = document.getElementById('progress-values').value;

    addSkillData(skillName, progressValues);

    // Clear form
    event.target.reset();
});

// Initialize chart with stored data
updateChart();