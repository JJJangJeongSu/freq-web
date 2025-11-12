export type SendFeedbackPayload = {
  message: string;
  from?: string;
};

const DEFAULT_ENDPOINT = import.meta.env.VITE_FEEDBACK_ENDPOINT || "/api/feedback";

export async function sendFeedback(payload: SendFeedbackPayload) {
  const endpoint = DEFAULT_ENDPOINT;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Feedback request failed with ${res.status}`);
  }
  return (await res.json().catch(() => ({}))) as { success?: boolean };
}

