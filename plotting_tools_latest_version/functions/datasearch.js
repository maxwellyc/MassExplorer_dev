//document.getElementById('demo').innerHTML = SA_UNEDF0[100];
//function NZInput, filter correct input, redefine value for  Z,N;
            function NZInput(z,n,EDF_name)
            {
                
                var Z=1;
                var N=2;
                var trigger = 0;
                var dataname = document.getElementById("EDF_input_datatype").value;
                //this "text" can be changed into a list or string to output various element, let's try single input proton number first:
                var EDF_name_1 = EDF_name
                var  x,y, text;
                //Redefine N,Z value:
                var N = n;
                var Z = z;
                var x = parseFloat(z,10);
                var y = parseFloat(n,10);
                var z1 = parseInt(z,10)+1;
                var n1 = parseInt(n,10)+1;
                text = '';
                
                //!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
                //!*! Update: Apr 3rd 2017, adding binding energies of odd-A nuclei !*!*!*!*!*!*!*!*!*!*!*!*!
                //!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
                //if n,z (user inputs) are integers and between 1~120 / 1~300, x / y tests if z/n is integer and even number:
                //PROTON INPUT TEST:
                if ( isNaN(z) || z<1 ||z>120 || !( (x|0)===x ) )
                
                //pick integer Z within 1~120 only:
                {
                    document.getElementById('sortErr').innerHTML = "Please enter a proton number between 2 and 120";
                }
                //NEUTRON INPUT TEST:
                //pick integer N within 1~300 only:    
                else if ( isNaN(n) || n<1 ||n>300 || !((y|0)===y) )
                {
                    document.getElementById('sortErr').innerHTML = "Please enter a neutron number between 2 and 300";
                }
                
                else
                {
                    document.getElementById('sortErr').innerHTML = '';
                    //Element should be a string or list to correspond or call a function, change in future:
                    text = grab(EDF_name_1);
                }
                document.getElementById('dataOutput').innerHTML = text;
            }
        


            //include input for grab (EDF name), for choice of different EDF
            function grab(EDF_name_2)
            {
                
                var az = parseInt(document.getElementById('proton').value, 10);
                var an = parseInt(document.getElementById('neutron').value, 10);
                var dataname = document.getElementById("EDF_input_datatype").value;
                if (dataname == "Binding_Energy_(MeV)" || dataname == "S_p_(MeV)" || dataname == "S_{2p}_(MeV)" || dataname == "S_n_(MeV)" || dataname == "S_{2n}_(MeV)" || dataname == "Q_{alpha}_(MeV)" ){
                var EDF_db = {UNEDF0:S_UNEDF0, UNEDF1:S_UNEDF1, SKMS:S_SKMS, SKP:S_SKP, SLY4:S_SLY4,SV_MIN:S_SV_MIN};
                numOfCol = 10;
                }
                else {
                var EDF_db = {UNEDF0:SA_UNEDF0, UNEDF1:SA_UNEDF1, SKMS:SA_SKMS, SKP:SA_SKP, SLY4:SA_SLY4,SV_MIN:SA_SV_MIN};
                numOfCol = 25;
                }
                
                //choose f1, search function same as sort_v1.0, just changed which EDF data string to use.
                var split_f1 = EDF_db[EDF_name_2]
                
                //document.getElementById("demo").innerHTML = split_f1[209];//split_f1;//[210]=="C";//"hello"+split_f1[209]+"world";
                //create a huge array, each array element is a word or data (float number).
                //var split_f1 = f1.split(" ");
                
                //find index of labels in first array element of split_f1.
                var NLoc_0 = split_f1.indexOf("N");
                var ZLoc_0 = split_f1.indexOf("Z");
                //document.getElementById('demo1').innerHTML = NLoc_0+'<br>'+ZLoc_0;
                
                
                //find index of the value of N,Z,data in the first line of actual data, i.e HE 2 2
                var NLoc = parseInt(NLoc_0 + numOfCol, 10);
                var ZLoc = parseInt(ZLoc_0 + numOfCol, 10);
                //document.getElementById('demo1').innerHTML = NLoc+'<br>'+ZLoc;

                var xn = NLoc;
                var xz = ZLoc;
                //var count = 0;
                var Unit = "";
                var az1 = az + 1;
                var an1 = an + 1;
                var flag1 = 0;
                var flag2 = 0;
                
                
                    dataLoc_0 = split_f1.indexOf(dataname);
                    dataLoc_N0 = dataLoc_0 - NLoc_0; //relative position of data to N number.
                    xx = parseInt(dataLoc_N0, 10);
                    //!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
                    //Core loop that retrieves data:
                    //!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
                    for ( i=0 ; i<=20000 ; i++ )
                    {
                        if ( az == split_f1[xz] && an == split_f1[xn])
                        {
                            var DataV = split_f1[parseInt(dataLoc_N0+xn,10)];
                            flag = 1;
                            break
                        }
                        else
                        {
                            var Err_1 = "Nuclide not in database!"+" Please note data with odd nucleon numbers only exists for:<br> Binding energy, 1 or 2 nucleon separation energy and Q"+"&alpha;".sub() + " value";
                            flag = 0;
                            xn += numOfCol;
                            xz += numOfCol;
                        }
                    }
               // document.getElementById('demo1').innerHTML = split_f1[xn];//dataname+'<br>'+dataLoc_N0+'<br>'+numOfCol;
                
                /*
                //!!!!!WE CAN PROBABLY DELETE THIS SECTION FOR UNIT SUFFIX!!!!!!CHECK WHEN FILES ARE FIXED
                //Select Unit 4~17,24,25, MeV
                if ( (1< xx && xx<16) || (21 < xx && xx< 24) )
                {
                    Unit = "MeV";
                }
                else if ( 15 < xx && xx < 19)
                {
                    Unit = "";
                }
                else if (18< xx && xx <22)
                {
                    Unit = "fm" + "2".sup();
                }
                else if (23< xx && xx <28)
                {
                    Unit = "fm";
                }
                */
        
                //convert into Alphabetical names for Z>=104 elements
                var UuElem_name = {19:"Uue",20:"Ubn"};
                
                //Finding element name.
                if ((parseInt(az/2,10) != parseInt(az1/2,10) || parseInt(an/2,10) != parseInt(an1/2,10)) && dataname == 'HFB_Energy_LN' )
                {
                    OddNames = {"1":"H",}
                    Elem = OddNames[az+""];//odd cases element namelist needs manual input
                }
                else{
                for (i=0; i<=20000 ; i++ )
                {
                    if ( az == split_f1[xz] && an == split_f1[xn])
                    {
                        var Elem = split_f1[parseInt(xn - 2,10)]; //for 'UNEDF0.dat' element name is 2 spacing in front of label 'N'.
                        if ( az > 118 ) //Starting from element 104, the place for name is replaced by proton number minus 100
                        {
                            var Elem1 = UuElem_name[Elem+""];
                            var Elem = Elem1+"";
                        }
                        break
                    }
                    else
                    {
                        xn += numOfCol;
                        xz += numOfCol;
                        //count +=1; //count number of iteration
                        
                    }
                }
                }
               
                var e = document.getElementById("EDF_input_datatype");
                if (dataname == 'S_{2p}_(MeV)')
                {
                    name_disp = 'S' + '2p'.sub()+' (MeV)';
                }
                else if (dataname == 'S_{2n}_(MeV)')
                {
                    name_disp = 'S' + '2n'.sub()+' (MeV)';
                }
                else if (dataname == 'Quad_Def_Beta2_P')
                {
                    name_disp = '&beta;'+'2 proton'.sub();
                }
                else if (dataname == 'Quad_Def_Beta2_N')
                {
                    name_disp = '&beta;'+'2 neutron'.sub();
                }
                else if (dataname == 'Quad_Def_Beta2_total')
                {
                    name_disp = '&beta;'+'2 total'.sub();
                }
                
                else
                {
                var name_disp = e.options[e.selectedIndex].text;
                }
                
                
                if ( flag == 1 )
                {
                    if (dataLoc_0 != -1) //Check if Data name input is valid. If name doesn't show, dataLoc_0 will be -1
                    
                    {
                         var ElemName_Array = Elem.split("");
                        //Drop upper case of element name's 2nd letter for 2 Character Name
                        if (az < 104 && ElemName_Array.length == 2 && parseInt(az/2,10) == parseInt(az1/2,10) )
                        {
                            var ElemName1_Array = ElemName_Array;
                            var l_1 = ElemName1_Array[0]
                            var l_2 = ElemName1_Array[1].toLowerCase()
                            document.getElementById("test").src = "" ; //for error picture
                            return l_1 + l_2 + "(" +parseInt(az+an,10) + ")'s  " + name_disp + " = " + DataV + " " + Unit    //output data, unit unknown as of now.
                        }
                        else
                        {
                            return Elem + "(" +parseInt(az+an,10) + ")'s  " + name_disp + " = " + DataV + " " + Unit
                            //return requested data value
                        }


                        
                    }
                    
                    else
                    {
                        trigger = 1;
                        return "Cannot find Data Name in current database! Please check Data Name!"
                    }
                }
                else
                {
                    //document.getElementById("test").src = "images/shycat.jpg" ;//can put picture here
                    return Err_1;
                }
                
            

                
            }
        
