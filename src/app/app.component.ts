import { Component } from '@angular/core';
import { readFileSync } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';
  md = readFileSync('.pages/2020-09-30-setting-up-a-blog-with-github-pages-and-jekyll.md', 'utf-8');
}
