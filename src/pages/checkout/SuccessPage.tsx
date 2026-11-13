// src/pages/checkout/SuccessPage.tsx
//
// Confirmation page. Receives the verifyPayment() result via
// react-router state — no polling. The backend already committed
// Payment PAID, Order PAID, Enrollment, and Invoice before this page
// renders.
//
// Refresh fallback: if router state is absent (user refreshed), a single
// GET /orders/:id restores the display. One request, no interval.

import { Link, useLocation, useSearchParams } from "react-router-dom";

import {
  useGetOrderQuery,
  type VerifyPaymentResult,
} from "../../services/checkoutApi";
import { formatPrice } from "./utils";

interface SuccessLocationState {
  verified?: VerifyPaymentResult;
}

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const orderId = searchParams.get("orderId") ?? "";
  const verified = (location.state as SuccessLocationState | null)?.verified;

  // Skip the fetch when we already have the verify result (happy path).
  const skipFetch = !!verified || !orderId;
  const { data, isFetching, error } = useGetOrderQuery(orderId, {
    skip: skipFetch,
  });

  /* ── Missing orderId ── */
  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-lg border border-slate-200 p-6 text-center">
          <h1 className="text-lg font-semibold">Missing order id</h1>
          <Link to="/" className="mt-4 inline-block text-indigo-600 text-sm">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  /* ── Happy path — verify result in router state ── */
  if (verified) {
    return (
      <SuccessCard
        amount={null}
        invoiceNumber={null}
        orderId={verified.orderId}
        invoiceId={verified.invoiceId}
        note="Your payment has been confirmed."
      />
    );
  }

  /* ── Refresh path — one fallback fetch ── */
  if (isFetching || (!data && !error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <p className="text-sm text-slate-600">Loading your order…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-lg border border-slate-200 p-6 text-center">
          <h1 className="text-lg font-semibold">Couldn't load your order</h1>
          <p className="mt-2 text-sm text-slate-600">
            {(error as { data?: { error?: { message?: string } } })?.data?.error
              ?.message ?? "Please try again."}
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center justify-center w-full h-10 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (data?.order.status === "PAID") {
    return (
      <SuccessCard
        amount={data.order.totalAmount}
        invoiceNumber={data.invoice?.invoiceNumber ?? null}
        orderId={data.order.id}
        invoiceId={data.invoice?.id}
      />
    );
  }

  /* Extremely rare — refresh before commit (should not happen with the
     synchronous verify flow). Show the raw status. */
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-lg border border-slate-200 p-6 text-center">
        <h1 className="text-lg font-semibold">
          Order status: {data?.order.status ?? "unknown"}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          If money was debited, contact support with order id{" "}
          <span className="font-mono">{orderId}</span>.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center justify-center w-full h-10 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function SuccessCard({
  amount,
  invoiceNumber,
  orderId,
  invoiceId,
  note,
}: {
  amount: number | null;
  invoiceNumber: string | null;
  orderId: string;
  invoiceId?: string;
  note?: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-lg border border-slate-200 p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <svg
            className="w-6 h-6 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
        </div>
        <h1 className="mt-4 text-lg font-semibold">Payment successful</h1>
        {note && <p className="mt-1 text-[13px] text-slate-500">{note}</p>}
        {amount !== null && (
          <p className="mt-2 text-sm text-slate-600">
            Amount paid: {formatPrice(amount)}
          </p>
        )}
        {invoiceNumber && (
          <p className="mt-1 text-[13px] text-slate-500">
            Invoice: <span className="font-mono">{invoiceNumber}</span>
          </p>
        )}
        <p className="mt-2 text-[12px] text-slate-400">
          Order id: <span className="font-mono">{orderId}</span>
          {invoiceId && (
            <>
              {" "}
              · Invoice id: <span className="font-mono">{invoiceId}</span>
            </>
          )}
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center justify-center w-full h-10 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Go to my courses
        </Link>
      </div>
    </div>
  );
}