import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';

import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [HomeComponent, UsersListComponent, UsersDetailsComponent],
  imports: [CommonModule, RouterModule, MatListModule],
  exports: [HomeComponent, UsersListComponent, UsersDetailsComponent],
})
export class PagesModule {}
