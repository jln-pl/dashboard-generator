function Metrics(db, config) {
    this.insertMetrics = function(data, callback) {
        callback(new Error(), null);
    };

    this.getMetrics = function(callback) {
        callback(new Error(), null);
    };
}

module.exports.Metrics = Metrics;

