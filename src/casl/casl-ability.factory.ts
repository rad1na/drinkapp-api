import { Drink, DrinkType, Role, User } from ".prisma/client";
import { AbilityBuilder, AbilityClass, subject } from "@casl/ability";
import { PrismaAbility, Subjects } from "@casl/prisma";
import { Injectable } from "@nestjs/common";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export type AppAbility = PrismaAbility<
  [
    string,
    Subjects<{
      User: User;
      Drink: Drink;
      DrinkType: DrinkType;
    }>,
  ]
>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    const { can, cannot, build } = new AbilityBuilder(AppAbility);
    can(Action.Read, "User", { id: user.id });
    can(Action.Update, "User", { id: user.id });
    can(Action.Delete, "User", { id: user.id });
    if (user.role === Role.admin || user.role === Role.super_admin) {
      can(Action.Manage, "all");
    }
    if (user.role === Role.admin) {
      can(Action.Read, "User", { role: Role.admin || Role.basic_user });
      cannot(Action.Manage, "User", { role: Role.super_admin || Role.admin });
    }
    return build();
  }
}
