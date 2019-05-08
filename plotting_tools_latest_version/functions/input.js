    //array for even-even table
    var SA_UNEDF0 = [], SA_UNEDF1 = [], SA_SKMS = [], SA_SKP = [], SA_SLY4 = [], SA_SV_MIN = [];
    //array for complete, odd-odd table
    var S_UNEDF0 = [], S_UNEDF1 = [], S_SKMS = [], S_SKP = [], S_SLY4 = [], S_SV_MIN = [];
    //enter names of EDFs to link data from massexplorer/masstables/ should be the same as the name appear in the .dat files
    var edfNames = ["UNEDF0even-even_nuclei-test", "UNEDF1even-even_nuclei-test", "SKMSeven-even_nuclei-test", "SKPeven-even_nuclei-test", "SLY4even-even_nuclei-test", "SV-MINeven-even_nuclei-test","UNEDF0odd_nuclei-test", "UNEDF1odd_nuclei-test", "SKMSodd_nuclei-test", "SKPodd_nuclei-test", "SLY4odd_nuclei-test", "SV-MINodd_nuclei-test"];
    var edfData = [SA_UNEDF0, SA_UNEDF1, SA_SKMS, SA_SKP, SA_SLY4, SA_SV_MIN,S_UNEDF0, S_UNEDF1, S_SKMS, S_SKP, S_SLY4, S_SV_MIN];
    //var edfDataOdd = [S_UNEDF0, S_UNEDF1, S_SKMS, S_SKP, S_SLY4, S_SV_MIN];
    var numOfCol = 25; // number of columns in .dat file, it should start with "LBL Z N A ...", following with observables, observables should be separated by at least one space
