import { Module, CacheModule } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), CacheModule.register()],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
