import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found section">
      <div class="shell not-found__inner">
        <span class="eyebrow"><i></i>404</span>
        <h1>{{ i18n.t('notFound.title') }}</h1>
        <p>{{ i18n.t('notFound.text') }}</p>
        <a class="btn btn--primary btn--large" [routerLink]="i18n.localized()">{{ i18n.t('notFound.home') }} <span>→</span></a>
      </div>
    </section>
  `
})
export class NotFoundComponent {
  readonly i18n = inject(I18nService);
}
