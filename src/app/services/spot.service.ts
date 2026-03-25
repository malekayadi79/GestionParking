import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Spot } from '../models/spot.model';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  private apiUrl = `${environment.apiUrl}/spots`; // Assurez-vous d'avoir configuré environment.apiUrl
  
  private http = inject(HttpClient);

  getAllSpots(): Observable<Spot[]> {
    return this.http.get<Spot[]>(this.apiUrl);
  }

  getSpotById(id: string): Observable<Spot> {
    return this.http.get<Spot>(`${this.apiUrl}/${id}`);
  }

  createSpot(spot: Spot): Observable<Spot> {
    return this.http.post<Spot>(this.apiUrl, spot);
  }

  updateSpot(id: string, spot: Spot): Observable<Spot> {
    return this.http.put<Spot>(`${this.apiUrl}/${id}`, spot);
  }

  deleteSpot(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}