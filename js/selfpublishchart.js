class SelfPublishChart {

    constructor(data) {
        this.data = data;
    }

    drawChart() {
        let g = d3.select("#pub");
        g.append("text").attr("class", "graphtitle").attr("x", 150).attr("y", 50)
            .text("*Self-Published Books By Platform")

        let xScale = d3.scaleLinear().domain([2010, 2018]).range([70, 660]);
        let xAxis = d3.axisBottom(xScale).ticks(9).tickFormat(function(d) {
            return d;
        });
        let x = g.append("g").attr("class", "axis").attr("transform", "translate(15,720)").call(xAxis);
        x.append("text").attr("class", "axislabel").attr("x", 385).attr("y", 55).text("Year");
        g.append("text").attr("x", 100).attr("y", 675).attr('font-size', '18px')
            .text("*NOTE: this graph uses a logarithmic scale, rather than a linear one.");
        g.append("text").attr("x", 100).attr("y", 700).attr('font-size', '18px')
            .text(" Ticks on the y-axis are not evenly spaced!");

        let yScale = d3.scaleLog().domain([1, 1416384]).range([680, 5]);
        let yAxis = d3.axisLeft(yScale).tickFormat(function(d, i) {
            if (d > 1 && i % 3 == 0){
                if(d >= 1000){
                    if(d < 1000000)
                        return (d/1000).toFixed(0)+"K";
                    return "1MIL";
                }
                return d;
            }else
                return "";
        });
        let y = g.append("g").attr("class", "axis").attr("transform", "translate(85,50)").call(yAxis);
        y.append("text").attr("class", "axislabel")
            .attr("transform", "translate(-55,290) rotate(270)")
            .text("Books Published");

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

        g.append("line").attr('x1', 100).attr('x2', 150).attr('y1', 580).attr('y2', 580)
            .attr('class', 'xlibris');
        g.append("text").attr('x', 155).attr('y', 590).text("Published using Xlibris")
            .attr("class", "legend");

        g.append("line").attr('x1', 100).attr('x2', 150).attr('y1',605).attr('y2', 605)
            .attr('class', 'blurb');
        g.append("text").attr('x', 155).attr('y', 615).text("Published using Blurb")
            .attr("class", "legend");

        g.append("line").attr('x1', 100).attr('x2', 150).attr('y1', 630).attr('y2', 630)
            .attr('class', 'createspace');
        g.append("text").attr('x', 155).attr('y', 640).text("Published using Createspace")
            .attr("class", "legend");

        g.append("line").attr("x1", xScale(2014)+15).attr("x2", xScale(2014)+15)
            .attr("class", "annotation").attr("y1", 195).attr("y2", 255);
        g.append("text").attr("x", xScale(2014)-10).attr("y", 190)
            .attr("class", "annotation").text("Blurb partners with Amazon");

        g.append("line").attr("x1", xScale(2018)+15).attr("x2", xScale(2018)+15)
            .attr("class", "annotation").attr("y1", 65).attr("y2", 115);
        g.append("text").attr("x", xScale(2018)-70).attr("y", 130)
            .attr("class", "annotation").text("Amazon ends");
        g.append("text").attr("x", xScale(2018)-65).attr("y", 150)
            .attr("class", "annotation").text("CreateSpace");
    }

    highlightValue(d){
        d3.select(this).transition().duration(300).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#t"+d.year).transition().duration(300).attr('r', 20).attr('stroke-width', '3px');
        
        d3.select("#bookstores"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        d3.select("#ecommerce"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');     
        d3.select("#bn"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        d3.select("#indloc"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        d3.select("#indcom"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        if(d.publisher != "XLIBRIS")
            d3.select("#xlibris"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        if(d.publisher != "BLURB")
            d3.select("#blurb"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        if(d.publisher != "CREATESPACE")
            d3.select("#createspace"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');

        d3.select("#yeartitle").text(d.year);
        d3.select("#bstory").text(infobox.filter(da=>da.year === d.year)[0].bscript);
        d3.select("#pstory").text(infobox.filter(da=>da.year === d.year)[0].pscript);
        d3.select("#nstory").text(infobox.filter(da=>da.year === d.year)[0].nscript);
    }

    deselectValue(d){
        d3.select("#t"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
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