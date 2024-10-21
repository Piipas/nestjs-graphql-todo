import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field()
  @IsString()
  @IsUUID()
  id: string;
  @Field()
  @IsBoolean()
  status: boolean;
}
