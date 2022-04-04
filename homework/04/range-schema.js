module.exports = {
  type: "object",
  properties: {
    lower: { type: "number", minimum: -90, maximum: 90 },
    upper: { type: "number", minimum: -90, maximum: 90 },
  },
  required: ["lower", "upper"],
};
