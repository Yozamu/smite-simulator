import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { formatAbilities } from '../helpers/battle';
import { BaseProps } from '../types/baseProps';
import GodAbilities from './God/GodAbilities';
import SelectedGod from './God/SelectedGod';
import SelectedItems from './God/SelectedItems';

type HomeProps = BaseProps & {};

const Home: React.FC<HomeProps> = ({ ...props }) => {
  const [god, setGod] = useState(null);
  const power = 150;
  const cdr = 30;
  const flatPene = 15;
  const percentPene = 10;
  const flatReduc = 10;
  const percentReduc = 10;
  const godAbilities = god && [god.Ability_1, god.Ability_2, god.Ability_3, god.Ability_4];
  const formattedAbilities = formatAbilities(godAbilities, power, cdr, flatPene, percentPene, flatReduc, percentReduc);

  useEffect(() => {
    const godKey = localStorage.getItem('god');
    if (godKey) setGod(JSON.parse(godKey));
  }, []);

  return (
    <div className={props.className}>
      {god ? (
        <>
          <SelectedGod god={god} />
          <GodAbilities abilities={formattedAbilities} />
          <SelectedItems />
        </>
      ) : (
        <em>Please select a god to start</em>
      )}
    </div>
  );
};

export default styled(Home)``;
