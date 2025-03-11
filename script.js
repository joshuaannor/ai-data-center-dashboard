document.addEventListener("DOMContentLoaded", fetchMetrics);

function fetchMetrics() {
    fetch("https://raw.githubusercontent.com/joshuaannor/ai-data-center-dashboard/main/web/sample_metrics.json")
        .then(response => response.json())
        .then(data => {
            window.originalMetrics = data;  // Store original data
            displayMetrics(data);
        })
        .catch(error => console.error("Error loading metrics:", error));
}

function displayMetrics(metrics) {
    let metricsDisplay = document.getElementById("metrics-display");
    metricsDisplay.innerHTML = ""; // Clear previous data

    for (let server in metrics) {
        let serverData = metrics[server];

        let alertClass = getAlertClass(serverData); // Get color based on thresholds
        let alertIcon = getAlertIcon(serverData);  // Get alert icon if critical

        let serverHTML = `
            <div class="server-box ${alertClass}">
                <h3>${alertIcon} ${server}</h3>
                <p>CPU Usage: ${serverData.cpu_usage}%</p>
                <p>Memory Usage: ${serverData.memory_usage}%</p>
                <p>Disk Usage: ${serverData.disk_usage}%</p>
            </div>
        `;

        metricsDisplay.innerHTML += serverHTML;
    }
}

function updateDashboard() {
    let server = document.getElementById("server-select").value;
    let cpu = document.getElementById("cpu").value;
    let memory = document.getElementById("memory").value;
    let disk = document.getElementById("disk").value;

    let updatedMetrics = JSON.parse(JSON.stringify(window.originalMetrics)); // Clone original data
    updatedMetrics[server] = {
        "cpu_usage": parseInt(cpu),
        "memory_usage": parseInt(memory),
        "disk_usage": parseInt(disk)
    };

    displayMetrics(updatedMetrics);
}

// Function to determine alert class
function getAlertClass(data) {
    if (data.cpu_usage > 90 || data.memory_usage > 85 || data.disk_usage > 80) {
        return "critical";
    } else if (data.cpu_usage > 75 || data.memory_usage > 70 || data.disk_usage > 60) {
        return "warning";
    }
    return "";
}

// Function to determine alert icons
function getAlertIcon(data) {
    if (data.cpu_usage > 90 || data.memory_usage > 85 || data.disk_usage > 80) {
        return "⚠️";  // High alert
    } else if (data.cpu_usage > 75 || data.memory_usage > 70 || data.disk_usage > 60) {
        return "🔶";  // Medium alert
    }
    return "🔧";  // Normal status
}
