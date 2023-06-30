function GetText(folderPath){
    var fileName=Path[Path.length-1];
    var suffix=fileName.split(".");
    if(suffix[suffix.length-1]=="pdf"){
        //获取pdf文件文本内容
        var FILE_PATH = folderPath.toString();  

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
                    console.log("pdf"+text);
                });
            });
        });
    }else if(suffix=="txt"){
        //获取txt文件内容
        FILE_PATH = folderPath.toString();
    
        $.get(FILE_PATH, function(text) {
            console.log("txt"+text);
        });

    }

}