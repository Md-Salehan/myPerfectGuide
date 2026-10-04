// ============================================================
// src/utils/formatPrice.ts
// Formats a numeric price for display in the UI, using the
// Indian numbering system (lakh/crore grouping).
//
// Mirrors the exact behaviour of the inline script in the
// original index.html:
//
//     const price = Number(btn.dataset.price).toLocaleString("en-IN");
//     priceMain.textContent = "₹ " + price;
//
// The space between "₹" and the number is intentional — it
// matches the original markup exactly (e.g. "₹ 1,599").
//
// Consumed by:
//   - components/product/SidebarEnrollCard.tsx
//   - future checkout / invoice / thank-you pages
// ============================================================

/**
 * Formats a numeric amount as a rupee string with Indian
 * digit grouping (e.g. 1599 -> "₹ 1,599", 299900 -> "₹ 2,99,900").
 *
 * @param amount - The numeric amount to format.
 * @returns The formatted price string, including the "₹ " prefix.
 */
export function formatPrice(amount: number): string {
  return "₹ " + amount.toLocaleString("en-IN");
}