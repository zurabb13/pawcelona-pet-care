import { Component, computed, inject } from '@angular/core';
import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  template: `
    <a class="whatsapp-fab" [href]="href()" target="_blank" rel="noopener noreferrer" [attr.aria-label]="i18n.t('common.whatsapp')">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.8 11.8 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.16 1.6 5.97L.05 24l6.24-1.64a11.9 11.9 0 0 0 5.78 1.47h.01C18.66 23.83 24 18.48 24 11.9a11.8 11.8 0 0 0-3.48-8.42ZM12.08 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.7.97.99-3.61-.23-.37a9.87 9.87 0 1 1 8.34 4.6Zm5.42-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
      <span>{{ i18n.t('common.whatsapp') }}</span>
    </a>
  `
})
export class WhatsappButtonComponent {
  readonly i18n = inject(I18nService);
  readonly href = computed(() => `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(this.i18n.t('whatsapp.prefill'))}`);
}
