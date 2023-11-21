import { IsNumber } from "class-validator";

export class FindUserIdDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  id: number;
}
