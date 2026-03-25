import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Parking } from '../models/parking.model';

import { environment } from '../../environments/environment';



@Injectable({

  providedIn: 'root'

})

export class ParkingService {

  // Update 8080 if your Spring Boot runs on a different port

 private apiUrl = `${environment.apiUrl}/parkings`;

  

  private http = inject(HttpClient);



  getAllParkings(): Observable<Parking[]> {

    return this.http.get<Parking[]>(this.apiUrl);

  }



  createParking(parking: Parking): Observable<Parking> {

    return this.http.post<Parking>(this.apiUrl, parking);

  }



  updateParking(id: string, parking: Parking): Observable<Parking> {

    return this.http.put<Parking>(`${this.apiUrl}/${id}`, parking);

  }



  deleteParking(id: string): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);

  }

}