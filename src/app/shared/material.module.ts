import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const modules: any[] = [
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatBadgeModule,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class MaterialModule { }
