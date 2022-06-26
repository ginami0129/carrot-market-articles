import { NotFoundException } from '@nestjs/common';

class ArticleNotFoundException extends NotFoundException {
  constructor(articleId: string) {
    super(`Article with id ${articleId} not found`);
  }
}

export default ArticleNotFoundException;
