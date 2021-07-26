import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AddPostComponent } from "./posts/add-post/add-post.component";
import { EditPostComponent } from "./posts/edit-post/edit-post.component";
import { PostsResolver } from "./posts/post.resolver";
import { PostsListComponent } from "./posts/posts-list/posts-list.component";
import { SinglePostComponent } from "./posts/single-post/single-post.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'posts',
        loadChildren: () => import('./posts/post.module').then((m) => m.PostsModule),
    }
  
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}