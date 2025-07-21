Here's a simple and clear **README** for your **Dynamic Schema Builder** project:

---

# 🛠️ Dynamic Schema Builder

An interactive, dynamic schema builder built with **React**. This tool allows users to create nested JSON schemas by visually adding fields of different types — including `string`, `number`, `boolean`, `float`, `array`, and `object`.

---

## 🚀 Features

* ✅ Add and remove fields dynamically
* ✅ Choose between different data types: string, number, boolean, float, object, array, nested
* ✅ Add multiple array values
* ✅ Add nested object structures recursively
* ✅ Enable/disable fields using toggle switches
* ✅ Prevent new field creation when any toggle is ON
* ✅ Live JSON schema preview
* ✅ Input validation (prevents adding empty field names)

---

## 🖼️ UI Overview

| Feature           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| Toggle Switch     | Enable/disable individual fields                      |
| + Add Item Button | Adds new field (disabled if any toggle is ON)         |
| Field Types       | Dropdown list: string, number, boolean, array, object |
| JSON Output       | Shows the live JSON schema as you build it            |

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/dynamic-schema-builder.git
cd dynamic-schema-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm start
```

---

## 🧱 Project Structure

```
src/
├── components/
│   └── FieldEditor.js      # Recursive field builder logic
├── utils/
│   └── constants.js        # Field type constants
│   └── schemaUtils.js      # JSON schema generation
├── App.js                  # Main layout and structure
└── index.js
```

---

## 📄 Output Example

```json
{
  "id": "number",
  "name": "string",
  "features": [
    "feature1",
    "feature2"
  ],
  "metadata": {
    "author": "string",
    "version": "float"
  }
}
```

---

## 💡 Future Improvements

* Drag-and-drop field ordering
* Field descriptions
* Export schema as `.json` file
* Dark mode

---

## 📃 License

MIT License

---

Would you like me to:

* Auto-generate this README into a `README.md` file?
* Add screenshots or a GIF preview to the README?
