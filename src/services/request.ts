import {
  Collections,
  RequestResponse,
  UserResponse,
} from '../../pocketbase-types.js';
import pb from '../lib/pocketbase.js';

export const getRequest = async (id: string) => {
  const res = await pb
    .collection(Collections.Request)
    .getOne<RequestResponse>(id);

  return res;
};

export const getOfficeData = async (id: string) => {
  const res = await pb.collection(Collections.User).getOne<UserResponse>(id);

  return res;
};
