import os
import json


directory = 'G:/ceshi' 

def get_files(directory):
    file_paths = []
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_paths.append(os.path.join(root, file))
    
    return file_paths

# 获取指定目录下的所有文件路径
file_paths = get_files(directory)

# 转换为JSON格式
json_data = json.dumps(file_paths)

print(json_data)
try:
    file = open('./FindFile/src/server/filePath.json', 'w')

    # 写入内容
    fd=file.write(json_data)
    print(fd)
# 关闭文件
finally:
    file.close()