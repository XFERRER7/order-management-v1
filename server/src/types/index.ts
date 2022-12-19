export interface IUser {
  name: string,
  email: string,
  password: string,
  apartmentNumber: number,
}

export interface IApartment {
  number: number,
}

export interface IOrder {
  id: number,
  status: 'Received' | 'Delivered',
  apartmentNumber: number,
  items: IItem[],
  createdAt: Date,
  updatedAt: Date,
}

export interface IItem {
  id: number,
  orderId: number,
  quantity: number,
  name: string,
}
