class PublishingChart {

    constructor(data) {
        this.data = data;

        this.years = [];
        this.expense = [];
        this.revenue = [];
        this.edBooks = [];
        this.recBooks = [];
        this.offsetIndex = 9;

        for (let d of data) {
            this.years.push(+d["YEAR"]);
            this.expense.push([+d["EXPENSE"], +d["YEAR"]]);
            this.revenue.push([+d["REVENUE"], +d["YEAR"]]);
            this.edBooks.push([+d["ED BOOK SALES"], +d["YEAR"]]);
            this.recBooks.push([+d["REC SALES"], +d["YEAR"]]);
        }

        this.xAxisRev = d3.scaleLinear().domain(this.years).range([60, 1030]);
        this.yAxisRev = d3.scaleLinear().domain([d3.min(this.expense), d3.max(this.revenue)]).range([630, 5]);

        this.xAxisBooks = d3.scaleLinear().domain(this.years.slice(this.offsetIndex, this.offsetIndex + 10)).range([60, 1030]);
        this.yAxisBooks = d3.scaleLinear().domain([d3.min(this.edBooks), d3.max(this.recBooks)]).range([630, 5]);
    }

    drawChart() {
        let g = d3.select("#profpub");
        g.append("text").attr("class", "graphtitle").attr("x", 220).attr("y", 50)
            .text("Publishing Industry Revenue");

        let xAxis = d3.axisBottom(this.xAxisRev).tickFormat(function(d) {
            return d;
        });
        let x = g.append("g").attr("class", "axis").attr("transform", "translate(15,680)").call(xAxis);
        x.append("text").attr("class", "axislabel").attr("x", 525).attr("y", 55).text("Year");

        let yAxis = d3.axisLeft(this.yAxisRev).tickFormat(function(d) {
            return "$" + d;
        });
        let y = g.append("g").attr("class", "axis").attr("transform", "translate(75,50)").call(yAxis);
        y.append("text").attr("class", "axislabel")
            .attr("transform", "translate(-50,170) rotate(270)")
            .text("Revenue (In Millions)");

        let cashLine = d3.line()
            .x(d => xScale(d.year) + 15)
            .y(d => yScale(d.sales) + 50);

        let revLineChart = g.append("path").attr("class", "pubRevenue")
            .attr("d", lineGenerator(this.revenue));
        let expenseLineChart = g.append("path").attr("class", "pubExpenses")
            .attr("d", lineGenerator(this.expense));

        g.append("line").attr('x1', 790).attr('x2', 840).attr('y1', 550).attr('y2', 550)
            .attr('class', 'pubRevenue');
        g.append("text").attr('x', 845).attr('y', 560).text("Publisher Industry Revenue")
            .attr("class", "legend");
        g.append("line").attr('x1', 790).attr('x2', 840).attr('y1', 600).attr('y2', 600)
            .attr('class', 'pubExpenses');
        g.append("text").attr('x', 845).attr('y', 608).text("")
            .attr("class", "legend");

    }
}