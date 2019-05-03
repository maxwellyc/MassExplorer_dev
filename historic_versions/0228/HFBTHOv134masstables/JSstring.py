#read each line of .dat and rewrite them into one single long string.
#Original purpose is for HTML reading .dat file conversion, since HTML string cannot have breakline in .dat format.
#Current version might only be useful practically if original file has same number of colomns, doesn't have to be sorted row-vise since it's one long string.

def Unistring(InFile, OutFile):

 f1 = open(str(InFile))
 output = open(str(OutFile), "w")
 lines = f1.readlines()
 unistr = ""
 i = 0
 for line in lines:
     caches = line.split()
     lenthc = len(caches)
    # print caches
     
     for i in range (0,int(lenthc)):       #lenthc decides how many elements list caches has, dynamic input.
      #   print i
         unistr = unistr + caches[i] + " "

     i = 0
     continue
 
         

 output.write(unistr)
 print lenthc
InFile='UNEDF1.dat'
OutFile='UNEDF1_JS.dat'
Unistring(InFile, OutFile)

