import React from "react";
import { FIELD_TYPES } from "../utils/constants";
import ToggleSwitch from "./ToggleSwitch";

export default function FieldEditor({ fields, setFields, nesting = 0 }) {
  const anyToggleOn = fields.some((f) => f.enabled);

  const addField = () => {
    const lastField = fields[fields.length - 1];
    if (lastField && !lastField.name) {
      alert("Please fill in the previous field name before adding a new one.");
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

  const setFieldProp = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;

    if (key === "type") {
      updated[index].nestedFields = value === "nested" ? [] : [];
      updated[index].arrayValues = value === "array" ? [""] : [];
      updated[index].objectFields = value === "object" ? [] : [];
    }

    setFields(updated);
  };

  const handleToggle = (index) => {
    const updated = [...fields];
    updated[index].enabled = !updated[index].enabled;
    setFields(updated);
  };

  const updateArrayValue = (fieldIdx, valueIdx, newValue) => {
    const updated = [...fields];
    updated[fieldIdx].arrayValues[valueIdx] = newValue;
    setFields(updated);
  };

  const addArrayValue = (index) => {
    const updated = [...fields];
    updated[index].arrayValues.push("");
    setFields(updated);
  };

  const removeArrayValue = (fIndex, vIndex) => {
    const updated = [...fields];
    updated[fIndex].arrayValues.splice(vIndex, 1);
    setFields(updated);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const setNestedFields = (index, nested) => {
    const updated = [...fields];
    updated[index].nestedFields = nested;
    setFields(updated);
  };

  const setObjectFields = (index, nested) => {
    const updated = [...fields];
    updated[index].objectFields = nested;
    setFields(updated);
  };

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
        <div key={i} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
            <div style={{ flex: 1, display: "flex", gap: 8 }}>
              <input
                style={{ flex: 1 }}
                placeholder="Field name"
                value={field.name}
                onChange={(e) => setFieldProp(i, "name", e.target.value)}
              />
              <select
                style={{ flex: 1 }}
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
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <ToggleSwitch enabled={field.enabled} onToggle={() => handleToggle(i)} />
              <button
                onClick={() => removeField(i)}
                type="button"
                title="Remove field"
                style={{ border: "none", background: "none", color: "#c00", fontSize: 18, cursor: "pointer" }}
              >
                ×
              </button>
            </div>
          </div>

          {field.type === "nested" && (
            <FieldEditor fields={field.nestedFields} setFields={(v) => setNestedFields(i, v)} nesting={nesting + 1} />
          )}
          {field.type === "object" && (
            <FieldEditor fields={field.objectFields} setFields={(v) => setObjectFields(i, v)} nesting={nesting + 1} />
          )}
          {field.type === "array" && (
            <div style={{ marginLeft: 20, marginTop: 4 }}>
              {field.arrayValues.map((val, idx) => (
                <div key={idx} style={{ display: "flex", marginBottom: 4 }}>
                  <input
                    value={val}
                    placeholder={`Value ${idx + 1}`}
                    style={{ width: 160, marginRight: 6 }}
                    onChange={(e) => updateArrayValue(i, idx, e.target.value)}
                  />
                  <button
                    type="button"
                    style={{ border: "none", background: "none", color: "#c00", fontSize: 18, cursor: "pointer" }}
                    onClick={() => removeArrayValue(i, idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayValue(i)}
                style={{ padding: "5px 10px", fontSize: 12, cursor: "pointer" }}
              >
                + Add Value
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addField}
        disabled={anyToggleOn}
        style={{
          background: anyToggleOn ? "#888" : "#1956f2",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "8px 0",
          width: "100%",
          marginTop: 6,
          fontWeight: "bold",
          cursor: anyToggleOn ? "not-allowed" : "pointer",
        }}
        title={anyToggleOn ? "Disable toggles to add new field" : "Add field"}
      >
        + Add Item
      </button>
    </div>
  );
}
