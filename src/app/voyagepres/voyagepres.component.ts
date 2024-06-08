import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-voyagepres',
  templateUrl: './voyagepres.component.html',
  styleUrl: './voyagepres.component.css'
})
export class VoyagepresComponent {
  constructor() { }
  //incrementation de indice i
  getWaypoints(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }
  voyages: string[] = [
    'Voyage de Nador à Almeria',
    'Voyage de Almeria à Nador',
    'Voyage de Danmark (ALLBORG) à JorfLasfar',
    'Voyage de Port saiid à Barcelone',
    'Voyage de Visha à Haldia',
    'Voyage de Couchin à Karachi',
    'Voyage de Visha à Haldia',
    'Voyage de Paradip à Kakinada',
    'Voyage de CORK (Irland) à ALLBORG (Danmark)'

  ];

  searchTerm: string = '';
  searchResult: string[] = [];
  selectedVoyage: string | undefined;

  searchVoyage() {
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    this.searchResult = this.voyages.filter(voyage => voyage.toLowerCase().includes(searchTermLowerCase));
    if (this.searchResult.length === 0) {
      this.searchResult = ['Aucun voyage trouvé.'];
    }
  }

  selectVoyage(voyage: string) {
    this.selectedVoyage = voyage;
  }
}
