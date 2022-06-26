import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import ArticleNotFoundException from './exception/articleNotFound.exception';
@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  getArticles() {
    return this.articleRepository.find();
  }

  async createArticles(createArticleDto: CreateArticleDto) {
    const newArticle = await this.articleRepository.create(createArticleDto);

    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  async getArticleById(id: string) {
    const article = await this.articleRepository.findOneBy({ id });
    if (article) {
      return article;
    }

    // throw new HttpException('Article is not existed', HttpStatus.NOT_FOUND);
    throw new ArticleNotFoundException(id);
  }

  async deleteArticleById(id: string) {
    const deleteResposne = await this.articleRepository.delete({ id });
    if (!deleteResposne.affected) {
      // throw new HttpException('Article not Found', HttpStatus.NOT_FOUND);
      throw new ArticleNotFoundException(id);
    }
    return `success delete by ${id}`;
  }

  async updateArticleById(id: string, updateArticleDto: UpdateArticleDto) {
    await this.articleRepository.update(id, updateArticleDto);
    const updatedArticle = await this.articleRepository.findOneBy({ id });
    if (updatedArticle) {
      return updatedArticle;
    }
    throw new ArticleNotFoundException(id);
  }

  async totalArticleCount() {
    const articles = await this.articleRepository.find();

    return {
      count: articles.length,
    };

    // return await this.articleRepository.findAndCount();
  }
}
