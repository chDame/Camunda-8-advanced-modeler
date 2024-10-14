import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModelerComponent } from './modeler/modeler.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModelerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'advanced-modeler';
}
