import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FindOneParams } from 'src/utils/findOneParams';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles() {
    return this.articlesService.getArticles();
  }

  @Get('count')
  async totalArticles() {
    return await this.articlesService.totalArticleCount();
  }

  @Post()
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.createArticles(createArticleDto);
  }

  @Get(':id')
  async getArticle(@Param() { id }: FindOneParams) {
    return await this.articlesService.getArticleById(id);
  }

  @Patch(':id')
  async updateArticle(
    @Param() { id }: FindOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articlesService.updateArticleById(id, updateArticleDto);
  }

  @Delete(':id')
  async deleteArticle(@Param() { id }: FindOneParams) {
    return await this.articlesService.deleteArticleById(id);
  }
}
