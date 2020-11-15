class SelfPublishChart {

    constructor(data) {
        this.data = data;
    }

    drawChart() {
        let g = d3.select("#pub");
        g.append("text").attr("class", "graphtitle").attr("x", 160).attr("y", 50)
            .text("Self-Published Books Using Different Platforms")

        let xScale = d3.scaleLinear().domain([2010, 2018]).range([70, 840]);
        let xAxis = d3.axisBottom(xScale).ticks(9).tickFormat(function(d) {
            return d;
        });
        let x = g.append("g").attr("class", "axis").attr("transform", "translate(15,720)").call(xAxis);
        x.append("text").attr("class", "axislabel").attr("x", 525).attr("y", 55).text("Year");

        let yScale = d3.scaleLog().domain([1, 1416384]).range([680, 5]);
        let yAxis = d3.axisLeft(yScale).tickFormat(function(d, i) {
            if (d > 1 && i % 3 == 0)
                return (d / 10000).toFixed(1);
            else
                return "";
        });
        let y = g.append("g").attr("class", "axis").attr("transform", "translate(85,50)").call(yAxis);
        y.append("text").attr("class", "axislabel")
            .attr("transform", "translate(-65,120) rotate(270)")
            .text("Books Published (In Tens of Thousands)");

        let lineGenerator = d3.line()
            .x(d => xScale(d.year) + 15)
            .y(d => yScale(d.published) + 50);
        let xlineChart = g.append("path").attr("class", "xlibris")
            .attr("d", lineGenerator(this.data.filter(d => d.publisher === "XLIBRIS")));
        let blineChart = g.append("path").attr("class", "blurb")
            .attr("d", lineGenerator(this.data.filter(d => d.publisher === "BLURB")));
        let clineChart = g.append("path").attr("class", "createspace")
            .attr("d", lineGenerator(this.data.filter(d => d.publisher === "CREATESPACE")));
        g.selectAll('circle').data(this.data).join("circle")
            .attr("class", d => d.publisher.toLowerCase())
            .attr('r', 6)
            .attr("id", d=> d.publisher.toLowerCase()+""+d.year)
            .attr('cx', d=>xScale(d.year)+15)
            .attr('cy', d=>yScale(d.published)+50)
            .on('mouseover', this.highlightValue)
            .on('mouseout', this.deselectValue);

        g.append("line").attr('x1', 500).attr('x2', 550).attr('y1', 500).attr('y2', 500)
            .attr('class', 'xlibris');
        g.append("text").attr('x', 555).attr('y', 510).text("Published using Xlibris")
            .attr("class", "legend");

        g.append("line").attr('x1', 500).attr('x2', 550).attr('y1', 550).attr('y2', 550)
            .attr('class', 'blurb');
        g.append("text").attr('x', 555).attr('y', 560).text("Published using Blurb")
            .attr("class", "legend");

        g.append("line").attr('x1', 500).attr('x2', 550).attr('y1', 600).attr('y2', 600)
            .attr('class', 'createspace');
        g.append("text").attr('x', 555).attr('y', 608).text("Published using Createspace")
            .attr("class", "legend");
    }

    highlightValue(d){
        d3.select("#indloc"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#indcom"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#bn"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#bookstores"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#ecommerce"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#xlibris"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#blurb"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#createspace"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
    }

    deselectValue(d){
        d3.select("#indloc"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#indcom"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#bn"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#bookstores"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#ecommerce"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#xlibris"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#blurb"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#createspace"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');      
    }
}