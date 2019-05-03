#Calculate Moment of Inertia of N-N, P-P, N-P paring interaction.
#Using negative binding energy for stable nuclei convention.

def MomOfIner():

#
#Define variables, using dripline analized HFBTHO mass table
#
 f0 = open(str('Data/UNEDF0.dat'))
 f1 = open(str('Data/UNEDF1.dat'))
 f2 = open(str('Data/SKMS.dat'))
 f3 = open(str('Data/SKP.dat'))
 f4 = open(str('Data/SLY4.dat'))
 f5 = open(str('Data/SV-MIN.dat'))
 
 lines0 = f0.readlines()
 lines1 = f1.readlines()
 lines2 = f2.readlines()
 lines3 = f3.readlines()
 lines4 = f4.readlines()
 lines5 = f5.readlines()

 be_dict0 = {}     #UNEDF0
 be_dict1 = {}     #UNEDF1
 be_dict2 = {}     #SKMS
 be_dict3 = {}     #SKP
 be_dict4 = {}     #SLY4
 be_dict5 = {}     #SV-MIN
 
 
#
#n-n interaction
#
 MOInn0 = {}     #same numerical label as above,
 MOInn1 = {}
 MOInn2 = {}
 MOInn3 = {}
 MOInn4 = {}
 MOInn5 = {}

#
#p-p interaction
#
 MOIpp0 = {}     #same numerical label as above,
 MOIpp1 = {}
 MOIpp2 = {}
 MOIpp3 = {}
 MOIpp4 = {}
 MOIpp5 = {}
 
 
#
#n-p interaction
#
 MOInp0 = {}     #same numerical label as above,
 MOInp1 = {}
 MOInp2 = {}
 MOInp3 = {}
 MOInp4 = {}
 MOInp5 = {}
 
#
#Create Binding Energy Dictionaries
#
 
#UNEDF0
 BEcache = 0.0
 for line in lines0:

    ss = line.split()
    try:                                    
     N = int(float(ss[2])+0.0001)      #Number of Neutrons
     Z = int(float(ss[1])+0.0001)      #Number of Protons
     BEcache = float(float(ss[15]))    #create binding energy dict
     be_dict0[(Z,N)] = BEcache
     continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, binding energy are not numbers
 f0.close()

#UNEDF1
 BEcache = 0.0
 for line in lines1:

    ss = line.split()
    try:                                    
     N = int(float(ss[2])+0.0001)      #Number of Neutrons
     Z = int(float(ss[1])+0.0001)      #Number of Protons
     BEcache = float(float(ss[15]))    #create binding energy dict
     be_dict1[(Z,N)] = BEcache
     continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, binding energy are not numbers
 f1.close()

#SKMS
 BEcache = 0.0
 for line in lines2:

    ss = line.split()
    try:                                    
     N = int(float(ss[2])+0.0001)      #Number of Neutrons
     Z = int(float(ss[1])+0.0001)      #Number of Protons
     BEcache = float(float(ss[15]))    #create binding energy dict
     be_dict2[(Z,N)] = BEcache
     continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, binding energy are not numbers
 f2.close()

#SKP
 BEcache = 0.0
 for line in lines3:

    ss = line.split()
    try:                                    
     N = int(float(ss[2])+0.0001)      #Number of Neutrons
     Z = int(float(ss[1])+0.0001)      #Number of Protons
     BEcache = float(float(ss[15]))    #create binding energy dict
     be_dict3[(Z,N)] = BEcache
     continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, binding energy are not numbers
 f3.close()

#SLY4
 BEcache = 0.0
 for line in lines4:

    ss = line.split()
    try:                                    
     N = int(float(ss[2])+0.0001)      #Number of Neutrons
     Z = int(float(ss[1])+0.0001)      #Number of Protons
     BEcache = float(float(ss[15]))    #create binding energy dict
     be_dict4[(Z,N)] = BEcache
     continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, binding energy are not numbers
 f4.close()

#SV-MIN
 BEcache = 0.0
 for line in lines5:

    ss = line.split()
    try:                                    
     N = int(float(ss[2])+0.0001)      #Number of Neutrons
     Z = int(float(ss[1])+0.0001)      #Number of Protons
     BEcache = float(float(ss[15]))    #create binding energy dict
     be_dict5[(Z,N)] = BEcache
     continue
    except (ValueError, IndexError):
       continue                      #N,Z, or, binding energy are not numbers
 f5.close()

#
#Calculate Moment of Inertia
#

#UNEDF0
 for Zz in range(0,121):
   for Nn in range(0,301):
     try:
       if (be_dict0.has_key((Zz,Nn)) and be_dict0.has_key((Zz,(Nn-2))) and be_dict0.has_key((Zz,(Nn+2)))):
         MOInn0[(Zz,Nn)] = 4.0/(float(be_dict0[(Zz,(Nn-2))])+float(be_dict0[(Zz,(Nn+2))])-2*float(be_dict0[(Zz,Nn)]))
      
       if (be_dict0.has_key((Zz,Nn)) and be_dict0.has_key(((Zz-2),Nn)) and be_dict0.has_key(((Zz+2),Nn))):
         MOIpp0[(Zz,Nn)] = 4.0/(float(be_dict0[((Zz-2),Nn)])+float(be_dict0[((Zz+2),Nn)])-2*float(be_dict0[(Zz,Nn)]))
      
       if (be_dict0.has_key((Zz,Nn)) and be_dict0.has_key(((Zz-2),(Nn-2))) and be_dict0.has_key((Zz,(Nn-2))) and be_dict0.has_key(((Zz-2),Nn))):
         MOInp0[(Zz,Nn)] = 4.0/(float(be_dict0[(Zz,Nn)])+float(be_dict0[((Zz-2),(Nn-2))])-float(be_dict0[(Zz,(Nn-2))])-float(be_dict0[((Zz-2),Nn)]))
      
       continue
     except (ValueError, IndexError):
       continue


#UNEDF1
 for Zz in range(0,121):
   for Nn in range(0,301):
     try:
       if (be_dict1.has_key((Zz,Nn)) and be_dict1.has_key((Zz,(Nn-2))) and be_dict1.has_key((Zz,(Nn+2)))):
         MOInn1[(Zz,Nn)] = 4.0/(float(be_dict1[(Zz,(Nn-2))])+float(be_dict1[(Zz,(Nn+2))])-2*float(be_dict1[(Zz,Nn)]))
      
       if (be_dict1.has_key((Zz,Nn)) and be_dict1.has_key(((Zz-2),Nn)) and be_dict1.has_key(((Zz+2),Nn))):
         MOIpp1[(Zz,Nn)] = 4.0/(float(be_dict1[((Zz-2),Nn)])+float(be_dict1[((Zz+2),Nn)])-2*float(be_dict1[(Zz,Nn)]))
      
       if (be_dict1.has_key((Zz,Nn)) and be_dict1.has_key(((Zz-2),(Nn-2))) and be_dict1.has_key((Zz,(Nn-2))) and be_dict1.has_key(((Zz-2),Nn))):
         MOInp1[(Zz,Nn)] = 4.0/(float(be_dict1[(Zz,Nn)])+float(be_dict1[((Zz-2),(Nn-2))])-float(be_dict1[(Zz,(Nn-2))])-float(be_dict1[((Zz-2),Nn)]))
      
       continue
     except (ValueError, IndexError):
       continue

#SKMS
 for Zz in range(0,121):
   for Nn in range(0,301):
     try:
       if (be_dict2.has_key((Zz,Nn)) and be_dict2.has_key((Zz,(Nn-2))) and be_dict2.has_key((Zz,(Nn+2)))):
         MOInn2[(Zz,Nn)] = 4.0/(float(be_dict2[(Zz,(Nn-2))])+float(be_dict2[(Zz,(Nn+2))])-2*float(be_dict2[(Zz,Nn)]))
      
       if (be_dict2.has_key((Zz,Nn)) and be_dict2.has_key(((Zz-2),Nn)) and be_dict2.has_key(((Zz+2),Nn))):
         MOIpp2[(Zz,Nn)] = 4.0/(float(be_dict2[((Zz-2),Nn)])+float(be_dict2[((Zz+2),Nn)])-2*float(be_dict2[(Zz,Nn)]))
      
       if (be_dict2.has_key((Zz,Nn)) and be_dict2.has_key(((Zz-2),(Nn-2))) and be_dict2.has_key((Zz,(Nn-2))) and be_dict2.has_key(((Zz-2),Nn))):
         MOInp2[(Zz,Nn)] = 4.0/(float(be_dict2[(Zz,Nn)])+float(be_dict2[((Zz-2),(Nn-2))])-float(be_dict2[(Zz,(Nn-2))])-float(be_dict2[((Zz-2),Nn)]))
      
       continue
     except (ValueError, IndexError):
       continue

#SKP
 for Zz in range(0,121):
   for Nn in range(0,301):
     try:
       if (be_dict3.has_key((Zz,Nn)) and be_dict3.has_key((Zz,(Nn-2))) and be_dict3.has_key((Zz,(Nn+2)))):
         MOInn3[(Zz,Nn)] = 4.0/(float(be_dict3[(Zz,(Nn-2))])+float(be_dict3[(Zz,(Nn+2))])-2*float(be_dict3[(Zz,Nn)]))
      
       if (be_dict3.has_key((Zz,Nn)) and be_dict3.has_key(((Zz-2),Nn)) and be_dict3.has_key(((Zz+2),Nn))):
         MOIpp3[(Zz,Nn)] = 4.0/(float(be_dict3[((Zz-2),Nn)])+float(be_dict3[((Zz+2),Nn)])-2*float(be_dict3[(Zz,Nn)]))
      
       if (be_dict3.has_key((Zz,Nn)) and be_dict3.has_key(((Zz-2),(Nn-2))) and be_dict3.has_key((Zz,(Nn-2))) and be_dict3.has_key(((Zz-2),Nn))):
         MOInp3[(Zz,Nn)] = 4.0/(float(be_dict3[(Zz,Nn)])+float(be_dict3[((Zz-2),(Nn-2))])-float(be_dict3[(Zz,(Nn-2))])-float(be_dict3[((Zz-2),Nn)]))
      
       continue
     except (ValueError, IndexError):
       continue

#SLY4
 for Zz in range(0,121):
   for Nn in range(0,301):
     try:
       if (be_dict4.has_key((Zz,Nn)) and be_dict4.has_key((Zz,(Nn-2))) and be_dict4.has_key((Zz,(Nn+2)))):
         MOInn4[(Zz,Nn)] = 4.0/(float(be_dict4[(Zz,(Nn-2))])+float(be_dict4[(Zz,(Nn+2))])-2*float(be_dict4[(Zz,Nn)]))
      
       if (be_dict4.has_key((Zz,Nn)) and be_dict4.has_key(((Zz-2),Nn)) and be_dict4.has_key(((Zz+2),Nn))):
         MOIpp4[(Zz,Nn)] = 4.0/(float(be_dict4[((Zz-2),Nn)])+float(be_dict4[((Zz+2),Nn)])-2*float(be_dict4[(Zz,Nn)]))
      
       if (be_dict4.has_key((Zz,Nn)) and be_dict4.has_key(((Zz-2),(Nn-2))) and be_dict4.has_key((Zz,(Nn-2))) and be_dict4.has_key(((Zz-2),Nn))):
         MOInp4[(Zz,Nn)] = 4.0/(float(be_dict4[(Zz,Nn)])+float(be_dict4[((Zz-2),(Nn-2))])-float(be_dict4[(Zz,(Nn-2))])-float(be_dict4[((Zz-2),Nn)]))
      
       continue
     except (ValueError, IndexError):
       continue


#SV-MIN
 for Zz in range(0,121):
   for Nn in range(0,301):
     try:
       if (be_dict5.has_key((Zz,Nn)) and be_dict5.has_key((Zz,(Nn-2))) and be_dict5.has_key((Zz,(Nn+2)))):
         MOInn5[(Zz,Nn)] = 4.0/(float(be_dict5[(Zz,(Nn-2))])+float(be_dict5[(Zz,(Nn+2))])-2*float(be_dict5[(Zz,Nn)]))
      
       if (be_dict5.has_key((Zz,Nn)) and be_dict5.has_key(((Zz-2),Nn)) and be_dict5.has_key(((Zz+2),Nn))):
         MOIpp5[(Zz,Nn)] = 4.0/(float(be_dict5[((Zz-2),Nn)])+float(be_dict5[((Zz+2),Nn)])-2*float(be_dict5[(Zz,Nn)]))
      
       if (be_dict5.has_key((Zz,Nn)) and be_dict5.has_key(((Zz-2),(Nn-2))) and be_dict5.has_key((Zz,(Nn-2))) and be_dict5.has_key(((Zz-2),Nn))):
         MOInp5[(Zz,Nn)] = 4.0/(float(be_dict5[(Zz,Nn)])+float(be_dict5[((Zz-2),(Nn-2))])-float(be_dict5[(Zz,(Nn-2))])-float(be_dict5[((Zz-2),Nn)]))
      
       continue
     except (ValueError, IndexError):
       continue


 title = 'EDF'.rjust(7)+'    '+'Z'.rjust(3)+'    '+'N'.rjust(3)+'    '+'N-N'.rjust(16)+'    '+'P-P'.rjust(16)+'    '+'N-P'.rjust(16)


#
#Outputs one file for each EDF
#


#UNEDF0 output
 outputF = open(str('result/UNEDF0_MOI.dat'),"w")
 outputF.write(title)
 outputF.write('\n')

 for Z in range (0,121):
   for N in range (0,301):
     linew = ''
     linew = 'UNEDF0'.rjust(7)+'    '+str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
     if (MOInn0.has_key((Z,N)) or MOIpp0.has_key((Z,N)) or MOInp0.has_key((Z,N))):
      if MOInn0.has_key((Z,N)):
        linew += str(MOInn0[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOIpp0.has_key((Z,N)):
        linew += str(MOIpp0[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOInp0.has_key((Z,N)):
        linew += str(MOInp0[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
  
      outputF.write(linew)
      outputF.write('\n')

 outputF.close()

#UNEDF1 output
 outputF = open(str('result/UNEDF1_MOI.dat'),"w")
 outputF.write(title)
 outputF.write('\n')

 for Z in range (0,121):
   for N in range (0,301):
     linew = ''
     linew = 'UNEDF1'.rjust(7)+'    '+str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
     if (MOInn1.has_key((Z,N)) or MOIpp1.has_key((Z,N)) or MOInp1.has_key((Z,N))):
      if MOInn1.has_key((Z,N)):
        linew += str(MOInn1[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOIpp1.has_key((Z,N)):
        linew += str(MOIpp1[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOInp1.has_key((Z,N)):
        linew += str(MOInp1[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      
      outputF.write(linew)
      outputF.write('\n')

 outputF.close()

#SKMS output
 outputF = open(str('result/SKMS_MOI.dat'),"w")
 outputF.write(title)
 outputF.write('\n')

 for Z in range (0,121):
   for N in range (0,301):
     linew = ''
     linew = 'SKMS'.rjust(7)+'    '+str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
     if (MOInn2.has_key((Z,N)) or MOIpp2.has_key((Z,N)) or MOInp2.has_key((Z,N))):
      if MOInn2.has_key((Z,N)):
        linew += str(MOInn2[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOIpp2.has_key((Z,N)):
        linew += str(MOIpp2[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOInp2.has_key((Z,N)):
        linew += str(MOInp2[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      outputF.write(linew)
      outputF.write('\n')

 outputF.close()


#SKP output
 outputF = open(str('result/SKP_MOI.dat'),"w")
 outputF.write(title)
 outputF.write('\n')

 for Z in range (0,121):
   for N in range (0,301):
     linew = ''
     linew = 'SKP'.rjust(7)+'    '+str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
     if (MOInn3.has_key((Z,N)) or MOIpp3.has_key((Z,N)) or MOInp3.has_key((Z,N))):
      if MOInn3.has_key((Z,N)):
        linew += str(MOInn3[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOIpp3.has_key((Z,N)):
        linew += str(MOIpp3[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOInp3.has_key((Z,N)):
        linew += str(MOInp3[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      outputF.write(linew)
      outputF.write('\n')

 outputF.close()


#SLY4 output
 outputF = open(str('result/SLY4_MOI.dat'),"w")
 outputF.write(title)
 outputF.write('\n')

 for Z in range (0,121):
   for N in range (0,301):
     linew = ''
     linew = 'SLY4'.rjust(7)+'    '+str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
     
     if (MOInn4.has_key((Z,N)) or MOIpp4.has_key((Z,N)) or MOInp4.has_key((Z,N))):
      if MOInn4.has_key((Z,N)):
       linew += str(MOInn4[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOIpp4.has_key((Z,N)):
        linew += str(MOIpp4[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOInp4.has_key((Z,N)):
        linew += str(MOInp4[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      outputF.write(linew)
      outputF.write('\n')

 outputF.close()


#SV-MIN output
 outputF = open(str('result/SV-MIN_MOI.dat'),"w")
 outputF.write(title)
 outputF.write('\n')

 for Z in range (0,121):
   for N in range (0,301):
     linew = ''
     linew = 'SV-MIN'.rjust(7)+'    '+str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
     if (MOInn5.has_key((Z,N)) or MOIpp5.has_key((Z,N)) or MOInp5.has_key((Z,N))):
      if MOInn5.has_key((Z,N)):
        linew += str(MOInn5[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOIpp5.has_key((Z,N)):
        linew += str(MOIpp5[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      if MOInp5.has_key((Z,N)):
        linew += str(MOInp5[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      
      outputF.write(linew)
      outputF.write('\n')

 outputF.close()


#
#Outputs one file for each interaction, n-n, p-p, n-p
#



 title1 = 'Interaction'.rjust(16)+'    '+'Z'.rjust(3)+'    '+'N'.rjust(3)+'    '+'UNEDF0_MOI'.rjust(16)+'    '+'UNEDF1_MOI'.rjust(16)+'    '+'SKMS_MOI'.rjust(16)+'    '+'SKP_MOI'.rjust(16)+'    '+'SLY4_MOI'.rjust(16)+'    '+'SV-MIN_MOI'.rjust(16)



#
#N-N file
#
 outputF = open(str('result/N-N MOI.dat'),'w')
 outputF.write(title1)
 outputF.write('\n')
 for Z in range (0,121):
   for N in range (0,301):
     linew = ''
     linew = 'N-N'.rjust(16)+'    '+str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
     if (MOInn0.has_key((Z,N)) or MOInn1.has_key((Z,N)) or MOInn2.has_key((Z,N)) or MOInn3.has_key((Z,N)) or MOInn4.has_key((Z,N)) or MOInn5.has_key((Z,N)) ):
      #UNEDF0
      if MOInn0.has_key((Z,N)):
        linew += str(MOInn0[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #UNEDF1
      if MOInn1.has_key((Z,N)):
        linew += str(MOInn1[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SKMS
      if MOInn2.has_key((Z,N)):
        linew += str(MOInn2[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SKP
      if MOInn3.has_key((Z,N)):
        linew += str(MOInn3[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SLY4
      if MOInn4.has_key((Z,N)):
        linew += str(MOInn4[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SV-MIN
      if MOInn5.has_key((Z,N)):
        linew += str(MOInn5[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      outputF.write(linew)
      outputF.write('\n')

 outputF.close()


#
#P-P file
#

 outputF = open(str('result/P-P MOI.dat'),"w")
 outputF.write(title1)
 outputF.write('\n')
 for Z in range (0,121):
   for N in range (0,301):
     linew = ''
     linew = 'P-P'.rjust(16)+'    '+str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
     if (MOIpp0.has_key((Z,N)) or MOIpp1.has_key((Z,N)) or MOIpp2.has_key((Z,N)) or MOIpp3.has_key((Z,N)) or MOIpp4.has_key((Z,N)) or MOIpp5.has_key((Z,N)) ):
      #UNEDF0
      if MOIpp0.has_key((Z,N)):
        linew += str(MOIpp0[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #UNEDF1
      if MOIpp1.has_key((Z,N)):
        linew += str(MOIpp1[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SKMS
      if MOIpp2.has_key((Z,N)):
        linew += str(MOIpp2[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SKP
      if MOIpp3.has_key((Z,N)):
        linew += str(MOIpp3[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SLY4
      if MOIpp4.has_key((Z,N)):
        linew += str(MOIpp4[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SV-MIN
      if MOIpp5.has_key((Z,N)):
        linew += str(MOIpp5[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
        
      outputF.write(linew)
      outputF.write('\n')

 outputF.close()


#
#N-P file
#

 outputF = open(str('result/N-P MOI.dat'),"w")
 outputF.write(title1)
 outputF.write('\n')
 for Z in range (0,121):
   for N in range (0,301):
     linew = ''
     linew = 'N-P'.rjust(16)+'    '+str(Z).rjust(3)+'    '+str(N).rjust(3)+'    '
     if (MOInp0.has_key((Z,N)) or MOInp1.has_key((Z,N)) or MOInp2.has_key((Z,N)) or MOInp3.has_key((Z,N)) or MOInp4.has_key((Z,N)) or MOInp5.has_key((Z,N)) ):
      #UNEDF0
      if MOInp0.has_key((Z,N)):
        linew += str(MOInp0[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #UNEDF1
      if MOInp1.has_key((Z,N)):
        linew += str(MOInp1[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SKMS
      if MOInp2.has_key((Z,N)):
        linew += str(MOInp2[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SKP
      if MOInp3.has_key((Z,N)):
        linew += str(MOInp3[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SLY4
      if MOInp4.has_key((Z,N)):
        linew += str(MOInp4[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '
      #SV-MIN
      if MOInp5.has_key((Z,N)):
        linew += str(MOInp5[(Z,N)]).rjust(16)+'    '
      else:
        linew += 'N/A'.rjust(16)+'    '

      outputF.write(linew)
      outputF.write('\n')

 outputF.close()

 

 #print MOInp0[(68,80)],be_dict0[(68,80)]+be_dict0[(66,78)]-be_dict0[(68,78)]-be_dict0[(66,80)]

MomOfIner()