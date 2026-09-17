import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="section section--dark">
      <div class="shell">
        <div class="section-heading section-heading--light" appReveal>
          <div><span class="eyebrow eyebrow--light"><i></i>{{ i18n.t('home.howEyebrow') }}</span><h2>{{ i18n.t('home.howTitle') }}</h2></div>
        </div>
        <div class="steps-grid">
          @for (step of steps; track step.n; let i = $index) {
            <article class="step-card" appReveal [style.--delay]="i * 80 + 'ms'">
              <span class="step-card__number">{{ step.n }}</span>
              <div class="step-card__line"></div>
              <h3>{{ i18n.t(step.title) }}</h3>
              <p>{{ i18n.t(step.text) }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `
})
export class HowItWorksComponent {
  readonly i18n = inject(I18nService);
  readonly steps = [
    { n: '01', title: 'how.step1.title', text: 'how.step1.text' },
    { n: '02', title: 'how.step2.title', text: 'how.step2.text' },
    { n: '03', title: 'how.step3.title', text: 'how.step3.text' },
    { n: '04', title: 'how.step4.title', text: 'how.step4.text' }
  ];
}
