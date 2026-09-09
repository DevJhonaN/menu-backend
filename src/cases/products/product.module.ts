import { Module } from "@nestjs/common";
import { Product } from "./product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Category } from "../categories/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}