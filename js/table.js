class Table {

    constructor(data) {
        this.data = [];
        this.categories = ["Age", "Sex", "Average Books", "Print", "Audio", "E-Book"];
        for (let d of data) {
            this.data.push({
                "age": d["age"],
                "sex": d["sex"],
                "avg": d["avebooks"],
                "pnt": d["readprint"],
                "aud": d["readaudio"],
                "ebk": d["readebook"],
            });
        }
    }

    buildTable() {
        let table = d3.select("#table");

        this.tbody = table.append("tbody");
        this.tbody.selectAll("tr").data(this.data).enter().append("tr");
        this.tbody.selectAll("tr")
            .selectAll("td")
            .data(["age", "sex", "avg", "pnt", "aud", "ebk"]).enter()
            .append("td").attr("id", function(d) { return d });

        this.tbody.selectAll("#age").data(this.data).append("p").text(function(d) { return d["age"]; });
        this.tbody.selectAll("#sex").data(this.data).append("p").text(function(d) { return d["sex"]; });
        this.tbody.selectAll("#avg").data(this.data).append("p").text(function(d) { return d["avg"]; });
        this.tbody.selectAll("#pnt").data(this.data).append("p").text(function(d) { return d["pnt"]; });
        this.tbody.selectAll("#aud").data(this.data).append("p").text(function(d) { return d["aud"]; });
        this.tbody.selectAll("#ebk").data(this.data).append("p").text(function(d) { return d["ebk"]; });
    }

}