class ReaderGraph {

    constructor(comp_MaleFemale, comp_MaleAge, comp_FemaleAge, comp_Age, comp_Overall) {
        this.gender = true;
        this.age = false;
        this.overall = false;

        this.genderTotal = comp_MaleFemale[0]["avg"] + comp_MaleFemale[1]["avg"];

        this.comp_MaleFemale = comp_MaleFemale;

        this.comp_MaleAge = comp_MaleAge;
        this.comp_FemaleAge = comp_FemaleAge;
        this.comp_Age = comp_Age;
        this.comp_Overall = comp_Overall;

        this.currData = [];

        this.genderColors = ["#fc5c65", "#45aaf2"];
        this.ageColors = ["#fa8231", "#fed330", "#20bf6b", "#8854d0", "#4b6584", "#fc5c65"];
        this.overallColors = ["#20bf6b", "#fed330", "#45aaf2"];
        this.genderScale = d3.scaleOrdinal().domain(["Female", "Male"]).range(this.genderColors);
        this.ageScale = d3.scaleOrdinal().domain(["16 to 26", "27 to 37", "38 to 48", "49 to 59", "60 to 70", "71 to 93"]).range(this.ageColors);
        this.overallScale = d3.scaleOrdinal().domain(["Print", "E-Book", "Audio"]).range(this.overallColors);

        this.svg = d3.select("#tabsvg");
        
        this.hoverDiv = d3.select("body").append("div");
        this.hoverDiv.attr("class", "tooltip").style("opacity", 0);

        // Append svgs
        this.mainView = this.svg.append("g") .attr("transform", "translate(50,70)").attr("id", "overall").style("opacity", 1);
        this.printView = this.svg.append("g").attr("transform", "translate(400,70)").attr("id", "print").style("opacity", 1);
        this.audioView = this.svg.append("g").attr("transform", "translate(50,320)").attr("id", "audio").style("opacity", 1);
        this.ebookView = this.svg.append("g").attr("transform", "translate(400,320)").attr("id", "ebook").style("opacity", 1);
        this.ebookView.append("g").attr("id", "ebookScale").attr("transform", "translate(0," + 200 + ")");

        this.xScale = d3.scaleBand().range([0, 270]).padding(0.1);
        this.yScale = d3.scaleLinear().range([200, 20]);

        // This just puts everything in the right spots
        this.buildBars(this.comp_MaleFemale, "sex");
    }

    buildBars(data, key) {
        let that = this;

        if(this.currData != data)
        {
            this.mainView.selectAll("rect").data([]).exit().remove();
            this.mainView.selectAll("g").remove();
            this.mainView.selectAll("text").remove();
            this.printView.selectAll("rect").data([]).exit().remove();
            this.printView.selectAll("g").remove();
            this.printView.selectAll("text").remove();
            this.audioView.selectAll("rect").data([]).exit().remove();
            this.audioView.selectAll("g").remove();
            this.audioView.selectAll("text").remove();
            this.ebookView.selectAll("rect").data([]).exit().remove();
            this.ebookView.selectAll("g").remove();
            this.ebookView.selectAll("text").remove();
        }

        this.currData = data;
        
        if (this.gender)
        {
            this.xScale.domain(["Male", "Female"]);
        }
        else if (this.age)
        {
            this.xScale.domain(["16 to 26", "27 to 37", "38 to 48", "49 to 59", "60 to 70", "71 to 93"]);
        } else {
            this.xScale.domain(["Print", "Audio", "E-Book"]);
        }
        this.yScale.domain([0, d3.max(data, function(d) { return d["avg"]; })]);

        this.mainView.append("text").text("Overall").attr("transform", "translate(100,0)").style("fill", "black").style("font-weight", "bold");

        this.mainView.selectAll(".bar").data(data.map(function(d) { return [d[key], d["avg"]]; }))
            .enter().append("rect")
            .attr("id", function(d) { return d[0]; })
            .attr("x", function(d, i) { return that.xScale(d[0]) + 80 / data.length; })
            .attr("y", function(d) { return that.yScale(d[1]); })
            .attr("width", 80 / data.length)
            .attr("height", function(d) { return 200 - that.yScale(d[1]); })
            .style("fill", function(d) { if (key === "sex") { return that.genderScale(d[0]); } else { return that.ageScale(d[0]) } })
            .on("mouseover", this.hover)
            .on("mouseout", this.normal);
        
        this.mainView.append("g").attr("class", "scale").attr("transform", "translate(0," + 200 + ")").call(d3.axisBottom(this.xScale));
        this.mainView.append("g").attr("class", "scale").call(d3.axisLeft(this.yScale));

        this.yScale.domain([0, d3.max(data, function(d) { return d["pnt"]; })]);

        this.printView.append("text").text("Print Books").attr("transform", "translate(80,0)").style("fill", "black").style("font-weight", "bold");
        this.printView.selectAll(".bar").data(data.map(function(d) { return [d[key], d["pnt"]]; }))
            .enter().append("rect")
            .attr("x", function(d) { return that.xScale(d[0]) + 80 / data.length; })
            .attr("y", function(d) { return that.yScale(d[1]); })
            .attr("width", 80 / data.length)
            .attr("height", function(d) { return 200 - that.yScale(d[1]); })
            .style("fill", function(d) { if (key === "sex") { return that.genderScale(d[0]); } else { return that.ageScale(d[0]) } })
            .on("mouseover", this.hover)
            .on("mouseout", this.normal);
    
        this.printView.append("g").attr("class", "scale").attr("transform", "translate(0," + 200 + ")").call(d3.axisBottom(this.xScale));
        this.printView.append("g").attr("class", "scale").call(d3.axisLeft(this.yScale));

        this.yScale.domain([0, d3.max(data, function(d) { return d["aud"]; })]);

        this.audioView.append("text").text("Audio Books").attr("transform", "translate(80,0)").style("fill", "black").style("font-weight", "bold");
        this.audioView.selectAll(".bar").data(data.map(function(d) { return [d[key], d["aud"]]; }))
            .enter().append("rect")
            .attr("x", function(d) { return that.xScale(d[0]) + 80 / data.length; })
            .attr("y", function(d) { return that.yScale(d[1]); })
            .attr("width", 80 / data.length)
            .attr("height", function(d) { return 200 - that.yScale(d[1]); })
            .style("fill", function(d) { if (key === "sex") { return that.genderScale(d[0]); } else { return that.ageScale(d[0]) } })
            .on("mouseover", this.hover)
            .on("mouseout", this.normal);
    
        this.audioView.append("g").attr("class", "scale").attr("transform", "translate(0," + 200 + ")").call(d3.axisBottom(this.xScale));
        this.audioView.append("g").attr("class", "scale").call(d3.axisLeft(this.yScale));

        // this.ebookView
        this.yScale.domain([0, d3.max(data, function(d) { return d["ebk"]; })]);

        this.ebookView.append("text").text("E-Books").attr("transform", "translate(100,0)").style("fill", "black").style("font-weight", "bold");
        this.ebookView.selectAll(".bar").data(data.map(function(d) { return [d[key], d["ebk"]]; }))
            .enter().append("rect")
            .attr("x", function(d) { return that.xScale(d[0]) + 80 / data.length; })
            .attr("y", function(d) { return that.yScale(d[1]); })
            .attr("width", 80 / data.length)
            .attr("height", function(d) { return 200 - that.yScale(d[1]); })
            .style("fill", function(d) { if (key === "sex") { return that.genderScale(d[0]); } else { return that.ageScale(d[0]) } })
            .on("mouseover", this.hover)
            .on("mouseout", this.normal);
    
        this.ebookView.append("g").attr("class", "scale").attr("transform", "translate(0," + 200 + ")").call(d3.axisBottom(this.xScale));
        this.ebookView.append("g").attr("class", "scale").call(d3.axisLeft(this.yScale));
    }

    buildOverallBars(data) {
        let that = this;

        if(this.currData != data)
        {
            this.mainView.selectAll("rect").data([]).exit().remove();
            this.mainView.selectAll("g").remove();
            this.mainView.selectAll("text").remove();
            this.printView.selectAll("rect").data([]).exit().remove();
            this.printView.selectAll("g").remove();
            this.printView.selectAll("text").remove();
            this.audioView.selectAll("rect").data([]).exit().remove();
            this.audioView.selectAll("g").remove();
            this.audioView.selectAll("text").remove();
            this.ebookView.selectAll("rect").data([]).exit().remove();
            this.ebookView.selectAll("g").remove();
            this.ebookView.selectAll("text").remove();
        }

        this.currData = data;
        
        this.xScale.domain(["Print", "Audio", "E-Book"]);
        
        this.yScale.domain([0, d3.max([data[0]["pnt"], data[0]["aud"], data[0]["ebk"]])]);

        this.mainView.append("text").text("Overall").attr("transform", "translate(100,0)").style("fill", "black").style("font-weight", "bold");
        this.mainView.selectAll(".bar").data([["Print", data[0]["pnt"]], ["E-Book", data[0]["ebk"]], ["Audio", data[0]["aud"]]])
            .enter().append("rect")
            .attr("x", function(d) { return that.xScale(d[0]); })
            .attr("y", function(d) { return that.yScale(d[1]); })
            .attr("width", 80 / data.length)
            .attr("height", function(d) { return 200 - that.yScale(d[1]); })
            .style("fill", function(d) { return that.overallScale(d[0]); })
            .on("mouseover", this.hover)
            .on("mouseout", this.normal);
    
        this.mainView.append("g").attr("class", "scale").attr("transform", "translate(0," + 200 + ")").call(d3.axisBottom(this.xScale));
        this.mainView.append("g").attr("class", "scale").call(d3.axisLeft(this.yScale));
    }

    genderSelected()
    {
        this.gender = true;
        this.age = false;
        this.overall = false;
        this.buildBars(this.comp_MaleFemale, "sex");
    }

    maleAgeSelected()
    {
        this.gender = false;
        this.age = true;
        this.overall = false;
        this.buildBars(this.comp_MaleAge, "age");
    }

    femaleAgeSelected()
    {
        this.gender = false;
        this.age = true;
        this.overall = false;
        this.buildBars(this.comp_FemaleAge, "age");
    }

    ageSelected()
    {
        this.gender = false;
        this.age = true;
        this.overall = false;
        this.buildBars(this.comp_Age, "age");
    }

    overallSelected()
    {
        this.gender = false;
        this.age = false;
        this.overall = true;
        this.buildOverallBars(this.comp_Overall);
    }

    hover(d) {
        d3.select(".tooltip").transition().duration(200).style("opacity", 0.9);
        d3.select(".tooltip").html(d[1]).style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }

    normal(d) {
        d3.select(".tooltip").transition().duration(200).style("opacity", 0);
    }
}