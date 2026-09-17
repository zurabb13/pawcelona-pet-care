import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { SERVICE_AREAS } from '../../../../core/config/service-areas.config';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-areas-preview',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section">
      <div class="shell areas-layout">
        <div appReveal><span class="eyebrow"><i></i>{{ i18n.t('areas.eyebrow') }}</span><h2>{{ i18n.t('areas.title') }}</h2><p>{{ i18n.t('areas.text') }}</p><a class="btn btn--ghost" [routerLink]="i18n.localized('areas')">{{ i18n.t('areas.check') }}</a></div>
        <div class="area-cloud" appReveal>
          @for (area of areas; track area) { <span>{{ area }}</span> }
        </div>
      </div>
    </section>
  `
})
export class AreasPreviewComponent { readonly i18n = inject(I18nService); readonly areas = SERVICE_AREAS; }
