import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes ,RouterModule} from"@angular/router";
import { InscriptionComponent } from "./inscription/inscription.component";
import { ServicesComponent } from './services/services.component';
import { HelpMeComponent } from './help-me/help-me.component';
import { GpsComponent } from './gps/gps.component';
import { ErrorComponent } from './error/error.component';
import { WeatherinfoComponent } from './weatherinfo/weatherinfo.component';
import{ArticleComponent}from './article/article.component';
import { VoyagepresComponent } from './voyagepres/voyagepres.component';
import { QuizComponent } from './quiz/quiz.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { authGuard } from './_services/authService/auth.guard';
import { LoginComponent } from './login/login.component';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';
import { adminGuard } from './admin/admin.guard';

const routes: Routes =
[
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path:'',component:AcceuilComponent},
    {path:'register',component:InscriptionComponent},
    {path: 'service',component:ServicesComponent, canActivate: [authGuard]},
    {path:'help',component:HelpMeComponent},
    {path:'gps',component:GpsComponent},
    {path:'article' ,component:ArticleComponent},
    {path:'quiz' ,component:QuizComponent},
    {path:'voyage',component:VoyagepresComponent},
    {path:'meteo',component: WeatherinfoComponent},
    {path:'login',component: LoginComponent},
    {path:'admin',component: AdminBoardComponent, canActivate: [adminGuard]},

    {path:'**',component:ErrorComponent}


];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
]
})

export class AppRoutingModule
{
    ngOninit(){}
}


