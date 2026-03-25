import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ParkingService } from '../../../../services/parking.service';
import { Parking } from '../../../../models/parking.model';

@Component({
  selector: 'app-parking-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './parking-page.component.html',
  styleUrls: ['./parking-page.component.css']
})
export class ParkingPageComponent implements OnInit {
  // Liste des parkings récupérée depuis Spring Boot
  parkings: Parking[] = []; 
  
  // Les colonnes qu'on veut afficher dans le tableau HTML
  displayedColumns: string[] = ['nom', 'typeParking', 'prixInitial', 'actions'];

  private parkingService = inject(ParkingService);

  ngOnInit(): void {
    this.loadParkings();
  }

  loadParkings(): void {
    this.parkingService.getAllParkings().subscribe({
      next: (data) => {
        this.parkings = data;
      },
      error: (err) => console.error('Erreur lors du chargement des parkings', err)
    });
  }

  // Ces méthodes seront reliées aux popups à l'étape 3 !
  openAddDialog(): void {
    console.log("Ouverture du popup d'ajout...");
  }

  openEditDialog(parking: Parking): void {
    console.log("Ouverture du popup de modification pour :", parking.nom);
  }

  deleteParking(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce parking ?')) {
      this.parkingService.deleteParking(id).subscribe({
        next: () => this.loadParkings(), // On recharge la liste après suppression
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
}