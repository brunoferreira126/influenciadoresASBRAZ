"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(`${window.location.origin}/i/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return <button className="icon-button" onClick={copy} title="Copiar link" aria-label="Copiar link">{copied ? <Check size={16}/> : <Copy size={16}/>}</button>;
}
