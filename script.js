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
        let serverHTML = `
            <div class="server-box">
                <h3>🔧 ${server}</h3>
                <p>CPU Usage: ${serverData.cpu_usage}%</p>
                <p>Memory Usage: ${serverData.memory_usage}%</p>
                <p>Disk Usage: ${serverData.disk_usage}%</p>
            </div>
        `;
        metricsDisplay.innerHTML += serverHTML;
    }
}


function updateDashboard(metrics) {
    let dashboard = document.getElementById("metrics-display");
    dashboard.innerHTML = "";  // Clear previous data

    for (let server in metrics) {
        let serverDiv = document.createElement("div");
        serverDiv.innerHTML = `
            <h3>${server}</h3>
            <p>CPU Usage: ${metrics[server].cpu_usage}%</p>
            <p>Memory Usage: ${metrics[server].memory_usage}%</p>
            <p>Disk Usage: ${metrics[server].disk_usage}%</p>
        `;
        dashboard.appendChild(serverDiv);
    }
}
