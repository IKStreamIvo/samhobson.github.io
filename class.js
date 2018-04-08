var dataSet = {};
var maleData;
var femaleData;
var Sex = "Geslacht";
var Age = "Leeftijd";
var fireworkCrime = "VuurwerkovertredingenHalt_10";
var femaleAges = {"11200": 0, "11300": 0, "11400": 0, "11500": 0, "11600": 0, "11700": 0, "99   ": 0, "0    ": 0};
var maleAges = {"11200": 0, "11300": 0, "11400": 0, "11500": 0, "11600": 0, "11700": 0, "99   ": 0, "0    ": 0};
var age12Graph;
var age13Graph;
var age14Graph;
var age15Graph;
var age16Graph;
var age17Graph;
$(document).ready(function(){

    //1. get data
    $.ajax({
        url: 'https://opendata.cbs.nl/ODataApi/odata/71930ned/TypedDataSet',
        method: 'GET',
        dataType: 'json',
        success: function(data){

            dataSet = data.value;
        },
        error: function(){
            showError();
        },
        timeout: 3000
    });
});
    $("#graph").hide();
//2. filter data
// this grabs all the data and seperates it into male and female
function filterFemale(sex, age){
    femaleData = [];
    $(dataSet).each (function (index, value){
        if(value[Sex]===sex) {
            femaleData.push(value);
        }
    });
}
function filterMale (sex, age){
    maleData = [];
    $(dataSet).each (function (index, value){
        if(value[Sex]===sex) {
            maleData.push(value);
        }
    });
}
//3. counting data
//this counts the amount of crimes per person and then sorts then into their ages and keeps them separated by sex
function femaleCount() {
    femaleAges = {"11200": 0, "11300": 0, "11400": 0, "11500": 0, "11600": 0, "11700": 0, "99   ": 0, "0    ": 0};
    $(femaleData).each(function(nr, value) {
        if (value[fireworkCrime] !== null) {
            femaleAges[value[Age]] += value[fireworkCrime];
        }
    });
    graphData();
}
function maleCount (){
    maleAges = {"11200": 0, "11300": 0, "11400": 0, "11500": 0, "11600": 0, "11700": 0, "99   ": 0, "0    ": 0};
    console.log(maleData);
    $(maleData).each(function(nr, value) {
        if (value[fireworkCrime] !== null) {
            maleAges[value[Age]] += value[fireworkCrime];
        }
    });
    graphData();
}
//allows for the selection of what data you would like to see
//allows for the combination and singular selction while also making sure you are able
//to undo a selection
$("#generate").click(function(){
    if($('#female').is(':checked') && $('#male').is(':checked')){
        filterFemale('4000'); filterMale('3000');
        femaleCount(); maleCount();
        generateGraph(maleAges["11200"] + femaleAges["11200"], maleAges["11300"] + femaleAges["11300"], maleAges["11400"] + femaleAges["11400"], maleAges["11500"] + femaleAges["11500"], maleAges["11600"] + femaleAges["11600"], maleAges["11700"] + femaleAges["11700"]);
    }
    else if($('#female').is(':checked')){
        filterFemale('4000');
        femaleCount();
        generateGraph(femaleAges["11200"], femaleAges["11300"], femaleAges["11400"], femaleAges["11500"], femaleAges["11600"], femaleAges["11700"]);
    }
    else if($('#male').is(':checked')){
        filterMale('3000');
        maleCount();
        generateGraph(maleAges["11200"], maleAges["11300"], maleAges["11400"], maleAges["11500"], maleAges["11600"], maleAges["11700"]);
    }
    else{
        generateGraph(0,0,0,0,0,0);
    }
    $("#graph").show();
});
// this puts the male/female data into usable data for the graph
// also performs a smooth transiton
function graphData() {
    age12Graph = maleAges["11200"]+femaleAges["11200"];
    age13Graph = maleAges["11300"]+femaleAges["11300"];
    age14Graph = maleAges["11400"]+femaleAges["11400"];
    age15Graph = maleAges["11500"]+femaleAges["11500"];
    age16Graph = maleAges["11600"]+femaleAges["11600"];
    age17Graph = maleAges["11700"]+femaleAges["11700"];
}
function generateGraph(age12, age13, age14, age15, age16, age17) {
    $("#age12").animate({"height": age12/100}, 1000);
    $("#age13").animate({"height": age13/100}, 1000);
    $("#age14").animate({"height": age14/100}, 1000);
    $("#age15").animate({"height": age15/100}, 1000);
    $("#age16").animate({"height": age16/100}, 1000);
    $("#age17").animate({"height": age17/100}, 1000);

    $("#12graph").animate({"height": age12/100}, 1000);
    $("#13graph").animate({"height": age13/100}, 1000);
    $("#14graph").animate({"height": age14/100}, 1000);
    $("#15graph").animate({"height": age15/100}, 1000);
    $("#16graph").animate({"height": age16/100}, 1000);
    $("#17graph").animate({"height": age17/100}, 1000);
}

//How to call it:
///Males only
generateGraph(maleAges["11200"], maleAges["11300"], maleAges["11400"], maleAges["11500"], maleAges["11600"], maleAges["11700"]);
///Females only
generateGraph(femaleAges["11200"], femaleAges["11300"], femaleAges["11400"], femaleAges["11500"], femaleAges["11600"], femaleAges["11700"]);
///BOTH
generateGraph(maleAges["11200"] + femaleAges["11200"], maleAges["11300"] + femaleAges["11300"], maleAges["11400"] + femaleAges["11400"], maleAges["11500"] + femaleAges["11500"], maleAges["11600"] + femaleAges["11600"], maleAges["11700"] + femaleAges["11700"]
);