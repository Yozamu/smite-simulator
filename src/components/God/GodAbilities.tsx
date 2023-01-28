import styled from '@emotion/styled';
import { BaseProps } from '../../types/baseProps';

type GodAbilitiesProps = BaseProps & {};

const GodAbilities: React.FC<GodAbilitiesProps> = ({ ...props }) => {
  return <div className={props.className}>God abilities</div>;
};

export default styled(GodAbilities)``;
