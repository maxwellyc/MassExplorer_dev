
//create g.s. energy object, then create separation energy array.

//create object with properties(key,id) i.e. for Oxygen 16 it will be {8N8: HFB_energy_LN}, this should be done without dripline analysis in the first place.
var GSE = {UNEDF0:{}, UNEDF1:{}, SKMS:{}, SKP:{}, SLY4:{}, SV_MIN:{}};

var SPE_2P = {UNEDF0:{}, UNEDF1:{}, SKMS:{}, SKP:{}, SLY4:{}, SV_MIN:{}};
var SPE_2N = {UNEDF0:{}, UNEDF1:{}, SKMS:{}, SKP:{}, SLY4:{}, SV_MIN:{}};


var EDF_db1 = {UNEDF0:S_UNEDF0, UNEDF1:S_UNEDF1, SKMS:S_SKMS, SKP:S_SKP, SLY4:S_SLY4,SV_MIN:S_SV_MIN};

var split = {UNEDF0:S_UNEDF0.split(" "), UNEDF1:S_UNEDF1.split(" "), SKMS:S_SKMS.split(" "), SKP:S_SKP.split(" "), SLY4:S_SLY4.split(" "),SV_MIN:S_SV_MIN.split(" ")}
//create a huge array, each array element is a word or data (float number).

//find index of labels in first array element of split
var NLoc_0 = split.UNEDF0.indexOf("N");
var ZLoc_0 = split.UNEDF0.indexOf("Z");

//find index of the value of N,Z,data in the first line of actual data, i.e HE 2 2
var NLoc = parseInt(NLoc_0 + 30, 10);
var ZLoc = parseInt(ZLoc_0 + 30, 10);
var dataLoc_0 = split.UNEDF0.indexOf('HFB_Energy_LN');//locate g.s. energy.
var dataLoc_N0 = dataLoc_0 - NLoc_0;
var xn = NLoc;
var xz = ZLoc;
var az = split.UNEDF0[xz];
var an = split.UNEDF0[xn];
var az_s = az.toString();
var an_s = an.toString();
var prp = az_s+"N"+an_s;
var len_split1 = split.UNEDF0.length;
var num_col = parseInt(len_split1/30.0)-1;

//UNEDF0 ground state energy object;
for ( var i = 0 ; i< num_col ; i += 1 ){
    az = parseInt(split.UNEDF0[xz]+0.0001);
    an = parseInt(split.UNEDF0[xn]+0.0001);
    az_s = az.toString();
    an_s = an.toString();
    prp = az_s+"N"+an_s
    GSE.UNEDF0[prp] = split.UNEDF0[parseInt(dataLoc_N0+xn,10)];
    xz += 30;
    xn += 30;
}
xn = NLoc;
xz = ZLoc;

//UNEDF1 ground state energy object;
for ( var i = 0 ; i< num_col ; i += 1 ){
    az = parseInt(split.UNEDF1[xz]+0.0001);
    an = parseInt(split.UNEDF1[xn]+0.0001);
    az_s = az.toString();
    an_s = an.toString();
    prp = az_s+"N"+an_s
    GSE.UNEDF1[prp] = split.UNEDF1[parseInt(dataLoc_N0+xn,10)];
    xz += 30;
    xn += 30;
}
xn = NLoc;
xz = ZLoc;

//SKP ground state energy object;
for ( var i = 0 ; i< num_col ; i += 1 ){
    az = parseInt(split.SKP[xz]+0.0001);
    an = parseInt(split.SKP[xn]+0.0001);
    az_s = az.toString();
    an_s = an.toString();
    prp = az_s+"N"+an_s
    GSE.SKP[prp] = split.SKP[parseInt(dataLoc_N0+xn,10)];
    xz += 30;
    xn += 30;
}
xn = NLoc;
xz = ZLoc;

//SKMS ground state energy object;
for ( var i = 0 ; i< num_col ; i += 1 ){
    az = parseInt(split.SKMS[xz]+0.0001);
    an = parseInt(split.SKMS[xn]+0.0001);
    az_s = az.toString();
    an_s = an.toString();
    prp = az_s+"N"+an_s
    GSE.SKMS[prp] = split.SKMS[parseInt(dataLoc_N0+xn,10)];
    xz += 30;
    xn += 30;
}
xn = NLoc;
xz = ZLoc;

//SLY4 ground state energy object;
for ( var i = 0 ; i< num_col ; i += 1 ){
    az = parseInt(split.SLY4[xz]+0.0001);
    an = parseInt(split.SLY4[xn]+0.0001);
    az_s = az.toString();
    an_s = an.toString();
    prp = az_s+"N"+an_s
    GSE.SLY4[prp] = split.SLY4[parseInt(dataLoc_N0+xn,10)];
    xz += 30;
    xn += 30;
}
xn = NLoc;
xz = ZLoc;

//SV_MIN ground state energy object;
for ( var i = 0 ; i< num_col ; i += 1 ){
    az = parseInt(split.SV_MIN[xz]+0.0001);
    an = parseInt(split.SV_MIN[xn]+0.0001);
    az_s = az.toString();
    an_s = an.toString();
    prp = az_s+"N"+an_s
    GSE.SV_MIN[prp] = split.SV_MIN[parseInt(dataLoc_N0+xn,10)];
    xz += 30;
    xn += 30;
}
xn = NLoc;
xz = ZLoc;

var GSEprp = "2N2";
var prevElem_2p = "2N2";
var prevElem_2n = "2N2";
var bz = 2, bn = 2;

//!!!!!!!!!!!!Separation energy object for UNEDF0, e.g. for He4's S_2p = SPE_2P.UNEDF0[2N2]!!!!!!!!!!!!!!!!!!!

//UNEDF0
for ( bz = 2; bz < 121; bz += 2 ){
    for ( bn = 2; bn < 301; bn += 2 ){
        GSEprp = bz.toString() + 'N' + bn.toString();
        prev_bz = bz-2;
        prev_bn = bn-2;
        prevElem_2p = prev_bz.toString() + 'N' + bn.toString();
        prevElem_2n = bz.toString() + 'N' + prev_bn.toString();
        
        
        if ( GSE.UNEDF0[GSEprp] != undefined && ( GSE.UNEDF0[prevElem_2p] === undefined || GSE.UNEDF0[prevElem_2n] === undefined) ){
            SPE_2P.UNEDF0[GSEprp] = "NA";
            SPE_2N.UNEDF0[GSEprp] = "NA";
        }
        else{
            SPE_2P.UNEDF0[GSEprp] = (GSE.UNEDF0[prevElem_2p] - GSE.UNEDF0[GSEprp]).toFixed(6);
            SPE_2N.UNEDF0[GSEprp] = (GSE.UNEDF0[prevElem_2n] - GSE.UNEDF0[GSEprp]).toFixed(6);
        }
    }
}

//UNEDF1
for ( bz = 2; bz < 121; bz += 2 ){
    for ( bn = 2; bn < 301; bn += 2 ){
        GSEprp = bz.toString() + 'N' + bn.toString();
        prev_bz = bz-2;
        prev_bn = bn-2;
        prevElem_2p = prev_bz.toString() + 'N' + bn.toString();
        prevElem_2n = bz.toString() + 'N' + prev_bn.toString();
        
        
        if ( GSE.UNEDF1[GSEprp] != undefined && ( GSE.UNEDF1[prevElem_2p] === undefined || GSE.UNEDF1[prevElem_2n] === undefined) ){
            SPE_2P.UNEDF1[GSEprp] = "NA";
            SPE_2N.UNEDF1[GSEprp] = "NA";
        }
        else{
            SPE_2P.UNEDF1[GSEprp] = (GSE.UNEDF1[prevElem_2p] - GSE.UNEDF1[GSEprp]).toFixed(6);
            SPE_2N.UNEDF1[GSEprp] = (GSE.UNEDF1[prevElem_2n] - GSE.UNEDF1[GSEprp]).toFixed(6);
        }
    }
}

//SKP
for ( bz = 2; bz < 121; bz += 2 ){
    for ( bn = 2; bn < 301; bn += 2 ){
        GSEprp = bz.toString() + 'N' + bn.toString();
        prev_bz = bz-2;
        prev_bn = bn-2;
        prevElem_2p = prev_bz.toString() + 'N' + bn.toString();
        prevElem_2n = bz.toString() + 'N' + prev_bn.toString();
        
        
        if ( GSE.SKP[GSEprp] != undefined && ( GSE.SKP[prevElem_2p] === undefined || GSE.SKP[prevElem_2n] === undefined) ){
            SPE_2P.SKP[GSEprp] = "NA";
            SPE_2N.SKP[GSEprp] = "NA";
        }
        else{
            SPE_2P.SKP[GSEprp] = (GSE.SKP[prevElem_2p] - GSE.SKP[GSEprp]).toFixed(6);
            SPE_2N.SKP[GSEprp] = (GSE.SKP[prevElem_2n] - GSE.SKP[GSEprp]).toFixed(6);
        }
    }
}

//SKMS
for ( bz = 2; bz < 121; bz += 2 ){
    for ( bn = 2; bn < 301; bn += 2 ){
        GSEprp = bz.toString() + 'N' + bn.toString();
        prev_bz = bz-2;
        prev_bn = bn-2;
        prevElem_2p = prev_bz.toString() + 'N' + bn.toString();
        prevElem_2n = bz.toString() + 'N' + prev_bn.toString();
        
        
        if ( GSE.SKMS[GSEprp] != undefined && ( GSE.SKMS[prevElem_2p] === undefined || GSE.SKMS[prevElem_2n] === undefined) ){
            SPE_2P.SKMS[GSEprp] = "NA";
            SPE_2N.SKMS[GSEprp] = "NA";
        }
        else{
            SPE_2P.SKMS[GSEprp] = (GSE.SKMS[prevElem_2p] - GSE.SKMS[GSEprp]).toFixed(6);
            SPE_2N.SKMS[GSEprp] = (GSE.SKMS[prevElem_2n] - GSE.SKMS[GSEprp]).toFixed(6);
        }
    }
}

//SLY4
for ( bz = 2; bz < 121; bz += 2 ){
    for ( bn = 2; bn < 301; bn += 2 ){
        GSEprp = bz.toString() + 'N' + bn.toString();
        prev_bz = bz-2;
        prev_bn = bn-2;
        prevElem_2p = prev_bz.toString() + 'N' + bn.toString();
        prevElem_2n = bz.toString() + 'N' + prev_bn.toString();
        
        
        if ( GSE.SLY4[GSEprp] != undefined && ( GSE.SLY4[prevElem_2p] === undefined || GSE.SLY4[prevElem_2n] === undefined) ){
            SPE_2P.SLY4[GSEprp] = "NA";
            SPE_2N.SLY4[GSEprp] = "NA";
        }
        else{
            SPE_2P.SLY4[GSEprp] = (GSE.SLY4[prevElem_2p] - GSE.SLY4[GSEprp]).toFixed(6);
            SPE_2N.SLY4[GSEprp] = (GSE.SLY4[prevElem_2n] - GSE.SLY4[GSEprp]).toFixed(6);
        }
    }
}

//SV_MIN
for ( bz = 2; bz < 121; bz += 2 ){
    for ( bn = 2; bn < 301; bn += 2 ){
        GSEprp = bz.toString() + 'N' + bn.toString();
        prev_bz = bz-2;
        prev_bn = bn-2;
        prevElem_2p = prev_bz.toString() + 'N' + bn.toString();
        prevElem_2n = bz.toString() + 'N' + prev_bn.toString();
        
        
        if ( GSE.SV_MIN[GSEprp] != undefined && ( GSE.SV_MIN[prevElem_2p] === undefined || GSE.SV_MIN[prevElem_2n] === undefined) ){
            SPE_2P.SV_MIN[GSEprp] = 'NA';
            SPE_2N.SV_MIN[GSEprp] = 'NA';
        }
        else{
            SPE_2P.SV_MIN[GSEprp] = (GSE.SV_MIN[prevElem_2p] - GSE.SV_MIN[GSEprp]).toFixed(6);
            SPE_2N.SV_MIN[GSEprp] = (GSE.SV_MIN[prevElem_2n] - GSE.SV_MIN[GSEprp]).toFixed(6);
        }
    }
}