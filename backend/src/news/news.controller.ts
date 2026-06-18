import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // ДОДАЙ ЦЕЙ МЕТОД:
  @Get()
  getAll() {
    return this.newsService.findAll(); // Перевір, щоб у news.service був метод findAll()
  }

  @Get('sidebar')
  getSidebar() {
    return this.newsService.findRecent(3);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }
}
