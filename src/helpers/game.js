export const isGodMagic = (god) => god.Roles === 'Guardian' || god.Roles === 'Mage';

const computeDamageOnTarget = (rawDamage, flatPene, percentPene, flatReduc, percentReduc, protection) => {
  const realDefense = (protection * (1 - percentReduc / 100) - flatReduc) * (1 - percentPene / 100) - flatPene;
  return ((100 * rawDamage) / (realDefense + 100)).toFixed();
};

const computeBasicAttackDamage = (god, level, power) => {
  const aaDamageLine = god.basicAttack.itemDescription.menuitems[0].value;
  const aaDLSplit = aaDamageLine.split(/[+% /]/);
  const aaRawDamage = +aaDLSplit[0] + +aaDLSplit[3] * level;
  const aaBonusDamage = (+aaDLSplit[6] * power) / 100;
  return (aaRawDamage + aaBonusDamage).toFixed();
};

const formatAbilities = (rawAbilities, god, prot) => {
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
    ability.cooldown = (ability.cooldown * (100 - Math.min(40, god.CDR))) / 100;
    const damage = rawAbility.Description.itemDescription.rankitems
      .filter((effect) => effect.description.match(/Damage.*/))
      .map((effect) => {
        const splitLine = effect.value.split(/[ /+%]/);
        return +splitLine[4] + (+splitLine[6] / 100) * god.Power;
      })
      .reduce((acc, curr) => acc + curr, 0);
    ability.rawDamage = damage.toFixed();
    ability.mitigatedDamage = computeDamageOnTarget(
      damage,
      god.FlatPene,
      god.PercentPene,
      god.FlatReduc,
      god.PercentReduc,
      prot
    );
    abilities.push(ability);
  });
  return abilities;
};

const computeSelectedGodStats = (god, items, level, prot) => {
  const selectedGod = { ...god };
  const isMagic = isGodMagic(god);
  selectedGod.Health = god.Health + god.HealthPerLevel * level + getStatFromItems(items, 'Health');
  selectedGod.Mana = god.Mana + god.ManaPerLevel * level + getStatFromItems(items, 'Mana');
  selectedGod.HealthPerFive =
    +(god.HealthPerFive + god.HP5PerLevel * level).toFixed() + getStatFromItems(items, 'Health Per Five');
  selectedGod.ManaPerFive =
    +(god.ManaPerFive + god.MP5PerLevel * level).toFixed() + getStatFromItems(items, 'Mana Per Five');
  selectedGod.AttackSpeed = god.AttackSpeed + god.AttackSpeedPerLevel * level + getStatFromItems(items, 'Attack Speed');
  selectedGod.MagicalPower =
    +(god.MagicalPower + god.MagicalPowerPerLevel * level).toFixed() + getStatFromItems(items, 'Magical Power');
  selectedGod.PhysicalPower =
    +(god.PhysicalPower + god.PhysicalPowerPerLevel * level).toFixed() + getStatFromItems(items, 'Physical Power');
  selectedGod.PhysicalProtection =
    +(god.PhysicalProtection + god.PhysicalProtectionPerLevel * level).toFixed() +
    getStatFromItems(items, 'Physical Protection');
  selectedGod.MagicProtection =
    +(god.MagicProtection + god.MagicProtectionPerLevel * level).toFixed() +
    getStatFromItems(items, 'Magic Protection');
  selectedGod.basicAttack = computeBasicAttackDamage(
    god,
    level,
    isGodMagic(god) ? selectedGod.MagicalPower : selectedGod.PhysicalPower
  );
  selectedGod.Power = isMagic ? selectedGod.MagicalPower : selectedGod.PhysicalPower;
  selectedGod.FlatPene = getStatFromItems(items, isMagic ? 'Magic Penetration' : 'Physical Penetration');
  selectedGod.PercentPene = getStatFromItems(items, isMagic ? 'Magic Penetration' : 'Physical Penetration', true);
  selectedGod.FlatReduc = getStatFromItems(items, `${isMagic ? 'Magic' : 'Physical'} Protection reduced`);
  selectedGod.PercentReduc = getStatFromItems(items, `${isMagic ? 'Magic' : 'Physical'} Protection reduced`, true);
  selectedGod.CDR = getStatFromItems(items, 'Cooldown Reduction');
  selectedGod.CCR = getStatFromItems(items, 'Crowd Control Reduction');
  selectedGod.basicAttackMitigated = computeDamageOnTarget(
    selectedGod.basicAttack,
    selectedGod.FlatPene,
    selectedGod.PercentPene,
    selectedGod.FlatReduc,
    selectedGod.PercentReduc,
    prot
  );
  return selectedGod;
};

const getStatFromItems = (items, stat, isPercent = false) => {
  let value = 0;
  items.forEach((item) => {
    item.ItemDescription?.Menuitems.filter((bonus) => bonus.Description === stat)
      .filter((bonus) => (bonus.Value.includes('%') && isPercent) || (!bonus.Value.includes('%') && !isPercent))
      .map((bonus) => bonus.Value.replaceAll(/[+%]/g, ''))
      .forEach((bonus) => {
        value += +bonus;
      });
  });
  return +value.toFixed();
};

export const getGodAbilitiesAndStats = (god, items, level, protection) => {
  const godAbilities = [god.Ability_1, god.Ability_2, god.Ability_3, god.Ability_4];

  const godStats = computeSelectedGodStats(god, items, level, protection);
  const abilities = formatAbilities(godAbilities, godStats, protection);

  return [abilities, godStats];
};
