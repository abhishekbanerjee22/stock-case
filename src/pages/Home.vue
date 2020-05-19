<template>
  <div class="bg-blue-900 px-4 lg:px-10">
    <ActionCard />
    <News />
  </div>
</template>

<script>
import ActionCard from "@/components/common/ActionCard";
import News from "@/components/common/News";

export default {
  components: {
    ActionCard,
    News
  }
};
</script>
