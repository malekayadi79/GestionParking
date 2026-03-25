import { Parking } from './parking.model';
import { Reservation } from './reservation.model';

export interface Spot {
  id?: string;
  nom: string;
  description?: string;
  statut?: 'LIBRE' | 'RESERVE' | 'OCCUPE' | 'MAINTENANCE' | string; // Ajustez selon votre Enum Java
  isDeleted?: boolean;
  createdAt?: string; // Les LocalDateTime arrivent sous forme de string ISO depuis Spring
  updatedAt?: string;
  
  // Relations
  parking?: Parking | { id: string }; // Permet de lier le spot juste avec l'ID du parking
  reservationList?: Reservation[]; 
}