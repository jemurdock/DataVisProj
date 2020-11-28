class StoresChart{

    constructor(data){
        this.data = data;
    }

    drawChart(){
        let g = d3.select("#numstores");
        g.append("text").attr("class", "graphtitle").attr("x", 170).attr("y", 50)
            .text("Number of Bookstores in the U.S.")

        let xScale = d3.scaleLinear().domain([2005,2020]).range([70,690]);
        let xAxis = d3.axisBottom(xScale).tickFormat(function(d){
            return d;
        });
        let x = g.append("g").attr("class", "axis").attr("transform", "translate(15,720)").call(xAxis);
        x.append("text").attr("class", "axislabel").attr("x", 425).attr("y", 55).text("Year");

        let yScale = d3.scaleLinear().domain([0,2600]).range([680,5]);
        let yAxis = d3.axisLeft(yScale).tickFormat(function(d){
            return d;
        });
        let y = g.append("g").attr("class", "axis").attr("transform", "translate(85,50)").call(yAxis);
        y.append("text").attr("class", "axislabel")
            .attr("transform", "translate(-65,230) rotate(270)")
            .text("Count");

        let lineGenerator = d3.line()
            .x(d => xScale(d.year)+15)
            .y(d => yScale(d.count)+50);
        let indcolineChart = g.append("path").attr("class", "indcom")
            .attr("d", lineGenerator(this.data.filter(d => d.type === "IndCom")));
        let indloclineChart = g.append("path").attr("class", "indloc")
            .attr("d", lineGenerator(this.data.filter(d => d.type === "IndLoc")));
        let bnlineChart = g.append("path").attr("class", "bn")
            .attr("d", lineGenerator(this.data.filter(d => d.type === "bn")));
        g.selectAll('circle').data(this.data).join("circle")
        .attr("class", d => d.type.toLowerCase())
            .attr('r', 6)
            .attr("id", d=> d.type.toLowerCase()+""+d.year)
            .attr('cx', d=>xScale(d.year)+15)
            .attr('cy', d=>yScale(d.count)+50)
            .on('mouseover', this.highlightValue)
            .on('mouseout', this.deselectValue);

        g.append("line").attr('x1', 100).attr('x2', 150).attr('y1', 630).attr('y2', 630)
            .attr('class', 'indcom');
        g.append("text").attr('x', 155).attr('y',640).text("Independent Bookstore Companies")
            .attr("class", "legend");
            
        g.append("line").attr('x1', 100).attr('x2', 150).attr('y1', 660).attr('y2', 660)
            .attr('class', 'indloc');
        g.append("text").attr('x', 155).attr('y',670).text("Independent Bookstores")
            .attr("class", "legend");

        g.append("line").attr('x1', 100).attr('x2', 150).attr('y1', 690).attr('y2', 690)
            .attr('class', 'bn');
        g.append("text").attr('x', 155).attr('y',698).text("Barnes and Noble Stores")
            .attr("class", "legend");


        g.append("line").attr("x1", xScale(2007)+15).attr("x2", xScale(2007)+15)
            .attr("class", "annotation").attr("y1", 495).attr("y2", 535);
        g.append("text").attr("x", xScale(2007)-40).attr("y", 465)
            .attr("class", "annotation").text("Amazon releases");
        g.append("text").attr("x", xScale(2007)-10).attr("y", 485)
            .attr("class", "annotation").text("Kindle");

        g.append("line").attr("x1", xScale(2009)+15).attr("x2", xScale(2009)+15)
            .attr("class", "annotation").attr("y1", 445).attr("y2", 530);
        g.append("text").attr("x", xScale(2009)-40).attr("y", 415)
            .attr("class", "annotation").text("Barnes & Noble");
        g.append("text").attr("x", xScale(2009)-35).attr("y", 435)
            .attr("class", "annotation").text("releases Nook");

        g.append("line").attr("x1", xScale(2011)+15).attr("x2", xScale(2011)+15)
            .attr("class", "annotation").attr("y1", 495).attr("y2", 535);
        g.append("text").attr("x", xScale(2011)-40).attr("y", 465)
            .attr("class", "annotation").text("Borders goes");
        g.append("text").attr("x", xScale(2011)-20).attr("y", 485)
            .attr("class", "annotation").text("bankrupt");

        g.append("line").attr("x1", xScale(2015)+15).attr("x2", xScale(2015)+15)
            .attr("class", "annotation").attr("y1", 500).attr("y2", 550);
        g.append("text").attr("x", xScale(2015)-40).attr("y", 470)
            .attr("class", "annotation").text("Amazon opens");
        g.append("text").attr("x", xScale(2015)-40).attr("y", 490)
            .attr("class", "annotation").text("first bookstore");

        g.append("line").attr("x1", xScale(2020)+15).attr("x2", xScale(2020)+15)
            .attr("class", "annotation").attr("y1", 510).attr("y2", 560);
        g.append("text").attr("x", xScale(2020)-40).attr("y", 482)
            .attr("class", "annotation").text("Bookshop.org");
        g.append("text").attr("x", xScale(2020)-20).attr("y", 502)
            .attr("class", "annotation").text("launches");
    }

    highlightValue(d){
        d3.select(this).transition().duration(300).attr('r', 20).attr('stroke-width', '3px');
        d3.select("#t"+d.year).transition().duration(300).attr('r', 20).attr('stroke-width', '3px');

        if(d.year <= 2018){ 
            d3.select("#bookstores"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
            d3.select("#ecommerce"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        }
        if(d.type != "bn"){
            d3.select("#bn"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
            if(d.type === "IndLoc")
                d3.select("#indcom"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
            else
                d3.select("#indloc"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
        }else if(d.year >= 2009 && d.year <= 2019){
            d3.select("#indloc"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
            d3.select("#indcom"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');          
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
        d3.select("#bn"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        d3.select("#t"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        if(d.year <= 2018){ 
            d3.select("#bookstores"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            d3.select("#ecommerce"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        }
        if(d.year >= 2009 && d.year <= 2019){
            d3.select("#indloc"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            d3.select("#indcom"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');          
        }
        if(d.year >= 2010 && d.year <= 2018){
            d3.select("#xlibris"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            d3.select("#blurb"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            d3.select("#createspace"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        }
    }
}