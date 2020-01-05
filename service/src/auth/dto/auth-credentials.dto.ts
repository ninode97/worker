import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  pushToken: string;
  // @MinLength(8)
  // @MaxLength(20)
  // @Matches(
  //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   { message: 'password too weak' },
  // )
}
