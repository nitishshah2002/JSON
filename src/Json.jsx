import React, { useState } from "react";

// Extended Field Types
const FIELD_TYPES = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "float", label: "Float" },
  { value: "boolean", label: "Boolean" },
  { value: "object", label: "Object" },
  { value: "array", label: "Array" },
  { value: "nested", label: "Nested" },
];

// Toggle switch styles
const toggleStyles = {
  container: {
    width: 50,
    height: 26,
    borderRadius: 13,
    background: "#ccc",
    position: "relative",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  slider: (enabled) => ({
    background: enabled ? "#4caf50" : "#ccc",
    borderRadius: 13,
    height: "100%",
    width: "100%",
    transition: "background 0.3s",
  }),
  knob: (enabled) => ({
    position: "absolute",
    top: 3,
    left: enabled ? 26 : 3,
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 0 2px rgba(0,0,0,0.5)",
    transition: "left 0.3s",
  }),
};

function FieldEditor({ fields, setFields, nesting = 0 }) {
  const addField = () => {
    const lastField = fields[fields.length - 1];
    if (lastField && !lastField.name) {
      alert("Please fill the previous field name before adding a new one.");
      return;
    }

    setFields([
      ...fields,
      {
        name: "",
        type: "string",
        nestedFields: [],
        arrayValues: [],
        objectFields: [],
        enabled: false,
      },
    ]);
  };

  const setFieldProp = (i, key, value) => {
    const newFields = [...fields];
    newFields[i][key] = value;
    if (key === "type") {
      if (value === "nested") {
        newFields[i].nestedFields = [];
      } else if (value === "array") {
        newFields[i].arrayValues = [""];
      } else if (value === "object") {
        newFields[i].objectFields = [];
      } else {
        newFields[i].nestedFields = [];
        newFields[i].arrayValues = [];
        newFields[i].objectFields = [];
      }
    }
    setFields(newFields);
  };

  const setArrayValue = (fieldIndex, valueIndex, value) => {
    const newFields = [...fields];
    newFields[fieldIndex].arrayValues[valueIndex] = value;
    setFields(newFields);
  };

  const addArrayValue = (fieldIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].arrayValues.push("");
    setFields(newFields);
  };

  const removeArrayValue = (fieldIndex, valueIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].arrayValues.splice(valueIndex, 1);
    setFields(newFields);
  };

  const toggleEnabled = (i) => {
    const newFields = [...fields];
    newFields[i].enabled = !newFields[i].enabled;
    setFields(newFields);
  };

  const removeField = (i) => {
    setFields(fields.filter((_, idx) => idx !== i));
  };

  const setNestedFields = (i, nestedFields) => {
    const newFields = [...fields];
    newFields[i].nestedFields = nestedFields;
    setFields(newFields);
  };

  const setObjectFields = (i, objectFields) => {
    const newFields = [...fields];
    newFields[i].objectFields = objectFields;
    setFields(newFields);
  };

  const anyFieldEnabled = fields.some((field) => field.enabled);

  return (
    <div
      style={{
        borderLeft: nesting ? "3px solid #888" : "none",
        marginLeft: nesting ? 20 : 0,
        paddingLeft: nesting ? 12 : 0,
        marginTop: 8,
      }}
    >
      {fields.map((field, i) => (
        <div key={i}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
              gap: 8,
            }}
          >
            <div style={{ flex: 1, display: "flex", gap: 8 }}>
              <input
                style={{ flex: 1 }}
                placeholder="Field name"
                value={field.name}
                onChange={(e) => setFieldProp(i, "name", e.target.value)}
              />
              <select
                style={{ width: 120 }}
                value={field.type}
                onChange={(e) => setFieldProp(i, "type", e.target.value)}
              >
                {FIELD_TYPES.map((ft) => (
                  <option key={ft.value} value={ft.value}>
                    {ft.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={toggleStyles.container}
                onClick={() => toggleEnabled(i)}
                title={field.enabled ? "Enabled" : "Disabled"}
              >
                <div style={toggleStyles.slider(field.enabled)} />
                <div style={toggleStyles.knob(field.enabled)} />
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#c00",
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => removeField(i)}
                title="Remove"
                type="button"
              >
                ×
              </button>
            </div>
          </div>

          {field.type === "nested" && (
            <FieldEditor
              fields={field.nestedFields}
              setFields={(nestedFields) => setNestedFields(i, nestedFields)}
              nesting={nesting + 1}
            />
          )}

          {field.type === "object" && (
            <FieldEditor
              fields={field.objectFields}
              setFields={(objectFields) => setObjectFields(i, objectFields)}
              nesting={nesting + 1}
            />
          )}

          {field.type === "array" && (
            <div style={{ marginLeft: 20, marginBottom: 8 }}>
              {field.arrayValues.map((val, idx) => (
                <div key={idx} style={{ display: "flex", marginBottom: 4 }}>
                  <input
                    style={{ width: 160, marginRight: 6 }}
                    placeholder={`Value ${idx + 1}`}
                    value={val}
                    onChange={(e) => setArrayValue(i, idx, e.target.value)}
                  />
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      color: "#c00",
                      fontSize: 18,
                      cursor: "pointer",
                    }}
                    onClick={() => removeArrayValue(i, idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayValue(i)}
                style={{
                  padding: "5px 10px",
                  fontSize: 12,
                  marginTop: 4,
                  cursor: "pointer",
                }}
              >
                + Add Value
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        style={{
          background: anyFieldEnabled ? "#888" : "#1956f2",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "8px 0",
          width: "100%",
          marginTop: 4,
          fontWeight: "bold",
          cursor: anyFieldEnabled ? "not-allowed" : "pointer",
        }}
        type="button"
        onClick={addField}
        disabled={anyFieldEnabled}
        title={anyFieldEnabled ? "Disable all toggles to add a new field" : ""}
      >
        + Add Item
      </button>
    </div>
  );
}

function fieldsToJSONSchema(fields) {
  const obj = {};
  for (const field of fields) {
    if (!field.name) continue;
    if (field.type === "nested") {
      obj[field.name] = fieldsToJSONSchema(field.nestedFields);
    } else if (field.type === "object") {
      obj[field.name] = fieldsToJSONSchema(field.objectFields);
    } else if (field.type === "array") {
      obj[field.name] = field.arrayValues.filter((v) => v !== "");
    } else {
      obj[field.name] = field.type;
    }
  }
  return obj;
}

export default function DynamicSchemaBuilder() {
  const [fields, setFields] = useState([
    {
      name: "id",
      type: "number",
      nestedFields: [],
      arrayValues: [],
      objectFields: [],
      enabled: false,
    },
  ]);

  const schemaJSON = fieldsToJSONSchema(fields);

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        padding: 32,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(JSON.stringify(schemaJSON, null, 2));
        }}
        style={{
          flex: 1,
          background: "#fafafa",
          padding: 24,
          borderRadius: 8,
          width: "100%",
        }}
      >
        <FieldEditor fields={fields} setFields={setFields} nesting={0} />
        <button
          style={{
            marginTop: 22,
            padding: "7px 18px",
            border: "1px solid #bbb",
            borderRadius: 4,
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      <pre
        style={{
          background: "#f5f5f5",
          padding: 20,
          borderRadius: 8,
          width: "100%",
        }}
      >
        {JSON.stringify(schemaJSON, null, 2)}
      </pre>
    </div>
  );
}
