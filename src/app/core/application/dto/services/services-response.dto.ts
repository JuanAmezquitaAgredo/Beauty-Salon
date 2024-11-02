interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}


interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
}


interface IServicesResponse {
    content: Service[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    empty: boolean;
}
