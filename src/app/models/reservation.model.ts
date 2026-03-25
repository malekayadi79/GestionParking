import { Spot } from './spot.model';

export interface Reservation {
  id?: string;
  matricule: string;
  spot?: Spot | { id: string }; // Très important pour la création : on passe juste { id: "..." }
  montant?: number;
  date?: string;
  datetimeEntree: string;
  datetimeSortie: string;
  qrCode?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}