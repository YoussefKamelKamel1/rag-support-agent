interface RAGResponse {
  answer: string;
  sources: { document: string; text: string; relevance: number }[];
  confidence: number;
}

const knowledgeBase: Record<string, RAGResponse> = {
  pricing: {
    answer:
      "Based on our documentation, we offer three plans:\n\n" +
      "**Free** ($0) — 5 competitors, daily checks, basic diffs\n" +
      "**Pro** ($49/mo) — 25 competitors, hourly checks, AI reports, Slack integration, visual diffs\n" +
      "**Enterprise** ($199/mo) — unlimited competitors, API access, custom integrations, SSO, white-label reports\n\n" +
      "All plans include a 14-day free trial with no credit card required.",
    sources: [
      { document: "pricing-guide.pdf", text: "Pro plan at $49/month includes 25 competitors, hourly checks, and AI-digested weekly reports.", relevance: 0.94 },
      { document: "faq.md", text: "Enterprise plan at $199/month adds unlimited competitors, API access, and SSO support.", relevance: 0.87 },
    ],
    confidence: 0.95,
  },
  cancel: {
    answer:
      "You can cancel your subscription at any time from your **Billing Settings** page. Cancellation takes effect at the end of your current billing period — you'll retain access until then. No questions asked, no penalties.\n\n" +
      "If you cancel during your 14-day free trial, you won't be charged at all.",
    sources: [
      { document: "terms-of-service.pdf", text: "Users may cancel at any time. Cancellation takes effect at the end of the current billing cycle.", relevance: 0.91 },
      { document: "faq.md", text: "Cancel anytime from Billing Settings. Free trial users are never charged.", relevance: 0.88 },
    ],
    confidence: 0.93,
  },
  integrations: {
    answer:
      "We integrate with the following platforms:\n\n" +
      "**Slack** — Get real-time competitor change notifications in channels\n" +
      "**Discord** — Same as Slack, for Discord servers\n" +
      "**Email** — Daily or weekly summary digests\n" +
      "**API** — Full REST API for custom integrations (Enterprise plan)\n" +
      "**Webhooks** — Push change events to your own systems\n\n" +
      "Setup is available in Settings → Integrations.",
    sources: [
      { document: "integrations-guide.md", text: "CompetiLead supports Slack, Discord, Email, API, and Webhook integrations.", relevance: 0.96 },
      { document: "api-docs.html", text: "The REST API provides full access to competitor data, changes, and reports.", relevance: 0.85 },
    ],
    confidence: 0.94,
  },
  sso: {
    answer:
      "**SAML-based SSO** is available on the Enterprise plan. We support:\n\n" +
      "- Okta\n- Azure AD / Entra ID\n- Google Workspace\n- OneLogin\n- Any SAML 2.0 IdP\n\n" +
      "To configure: go to Settings → Security → SSO, enter your IdP metadata URL, and enable enforcement. You can make SSO mandatory for all members in your organization.",
    sources: [
      { document: "sso-setup-guide.pdf", text: "SSO is available on Enterprise plans. Supported IdPs include Okta, Azure AD, Google Workspace.", relevance: 0.97 },
      { document: "security-whitepaper.md", text: "All authentication uses SAML 2.0 with 256-bit encryption for data in transit.", relevance: 0.82 },
    ],
    confidence: 0.96,
  },
  api: {
    answer:
      "The CompetiLead API is a RESTful API available on the **Enterprise** plan. Key features:\n\n" +
      "- List and manage competitors programmatically\n- Fetch change history and diffs\n- Trigger manual checks\n- Webhook management\n- Rate limit: 1,000 requests/minute\n\n" +
      "Full documentation is available at docs.competilead.com/api. Generate your API key in Settings → API Keys.",
    sources: [
      { document: "api-docs.html", text: "REST API provides competitor management, change retrieval, and webhook management.", relevance: 0.93 },
      { document: "api-docs.html", text: "Rate limit is 1,000 requests per minute. Authenticate via Bearer token in the Authorization header.", relevance: 0.89 },
    ],
    confidence: 0.92,
  },
  refund: {
    answer:
      "We offer a **30-day money-back guarantee** on all paid plans. If you're not satisfied within the first 30 days of upgrading, contact support and we'll issue a full refund — no questions asked.\n\n" +
      "Refunds are processed within 5-10 business days to the original payment method.",
    sources: [
      { document: "refund-policy.md", text: "30-day money-back guarantee on all paid plans. Refunds processed within 5-10 business days.", relevance: 0.98 },
    ],
    confidence: 0.97,
  },
  security: {
    answer:
      "CompetiLead takes security seriously. Here's our approach:\n\n" +
      "- **Encryption**: All data encrypted at rest (AES-256) and in transit (TLS 1.3)\n" +
      "- **SOC 2 Type II**: Certified (Enterprise plan)\n" +
      "- **GDPR compliant**: Data processing in EU and US regions\n" +
      "- **SSO + 2FA**: Available on all plans\n" +
      "- **Audit logs**: Track every action in your organization\n\n" +
      "Our full security whitepaper is available on request.",
    sources: [
      { document: "security-whitepaper.md", text: "AES-256 encryption at rest, TLS 1.3 in transit. SOC 2 Type II certified.", relevance: 0.95 },
      { document: "gdpr-compliance.md", text: "GDPR compliant with data processing available in EU and US regions.", relevance: 0.88 },
    ],
    confidence: 0.93,
  },
};

const fallbackResponses: RAGResponse[] = [
  {
    answer: "I don't have enough information in the knowledge base to answer that question accurately. Could you rephrase or ask about pricing, integrations, SSO, cancellations, or our API?",
    sources: [],
    confidence: 0.3,
  },
];

export function getMockResponse(question: string): RAGResponse {
  const q = question.toLowerCase();

  if (q.includes("price") || q.includes("cost") || q.includes("plan") || q.includes("subscription") || q.includes("free")) {
    return knowledgeBase.pricing;
  }
  if (q.includes("cancel") || q.includes("refund") || q.includes("money back")) {
    return q.includes("refund") || q.includes("money") ? knowledgeBase.refund : knowledgeBase.cancel;
  }
  if (q.includes("integrat") || q.includes("slack") || q.includes("discord") || q.includes("connect")) {
    return knowledgeBase.integrations;
  }
  if (q.includes("sso") || q.includes("saml") || q.includes("okta") || q.includes("azure") || q.includes("single sign")) {
    return knowledgeBase.sso;
  }
  if (q.includes("api") || q.includes("developer") || q.includes("programm")) {
    return knowledgeBase.api;
  }
  if (q.includes("secure") || q.includes("encrypt") || q.includes("gdpr") || q.includes("soc")) {
    return knowledgeBase.security;
  }

  const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  fallback.answer = `I don't have specific documentation about "${question.substring(0, 40)}..." in my knowledge base yet. I can help with questions about:\n\n- Pricing plans and billing\n- Cancellation and refunds\n- Integrations (Slack, Discord, etc.)\n- SSO setup and security\n- API access and documentation\n\nWould you like to ask about any of these?`;
  return fallback;
}
