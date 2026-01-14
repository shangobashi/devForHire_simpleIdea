export enum JobType {
  FULL_TIME = 'Full-time',
  CONTRACT = 'Contract',
  FREELANCE = 'Freelance',
}

export enum LocationType {
  REMOTE = 'Remote',
  ONSITE = 'On-site',
  HYBRID = 'Hybrid',
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: JobType;
  location: string;
  locationType: LocationType;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  postedAt: string;
  applicationUrl: string;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
}

export interface PaymentIntent {
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded';
}