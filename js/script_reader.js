let readerGraph;
let readers;

// Male-Age comparison, don't worry about females
let comp_MaleAge = [];
// Female-Age comparison, don't worry about males
let comp_FemaleAge = [];
// Comparison by age, don't worry about sex
let comp_Age = [];
// Male-Female comparison, don't worry about age
let comp_MaleFemale = [];
// Just the last consumed medium itself
let comp_Overall = [{"age":"N/A", "sex":"N/A", "avg":"N/A", "pnt": 0, "aud": 0, "ebk": 0}];
// The raw information
let uncomp = [];

let genderCounts = {};
let ageCounts = {};
let maleAgeCounts = {};
let femaleAgeCounts = {};

d3.csv('./cleanData/readerData/Age_Comparison.csv').then(function(data)
{
    let tempDict = {};
    for(let d of data)
    {
        if(d["age"] in tempDict)
        {
            // General age 
            tempDict[d["age"]]["avg"] += +d["avebooks"];
            tempDict[d["age"]]["pnt"] += +d["readprint"];
            tempDict[d["age"]]["aud"] += +d["readaudio"];
            tempDict[d["age"]]["ebk"] += +d["readebook"];
            ageCounts[d["age"]]++;
        }
        else
        {
            tempDict[d["age"]] = {
                "age": d["age"],
                "sex": "N/A",
                "avg": +d["avebooks"],
                "pnt": +d["readprint"],
                "aud": +d["readaudio"],
                "ebk": +d["readebook"]
            };
            ageCounts[d["age"]] = 1;
        }
    }
    for(let t in tempDict)
    {
        comp_Age.push(tempDict[t]);
    }
});

d3.csv('./cleanData/readerData/MaleFemale_Comparison.csv').then(function(data)
{
    let tempDict = {};
    for(let d of data)
    {
        if (d["sex"] in tempDict)
        {
            tempDict[d["sex"]]["avg"] += +d["avebooks"];
            tempDict[d["sex"]]["pnt"] += +d["readprint"];
            tempDict[d["sex"]]["aud"] += +d["readaudio"];
            tempDict[d["sex"]]["ebk"] += +d["readebook"];
        }
        else
        {
            tempDict[d["sex"]] = 
            {
                "sex": d["sex"],
                "age": "16 to 93",
                "avg": +d["avebooks"],
                "pnt": +d["readprint"],
                "aud": +d["readaudio"],
                "ebk": +d["readebook"]
            };
            genderCounts[d["sex"]] = 1;
        }
        genderCounts[d["sex"]]++;
    }
    for(let t in tempDict)
    {
        comp_MaleFemale.push(tempDict[t]);
    }
});

d3.csv('./cleanData/readerData/MaleAge_Comparison.csv').then(function(data)
{
    let tempDict = {};
    for(let d of data)
    {
        if(d["age"] in tempDict)
        {
            // General age 
            tempDict[d["age"]]["avg"] += +d["avebooks"];
            tempDict[d["age"]]["pnt"] += +d["readprint"];
            tempDict[d["age"]]["aud"] += +d["readaudio"];
            tempDict[d["age"]]["ebk"] += +d["readebook"];
            maleAgeCounts[d["age"]]++;
        }
        else
        {
            tempDict[d["age"]] = {
                "age": d["age"],
                "sex": "Male",
                "avg": +d["avebooks"],
                "pnt": +d["readprint"],
                "aud": +d["readaudio"],
                "ebk": +d["readebook"]
            };
            maleAgeCounts[d["age"]] = 1;
        }
    }
    for(let t in tempDict)
    {
        comp_MaleAge.push(tempDict[t]);
    }
});

d3.csv('./cleanData/readerData/FemaleAge_Comparison.csv').then(function(data)
{
    let tempDict = {};
    for(let d of data)
    {
        if(d["age"] in tempDict)
        {
            // General age 
            tempDict[d["age"]]["avg"] += +d["avebooks"];
            tempDict[d["age"]]["pnt"] += +d["readprint"];
            tempDict[d["age"]]["aud"] += +d["readaudio"];
            tempDict[d["age"]]["ebk"] += +d["readebook"];
            femaleAgeCounts[d["age"]]++;
        }
        else
        {
            tempDict[d["age"]] = {
                "age": d["age"],
                "sex": "Female",
                "avg": +d["avebooks"],
                "pnt": +d["readprint"],
                "aud": +d["readaudio"],
                "ebk": +d["readebook"]
            };
            femaleAgeCounts[d["age"]] = 1;
        }
    }
    for(let t in tempDict)
    {
        comp_FemaleAge.push(tempDict[t]);
    }
});

d3.csv('./cleanData/readerData/OverallBooks.csv').then(function(data)
{
    for(let d of data)
    {
        comp_Overall[0]["pnt"] += +d["readprint"];
        comp_Overall[0]["aud"] += +d["readaudio"];
        comp_Overall[0]["ebk"] += +d["readebook"];
    }
});

d3.csv('./cleanData/readerData/ReadersByCategory.csv').then(function(data) {
    
    for(let d of data)
    {
        // Unspecified, slap it all in one structure
        // This is the individual view so save all the information
        uncomp.push({
            "age": d["age"],
            "sex": d["sex"],
            "avg": d["avebooks"],
            "pnt": d["readprint"],
            "aud": d["readaudio"],
            "ebk": d["readebook"],
        });
    }

    readers = new Table(uncomp, comp_MaleFemale, comp_MaleAge, comp_FemaleAge, comp_Age, comp_Overall);
    readers.minimizeTable();

    readerGraph = new ReaderGraph(comp_MaleFemale, comp_MaleAge, comp_FemaleAge, comp_Age, comp_Overall);
});

// Info Functions
function groupItems()
{
    readers.minimizeTable();
}

function individualItems()
{
    readers.expandTable();
}

function updateAge()
{
    readers.ageSelected();
    readerGraph.ageSelected();
}

function updateSex()
{
    readers.genderSelected();
    readerGraph.genderSelected();
}

function updateAge_Male()
{
    readers.maleAgeSelected();
    readerGraph.maleAgeSelected();
}

function updateAge_Female()
{
    readers.femaleAgeSelected();
    readerGraph.femaleAgeSelected();
}

function updateOverall()
{
    readers.overallSelected();
    readerGraph.overallSelected();
}
