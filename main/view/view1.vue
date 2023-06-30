<template>
  <div>
    <input type="text" v-model="keyword" placeholder="请输入关键字" class="search-input" />
    <button @click="search" class="search-button">搜索</button>
    <div v-if="results.length > 0">
      <h3>搜索结果：</h3>
      <ul>
        <template v-for="(group, filePath) in mergedResults">
          <li :key="filePath">
            <input type="checkbox" :id="'checkbox-' + filePath" v-model="selectedResults" :value="group" />
            <label :for="'checkbox-' + filePath">文件路径：{{ filePath }}</label><br />
            <hr>
            <template v-for="(line, index) in group">
              <p class="line">
                <span class="line-number">行号：{{ line.lineNumber }}</span>
                <span class="line-content" v-html="highlightKeyword(line.lineContent)"></span>
              </p>
            </template>
          </li>
        </template>
      </ul>
      <div class="download-button-container">
        <button @click="downloadSelectedResults" class="download-button">下载选中结果</button>
      </div>
    </div>
    <div v-else class="no-results">

    </div>
  </div>
</template>

<style>
/* Your styles here */
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      keyword: '',
      results: [],
      selectedResults: []
    };
  },
  computed: {
    mergedResults() {
      const merged = {};
      this.results.forEach(result => {
        const filePath = result.filePath;
        if (!merged[filePath]) {
          merged[filePath] = [];
        }
        merged[filePath].push(result);
      });
      return merged;
    }
  },
  methods: {
    search() {
      // 发起后端请求进行搜索
      axios
        .get('http://localhost:8081/search', {
          params: {
            keyword: this.keyword
          }
        })
        .then(response => {
          this.results = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    downloadSelectedResults() {
      const selectedContent = this.selectedResults
        .map(group => {
          const filePath = group[0].filePath;
          const lines = group.map(line => `行号：${line.lineNumber} ${line.lineContent}`).join('\n');
          return `文件路径：${filePath}\n---------------------------------\n${lines}\n\n`;
        })
        .join('');

      const element = document.createElement('a');
      const file = new Blob([selectedContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'selected_results.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    highlightKeyword(lineContent) {
      const regex = new RegExp(this.keyword, 'gi');
      return lineContent.replace(regex, '<span class="highlighted">$&</span>');
    }
  }
};
</script>
