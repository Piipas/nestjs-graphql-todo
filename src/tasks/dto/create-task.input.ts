import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  @MaxLength(100)
  title: string;
}
