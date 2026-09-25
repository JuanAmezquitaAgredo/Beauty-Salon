interface Client {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    appointments?: Appointment[];
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

interface IClientsResponse {
    content: Client[];
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



interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  
  interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string; 
  }
  
  interface Appointment {
    id: number;
    dateTime: string; 
    duration: number;
    comments: string;
    service: Service;
    employee: Employee;
  }
  