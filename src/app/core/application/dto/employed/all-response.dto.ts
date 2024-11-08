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

interface IEmployResponse {
  content: Employee[];
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


interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'USER' | 'OTHER_ROLE';
}

