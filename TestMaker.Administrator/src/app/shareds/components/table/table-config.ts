export interface TableConfig {
    id?: string;
    title: string;
    url: string;
    buttons: {
        title: string;
        link?: {
            url: string;
            queryParams?: any;
        };
        event?: ($event?: any) => void;
    }[];
    columns: {
        property: string;
        title: string;
        text: string;
        link?: {
            url: string;
            queryParams?: any;
        };
        event?: () => void;
    }[];
}
