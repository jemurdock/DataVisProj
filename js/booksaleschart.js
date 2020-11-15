class BookSalesChart{

    constructor(data){
        this.data = data;
    }

    drawChart(){
        let g = d3.select("#bsales");
        g.append("text").attr("class", "graphtitle").attr("x", 300).attr("y", 50)
            .text("USA Yearly Book Sales in Stores & Through E-Commerce")
        let xScale = d3.scaleLinear().domain([1992,2018]).range([70,1040]);
        let xAxis = d3.axisBottom(xScale).ticks(13).tickFormat(function(d){
            return d;
        });
        let x = g.append("g").attr("class", "axis").attr("transform", "translate(15,720)").call(xAxis);
        x.append("text").attr("class", "axislabel").attr("x", 525).attr("y", 55).text("Year");

        let yScale = d3.scaleLinear().domain([0,18500]).range([680,5]);
        let yAxis = d3.axisLeft(yScale).tickFormat(function(d){
            if(d != "0")
                return d/1000;
            else
                return "";
        });
        let y = g.append("g").attr("class", "axis").attr("transform", "translate(85,50)").call(yAxis);
        y.append("text").attr("class", "axislabel")
            .attr("transform", "translate(-60,170) rotate(270)")
            .text("Book Sales (In Millions of Dollars)");

        let lineGenerator = d3.line()
            .x(d => xScale(d.year)+15)
            .y(d => yScale(d.sales)+50);
        let bookstores = this.data.filter(d=>d.type === "bookstores");
        let ecommerce = this.data.filter(d=>d.type === "ecommerce");
        g.append("path").attr("class", "bookstores").attr("d", lineGenerator(bookstores));
        g.append("path").attr("class", "ecommerce").attr("d", lineGenerator(ecommerce));
        g.selectAll('circle').data(this.data).join("circle")
            .attr("class", d => d.type)
            .attr("id", d=> d.type+""+d.year)
            .attr('r', 6)
            .attr('cx', d=>xScale(d.year)+15)
            .attr('cy', d=>yScale(d.sales)+50)
            .on('mouseover', this.highlightValue)
            .on('mouseout', this.deselectValue);

        g.append("line").attr('x1', 790).attr('x2', 840).attr('y1', 550).attr('y2', 550)
            .attr('class', 'bookstores');
        g.append("text").attr('x', 845).attr('y',560).text("Physical Bookstores")
            .attr("class", "legend");
        g.append("line").attr('x1', 790).attr('x2', 840).attr('y1', 600).attr('y2', 600)
            .attr('class', 'ecommerce');
        g.append("text").attr('x', 845).attr('y',608).text("E-Commerce")
            .attr("class", "legend");
    }

    highlightValue(d){
        d3.select("#bookstores"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#ecommerce"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
        if(d.year > 2004){
            d3.select("#bn"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
            if(d.year > 2008){
                d3.select("#indloc"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
                d3.select("#indcom"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
                if(d.year > 2009){
                    d3.select("#xlibris"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
                    d3.select("#blurb"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
                    d3.select("#createspace"+d.year).transition().duration(500).attr('r', 20).attr('stroke-width', '3px');
                }
            }
        }
    }

    deselectValue(d){
        d3.select("#bookstores"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#ecommerce"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        if(d.year > 2004){
            d3.select("#bn"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            if(d.year > 2008){
                d3.select("#indloc"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
                d3.select("#indcom"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
                if(d.year > 2009){
                    d3.select("#xlibris"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
                    d3.select("#blurb"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
                    d3.select("#createspace"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
                }
            }
        }
    }
}