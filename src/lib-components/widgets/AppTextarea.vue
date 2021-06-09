<template>
  <div class="form-group">
    <label :for="vfjsFieldId">{{ computedLabel }}</label>
    <textarea
      :id="vfjsFieldId"
      :value="vfjsFieldModel"
      :name="vfjsFieldModelKey"
      :placeholder="computedPlaceholder"
      :required="vfjsFieldRequired"
      @input="onInputThrottled"
      :aria-describedby="computedHelpId"
      :class="'form-control is-' + computedErrorClass "
    >
    </textarea>
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

export default {
  name: "select-component",
  mixins: [vfjsFieldMixin, appMixins],
};
</script>
