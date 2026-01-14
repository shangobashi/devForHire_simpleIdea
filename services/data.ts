import { Job, JobType, LocationType } from '../types';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior React Engineer',
    company: 'Vercel',
    type: JobType.FULL_TIME,
    location: 'San Francisco, CA',
    locationType: LocationType.REMOTE,
    salaryMin: 140000,
    salaryMax: 190000,
    description: 'We are looking for a Senior React Engineer to help build the future of the web.',
    requirements: ['5+ years React', 'Next.js expertise', 'TypeScript'],
    postedAt: new Date(Date.now() - 86400000).toISOString(),
    applicationUrl: 'https://vercel.com/careers',
    tags: ['React', 'Next.js', 'TypeScript'],
    featured: true,
    status: 'published'
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Supabase',
    type: JobType.CONTRACT,
    location: 'Singapore',
    locationType: LocationType.REMOTE,
    salaryMin: 100000,
    salaryMax: 150000,
    description: 'Join the open source Firebase alternative. Build cool tools for developers.',
    requirements: ['PostgreSQL', 'Go', 'TypeScript'],
    postedAt: new Date(Date.now() - 172800000).toISOString(),
    applicationUrl: 'https://supabase.com/careers',
    tags: ['PostgreSQL', 'Open Source', 'Go'],
    featured: true,
    status: 'published'
  },
  {
    id: '3',
    title: 'Frontend Architect',
    company: 'Linear',
    type: JobType.FULL_TIME,
    location: 'Remote',
    locationType: LocationType.REMOTE,
    salaryMin: 160000,
    salaryMax: 220000,
    description: 'Crafting the standard for issue tracking.',
    requirements: ['React', 'Performance', 'WebGL'],
    postedAt: new Date(Date.now() - 432000000).toISOString(),
    applicationUrl: 'https://linear.app/careers',
    tags: ['Performance', 'Design System', 'React'],
    featured: false,
    status: 'published'
  }
];

// Simulating a database
let jobsStore = [...MOCK_JOBS];

export const getJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobsStore.filter(j => j.status === 'published')), 400);
  });
};

export const getAllJobsAdmin = async (): Promise<Job[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(jobsStore), 400));
}

export const getJobById = async (id: string): Promise<Job | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobsStore.find(j => j.id === id)), 200);
  });
};

export const createJob = async (job: Omit<Job, 'id' | 'postedAt' | 'featured' | 'status'>): Promise<Job> => {
  return new Promise((resolve) => {
    const newJob: Job = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      postedAt: new Date().toISOString(),
      featured: true, // Paid posts are featured
      status: 'published'
    };
    jobsStore = [newJob, ...jobsStore];
    setTimeout(() => resolve(newJob), 800);
  });
};

// Payment Validation (Mocking Stripe)
export const processPayment = async (amount: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate 90% success rate
      resolve(true);
    }, 1500);
  });
};