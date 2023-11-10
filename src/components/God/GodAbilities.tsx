import styled from '@emotion/styled';
import { BaseProps } from '../../types/baseProps';
import { FormattedAbility } from '../../types/formattedAbility';

type GodAbilitiesProps = BaseProps & {
  abilities: Array<FormattedAbility>;
};

const GodAbilitiesContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  .ability {
    margin: 10px;
    padding: 20px;
    background-color: var(--navbar-color);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .ability-image {
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: var(--white);
  }

  .ability-name {
    font-weight: bold;
    font-size: 18px;
    color: var(--secondary-color);
    margin: 8px;
  }

  .cooldown {
    font-size: 14px;
  }
`;

const GodAbilities: React.FC<GodAbilitiesProps> = ({ abilities, ...props }) => {
  return (
    <GodAbilitiesContainer className={`${props.className} container`}>
      {abilities.map((ability) => (
        <div key={ability.id} className="ability">
          <div className="ability-image">
            <img src={ability.url} alt={ability.name} width={64} height={64} />
          </div>
          <p className="ability-name">{ability.name}</p>
          <p className="cooldown">Cooldown: {ability.cooldown}</p>
          {ability.rawDamage > 0 && (
            <>
              <p>Raw damage: {ability.rawDamage}</p>
              <p>Computed damage: {ability.mitigatedDamage}</p>
            </>
          )}
        </div>
      ))}
    </GodAbilitiesContainer>
  );
};

export default GodAbilities;
