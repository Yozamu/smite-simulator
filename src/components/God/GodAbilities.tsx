import styled from '@emotion/styled';
import Image from 'next/image';
import { BaseProps } from '../../types/baseProps';
import { FormattedAbility } from '../../types/formattedAbility';

type GodAbilitiesProps = BaseProps & {
  abilities: Array<FormattedAbility>;
};

const GodAbilities: React.FC<GodAbilitiesProps> = ({ abilities, ...props }) => {
  return (
    <div className={`${props.className} container`}>
      {abilities.map((ability) => (
        <div key={ability.id} className="ability">
          <Image src={ability.url} alt={ability.name} width={64} height={64} />
          <p>{ability.name}</p>
          <p>Cooldown: {ability.cooldown}</p>
          {ability.rawDamage > 0 && (
            <>
              <p>Raw damage: {ability.rawDamage}</p>
              <p>Computed damage: {ability.mitigatedDamage}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default styled(GodAbilities)`
  display: flex;

  .ability {
    margin: 4px;
    text-align: center;
  }
`;
