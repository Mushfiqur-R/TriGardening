import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string; // example: 'admin', 'customer', 'manager'

  @IsOptional()
  @IsString()
  description?: string;
}