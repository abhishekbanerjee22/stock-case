<template>
  <button :class="className" @click="onClick" :disabled="disabled">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    full: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick: function(e) {
      e.preventDefault();
      this.$emit("onclick");
    }
  },
  computed: {
    className: function() {
      const { disabled, focused } = this;
      return ` ${disabled ? "bg-gray-500 text-gray-600" : "text-white"} ${
        focused ? "bg-primary-900" : "bg-transparent"
      } font-semibold text-xl px-6 py-2 rounded-sm font-body`;
    }
  }
};
</script>
