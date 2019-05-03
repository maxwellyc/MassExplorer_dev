#Takes in a data file eliminates all lines with energy values above the ground state
#and gives as output a file whose energies are only ground state values.  These files
#are then used as input by erik.py



def ctFile():
 f0 = open(str('Data/UNEDF0Axial.dat'))
 f1 = open(str('Data/UNEDF1Axial.dat'))
 f2 = open(str('Data/UNEDF2Axial.dat'))
 f3 = open(str('Data/SkMSAxial.dat'))
 f4 = open(str('Data/SLy4Axial.dat'))
 f5 = open(str('Data/SV-minAxial.dat'))
 
 lines0 = f0.readlines()
 lines1 = f1.readlines()
 lines2 = f2.readlines()
 lines3 = f3.readlines()
 lines4 = f4.readlines()
 lines5 = f5.readlines()
 
 linew = ''
 
 ctf = []

 ct0 = {}
 ct1 = {}
 ct2 = {}
 ct3 = {}
 ct4 = {}
 ct5 = {}
 
#UNEDF0
 for line in lines0:

    ss = line.split()
    try:                                    
     N=int(float(ss[2])+0.0001)      #Number of Neutrons
     Z=int(float(ss[1])+0.0001)      #Number of Protons
     beta3=float(float(ss[4]))               #beta3 of a particular nucleus

     if(beta3 >= 0.01) :
       ct0[(N,Z)] = 1
     else:
       ct0[(N,Z)] = 0
       continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, Efn are not numbers
 f0.close()


 #UNEDF1
 for line in lines1:

    ss = line.split()
    try:                                    
     N=int(float(ss[2])+0.0001)      #Number of Neutrons
     Z=int(float(ss[1])+0.0001)      #Number of Protons
     beta3=float(float(ss[4]))  #beta3 of a particular nucleus

     if(beta3 >= 0.01) :         
       ct1[(N,Z)] = 1
     else:
       ct1[(N,Z)] = 0
       continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, Efn are not numbers
 f1.close()


 #UNEDF2
 for line in lines2:

    ss = line.split()
    try:                                    
     N=int(float(ss[2])+0.0001)      #Number of Neutrons
     Z=int(float(ss[1])+0.0001)      #Number of Protons
     beta3=float(float(ss[4]))  #beta3 of a particular nucleus
     
     if(beta3 >= 0.01) :         #Looks for the smallest Efn
       ct2[(N,Z)] = 1
     else:
       ct2[(N,Z)] = 0
       continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, Efn are not numbers
 f2.close()

#SKMS
 for line in lines3:

    ss = line.split()
    try:                                    
     N=int(float(ss[2])+0.0001)      #Number of Neutrons
     Z=int(float(ss[1])+0.0001)      #Number of Protons
     beta3=float(float(ss[4]))  #beta3 of a particular nucleus

     if(beta3 >= 0.01) :         
       ct3[(N,Z)] = 1
     else:
       ct3[(N,Z)] = 0
       continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, Efn are not numbers
 f3.close()

#SLY4
 for line in lines4:

    ss = line.split()
    try:                                    
     N=int(float(ss[2])+0.0001)      #Number of Neutrons
     Z=int(float(ss[1])+0.0001)      #Number of Protons
     beta3=float(float(ss[4]))  #beta3 of a particular nucleus

     if(beta3 >= 0.01) :         
       ct4[(N,Z)] = 1
     else:
       ct4[(N,Z)] = 0
       continue
    except (ValueError, IndexError):
       continue                      
 f4.close()


#SV-MIN
 for line in lines5:

    ss = line.split()
    try:                                    
     N=int(float(ss[2])+0.0001)      #Number of Neutrons
     Z=int(float(ss[1])+0.0001)      #Number of Protons
     beta3=float(float(ss[4]))  #beta3 of a particular nucleus

     if(beta3 >= 0.01) :         
       ct5[(N,Z)] = 1
     else:
       ct5[(N,Z)] = 0
       continue
    except (ValueError, IndexError):
       continue                     
 f5.close()

 target = open(str('beta3count.dat'), "w")
 title = 'Z'.rjust(3)+'    '+'N'.rjust(3)+'    '+'UNEDF0'.rjust(6)+'    '+'UNEDF1'.rjust(6)+'    '+'UNEDF2'.rjust(6)+'    '+'SkM*'.rjust(6)+'    '+'SLy4'.rjust(6)+'    '+'SV-MIN'.rjust(6)+'    '+'Total'.rjust(6)
 target.write(title)
 #print title
 target.write("\n")
 tt = 0
 linect = 0
 for Z in range(0,122):
   
   for N in range (0,302):
     if (ct0.has_key((N,Z)) or ct1.has_key((N,Z)) or ct2.has_key((N,Z)) or ct3.has_key((N,Z)) or ct4.has_key((N,Z)) or ct5.has_key((N,Z)) ) :
       tt = 0
       linew = ''
       linect += 1
       linew = str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
       #count UNEDF0
       if ct0.has_key((N,Z)):
          linew += str(ct0[(N,Z)]).rjust(6) + '    '
          tt += ct0[(N,Z)]
       else:
          linew += '0'.rjust(6) + '    '
       #count UNEDF1
       if ct1.has_key((N,Z)):
          linew += str(ct1[(N,Z)]).rjust(6) + '    '
          tt += ct1[(N,Z)]
       else:
          linew += '0'.rjust(6) + '    '
       #count UNEDF2
       if ct2.has_key((N,Z)):
          linew += str(ct2[(N,Z)]).rjust(6) + '    '
          tt += ct2[(N,Z)]
       else:
          linew += '0'.rjust(6) + '    '
       #count SKMS
       if ct3.has_key((N,Z)):
          linew += str(ct3[(N,Z)]).rjust(6) + '    '
          tt += ct3[(N,Z)]
       else:
          linew += '0'.rjust(6) + '    '
       #count SLY4
       if ct4.has_key((N,Z)):
          linew += str(ct4[(N,Z)]).rjust(6) + '    '
          tt += ct4[(N,Z)]
       else:
          linew += '0'.rjust(6) + '    '
       #count SV-MIN
       if ct5.has_key((N,Z)):
          linew += str(ct5[(N,Z)]).rjust(6) + '    '
          tt += ct5[(N,Z)]
       else:
          linew += '0'.rjust(6) + '    '
       #count TOTAL
       linew += str(tt).rjust(6)
       #print linew+'\t'+str(int(linect))
       target.write(linew)
       target.write('\n')
       
       
     else:
       tt = 0
       continue

ctFile()




 


 



