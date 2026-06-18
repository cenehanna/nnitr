import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  // МЕТОД ДЛЯ ОТРИМАННЯ ВСІХ НОВИН (ДОДАНО)
  async findAll() {
    return this.prisma.news.findMany({
      orderBy: { createdAt: 'desc' }, // Сортуємо: нові зверху
    });
  }

  // Метод для отримання однієї новини за ID
  async findOne(id: number) {
    return this.prisma.news.findUnique({
      where: { id },
    });
  }

  // Метод для сайдбару (беремо 4 останні новини)
  async findRecent(limit: number) {
    return this.prisma.news.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}
