import { ItemsListPnItemModel } from './items-list-pn-item.model';

export class ItemsListPnCreateModel {
  name: string;
  description: string;
  repeatEvery: number;
  repeatType: number;
  dayOfWeek: number;
  dayOfMonth: number;
  repeatUntil: string;
  internalRepeatUntil: string;
  relatedEFormId: number;
  items: ItemsListPnItemModel[] = [];
}
