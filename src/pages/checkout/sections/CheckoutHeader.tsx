// ============================================================
// src/pages/checkout/sections/CheckoutHeader.tsx
// Top-left logo block on the checkout page.
//
// Uses the app's standard <Logo variant="header" /> (34×34
// mark + CODING / SHUTTLE wordmark) in place of the source's
// bespoke 26×26 swoosh SVG. Wrapper spacing is preserved from
// the source so the block sits in the same position.
// ============================================================

import { Logo } from "../../../components/common/Logo";

export function CheckoutHeader() {
  return (
    <div className="order-1 pt-[15px] pl-[15px] lg:pl-[110px]">
      <a href="/" className="inline-flex items-center gap-2">
        <Logo variant="header" />
      </a>
    </div>
  );
}