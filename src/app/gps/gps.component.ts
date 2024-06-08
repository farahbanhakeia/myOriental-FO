import { Component } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { GoogleMap, MapPolyline } from '@angular/google-maps';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css'],
})
export class GpsComponent {

  position: number = 0;
  positionArray: number[] = [];
  positions: {
    latitude: number,
    longitude: number,
    latitudeInput: string,
    longitudeInput: string
  }[] = [];
  mapCenter: google.maps.LatLngLiteral = { lat: 35.1686165, lng: -2.9275836 }; 
  zoom: number = 6;
  polylines: { path: google.maps.LatLngLiteral[], options: google.maps.PolylineOptions }[] = []; // Nouvelle propriété pour les polylignes

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  updatePositions() {
    this.positionArray = Array.from({ length: this.position }, (_, i) => i);
    this.positions = Array.from({ length: this.position }, () => ({
      latitude: 0,
      longitude: 0,
      latitudeInput: '',
      longitudeInput: ''
    }));
  }

  markPosition() {
    this.positions.forEach((pos, index) => {
      if (pos.latitudeInput.includes('°') && pos.longitudeInput.includes('°')) {
        const lat = this.convertDMSToDD(pos.latitudeInput);
        const lng = this.convertDMSToDD(pos.longitudeInput);
        this.positions[index].latitude = lat;
        this.positions[index].longitude = lng;
      } else {
        this.positions[index].latitude = parseFloat(pos.latitudeInput);
        this.positions[index].longitude = parseFloat(pos.longitudeInput);
      }
    });

    if (this.positions.length > 0) {
      this.mapCenter = { lat: this.positions[0].latitude, lng: this.positions[0].longitude };
    }

    this.updatePolylines(); // Mise à jour des polylignes après le marquage des positions
  }

  updatePolylines() {
    this.polylines = [];
    for (let i = 0; i < this.positions.length - 1; i++) {
      this.polylines.push({
        path: [
          { lat: this.positions[i].latitude, lng: this.positions[i].longitude },
          { lat: this.positions[i + 1].latitude, lng: this.positions[i + 1].longitude }
        ],
        options: {
          strokeColor: 'red',
          strokeOpacity: 1.0,
          strokeWeight: 2
        }
      });
    }
  }

  convertDMSToDD(input: string): number {
    const regex = /(\d+)°(\d+(?:\.\d+)?)[′″']\s*([NSWE])/i;
    const matches = input.match(regex);

    if (matches && matches.length === 4) {
      const degrees = parseInt(matches[1]);
      const minutes = parseFloat(matches[2]);
      const direction = matches[3].toUpperCase();

      let dd = degrees + minutes / 60;
      if (direction === 'S' || direction === 'W') {
        dd = -1 * dd;
      }
      return dd;
    } else {
      return parseFloat(input);
    }
  }

  convertDDtoDMS(input: number): string {
    const direction = input >= 0 ? 'N' : 'S';
    const absInput = Math.abs(input);
    const degrees = Math.floor(absInput);
    const minutesFloat = (absInput - degrees) * 60;
    const minutes = Math.floor(minutesFloat);

    return `${degrees}° ${minutes}′ ${direction}`;
  }

  showCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeInput: '',
          longitudeInput: ''
        };
        this.mapCenter = {
          lat: currentPosition.latitude,
          lng: currentPosition.longitude
        };
        this.positions.push(currentPosition);
        this.updatePolylines(); // Mise à jour des polylignes après ajout de la position actuelle
        alert(`Votre position actuelle est Latitude: ${currentPosition.latitude}, Longitude: ${currentPosition.longitude}`);
      });
    } else {
      console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  }

  calculateQibla(latitude: number, longitude: number): number {
    const meccaLatitude = 21.389082;
    const meccaLongitude = 39.857912;

    const differenceLongitude = meccaLongitude - longitude;
    const sinDifferenceLongitude = Math.sin(this.toRadians(differenceLongitude));

    const numerator = Math.sin(this.toRadians(differenceLongitude));
    const denominator = Math.cos(this.toRadians(latitude)) * Math.tan(this.toRadians(meccaLatitude)) - Math.sin(this.toRadians(latitude)) * Math.cos(this.toRadians(differenceLongitude));

    let qiblaDirection = Math.atan(numerator / denominator);

    if (sinDifferenceLongitude > 0 && qiblaDirection > 0) {
        return this.toDegrees(qiblaDirection);
    } else if (sinDifferenceLongitude * qiblaDirection < 0) {
        qiblaDirection += Math.PI;
        return this.toDegrees(qiblaDirection);
    } else {
        qiblaDirection += 2 * Math.PI;
        return this.toDegrees(qiblaDirection);
    }
  }

  generatePDF() {
    let content = [
      '-------------------------------------------------------W E L C O M E--------------------------------------------------------',('\n\n\n')
    ];
    if (this.positions.length === 0) {
      content.push("Votre position actuelle n'a pas pu être détectée. Veuillez réessayer.");
      content.push('');
    } else {
      const currentPosition = this.positions[this.positions.length - 1];
      content.push(`Votre position actuelle est :\n `);
      content.push(` Latitude: ${currentPosition.latitude}`);
      content.push(`Longitude: ${currentPosition.longitude} \n \n`);
    }

    content.push('I-Voila Vos INformations:');
    content.push('');

    for (let i = 0; i < this.positions.length; i++) {
      content.push(`Latitude ${i + 1}: ${this.positions[i].latitudeInput}  \n`);
      content.push(`Longitude ${i + 1}: ${this.positions[i].longitudeInput} \n`);
    };

    let routeInfo = ''; 
    let distanceInfo = '';
    let distanceInfototal = '';
    let distance;
    let distanceT = 0;
    for (let i = 0; i < this.positions.length - 1; i++) {
      const lat1 = this.positions[i].latitude;
      const lon1 = this.positions[i].longitude;
      const lat2 = this.positions[i + 1].latitude;
      const lon2 = this.positions[i + 1].longitude;
      const latT = lat2 - lat1;
      const longT = lon2 - lon1;
      const lamndaT = 180 * 60 * ((Math.log(Math.tan(Math.PI / 4 + (this.toRadians(lat2) / 2))) / Math.PI) - (Math.log(Math.tan(Math.PI / 4 + (this.toRadians(lat1) / 2))) / Math.PI));
      let route = this.toDegrees(Math.atan(longT * 60 / lamndaT));

      if (latT === 0 && longT < 0) {
        route = 90;
      } else if (latT === 0 && longT > 0) {
        route = 270;
      }
      if (longT === 0 && lamndaT > 0) {
        route = 0;
      } else if (longT === 0 && lamndaT < 0) {
        route = 180;
      }
      if (latT !== 0 && longT !== 0) {
        if ((latT) > 0 && longT > 0) {
          route = Math.abs(route);
        } else if (latT < 0 && longT < 0) {
          route = 180 + Math.abs(route);
        } else if (latT > 0 && longT < 0) {
          route = 360 - Math.abs(route);
        } else {
          route = 180 - Math.abs(route);
        }
      }
    
      if (route === 90 || route === 270) {
        distance = 60 * Math.abs(longT);
      } else {
        distance = 60 * Math.abs((latT) / (Math.cos(this.toRadians(route))));
      }
      distanceT = distanceT + distance;
      routeInfo += `Route entre la position ${i + 1} et la position ${i + 2} : \n`;
      distanceInfo += `Distance : ${distance.toFixed(2)}NM (mille marins)'\n\n `;
      routeInfo += `- route : ${route.toFixed(2)} ° \n\n`;
    }
    distanceInfototal += `Distance totale du trajet : ${distanceT.toFixed(2)}  NM (mille marins)  \n\n`;
    content.push('II-Informations de route :');
    content.push(routeInfo);
    content.push('IV-Informations de distance :'); 
    content.push(distanceInfo); 
    content.push(distanceInfototal); 
    content.push('V-Informations de Qibla de chaque position :'); 

    this.positions.forEach((pos, index) => {
      const qiblaDirection = this.calculateQibla(pos.latitude, pos.longitude);
      const qiblaDMS = this.convertDDtoDMS(qiblaDirection);
      content.push(`Qibla pour la position ${index + 1}: ${qiblaDMS}\n`);
    });

    let docDefinition = {
      content: content,
    };

    let fileName = 'MyOriental.pdf';
    pdfMake.createPdf(docDefinition).download(fileName);
  }

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }
}
