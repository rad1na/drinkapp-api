import {
  Controller,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  HttpStatus,
  UseGuards,
  MethodNotAllowedException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserProfileDto } from "./dto/update-user-profile.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { GetUser } from "../auth/decorator/get-user.decorator";
import { Action, CaslAbilityFactory } from "../casl/casl-ability.factory";
import { User } from ".prisma/client";
import { subject } from "@casl/ability";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {
  constructor(private readonly us: UserService, private caf: CaslAbilityFactory) {}

  @Patch(":id")
  async updateUserProfile(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string,
    @Body() data: UserProfileDto,
    @GetUser() user: User,
  ) {
    const ability = this.caf.createForUser(user);
    if (ability.can(Action.Update, "all") || ability.can(Action.Update, subject("User", { ...user, id })))
      return this.us.updateUser(id, data);
    else throw new MethodNotAllowedException("You are not allowed to update other users");
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.userService.remove(+id);
  // }
}
