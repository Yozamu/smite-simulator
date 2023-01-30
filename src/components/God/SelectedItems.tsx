import styled from '@emotion/styled';
import Image from 'next/image';
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
        {items
          .filter((item) => item.ItemId)
          .map((item) => (
            <li key={item.ItemId}>
              <Image src={item.itemIcon_URL} alt={item.DeviceName} width={96} height={96} />
              {item.DeviceName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default styled(SelectedItems)`
  ul {
    display: flex;
    justify-content: space-evenly;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
