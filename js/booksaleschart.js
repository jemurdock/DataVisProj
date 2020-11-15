class BookSalesChart{

    constructor(data){
        this.data = data;
    }

    drawChart(){
        let g = d3.select("#bsales");
        //Add title and axes
        g.append("text").attr("class", "graphtitle").attr("x", 300).attr("y", 50)
            .text("Yearly Book Sales in Stores & Through E-Commerce")
        let xScale = d3.scaleLinear().domain([1992,2018]).range([60,1030]);
        let xAxis = d3.axisBottom(xScale).ticks(13).tickFormat(function(d){
            return d;
        });
        let x = g.append("g").attr("class", "axis").attr("transform", "translate(15,680)").call(xAxis);
        x.append("text").attr("class", "axislabel").attr("x", 525).attr("y", 55).text("Year");

        let yScale = d3.scaleLinear().domain([0,18500]).range([630,5]);
        let yAxis = d3.axisLeft(yScale).tickFormat(function(d){
            if(d != "0")
                return d/1000;
            else
                return "";
        });
        let y = g.append("g").attr("class", "axis").attr("transform", "translate(75,50)").call(yAxis);
        y.append("text").attr("class", "axislabel")
            .attr("transform", "translate(-50,170) rotate(270)")
            .text("Book Sales (In Millions of Dollars)");

        let lineGenerator = d3.line()
            .x(d => xScale(d.year)+15)
            .y(d => yScale(d.sales)+50);
        let blineChart = g.append("path").attr("class", "bookstores")
            .attr("d", lineGenerator(this.data.filter(d => d.type === "bookstores")));
        let elineChart = g.append("path").attr("class", "ecommerce")
            .attr("d", lineGenerator(this.data.filter(d => d.type === "ecommerce")));

        g.append("line").attr('x1', 790).attr('x2', 840).attr('y1', 550).attr('y2', 550)
            .attr('class', 'bookstores');
        g.append("text").attr('x', 845).attr('y',560).text("Physical Bookstores")
            .attr("class", "legend");
        g.append("line").attr('x1', 790).attr('x2', 840).attr('y1', 600).attr('y2', 600)
            .attr('class', 'ecommerce');
        g.append("text").attr('x', 845).attr('y',608).text("E-Commerce")
            .attr("class", "legend");
    }
}