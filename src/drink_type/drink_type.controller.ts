import { User } from ".prisma/client";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  MethodNotAllowedException,
  ParseIntPipe,
} from "@nestjs/common";
import { ApplicationConfig } from "@nestjs/core";
import { CheckPolicies } from "../auth/decorator/check-policies";
import { GetUser } from "../auth/decorator/get-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { PoliciesGuard } from "../auth/guards/policy.guard";
import { Action, AppAbility, CaslAbilityFactory } from "../casl/casl-ability.factory";
import { DrinkTypeService } from "./drink_type.service";
import { DrinkTypeDto } from "./dto/drink-type.dto";

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller("drink-type")
export class DrinkTypeController {
  constructor(private readonly dts: DrinkTypeService, private caf: CaslAbilityFactory) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, "DrinkType"))
  create(@Body() createDrinkTypeDto: DrinkTypeDto) {
    return this.dts.create(createDrinkTypeDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, "DrinkType"))
  findAll() {
    return this.dts.findAll();
  }

  @Get(":id")
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, "DrinkType"))
  findOne(@Param("id") id: string) {
    return this.dts.findOne(+id);
  }

  @Patch(":id")
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, "DrinkType"))
  update(@Param("id", ParseIntPipe) id: number, @Body() updateDrinkTypeDto: DrinkTypeDto) {
    return this.dts.update(id, updateDrinkTypeDto);
  }

  @Delete(":id")
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, "DrinkType"))
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.dts.remove(id);
  }
}
