import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-faq-preview',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section section--cream">
      <div class="shell faq-layout">
        <div appReveal><span class="eyebrow"><i></i>{{ i18n.t('faq.eyebrow') }}</span><h2>{{ i18n.t('faq.title') }}</h2><a class="text-link" [routerLink]="i18n.localized('faq')">{{ i18n.t('common.viewAll') }} →</a></div>
        <div class="faq-list" appReveal>
          @for (item of faqs; track item.q; let i = $index) {
            <div class="faq-item" [class.is-open]="open() === i">
              <button type="button" (click)="toggle(i)" [attr.aria-expanded]="open() === i"><span>{{ i18n.t(item.q) }}</span><b>+</b></button>
              @if (open() === i) { <div class="faq-answer"><p>{{ i18n.t(item.a) }}</p></div> }
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class FaqPreviewComponent {
  readonly i18n = inject(I18nService);
  readonly open = signal<number | null>(0);
  readonly faqs = [
    { q: 'faq.q1', a: 'faq.a1' }, { q: 'faq.q2', a: 'faq.a2' }, { q: 'faq.q3', a: 'faq.a3' }, { q: 'faq.q4', a: 'faq.a4' }
  ];
  toggle(i: number): void { this.open.update((value) => value === i ? null : i); }
}
