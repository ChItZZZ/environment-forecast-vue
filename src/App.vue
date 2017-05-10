<template>
    <div id="app">
        <ioc-head></ioc-head>
        <!--<router-view></router-view>-->
        <ioc-foot id="foot"></ioc-foot>
    </div>
</template>

<script>
    import IocFoot from "./components/IocFoot";
    import IocHead from "./components/IocHead";
    export default {
        components: {IocHead, IocFoot}, name: 'app',
    }
</script>

<style lang="scss" scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        min-height: 100vh;
    }
    #foot{
        position: absolute;
        bottom: 0;
    }
</style>
