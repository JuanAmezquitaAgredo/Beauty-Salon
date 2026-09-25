// Construye una respuesta paginada con el mismo formato que devolvía el backend (Spring Page).
// `page` llega en base 1 desde la UI; `pageable.pageNumber` se devuelve en base 0.
export interface IPage<T> {
    content: T[];
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

export function normalizePage(page?: number, size?: number) {
    const safeSize = Math.min(Math.max(Number(size) || 10, 1), 100);
    const safePage = Math.max(Number(page) || 1, 1);
    return { page: safePage, size: safeSize, skip: (safePage - 1) * safeSize };
}

export function toPage<T>(content: T[], page: number, size: number, totalElements: number): IPage<T> {
    const totalPages = Math.max(Math.ceil(totalElements / size), 1);
    const pageNumber = page - 1;
    const sort = { unsorted: true, sorted: false, empty: true };

    return {
        content,
        pageable: {
            pageNumber,
            pageSize: size,
            sort,
            offset: pageNumber * size,
            paged: true,
            unpaged: false,
        },
        totalPages,
        totalElements,
        last: page >= totalPages,
        numberOfElements: content.length,
        size,
        number: pageNumber,
        sort,
        first: page === 1,
        empty: content.length === 0,
    };
}
