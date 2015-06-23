var RoutesHandler = require('../handlers/routesHandler'),
    ErrorHandler = require('../handlers/errorHandler').errorHandler;

module.exports = exports = function(app, db, config) {
    var routesHandler = new RoutesHandler(db, config);

    app.get('/', routesHandler.displayDashboards);
    app.get('/get-metrics', routesHandler.getChartData);
    app.post('/update-metrics', routesHandler.handleNewMetrics);

    app.use(ErrorHandler);
};
