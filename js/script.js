let booksales;
let pubsales;
let selfpub;
let numstores;
let readers;
let torusoverview;

d3.csv('./cleanData/BookSales.csv').then(function(data) {
    booksales = new BookSalesChart(data);
    booksales.drawChart();
});

// d3.csv('./cleanData/PublisherInformation.xlsx').then(function(data) {
//     console.log(data);
//     pubsales = new PublishingChart(data);
//     pubsales.drawChart();
// });

d3.csv('./cleanData/IndPub.csv').then(function(data) {
    selfpub = new SelfPublishChart(data);
    selfpub.drawChart();
});

d3.csv('./cleanData/BookStores.csv').then(function(data) {
    numstores = new StoresChart(data);
    numstores.drawChart();
});

d3.csv('./cleanData/ReadersByCategory.csv').then(function(data) {
    readers = new Table(data);
    readers.buildTable();

    torusoverview = new PieChart(data);
    torusoverview.drawTorus();
});

function displayTorus() {
    torusoverview.drawTorus();
}

function displayBar() {
    torusoverview.drawBars();
}