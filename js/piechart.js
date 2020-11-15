class PieChart {

    constructor(data) {
        this.data = data;

        this.maleTotals = { "owned": 0, "print": 0, "audio": 0, "ebook": 0 };
        this.femaleTotals = { "owned": 0, "print": 0, "audio": 0, "ebook": 0 };
        this.ageTotals = {
            "16 to 26": { "owned": 0, "print": 0, "audio": 0, "ebook": 0 },
            "27 to 37": { "owned": 0, "print": 0, "audio": 0, "ebook": 0 },
            "38 to 48": { "owned": 0, "print": 0, "audio": 0, "ebook": 0 },
            "60 to 70": { "owned": 0, "print": 0, "audio": 0, "ebook": 0 }
        };

        for (let d of data) {
            if (d["sex"] == "Male") {
                this.maleTotals["owned"] += +d["avebooks"];
                this.maleTotals["print"] += +d["readprint"];
                this.maleTotals["audio"] += +d["readaudio"];
                this.maleTotals["ebook"] += +d["readebook"];
            } else {
                this.femaleTotals["owned"] += +d["avebooks"];
                this.femaleTotals["print"] += +d["readprint"];
                this.femaleTotals["audio"] += +d["readaudio"];
                this.femaleTotals["ebook"] += +d["readebook"];
            }

            this.ageTotals[d["age"]]["owned"] = +d["avebooks"];
        }
    }

    drawChart() {

    }
}