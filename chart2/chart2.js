var data;
var date = [];
var fire = [];
var storm = [];
var other = [];


$( document ).ready(function() {
    loadData();
});


function loadData(){
    
    $.ajax({
            type:"GET",
            url:"disasterFreq.json",
            dataType:"text",
            success: parseData
});
       
}


function parseData(data){
    //console.log(data);
    
    dataObj = $.parseJSON(data);
    
    for (var i=0; i < dataObj.length; i++) { 
    //console.log(dataObj[i].name);
    //person.push(dataObj[i].name);
    date.push(dataObj[i].date);
    fire.push(dataObj[i].fire);
    storm.push(dataObj[i].storm);
    other.push(dataObj[i].other);
    
    }
    
    generateChart()
}


function generateChart(){
    $('#container1').highcharts({
        chart: {
            width: 500px,
        }
        title: {
            text: 'Disaster Frequency by Year',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: data.gov',
            x: -20
        },
        xAxis: {
            categories: date
        },
        yAxis: {
            title: {
                text: 'Disaster Types'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '¡C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Fire',
            data: fire
        }, {
            name: 'Severe Storm',
            data: storm
        }, {
            name: 'Other',
            data: other
        }]
    });
};