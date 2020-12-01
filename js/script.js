let booksales;
let pubsales;
let selfpub;
let numstores;
let readers;
let timeline;
let torusoverview;
var infobox = [];

d3.csv('./cleanData/YearInfo.csv').then(function(data) {
    infobox = data;
    timeline = new Timeline(infobox);
    timeline.drawChart();
});

d3.csv('./cleanData/BookSales.csv').then(function(data) {
    booksales = new BookSalesChart(data);
    booksales.drawChart();
});

d3.csv('./cleanData/IndPub.csv').then(function(data) {
    selfpub = new SelfPublishChart(data);
    selfpub.drawChart();
});

d3.csv('./cleanData/BookStores.csv').then(function(data) {
    numstores = new StoresChart(data);
    numstores.drawChart();
});
