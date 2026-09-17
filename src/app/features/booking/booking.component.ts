import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { SERVICES } from '../../core/config/services.config';
import { I18nService } from '../../core/i18n/i18n.service';
import { BookingService } from '../../core/services/booking.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PageHeroComponent],
  templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
  readonly i18n = inject(I18nService);
  readonly services = SERVICES;
  readonly business = BUSINESS_CONFIG;
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  private readonly route = inject(ActivatedRoute);

  readonly state = signal<'idle' | 'error' | 'saving' | 'success'>('idle');
  readonly resultMode = signal<'live' | 'demo'>('demo');
  readonly minDate = new Date().toISOString().slice(0, 10);

  readonly form = this.fb.nonNullable.group({
    service: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    duration: ['30'],
    petType: ['dog', Validators.required],
    numberOfPets: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    petName: ['', [Validators.required, Validators.maxLength(120)]],
    breed: ['', Validators.maxLength(120)],
    age: ['', Validators.maxLength(80)],
    specialNeeds: ['', Validators.maxLength(2000)],
    medication: ['', Validators.maxLength(2000)],
    emergencyContact: ['', Validators.maxLength(500)],
    vetInformation: ['', Validators.maxLength(1000)],
    address: ['', [Validators.required, Validators.maxLength(500)]],
    ownerName: ['', [Validators.required, Validators.maxLength(120)]],
    phone: ['', [Validators.required, Validators.maxLength(40)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    notes: ['', Validators.maxLength(3000)],
    consent: [false, Validators.requiredTrue],
    website: [''] // Honeypot: real users never see or fill this field.
  });

  ngOnInit(): void {
    const requested = this.route.snapshot.queryParamMap.get('service');
    if (requested && SERVICES.some((item) => item.id === requested)) {
      this.form.controls.service.setValue(requested);
    }
  }

  submit(): void {
    if (this.form.controls.website.value) {
      // Silently absorb basic bot submissions without sending personal data anywhere.
      this.state.set('success');
      this.resultMode.set('demo');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.state.set('error');
      return;
    }

    const { website: _website, ...raw } = this.form.getRawValue();
    this.state.set('saving');

    this.bookingService.submit({ ...raw, language: this.i18n.language() }).subscribe({
      next: (result) => {
        this.resultMode.set(result.mode);
        this.state.set('success');
        this.form.reset({
          duration: '30', petType: 'dog', numberOfPets: 1, consent: false, website: '',
          service: '', date: '', time: '', petName: '', breed: '', age: '', specialNeeds: '', medication: '',
          emergencyContact: '', vetInformation: '', address: '', ownerName: '', phone: '', email: '', notes: ''
        });
      },
      error: () => this.state.set('error')
    });
  }
}
