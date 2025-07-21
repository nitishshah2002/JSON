import React, { useState } from "react";
import FieldEditor from "./components/FieldEditor";
import { fieldsToJSONSchema } from "./utils/schemaHelpers";

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
    <div style={{ display: "flex", gap: 32, padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(JSON.stringify(schemaJSON, null, 2));
        }}
        style={{ flex: 1, background: "#fafafa", padding: 24, borderRadius: 8, width: "100%" }}
      >
        <FieldEditor fields={fields} setFields={setFields} nesting={0} />
        <button
          type="submit"
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

      <pre style={{ background: "#f5f5f5", padding: 20, borderRadius: 8, width: "100%" }}>
        {JSON.stringify(schemaJSON, null, 2)}
      </pre>
    </div>
  );
}
