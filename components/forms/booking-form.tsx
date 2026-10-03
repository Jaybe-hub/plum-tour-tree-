"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample options — used only when no tours have been published in Sanity
// yet. Replace by publishing real tours in Studio; this list is then
// ignored automatically once `tourOptions` is non-empty.
const SAMPLE_TOURS = [
  "Sample Tour — replace with a real published tour",
  "General enquiry (no specific tour yet)"
];

const schema = z.object({
  tour: z.string().optional(),
  destination: z.string().min(2, "Enter a destination"),
  travelDate: z.string().min(1, "Choose a preferred date"),
  travellers: z.coerce.number().min(1, "At least 1 traveller").max(20, "For groups above 20, message us directly"),
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone / WhatsApp number"),
  message: z.string().optional()
});
type FormValues = z.infer<typeof schema>;

export function BookingForm({ tourOptions }: { tourOptions: string[] }) {
  const options = tourOptions.length > 0 ? tourOptions : SAMPLE_TOURS;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { travellers: 1 } });

  function onSubmit(values: FormValues) {
    const lines = [
      "Hello Plum Tree Tours, I'd like to make a tour booking enquiry.",
      "",
      values.tour ? `Tour: ${values.tour}` : null,
      `Destination: ${values.destination}`,
      `Preferred date: ${values.travelDate}`,
      `Travellers: ${values.travellers}`,
      `Name: ${values.fullName}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      values.message ? `Message: ${values.message}` : null
    ].filter(Boolean);

    const url = `https://wa.me/2349024866059?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const fieldClass = "flex flex-col gap-1.5 text-left";
  const labelClass = "text-xs font-medium text-ink-secondary";
  const errorClass = "text-xs text-red-600";
  const selectClass = cn(
    "h-11 w-full rounded-control border border-purple-900/15 bg-white px-4 text-sm text-ink",
    "focus-visible:border-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-700"
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-xl space-y-5 rounded-card border border-purple-900/10 bg-white p-8 shadow-card">
      <div className={fieldClass}>
        <label htmlFor="tour" className={labelClass}>Tour / package (optional)</label>
        <select id="tour" className={selectClass} {...register("tour")}>
          <option value="">Not sure yet — I&apos;ll describe below</option>
          {options.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className={fieldClass}>
        <label htmlFor="destination" className={labelClass}>Destination</label>
        <Input id="destination" placeholder="e.g. Zanzibar, Obudu, Dubai" error={!!errors.destination} {...register("destination")} />
        {errors.destination && <p className={errorClass}>{errors.destination.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldClass}>
          <label htmlFor="travelDate" className={labelClass}>Preferred travel date</label>
          <Input id="travelDate" type="date" error={!!errors.travelDate} {...register("travelDate")} />
          {errors.travelDate && <p className={errorClass}>{errors.travelDate.message}</p>}
        </div>
        <div className={fieldClass}>
          <label htmlFor="travellers" className={labelClass}>Number of travellers</label>
          <Input id="travellers" type="number" min={1} max={20} error={!!errors.travellers} {...register("travellers")} />
          {errors.travellers && <p className={errorClass}>{errors.travellers.message}</p>}
        </div>
      </div>

      <div className={fieldClass}>
        <label htmlFor="fullName" className={labelClass}>Full name</label>
        <Input id="fullName" error={!!errors.fullName} {...register("fullName")} />
        {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldClass}>
          <label htmlFor="email" className={labelClass}>Email</label>
          <Input id="email" type="email" error={!!errors.email} {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div className={fieldClass}>
          <label htmlFor="phone" className={labelClass}>Phone / WhatsApp number</label>
          <Input id="phone" type="tel" error={!!errors.phone} {...register("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className={fieldClass}>
        <label htmlFor="message" className={labelClass}>Additional message or request (optional)</label>
        <textarea
          id="message"
          rows={4}
          className="w-full rounded-control border border-purple-900/15 bg-white px-4 py-3 text-sm text-ink focus-visible:border-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-700"
          {...register("message")}
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Preparing enquiry…" : "Send booking enquiry via WhatsApp"}
      </Button>
      <p className="text-center text-xs text-ink-muted">
        This opens WhatsApp with your details pre-filled — no payment is required to enquire.
      </p>
    </form>
  );
}
