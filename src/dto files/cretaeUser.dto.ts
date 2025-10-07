import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator"

export class createUserDto{

    @IsString()
    @IsNotEmpty()
    name:string
    
    @IsString()
    @IsNotEmpty()
    phoneno:string

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

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string
    
    @IsString()
    usertype:string

    @IsOptional()
    @IsString()
    secondaryNumber?:string


}