import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  exports: [ToolbarComponent],
})
export class ComponentsModule {}
