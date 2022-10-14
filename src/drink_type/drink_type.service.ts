import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from "../prisma/prisma.service";
import { DrinkTypeDto } from "./dto/drink-type.dto";

@Injectable()
export class DrinkTypeService {
  constructor(private ps: PrismaService) {}
  async create(drinkTypeDto: DrinkTypeDto) {
    const { type } = drinkTypeDto;
    try {
      const drinkType = await this.ps.drinkType.create({
        data: {
          type,
        },
      });
      return drinkType;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new BadRequestException(`${type} already exists`);
        }
      } else throw error;
    }
  }

  findAll() {
    return `This action returns all drinkType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drinkType`;
  }

  async update(id: number, drinkTypeDto: DrinkTypeDto) {
    const { type } = drinkTypeDto;
    try {
      const drinkType = await this.ps.drinkType.update({
        where: { id },
        data: {
          type,
        },
      });
      return drinkType;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error);
        if (error.code === "P2002") {
          throw new BadRequestException(`${type} already exists`);
        }
      } else throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} drinkType`;
  }
}
