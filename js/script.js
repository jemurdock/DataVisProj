
let booksales;
let pubsales;
let selfpub;
let numstores;

d3.csv('./cleanData/BookSales.csv').then(function(data){
    console.log(data);
    booksales = new BookSalesChart(data);
    booksales.drawChart();
});

d3.csv('./cleanData/PublisherInformation.xlsx').then(function(data){
    console.log(data);
    pubsales = new PublishingChart(data);
    pubsales.drawChart();
});

d3.csv('./cleanData/IndPub.csv').then(function(data){
    console.log(data);
    selfpub = new SelfPublishChart(data);
    selfpub.drawChart();
});

d3.csv('./cleanData/BookStores.csv').then(function(data){
    console.log(data);
    numstores = new StoresChart(data);
    numstores.drawChart();
});