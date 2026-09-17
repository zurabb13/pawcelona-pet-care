import { Component, inject } from '@angular/core';
import { CUSTOMER_REVIEWS } from '../../../../core/config/reviews.config';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RevealDirective],
  template: `
    @if (reviews.length) {
      <section class="section review-section">
        <div class="shell review-panel" appReveal>
          <div><span class="eyebrow eyebrow--light"><i></i>{{ i18n.t('reviews.eyebrow') }}</span><h2>{{ i18n.t('reviews.title') }}</h2></div>
          <div class="review-list">
            @for (review of reviews; track review.customerName + review.review) {
              <article class="review-card">
                <div class="review-stars" [attr.aria-label]="review.rating + ' / 5'">★★★★★</div>
                <blockquote>“{{ review.review }}”</blockquote>
                <strong>{{ review.customerName }}@if (review.petName) { · {{ review.petName }}}</strong>
              </article>
            }
          </div>
        </div>
      </section>
    }
  `
})
export class TestimonialsComponent {
  readonly i18n = inject(I18nService);
  readonly reviews = CUSTOMER_REVIEWS;
}
