class PieChart {

    constructor(data) {
        this.data = data;

        this.showGender = true;
        this.showAge = false;
        this.showReadingHabits = false;

        this.genderColors = ["#45aaf2", "#fc5c65"];
        this.ageColors = ["#fa8231", "#fed330", "#20bf6b", "#8854d0", "#4b6584"];

        this.genderScale = d3.scaleOrdinal().domain(["male", "female"]).range(this.genderColors);
        this.ageScale = d3.scaleOrdinal().domain(["16 to 26", "27 to 37", "38 to 48", "60 to 70", "71 to 93"]).range(this.ageColors);

        this.maleTotals = { "owned": 0, "print": 0, "audio": 0, "ebook": 0 };
        this.femaleTotals = { "owned": 0, "print": 0, "audio": 0, "ebook": 0 };
        this.ageTotals = {
            "16 to 26": { "owned": 0, "print": 0, "audio": 0, "ebook": 0 },
            "27 to 37": { "owned": 0, "print": 0, "audio": 0, "ebook": 0 },
            "38 to 48": { "owned": 0, "print": 0, "audio": 0, "ebook": 0 },
            "60 to 70": { "owned": 0, "print": 0, "audio": 0, "ebook": 0 },
            "71 to 93": { "owned": 0, "print": 0, "audio": 0, "ebook": 0 }
        };

        this.genderTotals = { "male": 0, "female": 0 };
        this.genderPrint = { "male": 0, "female": 0 };
        this.genderAudio = { "male": 0, "female": 0 };
        this.genderEbook = { "male": 0, "female": 0 };

        this.ageTotals = {
            "16 to 26": 0,
            "27 to 37": 0,
            "38 to 48": 0,
            "60 to 70": 0,
            "71 to 93": 0
        }
        this.agePrint = {
            "16 to 26": 0,
            "27 to 37": 0,
            "38 to 48": 0,
            "60 to 70": 0,
            "71 to 93": 0
        }
        this.ageAudio = {
            "16 to 26": 0,
            "27 to 37": 0,
            "38 to 48": 0,
            "60 to 70": 0,
            "71 to 93": 0
        }
        this.ageEbook = {
            "16 to 26": 0,
            "27 to 37": 0,
            "38 to 48": 0,
            "60 to 70": 0,
            "71 to 93": 0
        }

        this.bookSpread = { "print": 0, "audio": 0, "ebook": 0 };

        this.genderTotal = 0;
        this.gprintTotal = 0;
        this.gaudioTotal = 0;
        this.gebookTotal = 0;

        for (let d of data) {
            if (d["sex"] == "Male") {
                this.genderTotals["male"] += +d["avebooks"];
                this.genderPrint["male"] += +d["readprint"];
                this.genderAudio["male"] += +d["readaudio"];
                this.genderEbook["male"] += +d["readebook"];
            } else {
                this.genderTotals["female"] += +d["avebooks"];
                this.genderPrint["female"] += +d["readprint"];
                this.genderAudio["female"] += +d["readaudio"];
                this.genderEbook["female"] += +d["readebook"];
            }

            this.genderTotal += +d["avebooks"];
            this.gprintTotal += +d["readprint"];
            this.gaudioTotal += +d["readaudio"];
            this.gebookTotal += +d["readebook"];

            this.ageTotals[d["age"]] += +d["avebooks"];
            this.agePrint[d["age"]] += +d["readprint"];
            this.ageAudio[d["age"]] += +d["readaudio"];
            this.ageEbook[d["age"]] += +d["readebook"];

            this.bookSpread["print"] += +d["readprint"];
            this.bookSpread["audio"] += +d["readaudio"];
            this.bookSpread["ebook"] += +d["readebook"];
        }

        this.svg = d3.select("#tabsvg");

        let div = this.svg.append("foreignObject")
            .append("div").attr("class", "custom-control").attr("class", "custom-radio");
        div.append("input").attr("type", "radio").attr("id", "Male-Female").attr("name", "Selectors").attr("class", "custom-control-input");
        div.append("label").attr("class", "custom-control-label").attr("for", "Male-Female");

        this.hoverDiv = d3.select("body").append("div");
        this.hoverDiv.attr("class", "tooltip").style("opacity", 0);

        // This just puts everything in the right spots
        this.buildTorus();
        this.buildBars();
    }

    buildTorus() {
        let that = this;
        let torusMath = d3.pie().value(function(d) {
            return d.value;
        });

        this.mainView = this.svg.append("g").attr("transform", "translate(600,250)").attr("id", "overall").style("opacity", 1);
        this.printView = this.svg.append("g").attr("transform", "translate(300,650)").attr("id", "print").style("opacity", 1);
        this.audioView = this.svg.append("g").attr("transform", "translate(600,650)").attr("id", "audio").style("opacity", 1);
        this.ebookView = this.svg.append("g").attr("transform", "translate(900,650)").attr("id", "ebook").style("opacity", 1);

        var mainTorus = torusMath(d3.entries(this.genderTotals));

        this.mainView.selectAll("overall").data(mainTorus).enter()
            .append('path')
            .attr('d', d3.arc().innerRadius(100).outerRadius(200))
            .attr("fill", function(d) {
                return that.genderScale(d.data.key);
            })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .on("mouseover", function(d) {
                d3.select(".tooltip").transition().duration(200).style("opacity", 0.9);
                d3.select(".tooltip").html(d.value + "<br/>" + (d.value / that.genderTotal).toFixed(2) * 100 + "%").style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                d3.select(".tooltip").transition().duration(200).style("opacity", 0);
            });

        this.mainView.append("text").text("Owned Books").attr("transform", "translate(-75,10)").style("fill", "black").style("font-weight", "bold").style("font-size", "24px");
        this.mainView.append("text").text("Male").attr("transform", "translate(-265,0)").style("fill", "#45aaf2").style("font-weight", "bold").style("font-size", "24px");
        this.mainView.append("text").text("Female").attr("transform", "translate(210, 0)").style("fill", "#fc5c65").style("font-weight", "bold").style("font-size", "24px");

        mainTorus = torusMath(d3.entries(this.genderPrint));
        this.printView.selectAll("print").data(mainTorus).enter()
            .append('path')
            .attr('d', d3.arc().innerRadius(75).outerRadius(125))
            .attr("fill", function(d) {
                return that.genderScale(d.data.key);
            })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .on("mouseover", function(d) {
                d3.select(".tooltip").transition().duration(200).style("opacity", 0.9);
                d3.select(".tooltip").html(d.value + "<br/>" + (d.value / that.gprintTotal).toFixed(2) * 100 + "%").style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                d3.select(".tooltip").transition().duration(200).style("opacity", 0);
            });

        this.printView.append("text")
            .text("Print Books").attr("transform", "translate(-55,10)").style("fill", "black").style("font-weight", "bold").style("font-size", "20px");

        mainTorus = torusMath(d3.entries(this.genderAudio));
        this.audioView.selectAll("audio").data(mainTorus).enter()
            .append('path')
            .attr('d', d3.arc().innerRadius(75).outerRadius(125))
            .attr("fill", function(d) {
                return that.genderScale(d.data.key);
            })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .on("mouseover", function(d) {
                d3.select(".tooltip").transition().duration(200).style("opacity", 0.9);
                d3.select(".tooltip").html(d.value + "<br/>" + (d.value / that.gaudioTotal).toFixed(2) * 100 + "%").style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                d3.select(".tooltip").transition().duration(200).style("opacity", 0);
            });

        this.audioView.append("text")
            .text("Audio Books")
            .attr("transform", "translate(-60,10)")
            .style("fill", "black")
            .style("font-weight", "bold")
            .style("font-size", "20px");

        mainTorus = torusMath(d3.entries(this.genderEbook));
        this.ebookView.selectAll("overall").data(mainTorus).enter()
            .append('path')
            .attr('d', d3.arc().innerRadius(75).outerRadius(125))
            .attr("fill", function(d) {
                return that.genderScale(d.data.key);
            })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .on("mouseover", function(d) {
                d3.select(".tooltip").transition().duration(200).style("opacity", 0.9);
                d3.select(".tooltip").html(d.value + "<br/>" + (d.value / that.gebookTotal).toFixed(2) * 100 + "%").style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                d3.select(".tooltip").transition().duration(200).style("opacity", 0);
            });

        this.ebookView.append("text")
            .text("E-Books")
            .attr("transform", "translate(-40,10)")
            .style("fill", "black")
            .style("font-weight", "bold")
            .style("font-size", "20px");
    }

    buildBars() {
        this.mainGraph = this.svg.append("g").attr("transform", "translate(600,250)").attr("id", "overallg");

        this.printGraph = this.svg.append("g").attr("transform", "translate(300,650)").attr("id", "printg");
        this.audioGraph = this.svg.append("g").attr("transform", "translate(600,650)").attr("id", "audiog");
        this.ebookGraph = this.svg.append("g").attr("transform", "translate(900,650)").attr("id", "ebookg");
    }

    drawTorus() {

    }

    drawBars() {

    }

    hover(d) {
        d3.select(".tooltip").transition().duration(200).style("opacity", 0.9);
        d3.select(".tooltip").html(d.value + "<br/>" + (d.value / this.genderTotal)).style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }

    normal(d) {
        d3.select(".tooltip").transition().duration(200).style("opacity", 0);
    }
}