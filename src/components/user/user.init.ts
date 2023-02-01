import { UserService } from './user.service';
import { UserStore } from './user.store';
import { UserContextClass } from './user.context';

export const userService = new UserService();
const userContext = new UserContextClass(userService);
export const userStore = new UserStore(userService);
export const userstore = new UserStore(userService);
export { userContext as UserContext };
