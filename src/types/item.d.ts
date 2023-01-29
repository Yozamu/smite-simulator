export type Item = {
  ActiveFlag: string;
  DeviceName: string;
  ItemDescription: {
    Menuitems: Array<Object>;
    SecondaryDescription: string;
  };
  ItemId: number;
  ItemTier: number;
  Price: number;
  itemIcon_URL: string;
};
