/** Posts the enquiry form to the n8n webhook and wires data-intent links to preselect a service. */
export function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (!form) return;

  const submitBtn = document.getElementById('contact-submit') as HTMLButtonElement | null;
  const label = submitBtn?.querySelector('.submit-label');
  const spinner = submitBtn?.querySelector('.submit-spinner');
  const success = document.getElementById('contact-success');
  const error = document.getElementById('contact-error');
  const select = document.getElementById('contact-service') as HTMLSelectElement | null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn) submitBtn.disabled = true;
    label?.classList.add('hidden');
    spinner?.classList.remove('hidden');
    success?.classList.add('hidden');
    error?.classList.add('hidden');

    const fields = new FormData(form);
    const data = {
      name: String(fields.get('name') ?? ''),
      contact: String(fields.get('contact') ?? ''),
      service: String(fields.get('service') || 'general'),
      message: String(fields.get('message') ?? ''),
      website: String(fields.get('website') ?? ''),
    };

    try {
      const webhook = form.dataset.webhook;
      if (!webhook) throw new Error('Contact webhook is not configured');

      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Server responded ' + res.status);
      success?.classList.remove('hidden');
      form.reset();
    } catch {
      error?.classList.remove('hidden');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      label?.classList.remove('hidden');
      spinner?.classList.add('hidden');
    }
  });

  document.querySelectorAll<HTMLElement>('[data-intent]').forEach((link) => {
    link.addEventListener('click', () => {
      const intent = link.dataset.intent;
      if (select && intent) {
        select.value = intent;
        document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
