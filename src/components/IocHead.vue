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
                            <!--<button @click="userResetPasswordPre()" type="submit" class="btn btn-primary"-->
                                    <!--:disabled="userResetPasswordForm.$invalid">确定-->

                            <!--</button>-->
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

    import axios from 'axios'
    export default {
        name: 'ioc-head',
        data(){
            return {
                systemManageNavStatus:false,
                opened:false,
                blueMap:[]
            }
        },
        created(){
            console.log(axios);
//            axios.get('/api/kpi/blueMap',{
////                method:'get',
////                url: '/kpi/blueMap',
//                headers:{'x-auth-token': 'eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMi0wNCAyMDowNzo1OSIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF'}
//            }).then(res => (console.log(res)))
            this.$http.get('/api/kpi/result/all?currentDate=2017-04-19',{
                headers:{
                    'X-Auth-Token':'eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMi0wNCAyMDowNzo1OSIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjMiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjQiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjUiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjYiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiNyIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiI4IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjkiLCJpZCI6MzgsImNyZWF0ZV90aW1lIjoiMjAxNS0wNy0wOCAwNjozNTo0NCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wOCAwNjozNTo0OCIsIm5hbWUiOiLph5Hono3lip4iLCJkZXNjcmlwdGlvbiI6IkpSQl/ph5Hono3lip4ifSx7IkBpZCI6IjEwIiwiaWQiOjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozOToyOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozOToyOCIsIm5hbWUiOiLnianku7flsYAiLCJkZXNjcmlwdGlvbiI6IldKSl/nianku7flsYAifSx7IkBpZCI6IjExIiwiaWQiOjMxLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJuYW1lIjoi5Y2r55Sf5bGAIiwiZGVzY3JpcHRpb24iOiJXU0pf5Y2r55Sf5bGAIn0seyJAaWQiOiIxMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjE0IiwiaWQiOjEyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJuYW1lIjoi546v5L+d5bGAIiwiZGVzY3JpcHRpb24iOiJIQkpf546v5L+d5bGAIn0seyJAaWQiOiIxNSIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiMTYiLCJpZCI6MzIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLkv6Horr/lsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/kv6Horr/lsYAifSx7IkBpZCI6IjE3IiwiaWQiOjI4LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJuYW1lIjoi5Z+O566h5bGAIiwiZGVzY3JpcHRpb24iOiJDR0pf5Z+O566h5bGAIn0seyJAaWQiOiIxOCIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiIxOSIsImlkIjoyMiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibmFtZSI6IuWFrOWuieWxgCIsImRlc2NyaXB0aW9uIjoiR0FKX+WFrOWuieWxgCJ9LHsiQGlkIjoiMjAiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjIxIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIyMiIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjIzIiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiIyNCIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiMjUiLCJpZCI6MTMsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm5hbWUiOiLmsLTliKnlsYAiLCJkZXNjcmlwdGlvbiI6IlNMSl/msLTliKnlsYAifV19LCJleHBpcmVzIjoxNDk1NDIzNDk4OTA4LCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImVuYWJsZWQiOnRydWUsInBhc3N3b3JkIjpudWxsLCJ1c2VybmFtZSI6InN5c3RlbSIsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6dHJ1ZSwiYWNjb3VudE5vbkV4cGlyZWQiOnRydWUsImFjY291bnROb25Mb2NrZWQiOnRydWV9.fFAC/Kz1Iubt0znkG2SjdIyJAAIo1sEcfCy99Ug61UI='
                }
            }).then(res => (console.log(res)))
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