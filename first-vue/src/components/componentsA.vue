<template>
    <div class="hello">
        <h1>{{msg}}</h1>
        <button @click="onClickMe">Click me</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'hello from component a!'
            }
        },
        events: {
            'onAddnew': function (items) {
                console.log(items);
            }
        },
        methods: {
            onClickMe: function () {
                this.$dispatch('child-tell-me-something', this.msg);
            }
        }
    }


</script>
