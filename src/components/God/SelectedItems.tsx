import styled from '@emotion/styled';
import { BaseProps } from '../../types/baseProps';
import { Item } from '../../types/item';

type SelectedItemsProps = BaseProps & {
  items: Array<Item>;
};

const SelectedItems: React.FC<SelectedItemsProps> = ({ items, ...props }) => {
  return (
    <div className={`${props.className} container`}>
      <p>Selected items</p>
      <ul>
        {items.map((item) => (
          <li key={item.ItemId}>{item.DeviceName}</li>
        ))}
      </ul>
    </div>
  );
};

export default styled(SelectedItems)``;
