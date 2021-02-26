export interface IPaginator { 
  finder?: string;
  page?: number;
  current?: number;
  count?: number;
  perPage?: number;
  start?: number;
  end?: number;
  prevPage?: boolean;
  nextPage?: boolean;
  pageCount?: string;
  sort?: string;
  direction?: string;
  limit?: number;
  sortDefault?: string;
  directionDefault?: string;
  scope?: null;
}

export class Paginator implements IPaginator { 
  constructor(
    public finder?: string,
    public page?: number,
    public current?: number,
    public count?: number,
    public perPage?: number,
    public start?: number,
    public end?: number,
    public prevPage?: boolean,
    public nextPage?: boolean,
    public pageCount?: string,
    public sort?: string,
    public direction?: string,
    public limit?: number,
    public sortDefault?: string,
    public directionDefault?: string,
    public scope?: null
  ) { }
}