export interface Repository {

    query(queryString: string, queryParams: any[]): Promise<any[]>;
  
  }