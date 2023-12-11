import {AvatarType} from './Avatar';

type AvatarUser = {
  id: number;
  image: string;
};

export type RegisterType = {
  token: string;
  fullname: string;
  email: string;
  avatar: AvatarUser | null;
  diamond: number;
};
