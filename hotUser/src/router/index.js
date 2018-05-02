import Vue from "vue";
import Router from "vue-router";
import Index from "components/index";
import HotHomePreview from "components/hotHomePreview/hotHomePreview";
import AlarmManagement from "components/alarmManagement/alarmManagement";
import InformationLog from "components/informationLog/informationLog";
import InformationOverview from "components/informationOverview/informationOverview";
import Statistics from "components/statistics/statistics";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
      children: [
        { path: "/hotHomePreview", component: HotHomePreview },
        { path: "/alarmManagement", component: AlarmManagement },
        { path: "/informationLog", component: InformationLog },
        { path: "/statistics", component: Statistics },
        { path: "/informationOverview", component: InformationOverview },
        { path: "/statistics", component: Statistics },
      ]
    }
  ]
});
