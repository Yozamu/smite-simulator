import styled from '@emotion/styled';
import { BaseProps } from '../../types/baseProps';
import { God } from '../../types/god';

type GodAbilitiesProps = BaseProps & {
  god: God;
};

const GodAbilities: React.FC<GodAbilitiesProps> = ({ ...props }) => {
  return <div className={props.className}>God abilities</div>;
};

export default styled(GodAbilities)``;
