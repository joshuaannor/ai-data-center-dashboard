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

function displayMetrics(data) {
    document.getElementById("metrics-data").textContent = JSON.stringify(data, null, 2);
}

function updateDashboard() {
    const server = document.getElementById("server").value;
    const cpu = document.getElementById("cpu").value;
    const memory = document.getElementById("memory").value;
    const disk = document.getElementById("disk").value;

    if (!cpu || !memory || !disk) {
        alert("Please enter values for CPU, Memory, and Disk Usage.");
        return;
    }

    let updatedMetrics = { ...window.originalMetrics };  // Clone original data
    updatedMetrics[server] = {
        "cpu_usage": parseInt(cpu),
        "memory_usage": parseInt(memory),
        "disk_usage": parseInt(disk)
    };

    displayMetrics(updatedMetrics);  // Update UI but not the actual file
}
