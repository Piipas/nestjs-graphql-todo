import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, MaxLength } from 'class-validator';

@InputType()
export class FilterTasksInput {
  @Field()
  @IsString()
  @MaxLength(100)
  searchTerm: string;
  @Field({ nullable: true })
  @IsBoolean()
  status?: boolean;
}
