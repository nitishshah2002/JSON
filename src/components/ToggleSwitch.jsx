import React from "react";

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

export default function ToggleSwitch({ enabled, onToggle }) {
  return (
    <div
      style={toggleStyles.container}
      onClick={onToggle}
      title={enabled ? "Enabled" : "Disabled"}
    >
      <div style={toggleStyles.slider(enabled)} />
      <div style={toggleStyles.knob(enabled)} />
    </div>
  );
}
