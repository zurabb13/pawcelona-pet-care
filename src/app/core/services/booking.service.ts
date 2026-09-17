import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingRequest } from '../models/booking.model';
import { environment } from '../../../environments/environment';

interface BookingRow {
  service: string;
  date: string;
  time: string;
  duration: string;
  pet_type: string;
  number_of_pets: number;
  pet_name: string;
  breed: string;
  age: string;
  special_needs: string;
  medication: string;
  emergency_contact: string;
  vet_information: string;
  address: string;
  owner_name: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
  language: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);

  submit(request: BookingRequest): Observable<{ mode: 'live' | 'demo' }> {
    if (!environment.supabaseUrl || !environment.supabaseAnonKey) {
      // Safe local/demo behavior: validate the UX without persisting personal data.
      return of({ mode: 'demo' });
    }

    const headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      Authorization: `Bearer ${environment.supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    });

    const payload: BookingRow = {
      service: request.service,
      date: request.date,
      time: request.time,
      duration: request.duration,
      pet_type: request.petType,
      number_of_pets: request.numberOfPets,
      pet_name: request.petName.trim(),
      breed: request.breed.trim(),
      age: request.age.trim(),
      special_needs: request.specialNeeds.trim(),
      medication: request.medication.trim(),
      emergency_contact: request.emergencyContact.trim(),
      vet_information: request.vetInformation.trim(),
      address: request.address.trim(),
      owner_name: request.ownerName.trim(),
      phone: request.phone.trim(),
      email: request.email.trim().toLowerCase(),
      notes: request.notes.trim(),
      consent: request.consent,
      language: request.language
    };

    return this.http
      .post(`${environment.supabaseUrl}/rest/v1/booking_requests`, payload, { headers })
      .pipe(map(() => ({ mode: 'live' as const })));
  }
}
