var data;
var date = [];
var fire = [];
var major = [];
var emergency = [];



$( document ).ready(function() {
    loadData();
});


function loadData(){
    
    $.ajax({
            type:"GET",
            url:"declFreq.json",
            dataType:"text",
            success: parseData
});
       
}


function parseData(data){
    
    dataObj = $.parseJSON(data);
    
    for (var i=0; i < dataObj.length; i++) { 
    date.push(dataObj[i].date);
    fire.push(dataObj[i].fire);
    major.push(dataObj[i].major);
    emergency.push(dataObj[i].emergency);
    
    }
    
    generateChart()
}



function generateChart(){
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




