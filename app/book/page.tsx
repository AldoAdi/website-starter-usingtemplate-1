import type { ReactElement } from "react";
import type { Metadata } from "next";
import { BookingRedirect } from "@aldoadi/website-template/booking";
import { BOOKING_URL } from "../bookingConfig";

// A redirector has no content to rank, and an indexed one reads to a search
// engine as a doorway page. It is also deliberately absent from sitemap.ts.
// The human-readable "book an appointment" page is what gets indexed; its
// CTA points here.
export const metadata: Metadata = {
  title: "Booking",
  robots: { index: false, follow: true },
};

/**
 * The first-party booking route.
 *
 * Static, so it works under `output: 'export'` and deploys to GitHub Pages
 * unchanged -- everything it does happens in the browser.
 */
export default function BookPage(): ReactElement {
  return (
    <main>
      <BookingRedirect
        providerUrl={BOOKING_URL}
        fallback={
          <p className="text-muted-foreground text-sm">
            Not going anywhere?{" "}
            <a
              className="text-primary underline underline-offset-4"
              href="tel:+15625550100"
            >
              Call us instead
            </a>
            .
          </p>
        }
      />
    </main>
  );
}
