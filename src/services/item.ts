import { Collections, ItemResponse } from '../../pocketbase-types.js';
import pb from '../lib/pocketbase.js';

export const getItem = async (id: string) => {
  const res = await pb.collection(Collections.Item).getOne<ItemResponse>(id);

  return res;
};
