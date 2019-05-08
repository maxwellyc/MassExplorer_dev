
function SeparE(V_s2p0, V_s2n0){
    var V_s2p = V_s2p0;//or default 0?
    var V_s2n = V_s2n0;//or default 0?
    var bz = 2, bn = 2;
    var thisElem = '2N2', leftElem = '2N2', rightElem = '2N2', topElem = '2N2', botElem = '2N2';
    //Separation Energy Arrays
    var dataS1_2P = [], dataS1_2N = [], dataS2_2P = [], dataS2_2N = [], dataS3_2P = [], dataS3_2N = [], dataS4_2P = [], dataS4_2N = [], dataS5_2P = [], dataS5_2N = [], dataS6_2P = [], dataS6_2N = [];
    //Drip line Arrays
    var dataS1_2P0 = [], dataS1_2N0 = [], dataS2_2P0 = [], dataS2_2N0 = [], dataS3_2P0 = [], dataS3_2N0 = [], dataS4_2P0 = [], dataS4_2N0 = [], dataS5_2P0 = [], dataS5_2N0 = [], dataS6_2P0 = [], dataS6_2N0 = []
    var tempN = 0;
    var label1 = '', label2 = '', label3 = '', label4 = '', label5 = '', label6 = '', label7 = '', label8 = '', label9 = 'Average';
    var gap = [null];
    
    label7 = '2P Drip Line';
    label8 = '2N Drip Line';
/*
THIS SECTION IS FOR DRIPLINE CALCULATION

*/
 
 //display error message if input is less than zero
 if ( (parseFloat(V_s2p) < 0) || (parseFloat(V_s2n) < 0) ){
     document.getElementById('plotErr2').innerHTML = 'Please enter numbers '+'&ge;'+' 0';
 }
 
 else {
    document.getElementById('plotErr2').innerHTML = '';
    //Calculate dripline points for UNEDF0
    var i = 0;
    for ( bz = 2; bz < 121; bz += 2 ){
        i = parseInt((bz-2)/2);
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (parseFloat(SPE_2N.UNEDF0[thisElem] - parseFloat(0.001))*parseFloat(SPE_2N.UNEDF0[rightElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bn;
                    dataS1_2N0[i] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
                else {
                     dataS1_2N0[i] = [0,bz];
                }
                
                }
                
            }
        }
        var j = 0;
        for ( bn = 2; bn < 301; bn += 2 ){
            j = parseInt((bn-2)/2);
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (parseFloat(SPE_2P.UNEDF0[thisElem] - parseFloat(0.001))*parseFloat(SPE_2P.UNEDF0[topElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bz;
                    dataS1_2P0[j] = [bn,tempN];
                    break
                    }
                else {
                     dataS1_2P0[j] = [bn,0];
                    
                    }
                }
            }
        }

    
    
    //Calculate dripline points for UNEDF1
    for ( bz = 2; bz < 121; bz += 2 ){
        i = parseInt((bz-2)/2);
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (parseFloat(SPE_2N.UNEDF1[thisElem] - parseFloat(0.001))*parseFloat(SPE_2N.UNEDF1[rightElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bn;
                    dataS2_2N0[i] = [tempN,bz];
                    
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
                 else {
                     dataS2_2N0[i] = [0,bz];
                }
                
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            j = parseInt((bn-2)/2);
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (parseFloat(SPE_2P.UNEDF1[thisElem] - parseFloat(0.001))*parseFloat(SPE_2P.UNEDF1[topElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bz;
                    dataS2_2P0[j] = [bn,tempN];
                    break
                    }
                else {
                    dataS2_2P0[j] = [bn,0];
                }
                
                }
            }
        }



    //Calculate dripline points for SKMS
    for ( bz = 2; bz < 121; bz += 2 ){
        i = parseInt((bz-2)/2);
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (parseFloat(SPE_2N.SKMS[thisElem] - parseFloat(0.001))*parseFloat(SPE_2N.SKMS[rightElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bn;
                    dataS3_2N0[i] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
                else {
                     dataS3_2N0[i] = [0,bz];
                }
                
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            j = parseInt((bn-2)/2);
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (parseFloat(SPE_2P.SKMS[thisElem] - parseFloat(0.001))*parseFloat(SPE_2P.SKMS[topElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bz;
                    dataS3_2P0[j] = [bn,tempN];
                    break
                    }
                else {
                     dataS3_2P0[j] = [bn,0];
                }
                
                }
            }
        }



    //Calculate dripline points for SKP
    for ( bz = 2; bz < 121; bz += 2 ){
        i = parseInt((bz-2)/2);
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (parseFloat(SPE_2N.SKP[thisElem] - parseFloat(0.001))*parseFloat(SPE_2N.SKP[rightElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bn;
                    dataS4_2N0[i] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
                else {
                     dataS4_2N0[i] = [0,bz];
                }
                
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            j = parseInt((bn-2)/2);
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (parseFloat(SPE_2P.SKP[thisElem] - parseFloat(0.001))*parseFloat(SPE_2P.SKP[topElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bz;
                    dataS4_2P0[j] = [bn,tempN];
                    break
                    }
                else {
                     dataS4_2P0[j] = [bn,0];
                }
                
                }
            }
        }

    

    //Calculate dripline points for SLY4
    for ( bz = 2; bz < 121; bz += 2 ){
        i = parseInt((bz-2)/2);
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (parseFloat(SPE_2N.SLY4[thisElem] - parseFloat(0.001))*parseFloat(SPE_2N.SLY4[rightElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bn;
                    dataS5_2N0[i] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
                else {
                     dataS5_2N0[i] = [0,bz];
                }
                
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            j = parseInt((bn-2)/2);
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (parseFloat(SPE_2P.SLY4[thisElem] - parseFloat(0.001))*parseFloat(SPE_2P.SLY4[topElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bz;
                    dataS5_2P0[j] = [bn,tempN];
                    break
                    }
                else {
                     dataS5_2P0[j] = [bn,0];
                }
                
                }
            }
        }


    //Calculate dripline points for SV-MIN
    for ( bz = 2; bz < 121; bz += 2 ){
        i = parseInt((bz-2)/2);
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (parseFloat(SPE_2N.SV_MIN[thisElem] - parseFloat(0.001))*parseFloat(SPE_2N.SV_MIN[rightElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bn;
                    dataS6_2N0[i] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
                else {
                     dataS6_2N0[i] = [0,bz];
                }
                
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            j = parseInt((bn-2)/2);
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (parseFloat(SPE_2P.SV_MIN[thisElem] - parseFloat(0.001))*parseFloat(SPE_2P.SV_MIN[topElem] - parseFloat(0.001)) ) < 0 ){
                    tempN = bz;
                    dataS6_2P0[j] = [bn,tempN];
                    break
                    }
                else {
                     dataS6_2P0[j] = [bn,0];
                }
                
                }
            }
        }


    
    
/*
DRIPLINE PART COMPLETE
*/





/*
CALCULATE WEIGHTED AVERAGE OVER ALL 6 DRIPLINES
*/

 var Ndrip_avg = [], Pdrip_avg = [];
 var avg_sum = 0;  //sum of all neutron/proton of different EDFs, for later average purpose
 var avg_weight = 0;
 var avg_dripline = 0;
     i = 0;
    

//neutron dripline average
 for (bz = 4; bz < 121; bz += 2 ){
     i = parseInt((bz-2)/2);
     
     avg_sum = dataS1_2N0[i][0] + dataS2_2N0[i][0] + dataS3_2N0[i][0] + dataS4_2N0[i][0] + dataS5_2N0[i][0] + dataS6_2N0[i][0] ;
     
     avg_weight =  0 + (dataS1_2N0[i][0] != 0 ) + (dataS2_2N0[i][0] != 0 ) + (dataS3_2N0[i][0] != 0 ) + (dataS4_2N0[i][0] != 0 ) + (dataS5_2N0[i][0] != 0 ) + (dataS6_2N0[i][0] != 0 );
     
     avg_dripline = 2*Math.floor((avg_sum/avg_weight)/2);
    
     Ndrip_avg[Ndrip_avg.length] = [parseInt(avg_dripline), bz];
     
     //reset
     avg_sum = 0;
     avg_weight = 0;
     avg_dripline = 0;
     
 }

    
    
//proton dripline average
 for (bn = 4; bn < 301; bn += 2 ){
     if ( bn != 148){ //NO DATA FOR ALL 6 FUNCTIONALS AT N=148 S2P PROTON DRIPLINE
     i = parseInt((bn-2)/2);
     
     avg_sum = dataS1_2P0[i][1] + dataS2_2P0[i][1] + dataS3_2P0[i][1] + dataS4_2P0[i][1] + dataS5_2P0[i][1] + dataS6_2P0[i][1] ;
     
     avg_weight =  0 + (dataS1_2P0[i][1] != 0 ) + (dataS2_2P0[i][1] != 0 ) + (dataS3_2P0[i][1] != 0 ) + (dataS4_2P0[i][1] != 0 ) + (dataS5_2P0[i][1] != 0 ) + (dataS6_2P0[i][1] != 0 );
     
     avg_dripline = 2*Math.floor((avg_sum/avg_weight)/2);
     if (avg_dripline < 119){
     Pdrip_avg[Pdrip_avg.length] = [bn, parseInt(avg_dripline)];
     }
     //reset
     avg_sum = 0;
     avg_weight = 0;
     avg_dripline = 0;
     }
 }
 // document.getElementById('flag1').innerHTML = dataS2_2P0[73];




/*
WEIGHTED AVERAGE OF DRIPLINE CALCULATION DONE
*/





/*
THIS SECTION CALCULATES ALL S2P, S2N LINES, BLOCK NEGATIVE S2P/S2N IF NECESSARY

*/

    //UNEDF0
    if ( true ){
        label1 = 'UNEDF0';
        for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (V_s2n >= 0) && (parseFloat(SPE_2N.UNEDF0[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.UNEDF0[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn;
                    dataS1_2N[dataS1_2N.length] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
              
                
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (V_s2p >= 0) && (parseFloat(SPE_2P.UNEDF0[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.UNEDF0[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz;
                    dataS1_2P[dataS1_2P.length] = [bn,tempN];
                    
                }
                    
                }
            }
        }

        
        var dataS1_m = dataS1_2P.concat(gap);
        var dataS1 = dataS1_m.concat(dataS1_2N);
    }
    
    //UNEDF1
    if (true){
        label2 = 'UNEDF1';
        for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (V_s2n >= 0) && (parseFloat(SPE_2N.UNEDF1[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.UNEDF1[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn;
                    dataS2_2N[dataS2_2N.length] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
               
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (V_s2p >= 0) && (parseFloat(SPE_2P.UNEDF1[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.UNEDF1[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz;
                    dataS2_2P[dataS2_2P.length] = [bn,tempN];
                    
                }
                
                    
                }
            }
        }
        
        var dataS2_m = dataS2_2P.concat(gap);
        var dataS2 = dataS2_m.concat(dataS2_2N);
    }
    
    //SKMS
    if (true){
        label3 = 'SkM*';

        for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (V_s2n >= 0) && (parseFloat(SPE_2N.SKMS[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.SKMS[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn;
                    dataS3_2N[dataS3_2N.length] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
            
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (V_s2p >= 0) && (parseFloat(SPE_2P.SKMS[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.SKMS[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz;
                    dataS3_2P[dataS3_2P.length] = [bn,tempN];
                    
                }
                
                
                }
            }
        }
        var dataS3_m = dataS3_2P.concat(gap);
        var dataS3 = dataS3_m.concat(dataS3_2N);
    }
    
    //SKP
    if (true){
        label4 = 'SkP';
            for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (V_s2n >= 0) && (parseFloat(SPE_2N.SKP[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.SKP[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn;
                    dataS4_2N[dataS4_2N.length] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
                
               
                
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (V_s2p >= 0) && (parseFloat(SPE_2P.SKP[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.SKP[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz;
                    dataS4_2P[dataS4_2P.length] = [bn,tempN];
                    
                }
                
                
                
                }
            }
        }
        var dataS4_m = dataS4_2P.concat(gap);
        var dataS4 = dataS4_m.concat(dataS4_2N);
    }

    //SLY4
    if (true){
        label5 = 'SLy4';
            for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (V_s2n >= 0) && (parseFloat(SPE_2N.SLY4[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.SLY4[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn;
                    dataS5_2N[dataS5_2N.length] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
                
                
                
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (V_s2p >= 0) && (parseFloat(SPE_2P.SLY4[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.SLY4[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz;
                    dataS5_2P[dataS5_2P.length] = [bn,tempN];
                    
                }
                
                
                
                
                }
            }
        }
        var dataS5_m = dataS5_2P.concat(gap);
        var dataS5 = dataS5_m.concat(dataS5_2N);
    }
    
    //SV_MIN
    if (true){
        label6 = 'SV-min';
            for ( bz = 2; bz < 121; bz += 2 ){
            for ( bn = 2; bn < 301; bn += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                if ( parseFloat(bn/bz) > 1.5) { // this if statement is to exclude irregularities above proton dripline
                //S2N horizontal
                if ( (V_s2n >= 0) && (parseFloat(SPE_2N.SV_MIN[thisElem] - parseFloat(V_s2n))*parseFloat(SPE_2N.SV_MIN[rightElem] - parseFloat(V_s2n)) ) < 0 ){
                    tempN = bn;
                    dataS6_2N[dataS6_2N.length] = [tempN,bz];
                    break  //Re-entry nuclei will be excluded if 'break' here, otherwise will generate zigzag lines, still deciding, May 11th 2015
                }
                
                
                
                }
                
            }
        }
        for ( bn = 2; bn < 301; bn += 2 ){
            for ( bz = 2; bz < 121; bz += 2 ){
                thisElem = bz.toString() + 'N' + bn.toString();
                leftElem = bz.toString() + 'N' + (bn-2).toString();
                rightElem = bz.toString() + 'N' + (bn+2).toString();
                topElem = (bz+2).toString() + 'N' + bn.toString();
                botElem = (bz-2).toString() + 'N' + bn.toString();
                
                
                if ( (bz > 106 && bn> (bz+40)) || bz<106) { // exclude irregularities above proton dripline,  May 11th 2015
                //S2P vertical
                if ( (V_s2p >= 0) && (parseFloat(SPE_2P.SV_MIN[thisElem] - parseFloat(V_s2p))*parseFloat(SPE_2P.SV_MIN[topElem] - parseFloat(V_s2p)) ) < 0 ){
                    tempN = bz;
                    dataS6_2P[dataS6_2P.length] = [bn,tempN];
                    
                }
                
                
                
                }
            }
        }
        var dataS6_m = dataS6_2P.concat(gap);
        var dataS6 = dataS6_m.concat(dataS6_2N);
    }
    
/*
SEPARATION ENERGY CALCULATION DONE

*/



/*
CALCULATE WEIGHTED AVERAGE OF S.E. OVER SELECTED FUNCTIONALS

*/

/*
 var N_SE_avg = [], P_SE_avg = [];
 var avg_sum = 0;  //sum of all neutron/proton of different EDFs, for later average purpose
 var avg_weight = 0;
 var avg_SE = 0;
 var i = 0;
//neutron S.E. average
 for (bz = 2; bz < 120; bz += 2 ){
     i = parseInt((bz-2)/2);
     
     try {
     avg_sum += 0+(dataS1_2N[i][0]);
     avg_weight += 0+(dataS1_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += 0+(dataS2_2N[i][0]);
     avg_weight += 0+(dataS2_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += 0+(dataS3_2N[i][0]);
     avg_weight += 0+(dataS3_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += 0+(dataS4_2N[i][0]);
     avg_weight += 0+(dataS4_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += 0+(dataS5_2N[i][0]);
     avg_weight += 0+(dataS5_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += 0+(dataS6_2N[i][0]);
     avg_weight += 0+(dataS6_2N[i][0] != 0 );
     }
     catch(err){}
     
     avg_SE = 2*Math.floor((avg_sum/avg_weight)/2);
    
     N_SE_avg[N_SE_avg.length] = [parseInt(avg_SE), bz+2];
     
     //reset
     avg_sum = 0;
     avg_weight = 0;
     avg_SE = 0;
     
 }

    
    
//proton S.E. average
 var cache1 = 0, cache2 = 0, cache3 = 0, cache4 = 0, cache5 = 0, cache6 = 0;
 i = 0;
 
 for ( bn = 2 ; bn < 190 ; bn += 2 ){
    
    for (i = cache1; i < 90 ; i++){
    try {
        if ( dataS1_2P[i][0] == bn ){
            avg_sum += dataS1_2P[i][1];
            avg_weight += 1;
            cache1 = i+1;
            break
        }
    }
    catch(err){}
     
    }
    
    for (i = cache2; i < 90 ; i++){
    try{
        if ( dataS2_2P[i][0] == bn ){
            avg_sum += dataS2_2P[i][1];
            avg_weight += 1;
            cache2 = i+1;
            break
        }
    }
    catch(err){}
    
    }


    for (i = cache3; i < 90 ; i++){
    try{
        if ( dataS3_2P[i][0] == bn ){
            avg_sum += dataS3_2P[i][1];
            avg_weight += 1;
            cache3 = i+1;
            break
        }
    }
    catch(err){}
     
    }


    for (i = cache4; i < 90 ; i++){
    try{
        if ( dataS4_2P[i][0] == bn ){
            avg_sum += dataS4_2P[i][1]
            avg_weight += 1;
            cache4 = i+1;
            break
        }
    }
    catch(err){}
     
    }


    for (i = cache5; i < 90 ; i++){
    try{
        if ( dataS5_2P[i][0] == bn ){
            avg_sum += dataS5_2P[i][1]
            avg_weight += 1;
            cache5 = i+1;
            break
        }
    }
    catch(err){}
     
    }


    for (i = cache6; i < 90 ; i++){
    try{
        if ( dataS6_2P[i][0] == bn ){
            avg_sum += dataS6_2P[i][1]
            avg_weight += 1;
            cache6 = i+1;
            break
        }
    }
    catch(err){}
     
    }

     avg_SE = 2*Math.floor((avg_sum/avg_weight)/2);
     if ( avg_sum != 0 ){
     P_SE_avg[P_SE_avg.length] = [bn, parseInt(avg_SE)];
     }
     //reset
     avg_sum = 0;
     avg_weight = 0;
     avg_SE = 0;
     
 }


 */
/*
 WEIGHTED AVERAGE OF S.E. DONE
 
*/





/* THIS IS THE OLD PLOTTING SCHEME FOR FLOT LIBRARY
BEGIN PLOT:

*/

//Replicated data arrays (so that when chosen 'only plot avg S.E. option these data will not be plotted')
 
 
 
 
    //plot dataset 1:UNEDF0, 2:UNEDF1, 3:SKM*, 4:SKP, 5:SLY4, 6:SV_MIN
    //Preferred order: 3, 4, 5, 6, 1, 2.
    /*
    var dataset = [
                   {data: dataS3R, label: label3, lines:{show:((M3||M7)&&(!M10))}, points:{show:((M3||M7)&&(!M10))}, color: '#3D7A99'},
                   {data: dataS4R, label: label4, lines:{show:((M4||M7)&&(!M10))}, points:{show:((M4||M7)&&(!M10))}, color: '#AA4643'},
                   {data: dataS5R, label: label5, lines:{show:((M5||M7)&&(!M10))}, points:{show:((M5||M7)&&(!M10))}, color: '#FF3399'},
                   {data: dataS6R, label: label6, lines:{show:((M6||M7)&&(!M10))}, points:{show:((M6||M7)&&(!M10))}, color: '#339966'},
                   {data: dataS1R, label: label1, lines:{show:((M1||M7)&&(!M10))}, points:{show:((M1||M7)&&(!M10))}, color:'#3333FF'},
                   {data: dataS2R, label: label2, lines:{show:((M2||M7)&&(!M10))}, points:{show:((M2||M7)&&(!M10))}, color:'#FF9900'},
                   {data: dataS_AVGR, label: label9, lines:{show: M10}, points:{show: M10}, color:'#FF0000'},
                   //please edit labels and switches for these.
                   {data: Pdrip_avg, label: label7, lines:{show:M8}, points:{show:M8}, color:'#000000'},
                   {data: Ndrip_avg, label: label8, lines:{show:M9}, points:{show:M9}, color:'#000000'}
                   ];
    */

 var subT = '';//specify chosen separation energy in subtitle
 if (V_s2p == '' && V_s2n != '') subT = 'S'+'2n'.sub()+'= '+parseFloat(V_s2n)+' MeV';
 else if (V_s2n == '' && V_s2p != '') subT = 'S'+'2p'.sub()+'= '+parseFloat(V_s2p)+' MeV';
 else if (V_s2p == '' && V_s2n == '') subT = '';
 else {subT = 'S'+'2p'.sub()+'= '+parseFloat(V_s2p)+' MeV, '+'S'+'2n'.sub()+'= '+parseFloat(V_s2n)+' MeV';}
 
 
 $(function () {
    $('#separEnergy').highcharts({
        legend:{
            useHTML:false,
            itemHiddenStyle:{ 
                color: '#D1D1D1'
            },
            itemDistance:50,
            itemWidth:110
            //specify spacing between each legend item, set as below so S_2n and S_2p are each within one row, range 8~14 works on my mac, something to do with screen size i assume
        },
        
        navigation:{
        buttonOptions:{
            y:0
            }
        },
        
        credits: false,
        chart: {
            type: 'spline',
            //disable or change zoom type here:
            zoomType:'xy'
        },
        
        title: {
            text: 'Separation Energy'
        },
        
        subtitle: {
            useHTML:true,
            text: subT
        },
        
        xAxis: {
            //check xAxis type attribute
            title: {
                text: 'Neutron Number'
            },
            tickPositions: [0,20,28,50,82,126,184,258,300],
            tickLength:1,
            gridLineWidth:1,
            plotLines: [{
            color: '#000000',
            width: 2,
            value:0
        }],
            min:-0.5,
            max:300
        },
        yAxis: {
            title: {
                
                text: 'Proton Number'
            },
            tickPositions:[0,20,28,50,82,120],
            gridLineWidth :1,
            plotLines: [{
            color: '#000000',
            width: 2,
            value: 0
        }],
            min:-0.5
        },
        //try limiting effective digits here
        tooltip: {
            useHTML: true,
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'Z={point.y}, N={point.x}'
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true,
                    fillColor:'#FFFFFF',
                    symbol: 'circle',
                    radius:1.5,
                    lineColor:null,
                    lineWidth:1.5
                }
            }
        },
        
        
        
        
        series: [
        
        
        
        {
            name: label3+'_S2n',
            data: dataS3_2N,
            color: '#3399FF',
            visible:false
        },
        
        {
            name: label3+'_S2p',
            data: dataS3_2P,
            color: '#3399FF',
            visible:false
        },
        
        {
            name: label4+'_S2n',
            data: dataS4_2N,
            color:'#AA4643',
            visible:false
        },
        
        {
            name: label4+'_S2p',
            data: dataS4_2P,
            color:'#AA4643',
            visible:false
        },
        
        {
            name: label5+'_S2n',
            data: dataS5_2N,
            color:'#FF3399',
            visible:false
        },
        
        {
            name: label5+'_S2p',
            data: dataS5_2P,
            color:'#FF3399',
            visible:false
        },
        
        {
            name: label6+'_S2n',
            data: dataS6_2N,
            color:'#339966',
            visible:false
        },
        
        {
            name: label6+'_S2p',
            data: dataS6_2P,
            color:'#339966',
            visible:false
        },
        
        {
            name: label1+'_S2n',
            data: dataS1_2N,
            color:'#3333FF',
            visible:false
        },
        
        {
            name: label1+'_S2p',
            data: dataS1_2P,
            color:'#3333FF',
            visible:false
        },
        
        {
            name: label2+'_S2n',
            data: dataS2_2N,
            color:'#ff9900',
            visible:false
        },
        
        {
            name: label2+'_S2p',
            data: dataS2_2P,
            color:'#ff9900',
            visible:false
        },
        
        {
            name: label8,
            data: Ndrip_avg,
            color:'#000000',
            visible:true
        },
                
        {
            name: label7,
            data: Pdrip_avg,
            color:'#000000',
            visible:true
        }
   
        ]
        
        
        
    
    
    });
});

//document.getElementById('flag21').innerHTML = Pdrip_avg
    
    
    






/*                                  CODE BELOW IS FOR FLOT LIBRARY

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
    ticks:[20,28,50,82],
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
    noColumns:8,
    backgroundColor:null,
    labelBoxBorderColor:null,
    },
    grid: { hoverable: true ,clickable:false},
    series: {
    lines: {
    lineWidth:1.5,
    show: true
    },
    points: {
    radius: 0.7,//change size of points
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
                             showTooltip(item.pageX, item.pageY,item.series.label+ ": Z="+ y + ", N=" + x );
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