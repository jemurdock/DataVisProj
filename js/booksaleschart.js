class BookSalesChart{

    constructor(data){
        this.data = data;
    }

    drawChart(){
        let g = d3.select("#bsales");
        g.append("text").attr("class", "graphtitle").attr("x", 300).attr("y", 50)
            .text("Yearly Book Sales in Stores & Through E-Commerce")

        let xScale = d3.scaleLinear().domain([1992,2018]).range([60,1030]);
        let xAxis = d3.axisBottom(xScale).ticks(13).tickFormat(function(d){
            return d;
        });
        let x = g.append("g").attr("class", "axis").attr("transform", "translate(15,680)").call(xAxis);
        x.append("text").attr("class", "axislabel").attr("x", 525).attr("y", 55).text("Year");

        let yScale = d3.scaleLinear().domain([0,18.5]).range([630,5]);
        let yAxis = d3.axisLeft(yScale).tickFormat(function(d){
            if(d != "0")
                return d;
            else
                return "";
        });
        let y = g.append("g").attr("class", "axis").attr("transform", "translate(75,50)").call(yAxis);
        y.append("text").attr("class", "axislabel")
            .attr("transform", "translate(-50,170) rotate(270)")
            .text("Book Sales (In Millions of Dollars)");
    }
}