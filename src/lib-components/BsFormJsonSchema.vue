<template>
  <div>
    <VueFormJsonSchema
      :options="options"
      :uiSchema="uiSchema"
      :schema="jsonSchema"
      :value="value"
      @change="onChange"
    ></VueFormJsonSchema>
  </div>
</template>

<script>
import Vue from "vue";
import addFormats from "ajv-formats";
import VueFormJsonSchema from "vue-form-json-schema";

import { getJsonSchema, getUiSchema } from "./schema-utils.js";
import {
  AppArrayContainer,
  AppImageSelect,
  AppInput,
  AppRadioSelect,
  AppSelect,
  AppTextarea,
} from "./widgets";

Vue.component("AppArrayContainer", AppArrayContainer);
Vue.component("AppImageSelect", AppImageSelect);
Vue.component("AppInput", AppInput);
Vue.component("AppRadioSelect", AppRadioSelect);
Vue.component("AppSelect", AppSelect);
Vue.component("AppTextarea", AppTextarea);

const formOptions = () => {
  return {
    showValidationErrors: true,
    castToSchemaType: true,
    validateOnLoad: false,
    ajv: {
      plugins: [addFormats],
      options: {
        strict: false,
        strictSchema: false,
      },
    },
  };
};

export default {
  props: {
    options: {
      type: Object,
      default: formOptions,
    },

    schema: Object,
    value: Object,
  },

  computed: {
    uiSchema() {
      return getUiSchema(this.schema);
    },

    jsonSchema() {
      return getJsonSchema(this.schema);
    },
  },

  components: {
    VueFormJsonSchema,
  },
  methods: {
    onChange(args) {
      this.$emit("input", args);
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";
</style>
