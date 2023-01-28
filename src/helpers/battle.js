export const computeDamageOnTarget = (rawDamage, flatPene, percentPene, flatReduc, percentReduc, protection) => {
  const realDefense = (protection * (1 - percentReduc / 100) - flatReduc) * (1 - percentPene / 100) - flatPene;
  return ((100 * rawDamage) / (realDefense + 100)).toFixed();
};

export const formatAbilities = (rawAbilities, power, cdr, flatPene, percentPene, flatReduc, percentReduc) => {
  if (!rawAbilities) return null;
  console.log(rawAbilities);
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
    const damageWithProt = [];
    for (let i = 50; i < 350; i += 50) {
      damageWithProt.push(computeDamageOnTarget(damage, flatPene, percentPene, flatReduc, percentReduc, i));
    }
    ability.damageWithProtection = damageWithProt;
    abilities.push(ability);
  });
  console.log(abilities);
  return abilities;
};
