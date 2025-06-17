import { Component } from '@angular/core';
import { SideMenu } from '../side-menu/side-menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [SideMenu, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
