var Config = {
    mongo: {
        host: "localhost",
        port: 27017,
        databaseName: 'dashboard-generator'
    },
    metrics: {
        collectionName: 'metrics',
        rootMetricName: 'metrics',
        metricsTitles: [
            "requests",
            "gzipRequests",
            "postRequests",
            "httpsRequests",
            "notFound",
            "bodySize",
            "contentLength",
            "httpTrafficCompleted",
            "timeToFirstByte",
            "timeToLastByte"
        ],
        maxResultsDisplayed: 5
    }
};

exports.config = Config;