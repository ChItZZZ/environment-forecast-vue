<template>
    <div>
        <!--myheader-->
        <nav class="navbar navbar-ioc main-nav">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">
                        <img
                                src="/images/icon/ioc-logo.png" height="43"></a>
                </div>
                <ul class="nav navbar-nav" style="float: right">
                    <li>
                        <a class="current" href="javascript:void(0)">首页</a>
                    </li>
                    <li>
                        <a @click="showNavPannel('kpi')">关键业绩指标</a>
                    </li>
                    <li>
                        <a @click="showNavPannel('bi')">智能分析</a>
                    </li>
                    <li v-if="systemManageNavStatus">
                        <a @click="showNavPannel('peizhi')">系统管理</a>
                    </li>

                </ul>

                <div class="nav-pannel" collapse="isNavPannelCollapsed">
                    <div class="container">
                        <div class="kpi-container">
                            <div class="row">

                                <!--<div class="col-md-2" v-repeat="domain in blueMap">-->
                                    <!--<p>-->
                                        <!--<a>{{domain.name}}</a>-->
                                    <!--</p>-->
                                    <!--<ul>-->
                                        <!--<li v-repeat="category in domain.categories"><a-->
                                                <!--ui-sref="app.kpicategory({categoryId:category.id})">{{category.name}}</a>-->
                                        <!--</li>-->
                                    <!--</ul>-->
                                <!--</div>-->

                            </div>
                        </div>
                        <div class="bi-container">
                            <div class="row">
                                <div class="col-md-2">
                                    <p>
                                        <a href="">经济</a>
                                    </p>
                                    <ul>
                                        <li><a ui-sref="app.keqiangIndex">克强指数分析</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-2">
                                    <p>
                                        <a href="">民生</a>
                                    </p>
                                    <ul>
                                        <li><a ui-sref="app.PopulationStructurePrediction">常住人口预测分析</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-2">
                                    <p>
                                        <a href="">环境</a>
                                    </p>
                                    <ul>
                                        <li><a href="#/waterEnvironmentBI">水环境预测分析</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="peizhi-container">
                            <div class="row">
                                <div class="col-md-2">
                                    <p>
                                        <a href="">权限管理</a>
                                    </p>
                                    <ul>
                                        <li><a @click="closePullInfo" ui-sref="app.userConfig">权限配置</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-2">
                                    <p>
                                        <a href="">KPI管理</a>
                                    </p>
                                    <ul>
                                        <li><a @click="closePullInfo" ui-sref="app.kpiConfig">KPI配置</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="nav-pannel-bottom">
        <span class="glyphicon glyphicon-eject close-icon"
              @click="closeNavPannel"></span>
                    </div>
                </div>
            </div>
        </nav>


        <div class="modal fade" id="userResetPasswordModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" style="width: 800px;">
                <div class="modal-content">
                    <div class="modal-header"><label>密码重置</label></div>
                    <div class="modal-body" style="height: 60px;padding:15px 0 0 0">
                        <form role="form" name="userResetPasswordForm">

                            <div class="form-group col-md-6">
                                <div class="col-sm-4">新密码:*</div>
                                <div class="col-sm-8">
                                    <!--<input name="accountName" v-model="newInfo.password" class="form-control input-sm"-->
                                           <!--required>-->
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div class="modal-footer">
                            <button @click="userResetPasswordPre()" type="submit" class="btn btn-primary"
                                    :disabled="userResetPasswordForm.$invalid">确定

                            </button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="userResetPasswordConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" style="width: 400px;">
                <div class="modal-content">

                    <div class="modal-body" align="center">
                        <label>确定修改密码？</label>
                    </div>

                    <div>
                        <div class="modal-footer">
                            <button @click="userResetPasswordProcess()" class="btn btn-primary" data-dismiss="modal">确定



                            </button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ioc-head',
        data(){
            return {
                systemManageNavStatus:false,
                opened:false
            }
        },
        created(){
            /*系统管理显示导航*/
//            if ($localStorage.currentUser.role == 'ADMINISTRATOR') {
//                this.systemManageNavStatus = true;
//            }
        },
        methods: {
            closePullInfo: function () {
                $scope.opened = false;
            },
            userResetPasswordProcess: function () {
                $('#userResetPasswordModal').modal('hide');
                var promiseUserResetPassword = qService.tokenHttpPost(accountFactory.accountResetPassword, null, {
                    password: $scope.newInfo.password
                });
                promiseUserResetPassword.then(function (data) {
                    //alert(JSON.stringify(data));
                    inform.add('密码修改成功', error_conf);
                    pageUserInit();
                });
            },
            closeNavPannel: function () {
                $scope.isNavPannelCollapsed = true;
                kpiContainer.css('left', '1024px');
                biContainer.css('left', '1024px');
                peizhiContainer.css('left', '1024px');
            },
            showNavPannel: function (navName) {
                if ($scope.isNavPannelCollapsed) {
                    $scope.isNavPannelCollapsed = false;
                    if (navName == 'kpi') {
                        $scope.initItems();
                        kpiContainer.animate({
                            left: '0'
                        });
                    } else if (navName == 'bi') {
                        biContainer.animate({
                            left: '0'
                        });
                    } else if (navName == 'peizhi') {
                        peizhiContainer.animate({
                            left: '0'
                        });
                    } else {
                        peizhiContainer.animate({
                            left: '0'
                        });
                    }
                } else {
                    if (navName == 'kpi') {
                        kpiContainer.animate({
                            left: '0'
                        });
                        biContainer.animate({
                            left: '1024px'
                        });
                        peizhiContainer.animate({
                            left: '1024px'
                        });
                    } else if (navName == 'bi') {
                        biContainer.animate({
                            left: '0'
                        });
                        kpiContainer.animate({
                            left: '1024px'
                        });
                        peizhiContainer.animate({
                            left: '1024px'
                        });
                    } else if (navName == 'peizhi') {
                        peizhiContainer.animate({
                            left: '0'
                        });
                        biContainer.animate({
                            left: '1024px'
                        });
                        kpiContainer.animate({
                            left: '1024px'
                        });
                    }
                }
            }
        }

    }
</script>