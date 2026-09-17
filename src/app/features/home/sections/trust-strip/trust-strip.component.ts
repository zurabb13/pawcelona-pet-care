import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';

@Component({
  selector: 'app-trust-strip',
  standalone: true,
  template: `
    <section class="trust-strip" [attr.aria-label]="i18n.t('hero.highlightsLabel')">
      <div class="shell trust-strip__inner">
        @for (item of items; track item.key) {
          <div class="trust-strip__item"><span aria-hidden="true">{{ item.icon }}</span><strong>{{ i18n.t(item.key) }}</strong></div>
        }
      </div>
    </section>
  `
})
export class TrustStripComponent {
  readonly i18n = inject(I18nService);
  readonly items = [
    { icon: '⌖', key: 'hero.badge1' },
    { icon: '↻', key: 'hero.badge2' },
    { icon: '◎', key: 'hero.badge3' },
    { icon: '↗', key: 'trust.d.title' }
  ];
}
