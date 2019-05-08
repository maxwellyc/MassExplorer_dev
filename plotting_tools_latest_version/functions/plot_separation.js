function SeparE(V_s2p0, V_s2n0){
    var V_s2p = V_s2p0;//or default 0?
    var V_s2n = V_s2n0;//or default 0?
    var bz,bn;
    var edfLabel = ["UNEDF0","UNEDF1","SKMS","SKP","SLY4","SV_MIN"]
    var label1 = 'UNEDF0', label2 = 'UNEDF1', label3 = 'SKM*', label4 = 'SKP', label5 = 'SLY4', label6 = 'SV-MIN', label7 = '', label8 = '';
    var gap = [null];
    var EDF_db = {UNEDF0:SA_UNEDF0, UNEDF1:SA_UNEDF1, SKMS:SA_SKMS, SKP:SA_SKP, SLY4:SA_SLY4,SV_MIN:SA_SV_MIN};
    //arrays for dripline
    var zDrip = [[],[],[],[],[],[]];
    var nDrip = [[],[],[],[],[],[]];
    //arrays for separation energy, each sub-array has structure of [neutron,proton,sep_energy 2p,sep_energy 2n]
    var sep1 = [[]], sep2 = [[]], sep3 = [[]], sep4 = [[]], sep5 = [[]], sep6 = [[]];
    //Separation Energy n,z NUMBER Arrays
    var dataS1_2P = [], dataS1_2N = [], dataS2_2P = [], dataS2_2N = [], dataS3_2P = [], dataS3_2N = [], dataS4_2P = [], dataS4_2N = [], dataS5_2P = [], dataS5_2N = [], dataS6_2P = [], dataS6_2N = [];
    var avgSumN = [];
    var avgEdfN = [];
    var avgSumZ = [];
    var avgEdfZ = [];
    var avgDripN = [];
    var avgDripZ = [];
    var zMax = 0;
    var zPrev = 0;
    var nMax = 0;
    var nPrev = 0;
    numOfCol = 25;
    label7 = '2P Drip Line';
    label8 = '2N Drip Line';

    for (i = 0 ; i < 301 ; i+=2){
        avgSumZ[i] = 0;
        avgEdfZ[i] = 0;
    }
    for (var i = 0 ; i < 121 ; i+=2){
        avgSumN[i] = 0;
        avgEdfN[i] = 0;
    }
 //display error message if input is less than zero
 if ( (parseFloat(V_s2p) < 0) || (parseFloat(V_s2n) < 0) ){
     document.getElementById('plotErr2').innerHTML = 'Please enter numbers '+'&ge;'+' 0';
 }
 
 else {
//CALCULATE WEIGHTED AVERAGE OVER ALL 6 MASSTABLES
    var i,j,k;
    document.getElementById('plotErr2').innerHTML = '';
    //Calculate dripline points
    for (j=0 ; j<6 ; j++){
        var split_f1 = EDF_db[edfLabel[j]];
        var NLoc_0 = split_f1.indexOf("N");// location of label "N"
        var ZLoc_0 = split_f1.indexOf("Z");// location of label "Z"
        var xn = parseInt(NLoc_0 + numOfCol, 10);
        var xz = parseInt(ZLoc_0 + numOfCol, 10);
        //find neutron dripline for each EDF
        for ( bz = 2; bz < 121; bz += 2 ){
            k = 0;
            for ( i = 0 ; i < 120; i++){
                if (bz == split_f1[xz]) {
                    //storing proton dripline, smallest (first encountered) neutron number of an isotope is recorded
                    if (k == 0) {
                        zDrip[j][bz] = [split_f1[xn],bz];
                        avgSumZ[bz] += parseInt(split_f1[xn],10);
                        avgEdfZ[bz] ++;
                        k++;
                    }
                    nPrev = split_f1[xn-numOfCol];
                    nMax = split_f1[xn];
                    xn += numOfCol;
                    xz += numOfCol;
                    
                }
            }
            //Exclude re-entry nuclei
            if (nMax - nPrev == 2){
                nDrip[j][bz] = [nMax,bz];
                avgSumN[bz] += parseInt(nMax,10);
                avgEdfN[bz] ++;
            }
            else if (nMax - nPrev > 3){
                nDrip[j][bz] = [nPrev,bz];
                avgSumN[bz] += parseInt(nPrev,10);
                avgEdfN[bz] ++;
            }
        }
        //document.getElementById('demo1').innerHTML = "HELLO "+" , "+ zDrip[0];
    }
    var tempN=0,tempZ=0;
    //average dripline calculation
    for ( bz = 2; bz < 121; bz += 2 ){
        tempN = 2*Math.floor( parseFloat(avgSumN[bz]) / parseFloat(avgEdfN[bz]) / 2);
        tempZ = 2*Math.floor( parseFloat(avgSumZ[bz]) / parseFloat(avgEdfZ[bz]) / 2);
        avgDripN[avgDripN.length] = [parseInt(tempN),parseInt(bz)];
        avgDripZ[avgDripZ.length] = [parseInt(tempZ),bz];
    }
//WEIGHTED AVERAGE OF DRIPLINE CALCULATION COMPLETE

//CREAT ARRAYS FOR SEPARATION ENERGY WITH STRUCTURE: [neutron,proton,sep_energy 2p,sep_energy 2n]
    var dataLoc_S2p = split_f1.indexOf("S_{2p}_(MeV)"); // location of label "S_{2p}_(MeV)"
    var dataLoc_S2n = split_f1.indexOf("S_{2n}_(MeV)"); // location of label "S_{2p}_(MeV)"
    var S2pLoc = dataLoc_S2p - NLoc_0; // relative position of 2 proton separation energy to label "N"
    var S2nLoc = dataLoc_S2n - NLoc_0; // relative position of 2 neutron ...
    //store separation energy for UNEDF0 into sep1
    split_f1 = EDF_db["UNEDF0"]
    xn = parseInt(NLoc_0 + numOfCol, 10);
    xz = parseInt(ZLoc_0 + numOfCol, 10);
    var k = split_f1.length/25;
    for (i=0;i<k;i++){
        sep1[sep1.length] = [split_f1[xn],split_f1[xz],split_f1[xn+S2pLoc],split_f1[xn+S2nLoc]];
        xn += numOfCol;
        xz += numOfCol;
    }
    
    //store separation energy for UNEDF1 into sep2
    split_f1 = EDF_db["UNEDF1"]
    xn = parseInt(NLoc_0 + numOfCol, 10);
    xz = parseInt(ZLoc_0 + numOfCol, 10);
    k = split_f1.length/25;
    for (i=0;i<k;i++){
        sep2[sep2.length] = [split_f1[xn],split_f1[xz],split_f1[xn+S2pLoc],split_f1[xn+S2nLoc]];
        xn += numOfCol;
        xz += numOfCol;
    }
    
    //store separation energy for SKM* into sep3
    split_f1 = EDF_db["SKMS"]
    xn = parseInt(NLoc_0 + numOfCol, 10);
    xz = parseInt(ZLoc_0 + numOfCol, 10);
    k = split_f1.length/25;
    for (i=0;i<k;i++){
        sep3[sep3.length] = [split_f1[xn],split_f1[xz],split_f1[xn+S2pLoc],split_f1[xn+S2nLoc]];
        xn += numOfCol;
        xz += numOfCol;
    }
    
    //store separation energy for SKP into sep4
    split_f1 = EDF_db["SKP"]
    xn = parseInt(NLoc_0 + numOfCol, 10);
    xz = parseInt(ZLoc_0 + numOfCol, 10);
    k = split_f1.length/25;
    for (i=0;i<k;i++){
        sep4[sep4.length] = [split_f1[xn],split_f1[xz],split_f1[xn+S2pLoc],split_f1[xn+S2nLoc]];
        xn += numOfCol;
        xz += numOfCol;
    }
    
    //store separation energy for SLY4 into sep5
    split_f1 = EDF_db["SLY4"]
    xn = parseInt(NLoc_0 + numOfCol, 10);
    xz = parseInt(ZLoc_0 + numOfCol, 10);
    k = split_f1.length/25;
    for (i=0;i<k;i++){
        sep5[sep5.length] = [split_f1[xn],split_f1[xz],split_f1[xn+S2pLoc],split_f1[xn+S2nLoc]];
        xn += numOfCol;
        xz += numOfCol;
    }
    
    //store separation energy for SV-MIN into sep6
    split_f1 = EDF_db["SV_MIN"]
    xn = parseInt(NLoc_0 + numOfCol, 10);
    xz = parseInt(ZLoc_0 + numOfCol, 10);
    k = split_f1.length/25;
    for (i=0;i<k;i++){
        sep6[sep6.length] = [split_f1[xn],split_f1[xz],split_f1[xn+S2pLoc],split_f1[xn+S2nLoc]];
        xn += numOfCol;
        xz += numOfCol;
    }

//SEPARATION ENERGY ARRAY CONSTRUCTION COMPLETE

//search for s2n line
    //UNEDF0
    var sxn=0, sxz=1, sx2p=2, sx2n=3;
    for ( bz = 2; bz < 121; bz += 2 ){
        //UNEDF0
        k = sep1.length;
        //s2n>V_s2n line
        for (i=0;i<k;i++){
            if (parseInt(sep1[i][sxz]) == bz && sep1[i][sx2n] != "No_Data" && ((parseFloat(sep1[i][sx2n]) >= parseFloat(V_s2n) && parseFloat(sep1[i+1][sx2n]) < parseFloat(V_s2n)) ||  (parseInt(sep1[i+1][sxz]) > bz &&  parseFloat(sep1[i][sx2n]) >= parseFloat(V_s2n) ) )  ){
                dataS1_2N[dataS1_2N.length] = [parseInt(sep1[i][sxn]),parseInt(sep1[i][sxz])];
                break
            }
        }
        //s2p>V_s2p line
        for (i=k-2; i>=0 ;i--){
            if ( parseInt(sep1[i][sxz]) == bz && parseInt(sep1[i-1][sxz]) == bz && sep1[i][sx2p] != "No_Data" && parseFloat(sep1[i-1][sx2p]) < parseFloat(V_s2p) && parseFloat(sep1[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS1_2P[dataS1_2P.length] = [parseInt(sep1[i][sxn]),parseInt(sep1[i][sxz])];
                break
            }
            //If it reaches the limit of proton dripline (all isotopes have s2p larger than input V_s2p)
            
            else if (parseInt(sep1[i][sxn]) == parseInt(((zDrip[0])[bz])[0]) &&  parseFloat(sep1[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS1_2P[dataS1_2P.length] = [parseInt(sep1[i][sxn]),parseInt(sep1[i][sxz])];
                break
            }
        }
        
        //UNEDF1
        k = sep2.length;
        for (i=0;i<k;i++){
            if (parseInt(sep2[i][sxz]) == bz && sep2[i][sx2n] != "No_Data" && ((parseFloat(sep2[i][sx2n]) >= parseFloat(V_s2n) && parseFloat(sep2[i+1][sx2n]) < parseFloat(V_s2n)) ||  (parseInt(sep2[i+1][sxz]) > bz &&  parseFloat(sep2[i][sx2n]) >= parseFloat(V_s2n) ) )  ){
                dataS2_2N[dataS2_2N.length] = [parseInt(sep2[i][sxn]),parseInt(sep2[i][sxz])];
                break
            }
        }
        for (i=k-2; i>=0 ;i--){
            if ( parseInt(sep2[i][sxz]) == bz && parseInt(sep2[i-1][sxz]) == bz && sep2[i][sx2p] != "No_Data" && parseFloat(sep2[i-1][sx2p]) < parseFloat(V_s2p) && parseFloat(sep2[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS2_2P[dataS2_2P.length] = [parseInt(sep2[i][sxn]),parseInt(sep2[i][sxz])];
                break
            }
            //If it reaches the limit of proton dripline (all isotopes have s2p larger than input V_s2p)
            
            else if (parseInt(sep2[i][sxn]) == parseInt(((zDrip[1])[bz])[0]) &&  parseFloat(sep2[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS2_2P[dataS2_2P.length] = [parseInt(sep2[i][sxn]),parseInt(sep2[i][sxz])];
                break
            }
        }
        //SKMS
        k = sep3.length;
        for (i=0;i<k;i++){
            if (parseInt(sep3[i][sxz]) == bz && sep3[i][sx2n] != "No_Data" && ((parseFloat(sep3[i][sx2n]) >= parseFloat(V_s2n) && parseFloat(sep3[i+1][sx2n]) < parseFloat(V_s2n)) ||  (parseInt(sep3[i+1][sxz]) > bz &&  parseFloat(sep3[i][sx2n]) >= parseFloat(V_s2n) ) )  ){
                dataS3_2N[dataS3_2N.length] = [parseInt(sep3[i][sxn]),parseInt(sep3[i][sxz])];
                break
            }
        }
        for (i=k-2; i>=0 ;i--){
            if ( parseInt(sep3[i][sxz]) == bz && parseInt(sep3[i-1][sxz]) == bz && sep3[i][sx2p] != "No_Data" && parseFloat(sep3[i-1][sx2p]) < parseFloat(V_s2p) && parseFloat(sep3[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS3_2P[dataS3_2P.length] = [parseInt(sep3[i][sxn]),parseInt(sep3[i][sxz])];
                break
            }
            //If it reaches the limit of proton dripline (all isotopes have s2p larger than input V_s2p)
            
            else if (parseInt(sep3[i][sxn]) == parseInt(((zDrip[2])[bz])[0]) &&  parseFloat(sep3[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS3_2P[dataS3_2P.length] = [parseInt(sep3[i][sxn]),parseInt(sep3[i][sxz])];
                break
            }
        }
        //SKP
        k = sep4.length;
        for (i=0;i<k;i++){
            if (parseInt(sep4[i][sxz]) == bz && sep4[i][sx2n] != "No_Data" && ((parseFloat(sep4[i][sx2n]) >= parseFloat(V_s2n) && parseFloat(sep4[i+1][sx2n]) < parseFloat(V_s2n)) ||  (parseInt(sep4[i+1][sxz]) > bz &&  parseFloat(sep4[i][sx2n]) >= parseFloat(V_s2n) ) )  ){
                dataS4_2N[dataS4_2N.length] = [parseInt(sep4[i][sxn]),parseInt(sep4[i][sxz])];
                break
            }
        }
        for (i=k-2; i>=0 ;i--){
            if ( parseInt(sep4[i][sxz]) == bz && parseInt(sep4[i-1][sxz]) == bz && sep4[i][sx2p] != "No_Data" && parseFloat(sep4[i-1][sx2p]) < parseFloat(V_s2p) && parseFloat(sep4[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS4_2P[dataS4_2P.length] = [parseInt(sep4[i][sxn]),parseInt(sep4[i][sxz])];
                break
            }
            //If it reaches the limit of proton dripline (all isotopes have s2p larger than input V_s2p)
            
            else if (parseInt(sep4[i][sxn]) == parseInt(((zDrip[3])[bz])[0]) &&  parseFloat(sep4[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS4_2P[dataS4_2P.length] = [parseInt(sep4[i][sxn]),parseInt(sep4[i][sxz])];
                break
            }
        }
        //SLY4
        k = sep5.length;
        for (i=0;i<k;i++){
            if (parseInt(sep5[i][sxz]) == bz && sep5[i][sx2n] != "No_Data" && ((parseFloat(sep5[i][sx2n]) >= parseFloat(V_s2n) && parseFloat(sep5[i+1][sx2n]) < parseFloat(V_s2n)) ||  (parseInt(sep5[i+1][sxz]) > bz &&  parseFloat(sep5[i][sx2n]) >= parseFloat(V_s2n) ) )  ){
                dataS5_2N[dataS5_2N.length] = [parseInt(sep5[i][sxn]),parseInt(sep5[i][sxz])];
                break
            }
        }
        for (i=k-2; i>=0 ;i--){
            if ( parseInt(sep5[i][sxz]) == bz && parseInt(sep5[i-1][sxz]) == bz && sep5[i][sx2p] != "No_Data" && parseFloat(sep5[i-1][sx2p]) < parseFloat(V_s2p) && parseFloat(sep5[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS5_2P[dataS5_2P.length] = [parseInt(sep5[i][sxn]),parseInt(sep5[i][sxz])];
                break
            }
            //If it reaches the limit of proton dripline (all isotopes have s2p larger than input V_s2p)
            
            else if (parseInt(sep5[i][sxn]) == parseInt(((zDrip[4])[bz])[0]) &&  parseFloat(sep5[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS5_2P[dataS5_2P.length] = [parseInt(sep5[i][sxn]),parseInt(sep5[i][sxz])];
                break
            }
        }
        //SV-MIN
        k = sep6.length;
        for (i=0;i<k;i++){
            if (parseInt(sep6[i][sxz]) == bz && sep6[i][sx2n] != "No_Data" && ((parseFloat(sep6[i][sx2n]) >= parseFloat(V_s2n) && parseFloat(sep6[i+1][sx2n]) < parseFloat(V_s2n)) ||  (parseInt(sep6[i+1][sxz]) > bz &&  parseFloat(sep6[i][sx2n]) >= parseFloat(V_s2n) ) )  ){
                dataS6_2N[dataS6_2N.length] = [parseInt(sep6[i][sxn]),parseInt(sep6[i][sxz])];
                break
            }
        }
        for (i=k-2; i>=0 ;i--){
            if ( parseInt(sep6[i][sxz]) == bz && parseInt(sep6[i-1][sxz]) == bz && sep6[i][sx2p] != "No_Data" && parseFloat(sep6[i-1][sx2p]) < parseFloat(V_s2p) && parseFloat(sep6[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS6_2P[dataS6_2P.length] = [parseInt(sep6[i][sxn]),parseInt(sep6[i][sxz])];
                break
            }
            //If it reaches the limit of proton dripline (all isotopes have s2p larger than input V_s2p)
            
            else if (parseInt(sep6[i][sxn]) == parseInt(((zDrip[5])[bz])[0]) &&  parseFloat(sep6[i][sx2p]) >= parseFloat(V_s2p) ){
                dataS6_2P[dataS6_2P.length] = [parseInt(sep6[i][sxn]),parseInt(sep6[i][sxz])];
                break
            }
        }
    }
    document.getElementById('demo1').innerHTML = "HELLO "+"<br>"+ dataS1_2P;
    /*
//construct almost indentical arrays which have the same elements as sep1~6 but in ascending order of neutron numbers
    var sep1R = [[]], sep2R = [[]], sep3R = [[]], sep4R = [[]], sep5R = [[]], sep6R = [[]];
    for ( bn = 2; bn < 301; bn += 2 ){
        //UNEDF0
        k = sep1.length;
        for (i=0;i<k;i++){
            if (sep1[i][sxn] == bn){
                sep1R[sep1R.length] = sep1[i];
            }
        }
        //UNEDF1
        k = sep2.length;
        for (i=0;i<k;i++){
            if (sep2[i][sxn] == bn){
                sep2R[sep2R.length] = sep2[i];
            }
        }
        //SKMS
        k = sep3.length;
        for (i=0;i<k;i++){
            if (sep3[i][sxn] == bn){
                sep3R[sep3R.length] = sep3[i];
            }
        }
        //SKP
        k = sep4.length;
        for (i=0;i<k;i++){
            if (sep4[i][sxn] == bn){
                sep4R[sep4R.length] = sep4[i];
            }
        }
        //SLY4
        k = sep5.length;
        for (i=0;i<k;i++){
            if (sep5[i][sxn] == bn){
                sep5R[sep5R.length] = sep5[i];
            }
        }
        //SV-MIN
        k = sep6.length;
        for (i=0;i<k;i++){
            if (sep6[i][sxn] == bn){
                sep6R[sep6R.length] = sep6[i];
            }
        }
        
    }
    //add additional element for if statement for last element in array (technical detail, no physics)
    sep1R[sep1R.length] = [sep1R[sep1R.length-1][0]+2,parseInt(sep1R[sep1R.length-1][1]),-100,-100];
    sep2R[sep2R.length] = [sep2R[sep2R.length-1][0]+2,parseInt(sep2R[sep2R.length-1][1]),-100,-100];
    sep3R[sep3R.length] = [sep3R[sep3R.length-1][0]+2,parseInt(sep3R[sep3R.length-1][1]),-100,-100];
    sep4R[sep4R.length] = [sep4R[sep4R.length-1][0]+2,parseInt(sep4R[sep4R.length-1][1]),-100,-100];
    sep5R[sep5R.length] = [sep5R[sep5R.length-1][0]+2,parseInt(sep5R[sep5R.length-1][1]),-100,-100];
    sep6R[sep6R.length] = [sep6R[sep6R.length-1][0]+2,parseInt(sep6R[sep6R.length-1][1]),-100,-100];
    //document.getElementById('demo1').innerHTML = sep1R[sep1R.length-1];
    
//search for s2p line
    for ( bn = 2; bn < 301; bn += 2 ){
        //UNEDF0
        k = sep1R.length;
        for (i=0;i<k;i++){
            if (parseInt(sep1R[i][sxn]) == bn && sep1R[i][sx2p] != "No_Data" && ( (parseFloat(sep1R[i][sx2p]) >= parseFloat(V_s2p) && (parseFloat(sep1R[i+1][sx2p]) < parseFloat(V_s2p) && parseFloat(sep1R[i+1][sxn]) == bn)) ||  (parseInt(sep1R[i+1][sxn]) > bn &&  parseFloat(sep1R[i][sx2p]) >= parseFloat(V_s2p)) )  ){
                dataS1_2P[dataS1_2P.length] = [parseInt(sep1R[i][sxn]),parseInt(sep1R[i][sxz])];
                if ( i > 2 && dataS1_2P[parseInt(parseInt(dataS1_2P.length)-2)][1] == 120){
                    dataS1_2P.splice(parseInt(dataS1_2P.length)-1,1);
                }
                break
            }
        }
        //UNEDF1
        //document.getElementById('demo1').innerHTML = "HELLO ";
        k = sep2R.length;
        for (i=0;i<k;i++){
            if (parseInt(sep2R[i][sxn]) == bn && sep2R[i][sx2p] != "No_Data" && ((parseFloat(sep2R[i][sx2p]) >= parseFloat(V_s2p) && parseFloat(sep2R[i+1][sx2p]) < parseFloat(V_s2p)) ||  ( parseInt(sep2R[i+1][sxn]) > bn &&  parseFloat(sep2R[i][sx2p]) >= parseFloat(V_s2p) ) )   ){
                dataS2_2P[dataS2_2P.length] = [parseInt(sep2R[i][sxn]),parseInt(sep2R[i][sxz])];
                break
            }
        }
        //SKMS
        k = sep3R.length;
        for (i=0;i<k;i++){
            if (parseInt(sep3R[i][sxn]) == bn && sep3R[i][sx2p] != "No_Data" && ((parseFloat(sep3R[i][sx2p]) >= parseFloat(V_s2p) && parseFloat(sep3R[i+1][sx2p]) < parseFloat(V_s2p)) ||  ( parseInt(sep3R[i+1][sxn]) > bn &&  parseFloat(sep3R[i][sx2p]) >= parseFloat(V_s2p) ) )   ){
                dataS3_2P[dataS3_2P.length] = [parseInt(sep3R[i][sxn]),parseInt(sep3R[i][sxz])];
                break
            }
        }
        //SKP
        k = sep4R.length;
        for (i=0;i<k;i++){
            if (parseInt(sep4R[i][sxn]) == bn && sep4R[i][sx2p] != "No_Data" && ((parseFloat(sep4R[i][sx2p]) >= parseFloat(V_s2p) && parseFloat(sep4R[i+1][sx2p]) < parseFloat(V_s2p)) ||  ( parseInt(sep4R[i+1][sxn]) > bn &&  parseFloat(sep4R[i][sx2p]) >= parseFloat(V_s2p) ) )   ){
                dataS4_2P[dataS4_2P.length] = [parseInt(sep4R[i][sxn]),parseInt(sep4R[i][sxz])];
                break
            }
        }
        //SLY4
        k = sep5R.length;
        for (i=0;i<k;i++){
            if (parseInt(sep5R[i][sxn]) == bn && sep5R[i][sx2p] != "No_Data" && ((parseFloat(sep5R[i][sx2p]) >= parseFloat(V_s2p) && parseFloat(sep5R[i+1][sx2p]) < parseFloat(V_s2p)) ||  ( parseInt(sep5R[i+1][sxn]) > bn &&  parseFloat(sep5R[i][sx2p]) >= parseFloat(V_s2p) ) )   ){
                dataS5_2P[dataS5_2P.length] = [parseInt(sep5R[i][sxn]),parseInt(sep5R[i][sxz])];
                break
            }
        }
        //SV-MIN
        k = sep6R.length;
        for (i=0;i<k;i++){
            if (parseInt(sep6R[i][sxn]) == bn && sep6R[i][sx2p] != "No_Data" && ((parseFloat(sep6R[i][sx2p]) >= parseFloat(V_s2p) && parseFloat(sep6R[i+1][sx2p]) < parseFloat(V_s2p)) ||  ( parseInt(sep6R[i+1][sxn]) > bn &&  parseFloat(sep6R[i][sx2p]) >= parseFloat(V_s2p) ) )   ){
                dataS6_2P[dataS6_2P.length] = [parseInt(sep6R[i][sxn]),parseInt(sep6R[i][sxz])];
                break
            }
        }
  }

    //document.getElementById('demo1').innerHTML = "HELLO "+" , "+dataS1_2P[parseInt(dataS1_2P.length)-2];//;[dataS5_2P.length-3]+"<br>"+dataS5_2P[dataS5_2P.length-2]+"<br>"+dataS5_2P[dataS5_2P.length-3];
    

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
            split: false,
            distance: 30,
            padding: 5,
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
            data: avgDripN,
            color:'#000000',
            visible:true
        },
                
        {
            name: label7,
            data: avgDripZ,
            color:'#000000',
            visible:true
        }
   
        ]
        
        
        
    
    
    });
});

}
}
