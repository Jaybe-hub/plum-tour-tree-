"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/sanity/lib/queries";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-purple-900/10">
      {items.map((item) => (
        <Accordion.Item key={item._id} value={item._id}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left text-sm font-medium text-ink focus-visible:outline-none">
              {item.question}
              <ChevronDown size={18} className="shrink-0 text-ink-muted transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-sm leading-relaxed text-ink-secondary data-[state=open]:animate-fade-up">
            <p className="pb-5 pr-8">{item.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
