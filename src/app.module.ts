import { Module } from '@nestjs/common';
import { ConfigModule } from 'node_modules/@nestjs/config/dist/config.module';
import { ConfigService } from 'node_modules/@nestjs/config/dist/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  TypeOrmModule.forRoot({inject: [ConfigService], useFactory: (configService: ConfigService) => {
    const databaseUrl = configService.get<string>('DATABASE_URL');
    const dbSchema = configService.get<string>('DATABASE_SCHEMA', 'public');

    if (!databaseUrl) {
      throw new Error('A variável de ambiente DATABASE_URL não foi encontrada!');
    }

    return {
      type: 'postgres',
      url: databaseUrl,
      schema: dbSchema,
      autoLoadEntities: true,
      synchronize: true,
    };
  }}),
  controllers: [],
  providers: [],
})
export class AppModule {}
