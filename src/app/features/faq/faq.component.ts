import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [PageHeroComponent],
  template: `<app-page-hero [eyebrow]="i18n.t('faq.eyebrow')" [title]="i18n.t('pages.faq.title')" [text]="i18n.t('pages.faq.text')"/><section class="section"><div class="shell faq-list faq-list--wide">@for(item of faqs;track item.q;let i=$index){<div class="faq-item" [class.is-open]="open()===i"><button (click)="toggle(i)" [attr.aria-expanded]="open()===i"><span>{{i18n.t(item.q)}}</span><b aria-hidden="true">+</b></button>@if(open()===i){<div class="faq-answer"><p>{{i18n.t(item.a)}}</p></div>}</div>}</div></section>`
})
export class FaqComponent {
  readonly i18n = inject(I18nService);
  readonly open = signal<number | null>(0);
  readonly faqs = Array.from({ length: 6 }, (_, i) => ({ q: `faq.q${i + 1}`, a: `faq.a${i + 1}` }));
  toggle(i: number): void { this.open.update((value) => value === i ? null : i); }
}
