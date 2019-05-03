var Z_SP=0;
var EDF_name = "UNEDF0";
var datatype = "HFB_Energy_LN"
var UnitP = "";
function singlePlotInput(Z_SP, EDF_name, datatype){
    //this "text" can be changed into a list or string to output various element, let's try single input proton number first:
    var  x,y, text;
    var e1 = document.getElementById("Datatype_singleplot");
    var e2 = document.getElementById("EDF_singleplot");
     EDF_label = e2.options[e2.selectedIndex].text;
     data_label = e1.options[e1.selectedIndex].text;
    //Redefine Z value:
    var Z = Z_SP;
    var x = parseFloat(Z,10);
    var z1 = parseInt(Z,10)+1;
    //if z is a integer and between 1~120, x tests if z is integer and even number:
    if ( isNaN(Z) || Z<1 ||Z>120 || !((x|0)===x) || parseInt(Z/2,10) != parseInt(z1/2,10) )
        
        //pick integer Z within 1~120 only:
    {
        text = "Please enter even proton number between 1 ~ 120";
    }
    
    else{
        //Pass data into singlePlot function, will pass plot into id='singleElement'
        singlePlot(Z,EDF_name, datatype);
    }
}


function singlePlot(Z_P, EDF_P, data_P){
    var Elem = "";
    var Elem1 = "";
    var data = []; //create data array, consists of arrays(coordinate).
    var az = parseInt(Z_P,10); // set proton number
    var EDF_db = {UNEDF0:S_UNEDF0, UNEDF1:S_UNEDF1, SKMS:S_SKMS, SKP:S_SKP, SLY4:S_SLY4,SV_MIN:S_SV_MIN};
    var f2 = EDF_db[EDF_P]; // choose EDF string
    var split_f2 = f2.split(" ");// split_f2 is "array"ed, contains whole database of the chosen EDF
    //find index of labels in first element of split_f2.
    var NLoc_0 = split_f2.indexOf("N");
    var ZLoc_0 = split_f2.indexOf("Z");
    var dataLoc_0 = split_f2.indexOf(data_P);
    var dataLoc_Z0 = dataLoc_0 - ZLoc_0; //relative position of data to Z number.
    //find index of the value of N,Z,data in the first line of actual data, i.e HE 2 2
    var NLoc = parseInt(NLoc_0 + 30, 10);
    var ZLoc = parseInt(ZLoc_0 + 30, 10);
    var xn = NLoc;
    var xz = ZLoc;
    
    //convert into Alphabetical names for 104+ elements
    var UuElem_name = {"04":"Rf","06":"Sg","08":"Hs","10":"Ds","12":"Cn","14":"Fl","16":"Lv","18":"Uuo","20":"Ubn"};
    
    var coord = [10,10];
    var Data_V = 0;
    var count = 0;
    for ( i = 0; i<5000 ; i++ ){
        
        if (az == split_f2[xz]){
            Data_V = split_f2[parseInt(dataLoc_Z0+xz,10)];
            //coord.splice(0,2,split_f2[parseInt(xz+1,10)],Data_V);
            data[data.length] = [split_f2[parseInt(xz+1,10)],Data_V];
            var Elem = split_f2[parseInt(xz - 1,10)]; //for UNEDF0.dat element name is right in front of Z
            xz += 30;
            if ( az > 102 )
            {
                var Elem1 = UuElem_name[Elem+""];
                var Elem = Elem1+"";
                
            }


        }
        else{
            count += 1;
            xz +=30;
        }
    }
        var xx = parseInt(dataLoc_Z0-1, 10);

        //Select Unit 4~17,24,25, MeV
        if ( (1< xx && xx<16) || (21 < xx && xx< 24) )
        {
            var UnitP = "(MeV)";
        }
        else if ( 15 < xx && xx < 19)
        {
            UnitP = "";
        }
        else if (18< xx && xx <22)
        {
            UnitP = "(fm^3)";
        }
        else if (23< xx && xx <28)
        {
            UnitP = "(fm)";
        }
    
    var ElemName_Array = Elem.split("");
    if (az < 104 && ElemName_Array.length == 2){
        var ElemName1_Array = ElemName_Array;
        var l_1 = ElemName1_Array[0];
        var l_2 = ElemName1_Array[1].toLowerCase();
        var ElemN = l_1+l_2;
    }
    else ElemN = Elem;


    


    //document.getElementById('flags').innerHTML = data; //flag

    
    //plot dataset
    var dataset = [{label: EDF_label+', '+ElemN,data: data}];
    
    //plot options
    var options = {
    xaxis:{
    tickDecimals: 0,
    axisLabel: 'Neutron Number of ' + ElemN,
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 12,
    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
    axisLabelPadding: 7
    },
    yaxis:{
    axisLabel: data_label+'  '+UnitP,
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 12,
    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
    axisLabelPadding: 7
    },
    grid: { hoverable: true ,clickable:true},
        series: {
        lines: { show: true },
        points: {
        radius: 3,
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
                           showTooltip(item.pageX, item.pageY, x + " , " + y+ UnitP);
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
    


    


}