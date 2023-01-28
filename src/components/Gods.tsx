import styled from '@emotion/styled';
import { Button, Snackbar, SnackbarContent } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { BaseProps } from '../types/baseProps';
import { God } from '../types/god';

type GodsProps = BaseProps & {
  gods?: Array<God>;
};

const Gods: React.FC<GodsProps> = ({ gods, ...props }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [selectedGod, setSelectedGod] = useState('');

  const selectGod = (god) => {
    setIsSnackbarOpen(true);
    setSelectedGod(god.Name);
    localStorage.setItem('god', JSON.stringify(god));
  };

  return (
    <div className={props.className}>
      {gods?.map((god) => (
        <Button key={god.id} className="god" variant="contained" onClick={() => selectGod(god)}>
          <Image src={god.godIcon_URL} alt={god.Name} width={96} height={96} />
          <br />
          {god.Name}
        </Button>
      ))}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setIsSnackbarOpen(false)}
        color="secondary"
      >
        <SnackbarContent message={`${selectedGod} selected`} style={{ backgroundColor: 'var(--navbar-color)' }} />
      </Snackbar>
    </div>
  );
};

export default styled(Gods)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .god {
    display: flex;
    flex-direction: column;
    width: 128px;
    text-align: center;
    font-size: 0.75rem;
    margin: 4px;
    padding-top: 12px;
    background-color: var(--main-color-light);
    border-radius: 8px;

    img {
      border-radius: 12px;
    }
  }
`;
