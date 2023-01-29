import styled from '@emotion/styled';
import Image from 'next/image';
import { isGodMagic } from '../../helpers/game';
import { BaseProps } from '../../types/baseProps';
import { GodStats } from '../../types/godStats';

type SelectedGodProps = BaseProps & {
  god: GodStats;
};

const SelectedGod: React.FC<SelectedGodProps> = ({ god, ...props }) => {
  const isMagic = isGodMagic(god);

  return (
    <div className={`${props.className} container`}>
      <Image src={god.godIcon_URL} alt={god.Name} width={96} height={96} />
      <p>
        {god.Name} ({god.Pantheon}) - {god.Roles}
      </p>
      <ul>
        <li>HP: {god.Health}</li>
        <li>MP: {god.Mana}</li>
        <li>HP5: {god.HealthPerFive}</li>
        <li>MP5: {god.ManaPerFive}</li>
        <li>Speed: {god.Speed}</li>
        <li>Attack speed: {god.AttackSpeed}</li>
        {isMagic ? <li>Magical power: {god.MagicalPower}</li> : <li>Physical power: {god.PhysicalPower}</li>}
        <li>Physical protection: {god.PhysicalProtection}</li>
        <li>Magic protection: {god.MagicProtection}</li>
        <li>
          AA: {god.basicAttack} raw, {god.basicAttackMitigated} mitigated
        </li>
      </ul>
    </div>
  );
};

export default styled(SelectedGod)`
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
