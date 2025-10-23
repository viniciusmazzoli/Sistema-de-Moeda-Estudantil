
export function generateCouponCode(prefix = "ME") {
  const r = Math.random().toString(36).slice(2, 8).toUpperCase();
  const t = Date.now().toString(36).slice(-4).toUpperCase();
  return `${prefix}-${r}${t}`;
}
export function semestersSince(d?: Date | null) {
  if (!d) return 1;
  const a = new Date(d); const b = new Date();
  const sa = a.getFullYear()*2 + (a.getMonth()>=6?1:0);
  const sb = b.getFullYear()*2 + (b.getMonth()>=6?1:0);
  return Math.max(0, sb - sa);
}
