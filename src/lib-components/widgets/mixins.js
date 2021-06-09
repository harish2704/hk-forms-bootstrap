/*
 * src/mixins.js
 * Created: Thu May 27 2021 23:28:58 GMT+0530 (India Standard Time)
 * Copyright 2021 Harish Karumuthil<harish2704@gmail.com>
 */
"use strict";

import { throttle } from "lodash";

function computedPlaceholder() {
  return "Enter " + this.computedLabel;
}

function computedLabel() {
  return this.vfjsFieldSchema.title || this.vfjsFieldModelKey;
}

function computedHelpId() {
  return this.vfjsFieldId + "-help";
}

function computedErrorClass() {
  return this.vfjsComputedFieldHasErrors ? "invalid" : "valid";
}

function computedErrorMessage() {
  return this.vfjsFieldErrors[0] && this.vfjsFieldErrors[0].message;
}

function onInput($event) {
  const val =
    this.vfjsFieldSchema.type === "boolean"
      ? $event.target.checked
      : $event.target.value;
  this.setModel(val);
}

const onInputThrottled = throttle(onInput, 500);

export default {
  computed: {
    computedLabel,
    computedPlaceholder,
    computedHelpId,
    computedErrorClass,
    computedErrorMessage,
  },
  methods:{
    onInput,
    onInputThrottled,
  }
};
