var dataSet = {};
var maleData;
var femaleData;
var Sex = "Geslacht";
var Age = "Leeftijd";
var fireworkCrime = "VuurwerkovertredingenHalt_10";
var femaleAges;
var maleAges;
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
    })
}
function maleCount (){
    maleAges = {"11200": 0, "11300": 0, "11400": 0, "11500": 0, "11600": 0, "11700": 0, "99   ": 0, "0    ": 0};
    $(maleData).each(function(nr, value) {
        if (value[fireworkCrime] !== null) {
            maleAges[value[Age]] += value[fireworkCrime];
        }
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
});