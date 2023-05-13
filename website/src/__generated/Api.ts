import type { Executor } from './';

import { CategoryController, ForumController, ImageController, MemberController, MemberLikeController, MemberProfileController, MemberRankController, ReplyController, SessionController, ThreadController } from './services';

export class Api {
    
    readonly categoryController: CategoryController;
    
    readonly forumController: ForumController;
    
    readonly threadController: ThreadController;
    
    readonly replyController: ReplyController;
    
    readonly imageController: ImageController;
    
    readonly memberController: MemberController;
    
    readonly memberLikeController: MemberLikeController;
    
    readonly memberProfileController: MemberProfileController;
    
    readonly memberRankController: MemberRankController;
    
    readonly sessionController: SessionController;
    
    constructor(executor: Executor) {
        this.categoryController = new CategoryController(executor);
        this.forumController = new ForumController(executor);
        this.threadController = new ThreadController(executor);
        this.replyController = new ReplyController(executor);
        this.imageController = new ImageController(executor);
        this.memberController = new MemberController(executor);
        this.memberLikeController = new MemberLikeController(executor);
        this.memberProfileController = new MemberProfileController(executor);
        this.memberRankController = new MemberRankController(executor);
        this.sessionController = new SessionController(executor);
    }
}