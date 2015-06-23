import * as Chartjs from "../lib/chartjs/Chart.js";

let Chart = Chartjs.noConflict();

function _setGlobalChartOptions() {
    Chart.defaults.global.showTooltips = true;
    Chart.defaults.global.scaleFontColor = "#29664B";
}

function _generateCharts(chartClass) {
    let charts = document.getElementsByClassName(chartClass);

    for (let i = 0, max = charts.length; i < max; i++) {
        _createChart(charts[i]);
    }
}

function _createChart(element) {
    let context = element.getContext("2d");
    context.canvas.width = window.innerWidth / 2 - 20;

    _callAjaxRequest(element.getAttribute('id'), context);
}

function _callAjaxRequest(id, context) {
    let ajaxRequest = new XMLHttpRequest();

    ajaxRequest.open('GET', `/get-metrics?metrics_name=${id}`, true);
    ajaxRequest.onreadystatechange = () => {
        if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
            new Chart(context).Line(JSON.parse(ajaxRequest.responseText));
        }
    };
    ajaxRequest.send(null);
}

export function generateCharts() {
    _setGlobalChartOptions();
    _generateCharts("chart");
}


