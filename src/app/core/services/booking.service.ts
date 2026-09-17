import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface BookingRequest {
	service: string;

	date: string;
	time: string;
	duration: string;

	petType: string;
	numberOfPets: number;
	petName: string;
	breed: string;
	age: string;

	specialNeeds: string;
	medication: string;

	address: string;

	ownerName: string;
	phone: string;
	email: string;

	emergencyContact: string;
	vetInformation: string;

	additionalNotes: string;

	consent: boolean;
}

export interface BookingResponse {
	ok?: boolean;
	next?: string;
}

@Injectable({
	providedIn: 'root',
})
export class BookingService {
	private readonly http = inject(HttpClient);

	private readonly endpoint = environment.bookingFormEndpoint;

	submitBooking(booking: BookingRequest): Observable<BookingResponse> {
		if (!this.endpoint) {
			throw new Error('Booking Formspree endpoint is not configured.');
		}

		const payload = {
			_subject: `🐾 NEW BOOKING | ${booking.service} | ${booking.date} ${booking.time}`,

			service: booking.service,

			date: booking.date,
			time: booking.time,
			duration: booking.duration,

			petType: booking.petType,
			numberOfPets: booking.numberOfPets,
			petName: booking.petName,
			breed: booking.breed,
			age: booking.age,

			specialNeeds: booking.specialNeeds.trim() || 'None',

			medication: booking.medication.trim() || 'None',

			address: booking.address.trim(),

			ownerName: booking.ownerName.trim(),
			phone: booking.phone.trim(),
			email: booking.email.trim(),

			emergencyContact: booking.emergencyContact.trim() || 'Not provided',

			vetInformation: booking.vetInformation.trim() || 'Not provided',

			additionalNotes: booking.additionalNotes.trim() || 'None',

			consent: booking.consent ? 'Accepted' : 'Not accepted',

			submittedAt: new Date().toISOString(),
		};

		return this.http.post<BookingResponse>(this.endpoint, payload, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}
}
