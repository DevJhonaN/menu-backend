import { IsUUID } from "class-validator";
export class CreateGuestCheckDto {
  @IsUUID() 
  spotID: string;
}
