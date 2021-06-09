# hk-forms-bootstrap

Bootstrap UI backend for `hk-forms` package.
`hk-forms` is a vue component which render form from json-schema like strucure. 

Behind the scene, hk-forms generates json-schema and ui-schema from a single schema defnition and renders the from using [ vue-form-json-schema ](https://github.com/jarvelov/vue-form-json-schema)

### List of form components

1. `AppArrayContainer`: Array container with add / remove buttons
2. `AppImageSelect`: File input widget for image input fields. supports cropping using cropper.js
3. `AppInput`: Bootstrap input element which supportss validation errors
4. `AppRadioSelect`: Bootstrap radio group component to render enum fields
5. `AppSelect`: Bootstrap select component to render enum fields
6. `AppTextarea`: Bootstrap textarea element which supports validation errors


### Example

Run `npm run serve` or `yarn serve` from project directory to see the example

```javascript

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <form class="">
          <hk-form :schema="schema" v-model="formData"></hk-form>
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
    <div class="row">
      <pre>{{ formData }}</pre>
    </div>
  </div>
</template>

<script>
const schema = {
  type: "object",
  required: [
    "name",
    "phone",
    "email",
    "gender",
    "blood_group",
    "year_of_birth",
    "address",
    "photo",
  ],
  properties: {
    name: {
      title: "Name of the operator",
      description: "Please enter your full name",
      minLength: 3,
      type: "string",
    },
    phone: {
      type: "string",
      maxLength: 10,
      minLength: 7,
      title: "Phone number",
      ui: {
        type: "tel",
      },
    },
    email: {
      type: "string",
      title: "Email Address",
      format: "email",
    },
    gender: {
      title: "Gender",
      enum: [
        { text: "Male", value: "M" },
        { text: "Female", value: "F" },
        { text: "Others", value: "O" },
      ],
      type: "string",
      ui: {
        component: "app-radio-select",
      },
    },
    blood_group: {
      title: "Blood group",
      enum: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
      type: "string",
    },
    year_of_birth: {
      title: "Year of birth",
      maximum: 2021,
      minimum: 1900,
      type: "integer",
    },
    address: {
      type: "string",
      title: "Address of the patient",
      minLength: 10,
      ui: {
        component: "app-textarea",
      },
    },
    photo: {
      type: "object",
      title: "Photo of user",
      ui: {
        component: "app-image-select",
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    // required: 'should have property foo',
  }
};

import { HkForm } from "@/lib-components/";
export default {
  data() {
    return {
      schema,
      formData: {},
    };
  },
  components: {
    HkForm,
  },
};
</script>

```
