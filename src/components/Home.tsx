import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { getGodAbilitiesAndStats } from '../helpers/game';
import { BaseProps } from '../types/baseProps';
import GodAbilities from './God/GodAbilities';
import SelectedGod from './God/SelectedGod';
import SelectedItems from './God/SelectedItems';

type HomeProps = BaseProps & {};

const Home: React.FC<HomeProps> = ({ ...props }) => {
  const [god, setGod] = useState(null);
  const [items, setItems] = useState([]);
  const level = 20;
  const protection = 50;
  let abilities, godStats;
  if (god) {
    [abilities, godStats] = getGodAbilitiesAndStats(god, items, level, protection);
  }

  useEffect(() => {
    const godKey = localStorage.getItem('god');
    const itemsKey = localStorage.getItem('items');
    if (godKey) setGod(JSON.parse(godKey));
    if (itemsKey) setItems(JSON.parse(itemsKey));
  }, []);

  return (
    <div className={props.className}>
      {god ? (
        <>
          <SelectedGod god={godStats} />
          <GodAbilities abilities={abilities} />
          <SelectedItems items={items} />
        </>
      ) : (
        <em>Please select a god to start</em>
      )}
    </div>
  );
};

export default styled(Home)``;
