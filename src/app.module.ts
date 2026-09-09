import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { ProductModule } from './cases/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const dbSchema = configService.get<string>('DATABASE_SCHEMA', 'public');

        if (!databaseUrl) {
          throw new Error('A váriavel de ambiente DATABASE_URL não foi encontrada');
        }

        return {
          type: 'postgres',
          url: databaseUrl,
          schema: dbSchema,
          autoLoadEntities: true,
          synchronize: true        }
      }
    }),
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}