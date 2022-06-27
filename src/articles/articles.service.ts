import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { pathToFileURL } from 'url';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import ArticleNotFoundException from './exception/articleNotFound.exception';
@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  getArticles() {
    return this.articleRepository.find();
  }
  async getArticlesWithPage(page?: number, pageSize?: number) {
    console.log(page);
    const [items, count] = await this.articleRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      items,
      page,
      pageSize,
      count,
    };
  }

  async createArticles(createArticleDto: CreateArticleDto) {
    const newArticle = await this.articleRepository.create(createArticleDto);

    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  async getArticleById(id: string) {
    // cache에 들어있는지 확인
    let article = await this.cacheManager.get(id);
    if (!article) {
      // 없으면 DB에서 가져오고..
      article = await this.articleRepository.findOneBy({ id });
      // 캐시에 집어넣는다.
      await this.cacheManager.set(id, article);
    }

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
  }
}
