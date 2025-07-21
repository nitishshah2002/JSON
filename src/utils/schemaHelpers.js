export function fieldsToJSONSchema(fields) {
  const result = {};
  fields.forEach((field) => {
    if (!field.name) return;
    if (field.type === "nested") {
      result[field.name] = fieldsToJSONSchema(field.nestedFields);
    } else if (field.type === "object") {
      result[field.name] = fieldsToJSONSchema(field.objectFields);
    } else if (field.type === "array") {
      result[field.name] = field.arrayValues.filter((v) => v !== "");
    } else {
      result[field.name] = field.type;
    }
  });
  return result;
}
