/*
 * src/schema-utils.js
 * Created: Wed May 26 2021 23:59:13 GMT+0530 (India Standard Time)
 * Copyright 2021 Harish Karumuthil<harish2704@gmail.com>
 */
"use strict";

const defaultFields = {};

defaultFields.input = function(name, schema) {
  return Object.assign(
    {
      component: "app-input",
      model: name,
    },
    schema.ui
  );
};

defaultFields.select = function(name, schema) {
  return Object.assign(
    {
      component: "app-select",
      model: name,
      enum: schema.enum,
    },
    schema.ui
  );
};

defaultFields.array = function(name, schema) {
  return Object.assign(
    {
      component: "app-array-container",
      model: name,
      children: Object.entries(schema.properties).map(([name, schema]) =>
        defaultFields.default(name, schema)
      ),
    },
    schema.ui
  );
};

defaultFields.default = function(name, schema) {
  switch (schema.type) {
    case "array":
      return defaultFields.array(name, schema.items);
    default:
      if (schema.enum !== undefined) {
        return defaultFields.select(name, schema);
      }
      return defaultFields.input(name, schema);
  }
};

function getUiSchema(lightSchema) {
  return Object.entries(lightSchema.properties).map(([name, schema]) =>
    defaultFields.default(name, schema)
  );
}

function getJsonSchemaField(field) {
  let out;
  switch (field.type) {
    case "object":
      return getJsonSchema(field);
    case "array":
      return field.items.map(getJsonSchemaField);
    default:
      out = Object.assign({}, field, { ui: undefined });
      if (out.enum && typeof out.enum[0] === "object") {
        out.enum = out.enum.map((v) => v.value);
      }
      return out;
  }
}

function getJsonSchema(fullSchema) {
  const out = Object.assign({}, fullSchema);
  out.properties = Object.assign({}, fullSchema.properties);
  const properties = out.properties;
  for (const key in properties) {
    properties[key] = getJsonSchemaField(properties[key]);
  }
  return out;
}

module.exports = {
  defaultFields,
  getUiSchema,
  getJsonSchema,
};
