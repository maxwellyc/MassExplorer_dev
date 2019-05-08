var Z_SP = 0;
var EDF_name = "UNEDF0";
var datatype1 = "HFB_Energy_LN";
var datatype2 = "HFB_Energy_LN";
var chain = "";
var avgData = [];
var dataAll = [[],[],[],[],[],[]];
var avgDataAll = [];
var UnitP = [];
var MassNum;
//FILTER FUNCTION, PLUS CHECKBOX SELECTION OF WHAT DATA TO PLOT.
function PlotInput(model, chain, Z_SP, datatype1, datatype2){
    //this "text" can be changed into a list or string to output various element, let's try single input proton number first:
    var x, y, text;
    text = '';
    var e1 = document.getElementById("Datatype_singleplot1");
    var e2 = document.getElementById("Datatype_singleplot2");
       data_label = [e1.options[e1.selectedIndex].text, e2.options[e2.selectedIndex].text];
    //Redefine Z value:
    var N = 0;
    var Z = 0;
    var A = 0;
    var tag = 0;
    //X axis variable
    
    //Isotope
    if (chain == 'Z'){
        
        Z = Z_SP;
        var x = parseFloat(Z,10);
        var z1 = parseInt(Z,10)+1;
        if ( isNaN(Z) || Z<1 ||Z>120 || !((x|0)===x) || parseInt(Z/2,10) != parseInt(z1/2,10) ){
            //pick even Z within 1~120 only:
            document.getElementById('plotErr').innerHTML = "Please enter an even proton number between 2 and 120";
        } 
        else  {
            document.getElementById('plotErr').innerHTML = '';
            Plot(model, chain, Z, datatype1, datatype2);
        }

    }
    //Isotone
    else if (chain == 'N'){
        
        N = Z_SP;
        var y = parseFloat(N,10);
        var n1 = parseInt(N,10)+1;
        if ( isNaN(N) || N<1 ||N>300 || !((y|0)===y) || parseInt(N/2,10) != parseInt(n1/2,10) ){
            //pick even N within 1~300 only:
            document.getElementById('plotErr').innerHTML = "Please enter an even neutron number between 2 and 300";
        } 
        else  {
            document.getElementById('plotErr').innerHTML = '';
            Plot(model, chain, N, datatype1, datatype2);
        }
    }
    //Isobar
    else if (chain == 'AN' || chain == 'AZ' || chain == 'MassTable') {
        A = Z_SP;
        var xa = parseFloat(A,10);
        var a1 = parseInt(A,10)+1;
        if ( isNaN(A) || A<3 ||A>420 || !((xa|0)===xa) || parseInt(A/2,10) != parseInt(a1/2,10) ){
            //pick even A within 1~420:
            document.getElementById('plotErr').innerHTML = "Please enter an even mass number between 4 and 420";
        }
        else  {
            document.getElementById('plotErr').innerHTML = '';
            Plot(model, chain, A, datatype1, datatype2);
        }
        
    }
    
}

//Plot Function for Isotope/Isotone/Isobar
function Plot(Model, chainChoice, Z_P, data_P1, data_P2){
var data_P = [data_P1, data_P2];
var data = [[[], [], [], [], [], []], [[], [], [], [], [], []]]; //create data array, consists of arrays(coordinate).
for (k = 0; k < 2; k++){
    var Elem = "";
    var Elem1 = "";
    var az = parseInt(Z_P,10); // set proton number
    var an = az; //set N
    var aa = az; //set A
    
    var EDF_db = {UNEDF0:SA_UNEDF0, UNEDF1:SA_UNEDF1, SKMS:SA_SKMS, SKP:SA_SKP, SLY4:SA_SLY4,SV_MIN:SA_SV_MIN};
    
    //convert into Alphabetical names for 104+ elements
    //convert numbers in LBL column of each database to elements because after 104 it does not contain labels
    var UuElem_name = {"04":"Rf","06":"Sg","08":"Hs","10":"Ds","12":"Cn","14":"Fl","16":"Lv","18":"Og","20":"Ubn"};
    
    var Data_V = 0;
    var count = 0;
    //label for legends
    var label = ["UNEDF0","UNEDF1","SKMS","SKP","SLY4","SV_MIN","Average"];
    // var lbl = ["UNEDF0 " + data_label[0],"UNEDF1 " + data_label[0],"SKMS " + data_label[0],"SKP " + data_label[0],"SLY4 " + data_label[0],"SV_MIN " + data_label[0],"UNEDF0 " + data_label[1],"UNEDF1 " + data_label[1],"SKMS " + data_label[1],"SKP " + data_label[1],"SLY4 " + data_label[1],"SV_MIN " + data_label[1]]
    
    // load data for line plot
    for(j = 0; j < 6; j++) {
        var f1 = EDF_db[label[j]]; // choose EDF string
        var split_f1 = f1.split(" ");// split_f1 is "array"ed, contains whole database of the chosen EDF
        //find index of labels in first element of split_f1.
        var NLoc_1 = split_f1.indexOf("N");
        var ZLoc_1 = split_f1.indexOf("Z");
        var ALoc_1 = split_f1.indexOf("A");
        var dataLoc_1 = split_f1.indexOf(data_P[k]);
        var dataLoc_Z1 = dataLoc_1 - ZLoc_1; //relative position of data to Z number.
        var dataLoc_N1 = dataLoc_Z1 - 1;
        var dataLoc_A1 = dataLoc_Z1 - 2;
        //find index of the value of N,Z,data in the first line of actual data, i.e HE 2 2
        var NLoc1 = parseInt(NLoc_1 + 30, 10);
        var ZLoc1 = parseInt(ZLoc_1 + 30, 10);
        var ALoc1 = parseInt(ALoc_1 + 30, 10);
        var xn1 = NLoc1;
        var xz1 = ZLoc1;
        var xa1 = ALoc1;
        var crazyCats = 1;
        //for tooltip, reflects variable on X axis
        var chainX = '';
            //For Isotope
            if (chainChoice == 'Z'){
                chainX = 'N';
                for ( i = 0; i < 5000 ; i++ ){
                    //crazyCats = 1 + split_f1[xz1];
                    if ( (2 + split_f1[xz1]) > 0){
                        var Data_V1 = split_f1[parseInt(dataLoc_Z1+xz1,10)];
                        data[k][j][data[k][j].length] = [parseFloat(split_f1[parseInt(xz1+1,10)]),parseFloat(Data_V1)];
                        var Elem = split_f1[parseInt(xz1 - 1,10)]; //for UNEDF0.dat element name is right in front of Z
                        xz1 += 30;// 30 corresponds to number of columns in original data file (before 1string.py)
                        if ( az > 102 ){
                            var Elem1 = UuElem_name[Elem+""];
                            var Elem = Elem1+"";
                        }
                     }
                     //else{
                     //   count += 1;
                      //  xz1 += 30;
                     //}
                  }
                
                
            }
            
            document.getElementById('flag2').innerHTML = data[0][2][3000]// dataLoc_Z1 + " , " + xz1 +" , "+Data_V1;//"type of xz1: " + (typeof xz1) + "<br>" + "type of split_f1: " + (typeof split_f1[200]);
            //For Isotone
            if ( chainChoice == 'N'){
                chainX = 'Z';
                for ( i = 0; i < 5000 ; i++ ){
                     if (an == split_f1[xn1]){
                        Data_V1 = split_f1[parseInt(dataLoc_N1+xn1,10)];
                        data[k][j][data[k][j].length] = [parseFloat(split_f1[parseInt(-1+xn1,10)]),parseFloat(Data_V1)]; //Z as x-axis
                        Elem = split_f1[parseInt(-2+xn1,10)]; //for UNEDF0.dat element name is right in front of Z
                        xn1 += 30;
                     }
                     else{
                         count += 1;
                         xn1 += 30;
                     }
                }
            }
            //For Isobar, x-axis is Neutron Number
            if (chainChoice == 'AN'){
                chainX = 'N';
                for ( i = 0; i < 5000 ; i++ ){
                    if (aa == split_f1[xa1]){
                        var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                        data[k][j][data[k][j].length] = [parseFloat(split_f1[parseInt(xa1-1,10)]),parseFloat(Data_V1)];
                        var Elem = split_f1[parseInt(xa1 - 3,10)]; //for UNEDF0.dat element name is right in front of Z
                        xa1 += 30;
                    }
                    else{
                        count += 1;
                        xa1 += 30;
                    }
                }
            }
            //For Isobar, x-axis is Proton Number
            if (chainChoice == 'AZ'){
                chainX = 'Z';
                for ( i = 0; i < 5000 ; i++ ){
                    if (aa == split_f1[xa1]){
                        var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                        data[k][j][data[k][j].length] = [parseFloat(split_f1[parseInt(xa1-2,10)]),parseFloat(Data_V1)];
                        var Elem = split_f1[parseInt(xa1 - 3,10)]; //for UNEDF0.dat element name is right in front of Z
                        xa1 += 30;
                    }
                    else{
                        count += 1;
                        xa1 += 30;
                    }
                }
            }
            //For Entire Mass Table
             if (chainChoice == 'MassTable'){
                chainX = 'Z';
                for ( i = 0; i < 5000 ; i++ ){
	                for(MassNum = 4; MassNum < 430; MassNum++){
                      if (MassNum == split_f1[xa1]){
                        var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                        data[k][j][data[k][j].length] = [parseFloat(split_f1[parseInt(xa1-2,10)]),parseFloat(Data_V1)];
                        var Elem = split_f1[parseInt(xa1 - 3,10)]; //for UNEDF0.dat element name is right in front of Z
                        xa1 += 30;
                      }
                      else{
                         count += 1;
                         xa1 += 30;
                      }
                 }
                }
            }
            
    }

    


    
    //AVERAGE DATA CALCULATION:
    var N_avg;
    var Avg_store = 0;
    var baseN = 0.0;
     avgData[k] = [];
    var filter = [0,0,0,0,0,0];
    for (N_avg = 2; N_avg < 301 ; N_avg+=2){
        for (j = 0; j < 6; j++){
	        filter[j] = 0;
            for (i = 0; i < data[k][j].length; i++){
                if ( (data[k][j][i])[0] == N_avg ){
                    Avg_store += parseFloat((data[k][j][i])[1]);
                    baseN++;
                    filter[j] = 1;
                    break
                }
            }
        }

        avg_Value = Avg_store/baseN;
        if (filter[0] || filter[1] || filter[2] || filter[3] || filter[4] || filter[5]){
        avgData[k][avgData[k].length] = [parseFloat(N_avg) , parseFloat(avg_Value)];
        }
        baseN = 0;
        Avg_store = 0;
    }

     for(j = 0; j < 6; j++){
	    for(i = 0; i < data[k][j].length; i++){
	    dataAll[j][i] = [(data[0][j][i])[1], (data[k][j][i])[1] , (data[0][j][i])[0] ];
    }
}
    for(i = 0; i < avgData[k].length; i++){
	    avgDataAll[i] = [(avgData[0][i])[1], (avgData[k][i])[1] , (avgData[0][i])[0] ];
}
    
        var xx = parseInt(dataLoc_Z1-1, 10);

        //Select Unit 4~17,24,25, MeV
        if ( (1< xx && xx<16) || (21 < xx && xx< 24) )
        {
            UnitP[k] = "(MeV)";
        }
        else if ( 15 < xx && xx < 19)
        {
            UnitP[k] = "";
        }
        else if (18< xx && xx <22)
        {
            UnitP[k] = "(fm"+"2".sup()+")";
        }
        else if (23< xx && xx <28)
        {
            UnitP[k] = "(fm)";
        }
    
    var ElemName_Array = Elem.split("");
    if (az < 104 && ElemName_Array.length == 2){
        var ElemName1_Array = ElemName_Array;
        var l_1 = ElemName1_Array[0];
        var l_2 = ElemName1_Array[1].toLowerCase();
        var ElemN = l_1+l_2;
    }
    else ElemN = Elem;

    //document.getElementById('flag2').innerHTML = data[0][2] // +"<br>"+xn1+"<br>"+xz1+"<br>"+an+"<br>"+az; //flag

    //plot dataset 1:UNEDF0, 2:UNEDF1, 3:SKM*, 4:SKP, 5:SLY4, 6:SV_MIN
    //Preferred order: 3, 4, 5, 6, 1, 2.
    /*
    var dataset = [
                   {data: data[2], label: label[2], lines:{show:(L3||L7)}, points:{show:(L3||L7)}, color: '#3399FF'},
                   {data: data[3], label: label[3], lines:{show:(L4||L7)}, points:{show:(L4||L7)}, color: '#AA4643'},
                   {data: data[4], label: label[4], lines:{show:(L5||L7)}, points:{show:(L5||L7)}, color: '#FF3399'},
                   {data: data[5], label: label[5], lines:{show:(L6||L7)}, points:{show:(L6||L7)}, color: '#339966'},
                   {data: data[0], label: label[0], lines:{show:(L1||L7)}, points:{show:(L1||L7)}, color:'#3333FF'},
                   {data: data[1], label: label[1], lines:{show:(L2||L7)}, points:{show:(L2||L7)}, color:'#FF9900'},
                   {data: avgData, label: label[6], lines:{show:L8},points:{show:L8} ,color:'#000000'}
    ];
    */
    //x-Axis Label
    var xLabel;
    if (chainChoice == 'Z'){
        xLabel = 'Neutron Number';
        titleText = data_label[0] + " vs " + data_label[1] + " of " + ElemN + " Isotopes"
    }
    if (chainChoice == 'N'){
        xLabel = 'Proton Number';
        titleText = data_label[0] + " vs " + data_label[1] + " of N=" + an + " Isotones"
    }
    if (chainChoice == 'AN'){
        xLabel = 'Neutron Number';
        titleText = data_label[0] + " vs " + data_label[1] + " of A=" + aa + " Isobars"
    }
    if (chainChoice == 'AZ'){
        xLabel = 'Proton Number';
        titleText = data_label[0] + " vs " + data_label[1] + " of A=" + aa + " Isobars"
    }
    if (chainChoice == 'MassTable'){
	    xLabel = 'Proton Number';
        titleText = data_label[0] + " vs " + data_label[1] + " of Entire Mass Table"
    }
    //document.getElementById('flag2').innerHTML = data[0][2];
    
    
    
    
    
 $(function () {
    $('#singleElement').highcharts({
        credits: false,
        
        chart: {
            type: 'scatter',
            //disable or change zoom type here:
            zoomType:'xy'
        },
        
        title: {
            text: titleText
        },
       
        xAxis: {
            title: {
	            enabled: true,
                text: data_label[0] + ' ' + UnitP[0]
            }
            
        
        },
        yAxis: {
            title: {
                text:  data_label[1] + ' ' + UnitP[1]
                
            }
            
        },

        plotOptions: {
        bubble: {
            /* marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            }, */
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:.6f}' + ' ' + UnitP[0] + ', ' + '{point.y:.6f}' + ' ' + UnitP[1] + ', ' + chainX + '=' + '{point.z}'
            }
        }
    },
        //345612avg
        series: [
        
        {
            name: label[label.indexOf(Model)],
            data: dataAll[label.indexOf(Model)],
            color: 'rgba(51, 153, 255, .5)'
        },
        
        /* {
            name: label[3],
            data: dataAll[3],
            color:'rgba(170, 70, 67, .5)'
        },
        
        {
            name: label[4],
            data: dataAll[4],
            color:'rgba(255, 51, 153, .5)'
        },
        
        {
            name: label[5],
            data: dataAll[5],
            color:'rgba(51, 153, 102, .5)'
        },
        
        {
            name: label[0],
            data: dataAll[0],
            color:'rgba(51, 51, 255, .5)'
        },
        
        {
            name: label[1],
            data: dataAll[1],
            color:'rgba(255, 153, 0, .5)'
        }, */
        
        {
            name: label[6],
            data: avgDataAll,
            color:'rgba(0, 0, 0, .5)'
        }
        
        ]
    });
});

    
    
    
    
    
    

/*                                  CODE BELOW IS FOR FLOT LIBRARY

//plot options
    var options = {
    xaxis:{
    tickDecimals: 0,
    axisLabel: xLabel,
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 18,
    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
    axisLabelPadding: 7
    },
    yaxis:{
    axisLabel: data_label[k]+'  '+UnitP,
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 18,
    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
    axisLabelPadding: 7
    },
    legend:{
    show:!L9,
    position:'nw',
    noColumns:7,
    backgroundColor:null,
    labelBoxBorderColor:null,
    },
    grid: { hoverable: true ,clickable:true},
        series: {
        lines: { show: true },
        points: {
        radius: 2,
        show: true
        }
        }
    };







$(document).ready(function () {
                  $.plot($("#singleElement"),dataset, options);
                  });
    
    // add some hovering logic to each point...
    var previousPoint = null;
    $("#singleElement").bind("plothover", function (event, pos, item) {
                           $("#x").text(pos.x.toFixed(2));
                           $("#y").text(pos.y.toFixed(2));
    
                           if (item) {
                           if (previousPoint != item.datapoint) {
                           previousPoint = item.datapoint;
                           $("#tooltip").remove();
                           var x = item.datapoint[0].toFixed(0), y = item.datapoint[1].toFixed(6);
                           showTooltip(item.pageX, item.pageY, item.series.label+ ": "+ x + ", " + y+ UnitP);
                           }
                           }
                           else {
                           $("#tooltip").remove();
                           previousPoint = null;
                           }
                           
                           });
    
    // show the tooltip
    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css( {
                                                          position: 'absolute',
                                                          display: 'none',
                                                          top: y - 35,
                                                          left: x + 5,
                                                          border: '1px solid #fdd',
                                                          padding: '2px',
                                                          'background-color': '#fee',
                                                          opacity: 0.80
                                                          }).appendTo("body").fadeIn(200);
    }
*/


}
}
