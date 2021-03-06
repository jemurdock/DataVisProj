class BookSalesChart{

    constructor(data){
        this.data = data;
    }

    drawChart(){
        let g = d3.select("#bsales");
        g.append("text").attr("class", "graphtitle").attr("x", 150).attr("y", 50)
            .text("Book Sales in Stores & Through E-Commerce")
        let xScale = d3.scaleLinear().domain([1992,2018]).range([70,690]);
        let xAxis = d3.axisBottom(xScale).ticks(13).tickFormat(function(d){
            return d;
        });
        let x = g.append("g").attr("class", "axis").attr("transform", "translate(15,720)").call(xAxis);
        x.append("text").attr("class", "axislabel").attr("x", 395).attr("y", 55).text("Year");
        
        let yScale = d3.scaleLinear().domain([0,18500]).range([680,5]);
        let yAxis = d3.axisLeft(yScale).tickFormat(function(d){
            if(d != "0")
                return d/1000;
            else
                return "";
        });
        let y = g.append("g").attr("class", "axis").attr("transform", "translate(85,50)").call(yAxis);
        y.append("text").attr("class", "axislabel")
            .attr("transform", "translate(-50,110) rotate(270)")
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

        g.append("line").attr('x1', 450).attr('x2', 500).attr('y1', 660).attr('y2', 660)
            .attr('class', 'bookstores');
        g.append("text").attr('x', 505).attr('y',670).text("Physical Bookstores")
            .attr("class", "legend");
        g.append("line").attr('x1', 450).attr('x2', 500).attr('y1', 690).attr('y2', 690)
            .attr('class', 'ecommerce');
        g.append("text").attr('x', 505).attr('y',700).text("E-Commerce")
            .attr("class", "legend");

        g.append("line").attr("x1", xScale(1993)+15).attr("x2", xScale(1993)+15)
            .attr("class", "annotation").attr("y1", 410).attr("y2", 460);
        g.append("text").attr("x", xScale(1993)+10).attr("y", 480)
            .attr("class", "annotation").text("Barnes & Noble partners");
        g.append("text").attr("x", xScale(1993)+10).attr("y", 500)
            .attr("class", "annotation").text("with Starbucks");

        g.append("line").attr("x1", xScale(1995)+15).attr("x2", xScale(1995)+15)
            .attr("class", "annotation").attr("y1", 335).attr("y2", 385);
        g.append("text").attr("x", xScale(1995)+10).attr("y", 405)
            .attr("class", "annotation").text("Amazon launches");

        g.append("line").attr("x1", xScale(1997)+15).attr("x2", xScale(1997)+15)
            .attr("class", "annotation").attr("y1", 280).attr("y2", 325);
        g.append("text").attr("x", xScale(1997)+10).attr("y", 345)
            .attr("class", "annotation").text("BarnesandNoble.com");
        g.append("text").attr("x", xScale(1997)+10).attr("y", 365)
            .attr("class", "annotation").text("launches");

        // g.append("line").attr("x1", xScale(2007)+15).attr("x2", xScale(2007)+15)
        //     .attr("class", "annotation").attr("y1", 450).attr("y2", 525);
        // g.append("text").attr("x", xScale(2007)-40).attr("y", 425)
        //     .attr("class", "annotation").text("Amazon releases");
        // g.append("text").attr("x", xScale(2007)-5).attr("y", 445)
        //     .attr("class", "annotation").text("Kindle");

        g.append("line").attr("x1", xScale(2008)+15).attr("x2", xScale(2008)+15)
            .attr("class", "annotation").attr("y1", 540).attr("y2", 590);
        g.append("text").attr("x", xScale(2008)).attr("y", 605)
            .attr("class", "annotation").text("Amazon buys Audible");

        // g.append("line").attr("x1", xScale(2015)+15).attr("x2", xScale(2015)+15)
        //     .attr("class", "annotation").attr("y1", 340).attr("y2", 390);
        // g.append("text").attr("x", xScale(2015)-40).attr("y", 410)
        //     .attr("class", "annotation").text("Amazon opens");
        // g.append("text").attr("x", xScale(2015)-40).attr("y", 430)
        //     .attr("class", "annotation").text("first bookstore");

        g.append("line").attr("x1", xScale(2008)+15).attr("x2", xScale(2008)+15)
            .attr("class", "annotation").attr("y1", 130).attr("y2", 180);
        g.append("text").attr("x", xScale(2008)-50).attr("y", 195)
            .attr("class", "annotation").text("Borders.com");
        g.append("text").attr("x", xScale(2008)-50).attr("y", 215)
            .attr("class", "annotation").text("relaunches");

        g.append("line").attr("x1", xScale(2011)+15).attr("x2", xScale(2011)+15)
            .attr("class", "annotation").attr("y1", 220).attr("y2", 160);
        g.append("text").attr("x", xScale(2011)).attr("y", 130)
            .attr("class", "annotation").text("Borders goes");
        g.append("text").attr("x", xScale(2011)).attr("y", 150)
            .attr("class", "annotation").text("bankrupt");
    }

    highlightValue(d){
        d3.select(this).transition().duration(300).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#t"+d.year).transition().duration(300).attr('r', 20).attr('stroke-width', '3px');
        
        if(d.type != "bookstores"){ 
            d3.select("#bookstores"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        }else{
            d3.select("#ecommerce"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        }
        if(d.year >= 2005){
            d3.select("#bn"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
            if(d.year >= 2009 && d.year <= 2019){
                d3.select("#indloc"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
                d3.select("#indcom"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
            }
        }
        if(d.year >= 2010 && d.year <= 2018){
            d3.select("#xlibris"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
            d3.select("#blurb"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
            d3.select("#createspace"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        }

        d3.select("#yeartitle").text(d.year);
        d3.select("#bstory").text(infobox.filter(da=>da.year === d.year)[0].bscript);
        d3.select("#pstory").text(infobox.filter(da=>da.year === d.year)[0].pscript);
        d3.select("#nstory").text(infobox.filter(da=>da.year === d.year)[0].nscript);
    }

    deselectValue(d){
        d3.select("#t"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#bookstores"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#ecommerce"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        if(d.year >= 2005){
            d3.select("#bn"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            if(d.year >= 2009 && d.year <= 2019){
                d3.select("#indloc"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
                d3.select("#indcom"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            }
        }
        if(d.year >= 2010 && d.year <= 2018){
            d3.select("#xlibris"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            d3.select("#blurb"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            d3.select("#createspace"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        }
    }
}