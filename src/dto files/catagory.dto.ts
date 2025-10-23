import { IsString, Matches } from "class-validator";

export class CatagoryDto{
    @IsString()
    @Matches(/^[A-Za-z\s]+$/,{
        message:"name just contain A-Z charecters!"
    })
    name:string;
    @IsString()
    description: string;
}