import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movies-slider',
  standalone: true,
  imports: [NgClass],
  templateUrl: './movies-slider.component.html',
  styleUrls: ['./movies-slider.component.scss']
})
export class MoviesSliderComponent implements OnInit {

  bannerResult?: any = [];

  constructor (private moviesService: MoviesService) { }

  ngOnInit (): void {
    this.bannerData();
  }

  bannerData () {
    this.moviesService.sliderMovies().subscribe((result) => {
      this.bannerResult = result.results;
    });
  }

}
