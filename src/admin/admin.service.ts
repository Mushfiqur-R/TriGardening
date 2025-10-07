import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from 'src/dto files/Role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
     constructor(private prisma:PrismaService){}
    createrole(roledata:CreateRoleDto){
        return this.prisma.role.create({
         data:{
          name:roledata.name,
          description:roledata.description
         }

        })
    }
}

