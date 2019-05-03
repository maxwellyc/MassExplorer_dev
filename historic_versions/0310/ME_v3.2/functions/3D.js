google.load("visualization", "1");
google.setOnLoadCallback(Plot3D);

var Nmin = 2;
var Nmax = 10;
var Zmin = 2;
var Zmax = 10;

function Plot3D(){

    var numRows = parseInt(Nmax);
    var numCols = parseInt(Zmax);
				
    var tooltipStrings = new Array();
    var data = new google.visualization.DataTable();
				
    for (var i = 0; i < numCols; i+=1){
        data.addColumn('number', 'col'+i);
    }
				
    data.addRows(numRows);
    var d = 360 / numRows;
    var idx = 0;
				
    for (var i = Zmin-2;  i < numRows-Nmin; i+=1){
        for (var j = Nmin-2; j < numCols-Zmin; j+=1){
            //var value = (Math.cos(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0) + Math.sin(i * d * Math.PI / 180.0));
            var value = (Math.cos(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0));
            //var value = (Math.sin(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0)) * 1.5;
						
            data.setValue(i, j, value / 4.0);
						
            tooltipStrings[idx] = "Z:" + i + ", N:" + j + ", datatype " + value;
            idx++;
        }
    }

    var surfacePlot = new greg.ross.visualisation.SurfacePlot(document.getElementById("surfacePlotDiv"));
    var surfacePlot2 = new greg.ross.visualisation.SurfacePlot(document.getElementById("surfacePlotDiv2"));
				
    // Don't fill polygons in IE. It's too slow.
    var fillPly = true;
				
    // Define a colour gradient.
    var colour1 = {red:0, green:0, blue:255};
    var colour2 = {red:0, green:255, blue:255};
    var colour3 = {red:255, green:0, blue:0};
    var colour4 = {red:255, green:0, blue:255};
    var colour5 = {red:255, green:255, blue:0};
    var colours = [colour1, colour2, colour3, colour4, colour5];
				
    // Axis labels.
    var xAxisHeader	= "Proton";
    var yAxisHeader	= "Neutron";
    var zAxisHeader	= "Data";
				
    var options = {xPos: 300, yPos: 0, width: 1000, height: 1000, colourGradient: colours, fillPolygons: fillPly,
        tooltips: tooltipStrings, xTitle: xAxisHeader, yTitle: yAxisHeader, zTitle: zAxisHeader, restrictXRotation: false
        };
    surfacePlot.draw(data, options);
    //surfacePlot2.draw(data, options);
}