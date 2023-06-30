let Path=null;

// 获取文件夹路径
$("#folder-input").on("change", function(event) {

    for(i=0;i<event.target.files.length;i++){

        const folderPath = event.target.files[i].webkitRelativePath; //获取单个文件目录
        Path = folderPath.split("/");  //获取文件详细地址
        console.log(folderPath);
        console.log(Path);

        $.post("src/server/SavePath.php",{
            "folderPath" : folderPath,
            "Path" : Path,
            "i" : i
        },function(data){
            
        },"json");

        //获取pdf文件文本内容
        const FILE_PATH = folderPath;

        // 加载 PDF 文件
        pdfjsLib.getDocument(FILE_PATH).promise.then(function(pdf) {
        // 获取 PDF 的第一页
        pdf.getPage(1).then(function(page) {
            // 获取 PDF 页面的文本内容
            page.getTextContent().then(function(textContent) {
            const textItems = textContent.items.map(function(item) {
                return item.str;
            });
            // 合并文本内容
            const text = textItems.join(" ");
            console.log(text);
            });
        });
        });

        //获取txt文件内容
        FILE_PATH = folderPath;

        $.get(FILE_PATH, function(text) {
            console.log(text);
        });

    }

  }); 