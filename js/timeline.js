class Timeline{

    constructor(data){
        this.data = data;
    }

    drawChart(){
        //Draw timeline real quick hang on a sec
        let t = d3.select("#timeline");
        t.append("line").attr("x1", 40).attr("x2", 2140).attr("y1", 25).attr("y2", 25)
            .attr("fill", "none").attr("stroke", "white");
        let tScale = d3.scaleLinear().domain([1992,2020]).range([40,2140]);
        t.selectAll("circle").data(this.data).join("circle").attr("id", d=>"t"+d.year)
            .attr("fill", "white").attr("stroke", "black").attr("r", 6)
            .attr("cx", d=>tScale(d.year)).attr("cy", 25)
            .on('mouseover', this.highlightValue)
            .on('mouseout', this.deselectValue);
        t.selectAll("text").data(this.data).join("text").attr("class", "timelinelabel")
            .attr("x", d=>tScale(d.year)-25).attr("y",70)
            .text(d=>d.year);
    }

    highlightYears(){

    }

    highlightValue(d){
        d3.select(this).transition().duration(300).attr('r', 20).attr('stroke-width', '3px');
        if(d.year <= 2018){ 
            d3.select("#bookstores"+d.year).transition().duration(300).attr('r', 15).attr('stroke-width', '3px');
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
        d3.select("#bstory").text(d.bscript);
        d3.select("#pstory").text(d.pscript);
        d3.select("#nstory").text(d.nscript);
    }

    deselectValue(d){
        d3.select(this).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        if(d.year <= 2018){ 
            d3.select("#bookstores"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
            d3.select("#ecommerce"+d.year).transition().duration(500).attr('r', 6).attr('stroke-width', '1px');
        }
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