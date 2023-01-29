import styled from '@emotion/styled';
import { Button, Dialog, DialogTitle, Snackbar, SnackbarContent } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BaseProps } from '../types/baseProps';
import { Item } from '../types/item';

type ItemsProps = BaseProps & {
  items: Array<Item>;
};

const Items: React.FC<ItemsProps> = ({ items, ...props }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([{}, {}, {}, {}, {}, {}]);

  useEffect(() => {
    const items = localStorage.getItem('items');
    if (items) setSelectedItems(JSON.parse(items));
  }, []);

  const selectItem = (item: Item) => {
    setIsDialogOpen(true);
    setSelectedItem(item);
  };

  const validateItem = (slot) => {
    setIsDialogOpen(false);
    setIsSnackbarOpen(true);
    const newItems = [...selectedItems].map((item: Item) => (item.DeviceName === selectedItem.DeviceName ? {} : item));
    newItems[slot] = selectedItem;
    localStorage.setItem('items', JSON.stringify(newItems));
    setSelectedItems(newItems);
  };

  return (
    <div className={props.className}>
      {items
        ?.filter((item) => item.ActiveFlag === 'y' && item.ItemTier > 2 && item.ItemDescription.Menuitems.length > 0)
        .sort((a, b) => a.DeviceName.localeCompare(b.DeviceName))
        .map((item) => (
          <Button key={item.ItemId} className="item" variant="contained" onClick={() => selectItem(item)}>
            <Image src={item.itemIcon_URL} alt={item.DeviceName} width={96} height={96} />
            <br />
            {item.DeviceName}
          </Button>
        ))}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setIsSnackbarOpen(false)}
        color="secondary"
      >
        <SnackbarContent
          message={`${selectedItem?.DeviceName} equipped`}
          style={{ backgroundColor: 'var(--navbar-color)' }}
        />
      </Snackbar>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen} maxWidth="lg">
        <DialogTitle sx={{ backgroundColor: 'var(--main-color-light)', color: 'var(--white)' }}>
          Choose a slot to equip the item
        </DialogTitle>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '4px',
            backgroundColor: 'var(--main-color-light)',
          }}
        >
          {selectedItems.map((value: Item, itemSlot: number) => (
            <Button
              style={{ margin: '5px', padding: '0', border: '1px solid', width: '96px', height: '96px' }}
              key={itemSlot}
              onClick={() => validateItem(itemSlot)}
            >
              {value.DeviceName && <Image src={value.itemIcon_URL} alt={value.DeviceName} width={96} height={96} />}
            </Button>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default styled(Items)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .item {
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
