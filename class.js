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
var Origin = "Herkomstgroepering";
var Years = "Perioden";
var NumConvictedMinorsHalt = "TotaalAantalHaltJongeren_1";
var NumCrimes = "TotaalMisdrijvenHalt_2";
var ViolentCrimes = "GeweldsmisdrijvenHalt_3";
var DestructionPubProperty = "VernielingEnOpenbareOrdeHalt_4";
var PropertyCrimes = "VermogensmisdrijvenHalt_5";
var OtherCrimes = "OverigeMisdrijvenHalt_6";

$(document).ready(function(){

    //1. get daa
    $.ajax({
        url: 'https://opendata.cbs.nl/ODataApi/odata/71930ned/TypedDataSet',
        method: 'GET',
        dataType: 'json',
        success: function(data){

            dataSet = data.value;
            filterMale();
            filterFemale();
        },
        error: function(){
            showError();
        },
        timeout: 3000

    });
});

//2. filter data
function filterFemale(sex){
    $(dataSet).each (function (index, value){
        if(value[Sex]===sex) {
            femaleData.push(value[Sex]);
        }
        if (value[Age] === [11200]) {
    age12.push(value[Age])
}
        if (value[Age]===[11300]) {
            age13.push(value[Age])
        }
        if (value[Age]===[11400]) {
            age14.push(value[Age])
        }
        if (value[Age]===[11500]) {
            age15.push(value[Age])
        }
        if (value[Age]===[11600]) {
            age16.push(value[Age])
        }
        if (value[Age]===[11700]) {
            age17.push(value[Age])
        }
    });
    console.log(femaleData);
    console.log(age12,age13,age14,age15,age16,age17);
}
function filterMale(sex){
    $(dataSet).each (function (index, value){
      if(value[Sex]===sex) {
          maleData.push(value[Sex]);
      }
    });
    console.log(maleData);
}
//3. counting data
//allows for the selection of what data you would like to see
$("#generate").click(function(){
    if( $('#female').is(':checked'))
    {
        filterFemale('4000')
    }
    if( $('#male').is(':checked'))
    {
        filterMale('3000')
    }
});
//4. form graph(visuals)


