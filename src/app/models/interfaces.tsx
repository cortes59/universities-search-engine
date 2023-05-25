export interface IUniversity {
  country: string;
  alpha_two_code: string;
  name: string;
  "state-province"?: string | null;
  domains: string[];
  web_pages: string[];
}

export interface IPaginationParams {
    current: number;
    perPage: number;
}