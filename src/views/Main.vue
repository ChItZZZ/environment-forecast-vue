<template>
    <div>
        <div class="row" id="scroller">
            <div class="col-md-12">
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" style="height: 220px;">
                    <ol class="carousel-indicators">
                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="item active">
                            <img data-src="holder.js/1024*150/auto/#777:#555/text:First slide" alt="First slide"
                                 src="images/tc/taicang-banner4.png" width="100%"></div>
                        <div class="item">
                            <img data-src="holder.js/1024*150/auto/#666:#444/text:Second slide" alt="Second slide"
                                 src="images/tc/taicang-banner2.jpg" width="100%"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container home-container" style="min-height:1500px;">
            <div class="row" v-repeat="domain in domainMap" id="{{ domain.id }}-section">
                <div class="col-md-12">
                    <div class="title">
                        <a>
                            <img ng-src="{{ domain.icon }}" height="40"></a>
                        <span ng-bind-html='domain.status | domainStatusHTML'></span>
                        <div class="pull-right title-desc">&nbsp;&nbsp;</div>
                        <div class="pull-right title-desc" style="width:300px;overflow:hidden;" ioc-marquee>
                <span v-repeat="news in domain.selectedCategory.news">
                    <a href="{{news.url}}" target="_blank">{{ news.title }}</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                        </div>

                        <div class="pull-right title-desc" style="padding-right:0;">重要通知：</div>
                    </div>

                    <div class="desc"></div>
                    <div class="display-container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel panel-primary">
                                    <div style="min-height:610px;">
                                        <div class="" style="padding: 15px; padding-left: 5px;" ioc-btn-group>
                                            <button ioc-btn class="btn btn-xs {{category.status | categoryStatus}}"
                                                    style="margin-right:5px;"
                                                    v-repeat="category in domain.data | orderBy:'sortOrder'"
                                                    @click="selectCategory(domain, category)">{{category.name}}


                                            </button>
                                        </div>
                                        <table class="table table-bordered kpi-table">
                                            <thead class="ioc-thead">
                                            <tr>
                                                <th style="width:26%;">关键业绩指标(KPI)名称</th>
                                                <th>当前状态</th>
                                                <th style="text-align:center; border-right:none;">KPI值</th>
                                                <th style="border-left:none;"></th>
                                                <th>数据来源</th>
                                                <th style="text-align:center;">更新频率</th>
                                                <th>统计时间</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-repeat="kpi in domain.selectedCategory.page_data | orderBy:'sortOrder'">
                                                <td class="tr-kpiname">{{kpi.name}}</td>
                                                <td class="tr-kpistatus">
                                                    <label class="label {{kpi.data.status | kpiStatusClass}} status">{{
                                                        kpi.data.status | kpiStatusText}}</label>

                                                    <span ng-bind-html=""></span>
                                                </td>
                                                <td class="tr-kpicolor" style="text-align:center; border-right:none;">
                                                    <span class="kpi-value">{{kpi | unit_trans}}</span>

                                                </td>
                                                <td style="border-left:none;"><i class="ioc-icon ioc-icon-green"></i>
                                                </td>
                                                <td class="tr-kpidepartment">{{kpi.department.name}}</td>
                                                <td style="text-align:left;">{{kpi | kpiTypeFilter}}</td>
                                                <td class="tr-kpidate">{{kpi | applyDateFilter }}</td>
                                                <th>
                                                    <a ui-sref="app.kpicategory({categoryId:domain.selectedCategory.id})">查看详情</a>
                                                </th>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <pagination class="pull-right" direction-links="true"
                                                total-items="domain.selectedCategory.total"
                                                v-model="domain.selectedCategory.curr_page"
                                                @change="pageChanged(domain.selectedCategory)" items-per-page="10"
                                                previous-text="上一页" next-text="下一页"></pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" style="height: 100px;"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "main",
        data(){
            return {}
        }
    }
</script>
