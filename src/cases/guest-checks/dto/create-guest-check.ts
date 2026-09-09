import { IsUUID } from "class-validator/types/decorator/string/IsUUID";


export class CreateGuestCheckDto {
  @IsUUID() 
  spotID: string;
}
