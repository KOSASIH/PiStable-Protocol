// analytics/dashboard/script.js

// Function to fetch and display metrics
const fetchMetrics = async () => {
    try {
        const response = await fetch('/api/metrics'); // Fetch metrics from the API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const metricsData = await response.json();
        displayMetrics(metricsData);
    } catch (error) {
        console.error('Error fetching metrics:', error);
    }
};

// Function to display metrics in the dashboard
const displayMetrics = (metricsData) => {
    const metricsList = document.getElementById('metrics-list');
    metricsList.innerHTML = ''; // Clear existing metrics

    metricsData.forEach(metric => {
        const li = document.createElement('li');
        li.textContent = `Metric: ${metric.name}, Value: ${metric.value}`;
        metricsList.appendChild(li);
    });
};

// Function to fetch and display user events
const fetchUser Events = async () => {
    try {
        const response = await fetch('/api/events'); // Fetch user events from the API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const eventsData = await response.json();
        displayUser Events(eventsData);
    } catch (error) {
        console.error('Error fetching user events:', error);
    }
};

// Function to display user events in the dashboard
const displayUser Events = (eventsData) => {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = ''; // Clear existing events

    eventsData.forEach(event => {
        const li = document.createElement('li');
        li.textContent = `Event: ${event.name}, Properties: ${JSON.stringify(event.properties)}`;
        eventsList.appendChild(li);
    });
};

// Initial fetch calls to populate the dashboard
fetchMetrics();
fetchUser Events();
