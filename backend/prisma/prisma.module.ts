import { Global, Module } from '@nestjs/common'; // Перевір, щоб Global був тут
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
