<template>
  <div>
    <div class="hello" ref="chartdiv"></div>
  </div>
</template>

<style lang="postcss" scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>

<script>
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";
import ClickOutside from "vue-click-outside";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const { mapFields } = createHelpers({
  getterType: "dashboard/getField",
  mutationType: "dashboard/updateField"
});

const { mapFields: mapNewsFields } = createHelpers({
  getterType: "news/getField",
  mutationType: "news/updateField"
});

export default {
  computed: {
    ...mapFields({
      mode: "mode",
      graphs: "graphs",
      stockFocus: "graphs.stock.focus",
      bucketFocus: "graphs.bucket.focus"
    }),
    ...mapNewsFields({
      news: "data"
    })
  },
  mounted() {
    this.mapOutBucketGraph();
  },
  methods: {
    ...mapActions("dashboard", [
      "getBucketGraphRequest",
      "getStockGraphRequest"
    ]),

    mapOutBucketGraph: function() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      const { bucketFocus, graphs } = this;
      const bucketData = graphs.bucket.data[bucketFocus];
      chart.paddingRight = 20;

      let data = [];
      for (let i = 0; i < Object.keys(bucketData.price).length; i++) {
        data.push({
          date: new Date(1000 * bucketData.time[i]),
          name: "name" + i,
          value: bucketData.price[i]
        });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());

      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.strokeWidth = 3;
      series.propertyFields.stroke = "#fff";

      series.tooltipText = "{valueY.value} $";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.disabled = true;
      bullet.propertyFields.disabled = "disabled";

      var secondCircle = bullet.createChild(am4core.Circle);
      secondCircle.radius = 6;
      secondCircle.fill = chart.colors.getIndex(8);

      bullet.events.on("inited", function(event) {
        animateBullet(event.target.circle);
      });

      function animateBullet(bullet) {
        var animation = bullet.animate(
          [
            { property: "scale", from: 1, to: 5 },
            { property: "opacity", from: 1, to: 0 }
          ],
          1000,
          am4core.ease.circleOut
        );
        animation.events.on("animationended", function(event) {
          animateBullet(event.target.object);
        });
      }

      this.chart = chart;
    },
    mapOutStockGraph: function() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      const { stockFocus, graphs } = this;
      const bucketData = graphs.stock.data[stockFocus];
      chart.paddingRight = 20;

      let data = [];
      for (let i = 0; i < Object.keys(bucketData.price).length; i++) {
        data.push({
          date: new Date(1000 * bucketData.time[i]),
          name: "name" + i,
          value: bucketData.price[i]
        });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());

      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.strokeWidth = 3;
      series.propertyFields.stroke = "#fff";

      series.tooltipText = "{valueY.value} $";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
      this.chart = chart;
    },
    addNewsBullets() {
      const {
        news: { positive, negative, neutral }
      } = this;

      const { stockFocus, bucketFocus, mode, graphs } = this;
      let renderData;

      if (this.chart) {
        if (mode === "bucket") {
          console.log("Bucket bido");
          renderData = graphs.bucket.data[bucketFocus] || { price: [] };
        } else {
          console.log("Stock bido");
          renderData = graphs.stock.data[stockFocus] || { price: [] };
        }
        let series1 = this.chart.series.push(new am4charts.LineSeries());
        let series2 = this.chart.series.push(new am4charts.LineSeries());
        let series3 = this.chart.series.push(new am4charts.LineSeries());

        let min = Math.min(...renderData.price);
        let max = Math.max(...renderData.price);

        let mid = (max + min) / 2;
        let diff = (max - min) / 4;

        series1.data = neutral.slice(0, 10).map((item) => ({
          ...item,
          yAxis: mid,
          xAxis: new Date(1000 * item.timestamp)
        }));
        series2.data = positive.slice(0, 10).map((item) => ({
          ...item,
          yAxis: mid + diff,
          xAxis: new Date(1000 * item.timestamp)
        }));
        series3.data = negative.slice(0, 10).map((item) => {
          return {
            ...item,
            yAxis: mid - diff,
            xAxis: new Date(1000 * item.timestamp)
          };
        });
        // series2.data = positive;
        // series3.data = negative;

        series1.dataFields.dateX = "xAxis";
        series1.dataFields.valueY = "yAxis";
        series1.dataFields.url = "url";
        series1.dataFields.headline = "headline";
        series1.dataFields.image = "image";

        series1.tooltip.tooltipY = 0;

        series1.tooltip.label.interactionsEnabled = true;
        series1.tooltip.keepTargetHover = true;

        series2.dataFields.dateX = "xAxis";
        series2.dataFields.valueY = "yAxis";
        series2.dataFields.url = "url";
        series2.dataFields.headline = "headline";
        series2.dataFields.image = "image";

        series2.tooltip.label.interactionsEnabled = true;
        series2.tooltip.keepTargetHover = true;

        series3.dataFields.dateX = "xAxis";
        series3.dataFields.valueY = "yAxis";
        series3.dataFields.url = "url";
        series3.dataFields.headline = "headline";
        series3.dataFields.image = "image";

        series3.tooltip.label.interactionsEnabled = true;
        series3.tooltip.keepTargetHover = true;

        var circleBullet1 = series1.bullets.push(new am4charts.CircleBullet());

        var circleBullet2 = series2.bullets.push(new am4charts.CircleBullet());

        var circleBullet3 = series3.bullets.push(new am4charts.CircleBullet());

        circleBullet1.circle.radius = 2;
        circleBullet2.circle.radius = 2;
        circleBullet3.circle.radius = 2;

        const htmlTemplate = `<a href='{url}' target='_blank' class='w-64 flex h-8' >
          <img src='{image}' width='60'/>
            <div class='text-sm ml-4 w-12'>{headline}</div>
          </a>`;

        circleBullet1.tooltipHTML = htmlTemplate;
        circleBullet2.tooltipHTML = htmlTemplate;
        circleBullet3.tooltipHTML = htmlTemplate;

        circleBullet2.circle.stroke = am4core.color("green");
        circleBullet3.circle.stroke = am4core.color("red");

        circleBullet2.circle.fill = am4core.color("green");

        circleBullet3.circle.fill = am4core.color("red");

        series1.strokeWidth = 0;
        series2.strokeWidth = 0;
        series3.strokeWidth = 0;
      }
    }
  },
  watch: {
    stockFocus: async function() {
      const { stockFocus } = this;
      if (stockFocus) {
        await this.getStockGraphRequest(stockFocus);
        this.mapOutStockGraph();
      }
    },
    bucketFocus: async function() {
      const { bucketFocus } = this;
      if (bucketFocus) {
        await this.getBucketGraphRequest(bucketFocus);
        this.mapOutBucketGraph();
      }
    },
    news: async function() {
      this.addNewsBullets();
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>
