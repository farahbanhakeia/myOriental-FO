import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ServicesComponent } from './services/services.component';
import { HelpMeComponent } from './help-me/help-me.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GpsComponent } from './gps/gps.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { WeatherinfoComponent } from './weatherinfo/weatherinfo.component'; // Import du module FormsModule
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { VoyagepresComponent } from './voyagepres/voyagepres.component';
import { QuizComponent } from './quiz/quiz.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './login/login.component';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InscriptionComponent,
    AcceuilComponent,
    ServicesComponent,
    HelpMeComponent,
    GpsComponent,
    ErrorComponent,
    WeatherinfoComponent,
    ArticleComponent,
    VoyagepresComponent,
    QuizComponent,
    LoginComponent,
    AdminBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    GoogleMap,
    FormsModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
