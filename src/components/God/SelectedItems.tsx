import styled from '@emotion/styled';
import { BaseProps } from '../../types/baseProps';
import { Item } from '../../types/item';

const SelectedItemsContainer = styled.div`
  text-align: center;

  .title {
    font-size: 24px;
    margin-bottom: 8px;
    color: var(--secondary-color);
  }

  ul {
    display: flex;
    justify-content: space-evenly;
    list-style-type: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .item {
    margin: 8px;
    padding: 8px;
    background-color: var(--navbar-color);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .img {
    margin-bottom: 10px;
    border-radius: 50%;
  }

  .item-name {
    font-size: 18px;
    color: var(--white);
  }
`;

type SelectedItemsProps = BaseProps & {
  items: Array<Item>;
};

const SelectedItems: React.FC<SelectedItemsProps> = ({ items, ...props }) => {
  return (
    <SelectedItemsContainer className={`${props.className} container`}>
      <p className="title">Selected items</p>
      <ul>
        {items
          .filter((item) => item.ItemId)
          .map((item) => (
            <li key={item.ItemId} className="item">
              <img src={item.itemIcon_URL} alt={item.DeviceName} width={96} height={96} />
              <span className="item-name">{item.DeviceName}</span>
            </li>
          ))}
      </ul>
    </SelectedItemsContainer>
  );
};

export default SelectedItems;
