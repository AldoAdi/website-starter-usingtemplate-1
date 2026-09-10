import type { ReactElement } from "react";
import type { Metadata } from "next";
import { BookingConfirmed } from "@aldoadi/website-template/booking";
import { Container, Section } from "@aldoadi/website-template/components";

export const metadata: Metadata = {
  title: "Appointment confirmed",
  robots: { index: false, follow: true },
};

/**
 * Where the scheduler sends a visitor after they finish booking, closing
 * the funnel.
 *
 * This route only ever receives traffic if the scheduler supports a
 * post-booking redirect or a custom confirmation URL -- ask the vendor.
 * Without it the funnel measures booking *intent* and stops at the handoff,
 * and anything reported past that point is a modelled estimate rather than
 * an observation.
 *
 * The visitor's cookies survive the round trip, so the confirmation stitches
 * back to their handoff without the vendor passing anything to us.
 */
export default function BookingConfirmedPage(): ReactElement {
  return (
    <main>
      <Section>
        <Container className="max-w-xl text-center">
          <BookingConfirmed>
            <h1 className="mb-4 text-3xl font-bold tracking-tight">
              You&rsquo;re booked
            </h1>
            <p className="text-muted-foreground">
              Your appointment is confirmed. We&rsquo;ll see you soon.
            </p>
          </BookingConfirmed>
        </Container>
      </Section>
    </main>
  );
}
