import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsResolver } from "./post.resolver";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { SinglePostComponent } from "./single-post/single-post.component";
import { PostsDataService  } from "./posts-data.service";
import { Post } from "../models/post.model";

const routes: Routes = [
    
    {
        path: '',
        component: PostsListComponent,
        resolve: { posts: PostsResolver}
    },
    {
        path: 'add',
        component: AddPostComponent,
        
        resolve: { posts: PostsResolver}
    },
    {
        path: 'edit/:id',
        component: EditPostComponent,
        resolve: { posts: PostsResolver}
    },
    {
        path: 'details/:id',
        component: SinglePostComponent,
        
        resolve: { posts: PostsResolver}
    }
];

const entityMetadata: EntityMetadataMap = {
    Post: {
        sortComparer: sortByName,
        entityDispatcherOptions: {
            optimisticDelete: true,
            optimisticUpdate: false
        }
    },
};

function sortByName(a: Post, b: Post) {
    let comp = a.title.localeCompare(b.title);
    if(comp > 0) return -1;
    if(comp < 0) return 1;
    return comp;
}

@NgModule({
    declarations:[
        PostsListComponent,
        SinglePostComponent,
        EditPostComponent,
        AddPostComponent,
    ],
    providers: [PostsDataService, PostsResolver],
    imports: [ CommonModule, RouterModule.forChild(routes), ReactiveFormsModule]
})

export class PostsModule {
    constructor(eds: EntityDefinitionService, entityDataService: EntityDataService, PostsDataService: PostsDataService) {
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Post', PostsDataService);
    }
}