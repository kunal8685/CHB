// src/utils/format.js
export const formatDate = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleString();
};
