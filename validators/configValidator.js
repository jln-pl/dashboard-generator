function ConfigValidator(config) {
    this.config = config;
}

ConfigValidator.prototype.validate = function() {
    _validateField(this.config, "Config file does not exist.");
    _validateField(this.config.mongo, "Missing database config.");
    _validateField(this.config.mongo.host, "Missing database host config.");
    _validateField(this.config.mongo.port, "Missing database port config.");
    _validateField(this.config.mongo.databaseName, "Missing databaseName config.");
    _validateField(this.config.metrics, "Missing metric config.");
    _validateField(this.config.metrics.collectionName, "Missing collectionName config.");
    _validateField(this.config.metrics.rootMetricName, "Missing rootMetricName config.");
    _validateField(this.config.metrics.maxResultsDisplayed, "Missing maxResultsDisplayed config.");
    _validateArray(this.config.metrics.metricsTitles, "Missing metrics titles config.");
};

function _validateField(field, errorMessage) {
    if (!field) {
        throw new Error(errorMessage);
    }
}

function _validateArray(array, errorMessage) {
    if (!array || array.length === 0) {
        throw new Error(errorMessage);
    }
}

module.exports = ConfigValidator;