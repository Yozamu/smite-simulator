export type God = {
  // General information
  id: number;
  Name: string;
  Ability_1: Ability;
  Ability_2: Ability;
  Ability_3: Ability;
  Ability_4: Ability;
  Pantheon: string;
  Roles: string;
  godIcon_URL: string;
  // Speed and AS
  AttackSpeed: number;
  AttackSpeedPerLevel: number;
  Speed: number;
  // HP
  Health: number;
  HP5PerLevel: number;
  HealthPerFive: number;
  HealthPerLevel: number;
  // MP
  MP5PerLevel: number;
  Mana: number;
  ManaPerFive: number;
  ManaPerLevel: number;
  // Protections
  MagicProtection: number;
  MagicProtectionPerLevel: number;
  PhysicalProtection: number;
  PhysicalProtectionPerLevel: number;
  // Power
  MagicalPower: number;
  MagicalPowerPerLevel: number;
  PhysicalPower: number;
  PhysicalPowerPerLevel: number;
  // AA
  basicAttack: {
    itemDescription: { menuitems: [{ description: string; value: string }, { description: string; value: string }] };
  };
};
