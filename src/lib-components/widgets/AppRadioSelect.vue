<template>
  <fieldset class="form-group">
    <legend class="col-form-label">{{ computedLabel }}</legend>
    <div
      :class="'form-check form-check-inline is-' + computedErrorClass"
      v-for="opt in options"
      v-bind:key="opt.value"
    >
      <input
        class="form-check-input"
        type="radio"
        :name="vfjsFieldModelKey"
        :checked="vfjsFieldModel == opt.value"
        :id="vfjsFieldId + opt.value"
        :required="vfjsFieldRequired"
        :value="opt.value"
        @input="onInput"
        :aria-describedby="computedHelpId"
      />
      <label class="form-check-label" :for="vfjsFieldId + opt.value">
        {{ opt.text || opt }}
      </label>
    </div>
    <div
      :class="computedErrorClass + '-feedback'"
      v-show="vfjsComputedShowFieldErrors"
    >
      {{ computedErrorMessage }}
    </div>
    <small :id="computedHelpId" class="form-text text-muted">
      {{ vfjsFieldSchema.description }}
    </small>
  </fieldset>
</template>

<script>
import { vfjsFieldMixin } from "vue-form-json-schema";
import appMixins from "./mixins";

export default {
  mixins: [vfjsFieldMixin, appMixins],
  computed: {
    options() {
      const options =
        this.vfjsFieldUiSchema.enum || this.vfjsFieldSchema.enum || [];
      return options;
    },
  },
};
</script>
