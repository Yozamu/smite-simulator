import styled from '@emotion/styled';
import Image from 'next/image';
import { BaseProps } from '../../types/baseProps';
import { God } from '../../types/god';

type SelectedGodProps = BaseProps & {
  god: God;
};

const SelectedGod: React.FC<SelectedGodProps> = ({ god, ...props }) => {
  return (
    <div className={props.className}>
      <Image src={god.godIcon_URL} alt={god.Name} width={96} height={96} />
    </div>
  );
};

export default styled(SelectedGod)``;
