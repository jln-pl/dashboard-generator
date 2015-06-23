function Metrics(db, config) {
    var gettingResults = [{
        _id : 123,
        datetime : "16-2-2015 | 20:39",
        data : {
            foo : 9
        }
    }];

    this.insertMetrics = function (data, callback) {
        callback(null, "inserting metrics succeed");
    };

    this.getMetrics = function (callback) {
        callback(null, gettingResults);
    };
}

module.exports.Metrics = Metrics;

