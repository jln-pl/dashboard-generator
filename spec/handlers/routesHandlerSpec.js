var rewire = require('rewire');

describe('Testing: routesHandler', function () {
    var RoutesHandler = rewire('../../handlers/routesHandler'),
        metricsWithErrorsMock = require('./../mocks/metricsWithErrorsMock').Metrics,
        metricsMock = require('./../mocks/metricsMock').Metrics,
        metricsHandlerUnderTest,
        next = jasmine.createSpy('next');

    describe('Function: displayDashboards', function () {
        var res = {
                render: jasmine.createSpy('render')
            },
            config = {
                metrics: {
                    metricsTitles: ['foo', 'bar']
                }
            };

        beforeEach(function () {
            RoutesHandler.__set__('Metrics', metricsMock);
            metricsHandlerUnderTest = new RoutesHandler({}, config);
        });

        it('should render index page with metrics name from configuration', function () {
            metricsHandlerUnderTest.displayDashboards({}, res);

            expect(res.render).toHaveBeenCalledWith('index', { metrics: config.metrics.metricsTitles });
        });
    });

    describe('Function: getChartData', function () {
        it('should pass error when data has not been fetched properly', function () {
            RoutesHandler.__set__('Metrics', metricsWithErrorsMock);
            metricsHandlerUnderTest = new RoutesHandler({}, {});

            metricsHandlerUnderTest.getChartData({}, {}, next);

            expect(next).toHaveBeenCalledWith(new Error());
        });

        describe('with proper data', function () {
            var req = {
                    query: {
                        metrics_name: "foo"
                    }
                },
                res = {
                    send: jasmine.createSpy('send')
                };

            beforeEach(function () {
                RoutesHandler.__set__('Metrics', metricsMock);
                metricsHandlerUnderTest = new RoutesHandler({}, {
                    metrics: {
                        rootMetricName: 'metrics'
                    }
                });
            });

            it('should send proper data when data has been fetched properly', function () {
                var expectedValue = {
                    labels: ["16-2-2015 | 20:39"],
                    datasets: [
                        {
                            fillColor: "rgba(41,102,75,1)",
                            pointColor: "rgba(31,76,56,1)",
                            data: [9]
                        }
                    ]
                };

                metricsHandlerUnderTest.getChartData(req, res, next);

                expect(res.send).toHaveBeenCalledWith(expectedValue);
            });
        });
    });

    describe('Function: handleNewMetrics', function () {
        var req = {
                body: {
                    someRootMetricName: {
                        someNode: 22
                    }
                }
            },
            res = {
                status: jasmine.createSpy('status').andReturn({
                    send: jasmine.createSpy('send')
                })
            },
            config = {
                metrics: {
                    rootMetricName: 'someRootMetricName'
                }
            };

        it('should pass error when data has not been inserted properly', function () {
            RoutesHandler.__set__('Metrics', metricsWithErrorsMock);
            metricsHandlerUnderTest = new RoutesHandler({}, config);

            metricsHandlerUnderTest.handleNewMetrics(req, {}, next);

            expect(next).toHaveBeenCalledWith(new Error());
        });


        describe('with data inserted properly', function () {
            beforeEach(function () {
                RoutesHandler.__set__('Metrics', metricsMock);
                metricsHandlerUnderTest = new RoutesHandler({}, config);
            });

            it('should pass error when data does not exist', function () {
                metricsHandlerUnderTest.handleNewMetrics({}, {}, next);

                expect(next).toHaveBeenCalledWith(new Error());
            });

            it('should respond with status 201 when data has been inserted properly', function () {
                metricsHandlerUnderTest.handleNewMetrics(req, res, next);

                expect(res.status).toHaveBeenCalledWith(201);
            });

            it('should respond with inserted data', function () {
                var date = new Date(),
                    datetime = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' | ' + date.getHours() + ':' + date.getMinutes(),
                    expectedData = {
                        datetime: datetime,
                        data: {
                            someNode: 22
                        }
                    };

                metricsHandlerUnderTest.handleNewMetrics(req, res, next);

                expect(res.status().send).toHaveBeenCalledWith(expectedData);
            });
        });


    });
});
