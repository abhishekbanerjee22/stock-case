<template>
  <label :class="className" @click="onClick">
    {{ type }}
  </label>
</template>

<script>
export default {
  props: {
    type: String,
    active: Boolean
  },
  methods: {
    onClick: function() {
      this.$emit("onclick");
    }
  },
  computed: {
    className: function() {
      const { type, active } = this;
      let appendString = "";
      let activeString = active ? "" : "opacity-50";
      if (type === "General") {
        appendString = "border-primary-900";
      } else if (type === "Positive") {
        appendString = "border-green-900";
      } else {
        appendString = "border-red-900";
      }
      return `cursor-pointer text-xl md:text-2xl ml-0 md:ml-4 mx-4 tracking-2 border-b-2 border-solid ${appendString} ${activeString}`;
    }
  }
};
</script>
