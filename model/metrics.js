// TODO: integration tests

function Metrics(db, config) {
    var metrics = db.collection(config.metrics.collectionName),
        maxResultsDisplayed = config.metrics.maxResultsDisplayed;

    this.insertMetrics = function(data, callback) {
        metrics.insert(data, function(err) {
            if (err) {
                callback(err, null);
            }

            callback(null, data);
        });
    };

    this.getMetrics = function(callback) {
        metrics.find().sort({"_id": 1}).limit(maxResultsDisplayed).toArray(function(err, items) {
            if (err) {
                callback(err, null);
            }

            callback(null, items);
        });
    };
}

module.exports.Metrics = Metrics;

