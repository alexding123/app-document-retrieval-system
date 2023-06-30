<template>
  <div class="app-container">


    <FileIndexView />
      <div v-for="drive in drives" :key="drive">
        <button class="drive-button" @click="exploreDrive(drive)">
          {{ drive }}
        </button>
      </div>


      <div class="current-path">
        <h3 class="path"> {{ currentPath }}</h3>
        <button class="back-button" @click="goBack">返回上级目录</button>
        <button class="index-button" @click="addFileIndex">添加索引</button>


        <div class="files-list">
          <div v-for="file in files" :key="file.path" class="file-item">
            <div class="file-details">
              <div v-if="file.directory" class="directory-button" @click="exploreDirectory(file)">
                <span class="file-name">{{ truncateFileName(file.name) }}</span>
              </div>
              <span v-else class="file-span">
                <span class="file-name">{{ truncateFileName(file.name) }}</span>
              </span>
            </div>
            <div class="file-checkbox">
              <input type="checkbox" v-model="selectedFiles" :value="file.path" @click="pathDeal(file)" class="select-checkbox" />
            </div>
          </div>
        </div>
    </div>

      <SearchText />

  </div>
</template>

<style>
.app-container {
  display: flex;
}

.drives-section {
  width: 12%;
  padding: 10px;

}

.files-section {
  flex: 1;
  padding: 10px;
}

.current-path {
  background-color: #f9f9f9;
  padding: 10px;
}

.current-path .title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;

}

.current-path .path {
  margin: 0;
  font-size: 14px;

}

.files-list-container {
  max-height: calc(100vh - 220px);
  overflow-y: auto;
}

.files-list {
  width: 90%;
}

.file-item {
  display: flex;
  align-items: center;

  padding: 10px;
  margin-bottom: 10px;

}

.file-details {
  flex-grow: 1;
}

.directory-button {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.file-name {
  overflow: hidden;

}

.file-checkbox {
  flex-shrink: 0;

}

.back-button {
  padding: 5px 10px;

  cursor: pointer;
}

.back-button:hover {
  background-color: #999;
}

.index-button {
  padding: 5px 10px;

}

.index-button:hover {
  background-color: #75abdb;
}

.select-checkbox {
  margin-left: 10px;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.index-container {
  max-height: calc(100vh - 80px);
  overflow-y: hidden;
}
</style>

<script>
import axios from 'axios';
import FileIndexView from "../src/FileIndexView.vue";
import SearchText from "../src/SearchText.vue";

export default {
  name: "App",
  components: {
    FileIndexView,
    SearchText,
  },
  data() {
    return {
      drives: [],
      currentPath: '',
      files: [],
      history: [],
      selectedFiles: [],
    };
  },
  mounted() {
    this.getDrives();
  },
  methods: {
    getDrives() {
      axios
        .get('http://localhost:8081/drives')
        .then((response) => {
          this.drives = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    exploreDrive(drive) {
      this.currentPath = drive;
      this.getFiles(drive);
    },
    exploreDirectory(file) {
      this.history.push(this.currentPath);
      this.currentPath = file.path;
      this.getFiles(file.path);
    },
    pathDeal(file) {
      console.log('this.selectedFiles=', this.selectedFiles);
    },
    goBack() {
      if (this.history.length > 0) {
        const previousPath = this.history.pop();
        this.currentPath = previousPath;
        this.getFiles(previousPath);
      }
    },
    getFiles(path) {
      axios
        .get('http://localhost:8081/files', {
          params: {
            path: path
          }
        })
        .then((response) => {
          this.files = response.data;
          console.log('this.files', this.files);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addFileIndex() {
      const selectedFolder = this.selectedFiles.toString();
      axios
        .post('http://localhost:8081/addFileIndex', {
          folderPath: selectedFolder
        })
        .then((response) => {
          console.log('文件索引添加成功');
          console.log(selectedFolder);
          this.showToast('文件索引添加成功');
        })
        .catch((error) => {
          console.log(selectedFolder);
          console.error('添加文件索引时出错:', error);
        });
    },
    truncateFileName(fileName) {
      if (fileName.length > 20) {
        return fileName.substr(0, 20) + "...";
      }
      return fileName;
    },

  },
};
</script>
