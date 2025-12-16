export const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return 'RM 0.00';
  }
  return `RM ${Number(value).toFixed(2)}`;
};

export const formatDate = (value: string | Date): string => {
  const parsed = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(parsed.getTime())) {
    return '-';
  }
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
