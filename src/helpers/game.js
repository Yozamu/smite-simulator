export const isGodMagic = (god) => god.Roles === 'Guardian' || god.Roles === 'Mage';

const computeDamageOnTarget = (rawDamage, flatPene, percentPene, flatReduc, percentReduc, protection) => {
  const realDefense = (protection * (1 - percentReduc / 100) - flatReduc) * (1 - percentPene / 100) - flatPene;
  return ((100 * rawDamage) / (realDefense + 100)).toFixed();
};

const computeBasicAttackDamage = (god, level, isMagic) => {
  const aaDamageLine = god.basicAttack.itemDescription.menuitems[0].value;
  const aaDLSplit = aaDamageLine.split(/[+% /]/);
  const aaRawDamage = +aaDLSplit[0] + +aaDLSplit[3] * level;
  const aaBonusDamage = (+aaDLSplit[6] * (isMagic ? god.MagicalPower : god.PhysicalPower)) / 100;
  return aaRawDamage + aaBonusDamage;
};

const formatAbilities = (rawAbilities, power, cdr, flatPene, percentPene, flatReduc, percentReduc, prot) => {
  if (!rawAbilities) return null;
  const abilities = [];
  rawAbilities.map((rawAbility) => {
    const ability = {
      id: rawAbility.Id,
      name: rawAbility.Summary,
      cooldown: +rawAbility.Description.itemDescription.cooldown.split('/').at(-1).split('s')[0],
      url: rawAbility.URL,
      rawDamage: 0,
      damageWithProtection: [],
    };
    ability.cooldown = (ability.cooldown * (100 - Math.min(40, cdr))) / 100;
    const damage = rawAbility.Description.itemDescription.rankitems
      .filter((effect) => effect.description.match(/Damage.*/))
      .map((effect) => {
        const splitLine = effect.value.split(/[ /+%]/);
        return +splitLine[4] + (+splitLine[6] / 100) * power;
      })
      .reduce((acc, curr) => acc + curr, 0);
    ability.rawDamage = damage;
    ability.mitigatedDamage = computeDamageOnTarget(damage, flatPene, percentPene, flatReduc, percentReduc, prot);
    abilities.push(ability);
  });
  return abilities;
};

const computeSelectedGodStats = (god, items, level, fPene, pPene, fReduc, pReduc, prot) => {
  const selectedGod = { ...god };
  selectedGod.Health = god.Health + god.HealthPerLevel * level;
  selectedGod.Mana = god.Mana + god.ManaPerLevel * level;
  selectedGod.HealthPerFive = god.HealthPerFive + god.HP5PerLevel * level;
  selectedGod.ManaPerFive = god.ManaPerFive + god.MP5PerLevel * level;
  selectedGod.AttackSpeed = god.AttackSpeed + god.AttackSpeedPerLevel * level;
  selectedGod.MagicalPower = god.MagicalPower + god.MagicalPowerPerLevel * level;
  selectedGod.PhysicalPower = god.PhysicalPower + god.PhysicalPowerPerLevel * level;
  selectedGod.PhysicalProtection = god.PhysicalProtection + god.PhysicalProtectionPerLevel * level;
  selectedGod.MagicProtection = god.MagicProtection + god.MagicProtectionPerLevel * level;
  selectedGod.basicAttack = computeBasicAttackDamage(god, level, isGodMagic(god));
  selectedGod.basicAttackMitigated = computeDamageOnTarget(selectedGod.basicAttack, fPene, pPene, fReduc, pReduc, prot);
  return selectedGod;
};

const getStatFromItems = (items, stat, isPercent = false) => {
  console.log('TODO', items, stat, isPercent);
  return 0;
};

export const getGodAbilitiesAndStats = (god, items, level, protection) => {
  const isMagic = isGodMagic(god);
  const power = getStatFromItems(items, isMagic ? 'Magical Power' : 'Physical Power');
  const cdr = getStatFromItems(items, 'Cooldown Reduction', true);
  const flatPene = getStatFromItems(items, isMagic ? 'Magic Penetration' : 'Physical Penetration');
  const percentPene = getStatFromItems(items, isMagic ? 'Magic Penetration' : 'Physical Penetration', true);
  const flatReduc = getStatFromItems(items, `${isMagic ? 'Magic' : 'Physical'} Protection reduced`);
  const percentReduc = getStatFromItems(items, `${isMagic ? 'Magic' : 'Physical'} Protection reduced`, true);
  const godAbilities = [god.Ability_1, god.Ability_2, god.Ability_3, god.Ability_4];

  const abilities = formatAbilities(
    godAbilities,
    power,
    cdr,
    flatPene,
    percentPene,
    flatReduc,
    percentReduc,
    protection
  );

  const godStats = computeSelectedGodStats(
    god,
    items,
    level,
    flatPene,
    percentPene,
    flatReduc,
    percentReduc,
    protection
  );
  return [abilities, godStats];
};
