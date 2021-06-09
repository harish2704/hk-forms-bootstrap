<template>
  <div class="form-group">
    <div class="input-group mb-3" id="pick-avatar">
      <input
        type="text"
        v-model="tmpSelectedPhoto"
        readonly
        class="form-control"
        :placeholder="vfjsFieldSchema.title || vfjsFieldModelKey"
      />
      <input
        type="text"
        name="tmpSelectedPhoto"
        v-model="tmpSelectedPhoto"
        :required="vfjsFieldRequired"
        class="custom-control-input"
      />
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">Browse</span>
      </div>
    </div>
    <img
      class="rounded img-thumbnail img-fluid mx-auto d-block"
      width="200"
      :src="imageUrl"
      alt="Preview"
      v-if="vfjsFieldModel"
    ></img>
    <AvatarCropper
      trigger="#pick-avatar"
      @changed="photoChangedHandler"
      @cancel="photoCancelHandler"
      :upload-handler="photoUploadHandler"
    />
  </div>
</template>

<script>
import { vfjsFieldMixin } from "vue-form-json-schema";
import AvatarCropper from "./AvatarCropper.vue";
export default {
  mixins: [vfjsFieldMixin],
  data() {
    return {
      tmpSelectedPhoto: "",
    };
  },

  components: {
    AvatarCropper,
  },

  computed: {
    imageUrl() {
      const model = this.vfjsFieldModel;
      if (model instanceof Blob) {
        return URL.createObjectURL(model);
      }
      return "";
    },
  },
  methods: {
    onInput: function(value) {
      const val = this.vfjsFieldSchema.type === "boolean" ? value : value;
      this.setModel(val);
    },

    photoCancelHandler() {
      this.tmpSelectedPhoto = "";
    },
    photoChangedHandler(fileInput) {
      this.tmpSelectedPhoto = fileInput.name;
    },

    photoUploadHandler(cropper) {
      cropper.getCroppedCanvas({ width: 512, height: 512 }).toBlob(
        (blob) => {
          this.setModel(blob);
        },
        "image/jpeg",
        0.9
      );
    },
  },
};
</script>

<style type="text/css"></style>
