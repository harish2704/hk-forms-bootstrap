<template>
  <fieldset>
    <legend>
      Item list: {{ vfjsFieldModelKey }}
      <button type="button" @click="appendItem">add</button>
    </legend>
    <table>
      <tr v-for="(model, index) in vfjsFieldModel" :key="index">
        <td>
          <vue-form-json-schema
            :schema="vfjsFieldSchema.items"
            :ui-schema="vfjsChildrenUiSchema"
            :model="model"
            :id="id(index)"
            :options="vfjsOptions"
            @change="v => onChange(index, v)"
          />
        </td>
        <td>
          <button type="button" @click="remove(index)">remove</button>
          <button type="button" @click="clone(index)">clone</button>
        </td>
      </tr>
    </table>
  </fieldset>
</template>

<script>
import { vfjsFieldMixin } from "vue-form-json-schema";
export default {
  mixins: [vfjsFieldMixin],
  methods: {
    id(index) {
      return `${this.vfjsFieldId}-${index}`;
    },
    onChange(index, model) {
      const newModel = this.vfjsFieldModel.slice();
      newModel[index] = model;
      this.setModel(newModel);
    },
    appendItem() {
      this.setModel((this.vfjsFieldModel || []).concat([{}]));
    },
    clone(index) {
      const newData = this.vfjsFieldModel.slice();
      newData.splice(index, 0, { ...this.vfjsFieldModel[index] });
      this.setModel(newData);
    },
    remove(index) {
      this.vfjsFieldModel.splice(index, 1);
      this.setModel(this.vfjsFieldModel.slice());
    }
  }
};
</script>

