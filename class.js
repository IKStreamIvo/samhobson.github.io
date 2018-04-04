var dataSet = {};
var maleData = [];
var femaleData = [];
var age12 = [];
var age13 = [];
var age14 = [];
var age15 = [];
var age16 = [];
var age17 = [];
var Sex = "Geslacht";
var Age = "Leeftijd";
var fireworkCrime = "VuurwerkovertredingenHalt_10";
var maleAges = {"11200": 0, "11300": 0, "11400": 0, "11500": 0, "11600": 0, "11700": 0, "99   ": 0, "0    ": 0};

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
    $(dataSet).each (function (index, value){
        if(value[Sex]===sex) {
            femaleData.push(value);
        }
    });
    console.log(femaleData);
}
function filterMale (sex, age){
    $(dataSet).each (function (index, value){
        if(value[Sex]===sex) {
            maleData.push(value);
      }
    });
    console.log(maleData);
}
//3. counting data
function maleCount (){
    $(maleData).each(function(nr, value) {
        if (value[fireworkCrime] !== null) {
            maleAges[value[Sex]] += value[fireworkCrime];
        }
    })
}
//allows for the selection of what data you would like to see
$("#generate").click(function(){
    if( $('#female').is(':checked'))
    {
        filterFemale('4000')
    }
    if( $('#male').is(':checked'))
    {
        filterMale('3000');
        maleCount();
        console.log(maleAges);
    }
});
//4. form graph(visuals)

