### Dashboard Generator ###

  Application which saves JSON data in mongoDB and displays them as charts.

## Table of Contents ##
  
  1. Example config file
  2. Build & run
  3. Example POST data & request with curl
  4. Example GET data & request with curl

## 1. Example config file ##

```
var Config = {
      mongo: {
        host: "localhost",
        port: 27017
        databaseName:   'someDatabaseName',
      },
      metrics: {
        collectionName: 'someCollectionName',
        rootMetricName: 'someRootName',
        metricsTitles: [
          "someNode",
          "someNode2"
        ],
        maxResultsDisplayed: 5
      }
    };

exports.config = Config;

```


## 2. Build & run & test ##

  1. Run 'npm install'
  2. Run 'grunt build'
  3. Run 'node app.js'

  Would you like to run tests?

  - Run 'grunt tests' - runs all tests

## 3. Example of sending data with curl ##

```
{
  "someRootName": {
    "someNode": 22,
    "someNode2": 33
  }
}
```


```
curl -H "Content-Type: application/json" http://localhost:3000/update-metrics --data-binary "@example.json"
```

## 4. Example of getting your dashboards ##

Simply run app (node app.js) and check http://localhost:3000 in your browser.
