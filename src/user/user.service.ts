import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserProfileDto } from "./dto/update-user-profile.dto";

@Injectable()
export class UserService {
  constructor(private ps: PrismaService) {}

  async updateUser(id: string, data: UserProfileDto) {
    const { username, age, aboutMe, sex, favouriteDrinks } = data;
    const updateUser = await this.ps.user.update({
      where: {
        id,
      },
      data: {
        username,
        age,
        aboutMe,
        sex,
        favouriteDrinks: {
          deleteMany: {
            userId: id,
          },
          createMany: {
            data: favouriteDrinks.map((item) => {
              return { drinkId: item };
            }),
          },
        },
      },
      include: {
        favouriteDrinks: true,
      },
    });
    delete updateUser.hash;
    delete updateUser.isPhoneNumberConfirmed;
    delete updateUser.role;
    return updateUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
