export interface AddressWithoutId {
  type: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IAddress extends AddressWithoutId {
  _id: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  verified?: boolean;
  gender?: string;
  dateOfBirth?: string;
  image?: string;
}
