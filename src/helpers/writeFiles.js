//var path = "file:///storage/emulated/0";
//var filename = "offlineData.txt";

export const createFile = (filename,log,callback = null) => {

  if(window.cordova)
  {
    window.resolveLocalFileSystemURL(window.cordova.file.dataDirectory, function(dir) {
      //console.log(window.cordova.file.dataDirectory);
      //console.log("directorio");
      //console.log(dir);
      //console.log(filename);

      dir.getFile(filename, {create:true}, function(fileEntry) {

            //console.log("file entry");
            //console.log(fileEntry);

            fileEntry.createWriter(function(fileWriter) {
              //console.log("file created");
          		//fileWriter.seek(fileWriter.length);
              fileWriter.truncate(0);

          		var blob = new Blob([log], {type:'text/plain'});
          		fileWriter.write(blob);
          		//console.log("ok, in theory i worked");
              callback ? callback() : false;
          	}, e => {
                console.log("error writing file");
                console.log(e)
            });
      },(e) => {
        console.log("error getting the file");
        console.log(e);
      });
    });
  }
  else{ console.log("run cordova app"); }

}

export const readFile = (filename,callback = null,errorcall = null) => {

    function fail(e) {
      errorcall ? errorcall(e) : false;
    	console.log("FileSystem Error");
    	console.log(e);      
    }

    function gotFile(fileEntry) {

    	fileEntry.file(function(file) {
    		var reader = new FileReader();

    		reader.onloadend = function(e) {
    			//console.log("Text is: "+this.result);
          callback ? callback(this.result) : false;
    		}

    		reader.readAsText(file);
    	});

    }
    if(window.cordova)
    {
        window.resolveLocalFileSystemURL(
          window.cordova.file.dataDirectory + filename,
           gotFile, fail);
    }else{ console.log("run cordova app"); }


}

export const deleteFile = (filename, callback = null, errorcall = null) =>{

  window.resolveLocalFileSystemURL(window.cordova.file.dataDirectory, function (dir) {

      dir.getFile(filename, {create: false}, function (fileEntry) {
          fileEntry.remove(function (file) {
              console.log("file removed!");
              callback ? callback(this.result) : false;
          }, function (e) {
              console.log("error occurred: " + e.code);
              errorcall ? errorcall(e) : false;
          }, function () {
              console.log("file does not exist");
          });
      });

  });

}
