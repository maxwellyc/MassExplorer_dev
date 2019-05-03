
function SeparE(V_s2p0, V_s2n0, UNEDF0on2, UNEDF1on2, SKMSon2, SKPon2, SLY4on2, SV_MINon2, ALLon2, AVGon2,ProtonDL_off,NeutronDL_off){
    var V_s2p = V_s2p0;//or default 0?
    var V_s2n = V_s2n0;//or default 0?
    var M1 = UNEDF0on2 || 0, M2 = UNEDF1on2 || 0, M3 = SKMSon2 || 0, M4 = SKPon2 || 0, M5 = SLY4on2 || 0, M6 = SV_MINon2 || 0, M7 = ALLon2 || 0, M8 = !ProtonDL_off, M9 = !NeutronDL_off, M10 = AVGon2;
    var bz = 2, bn = 2;
    var thisElem = '2N2', leftElem = '2N2', rightElem = '2N2', topElem = '2N2', botElem = '2N2';
    //Separation Energy Arrays
    var dataS1_2P = [], dataS1_2N = [], dataS2_2P = [], dataS2_2N = [], dataS3_2P = [], dataS3_2N = [], dataS4_2P = [], dataS4_2N = [], dataS5_2P = [], dataS5_2N = [], dataS6_2P = [], dataS6_2N = [];
    //Drip line Arrays
    var dataS1_2P0 = [], dataS1_2N0 = [], dataS2_2P0 = [], dataS2_2N0 = [], dataS3_2P0 = [], dataS3_2N0 = [], dataS4_2P0 = [], dataS4_2N0 = [], dataS5_2P0 = [], dataS5_2N0 = [], dataS6_2P0 = [], dataS6_2N0 = []
    var tempN = 0;
    var label1 = '', label2 = '', label3 = '', label4 = '', label5 = '', label6 = '', label7 = '', label8 = '', label9 = '';
    var gap = [null];
    
    if (M8) label7 = '2-Proton Drip Line';
    if (M9) label8 = '2-Neutron Drip Line';
/*
THIS SECTION IS FOR DRIPLINE CALCULATION

*/

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
 for (bz = 2; bz < 121; bz += 2 ){
     i = parseInt((bz-2)/2);
     
     avg_sum = dataS1_2N0[i][0] + dataS2_2N0[i][0] + dataS3_2N0[i][0] + dataS4_2N0[i][0] + dataS5_2N0[i][0] + dataS6_2N0[i][0] ;
     
     avg_weight =  0 + (dataS1_2N0[i][0] != 0 ) + (dataS2_2N0[i][0] != 0 ) + (dataS3_2N0[i][0] != 0 ) + (dataS4_2N0[i][0] != 0 ) + (dataS5_2N0[i][0] != 0 ) + (dataS6_2N0[i][0] != 0 );
     
     avg_dripline = avg_sum/avg_weight;
    
     Ndrip_avg[Ndrip_avg.length] = [avg_dripline, bz];
     
     //reset
     avg_sum = 0;
     avg_weight = 0;
     avg_dripline = 0;
     
 }

    
    
//proton dripline average
 for (bn = 2; bn < 301; bn += 2 ){
     if ( bn != 148){ //NO DATA FOR ALL 6 FUNCTIONALS AT N=148 S2P PROTON DRIPLINE
     i = parseInt((bn-2)/2);
     
     avg_sum = dataS1_2P0[i][1] + dataS2_2P0[i][1] + dataS3_2P0[i][1] + dataS4_2P0[i][1] + dataS5_2P0[i][1] + dataS6_2P0[i][1] ;
     
     avg_weight =  0 + (dataS1_2P0[i][1] != 0 ) + (dataS2_2P0[i][1] != 0 ) + (dataS3_2P0[i][1] != 0 ) + (dataS4_2P0[i][1] != 0 ) + (dataS5_2P0[i][1] != 0 ) + (dataS6_2P0[i][1] != 0 );
     
     avg_dripline = avg_sum/avg_weight;
    
     Pdrip_avg[Pdrip_avg.length] = [bn, avg_dripline];
     
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
    if ( M1 || M7 ){
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
    if ( M2 || M7 ){
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
    if ( M3 || M7 ){
        label3 = 'SKM'+'*'.sup();

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
    if ( M4 || M7 ){
        label4 = 'SKP';
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
    if ( M5 || M7 ){
        label5 = 'SLY4';
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
    if ( M6 || M7 ){
        label6 = 'SV-MIN';
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

 var N_SE_avg = [], P_SE_avg = [];
 var avg_sum = 0;  //sum of all neutron/proton of different EDFs, for later average purpose
 var avg_weight = 0;
 var avg_SE = 0;
 var i = 0;
//neutron S.E. average
 for (bz = 2; bz < 121; bz += 2 ){
     i = parseInt((bz-2)/2);
     
     try {
     avg_sum += Number(M1||M7)*(dataS1_2N[i][0]);
     avg_weight += Number(M1||M7)*(dataS1_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += Number(M2||M7)*(dataS2_2N[i][0]);
     avg_weight += Number(M2||M7)*(dataS2_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += Number(M3||M7)*(dataS3_2N[i][0]);
     avg_weight += Number(M3||M7)*(dataS3_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += Number(M4||M7)*(dataS4_2N[i][0]);
     avg_weight += Number(M4||M7)*(dataS4_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += Number(M5||M7)*(dataS5_2N[i][0]);
     avg_weight += Number(M5||M7)*(dataS5_2N[i][0] != 0 );
     }
     catch(err){}
     
     try {
     avg_sum += Number(M6||M7)*(dataS6_2N[i][0]);
     avg_weight += Number(M6||M7)*(dataS6_2N[i][0] != 0 );
     }
     catch(err){}
     
     avg_SE = avg_sum/avg_weight;
    
     N_SE_avg[N_SE_avg.length] = [avg_SE, bz+2];
     
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
        if ( (dataS1_2P[i][0] == bn) && (M1||M7)){
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
        if ( (dataS2_2P[i][0] == bn) && (M2||M7)){
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
        if ( (dataS3_2P[i][0] == bn) && (M3||M7)){
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
        if ( (dataS4_2P[i][0] == bn) && (M4||M7)){
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
        if ( (dataS5_2P[i][0] == bn) && (M5||M7)){
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
        if ( (dataS6_2P[i][0] == bn) && (M6||M7)){
            avg_sum += dataS6_2P[i][1]
            avg_weight += 1;
            cache6 = i+1;
            break
        }
    }
    catch(err){}
     
    }

     avg_SE = avg_sum/avg_weight;
     if ( avg_sum != 0 ){
     P_SE_avg[P_SE_avg.length] = [bn, avg_SE];
     }
     //reset
     avg_sum = 0;
     avg_weight = 0;
     avg_SE = 0;
     
 }
 

 var dataS_AVG = P_SE_avg.concat(gap);
 dataS_AVG = dataS_AVG.concat(N_SE_avg);

 
/*
 WEIGHTED AVERAGE OF S.E. DONE
 
*/





/*
BEGIN PLOT:

*/

//Replicated data arrays (so that when chosen 'only plot avg S.E. option these data will not be plotted')
 var dataS1R = dataS1, dataS2R = dataS2, dataS3R = dataS3, dataS4R = dataS4, dataS5R = dataS5, dataS6R = dataS6, dataS_AVGR = [];
 
 if (M10) {
     dataS1R = [], dataS2R = [], dataS3R = [], dataS4R = [], dataS5R = [], dataS6R = [];
     label1 = '', label2 = '', label3 = '', label4 = '', label5 = '', label6 = '', label9 = 'Average';
     dataS_AVGR = dataS_AVG;
     
 }
 
    //plot dataset 1:UNEDF0, 2:UNEDF1, 3:SKM*, 4:SKP, 5:SLY4, 6:SV_MIN
    //Preferred order: 3, 4, 5, 6, 1, 2.
    
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

}
