
function SeparE(V_s2p0, V_s2n0, UNEDF0on2, UNEDF1on2, SKMSon2, SKPon2, SLY4on2, SV_MINon2, ALLon2){
    var V_s2p = V_s2p0;//default 0
    var V_s2n = V_s2n0;//default 0
    var M1 = UNEDF0on2 || 0, M2 = UNEDF1on2 || 0, M3 = SKMSon2 || 0, M4 = SKPon2 || 0, M5 = SLY4on2 || 0, M6 = SV_MINon2 || 0, M7 = ALLon2 || 0;
    var bz = 2, bn = 2;
    var thisElem = '2N2', leftElem = '2N2', rightElem = '2N2', topElem = '2N2', botElem = '2N2';
    var dataS1_2P = [], dataS1_2N = [], dataS2_2P = [], dataS2_2N = [], dataS3_2P = [], dataS3_2N = [], dataS4_2P = [], dataS4_2N = [], dataS5_2P = [], dataS5_2N = [], dataS6_2P = [], dataS6_2N = [];
    var tempN = 0;
    var label1 = '', label2 = '', label3 = '', label4 = '', label5 = '', label6 = '';
    //UNEDF0
    if ( M1 || M7 ){
        label1 = 'UNEDF0';
        for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                //S2N horizontal
                if ( (parseFloat(SPE_2N.UNEDF0[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.UNEDF0[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn+2;
                    dataS1_2N[dataS1_2N.length] = [tempN,bz];
                    break
                }
                //S2P vertical
                if ( (parseFloat(SPE_2P.UNEDF0[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.UNEDF0[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz+2;
                    dataS1_2P[dataS1_2P.length] = [bn,tempN];
                
                }
            }
        }
    }
    
    //UNEDF1
    if ( M2 || M7 ){
        label2 = 'UNEDF1';
        for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                //S2N horizontal
                if ( (parseFloat(SPE_2N.UNEDF1[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.UNEDF1[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn+2;
                    dataS2_2N[dataS2_2N.length] = [tempN,bz];
                    break
                }
                //S2P vertical
                if ( (parseFloat(SPE_2P.UNEDF1[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.UNEDF1[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz+2;
                    dataS2_2P[dataS2_2P.length] = [bn,tempN];
                }
            }
        }
    }
    
    //SKMS
    if ( M3 || M7 ){
        label3 = 'SKM'+'*'.sup();

        for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                //S2N horizontal
                if ( (parseFloat(SPE_2N.SKMS[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.SKMS[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn+2;
                    dataS3_2N[dataS3_2N.length] = [tempN,bz];
                    break
                }
                //S2P vertical
                if ( (parseFloat(SPE_2P.SKMS[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.SKMS[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz+2;
                    dataS3_2P[dataS3_2P.length] = [bn,tempN];
                }
            }
        }
    }
    
    //SKP
    if ( M4 || M7 ){
        label4 = 'SKP';

        for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
               
                //S2N horizontal
                if ( (parseFloat(SPE_2N.SKP[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.SKP[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn+2;
                    dataS4_2N[dataS4_2N.length] = [tempN,bz];
                    break
                }
                //S2P vertical
                if ( (parseFloat(SPE_2P.SKP[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.SKP[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz+2;
                    dataS4_2P[dataS4_2P.length] = [bn,tempN];
                }
            }
        }
    }

    //SLY4
    if ( M5 || M7 ){
        label5 = 'SLY4';

        for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();

                //S2N horizontal
                if ( (parseFloat(SPE_2N.SLY4[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.SLY4[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn+2;
                    dataS5_2N[dataS5_2N.length] = [tempN,bz];
                    break
                }
                //S2P vertical
                if ( (parseFloat(SPE_2P.SLY4[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.SLY4[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz+2;
                    dataS5_2P[dataS5_2P.length] = [bn,tempN];
                }
            }
        }
    }
    
    //SV_MIN
    if ( M6 || M7 ){
        label6 = 'SV-MIN';

        for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();

                //S2N horizontal
                if ( (parseFloat(SPE_2N.SV_MIN[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.SV_MIN[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn+2;
                    dataS6_2N[dataS6_2N.length] = [tempN,bz];
                    break
                }
                //S2P vertical
                if ( (parseFloat(SPE_2P.SV_MIN[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.SV_MIN[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz+2;
                    dataS6_2P[dataS6_2P.length] = [bn,tempN];
                }
            }
        }
    }

    
    //plot dataset
    var dataset = [
                   {data: dataS1_2N, label: label1, lines:{show:(M1||M7)}, points:{show:(M1||M7)}, color: '#3399FF'},
                   {data: dataS1_2P, label: false, lines:{show:(M1||M7)}, points:{show:(M1||M7)}, color: '#3399FF'},
                  
                   {data: dataS2_2N, label: label2, lines:{show:(M2||M7)}, points:{show:(M2||M7)}, color: '#AA4643'},
                   {data: dataS2_2P, label: false, lines:{show:(M2||M7)}, points:{show:(M2||M7)}, color: '#AA4643'},
                   
                   {data: dataS3_2N, label: label3, lines:{show:(M3||M7)}, points:{show:(M3||M7)}, color: '#FF3399'},
                   {data: dataS3_2P, label: false, lines:{show:(M3||M7)}, points:{show:(M3||M7)}, color: '#FF3399'},
                   
                   {data: dataS4_2N, label: label4, lines:{show:(M4||M7)}, points:{show:(M4||M7)}, color: '#339966'},
                   {data: dataS4_2P, label: false, lines:{show:(M4||M7)}, points:{show:(M4||M7)}, color: '#339966'},

                   {data: dataS5_2N, label: label5, lines:{show:(M5||M7)}, points:{show:(M5||M7)}, color:'#3333FF'},
                   {data: dataS5_2P, label: false, lines:{show:(M5||M7)}, points:{show:(M5||M7)}, color:'#3333FF'},
                   
                   {data: dataS6_2N, label: label6, lines:{show:(M6||M7)}, points:{show:(M6||M7)}, color:'#FF9900'},
                   {data: dataS6_2P, label: false, lines:{show:(M6||M7)}, points:{show:(M6||M7)}, color:'#FF9900'}
                   ];

    //plot options
    var options = {
    xaxis:{
    tickDecimals: 0,
    ticks:[20,28,50,82,126,184,258],
    min:0,
    max:300,
    axisLabel: 'Neutron number, N',
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 18,
    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
    axisLabelPadding: 7
    },
    yaxis:{
    min:0,
    max:120,
    ticks:[20,28,50,82,114],
    tickDecimals: 0,
    axisLabel: 'Proton number, Z',
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 18,
    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
    axisLabelPadding: 7
    },
    legend:{
    show:true,
    position:'se',
    noColumns:7,
    backgroundColor:null,
    labelBoxBorderColor:null,
    },
    grid: { hoverable: true ,clickable:false},
    series: {
    lines: { show: true },
    points: {
    radius: 0.3,//change size of points
    show: true
    }
    }
    };
    
    
    $(document).ready(function () {
                      $.plot($("#separEnergy"),dataset, options);
                      });
    
    //document.getElementById('flags').innerHTML = "ducks";
    // add some hovering logic to each point...
    var previousPoint = null;
    $("#separEnergy").bind("plothover", function (event, pos, item) {
                             $("#x").text(pos.x.toFixed(0));
                             $("#y").text(pos.y.toFixed(0));
                             
                             if (item) {
                             if (previousPoint != item.datapoint) {
                             previousPoint = item.datapoint;
                             $("#tooltip").remove();
                             var x = item.datapoint[0].toFixed(0), y = item.datapoint[1].toFixed(0);
                             showTooltip(item.pageX, item.pageY, "Z="+ y + ", N=" + x);
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