<template>
  <div class="form-group">
    <label :for="vfjsFieldId">{{ computedLabel }}</label>
    <select
      :id="vfjsFieldId"
      :placeholder="computedPlaceholder"
      :name="vfjsFieldModelKey"
      :value="vfjsFieldModel"
      :required="vfjsFieldRequired"
      :aria-describedby="computedHelpId"
      :class="'form-control is-' + computedErrorClass"
      @input="onInput"
    >
      <option :value="undefined" >
        -- Please select --
      </option>
      <option :value="opt.value" v-for="opt in options" :key="opt.value">
        {{ opt.text }}
      </option>
    </select>
    <div
      :class="computedErrorClass + '-feedback'"
      v-show="vfjsComputedShowFieldErrors"
    >
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

export default {
  mixins: [vfjsFieldMixin, appMixins],
  computed: {
    options() {
      const options =
        this.vfjsFieldUiSchema.enum || this.vfjsFieldSchema.enum || [];
      if( options[0] !== undefined && ( typeof options[0] !== 'object') ){
        return options.map( v => { return { text: v, value: v}; });
      }
      return options;
    },
  },
};
</script>
