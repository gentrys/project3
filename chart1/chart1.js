var data;
var value = [];
var code = [];



$( document ).ready(function() {
    generateChart()
    generateBarChart()
    generateLineChart()
});


function loadData(){
    
    $.ajax({
            type:"GET",
            url:"stateFreq.json",
            dataType:"text",
            success: parseData
});
       
}


function parseData(data){
    
    dataObj = $.parseJSON(data);
    
    for (var i=0; i < dataObj.length; i++) { 
    value.push(dataObj[i].value);
    code.push(dataObj[i].code);
    
    }
    
    generateChart()
}

function generateChart(){

    //$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=us-population-density.json&callback=?', function (data) {
$.getJSON('stateFreq.json', function (data) {
  

        // Make codes uppercase to match the map data
        $.each(data, function () {
            this.code = this.code.toUpperCase();
            
        });

        // Instanciate the map
        $('#container').highcharts('Map', {

            chart : {
               
            },

            title : {
                text : 'US Disaster Frequency'
            },

            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.85)',
                floating: true,
                verticalAlign: 'top',
                y: 25
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 1,
                type: 'logarithmic',
                minColor: '#EFF2F6',
                maxColor: '#1E6388',
                stops: [
                    [0, '#EFF2F6'],
                    [0.67, '#84A0B7'],
                    [1, '#1E6388']
                ]
            },

            series : [{
                animation: {
                    duration: 1000
                },
                data : data,
                mapData: Highcharts.maps['countries/us/us-all'],
                joinBy: ['postal-code', 'code'],
                dataLabels: {
                    enabled: true,
                    color: 'white',
                    format: '{point.code}'
                },
                name: 'Disaster Frequency',
                tooltip: {
                    pointFormat: '{point.code}: {point.value}'
                }
                },
            ]
        });
    });
};

var data;
var date = [];
var fire = [];
var storm = [];
var other = [];




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
    
    generateLineChart()
}


function generateLineChart(){
    $('#container1').highcharts({
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

var data;
var date = [];
var fire = [];
var major = [];
var emergency = [];



function parseData(data){
    
    dataObj = $.parseJSON(data);
    
    for (var i=0; i < dataObj.length; i++) { 
    date.push(dataObj[i].date);
    fire.push(dataObj[i].fire);
    major.push(dataObj[i].major);
    emergency.push(dataObj[i].emergency);
    
    }
    
    generateBarChart()
}



function generateBarChart(){
    $('#container2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Disaster Declaration Frequency'
        },
        subtitle: {
            text: 'Source: data.gov'
        },
        xAxis: {
            categories: date
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Declaration Frequency'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>${point.y:.2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'DR',
            data: major
            }, {
            name: 'EM',
            data: emergency
            }, {
            name: 'FM',
            data: fire
        }]
    });
}






