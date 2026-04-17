"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Mail } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const { clearCart } = useCart();
  const params = useSearchParams();
  const sessionId = params.get("session_id") ?? "";

  // Clear cart once — payment went through Stripe
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">

        <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-brand-gold" />
        </div>

        <p className="text-xs uppercase tracking-[0.15em] text-brand-gold/70 mb-2">
          Payment Received
        </p>
        <h1 className="font-serif text-3xl text-brand-cream mb-4">
          Order Confirmed
        </h1>
        <p className="text-brand-stone leading-relaxed mb-6">
          Your payment has been received by Stripe and is being verified.
          Once confirmed, your order will be fulfilled automatically and
          you'll receive a delivery email — usually within a minute or two.
        </p>

        <div className="bg-[#1a1a1a] border border-brand-gold/15 rounded-lg p-5 mb-8 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-brand-cream text-sm font-medium mb-1">
                Check your inbox
              </p>
              <p className="text-brand-stone text-xs leading-relaxed">
                Your fulfillment email — with download links or access
                instructions — is sent only after your payment is officially
                confirmed on our server. It will never come from this page.
              </p>
            </div>
          </div>
        </div>

        {sessionId && (
          <p className="text-brand-stone/40 text-xs mb-8 font-mono">
            ref: {sessionId.slice(-12)}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="olive" asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111]" />}>
      <SuccessContent />
    </Suspense>
  );
}
