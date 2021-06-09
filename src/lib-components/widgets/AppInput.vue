<template>
  <div class="form-group">
    <label :for="vfjsFieldId">{{ computedLabel }}</label>
    <input
      :id="vfjsFieldId"
      :value="vfjsFieldModel"
      :placeholder="computedPlaceholder"
      :name="vfjsFieldModelKey"
      :type="inputType"
      :required="vfjsFieldRequired"
      @input="onInputThrottled"
      :aria-describedby="computedHelpId"
      :class="'form-control is-' + computedErrorClass "
    />
    <div :class="computedErrorClass + '-feedback' " v-show="vfjsComputedShowFieldErrors">
      {{ computedErrorMessage }}
    </div>
    <small :id="computedHelpId" class="form-text text-muted">
      {{ vfjsFieldSchema.description }}
    </small>
  </div>
</template>

<script>
import { vfjsFieldMixin } from "vue-form-json-schema";
import appMixins from "./mixins";
// import debounce from 'lodash/debounce';

const schemaTypeInputTypeMap = {
  integer: "number",
  boolean: "checkbox",
};

const schemaFormatInputTypeMap = {
  email: "email",
};

export default {
  mixins: [vfjsFieldMixin, appMixins],
  computed: {
    inputType() {
      return (
        this.vfjsFieldUiSchema.type ||
        schemaFormatInputTypeMap[this.vfjsFieldSchema.format] ||
        schemaTypeInputTypeMap[this.vfjsFieldSchema.type] ||
        "text"
      );
    },
  },
};
</script>
