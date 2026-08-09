"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Status = "idle" | "submitting" | "success" | "error";

const PROJECT_TYPE_LABEL: Record<string, string> = {
  new: "New site",
  redesign: "Redesign",
  migration: "Migration",
  maintenance: "Ongoing maintenance",
};

const PLATFORM_LABEL: Record<string, string> = {
  wordpress: "WordPress",
  shopify: "Shopify",
  webflow: "Webflow",
  "not-sure": "Not sure yet",
};

const BUDGET_LABEL: Record<string, string> = {
  unset: "Prefer not to say",
  lt3: "Under $3k",
  "3-8": "$3k – $8k",
  "8-15": "$8k – $15k",
  "15plus": "$15k+",
};

const TIMELINE_LABEL: Record<string, string> = {
  asap: "ASAP",
  "1-2m": "Within 1–2 months",
  flexible: "Flexible",
};

function buildEmailContent(fields: {
  name: string;
  email: string;
  projectType: string;
  platform: string;
  budget: string;
  timeline: string;
  message: string;
}) {
  const rows = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Project type", PROJECT_TYPE_LABEL[fields.projectType] ?? fields.projectType],
    ["Platform", PLATFORM_LABEL[fields.platform] ?? fields.platform],
    ["Budget", BUDGET_LABEL[fields.budget] ?? fields.budget],
    ["Timeline", TIMELINE_LABEL[fields.timeline] ?? fields.timeline],
  ];

  const plainText = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    fields.message,
  ].join("\n");

  const htmlContent = `
    <div style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#12141C;">
      <table cellpadding="4" cellspacing="0">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#565B6B;padding-right:12px;">${k}</td><td><strong>${v}</strong></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin-top:16px;color:#565B6B;">Message</p>
      <p>${fields.message.replace(/\n/g, "<br/>")}</p>
    </div>
  `;

  return { plainText, htmlContent };
}

function PublishButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      data-inspect="action: primary-cta"
      className="flex items-center justify-center gap-2 rounded-[9px] bg-amber px-6 py-3 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-px disabled:opacity-60 disabled:pointer-events-none"
    >
      {pending ? (
        <>
          <Loader2 size={15} className="animate-spin" />
          Publishing…
        </>
      ) : (
        <>
          Publish
          <svg
            width={13}
            height={13}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </>
      )}
    </button>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-head > *", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".contact-head", start: "top 82%" },
      });
      gsap.from(".contact-panel", {
        opacity: 0,
        y: 20,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: ".contact-panel", start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name")?.toString() ?? "").trim();
    const email = (data.get("email")?.toString() ?? "").trim();
    const message = (data.get("message")?.toString() ?? "").trim();
    const projectType = data.get("projectType")?.toString() ?? "";
    const platform = data.get("platform")?.toString() ?? "";
    const budget = data.get("budget")?.toString() ?? "";
    const timeline = data.get("timeline")?.toString() ?? "";

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and a short message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("That email address doesn't look right.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const { plainText, htmlContent } = buildEmailContent({
      name,
      email,
      projectType,
      platform,
      budget,
      timeline,
      message,
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          projectType,
          platform,
          budget,
          timeline,
          message,
          plainText,
          htmlContent,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setStatus("error");
        setErrorMsg(body?.error ?? "Something went wrong sending that — try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't reach the server — check your connection and try again.");
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="mx-auto max-w-[1180px] px-8 sm:px-5 py-16 lg:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <div className="contact-head">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-2 pr-3 text-[11.5px] font-medium text-ink-soft mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            Contact
          </div>
          <h2
            data-inspect="element: h2.section-title"
            className="font-display font-semibold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.01em] mb-3"
          >
            Tell me about the project
          </h2>
          <p className="text-[15px] leading-relaxed text-ink-soft max-w-[380px]">
            The more specific, the faster I can give you a real timeline and
            number instead of a guess. I reply within one business day.
          </p>
        </div>

        <div
          className="contact-panel rounded-xl border border-line bg-white overflow-hidden"
          data-inspect="component: contact-form"
        >
          <div className="flex items-center gap-2 border-b border-line bg-[#FAFBFC] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="w-[7px] h-[7px] rounded-full bg-line" />
              <span className="w-[7px] h-[7px] rounded-full bg-line" />
              <span className="w-[7px] h-[7px] rounded-full bg-line" />
            </div>
            <span className="font-mono text-[11px] text-ink-soft">
              publish-settings.json
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-10 gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint/15">
                  <Check size={20} strokeWidth={2.5} className="text-mint" />
                </span>
                <h3 className="font-semibold text-[16px]">Published.</h3>
                <p className="text-[13.5px] text-ink-soft max-w-[300px]">
                  Thanks — that&apos;s landed in my inbox. I&apos;ll reply
                  within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Your name</Label>
                    <Input id="name" name="name" placeholder="Jordan Lee" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jordan@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <Label htmlFor="projectType">Project type</Label>
                    <Select name="projectType" defaultValue="new">
                      <SelectTrigger id="projectType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New site</SelectItem>
                        <SelectItem value="redesign">Redesign</SelectItem>
                        <SelectItem value="migration">Migration</SelectItem>
                        <SelectItem value="maintenance">
                          Ongoing maintenance
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select name="platform" defaultValue="not-sure">
                      <SelectTrigger id="platform">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wordpress">WordPress</SelectItem>
                        <SelectItem value="shopify">Shopify</SelectItem>
                        <SelectItem value="webflow">Webflow</SelectItem>
                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget</Label>
                    <Select name="budget" defaultValue="unset">
                      <SelectTrigger id="budget">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unset">Prefer not to say</SelectItem>
                        <SelectItem value="lt3">Under $3k</SelectItem>
                        <SelectItem value="3-8">$3k – $8k</SelectItem>
                        <SelectItem value="8-15">$8k – $15k</SelectItem>
                        <SelectItem value="15plus">$15k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select name="timeline" defaultValue="flexible">
                    <SelectTrigger id="timeline" className="sm:max-w-[240px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1-2m">Within 1–2 months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Project details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="What are you building, and what's not working about the current site (if there is one)?"
                    required
                  />
                </div>

                {status === "error" && (
                  <p className="text-[13px] text-red-600 -mt-1">{errorMsg}</p>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[11px] text-ink-soft">
                    status: <span className="text-mint">draft</span>
                  </span>
                  <PublishButton pending={status === "submitting"} />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

