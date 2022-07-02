export interface IGetPaginationResult<T> {
    data: T[];
    page: number;
    take: number;
    totalPage: number;
}
