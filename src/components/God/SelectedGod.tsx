import styled from '@emotion/styled';
import Image from 'next/image';
import { BaseProps } from '../../types/baseProps';
import { God } from '../../types/god';

type SelectedGodProps = BaseProps & {
  god: God;
};

const SelectedGod: React.FC<SelectedGodProps> = ({ god, ...props }) => {
  const isMagic = god.Roles === 'Guardian' || god.Roles === 'Mage';
  const level = 20;
  const aaDamageLine = god.basicAttack.itemDescription.menuitems[0].value;
  const aaDLSplit = aaDamageLine.split(/[+% /]/);
  const aaRawDamage = +aaDLSplit[0] + +aaDLSplit[3] * level;
  const aaBonusDamage = (+aaDLSplit[6] * (isMagic ? god.MagicalPower : god.PhysicalPower)) / 100;
  const aaDamage = aaRawDamage + aaBonusDamage;

  return (
    <div className={props.className}>
      <Image src={god.godIcon_URL} alt={god.Name} width={96} height={96} />
      <p>
        {god.Name} ({god.Pantheon}) - {god.Roles}
      </p>
      <ul>
        <li>HP: {god.Health + god.HealthPerLevel * level}</li>
        <li>MP: {god.Mana + god.ManaPerLevel * level}</li>
        <li>HP5: {god.HealthPerFive + god.HP5PerLevel * level}</li>
        <li>MP5: {god.ManaPerFive + god.MP5PerLevel * level}</li>
        <li>Speed: {god.Speed}</li>
        <li>Attack speed: {god.AttackSpeed + god.AttackSpeedPerLevel * level}</li>
        {isMagic ? (
          <li>Magical power: {god.MagicalPower + god.MagicalPowerPerLevel * level}</li>
        ) : (
          <li>Physical power: {god.PhysicalPower + god.PhysicalPowerPerLevel * level}</li>
        )}
        <li>Physical protection: {god.PhysicalProtection + god.PhysicalProtectionPerLevel * level}</li>
        <li>Magic protection: {god.MagicProtection + god.MagicProtectionPerLevel * level}</li>
        <li>Basic attack: {aaDamage}</li>
      </ul>
    </div>
  );
};

export default styled(SelectedGod)`
  background-color: var(--main-color-light);
  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      flex-basis: 50%;
    }
  }
`;
