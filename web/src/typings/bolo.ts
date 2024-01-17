export interface BOLO {
  id: number;
  firstName: string;
  lastName: string;
  stateId: string;
  image?: string;
  mugshot?: string;
  callSign: string;
  contents: string;
  createdAt: number;
  images?: string[];
}
