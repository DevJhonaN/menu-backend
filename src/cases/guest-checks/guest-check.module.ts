import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuestCheck } from "./guest-check.entity";
import { GuestCheckService } from "./guest-check.service";
import { Spot } from "../spots/spot.entity";
import { GuestChecksController } from "./guest-check.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Spot, GuestCheck])],
  controllers: [GuestChecksController],
  providers: [GuestCheckService],
  exports: [GuestCheckService]
})

export class GuestCheckModule {}