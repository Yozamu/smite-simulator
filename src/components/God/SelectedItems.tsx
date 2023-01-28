import styled from '@emotion/styled';
import { BaseProps } from '../../types/baseProps';

type SelectedItemsProps = BaseProps & {};

const SelectedItems: React.FC<SelectedItemsProps> = ({ ...props }) => {
  return <div className={props.className}>Selected items</div>;
};

export default styled(SelectedItems)``;
