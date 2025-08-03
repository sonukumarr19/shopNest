import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true, // Only if you're using standalone components
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'] // Can be empty or used for custom tweaks
})
export class Footer {
  currentYear: number = new Date().getFullYear();
}
