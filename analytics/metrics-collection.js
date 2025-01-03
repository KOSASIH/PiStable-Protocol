// analytics/metrics-collection.js

const metrics = {
    startTime: null,
    endTime: null,
    pageLoadTime: null,

    startTracking: () => {
        metrics.startTime = performance.now();
    },

    endTracking: () => {
        metrics.endTime = performance.now();
        metrics.pageLoadTime = metrics.endTime - metrics.startTime;
        metrics.reportMetrics();
    },

    reportMetrics: () => {
        // Send metrics to a monitoring service (e.g., New Relic, Datadog)
        console.log(`Page Load Time: ${metrics.pageLoadTime} ms`);
        // Example: Send to an API endpoint
        fetch('/api/metrics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pageLoadTime: metrics.pageLoadTime })
        });
    }
};

// Example usage
// metrics.startTracking();
// window.onload = metrics.endTracking;
