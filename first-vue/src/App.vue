<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input v-model="newItem" @keyup.enter="addNew">
    <p>
        child tell me: {{childwords}}
    </p>
    <ul>
        <li v-for="item in items" :class="{finised: item.isFinished}" @click="toggleFinish(item)">{{item.label}}</li>
    </ul>
    <component-a></component-a>
  </div>
</template>

<script>

import Store from './store'
import ComponentA from 'components/componentsA'
export default {
    data () {
        return {
            title: 'this is todo list2!',
            items: Store.fetch(),
            newItem: '',
            childwords: ''
        }
    },
    watch: {
        items: {
            handler: function (items) {
                Store.save(items);
            },
            deep: true
        }
    },
    components: { ComponentA },
    events: {
        'child-tell-me-something': function (msg) {
            this.childwords = msg;
        }
    },
    methods: {
        toggleFinish: function (item) {
            item.isFinished = !item.isFinished;
        },
        addNew: function(){
            this.items.push({
                label: this.newItem,
                isFinished: false
            });
            this.newItem = '';
            this.$broadcast('onAddnew', this.items);
        }
    }
}
</script>

<style>
.finised{
    text-decoration: underline;
}
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
