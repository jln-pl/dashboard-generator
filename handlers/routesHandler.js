var Metrics = require('../model/metrics').Metrics;

function RoutesHandler(db, config) {
    var metrics = new Metrics(db, config);

    this.displayDashboards = function(req, res) {
        res.render('index', { metrics:  config.metrics.metricsTitles });
    };

    this.getChartData = function(req, res, next) {
        metrics.getMetrics(function(err, data) {
            if (err) {
                return next(err);
            }

            res.send(_parseData(data, req.query.metrics_name));
        });
    };

    this.handleNewMetrics = function(req, res, next) {
        var dataToInsert;

        if (!dataExist(req.body)) {
            return next(new Error('There are no metrics in given JSON!'));
        }

        dataToInsert = _prepareDataToInsert(req.body);

        metrics.insertMetrics(dataToInsert, function(err, data) {
            if (err) {
                return next(err);
            }

            res.status(201).send(dataToInsert);
        });
    };

    function _parseData(data, metricName) {
        var parsedData = {
            labels: [],
            datasets: [
                {
                    fillColor: "rgba(41,102,75,1)",
                    pointColor: "rgba(31,76,56,1)",
                    data: []
                }
            ]
        };

        for (var i = 0, max = data.length; i < max; i++) {
            parsedData.labels.push(data[i].datetime);
            parsedData.datasets[0].data.push(data[i].data[metricName]);
        }

        return parsedData;
    }

    function dataExist(data) {
        return data && data[config.metrics.rootMetricName];
    }

    function _prepareDataToInsert(data) {
        return {
            datetime: _prepareDateString(),
            data: data[config.metrics.rootMetricName]
        };
    }

    function _prepareDateString() {
        var date = new Date();
        return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' | ' + date.getHours() + ':' + date.getMinutes();
    }
}

module.exports = RoutesHandler;