<template>
    <div>
        <div class="banner">
            <div class="container" style="background-image: url('../{{categoryBackground}}');">
                <ol class="breadcrumb">
                    <li>
                        <a href="/">首页</a>
                    </li>
                    <li>
                        <a href="" @click="load()">{{domainName}}</a>
                    </li>
                    <li class="active">{{categoryName}}</li>
                </ol>
                <h1>{{domainName}}</h1>

                <p>上海市{{domainName}}关键业绩指标一览</p>
            </div>
        </div>

        <div class="kpicategory-content" style="min-height:800px;">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel panel-primary kpi-nav-panel">
                                    <div class="panel-heading">导航窗口</div>
                                    <div class="panel-body" style="min-height: 200px;">
                                        <div class="nav-item"
                                             v-repeat="tab in categories"
                                             ui-sref="app.kpicategory({categoryId:tab.id})">
                                            <p class="nav-item-title">
                                                <a style="color: white">{{tab.name}}</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="home-container">
                            <h3 class="title" style="margin-top: 0;">
                                <div class="ioc-cat-title pull-left">
                                    <span>{{categoryName}}</span>
                                </div>m
                                <span ng-bind-html='category.status '></span>

                                <div class="pull-right title-desc">&nbsp;&nbsp;</div>
                                <div class="pull-right title-desc" style="width:300px;overflow:hidden;" ioc-marquee>
            <span v-repeat="news in newsList">
              <a href="{{news.url}}" target="_blank">{{ news.title }}</a>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
                                </div>
                                <div class="pull-right title-desc" style="padding-right:0;">重要通知：</div>
                                <div class="clear"></div>
                            </h3>

                            <div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary ioc-panel" v-repeat="class in kpiClasses">
                                            <div class="panel panel-primary ioc-panel" style="border:none;"
                                            >
                                                <div class="panel-heading">
                                                    {{class.name}}指标
                  <span class="glyphicon glyphicon-question-sign pull-right"></span>
                                                </div>
                                                <div class="panel-body">
                                                    <div class="ioc-panel-table">
                                                        <table class="table table-bordered table-hover kpi-table">
                                                            <thead class="ioc-thead">
                                                            <tr>
                                                                <th style="width:30%;">关键业绩指标(KPI)名称</th>
                                                                <th style="">当前状态</th>
                                                                <th style="text-align:center;border-right:none;">KPI值
                                                                </th>
                                                                <th>数据来源</th>
                                                                <th>统计时间</th>

                                                            </tr>
                                                            </thead>
                                                            <tbody>

                                                            <tr v-repeat="kpi in class.data | orderBy:'sortOrder'"
                                                                @click="changeKPI(class,kpi)" class="hover-tr">
                                                                <td class="tr-kpiname">{{kpi.name}}</td>
                                                                <td class="tr-kpistatus">
                                                                    <label class="label {{kpi.data.status | kpiStatusClass}} status">{{ kpi.data.status | kpiStatusText}}</label>
                                                                    <span ng-bind-html=""></span>
                                                                </td>
                                                                <td class="tr-kpicolor"
                                                                    style="text-align:center; border-right:none;">
                                                                    <span class="kpi-value">{{kpi | unit_trans}}</span>
                                                                </td>
                                                                <td class="tr-kpidepartment">{{kpi.department.name}}
                                                                </td>
                                                                <td class="tr-kpidate">{{kpi | applyDateFilter }}</td>

                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="panel-operation">
                                                            <div class="btn-group">
                                                                <button type="button" class="btn btn-default" id=""
                                                                        @click="loadChart(class, class.curKpi, 'short')">
                                                                    {{class.curShortBtnText}}


                                                                </button>
                                                                <button type="button" class="btn btn-default" id=""
                                                                        @click="loadChart(class, class.curKpi, 'long')">
                                                                    {{class.curLongBtnText}}


                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="ioc-panel-desc">
                                                            <p class="ioc-panel-desc-title">
                                                                <img src="/images/common/titles/one-sentence.png"/>
                                                            </p>
                                                            <div v-if="class.data[class.select_index].kpiStatus.status != 'nodata'">
                                                                <p>
                                                                    {{ class.curExplain.date
                                                                    }}{{class.curKpi.name}} KPI 值为 {{class.curKpi | unit_trans}}。
              </p>
                                                                <p>
                                                                    KPI 状态为
                                                                    <label class="label {{class.curKpi.data.status | kpiStatusClass}} status">{{ class.curKpi.data.status | kpiStatusText}}</label>
                                                                </p>
                                                            </div>
                                                            <div v-if="class.data[class.select_index].kpiStatus.status == 'nodata'">
                                                                <p>{{ class.curExplain.date
                                                                    }}{{class.curKpi.name}} KPI 数据缺失</p>

                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="panel-chart col-md-8" id="" style="min-height:410px;">

                                                        <chart title="{{class.chart.title}}"
                                                               xData="chartXData_{{class.id}}"
                                                               yData="chartYData_{{class.id}}"
                                                               kpitype="{{class.chart.xName}}"
                                                               yName="{{class.chart.yName}}"
                                                               interval="interval_{{class.id}}"
                                                               unit="{{class.curKpi.data.unit | unit_val}}"></chart>
                                                    </div>
                                                    <p class="fill-margin"></p>

                                                    <p class="pull-right">
                                                        <a ui-sref="{{class.kpiDetailUrl}}" class="view-details"></a>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'kpicategory',
        data(){

        },
        methods:{

        }
    }
</script>