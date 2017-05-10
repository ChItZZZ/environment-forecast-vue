<template>
    <div>
        <nav class="navbar navbar-ioc">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">
                        <img
                                src="images/icon/ioc-logo-login.png" height="43"></a>
                </div>
            </div>
        </nav>

        <div class="login-banner">
            <img src="images/login/ioc-login-bg.png">

            <div class="login-form-container">
                <div class="login-form">
                    <div class="login-form-title">上海市智慧城市运营中心 KPI 系统</div>
                    <div class="login-form-content">
                        <form>
                            <div class="table">
                                <div class="row" style="height:60px;">
                                    <div class="cell">
                                        <span class="form-text">账号:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </div>
                                    <div class="cell">
                                        <input v-model="login_name" type="text" class="form-control form-input">
                                    </div>
                                </div>
                                <div class="row" style="height:40px;">
                                    <div class="cell">
                                        <span class="form-text">密码:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </div>
                                    <div class="cell">
                                        <input v-model="login_password" type="password" class="form-control form-input">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="cell">
                                    </div>
                                    <div class="cell" style="height:30px;">
                                        <span class="pull-left" style="color:#ffffff; font-size:12px"></span>
                                        <a class="form-link pull-right"><!-- 忘记密码? --></a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="cell"></div>
                                    <div class="cell">
                                        <button @click="ioc_login" class="btn btn-default form-btn">登录</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "login",
        data(){

        },
        methods: {
            ioc_login: function () {
                $scope.login_status = '';
                var _n = $scope.login_name;
                var _p = $scope.login_password;
                if (_n == undefined || _n == "" || _p == undefined || _p == "") {
                    $scope.login_status = '用户名/密码不能为空!';
                }
                tokenFactory.login({
                    'X-Username': _n,
                    'X-Password': encryptPassword(_p)
                }).post({},
                    function success(data, headers) {
                        sessionService.saveToken(data.data, headers()['x-auth-token']);
                    },
                    function error(data) {
                        inform.add('账号或密码错误,请重新登录.', error_conf);
                        //inform.add('网络错误,请稍后重新登录.', error_conf);
                    });
            }

        }
    }
</script>