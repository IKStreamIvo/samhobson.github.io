var dataSet = {};
var maleData;
var femaleData;
var Sex = "Geslacht";
var Age = "Leeftijd";
var fireworkCrime = "VuurwerkovertredingenHalt_10";
var femaleAges;
var maleAges;
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

//2. filter data
function filterFemale(sex, age){
    femaleData = [];
    $(dataSet).each (function (index, value){
        if(value[Sex]===sex) {
            femaleData.push(value);
        }
    });
    console.log(femaleData);
}
function filterMale (sex, age){
    maleData = [];
    $(dataSet).each (function (index, value){
        if(value[Sex]===sex) {
            maleData.push(value);
        }
    });
    console.log(maleData);
}
//3. counting data
function femaleCount() {
    femaleAges = {"11200": 0, "11300": 0, "11400": 0, "11500": 0, "11600": 0, "11700": 0, "99   ": 0, "0    ": 0};
    $(femaleData).each(function(nr, value) {
        if (value[fireworkCrime] !== null) {
            femaleAges[value[Age]] += value[fireworkCrime];
        }
        return femaleAges
        graphData
    })
}
function maleCount (){
    maleAges = {"11200": 0, "11300": 0, "11400": 0, "11500": 0, "11600": 0, "11700": 0, "99   ": 0, "0    ": 0};
    $(maleData).each(function(nr, value) {
        if (value[fireworkCrime] !== null) {
            maleAges[value[Age]] += value[fireworkCrime];
        }
        return maleAges;
        graphData
    })
}
//allows for the selection of what data you would like to see
$("#generate").click(function(){
    if( $('#female').is(':checked'))
    {
        filterFemale('4000');
        femaleCount();
        console.log(femaleAges);
    }
    if( $('#male').is(':checked'))
    {
        filterMale('3000');
        maleCount();
        console.log(maleAges);
    }
    setTimeout(function(){
        generateGraph()
    }, 3000);
});
function graphData() {
        age12Graph = maleAges["11200"]+femaleAges["11200"];
        age13Graph = maleAges["11300"]+femaleAges["11300"];
        age14Graph = maleAges["11400"]+femaleAges["11400"];
        age15Graph = maleAges["11500"]+femaleAges["11500"];
        age16Graph = maleAges["11600"]+femaleAges["11600"];
        age17Graph = maleAges["11700"]+femaleAges["11700"];
    }
function generateGraph() {
        document.getElementById("Graph_1").setAttribute("height",age12Graph );
        document.getElementById("Graph_2").setAttribute("height",age13Graph );
        document.getElementById("Graph_3").setAttribute("height",age14Graph );
        document.getElementById("Graph_4").setAttribute("height",age15Graph );
        document.getElementById("Graph_5").setAttribute("height",age16Graph );
        document.getElementById("Graph_6").setAttribute("height",age17Graph );
}
