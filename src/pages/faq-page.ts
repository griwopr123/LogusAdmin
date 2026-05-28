import { faqData, FAQ_EMAIL } from '../data/faq-data'
import { inView, animate } from 'motion'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderFaqPage(lang: string): string {
  const isLv = lang === 'lv'
  const subject = encodeURIComponent(isLv ? 'Jautājums (BUJ)' : 'Question (FAQ)')

  const items = faqData
    .map((item) => /* html */ `
      <div class="faq-item" id="faq-${item.id}">
        <button
          type="button"
          class="faq-question"
          aria-expanded="false"
          aria-controls="faq-answer-${item.id}"
        >
          <span class="faq-question-text">${pick(isLv, item.question)}</span>
          <span class="faq-toggle" aria-hidden="true">
            <span class="faq-toggle-line faq-toggle-line--h"></span>
            <span class="faq-toggle-line faq-toggle-line--v"></span>
          </span>
        </button>
        <div class="faq-answer-wrap" id="faq-answer-${item.id}" aria-hidden="true">
          <div class="faq-answer-inner">
            <div class="faq-answer">
              <p>${pick(isLv, item.answer)}</p>
            </div>
          </div>
        </div>
      </div>
    `)
    .join('')

  return /* html */ `
    <div class="faq-page" id="faq-page">
      <h1 class="faq-page-title">${isLv ? 'BUJ' : 'FAQ'}</h1>
      <p class="faq-page-subtitle">
        ${isLv
          ? 'Atbildes uz biežāk uzdotajiem jautājumiem par dalību, treniņiem un pasākumiem.'
          : 'Answers to common questions about membership, training, and events.'}
      </p>

      <div class="faq-list">
        ${items}
      </div>

      <div class="faq-write" aria-labelledby="faq-write-heading">
        <h2 id="faq-write-heading" class="faq-write-title">
          ${isLv ? 'Nav atbildes?' : 'Didn\'t find an answer?'}
        </h2>
        <p class="faq-write-lead">
          ${isLv
            ? 'Uzraksti mums — atbildēsim uz e-pastu 1–2 darba dienu laikā.'
            : 'Write to us — we reply by email within 1–2 business days.'}
        </p>

        <form class="faq-form" id="faqEmailForm" novalidate>
          <label class="faq-field">
            <span class="faq-field-label">${isLv ? 'Tava e-pasta adrese' : 'Your email'}</span>
            <input
              type="email"
              name="from"
              id="faqFrom"
              class="faq-input"
              placeholder="${isLv ? 'tavs@epasts.lv' : 'you@example.com'}"
              autocomplete="email"
            />
          </label>
          <label class="faq-field">
            <span class="faq-field-label">${isLv ? 'Ziņojums' : 'Message'}</span>
            <textarea
              name="message"
              id="faqMessage"
              class="faq-textarea"
              rows="5"
              placeholder="${isLv ? 'Uzraksti savu jautājumu…' : 'Type your question…'}"
              required
            ></textarea>
          </label>
          <div class="faq-form-actions">
            <button type="submit" class="faq-submit-btn">
              ${isLv ? 'Sūtīt e-pastu' : 'Send email'}
            </button>
            <a class="faq-mail-link" href="mailto:${FAQ_EMAIL}?subject=${subject}">
              ${FAQ_EMAIL}
            </a>
          </div>
        </form>
      </div>
    </div>
  `
}

export function setupFaqForm(lang = localStorage.getItem('language') || 'en'): void {
  const form = document.getElementById('faqEmailForm') as HTMLFormElement | null
  if (!form) return

  const isLv = lang === 'lv'

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = (document.getElementById('faqMessage') as HTMLTextAreaElement)?.value.trim()
    const from = (document.getElementById('faqFrom') as HTMLInputElement)?.value.trim()

    if (!message) {
      const msg = document.getElementById('faqMessage') as HTMLTextAreaElement
      msg?.focus()
      return
    }

    const subject = encodeURIComponent(isLv ? 'Jautājums (BUJ)' : 'Question (FAQ)')
    let body = message
    if (from) {
      body = isLv
        ? `Atbilde uz: ${from}\n\n${message}`
        : `Reply to: ${from}\n\n${message}`
    }
    const mailto = `mailto:${FAQ_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  })
}

export function setupFaqAccordion(): void {
  const items = document.querySelectorAll<HTMLElement>('.faq-item')

  items.forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>('.faq-question')
    const panel = item.querySelector<HTMLElement>('.faq-answer-wrap')
    if (!btn || !panel) return

    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open')
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
      panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true')
    })
  })
}

export function setupFaqAnimations(): void {
  inView('.faq-item', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [12, 0] } as any, { duration: 0.4, ease: 'ease-out' } as any)
  })

  inView('.faq-write', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [16, 0] } as any, { duration: 0.45, ease: 'ease-out' } as any)
  })
}
