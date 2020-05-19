<template>
  <section class="text-white">
    <div
      class="flex flex-col md:flex-row p-0 md:p-6 pt-12 text-2xl md:text-3xl items-start md:items-end"
    >
      <h3>News:</h3>
      <div>
        <tab
          type="General"
          :active="type === 'General'"
          @onclick="type = 'General'"
        />
        <tab
          type="Positive"
          :active="type === 'Positive'"
          @onclick="type = 'Positive'"
        />
        <tab
          type="Negative"
          :active="type === 'Negative'"
          @onclick="type = 'Negative'"
        />
      </div>
    </div>
    <div class="grid md:grids-cols-1 lg:grid-cols-2">
      <st-article
        v-for="article in renderNews"
        :by="article.source"
        :time="article.datetime"
        :heading="article.headline"
        :company="article.related"
        :imgSrc="article.image"
        :key="article.headline"
        :link="article.url"
      />
    </div>
  </section>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";
import StArticle from "@/components/common/Article";
import Tab from "@/components/common/Tab";

const { mapFields } = createHelpers({
  getterType: "news/getField",
  mutationType: "news/updateField"
});
const { mapFields: mapDashboardFields } = createHelpers({
  getterType: "dashboard/getField",
  mutationType: "dashboard/updateField"
});
export default {
  components: {
    StArticle,
    Tab
  },
  data: function() {
    return {
      type: "General"
    };
  },
  mounted: function() {
    this.getNews();
  },
  methods: {
    ...mapActions("news", ["getNews", "setStock", "setBucketId"])
  },
  computed: {
    ...mapFields({
      news: "data"
    }),
    ...mapDashboardFields({
      stockFocus: "graphs.stock.focus",
      bucketFocus: "graphs.bucket.focus"
    }),
    renderNews: function() {
      const { type } = this;
      if (type == "General") return this.news.neutral;
      if (type === "Positive") return this.news.positive;
      return this.news.negative;
    }
  },
  watch: {
    stockFocus: function() {
      const { stockFocus } = this;
      console.log(stockFocus);
      if (stockFocus) {
        this.setStock(stockFocus);
      }
    },
    bucketFocus: function() {
      console.log("BUCKET FOCUS CHANGE", this.bucketFocus);
      const { bucketFocus } = this;
      if (bucketFocus) {
        this.setBucketId(bucketFocus);
      }
    }
  }
};
</script>
