import { Component, input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  //new method of getting params directly from link 
  id = input.required<string>();
  getMovieDetailResult?: any;
  getMovieVideoResult?: any;
  getMovieCastResult?: any;

  constructor (private moviesService: MoviesService, private router: ActivatedRoute, private title: Title, private meta: Meta) { }

  ngOnInit (): void {
    //old way of getting params from router link
    // let getParamId = this.router.snapshot.paramMap.get('id');
    // console.log(getParamId, 'getparamid#');

    this.getMovie(this.id());
    this.getVideo(this.id());
    this.getMovieCast(this.id());
  }

  getMovie (id: any) {
    this.moviesService.getMovieDetails(id).subscribe(async (result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = await result;

      // updatetags
      this.title.setTitle(`${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`);
      this.meta.updateTag({ name: 'title', content: this.getMovieDetailResult.original_title });
      this.meta.updateTag({ name: 'description', content: this.getMovieDetailResult.overview });

      // facebook
      this.meta.updateTag({ property: 'og:type', content: "website" });
      this.meta.updateTag({ property: 'og:url', content: `` });
      this.meta.updateTag({ property: 'og:title', content: this.getMovieDetailResult.original_title });
      this.meta.updateTag({ property: 'og:description', content: this.getMovieDetailResult.overview });
      this.meta.updateTag({ property: 'og:image', content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}` });

    });
  }

  getVideo (id: any) {
    this.moviesService.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == "Trailer") {
          this.getMovieVideoResult = element.key;
        }
      });

    });
  }

  getMovieCast (id: any) {
    this.moviesService.getMovieCast(id).subscribe((result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }
}
