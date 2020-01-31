<template>
  <div>
    <div class="noprint">
      <h1>Jira Ticket Formatter</h1>
      <div class="subtitle">Created by Evan Salter</div>
      <p>
        This tool allows you to take the result of a issue query in Jira and format the issues for printing.
      </p>
      <p>
        To use, follow these steps:
        <ol>
          <li>Go to the issues page in Jira and run your query</li>
          <li>Click "Export" in the top right and choose "Export XML"</li>
          <li>Copy the exported XML (you might have to right-click and choose "View Page Source" if your browser is trying to pretty-print it)</li>
          <li>Paste the XML into the text box below</li>
          <li>Print this page. It should print so that each story fits on a page and isn't cut in half. Remember to disable two-sided printing</li>
        </ol>
      </p>
      <br>
      <label for="input-xml">Enter your XML response:</label>
      <textarea v-model="xmlStr" name="input-xml" class="xml-input"/>
      <div class="sep"></div>
    </div>
    <div class="story" v-for="story in stories" :key="story.key">
      <div>
        <img :src="story.iconUrl"/>
        <span class="key">{{ story.key }}</span>
        <span class="title">{{ story.title }}</span>
      </div>
      <div class="description" v-html="story.description"></div>
      <div>Assignee: {{ story.assignee || 'Unassigned' }}</div>
      <div>Created: {{ story.created }}</div>
      <div v-if="story.storyPoints">Estimate: <span class="estimate">{{ story.storyPoints }}</span></div>
    </div>
  </div>
</template>

<script>
import { parse } from './parse';

export default {
  name: 'App',
  data() {
    return {
      xmlStr: '',
    }
  },
  computed: {
    stories() {
      if (this.xmlStr) {
        return parse(this.xmlStr)
      }
      return [];
    }
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.story {
  width: 500px;
  height: auto;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin-bottom: 10px;
  padding: 4px;
}

.key {
  color: grey;
  margin-right: 5px;
}

.title {
  font-weight: bold;
}

.story div {
  padding-bottom: 4px;
}

.description {
  padding-bottom: 10px;
  word-wrap: break-word;
}

img {
  max-width: 100%;
  height: auto;
  vertical-align: bottom;
}

.estimate {
  background: lightblue;
  border-radius: 11px;
  padding: 2px 4px;
}

.xml-input {
  display: block;
  width: 700px;
  min-height: 300px;
  border-radius: 5px;
}

.sep {
  height: 15px;
}

.subtitle {
  margin-top: -15px;
  font-size: 13px;
  color: gray;
}

@media print  
{
  .noprint {
    display: none;
  }

  .story{
    page-break-inside: avoid;
    max-height: 99vh;

  }

  .description {
    font-size: 1.5vh;
  }
}
</style>
