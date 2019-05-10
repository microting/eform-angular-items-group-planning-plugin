import {ItemsListPnItemModel} from './items-list-pn-item.model';

export class ItemsListPnUpdateModel {
  id: number;
  name: string;
  description: string;
  repeatEvery: number;
  repeatType: number;
  repeatOn: number;
  repeatUntil: Date | null;
  items: ItemsListPnItemModel[] = [];

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.repeatEvery = data.repeatEvery;
      this.repeatType = data.repeatType;
      this.repeatOn = data.repeatOn;
      this.repeatUntil = data.repeatUntil;
      this.items = data.items;
    }
  }
}