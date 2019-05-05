			google.load("visualization", "1");
			google.setOnLoadCallback(setUp);
            var yaw=0.5,pitch=0.5, width=500, height=500, drag=false;
/**********
Changes to axes positioning, where the 3D graph is centered, the magic numbers(ticks and grid lines), are located in file Surfaceplotbeta.js, under folder /library/3D

Color legend involves a more tricky, empherical issue, feel free to contact cao@nscl.msu.edu if you have questions.

**********/
            /* Proton Magic: 2, //8, 20, 28, 50, 82, //122, 124, 164
             * Neutron Magic:2, //8, 20, 28, 50, 82, 126, 184, 196, 236, //318
             
             *var zM = [8, 20, 28, 50, 82];
             *var nM = [8, 20, 28, 50, 82, 126, 184, 196, 236];
             */
        
        
			
            function setUp(input3DEDF){
                
                // Define a colour gradient.
                var cWhite = {red:255, green:255, blue:255};
                var cBlack = {red:0, green:0, blue:0};
                var cRed0 = {red:255, green:0, blue:0};
                var cBlue0 = {red:0, green:0, blue:255};
                var cRed1 = {red:255, green:25, blue:25};
                var cRed2 = {red:255, green:51, blue:51};
                var cRed3 = {red:255, green:76, blue:76};
                var cRed4 = {red:255, green:102, blue:102};
                var cRed5 = {red:255, green:127, blue:127};
                var cRed6 = {red:255, green:153, blue:153};
                var cRed7 = {red:255, green:178, blue:178};
                var cRed8 = {red:255, green:204, blue:204};
                var cBlue1 = {red:25, green:25, blue:255};
                var cBlue2 = {red:51, green:51, blue:255};
                var cBlue3 = {red:76, green:76, blue:255};
                var cBlue4 = {red:102, green:102, blue:255};
                var cBlue5 = {red:127, green:127, blue:255};
                var cBlue6 = {red:153, green:153, blue:255};
                var cBlue7 = {red:178, green:178, blue:255};
                var cBlue8 = {red:204, green:204, blue:255};
                var cYellow = {red:155, green:135, blue:0};
                var cOrange = {red:255,green:165,blue:0};
                var cRRed0 = {red:230,green:0,blue:0};
                var cRRed1 = {red:207,green:0,blue:0};
                var cRRed2 = {red:186,green:0,blue:0};
                var cRRed3 = {red:167,green:0,blue:0};
                
                
                var colours = [cBlack,cBlue1,cBlue5,cWhite,cRed5,cRed1];
                //var colours = [cBlack,cBlue4,cWhite,cRed0,cRed0,cRed0,cRed0,cRed0,cRed0];
                //var colours = [cBlack,cBlue0,cWhite,cRed0];
                var colorLb = [];
                var coloursLen = colours.length;
                
                
                var dataTag = "Quad_Def_Beta2_total"; //"Quad_Moment_Q2_total" , "LN_Energy_P" , "Quad_Def_Beta2_total"
                var mag = 1.0;//0.3 for beta2
                var edfTag = input3DEDF;
                
                
                var Nmax = 151;//151 for no extra colomns
                var Zmax = 61;// 61 for no extra rows, 62 to block hollow cross section on edges
				var numRows = Nmax;
				var numCols = Zmax;
				
				var tooltipStrings = new Array();
				var data = new google.visualization.DataTable();
				
				for (var i = 0; i < numCols; i+=1){
		        	data.addColumn('number', 'col'+i);
				}
				
		        data.addRows(numRows);
                var EDF_db = {UNEDF0:SA_UNEDF0, UNEDF1:SA_UNEDF1, SKMS:SA_SKMS, SKP:SA_SKP, SLY4:SA_SLY4,SV_MIN:SA_SV_MIN};
                //choose f1, search function same as sort_v1.0, just changed which EDF data string to use.
                var f1 = EDF_db[edfTag];
                
                //create a huge array, each element is a word or data (float number).
                var split_f1 = f1.split(" ");
                
                //find index of labels in first element of split_f1.
                var NLoc_0 = split_f1.indexOf("N");
                var ZLoc_0 = split_f1.indexOf("Z");
                
                var dataLoc_0 = split_f1.indexOf(dataTag);//"LN_Energy_P");//
                var dataLoc_N0 = dataLoc_0 - NLoc_0; //relative position of data to N number.
                //find index of the value of N,Z,data in the first line of actual data, i.e HE 2 2
                var NLoc = parseInt(NLoc_0 + 30, 10);
                var ZLoc = parseInt(ZLoc_0 + 30, 10);
                var len_1 = split_f1.length;
                var N1=0;
                var Z1=0;
                var xn1 = 32;
                var xz1 = 31;
                
                var valueMax = Number.MIN_VALUE;
                var valueMin = Number.MAX_VALUE;
                var value = 0;
                var idx = 0;
                var Znext = 0;
                var Nnext = 0;
                var Nshort = 0;
                
                
                
                //find Median to make ground color as white
                for (var j=0; Z1<121;j+=1){//Z<120 is okay with Zmax = 61
                    value = 0;
                    N1 = parseInt(split_f1[xn1]);
                    Z1 = parseInt(split_f1[xz1]);
                    if (N1 == undefined || Z1 == undefined){
                        value = 0;
                    }
                    
                    value = (split_f1[xn1+dataLoc_N0]*mag);
                    
                    if (valueMax < value)
                    valueMax = value/mag;
                    if (valueMin > value)
                    valueMin = value/mag;
                    
                    
                    if (Z1<121 && N1<301){
                        xn1 += 30;
                        xz1 += 30;
                    }
                    else{
                        xn1 = 32;
                        xz1 = 31;
                    break
                    }
                }
                
                Z1 = 0;
                N1 = 0;
                for (ic = 0 ; ic<5 ; ic++) {
                    colorLb[colorLb.length] = 0.2*(ic-1);//(valueMin + ic* ((valueMax-valueMin+0.001) / 6))/mag ;//
                }
                //colorLb[2] = 0;//for white, i.e zero values
    /*            //Add magic number "gridlines" by filling the "black" null data into some small value so it appears grayish.
                //Neutron magic
                for (var k = 0; k<nM.length; k += 1){
                    for (var lk = 2; lk<121; lk += 2){
                        data.setValue( lk/2, nM[k]/2, -valueMin*0.5);
                    }
                }
                //Proton magic
                for (var m = 0; m<zM.length; m += 1){
                    for (var lm = 2; lm<301; lm += 2){
                        data.setValue( zM[m]/2, lm/2, -valueMin*0.5);
                    }
                }

*/
                for (;idx<9425;idx++){
                    tooltipStrings[idx] = "";
                }
                //Map actual data to points.
                for (var i=0; N1<301;i+=1){//Z<120 is okay with Zmax = 61
                    value = 0;
                    N1 = parseInt(split_f1[xn1]);
                    Z1 = parseInt(split_f1[xz1]);
                    value = (split_f1[xn1+dataLoc_N0])*mag;
                    
                    if (valueMax < value)
                    valueMax = value;
                    
                    if (valueMin > value)
                    valueMin = value;
                    
                    if (Z1<121 && N1<301){
                    xn1 += 30;
                    xz1 += 30;
                    }
                    else{
                        xn1 = 32;
                        xz1 = 31;
                        break
                    }
                    
                   
                   
                        data.setValue(N1/2, Z1/2, value-valueMin+0.2);//-valueMin
/*
                        Znext = parseInt(split_f1[xz1]);
                        Nnext = parseInt(split_f1[xn1]);
                        Zshort = (Znext-2)/2;
  */
                    idx = 0.5*(Z1-2)+(Zmax/2)*(N1-2);
                    tooltipStrings[idx] = "Z:" + Z1 + ", N:" + N1 + "<br>" + dataTag + ":"+'<br>' + (value/mag).toFixed(6);
                        
                    
         /*               if(Nnext == N1 || isNaN(Nnext)){
                            tooltipStrings[idx] = "Z:" + Z1 + ", N:" + N1 + "<br>" + dataTag + ":"+'<br>' + (value/mag).toFixed(6) +"<br>"+ idx;
                            idx++;
                        
                        }
                        else{
                            tooltipStrings[idx] = "Z:" + Z1 + ", N:" + N1 + "<br>" + dataTag + ":" +'<br>'+ (value/mag).toFixed(6) +"<br>"+idx;
                            idx++;
                            for (;idx<(N1*Zmax*0.5+Zshort);){
                                tooltipStrings[idx] = idx;
                                idx++;
                            }
                        }
                }
                for (;idx<9425;idx++){
                    tooltipStrings[idx] = "";
                }
           */
                }
                //document.getElementById("surfacePlotDiv").innerHTML = '';
				var surfacePlot = new greg.ross.visualisation.SurfacePlot(document.getElementById("surfacePlotDiv"));
                document.getElementById("surfacePlotDiv").innerHTML = '';
				var surfacePlot2 = new greg.ross.visualisation.SurfacePlot(document.getElementById("surfacePlotDiv2"));
				
				// Don't fill polygons in IE. It's too slow.
				var fillPly = true;
				
				
				
				// Axis labels.
				var xAxisHeader	= "Neutron";
				var yAxisHeader	= "Proton";
                var zAxisHeader	= ''; // Z AXIS LABEL
                if ( edfTag == "SKMS"){
                    zAxisHeader	= 'SKM*';
                }
                else {
                    zAxisHeader	= edfTag;
                }
				
                var options = {xPos: -200, yPos: -350 , width: 750, height: 500, colourGradient: colours,
                    fillPolygons: true,
                    tooltips: tooltipStrings, xTitle: xAxisHeader, yTitle: yAxisHeader, zTitle: zAxisHeader, restrictXRotation: true,restrictYRotation: true,restrictZRotation: true,rawMin:valueMin,rawMax:valueMax};
				
                surfacePlot.draw(data, options);
                
				//surfacePlot2.draw(data, options);
                ///////////////////End of surface plot, drawing color legend ////////////////////
                
                
                
                // Define the range of values from min to max in which all your inputs lie.
                var zeroPoint = Math.abs(valueMin/(valueMax-valueMin));
                var minValue = -247.95*zeroPoint-12.273;//minValue tells where to draw the white line. the equation came from a linear plot after manually inputting the most apropriate number of minValue and corralating with zeroPoints of 6 different datasets.
                var maxValue = 280;//maxValue should be >=280 or else black gradient shows
                
                //document.getElementById('flag1').innerHTML = minValue+'<br>'+zeroPoint+'<br> flag1';
                // Instantiate the object to calculate colour based upon an observation.
                var colourGradientObject = new greg.ross.visualisation.ColourGradient(minValue, maxValue, colours);
                
                // Get a reference to the canvas for displaying the legend.
                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                var legendWidth = 40
                ctx.clearRect(0,0,legendWidth+40+600,c.height);
                // Fill the legend with all possible colours from the gradient/ramp.
                for (var i = 0; i < (c.height-19); i++) {
                    
                    var rgbColour = colourGradientObject.getColour(i);
                    
                    var colr = "rgb(" + rgbColour.red + "," + rgbColour.green + "," + rgbColour.blue + ")";
                    ctx.fillStyle = colr;
                    
                    ctx.fillRect(600,i,legendWidth,1);
                    
                }
                
                // Render the legend text
                ctx.fillStyle = "#000";
                var numLabels = colorLb.length;
                var interval = c.height/numLabels
                var zeroLabel = {UNEDF0:21,UNEDF1:23,SKMS:29,SKP:16,SLY4:27,SV_MIN:18};//TO MAKE WHITE COLOR CORRESPOND TO LABEL 0
                //var adj = {UNEDF0:1.05,UNEDF1:1,SKMS:1,SKP:0.98,SLY4:1,SV_MIN:1};//scaling
                var dif = valueMax - valueMin;
                for (var i = 0; i < numLabels; i++) {
                    //Actual data value should be stored into an array, then run i thru i<data.length
                    ctx.fillText((colorLb[i]).toFixed(2), legendWidth+605, i*0.865*interval/dif+parseFloat(zeroLabel[edfTag]));//parseFloat(zeroLabel[edfTag])
                }
                
                // Draw a border around the colour ramp.
                
                ctx.rect(0.5+600,0,legendWidth,c.height-19);
                ctx.strokeStyle = 'black';
                ctx.stroke();
                
            }
