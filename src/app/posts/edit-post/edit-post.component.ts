import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  public editPostForm: FormGroup;
  public id: string;
  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {
    this.editPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null)
    });
    this.id = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.postService.entities$.subscribe(posts => {
      if(posts) {
        const post = posts.find(post =>post.id === this.id);
        this.editPostForm.patchValue({
          title: post?.title,
          description: post?.description
        })
      }
    })
  }

  onSubmit() {
    const post: Post = this.editPostForm.value;
    post.id = this.id;
    this.postService.update(post).subscribe(data => {
      this.router.navigate(['/posts']);
    });
  }
}
