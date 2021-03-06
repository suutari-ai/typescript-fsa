export interface AnyAction {
    type: any;
}
export declare type Meta = null | {
    [key: string]: any;
};
export interface Action<P> extends AnyAction {
    type: string;
    payload: P;
    error?: boolean;
    meta?: Meta;
}
export declare type RequiredKeys<T> = {
    [P in keyof T]: T[P] extends undefined ? never : P;
}[keyof T];
export declare type Optionalize<T> = Partial<T> & {
    [P in RequiredKeys<T>]: T[P];
};
export declare type Success<P, S> = Optionalize<{
    params: P;
    result: S;
}>;
export declare type Failure<P, E> = Optionalize<{
    params: P;
    error: E;
}>;
export declare function isType<P>(action: AnyAction, actionCreator: ActionCreator<P>): action is Action<P>;
export declare type ActionCreator<P> = {
    type: string;
    match: (action: AnyAction) => action is Action<P>;
} & (P extends undefined ? (payload?: P, meta?: Meta) => Action<P> : (payload: P, meta?: Meta) => Action<P>);
export interface AsyncActionCreators<P, S, E> {
    type: string;
    started: ActionCreator<P>;
    done: ActionCreator<Success<P, S>>;
    failed: ActionCreator<Failure<P, E>>;
}
export interface ActionCreatorFactory {
    <P = undefined>(type: string, commonMeta?: Meta, isError?: boolean): ActionCreator<P>;
    <P = undefined>(type: string, commonMeta?: Meta, isError?: (payload: P) => boolean): ActionCreator<P>;
    async<P, S>(type: string, commonMeta?: Meta): AsyncActionCreators<P, S, any>;
    async<P, S, E>(type: string, commonMeta?: Meta): AsyncActionCreators<P, S, E>;
}
export declare function actionCreatorFactory(prefix?: string | null, defaultIsError?: (payload: any) => boolean): ActionCreatorFactory;
export default actionCreatorFactory;
