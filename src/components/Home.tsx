import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { BaseProps } from '../types/baseProps';
import GodAbilities from './God/GodAbilities';
import SelectedGod from './God/SelectedGod';
import SelectedItems from './God/SelectedItems';

type HomeProps = BaseProps & {};

const Home: React.FC<HomeProps> = ({ ...props }) => {
  const [god, setGod] = useState(null);

  useEffect(() => {
    const godKey = localStorage.getItem('god');
    if (godKey) setGod(JSON.parse(godKey));
  }, []);

  return (
    <div className={props.className}>
      {god && (
        <>
          <SelectedGod god={god} />
          <GodAbilities god={god} />
          <SelectedItems />
        </>
      )}
    </div>
  );
};

export default styled(Home)``;
