export type GodStats = {
  // General information
  id: number;
  Name: string;
  Pantheon: string;
  Roles: string;
  godIcon_URL: string;
  // Speed and AS
  AttackSpeed: number;
  Speed: number;
  // HP
  Health: number;
  HealthPerFive: number;
  // MP
  Mana: number;
  ManaPerFive: number;
  // Protections
  MagicProtection: number;
  PhysicalProtection: number;
  // Power
  MagicalPower: number;
  PhysicalPower: number;
  // AA
  basicAttack: number;
  basicAttackMitigated: number;
  // Computed stats
  Power: number;
  FlatPene: number;
  PercentPene: number;
  FlatReduc: number;
  PercentReduc: number;
  CDR: number;
  CCR: number;
};
