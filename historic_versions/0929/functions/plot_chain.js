var Z_SP=0;
var EDF_name = "UNEDF0";
var datatype = "HFB_Energy_LN"
var UnitP = "";
var chain = "";
//FILTER FUNCTION, PLUS CHECKBOX SELECTION OF WHAT DATA TO PLOT.
function PlotInput(chain, Z_SP, datatype){
    //this "text" can be changed into a list or string to output various element, let's try single input proton number first:
    var x, y, text;
    text = '';
    var e1 = document.getElementById("Datatype_singleplot");
//    var e2 = document.getElementById("EDF_singleplot");
  //   EDF_label = e2.options[e2.selectedIndex].text;
     data_label = e1.options[e1.selectedIndex].text;
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
        else {
            document.getElementById('plotErr').innerHTML = '';
            Plot(chain,Z, datatype);
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
        else {
            document.getElementById('plotErr').innerHTML = '';
            Plot(chain,N, datatype);
        }
    }
    //Isobar
    else if (chain == 'AN'|| chain == 'AZ') {
        A = Z_SP;
        var xa = parseFloat(A,10);
        var a1 = parseInt(A,10)+1;
        if ( isNaN(A) || A<3 ||A>420 || !((xa|0)===xa) || parseInt(A/2,10) != parseInt(a1/2,10) ){
            //pick even A within 1~420:
            document.getElementById('plotErr').innerHTML = "Please enter an even mass number between 4 and 420";
        }
        else {
            document.getElementById('plotErr').innerHTML = '';
            Plot(chain,A, datatype);
        }
        
    }
    
}

//Plot Function for Isotope/Isotone/Isobar
function Plot(chainChoice,Z_P, data_P){
    var Elem = "";
    var Elem1 = "";
    var data1 = [], data2 = [], data3 = [], data4 = [], data5 = [], data6 = []; //create data array, consists of arrays(coordinate).
    var az = parseInt(Z_P,10); // set proton number
    var an = az; //set N
    var aa = az; //set A
    var EDF_db = {UNEDF0:SA_UNEDF0, UNEDF1:SA_UNEDF1, SKMS:SA_SKMS, SKP:SA_SKP, SLY4:SA_SLY4,SV_MIN:SA_SV_MIN};
    
    //convert into Alphabetical names for 104+ elements
    var UuElem_name = {"04":"Rf","06":"Sg","08":"Hs","10":"Ds","12":"Cn","14":"Fl","16":"Lv","18":"Uuo","20":"Ubn"};
    
    var Data_V = 0;
    var count = 0;
    //label for legends
    var label1 = '', label2 = '', label3 = '', label4 = '', label5 = '', label6 = '', label8 = '';
    
    // load UNEDF0 data for line plot
    if (true){
        label1 = "UNEDF0";
        var f1 = EDF_db["UNEDF0"]; // choose EDF string
        var split_f1 = f1.split(" ");// split_f1 is "array"ed, contains whole database of the chosen EDF
        //find index of labels in first element of split_f2.
        var NLoc_1 = split_f1.indexOf("N");
        var ZLoc_1 = split_f1.indexOf("Z");
        var ALoc_1 = split_f1.indexOf("A");
        var dataLoc_1 = split_f1.indexOf(data_P);
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
        //for tooltip, reflects variable on X axis
        var chainX = '';
            //For Isotope
            if (chainChoice == 'Z'){
                chainX = 'N';
                for ( i = 0; i<5000 ; i++ ){
                    if (az == split_f1[xz1]){
                        var Data_V1 = split_f1[parseInt(dataLoc_Z1+xz1,10)];
                        data1[data1.length] = [parseFloat(split_f1[parseInt(xz1+1,10)]),parseFloat(Data_V1)];
                        var Elem = split_f1[parseInt(xz1 - 1,10)]; //for UNEDF0.dat element name is right in front of Z
                        xz1 += 30;
                        if ( az > 102 ){
                            var Elem1 = UuElem_name[Elem+""];
                            var Elem = Elem1+"";
                        }
                    }
                    else{
                        count += 1;
                        xz1 += 30;
                    }
                }
            }
            //For Isotone
            if ( chainChoice == 'N'){
                chainX = 'Z';
                for ( i = 0; i<5000 ; i++ ){
                    if (an == split_f1[xn1]){
                        Data_V1 = split_f1[parseInt(dataLoc_N1+xn1,10)];
                        data1[data1.length] = [parseFloat(split_f1[parseInt(-1+xn1,10)]),parseFloat(Data_V1)]; //Z as x-axis
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
                for ( i = 0; i<5000 ; i++ ){
                    if (aa == split_f1[xa1]){
                        var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                        data1[data1.length] = [parseFloat(split_f1[parseInt(xa1-1,10)]),parseFloat(Data_V1)];
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
                for ( i = 0; i<5000 ; i++ ){
                    if (aa == split_f1[xa1]){
                        var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                        data1[data1.length] = [parseFloat(split_f1[parseInt(xa1-2,10)]),parseFloat(Data_V1)];
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
    
    // load UNEDF1 data for line plot
    if (true){
        label2 = "UNEDF1";
        var f1 = EDF_db["UNEDF1"]; // choose EDF string
        var split_f1 = f1.split(" ");// split_f1 is "array"ed, contains whole database of the chosen EDF
        //find index of labels in first element of split_f2.
        var NLoc_1 = split_f1.indexOf("N");
        var ZLoc_1 = split_f1.indexOf("Z");
        var ALoc_1 = split_f1.indexOf("A");
        var dataLoc_1 = split_f1.indexOf(data_P);
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
        //For Isotope
        if (chainChoice == 'Z'){
            for ( i = 0; i<5000 ; i++ ){
                if (az == split_f1[xz1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_Z1+xz1,10)];
                    data2[data2.length] = [parseFloat(split_f1[parseInt(xz1+1,10)]),parseFloat(Data_V1)];
                    var Elem = split_f1[parseInt(xz1 - 1,10)]; //for UNEDF0.dat element name is right in front of Z
                    xz1 += 30;
                    if ( az > 102 ){
                        var Elem1 = UuElem_name[Elem+""];
                        var Elem = Elem1+"";
                    }
                }
                else{
                    count += 1;
                    xz1 += 30;
                }
            }
        }
        //For Isotone
        if ( chainChoice == 'N'){
            for ( i = 0; i<5000 ; i++ ){
                if (an == split_f1[xn1]){
                    Data_V1 = split_f1[parseInt(dataLoc_N1+xn1,10)];
                    data2[data2.length] = [parseFloat(split_f1[parseInt(-1+xn1,10)]),parseFloat(Data_V1)]; //Z as x-axis
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data2[data2.length] = [parseFloat(split_f1[parseInt(xa1-1,10)]),parseFloat(Data_V1)];
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data2[data2.length] = [parseFloat(split_f1[parseInt(xa1-2,10)]),parseFloat(Data_V1)];
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
    

    // load SKMS data for line plot
    if (true){
        label3 = "SkM"+"*".sup();
        var f1 = EDF_db["SKMS"]; // choose EDF string
        var split_f1 = f1.split(" ");// split_f1 is "array"ed, contains whole database of the chosen EDF
        //find index of labels in first element of split_f2.
        var NLoc_1 = split_f1.indexOf("N");
        var ZLoc_1 = split_f1.indexOf("Z");
        var ALoc_1 = split_f1.indexOf("A");
        var dataLoc_1 = split_f1.indexOf(data_P);
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
        //For Isotope
        if (chainChoice == 'Z'){
            for ( i = 0; i<5000 ; i++ ){
                if (az == split_f1[xz1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_Z1+xz1,10)];
                    data3[data3.length] = [parseFloat(split_f1[parseInt(xz1+1,10)]),parseFloat(Data_V1)];
                    var Elem = split_f1[parseInt(xz1 - 1,10)]; //for UNEDF0.dat element name is right in front of Z
                    xz1 += 30;
                    if ( az > 102 ){
                        var Elem1 = UuElem_name[Elem+""];
                        var Elem = Elem1+"";
                    }
                }
                else{
                    count += 1;
                    xz1 += 30;
                }
            }
        }
        //For Isotone
        if ( chainChoice == 'N'){
            for ( i = 0; i<5000 ; i++ ){
                if (an == split_f1[xn1]){
                    Data_V1 = split_f1[parseInt(dataLoc_N1+xn1,10)];
                    data3[data3.length] = [parseFloat(split_f1[parseInt(-1+xn1,10)]),parseFloat(Data_V1)]; //Z as x-axis
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data3[data3.length] = [parseFloat(split_f1[parseInt(xa1-1,10)]),parseFloat(Data_V1)];
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data3[data3.length] = [parseFloat(split_f1[parseInt(xa1-2,10)]),parseFloat(Data_V1)];
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
    
    // load SKP data for line plot
    if (true){
        label4 = "SkP";
        var f1 = EDF_db["SKP"]; // choose EDF string
        var split_f1 = f1.split(" ");// split_f1 is "array"ed, contains whole database of the chosen EDF
        //find index of labels in first element of split_f2.
        var NLoc_1 = split_f1.indexOf("N");
        var ZLoc_1 = split_f1.indexOf("Z");
        var ALoc_1 = split_f1.indexOf("A");
        var dataLoc_1 = split_f1.indexOf(data_P);
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
        //For Isotope
        if (chainChoice == 'Z'){
            for ( i = 0; i<5000 ; i++ ){
                if (az == split_f1[xz1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_Z1+xz1,10)];
                    data4[data4.length] = [parseFloat(split_f1[parseInt(xz1+1,10)]),parseFloat(Data_V1)];
                    var Elem = split_f1[parseInt(xz1 - 1,10)]; //for UNEDF0.dat element name is right in front of Z
                    xz1 += 30;
                    if ( az > 102 ){
                        var Elem1 = UuElem_name[Elem+""];
                        var Elem = Elem1+"";
                    }
                }
                else{
                    count += 1;
                    xz1 += 30;
                }
            }
        }
        //For Isotone
        if ( chainChoice == 'N'){
            for ( i = 0; i<5000 ; i++ ){
                if (an == split_f1[xn1]){
                    Data_V1 = split_f1[parseInt(dataLoc_N1+xn1,10)];
                    data4[data4.length] = [parseFloat(split_f1[parseInt(-1+xn1,10)]),parseFloat(Data_V1)]; //Z as x-axis
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data4[data4.length] = [parseFloat(split_f1[parseInt(xa1-1,10)]),parseFloat(Data_V1)];
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data4[data4.length] = [parseFloat(split_f1[parseInt(xa1-2,10)]),parseFloat(Data_V1)];
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
    
    // load SLY4 data for line plot
    if (true){
        label5 = "SLy4";
        var f1 = EDF_db["SLY4"]; // choose EDF string
        var split_f1 = f1.split(" ");// split_f1 is "array"ed, contains whole database of the chosen EDF
        //find index of labels in first element of split_f2.
        var NLoc_1 = split_f1.indexOf("N");
        var ZLoc_1 = split_f1.indexOf("Z");
        var ALoc_1 = split_f1.indexOf("A");
        var dataLoc_1 = split_f1.indexOf(data_P);
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
        //For Isotope
        if (chainChoice == 'Z'){
            for ( i = 0; i<5000 ; i++ ){
                if (az == split_f1[xz1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_Z1+xz1,10)];
                    data5[data5.length] = [parseFloat(split_f1[parseInt(xz1+1,10)]),parseFloat(Data_V1)];
                    var Elem = split_f1[parseInt(xz1 - 1,10)]; //for UNEDF0.dat element name is right in front of Z
                    xz1 += 30;
                    if ( az > 102 ){
                        var Elem1 = UuElem_name[Elem+""];
                        var Elem = Elem1+"";
                    }
                }
                else{
                    count += 1;
                    xz1 += 30;
                }
            }
        }
        //For Isotone
        if ( chainChoice == 'N'){
            for ( i = 0; i<5000 ; i++ ){
                if (an == split_f1[xn1]){
                    Data_V1 = split_f1[parseInt(dataLoc_N1+xn1,10)];
                    data5[data5.length] = [parseFloat(split_f1[parseInt(-1+xn1,10)]),parseFloat(Data_V1)]; //Z as x-axis
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data5[data5.length] = [parseFloat(split_f1[parseInt(xa1-1,10)]),parseFloat(Data_V1)];
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data5[data5.length] = [parseFloat(split_f1[parseInt(xa1-2,10)]),parseFloat(Data_V1)];
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
    
    // load SV-MIN data for line plot
    if (true){
        label6 = "SV-min";
        var f1 = EDF_db["SV_MIN"]; // choose EDF string
        var split_f1 = f1.split(" ");// split_f1 is "array"ed, contains whole database of the chosen EDF
        //find index of labels in first element of split_f2.
        var NLoc_1 = split_f1.indexOf("N");
        var ZLoc_1 = split_f1.indexOf("Z");
        var ALoc_1 = split_f1.indexOf("A");
        var dataLoc_1 = split_f1.indexOf(data_P);
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
        //For Isotope
        if (chainChoice == 'Z'){
            for ( i = 0; i<5000 ; i++ ){
                if (az == split_f1[xz1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_Z1+xz1,10)];
                    data6[data6.length] = [parseFloat(split_f1[parseInt(xz1+1,10)]),parseFloat(Data_V1)];
                    var Elem = split_f1[parseInt(xz1 - 1,10)]; //for UNEDF0.dat element name is right in front of Z
                    xz1 += 30;
                    if ( az > 102 ){
                        var Elem1 = UuElem_name[Elem+""];
                        var Elem = Elem1+"";
                    }
                }
                else{
                    count += 1;
                    xz1 += 30;
                }
            }
        }
        //For Isotone
        if ( chainChoice == 'N'){
            for ( i = 0; i<5000 ; i++ ){
                if (an == split_f1[xn1]){
                    Data_V1 = split_f1[parseInt(dataLoc_N1+xn1,10)];
                    data6[data6.length] = [parseFloat(split_f1[parseInt(-1+xn1,10)]),parseFloat(Data_V1)]; //Z as x-axis
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data6[data6.length] = [parseFloat(split_f1[parseInt(xa1-1,10)]),parseFloat(Data_V1)];
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
            for ( i = 0; i<5000 ; i++ ){
                if (aa == split_f1[xa1]){
                    var Data_V1 = split_f1[parseInt(dataLoc_A1+xa1,10)];
                    data6[data6.length] = [parseFloat(split_f1[parseInt(xa1-2,10)]),parseFloat(Data_V1)];
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


    
    //AVERAGE DATA CALCULATION:
    var N_avg;
    var Avg_store = 0;
    var baseN = 0.0;
    var avgData = [];
    var filter1, filter2, filter3, filter4, filter5, filter6;
    for (N_avg = 2; N_avg <301 ; N_avg+=2){
        if (true){
            filter1 = 0;
            for (i = 0; i<data1.length; i++){
                if ( (data1[i])[0] == N_avg ){
                    Avg_store += parseFloat((data1[i])[1]);
                    baseN++;
                    filter1 = 1;
                    break
                }
            }
        }
        
        if (true){
            filter2 = 0;
            for (i = 0; i<data2.length; i++){
                if ( (data2[i])[0] == N_avg ){
                    Avg_store += parseFloat((data2[i])[1]);
                    baseN++;
                    filter2 = 1;
                    break
                }
            }
        }
        
        if (true){
            filter3 = 0;
            for (i = 0; i<data3.length; i++){
                if ( (data3[i])[0] == N_avg ){
                    Avg_store += parseFloat((data3[i])[1]);
                    baseN++;
                    filter3 = 1;
                    break
                }
            }
        }
        
        if (true){
            filter4 = 0;
            for (i = 0; i<data4.length; i++){
                if ( (data4[i])[0] == N_avg ){
                    Avg_store += parseFloat((data4[i])[1]);
                    baseN++;
                    filter4 = 1;
                    break
                }
            }
        }
        
        if (true){
            filter5 = 0;
            for (i = 0; i<data5.length; i++){
                if ( (data5[i])[0] == N_avg ){
                    Avg_store += parseFloat((data5[i])[1]);
                    baseN++;
                    filter5 = 1;
                    break
                }
            }
        }
        
        if (true){
            filter6 = 0;
            for (i = 0; i<data6.length; i++){
                if ( (data6[i])[0] == N_avg ){
                    Avg_store += parseFloat((data6[i])[1]);
                    baseN++;
                    filter6 = 1;
                    break
                }
            }
        }
        avg_Value = Avg_store/baseN;
        if (filter1 || filter2 || filter3 || filter4 || filter5 || filter6){
        avgData[avgData.length] = [parseFloat(N_avg) , parseFloat(avg_Value)];
        }
        baseN = 0;
        Avg_store = 0;
    }
    
    
    
        var xx = parseInt(dataLoc_Z1-1, 10);

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
            UnitP = "(fm"+"2".sup()+")";
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

    var label8 = 'Average';
    //document.getElementById('flags').innerHTML = data1+"<br>"+xn1+"<br>"+xz1+"<br>"+an+"<br>"+az; //flag

    //plot dataset 1:UNEDF0, 2:UNEDF1, 3:SKM*, 4:SKP, 5:SLY4, 6:SV_MIN
    //Preferred order: 3, 4, 5, 6, 1, 2.
    /*
    var dataset = [
                   {data: data3, label: label3, lines:{show:(L3||L7)}, points:{show:(L3||L7)}, color: '#3399FF'},
                   {data: data4, label: label4, lines:{show:(L4||L7)}, points:{show:(L4||L7)}, color: '#AA4643'},
                   {data: data5, label: label5, lines:{show:(L5||L7)}, points:{show:(L5||L7)}, color: '#FF3399'},
                   {data: data6, label: label6, lines:{show:(L6||L7)}, points:{show:(L6||L7)}, color: '#339966'},
                   {data: data1, label: label1, lines:{show:(L1||L7)}, points:{show:(L1||L7)}, color:'#3333FF'},
                   {data: data2, label: label2, lines:{show:(L2||L7)}, points:{show:(L2||L7)}, color:'#FF9900'},
                   {data: avgData, label: label8, lines:{show:L8},points:{show:L8} ,color:'#000000'}
    ];
    */
    //x-Axis Label
    var xLabel;
    if (chainChoice == 'Z'){
        xLabel = 'Neutron Number';
        titleText = data_label + " of " + ElemN + " Isotopes"
    }
    if (chainChoice == 'N'){
        xLabel = 'Proton Number';
        titleText = data_label + " of N=" + an + " Isotones"
    }
    if (chainChoice == 'AN'){
        xLabel = 'Neutron Number';
        titleText = data_label + " of A=" + aa + " Isobars"
    }
    if (chainChoice == 'AZ'){
        xLabel = 'Proton Number';
        titleText = data_label + " of A=" + aa + " Isobars"
    }
    //document.getElementById('flag2').innerHTML = data1[2];
    
    
    
    
    
 $(function () {
    $('#singleElement').highcharts({
        credits: false,
        
        chart: {
            type: 'spline',
            //disable or change zoom type here:
            zoomType:'xy'
        },
        
        title: {
            text: titleText
        },
        /*
        subtitle: {
            text: 'Irregular time data in Highcharts JS'
        },
        */
        xAxis: {
            //check xAxis type attribute
            title: {
                text: xLabel
            },
            tickInterval:2,
            gridLineWidth:1
        
        },
        yAxis: {
            title: {
                useHTML: true,
                text: data_label+'  '+UnitP
            }
            
        },
        //try limiting effective digits here
        tooltip: {
            useHTML:true,
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: chainX+'='+'{point.x}, {point.y:.6f} '+UnitP
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true,
                    fillColor:'#FFFFFF',
                    symbol: 'circle',
                    radius:2.5,
                    lineColor:null,
                    lineWidth:2
                }
            }
        },
        //345612avg
        series: [
        
        {
            name: label3,
            data: data3,
            color: '#3399FF'
        },
        
        {
            name: label4,
            data: data4,
            color:'#AA4643'
        },
        
        {
            name: label5,
            data: data5,
            color:'#FF3399'
        },
        
        {
            name: label6,
            data: data6,
            color:'#339966'
        },
        
        {
            name: label1,
            data: data1,
            color:'#3333FF'
        },
        
        {
            name: label2,
            data: data2,
            color:'#ff9900'
        },
        
        {
            name: label8,
            data: avgData,
            color:'#000000'
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
    axisLabel: data_label+'  '+UnitP,
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