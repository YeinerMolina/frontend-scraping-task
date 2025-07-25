import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/organisms/header/header';
import { Loading } from './shared/molecules/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Loading],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
