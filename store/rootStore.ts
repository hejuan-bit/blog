import userStore, {IUserStore} from './userSrore';

export interface Istore {
    user: IUserStore
}

export default function createStore(initialValue: any): () => Istore {
    return () => {
        return {
            user: {...userStore(), ...initialValue?.user}
        }
    }
}