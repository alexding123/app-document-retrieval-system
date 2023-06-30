
        //读文件内�?
        function readfile(filepath) {
            let xhr = new XMLHttpRequest(),
                okStatus = document.location.protocol === "file:" ? 0 : 200;
            xhr.open('GET', filepath, false);
            xhr.overrideMimeType("text/plain;charset=utf-8");//默�?�为utf-8
            xhr.send(null);
            //alert(xhr.responseText);
            return xhr.status === okStatus ? xhr.responseText : null;
        }
        
 
        function test(){
            //let filename=finallyFilePath;
            finallyFilePath=finallyFilePath.slice(0, -1);
            console.log(finallyFilePath);
            let filename=finallyFilePath;
            let text = readfile(filename);
            //设置文件�?
            
            //传入的文�?内�??
            //let text="abcde dfggc gfabd judab djfij lkief oydbf";
            //传入的关�?�?
            let keywords = document.getElementById("input").value;
            //alert(keywords);
            let allLines = text.split("\n");
            //alert(allLines);
            var i=document.createElement("input");
            i.style.marginTop="30px";
            i.type="checkbox";
            i.className="filename";
            i.value=filename;
            i.addEventListener('change', function() {
                var arr=document.getElementsByClassName(filename);
                if (this.checked) {
                    for(var i=0;i<arr.length;i++){
                        arr[i].checked=true;
                    }
                } else {
                    for(var i=0;i<arr.length;i++){
                        arr[i].checked=false;
                    }
                }
            })
            var t=document.createTextNode("G:/ceshi/ceshi/2/ceshi.txt");
            var b=document.createElement("br");
            var p=document.createElement("p");
            document.getElementsByClassName("box")[0].appendChild(i);
            document.getElementsByClassName("box")[0].appendChild(t);
            t=document.createTextNode("-------------------------------");
            p.appendChild(t);
            document.getElementsByClassName("box")[0].appendChild(p);
            for (let line in allLines) {
                if(allLines[line].toLowerCase().indexOf(keywords.toLowerCase())>-1){
                    i=document.createElement("input");
                    i.type="checkbox";
                    i.className=filename;
                    t=document.createTextNode("行号"+(parseInt(line)+1)+" "+allLines[line]);
                    i.value="行号"+(parseInt(line)+1)+" "+allLines[line];
                    var b=document.createElement("br");
                    document.getElementsByClassName("box")[0].appendChild(i);
                    document.getElementsByClassName("box")[0].appendChild(t);
                    document.getElementsByClassName("box")[0].appendChild(b);

                }
            }
            document.getElementById("save").style.display = "";
        }

        function saveDynamicDataToFile() {
        var userInput = document.getElementsByTagName("input");
        var tex=new String;
        for(var i=0;i<userInput.length;i++){
            if(userInput[i].getAttribute("class")=="filename"){
                var arr2=document.getElementsByClassName(userInput[i].value);
                for(var j=0;j<arr2.length;j++){
                    if(arr2[j].checked==true){
                        tex=tex+userInput[i].value+"\n"+"-------------------------------"+"\n";
                        break;
                    }
                }
                
            }
            else if(userInput[i].checked==true){
                tex=tex+userInput[i].value+"\n";
            }
        }
        if(tex.length==0){
            alert("请选择需要下载的数据�?")
        }
        else{
            var blob = new Blob([tex], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "dynamic.txt");
        }
}   




