import { createSession } from './api/createSession';
import { getGods } from './api/gods';

const GodsPage = ({ gods }) => {
  // Name, Ability_1/2/3/4 > { Summary, URL }, Pantheon, Roles, godIcon_URL
  // AttackSpeed, AttackSpeedPerLevel, Speed
  // Health, HP5PerLevel, HealthPerFive, HealthPerLevel
  // MP5PerLevel, Mana, ManaPerFive, ManaPerLevel
  // MagicProtection, MagicProtectionPerLevel, PhysicalProtection, PhysicalProtectionPerLevel
  // MagicalPower, MagicalPowerPerLevel, PhysicalPower, PhysicalPowerPerLevel
  // basicAttack > menuitems > [{ description(degats), value }, {description(enchainement), value}]
  return (
    <div>
      {gods?.map((god) => (
        <div key={god.id}>
          {god.Name} - {god.Ability1} / {god.Ability2} / {god.Ability3} / {god.Ability4}
        </div>
      ))}
    </div>
  );
};

export default GodsPage;

export async function getStaticProps() {
  const session = await createSession();
  const gods = (await getGods(session.session)).data;

  return {
    props: { gods },
    revalidate: 60 * 60 * 24, // revalidate each day
  };
}
