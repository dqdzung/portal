import { User } from '@/models/user';
import Storage from '@/utils/storage';

export const userStorage = new Storage<User>('user');

export const isAuthorized = (): boolean => !!userStorage.get();
