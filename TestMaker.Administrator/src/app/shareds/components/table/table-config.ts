import { Observable } from "rxjs";

export interface TableConfigCloumn<T> {
    property: string;
    title: string;
    text: string;
    width?: string;
    link?: {
        url: string;
        queryParams?: any;
    };
    event?: (item: T, $event?: any) => void;
}

export interface TableConfigButton<T> {
    title: string;
    link?: {
        url: string;
        queryParams?: any;
    };
    event?: ($event?: any) => void;
}

export interface TableConfig<T> {
    id?: string;
    title: string;
    recycleBinConfig?: {
        enable: boolean;
        deleteEvent: (item: T, $event?: any) => Observable<void>
    };
    url: string;
    buttons: TableConfigButton<T>[];
    columns: TableConfigCloumn<T>[];
}
