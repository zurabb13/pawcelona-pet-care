import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
	signal,
} from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { SERVICES } from '../../core/config/services.config';
import { I18nService } from '../../core/i18n/i18n.service';

import {
	BookingRequest,
	BookingService,
} from '../../core/services/booking.service';

import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
	selector: 'app-booking',

	standalone: true,

	imports: [
		ReactiveFormsModule,
		RouterLink,
		PageHeroComponent,
		RevealDirective,
	],

	templateUrl: './booking.component.html',

	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnInit {
	readonly i18n = inject(I18nService);

	readonly services = SERVICES;

	readonly business = BUSINESS_CONFIG;

	private readonly fb = inject(FormBuilder);

	private readonly bookingService = inject(BookingService);

	private readonly route = inject(ActivatedRoute);

	readonly state = signal<'idle' | 'saving' | 'success' | 'error'>('idle');

	readonly minDate = new Date().toISOString().slice(0, 10);

	readonly form = this.fb.nonNullable.group({
		service: ['', Validators.required],

		date: ['', Validators.required],

		time: ['', Validators.required],

		duration: ['30', Validators.required],

		petType: ['dog', Validators.required],

		numberOfPets: [
			1,
			[Validators.required, Validators.min(1), Validators.max(10)],
		],

		petName: ['', [Validators.required, Validators.maxLength(120)]],

		breed: ['', Validators.maxLength(120)],

		age: ['', Validators.maxLength(80)],

		specialNeeds: ['', Validators.maxLength(2000)],

		medication: ['', Validators.maxLength(2000)],

		emergencyContact: ['', Validators.maxLength(500)],

		vetInformation: ['', Validators.maxLength(1000)],

		address: ['', [Validators.required, Validators.maxLength(500)]],

		ownerName: ['', [Validators.required, Validators.maxLength(120)]],

		phone: [
			'',
			[
				Validators.required,
				Validators.maxLength(40),
				Validators.pattern(/^[+]?[\d\s().-]{7,25}$/),
			],
		],

		email: [
			'',
			[Validators.required, Validators.email, Validators.maxLength(254)],
		],

		additionalNotes: ['', Validators.maxLength(3000)],

		consent: [false, Validators.requiredTrue],

		website: [''],
	});

	ngOnInit(): void {
		const requestedService = this.route.snapshot.queryParamMap.get('service');

		if (
			requestedService &&
			SERVICES.some((service) => service.id === requestedService)
		) {
			this.form.controls.service.setValue(requestedService);
		}
	}

	submit(): void {
		this.state.set('idle');

		/*
		 * Honeypot spam protection.
		 * Real users never fill this field.
		 */
		if (this.form.controls.website.value) {
			this.state.set('success');
			return;
		}

		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.state.set('error');

			return;
		}

		const raw = this.form.getRawValue();

		const selectedService = this.services.find(
			(service) => service.id === raw.service,
		);

		const booking: BookingRequest = {
			service: selectedService
				? this.i18n.t(selectedService.titleKey)
				: raw.service,

			date: raw.date,

			time: raw.time,

			duration:
				raw.duration === 'custom'
					? this.i18n.t('booking.custom')
					: `${raw.duration} min`,

			petType: this.petTypeLabel(raw.petType),

			numberOfPets: raw.numberOfPets,

			petName: raw.petName,

			breed: raw.breed,

			age: raw.age,

			specialNeeds: raw.specialNeeds,

			medication: raw.medication,

			emergencyContact: raw.emergencyContact,

			vetInformation: raw.vetInformation,

			address: raw.address,

			ownerName: raw.ownerName,

			phone: raw.phone,

			email: raw.email,

			additionalNotes: raw.additionalNotes,

			consent: raw.consent,
		};

		this.state.set('saving');

		this.bookingService.submitBooking(booking).subscribe({
			next: () => {
				this.state.set('success');

				this.form.reset({
					service: '',
					date: '',
					time: '',
					duration: '30',
					petType: 'dog',
					numberOfPets: 1,
					petName: '',
					breed: '',
					age: '',
					specialNeeds: '',
					medication: '',
					emergencyContact: '',
					vetInformation: '',
					address: '',
					ownerName: '',
					phone: '',
					email: '',
					additionalNotes: '',
					consent: false,
					website: '',
				});
			},

			error: (error: unknown) => {
				console.error('Booking submission failed:', error);

				this.state.set('error');
			},
		});
	}

	private petTypeLabel(petType: string): string {
		switch (petType) {
			case 'dog':
				return this.i18n.t('booking.petDog');

			case 'cat':
				return this.i18n.t('booking.petCat');

			default:
				return this.i18n.t('booking.petOther');
		}
	}
}
