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
  const bindedStats = [
    ['HP', god.Health],
    ['MP', god.Mana],
    ['HP5', god.HealthPerFive],
    ['MP5', god.ManaPerFive],
    ['Speed', god.Speed],
    ['Attack speed', god.AttackSpeed],
    [isMagic ? 'Magical power' : 'Physical power', isMagic ? god.MagicalPower : god.PhysicalPower],
    ['Physical protection', god.PhysicalProtection],
    ['Magic protection', god.MagicProtection],
    ['AA', god.basicAttack + ' raw, ' + god.basicAttackMitigated + ' mitigated'],
  ];

  return (
    <div className={`${props.className} container`}>
      <Image src={god.godIcon_URL} alt={god.Name} width={128} height={128} />
      <h2>
        {god.Name} ({god.Pantheon}) - {god.Roles}
      </h2>
      <ul>
        {bindedStats.map((stat) => (
          <li key={stat[0]}>
            {stat[0]}: <span className="stat-value">{stat[1]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default styled(SelectedGod)`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 8px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    background-color: var(--navbar-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin: 4px;

    li {
      flex-basis: 50%;
      text-align: center;
    }
  }

  .ability {
    margin: 10px;
    padding: 20px;
    background-color: var(--navbar-color);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .stat-value {
    color: var(--secondary-color);
  }
`;
