    //READ masstable DATA FROM SITE "http://massexplorer.frib.msu.edu/content/masstables/"
    var file = new Array(edfNames.length);
    var rawFile = new Array(edfNames.length);
    var allText = new Array(edfNames.length);
    var lines = new Array(edfNames.length);
    //URL for masstable data, the complete url is concatenated: file[i] = begURL + edfNames[i]+ endURL;
    var begURL = "http://massexplorer.frib.msu.edu/content/functions/"
    var endURL = ".dat"
    function readTextFile(type){
        for (var i = 0; i < edfNames.length; i++){
            file[i] = begURL + edfNames[i] + endURL;
            rawFile[i] = new XMLHttpRequest();
            rawFile[i].onreadystatechange = function (index){
                return function() {
                    if(rawFile[index].readyState === 4){
                        if(rawFile[index].status === 200 || rawFile[index].status == 0){
                            allText[index] = rawFile[index].responseText;
                            lines[index] = allText[index].split(" ");//problem with "no data"
                            for (var j = 0 ; j < lines[index].length; j++){
                                if ( lines[index][j] != undefined && lines[index][j] != "" && lines[index][j] != "\n"){
                                    edfData[index][edfData[index].length] = lines[index][j];
                                }
                            }
                        }
                    }
                };
            }(i);
            rawFile[i].open("GET", file[i], true); //'true' for asynchronous call, 'false' for synchronous
            rawFile[i].send(null);
        }
    }
    readTextFile("read");
