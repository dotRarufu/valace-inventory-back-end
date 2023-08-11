// const PocketBase = require('pocketbase/cjs');
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://172.18.0.1:8090');
// todo: turned off, becausae of duplicate renders in dev mode
pb.autoCancellation(false);

export default pb;

// class CustomAuthStore extends BaseAuthStore {
//     get model(): Record | Admin | null {
//         return this.
//     }
// }

// const pb = new PocketBase('http://127.0.0.1:8090', new CustomAuthStore());
