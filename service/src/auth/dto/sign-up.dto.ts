import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  username: string;

  @IsString()
  @MinLength(2)
  @MaxLength(150)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(150)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(150)
  lastName: string;

  // @MinLength(8)
  // @MaxLength(20)
  // @Matches(
  //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   { message: 'password too weak' },
  // )
}
