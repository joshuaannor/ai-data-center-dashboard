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
        let alertClass = getAlertClass(serverData.cpu_usage, serverData.memory_usage, serverData.disk_usage);

        let serverHTML = `
            <div class="server-box ${alertClass}">
                <h3>🔧 ${server}</h3>
                <p>CPU Usage: ${serverData.cpu_usage}%</p>
                <p>Memory Usage: ${serverData.memory_usage}%</p>
                <p>Disk Usage: ${serverData.disk_usage}%</p>
            </div>
        `;
        metricsDisplay.innerHTML += serverHTML;
    }
}

// Function to determine the alert class based on thresholds
function getAlertClass(cpu, memory, disk) {
    if (cpu > 90 || memory > 90 || disk > 90) {
        return "alert-critical";  // Red background
    } else if (cpu > 70 || memory > 70 || disk > 70) {
        return "alert-warning";  // Yellow background
    }
    return "";
}

// Function to handle user input and add a new server
function updateDashboard() {
    let serverSelect = document.getElementById("server-select").value;
    let cpuUsage = parseInt(document.getElementById("cpu").value);
    let memoryUsage = parseInt(document.getElementById("memory").value);
    let diskUsage = parseInt(document.getElementById("disk").value);

    if (!window.originalMetrics) {
        console.error("Original metrics not loaded yet.");
        return;
    }

    // Update the selected server with user-provided values
    window.originalMetrics[serverSelect] = {
        cpu_usage: cpuUsage,
        memory_usage: memoryUsage,
        disk_usage: diskUsage
    };

    // Re-display updated metrics
    displayMetrics(window.originalMetrics);
}
