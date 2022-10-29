import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupUserDto {
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @MinLength(8)
  @MaxLength(35)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$/, {
    message:
      'Password must include at-least 1 uppercase, 1 lowercase, 1 number, and 1 special character.',
  })
  public password: string;

  @IsString()
  public city: string;

  @IsString()
  public coverImg: string;

  @IsString()
  public profileImg: string;

  @IsString()
  public website?: string;
}
