import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { MoviesService } from '../../services/movies.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor (private moviesService: MoviesService, private title: Title, private meta: Meta) {}

  ngOnInit (): void {
  }

  searchResult: any;
  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  onSubmit () {
    console.log(this.searchForm.value, 'searchform#');
    this.moviesService.getSearchMovie(this.searchForm.value).subscribe((result) => {
      /* TODO: REFACTORING AND CONSOLE.LOG */
      console.log(result, 'searchmovie##');
      this.searchResult = result.results;
      this.searchForm.reset();
    });
  }

}
