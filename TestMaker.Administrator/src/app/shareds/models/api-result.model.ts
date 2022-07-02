export interface IApiResult<T> {
    errors: string[];
    data: T,
    code: number
}
