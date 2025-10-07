import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator"

export class createUserDto{

    @IsString()
    @IsNotEmpty()
    fullname:string
    
    @IsString()
    @IsNotEmpty()
    phoneNumber:string

    @IsNotEmpty()
    @IsString()
    thana:string

    @IsNotEmpty()
    @IsString()
    district:string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(/^[A-Za-z0-9]+$/,{
        message:'Password must contain only uppercase letters, lowercase letters, and digits',
    })
    password:string
   
    @IsOptional()
    @IsString()
    address?:string

    @IsOptional()
    @IsEmail()
    email?:string

    @IsOptional()
    @IsString()
    secondaryNumber?:string
}