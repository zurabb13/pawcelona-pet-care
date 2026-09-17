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
  emergencyContact: string;
  vetInformation: string;
  address: string;
  ownerName: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
  language: string;
}
