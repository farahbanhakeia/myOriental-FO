import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apptest';
  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      document.body.classList.remove('acceuil-page-background');
      document.body.classList.remove('register-page-background');
      document.body.classList.remove('inscription-page-background');
      document.body.classList.remove('service-page-background');
      document.body.classList.remove('gpsserv');
      document.body.classList.remove('help-back');
      document.body.classList.remove('meteosrv');
      document.body.classList.remove('articlesrv');
      document.body.classList.remove('quizsrv');
      document.body.classList.remove('voyagesrv');

      // changement de background
      if ((event.url === '/')) {
        document.body.classList.add('acceuil-page-background');
      } else if (event.url.includes('/register')) {
        document.body.classList.add('register-page-background');
      } else if (event.url.includes('/inscription')) {
        document.body.classList.add('inscription-page-background');
      }
      else if (event.url.includes('/service')) {
        document.body.classList.add('service-page-background');
      }
      else if (event.url.includes('/gps')) {
        document.body.classList.add('gpsserv');
      }
      else if (event.url.includes('/help')) {
        document.body.classList.add('help-back');
      }
      else if(event.url.includes('/meteo')) {
        document.body.classList.add('meteosrv');
      }
      else if (event.url.includes('article')) {
        document.body.classList.add('articlesrv');
      }
      else if (event.url.includes('voyage')) {
        document.body.classList.add('voyagesrv');
      }
      else if (event.url.includes('quiz')) {
        document.body.classList.add('quizsrv');
      }
      else if (event.url.includes('admin')) {
        document.body.classList.add('admin-board');
      }

      // ajoutautres conditions
    });
  }
}
