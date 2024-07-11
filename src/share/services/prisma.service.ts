import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
     private prisma: PrismaClient;

     constructor() {
          this.prisma = new PrismaClient();
     }

     async onModuleInit() {
          await this.prisma.$connect();
     }

     async onModuleDestroy() {
          await this.prisma.$disconnect();
     }

     get client() {
          return this.prisma;
     }
     async enableShutdownHooks(app: INestApplication) {
          process.on('beforeExit', async () => {
               await app.close();
          });
     }
}