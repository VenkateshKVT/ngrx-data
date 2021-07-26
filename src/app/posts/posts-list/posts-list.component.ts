import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  public posts$: Observable<Post[]>;
  constructor(private postService: PostService) {
    this.posts$ = this.postService.entities$;
  }

  ngOnInit(): void {

  }

  onDelete(event: Event, id: any) {
    event.preventDefault();
    if(confirm('Are you sure? ')) {
       this.postService.delete(id);
    };
  }

}
