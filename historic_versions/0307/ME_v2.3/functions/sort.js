       //Define global Z,N for later use:
            var Z=1;
            var N=2;
            var trigger = 0;
            
            //function NZInput, filter correct input, redefine value for  Z,N;
            function NZInput(z,n,EDF_name)
            {
                
                //this "text" can be changed into a list or string to output various element, let's try single input proton number first:
                EDF_name_1 = EDF_name
                var  x,y, text;
                //Redefine N,Z value:
                N = n;
                Z = z;
                x = parseFloat(z,10);
                y = parseFloat(n,10);
                z1 = parseInt(z,10)+1;
                n1 = parseInt(n,10)+1;
                //if n,z is a integer and between 1~120/1~300, x/y tests if z/n is integer and even number:
                if ( isNaN(z) || z<1 ||z>120 || !((x|0)===x) || parseInt(z/2,10) != parseInt(z1/2,10) )
                
                //pick integer Z within 1~120 only:
                {
                    text = "Please enter even proton number between 1 ~ 120";
                }
                
                //pick integer N within 1~300 only:    
                else if ( isNaN(n) || n<1 ||n>300 || !((y|0)===y) || parseInt(n/2,10) != parseInt(n1/2,10) )
                {
                    text = "Please enter even neutron number between 1 ~ 300";
                }
                
                else
                {
                    //Element should be a string or list to correspond or call a function, change in future:
                    text = grab(EDF_name_1);
                }
                document.getElementById('demo').innerHTML = text;
            }
        
            //include input for grab(EDF name), for choice of different EDF
            function grab(EDF_name_2)
            {
                az = parseInt(document.getElementById('proton').value, 10);
                an = parseInt(document.getElementById('neutron').value,10);
                //default target data to grab: HFB_Energy.
                //dataname = document.getElementById('name').value; //let user type in dataname and grab corresponding one.
                //while (dataname === "")
                //{
                //    dataname = "HFB_Energy_LN";    //if no input, grab data HFB_Energy;
                //}
                //create object of EDF, name from dropbox selection, value is string
                
                //drop down menu selection of data name
                
                var dataname = document.getElementById("EDR_input_datatype").value;
                var EDF_db = {UNEDF0:S_UNEDF0, UNEDF1:S_UNEDF1, SKMS:S_SKMS, SKP:S_SKP, SLY4:S_SLY4,SV_MIN:S_SV_MIN};
                
                //choose f1, search function same as sort_v1.0, just changed which EDF data string to use.
                var f1 = EDF_db[EDF_name_2]
                
                //create a huge array, each element is a word or data (float number).
                split_f1 = f1.split(" ");
                
                //find index of labels in first element of split_f1.
                var NLoc_0 = split_f1.indexOf("N");
                var ZLoc_0 = split_f1.indexOf("Z");
                var dataLoc_0 = split_f1.indexOf(dataname);
                var dataLoc_N0 = dataLoc_0 - NLoc_0; //relative position of data to N number.
                
                //find index of the value of N,Z,data in the first line of actual data, i.e HE 2 2
                var NLoc = parseInt(NLoc_0 + 30, 10);
                var ZLoc = parseInt(ZLoc_0 + 30, 10);
                
                //for this babystring, array length is 271, thus index from 0~270
                var xn = NLoc;
                var xz = ZLoc;
                var count = 0;
                var Unit = "";
                var sup_3 = "3";
                var xx = parseInt(dataLoc_N0, 10);
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
                    Unit = "fm" + sup_3.sup();
                }
                else if (23< xx && xx <28)
                {
                    Unit = "fm";
                }
                
                //convert into Alphabetical names for 104+ elements
                var UuElem_name = {"04":"Rf","06":"Sg","08":"Hs","10":"Ds",12:"Cn",14:"Fl",16:"Lv",18:"Uuo",20:"Ubn"};
                
                for (i=0; i<=20000 ; i++ )
                {
                    if ( az == split_f1[xz] && an == split_f1[xn])
                    {
                        DataV = split_f1[parseInt(dataLoc_N0+xn,10)];
                        var Elem = split_f1[parseInt(xn - 2,10)]; //for UNEDF0.dat element name is right in front of
                        if ( az > 102 )
                        {
                            var Elem1 = UuElem_name[Elem+""];
                            var Elem = Elem1+"";
                    
                        }
                        var flag = 1
                        break
                    }
                    else
                    {
                        var Err_1 = "Nuclide not in database! Too exotic!"
                        flag = 0
                        xn += 30;
                        xz += 30;
                        count +=1; //count number of iteration
				    
                    }
                }
                
                var e = document.getElementById("EDR_input_datatype");
                var name_disp = e.options[e.selectedIndex].text;
                //document.getElementById('demo').innerHTML = dataLoc_0      //FLAG
                
                if ( flag == 1 )
                {
                    if (dataLoc_0 != -1) //Check if Data name input is valid. If name doesn't show, dataLoc_0 will be -1
                    
                    {
                        var ElemName_Array = Elem.split("");
                        //Drop upper case of element name's 2nd letter for 2 Character Name
                        if (az < 104 && ElemName_Array.length == 2)
                        {
                            var ElemName1_Array = ElemName_Array;
                            var l_1 = ElemName1_Array[0]
                            var l_2 = ElemName1_Array[1].toLowerCase()
                            document.getElementById("test").src = "" ; //for error picture
                            return l_1 + l_2 + "(" +parseInt(az+an,10) + ")'s " +name_disp + " = " + DataV + " " + Unit    //output data, unit unknown as of now.
                        }
                        else
                        {
                            return Elem + "(" +parseInt(az+an,10) + ")'s " +name_disp + " = " + DataV + " " + Unit    //output data, unit unknown as of now.
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
                    document.getElementById("test").src = "images/shycat.jpg" ;//can put picture here
                    return Err_1;
                }

                
            }
        
