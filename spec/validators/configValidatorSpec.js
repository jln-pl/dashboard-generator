describe('Testing: configValidator', function () {
    var ConfigValidator = require('../../validators/configValidator'),
        configValidatorUnderTest;

    it('should throw error when there is no config object', function () {
        configValidatorUnderTest = new ConfigValidator();

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Config file does not exist."));
    });

    it('should throw error when there is no database object', function () {
        configValidatorUnderTest = new ConfigValidator({});

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing database config."));
    });

    it('should throw error when there is no host in database object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {}
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing database host config."));
    });

    it('should throw error when there is no port in database object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {
                host: "localhost"
            }
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing database port config."));
    });

    it('should throw error when there is no databaseName in database object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {
                host: "localhost",
                port: 8080
            }
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing databaseName config."));
    });

    it('should throw error when there is no metrics object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {
                host: "localhost",
                port: 8080,
                databaseName: "name"
            }
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing metric config."));
    });

    it('should throw error when there is no collectionName in metrics object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {
                host: "localhost",
                port: 8080,
                databaseName: "name"
            },
            metrics: {}
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing collectionName config."));
    });

    it('should throw error when there is no rootMetricName in metrics object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {
                host: "localhost",
                port: 8080,
                databaseName: "name"
            },
            metrics: {
                collectionName: "name"
            }
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing rootMetricName config."));
    });

    it('should throw error when there is no maxResultDisplayed in metrics object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {
                host: "localhost",
                port: 8080,
                databaseName: "name"
            },
            metrics: {
                collectionName: "name",
                rootMetricName: "name"
            }
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing maxResultsDisplayed config."));
    });

    it('should throw error when there is no metricsTitles in metrics object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {
                host: "localhost",
                port: 8080,
                databaseName: "name"
            },
            metrics: {
                collectionName: "name",
                rootMetricName: "name",
                maxResultsDisplayed: 5
            }
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing metrics titles config."));
    });

    it('should throw error when there is empty metricsTitles in metrics object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {
                host: "localhost",
                port: 8080,
                databaseName: "name"
            },
            metrics: {
                collectionName: "name",
                rootMetricName: "name",
                maxResultsDisplayed: 5,
                metricsTitles: []
            }
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).toThrow(new Error("Missing metrics titles config."));
    });

    it('should not throw error when there is proper configuration object', function () {
        configValidatorUnderTest = new ConfigValidator({
            mongo: {
                host: "localhost",
                port: 8080,
                databaseName: "name"
            },
            metrics: {
                collectionName: "name",
                rootMetricName: "name",
                maxResultsDisplayed: 5,
                metricsTitles: [ "foo" ]
            }
        });

        expect(function () {
            configValidatorUnderTest.validate();
        }).not.toThrow();
    });
});
