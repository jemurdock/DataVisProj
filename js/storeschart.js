class StoresChart{

    constructor(data){
        this.data = data;
    }

    drawChart(){
        let g = d3.select("#numstores");
        g.append("text").attr("class", "graphtitle").attr("x", 220).attr("y", 50)
            .text("Number of Bookstores in the USA")

        let xScale = d3.scaleLinear().domain([2005,2020]).range([70,840]);
        let xAxis = d3.axisBottom(xScale).tickFormat(function(d){
            return d;
        });
        let x = g.append("g").attr("class", "axis").attr("transform", "translate(15,720)").call(xAxis);
        x.append("text").attr("class", "axislabel").attr("x", 525).attr("y", 55).text("Year");

        let yScale = d3.scaleLinear().domain([0,2600]).range([670,5]);
        let yAxis = d3.axisLeft(yScale).tickFormat(function(d){
            return d;
        });
        let y = g.append("g").attr("class", "axis").attr("transform", "translate(85,50)").call(yAxis);
        y.append("text").attr("class", "axislabel")
            .attr("transform", "translate(-65,190) rotate(270)")
            .text("Count (In the Hundreds)");

        let lineGenerator = d3.line()
            .x(d => xScale(d.year)+15)
            .y(d => yScale(d.count)+50);
        let indcolineChart = g.append("path").attr("class", "indcom")
            .attr("d", lineGenerator(this.data.filter(d => d.type === "IndComp")));
        let indloclineChart = g.append("path").attr("class", "indloc")
            .attr("d", lineGenerator(this.data.filter(d => d.type === "IndLoc")));
        let bnlineChart = g.append("path").attr("class", "bn")
            .attr("d", lineGenerator(this.data.filter(d => d.type === "bn")));

        g.append("line").attr('x1', 450).attr('x2', 500).attr('y1', 370).attr('y2', 370)
            .attr('class', 'indcom');
        g.append("text").attr('x', 505).attr('y',380).text("Independent Bookstore Companies")
            .attr("class", "legend");
            
        g.append("line").attr('x1', 450).attr('x2', 500).attr('y1', 420).attr('y2', 420)
            .attr('class', 'indloc');
        g.append("text").attr('x', 505).attr('y',430).text("Independent Bookstores")
            .attr("class", "legend");

        g.append("line").attr('x1', 450).attr('x2', 500).attr('y1', 470).attr('y2', 470)
            .attr('class', 'bn');
        g.append("text").attr('x', 505).attr('y',478).text("Barnes and Noble Stores")
            .attr("class", "legend");
    }
}