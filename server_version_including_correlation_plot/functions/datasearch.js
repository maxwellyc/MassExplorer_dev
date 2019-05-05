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
                if ( isNaN(z) || z<1 ||z>120 || !( (x|0)===x ) || ( parseInt(z/2,10) != parseInt(z1/2,10) && dataname != 'HFB_Energy_LN' ) )
                
                //pick integer Z within 1~120 only:
                {
                    document.getElementById('sortErr').innerHTML = "Please enter an even proton number between 2 and 120";
                }
                //NEUTRON INPUT TEST:
                //pick integer N within 1~300 only:    
                else if ( isNaN(n) || n<1 ||n>300 || !((y|0)===y) || ( parseInt(n/2,10) != parseInt(n1/2,10) && dataname != 'HFB_Energy_LN' ) )
                {
                    document.getElementById('sortErr').innerHTML = "Please enter an even neutron number between 2 and 300";
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
                // NeighBoring nucleus' binding energy , pairing gaps
                var nbBE1 = 0;
                var nbBE2 = 0;
                var nbPair1 = 0;
                var nbPair2 = 0;
                // other intermediate numbers needed for calculation
                var tempNum1 = 0;
                var tempNum2 = 0;
                var tempNum3 = 0;
                var tempNum4 = 0;
                //default target data to grab: HFB_Energy.
                //dataname = document.getElementById('name').value; //let user type in dataname and grab corresponding one.
                //while (dataname === "")
                //{
                //    dataname = "HFB_Energy_LN";    //if no input, grab data HFB_Energy;
                //}
                //create object of EDF, name from dropbox selection, value is string
                
                //drop down menu selection of data name
                
                var dataname = document.getElementById("EDF_input_datatype").value;
                var EDF_db = {UNEDF0:SA_UNEDF0, UNEDF1:SA_UNEDF1, SKMS:SA_SKMS, SKP:SA_SKP, SLY4:SA_SLY4,SV_MIN:SA_SV_MIN};
                
                //choose f1, search function same as sort_v1.0, just changed which EDF data string to use.
                var f1 = EDF_db[EDF_name_2]
                
                //create a huge array, each array element is a word or data (float number).
                var split_f1 = f1.split(" ");
                
                //find index of labels in first array element of split_f1.
                var NLoc_0 = split_f1.indexOf("N");
                var ZLoc_0 = split_f1.indexOf("Z");
                
                
                
                //find index of the value of N,Z,data in the first line of actual data, i.e HE 2 2
                var NLoc = parseInt(NLoc_0 + 30, 10);
                var ZLoc = parseInt(ZLoc_0 + 30, 10);
                
                var xn = NLoc;
                var xz = ZLoc;
                //var count = 0;
                var Unit = "";
                var az1 = az + 1;
                var an1 = an + 1;
                var flag1 = 0;
                var flag2 = 0;
                
                //separation energy not in original database, need to calculate by subtracting g.s. energies.
                if (dataname == 'S_2N')
                {
                    var dataLoc_0 = split_f1.indexOf('HFB_Energy_LN');//locate g.s. energy.
                    var dataLoc_N0 = dataLoc_0 - NLoc_0;
                    var xx = 2; //just to get Unit as MeV
                    for (i=0; i<=20000 ; i++ )
                    {
                        if ( az == split_f1[xz] && an == split_f1[xn])
                        {
                            var currentBE = -1.0*split_f1[parseInt(dataLoc_N0+xn,10)];
                            var prevBE = -1.0*split_f1[parseInt((dataLoc_N0+xn-30),10)];
                            if ( az == split_f1[xn-31] )
                            {
                                DataV = (currentBE-prevBE).toFixed(6);//6 digits decimal
                                flag = 1;
                            }
                            else
                            {
                                var Err_1 = "Separation energy not available!";
                                var flag = 0;
                            }
                            break
                        }
                        else
                        {
                            
                            flag = 0;
                            xn += 30;
                            xz += 30;
                            //count +=1; //count number of iteration
                            
                        }
                    }

                }
                
                else if (dataname == 'S_2P')
                {
                    var dataLoc_0 = split_f1.indexOf('HFB_Energy_LN');//locate g.s. energy.
                    var dataLoc_N0 = dataLoc_0 - NLoc_0;
                    var xx = 2; //just to get Unit as MeV
                    for (i=0; i<=20000 ; i++ )
                    {
                        if ( az == split_f1[xz] && an == split_f1[xn])
                        {
                            var currentBE = -1.0*split_f1[parseInt(dataLoc_N0+xn,10)];
                            var prevBE = -1.0*split_f1[parseInt((dataLoc_N0+xn),10)];
                            for ( j = 0; j<=1000 ; j++)
                            {
                                if ( (az-2) == split_f1[xz] && an == split_f1[xn])
                                {
                                    var prevBE = -1.0*split_f1[parseInt((dataLoc_N0+xn),10)];
                                    var flag = 1;
                                    break
                                }
                                else
                                {
                                    var Err_1 = "Separation energy not available!";
                                    flag = 0;
                                    xn -= 30;
                                    xz -= 30;
                                }
                            }
                            
                            DataV = (currentBE-prevBE).toFixed(6);//6 digits decimal
                            break
                        }
                        else
                        {
                            var Err_1 = "Nuclide not in database!";
                            xn += 30;
                            xz += 30;
                            //count +=1; //count number of iteration
                            
                        }
                    }
                    
                }
                
                //Need to calculate data for odd-A nuclei
                else if (dataname == 'HFB_Energy_LN' && (parseInt(az/2,10) != parseInt(az1/2,10) || parseInt(an/2,10) != parseInt(an1/2,10)) )
                {
                    var dataLoc_0 = split_f1.indexOf('HFB_Energy_LN');
                    var dataLoc_PGP = split_f1.indexOf('Pairing_gap_P') - NLoc_0;
                    var dataLoc_PGN = split_f1.indexOf('Pairing_gap_N') - NLoc_0;
                    var dataLoc_N0 = dataLoc_0 - NLoc_0;
                    xn = NLoc;
                    xz = ZLoc;
                    var xx = 2; //just to get Unit as MeV
                    //for odd Neutron data, nbBE1 is BE(z,n+1), nbBE2 is BE(z,n-1), nbPair1 is pairing gap (PG)
                    //PG(z,n+1), nbPair2 is PG(z,n-1), likewise for odd Proton data.
                    //even Z - odd N
                    if ( parseInt(az/2,10) == parseInt(az1/2,10) && parseInt(an/2,10) != parseInt(an1/2,10) )
                    {
                        for ( i=0 ; i<=20000 ; i++ )
                        {
                            if ( az == split_f1[xz] && an+1 == split_f1[xn])
                            {
                                nbBE1 = 1.0* split_f1[parseInt(dataLoc_N0+xn,10)];
                                nbBE2 = 1.0* split_f1[parseInt(dataLoc_N0+xn-30,10)];
                                nbPair1 = 1.0* split_f1[parseInt(dataLoc_PGN+xn,10)];
                                nbPair2 = 1.0* split_f1[parseInt(dataLoc_PGN+xn-30,10)];
                                DataV = ( 0.5* (nbBE1 + nbBE2 + nbPair1 + nbPair2) ).toFixed(6);
                                flag = 1;
                                break
                            }
                            else
                            {
                                var Err_1 = "Nuclide not in database!";
                                flag = 0;
                                xn += 30;
                                xz += 30;
                                //count +=1; //count number of iteration
                            }
                        }

                    }
                    
                    
                    //odd Z - even N
                    else if ( parseInt(az/2,10) != parseInt(az1/2,10) && parseInt(an/2,10) == parseInt(an1/2,10) )
                    {
                        for ( i=0 ; i<=20000 ; i++ )
                        {
                            if ( az-1 == split_f1[xz] && an == split_f1[xn])
                            {
                                nbBE1 = 1.0* split_f1[parseInt(dataLoc_N0+xn,10)];
                                nbPair1 = 1.0* split_f1[parseInt(dataLoc_PGP+xn,10)];
                                flag1 = 0.5;
                                break
                            }
                            else
                            {
                                var Err_1 = "Nuclide not in database!";
                                flag1 = 0;
                                xn += 30;
                                xz += 30;
                                //count +=1; //count number of iteration
                            }
                        }
                        for ( i=0 ; i<=400 ; i++ )
                        {
                            if ( az+1 == split_f1[xz] && an == split_f1[xn])
                            {
                                nbBE2 = 1.0* split_f1[parseInt(dataLoc_N0+xn,10)];
                                nbPair2 = 1.0* split_f1[parseInt(dataLoc_PGP+xn,10)];
                                flag2 = 0.5;
                                break
                            }
                            else
                            {
                                var Err_1 = "Nuclide not in database!";
                                flag2 = 0;
                                xn += 30;
                                xz += 30;
                                //count +=1; //count number of iteration
                            }
                            
                        }
                        flag = flag1 + flag2;
                        DataV = (0.5* (nbBE1 + nbBE2 + nbPair1 + nbPair2) ).toFixed(6);

                    }
                    
                    
                    //odd Z - odd N
                    else if ( parseInt(az/2,10) != parseInt(az1/2,10) && parseInt(an/2,10) != parseInt(an1/2,10) )
                    {
                        xn = NLoc;
                        xz = ZLoc;
                        for ( i=0 ; i<=20000 ; i++ )
                        {
                            if ( az+1 == split_f1[xz] && an+1 == split_f1[xn] )
                            {
                                nbBE1 = 1.0* split_f1[parseInt(dataLoc_N0+xn,10)];
                                nbBE2 = 1.0* split_f1[parseInt(dataLoc_N0+xn-30,10)];
                                nbPair1 = 1.0* split_f1[parseInt(dataLoc_PGN+xn,10)];
                                nbPair2 = 1.0* split_f1[parseInt(dataLoc_PGN+xn-30,10)];
                                tempNum1 = 0.5* (nbBE1 + nbBE2 + nbPair1 + nbPair2).toFixed(7);
                                nbPair1 = 1.0* split_f1[parseInt(dataLoc_PGP+xn,10)];
                                nbPair2 = 1.0* split_f1[parseInt(dataLoc_PGP+xn-30,10)];
                                tempNum3 = 0.5* ( nbPair1 + nbPair2 ).toFixed(7);
                                flag1 = 0.5;
                                break
                            }
                            else
                            {
                                var Err_1 = "Nuclide not in database!";
                                flag1 = 0;
                                xn += 30;
                                xz += 30;
                                //count +=1; //count number of iteration
                            }
                        }
                        
                        xn = NLoc;
                        xz = ZLoc;
                        for ( i=0 ; i<=20000 ; i++ )
                        {
                            if ( az-1 == split_f1[xz] && an+1 == split_f1[xn] )
                            {
                                nbBE1 = 1.0* split_f1[parseInt(dataLoc_N0+xn,10)];
                                nbBE2 = 1.0* split_f1[parseInt(dataLoc_N0+xn-30,10)];
                                nbPair1 = 1.0* split_f1[parseInt(dataLoc_PGN+xn,10)];
                                nbPair2 = 1.0* split_f1[parseInt(dataLoc_PGN+xn-30,10)];
                                tempNum2 = 0.5* (nbBE1 + nbBE2 + nbPair1 + nbPair2 ).toFixed(7);
                                nbPair1 = 1.0* split_f1[parseInt(dataLoc_PGP+xn,10)];
                                nbPair2 = 1.0* split_f1[parseInt(dataLoc_PGP+xn-30,10)];
                                tempNum4 = 0.5* ( nbPair1 + nbPair2 ).toFixed(7);
                                flag2 = 0.5;
                                break
                            }
                            else
                            {
                                var Err_1 = "Nuclide not in database!";
                                flag2 = 0;
                                xn += 30;
                                xz += 30;
                                //count +=1; //count number of iteration
                            }
                        }
                        flag = flag1 + flag2;
                        DataV = (0.5*(tempNum1 + tempNum2 + tempNum3 + tempNum4)).toFixed(6);
                        //document.getElementById('flag21').innerHTML = tempNum1 + ' , ' + tempNum2 + ' , ' + tempNum3 + ' , ' + tempNum4 + ' , ' + DataV ;

                    }
                }
                
                
                
                else
                {
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
                            DataV = split_f1[parseInt(dataLoc_N0+xn,10)];
                            flag = 1;
                            break
                        }
                        else
                        {
                            var Err_1 = "Nuclide not in database!";
                            flag = 0;
                            xn += 30;
                            xz += 30;
                            //count +=1; //count number of iteration
                            
                        }
                    }

                }
                
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
        
                //convert into Alphabetical names for Z>=104 elements
                var UuElem_name = {"04":"Rf","06":"Sg","08":"Hs","10":"Ds",12:"Cn",14:"Fl",16:"Lv",18:"Uuo",20:"Ubn"};
                
                //Finding element name.
                //|| parseInt(an/2,10) != parseInt(an1/2,10))
                var Elem = '';
                if ( parseInt(az/2,10) != parseInt(az1/2,10)  && dataname == 'HFB_Energy_LN' )
                {
                    Elem = 'Odd names';
                    var OddNames = {"1":"H","3":"Li","5":"B","7":"N","9":"F","11":"Na","13":"Al","15":"P","17":"Cl","19":"K","21":"Sc","23":"V","25":"Mn","27":"Co","29":"Cu","31":"Ga","33":"As","35":"Br","37":"Rb","39":"Y","41":"Nb","43":"Tc","45":"Rh","47":"Ag","49":"In","51":"Sb","53":"I","55":"Cs","57":"La","59":"Pr","61":"Pm","63":"Eu","65":"Tb","67":"Ho","69":"Tm","71":"Lu","73":"Ta","75":"Re","77":"Ir","79":"Au","81":"Tl","83":"Bi","85":"At","87":"Fr","89":"Ac","91":"Pa","93":"Np","95":"Am","97":"Bk","99":"Es","101":"Md","103":"Lr","105":"Db","107":"Bh","109":"Mt","111":"Rg","113":"Nh","115":"Mc","117":"Ts","119":"Uue"}
                    Elem = OddNames[az+""];
                }
                
                else{
                
                for (i=0; i<=20000 ; i++ )
                {
                    if ( az == split_f1[xz] )// && an == split_f1[xn])
                    {
                        var Elem = split_f1[parseInt(xz - 1,10)]; //for 'UNEDF0.dat' element name is 2 spacing in front of label 'N'.
                        if ( az > 102 ) //Starting from element 104, the place for name is replaced by proton number minus 100
                        {
                            var Elem1 = UuElem_name[Elem+""];
                            var Elem = Elem1+"";
                        }
                        break
                    }
                    else
                    {
                        //xn += 30;
                        xz += 30;
                        //count +=1; //count number of iteration
                        
                    }
                }
                }
               
                var e = document.getElementById("EDF_input_datatype");
                if (dataname == 'S_2P')
                {
                    name_disp = 'S' + '2p'.sub();
                }
                else if (dataname == 'S_2N')
                {
                    name_disp = 'S' + '2n'.sub();
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
        
