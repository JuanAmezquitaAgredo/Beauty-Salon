import { IService } from "../Contents/contents.models";
import { IPageable } from "../Pagination/pagination.model";

export interface IResponseServices {
    content: IService[];
    pageable: IPageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean
    };
    first: boolean;
    empty: boolean;
  }