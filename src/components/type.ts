export interface Screenshot {
    url: string;
  }
  
  export interface Company {
    name: string;
  }
  
  export interface InvolvedCompany {
    company: Company;
  }
  
  export interface Genre {
    name: string;
  }
  
  export interface Platform {
    name: string;
  }
  
  export interface Game {
    id: number;
    name: string;
    first_release_date?: number;
    genres?: { id: number; name: string }[];
    involved_companies?: { id: number; company: { id: number; name: string } }[];
    platforms?: { id: number; name: string }[];
    screenshots?: { id: number; url: string }[];
  }
  