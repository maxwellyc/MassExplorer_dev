#from sys import argv     #input when compiling, define extra variables for Sort()
#script, az, an, dataname = argv
def Sort(InFile):
 az = raw_input("Proton number>")     #Ask for Z
 an = raw_input("Neutron number>")    #Ask for N
 dataname = "HFB_Energy"              #Default data output HFB_Energy
 #dataname = raw_input("Data name>")   #Allow input dataname and output corresponding one.
 print "-------------------------------"
 f1 = open(str(InFile))
 lines = f1.readlines()
 DATAdic = {}                     #Creates an empty dictionary
 DATA={}                          #Creates an empty dictionary

 for line in lines:
     nameLoc = line.split()
     break

 try:
      dataLoc = nameLoc.index(dataname) #Locate input dataname's position in string 
      NLoc = nameLoc.index("N")         #Locate position of neutron number in string
      ZLoc = nameLoc.index("Z")         #Locate position of proton number in string
 except ValueError:
     print "Please enter correct data name!" #Data name not in database

 count = 0
 for line in lines:                         #search thru line string, if N,Z matches input aN,aZ, write the input dataname (eg. Kinetic_N)'s position's figure to DataV
     try:
         count += 1    #just a flag to keep track of iteration.
         ss = line.split()                               
         N1 = int(float(ss[NLoc])+0.0001)
         Z1 = int(float(ss[ZLoc])+0.0001)
         DataV = float(ss[dataLoc])
         Elem = ss[0]
         if ((int(az) == Z1 ) and (int(an) == N1 )):
             print dataname," of ",Elem,"(", N1 + Z1,")", "=", DataV, "MeV", dataLoc
             break
     except (ValueError,IndexError):
      continue
 beacon = 0   
 if ((int(an)/2 != (int(an)+1)/2) or (int(az)/2 != (int(az)+1)/2)):
  print "Nuclide not in database!";
  print "Please input even-even nuclei number only!"
  beacon = 1  #if either N,Z is odd, tells the below "if" statement not to print error message again.


 if (count == 4005) and not((int(an)==300) and (int(az)==120)) and (beacon!=1):
#count=4005 means searched through all database and found no match of N,Z number, excluding the last nuclide (120,300) which also gives count=4005. print error message if 
  
  print "Nuclide not in database!"
  print "Too exotic!"

 f1.close()
# print count

InFile='UNEDF0.dat'
Sort(InFile)
