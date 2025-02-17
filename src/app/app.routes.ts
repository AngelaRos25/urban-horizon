import { Routes } from '@angular/router';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { LoginComponent } from './componenti/login/login.component';
import { UsersCardComponent } from './componenti/users-card/users-card.component';
import { UserDetailsComponent } from './componenti/user-details/user-details.component';
import { PostPageComponent } from './componenti/post-page/post-page.component'; 

export const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login',component: LoginComponent},
  {path: 'homePage', component: HomepageComponent, children: [
    {path:"usersCard", component: UsersCardComponent},
    {path:"userDetails/:id", component: UserDetailsComponent, data: { renderMode: 'fullRender' }},
    {path:"postPage", component: PostPageComponent},
  ]},
];
