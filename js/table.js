class Table {

    constructor(uncomp, comp_MaleFemale, comp_MaleAge, comp_FemaleAge, comp_Age, comp_Overall) {
        this.gender = true;
        this.age    = false;
        this.m_age  = false;
        this.f_age  = false;
        this.overall = false;
        this.currData = [];

        this.uncomp = uncomp;
        this.comp_FemaleAge = comp_FemaleAge;
        this.comp_MaleAge = comp_MaleAge;
        this.comp_MaleFemale = comp_MaleFemale;
        this.comp_Age = comp_Age;
        this.comp_Overall = comp_Overall;
        
        this.headerData = [{
                sorted: false,
                ascending: false,
                key: 'age'
            },
            {
                sorted: false,
                ascending: false,
                key: 'sex'
            },
            {
                sorted: false,
                ascending: false,
                key: 'avg'
            },
            {
                sorted: false,
                ascending: false,
                key: 'pnt'
            },
            {
                sorted: false,
                ascending: false,
                key: 'aud'
            },
            {
                sorted: false,
                ascending: false,
                key: 'ebk'
            }
        ];
    }

    buildTable() {
        let table = d3.select("#table");

        this.tbody = table.append("tbody");
        this.tbody.selectAll("tr").data(this.uncomp).enter().append("tr");
        this.tbody.selectAll("tr")
            .selectAll("td")
            .data(["age", "sex", "avg", "pnt", "aud", "ebk"]).enter()
            .append("td").attr("id", function(d) { return d });

        this.tbody.selectAll("#age").data(this.uncomp).append("p").text(function(d) { return d["age"]; });
        this.tbody.selectAll("#sex").data(this.uncomp).append("p").text(function(d) { return d["sex"]; });
        this.tbody.selectAll("#avg").data(this.uncomp).append("p").text(function(d) { return d["avg"]; });
        this.tbody.selectAll("#pnt").data(this.uncomp).append("p").text(function(d) { return d["pnt"]; });
        this.tbody.selectAll("#aud").data(this.uncomp).append("p").text(function(d) { return d["aud"]; });
        this.tbody.selectAll("#ebk").data(this.uncomp).append("p").text(function(d) { return d["ebk"]; });

        this.currData = this.uncomp;
    }

    buildTableAll(data) {
        let table = d3.select("#table");

        this.tbody = table.append("tbody");

        this.tbody.selectAll("tr").data(data).enter().append("tr");
        this.tbody.selectAll("tr")
            .selectAll("td")
            .data(["age", "sex", "avg", "pnt", "aud", "ebk"]).enter()
            .append("td").attr("id", function(d) { return d });

        this.tbody.selectAll("#age").data(data).append("p").text(function(d) { return d["age"]; });
        this.tbody.selectAll("#sex").data(data).append("p").text(function(d) { return d["sex"]; });
        this.tbody.selectAll("#avg").data(data).append("p").text(function(d) { return d["avg"]; });
        this.tbody.selectAll("#pnt").data(data).append("p").text(function(d) { return d["pnt"]; });
        this.tbody.selectAll("#aud").data(data).append("p").text(function(d) { return d["aud"]; });
        this.tbody.selectAll("#ebk").data(data).append("p").text(function(d) { return d["ebk"]; });
    }

    expandTable()
    {
        this.minimize = false;
        this.removeTableInfo();
        this.buildTable();
    }

    minimizeTable()
    {
        this.minimize = true;
        this.removeTableInfo();
        if(this.gender)
        {
            this.buildTableAll(this.comp_MaleFemale);
            this.currData = this.comp_MaleFemale;
        }
        if(this.age)
        {
            this.buildTableAll(this.comp_Age);
            this.currData = this.comp_Age;
        }
        if(this.m_age)
        {
            this.buildTableAll(this.comp_MaleAge);
            this.currData = this.comp_MaleAge;
        }
        if(this.f_age)
        {
            this.buildTableAll(this.comp_FemaleAge);
            this.currData = this.comp_FemaleAge;
        }
        if(this.overall)
        {
            this.buildTableAll(this.comp_Overall);
            this.currData = this.comp_Overall;
        }
    }

    ageSelected()
    {
        this.age    = true;

        this.gender = false;
        this.m_age  = false;
        this.f_age  = false;
        this.overall = false;

        if(this.minimize)
            this.minimizeTable();
    }

    genderSelected()
    {
        this.gender = true;
        
        this.age    = false;
        this.m_age  = false;
        this.f_age  = false;
        this.overall = false;

        if(this.minimize)
            this.minimizeTable();
    }

    maleAgeSelected()
    {
        this.m_age  = true;
        
        this.gender = false;
        this.age    = false;
        this.f_age  = false;
        this.overall = false;

        if(this.minimize)
            this.minimizeTable();
    }

    femaleAgeSelected()
    {
        this.f_age  = true;
        
        this.m_age  = false;
        this.gender = false;
        this.age    = false;
        this.overall = false;

        if(this.minimize)
            this.minimizeTable();
    }

    overallSelected()
    {
        this.overall = true;
        
        this.f_age  = false;
        this.m_age  = false;
        this.gender = false;
        this.age    = false;

        if(this.minimize)
            this.minimizeTable();
    }

    removeTableInfo() {
        // d3.select("#table").select("th").remove();
        d3.select("#table").select("tbody").remove();
    }

}