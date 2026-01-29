import { Test, TestingModule } from '@nestjs/testing';
import { SavedPostsController } from './saved-posts.controller';
import { SavedPostsService } from './saved-posts.service';

describe('SavedPostsController', () => {
  let controller: SavedPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedPostsController],
      providers: [SavedPostsService],
    }).compile();

    controller = module.get<SavedPostsController>(SavedPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
