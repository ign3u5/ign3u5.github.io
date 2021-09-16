import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';
  isDarkTheme = true;
  color: ThemePalette = "accent";

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    console.log(this.isDarkTheme);
  }
}
