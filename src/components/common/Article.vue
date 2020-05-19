<template>
  <a
    class="flex px-6 py-4 justify-between bg-transparentm-0 my-4 lg:m-4 hover:bg-blue-800 cursor-pointer"
    target="_blank"
    :href="link"
  >
    <div class="flex flex-col justify-between">
      <div class="pr-2">
        <div>
          <span class="text-sm text-gray-300">{{ getCompanyName(by) }}</span>
          <span class="text-xs pl-3">{{ getTimeAgo(time) }} ago</span>
        </div>
        <h4>
          {{ heading }}
        </h4>
      </div>
      <p class="company">{{ company }}</p>
    </div>
    <img :src="imgSrc" class="hidden md:block w-48" alt="news" />
  </a>
</template>

<style scoped>
.company {
  width: 8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
import { getTimeAgo } from "@/utils/date";
import { getCompanyName } from "@/utils/name";

export default {
  props: {
    by: String,
    time: String,
    imgSrc: String,
    company: String,
    heading: String,
    link: String
  },
  methods: {
    getTimeAgo,
    getCompanyName
  }
};
</script>
