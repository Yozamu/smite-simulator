export type Ability = {
  Description: {
    itemDescription: {
      cooldown: string;
      cost: string;
      description: string;
      menuitems: [{ description: string; value: string }, { description: string; value: string }];
      rankitems: [{ description: string; value: string }, { description: string; value: string }];
    };
  };
  Id: number;
  Summary: string;
  URL: string;
};
