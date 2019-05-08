var zRange1, zRange2, nRange1, nRange2, mRange1, mRange2, dataSelect;
var EDF_name = "UNEDF0";
var datatype1 = "";
var datatype2 = "";
var avgData = [];
var UnitP = [];
var MassNum;
var data_label0 = [];
var gapZ = 2;
var gapN = 2;
var iIter = 9000;
//FILTER FUNCTION, PLUS CHECKBOX SELECTION OF WHAT DATA TO PLOT.
function PlotInputCor(dataSelect,bubSize, model0, zRange1, zRange2, nRange1, nRange2, mRange1, mRange2, datatype01, datatype02){
    var zTest = 0, mTest = 0, nTest = 0;
    
    var model = model0 || EDF_name;
    var datatype1 = datatype01 || "Binding_Energy_(MeV)";
    var datatype2 = datatype02 || "Binding_Energy_(MeV)";
    //this "text" can be changed into a list or string to output various element, let's try single input proton number first:
    var x, y, text;
    text = '';
    
    var e1 = document.getElementById("Datatype_singleplot1");
    var e2 = document.getElementById("Datatype_singleplot2");
    //the e1.options[e1.selectedIndex].text guarantees the name of observable printed everywhere is the same as the drop down menu, instead of what's in the .dat file, which are less readable
    if (e1.options[e1.selectedIndex].text == "Select Observable") {
        data_label0[0] = "Binding Energy";
    }
    else {
        data_label0[0] = e1.options[e1.selectedIndex].text;
    }
    if (e2.options[e2.selectedIndex].text == "Select Observable") {
        data_label0[1] = "Binding Energy";
    }
    else {
        data_label0[1] = e2.options[e2.selectedIndex].text;
    }
    
    //Redefine Z value:
    var N = 0;
    var Z = 0;
    var A = 0;
    var tag = 0;
    z1 = parseInt(zRange1,10) || 2;
    z2 = parseInt(zRange2,10) || 120;
    n1 = parseInt(nRange1,10) || 2;
    n2 = parseInt(nRange2,10) || 300;
    m1 = parseInt(mRange1,10) || 4;
    m2 = parseInt(mRange2,10) || 420;
    //mass number input filter
    var mxa = parseFloat(m1,10);
    var ma1 = parseInt(m1,10)+1;
    var mxas = parseFloat(m2,10);
    var ma1s = parseInt(m2,10)+1;
    if ( isNaN(m1) || m1<4 ||m1>420 || !((mxa|0)===mxa) ){
        //pick A within 4~420, if need even input only, use "parseInt(m1/2,10) != parseInt(ma1/2,10)" :
        document.getElementById('plotErr').innerHTML = "Please enter a mass number between 4 and 420";
    }
    else if ( isNaN(m2) || m2<4 ||m2>420 || !((mxas|0)===mxas) ){
        //pick A within 4~420, if need even input only, use "parseInt(m2/2,10) != parseInt(ma1s/2,10)" :
        document.getElementById('plotErr').innerHTML = "Please enter a mass number between 4 and 420";
    }
    else if (m1 > m2){
        document.getElementById('plotErr').innerHTML = "Initial mass number greater than final";
    }
    else  {
        mTest = 1;
    }
    
    //neutron number input filter
    var nxa = parseFloat(n1,10);
    var na1 = parseInt(n1,10)+1;
    var nxas = parseFloat(n2,10);
    var na1s = parseInt(n2,10)+1;
    if ( isNaN(n1) || n1<2 ||n1>300 || !((nxa|0)===nxa) ){
        //pick N within 2~300, if need even input only, include "parseInt(n1/2,10) != parseInt(na1/2,10)":
        document.getElementById('plotErr').innerHTML = "Please enter a neutron number between 2 and 300";
    }
    else if ( isNaN(n2) || n2<2 ||n2>300 || !((nxas|0)===nxas) ){
        //pick N within 2~300, if need even input only, include "parseInt(n2/2,10) != parseInt(na1s/2,10)":
        document.getElementById('plotErr').innerHTML = "Please enter a neutron number between 2 and 300";
    }
    else if (n1 > n2){
        document.getElementById('plotErr').innerHTML = "Initial neutron number greater than final";
    }
    else  {
        nTest = 1;
    }


    //proton number input filter
    var zxa = parseFloat(z1,10);
    var za1 = parseInt(z1,10)+1;
    var zxas = parseFloat(z2,10);
    var za1s = parseInt(z2,10)+1;
    if ( isNaN(z1) || z1<2 ||z1>120 || !((zxa|0)===zxa) ){
        //pick Z within 2~120, if need even input only, use "parseInt(z1/2,10) != parseInt(za1/2,10)":
        document.getElementById('plotErr').innerHTML = "Please enter a proton number between 2 and 120";
    }
    else if ( isNaN(z2) || z2<2 || z2>120 || !((zxas|0)===zxas) ){
        //pick Z within 2~120, if need even input only, use "parseInt(z2/2,10) != parseInt(za1s/2,10)":
        document.getElementById('plotErr').innerHTML = "Please enter a proton number between 2 and 120";
    }
    else if (z1 > z2){
        document.getElementById('plotErr').innerHTML = "Initial proton number greater than final";
    }
    else  {
        zTest = 1;
    }

    
    if (zTest == 1 && mTest == 1 && nTest == 1){
        document.getElementById('plotErr').innerHTML = '';
        PlotCor(dataSelect,bubSize, model, z1, z2, n1, n2, m1, m2, datatype1, datatype2);
    }
    
}

//Plot Function for Isotope/Isotone/Isobar
function PlotCor(dataSelect,bubSize, Model, Z_P1, Z_P2, N_P1, N_P2, M_P1, M_P2, data_P1, data_P2){
var data_P = [data_P1, data_P2];
var dataAll = [[],[],[],[],[],[]];
var avgDataAll = [];
var data = [[[], [], [], [], [], []], [[], [], [], [], [], []]]; //create data array, consists of arrays(coordinate).
if (dataSelect){
    var EDF_db = {UNEDF0:S_UNEDF0, UNEDF1:S_UNEDF1, SKMS:S_SKMS, SKP:S_SKP, SLY4:S_SLY4,SV_MIN:S_SV_MIN};
    numOfCol = 10;
    gapZ = 1;
    gapN = 1;
    iIter = 9000;
}
else {
    var EDF_db = {UNEDF0:SA_UNEDF0, UNEDF1:SA_UNEDF1, SKMS:SA_SKMS, SKP:SA_SKP, SLY4:SA_SLY4,SV_MIN:SA_SV_MIN};
    numOfCol = 25;
    gapZ = 2;
    gapN = 2;
    iIter = 3000;
}
//document.getElementById('demo1').innerHTML = data_P1+","+data_P2;
for (k = 0; k < 2; k++){
    var Elem = "";
    var Elem1 = "";
    //set range for mass number
    var mMin = parseInt(M_P1,10);
    var mMax = parseInt(M_P2,10);
    var zMin = parseInt(Z_P1,10);
    var zMax = parseInt(Z_P2,10);
    var nMin = parseInt(N_P1,10);
    var nMax = parseInt(N_P2,10);
    
    
    //convert into Alphabetical names for 104+ elements
    //convert numbers in LBL column of each database to elements because after 104 it does not contain labels
    var UuElem_name = {"19":"Uue","20":"Ubn"};
    
    var Data_V = 0;
    //var count = 0;
    //label for legends
    var label = ["UNEDF0","UNEDF1","SKMS","SKP","SLY4","SV_MIN","Average"];
    // load data for line plot
    for(j = 0; j < 6; j++) {
        var split_f1 = EDF_db[label[j]]; // split_f1 is "array"ed, contains entire database of chosen EDF
        //find index of labels in first element of split_f2.
        var NLoc_1 = split_f1.indexOf("N");
        var ZLoc_1 = split_f1.indexOf("Z");
        var ALoc_1 = split_f1.indexOf("A");
        var dataLoc_1 = split_f1.indexOf(data_P[k]);
        var dataLoc_Z1 = dataLoc_1 - ZLoc_1; //relative position of data to Z number.
        var dataLoc_N1 = dataLoc_Z1 - 1;
        var dataLoc_A1 = dataLoc_Z1 - 2;
        //find index of the value of N,Z,data in the first line of actual data, i.e HE 2 2
        var NLoc1 = parseInt(NLoc_1 + numOfCol, 10);
        var ZLoc1 = parseInt(ZLoc_1 + numOfCol, 10);
        var ALoc1 = parseInt(ALoc_1 + numOfCol, 10);
        var xn1 = NLoc1;
        var xz1 = ZLoc1;
        var xa1 = ALoc1;
        var zR = false, nR = false, mR = false;
        //Construction data for selected nuclei
        for ( i = 0; i < iIter ; i++ ){
          zR = split_f1[xa1-2] >= zMin && split_f1[xa1-2] <= zMax;
          nR = split_f1[xa1-1] >= nMin && split_f1[xa1-1] <= nMax;
          mR = split_f1[xa1] >= mMin && split_f1[xa1] <= mMax;
            if (zR && nR && mR){
                var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                //document.getElementById('flag3').innerHTML = Data_V1;
                //data array content: [N, data, Z]
                data[k][j][data[k][j].length] = [parseInt(split_f1[parseInt(xa1-1,10)]),parseFloat(Data_V1), parseInt(split_f1[parseInt(xa1-2,10)])];
                var Elem = split_f1[parseInt(xa1 - 3,10)]; //for UNEDF0.dat element name is right in front of Z
                xa1 += numOfCol;
            }
            else{
                //count += 1;
                xa1 += numOfCol;
            }
        }
    }
    

    //AVERAGE DATA CALCULATION:
    var N_avg;
    var Z_avg;
    var Avg_store = 0;
    var baseN = 0.0;
     avgData[k] = [];
    var filter = [0,0,0,0,0,0];
    var check = 0;
    for(Z_avg = 2; Z_avg < 121; Z_avg+= gapZ){
      for (N_avg = 2; N_avg < 301 ; N_avg+= gapN){
	    check = 0;
        for (j = 0; j < 6; j++){
	        filter[j] = 0;
            for (i = 0; i < data[k][j].length; i++){
                if ( (data[k][j][i])[0] == N_avg && (data[k][j][i])[2] == Z_avg){
                    Avg_store += parseFloat((data[k][j][i])[1]);
                    baseN++;
                    filter[j] = 1;
                    check = 1;
                    break
                 }
            }
        }
        avg_Value = Avg_store/baseN;
        var NZholder0 = 0.0;
        var NZholder1 = 0.0;
        if (check == 1){
        avgData[k][avgData[k].length] = [parseFloat(N_avg), parseFloat(Z_avg) , parseFloat(avg_Value)];
        }
        baseN = 0;
        Avg_store = 0;
      }
    }
    
     for(j = 0; j < 6; j++){
	    for(i = 0; i < data[k][j].length; i++){
        //In highcharts, a data point can only hold 3 values, thus neutron and proton numbers are stored together in the z value of the point, the integer part of z is the neutron number, the decimal part of z is the proton number, below process is to construct the value of z.
        NZholder0 = ((data[0][j][i])[0]+(data[0][j][i])[2]/1000); //data[][][][0] is neutron #, [2] is proton
	    dataAll[j][i] = [(data[0][j][i])[1], (data[k][j][i])[1] , NZholder0 ];
        }
    }
    //document.getElementById('flag3').innerHTML = "z:"+zMin+"~"+zMax+"; n:"+nMin+"~"+nMax + "; m:"+mMin+"~"+mMax +"<br\>"+ dataAll[0].length;
    for(i = 0; i < avgData[k].length; i++){
        NZholder1 = ((avgData[0][i])[0]+(avgData[0][i])[1]/1000);
	    avgDataAll[i] = [(avgData[0][i])[2], (avgData[k][i])[2] , NZholder1 ];
    }
    }
    /* In new data template, units are included with variable names.
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
    else
    {
        UnitP[k] = "(MeV)"
    }
    */
    var leSign = '\u2A7D'; //unicode of less-than or slanted equal to in javascript, non-slanted: "\u2264"
    var titleText = data_label0[0] + " vs " + data_label0[1];
    var subtitleText = zMin+leSign+"Z"+leSign+zMax+", "+nMin+leSign+"N"+leSign+nMax+", "+mMin+leSign+"Mass"+leSign+mMax

    
 $(function () {
    $('#correlationPlot').highcharts({
        credits: false,
        
        chart: {
            type: 'bubble',
            //disable or change zoom type here:
            zoomType:'xy'
        },
        
        title: {
            text: titleText
        },
        subtitle: {
            style: {
                color: '#FF00FF',
                fontSize: '16px'
            },
            text: subtitleText
        },
       
        xAxis: {
            crosshair: true,
            title: {
	            enabled: true,
                text: data_label0[0]// + ' ' + UnitP[0]
            }
            
        
        },
        yAxis: {
            crosshair: true,
            title: {
                text:  data_label0[1]// + ' ' + UnitP[1]
                
            }
            
        },
        plotOptions: {
    
        bubble: {
             minSize: bubSize,
             maxSize: bubSize
    }
    },
        tooltip: {
        
        formatter: function () {
        //In highcharts, a data point can only hold 3 values, thus neutron and proton numbers are stored together in the z value of the point, the integer part of z is the neutron number, the decimal part of z is the proton number, below process is to reconstruct these 2 numbers
            var nzVal = this.point.z;
            var nVal = Math.floor(nzVal);
            var zVal = ((nzVal-nVal)*1000).toFixed(0);
            var xData = (this.point.x).toFixed(6);
            var yData = (this.point.y).toFixed(6);
            var sName = this.series.name;
            return '<b>' + sName + ' for ' + 'N = ' + nVal + ', Z = ' + zVal + '</b><br>' + data_label0[0] + ': ' +xData + ' ' + '<br\>' + data_label0[1] + ': ' + yData
        },
        
        /*
        positioner: function (labelWidth, labelHeight, point) {
        var tooltipX, tooltipY;
        tooltipX = point.plotX - 130;
        tooltipY = point.plotY - 30;
        return {
        x: tooltipX,
        y: tooltipY
        };
        },
        */
        //In correlation plot, data points are dense, followPointer option allows tooltip box to follow mouse, so that the box won't hover above data points and make them un-clickable
        followPointer: true
        //borderWidth: 0,
        //shadow: false,
        //backgroundColor: 'rgba(255,255,255,0.8)'
    },
        //345612avg
        series: [
        
        {
            name: label[label.indexOf(Model)],
            data: dataAll[label.indexOf(Model)],
            color: 'rgba(0, 51, 204, .5)',
            
            marker: {
            symbol: 'circle'
            }
            
        },
        
        {
            name: label[6],
            data: avgDataAll,
            color:'rgba(0, 0, 0, .5)',
            
            marker: {
            symbol: 'diamond'
            }
            
        }
        
        ]
    });
});
}

