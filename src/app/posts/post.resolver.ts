import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { first, map, mergeMap } from "rxjs/operators";
import { PostService } from "./post.service";

@Injectable({
    providedIn: 'root'
})
export class PostsResolver implements Resolve<boolean> {
    constructor(private postService: PostService) {

    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return this.postService.loaded$.pipe(
            mergeMap((loaded) => {
                if(loaded) {
                    return of(true);
                }
                return this.postService.getAll().pipe(
                    map((posts: any) => {
                        return !!posts;
                    })
                );
            }),
            first()
        );
    }
}

function margeMap(arg0: (loaded: any) => Observable<boolean>): import("rxjs").OperatorFunction<boolean, unknown> {
    throw new Error("Function not implemented.");
}
