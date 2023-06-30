var paths=[]
var allFilePaths;
$(document).ready(function() {
    $("#SelectBtn").click(function() {
        //获取文件夹路径

        $.ajax({
            url: "src/server/getPath.php",
            type: "GET",
            success: function(data) {
              const file = "src/server/filePath.json";

              fetch(file)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                var filePaths=data;

                for(i=0;i<filePaths.length;i++){

                  const folderPath = filePaths[i]; //获取单个文件目录
                  Path = folderPath.split("\\");  //获取文件详细地址
                  paths[i]=Path;
                  console.log(folderPath);
                  console.log(Path);
                  console.log(paths);
                }
                getSelect();
              })
            },
            error: function(error) {
              console.log(error); 
            }
        });

    }); 

});
//将path数据转变为父子级模式
function buildDirectoryTree(data) {
  const root = {}; // 创建根节点对象用于构建目录树结构

  // 遍历数据数组中的每个路径
  data.forEach(pathParts => {
    let currentLevel = root; // 将当前级别设置为根节点

    // 遍历路径的每个部分
    pathParts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = {}; // 如果当前级别中不存在该部分，则创建一个新的对象作为其子对象
      }

      // 如果是路径的最后一个部分
      if (index === pathParts.length - 1) {
        currentLevel[part] = part; // 将当前级别的该部分设为实际路径的名称
      } else {
        currentLevel = currentLevel[part]; // 更新当前级别为当前部分的子对象，用于继续构建下一级别
      }
    });
  });

  // 返回目录树的嵌套结构
  return [data[0][0], buildNestedStructure(root)];
}

function buildNestedStructure(directory) {
  const nestedStructure = []; // 创建存储嵌套结构的数组

  // 循环遍历目录对象的每个键
  for (const key in directory) {
    if (directory.hasOwnProperty(key)) { // 确保只遍历对象自身的属性，而不包括继承的属性
      if (typeof directory[key] === 'object') {
        nestedStructure.push(key, buildNestedStructure(directory[key])); // 如果值是对象，则递归调用该函数来构建嵌套结构
      } else {
        nestedStructure.push(directory[key]); // 如果值是字符串（路径名称），将其添加到嵌套结构数组中
      }
    }
  }

  // 返回嵌套结构数组
  return nestedStructure;
}
//生成select选择框
function buildSelects(data, container, number) {
  var Data = []; // 保存子集数据
  var j = 0; 

  const selectElement = document.createElement('select'); 
  selectElement.id = "select"+number;
  const option0 = document.createElement('option'); 
  option0.value = "nothing";
  option0.text = ""; 
  selectElement.add(option0); // 将选项添加到 <select> 元素中
  for (i = 0; i < data.length; i++) {
    if (!Array.isArray(data[i])) {
      const option1 = document.createElement('option'); 
      option1.value = data[i]; 
      option1.text = data[i]; 
      selectElement.add(option1); // 将选项添加到 <select> 元素中
    }
  }
  container.appendChild(selectElement); // 将 <select> 元素添加到指定的容器中

  for (i = 0; i < data.length; i++) {
    if (Array.isArray(data[i])) {
      for (t = 0; t < data[i].length; t++) {
        Data[j] = data[i][t]; // 将数组中的子数组元素添加到新的Data数组中
        j++;
      }
    }
  }

  console.log(Data); 

  if (Data.length != 0) {
    buildSelects(Data, container, number+1); // 递归调用
  }
}

function getSelect() {
  const directoryTree = buildDirectoryTree(paths);
  console.log(JSON.stringify(directoryTree)); 
  
  const data = directoryTree[1];
  
  console.log(data); 
  allFilePaths=data;

  const container = document.getElementById('fileList'); 
  buildSelects(data, container, 0); // 构建下拉选项，并将其添加到容器中

  $('#SelectBtn').hide(); // 隐藏按钮
  $('#ConfirmBtn').show(); // 显示按钮
}

// 每两秒执行一次的函数
function selectChange() {
  var count = $('#fileList').children().length;//select个数
  for(i=0;i<count-1;i++){
    // 添加选择事件监听器
    $('#select'+i).on('change', function() {
      // 在选择更改时执行的操作
      var j=i+1;
      $('#select'+j).show();
      console.log(1);
    });
  }
}
var num=0;
function finallyFilePath(FilePath,someFilePaths){
  var finallyPath=[];
  for (j = 0; j < someFilePaths.length; j++) {
    if (!Array.isArray(someFilePaths[j])) {
      finallyPath[num]=FilePath+someFilePaths[j];
    }else{
      finallyPath[num]=finallyFilePath(FilePath,someFilePaths[j]);
    }
    num++;
  }
  return finallyPath;
}

$("#ConfirmBtn").click(function(event) {
  //获取文件路径
  var count = $('#fileList').children().length;//select个数
  var FilePath="";
  var flag=0;
  var someFilePaths=allFilePaths;
  var finallyPath=[];
  var number=0;
  for(i=0;i<count;i++){
    
    console.log(i);
    var selectedValue = $('#select'+i).val();//select值
    
    if(selectedValue!="nothing"){
      FilePath+=selectedValue+'/';
      for (j = 0; j < someFilePaths.length; j++) {//检测文件路径是否正确
        if (!Array.isArray(someFilePaths[j])) {
          console.log(selectedValue==someFilePaths[j]);
          console.log(selectedValue);
          console.log(someFilePaths[j]);

          if(selectedValue==someFilePaths[j]){
            flag=1;
            someFilePaths=someFilePaths[j+1];
            number=j+1;
            break;
          }
        }
      }
      if(flag==0){
        alert("文件路径错误");
      }
    }else if(selectedValue=="nothing"){
      console.log(FilePath);
      finallyPath=finallyFilePath(FilePath,someFilePaths);
      break;
    }

    console.log(FilePath);

    flag=0;
  }

}); 

