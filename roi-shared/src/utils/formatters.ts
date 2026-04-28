// @ts-nocheck
export const formatCurrency = (value, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
};

export const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
};
