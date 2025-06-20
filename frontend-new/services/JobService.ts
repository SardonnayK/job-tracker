// JobService.ts
export type JobStatus = 'Pending' | 'Approved' | 'In Progress' | 'Completed';

export interface Job {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  riskAssessments: string[];
  sops: string[];
  approvals: { name: string; approved: boolean }[];
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Install HVAC System',
    description: 'Install new HVAC system in building A.',
    status: 'Pending',
    riskAssessments: ['Electrical hazard', 'Working at height'],
    sops: ['HVAC Installation SOP'],
    approvals: [
      { name: 'Supervisor', approved: false },
      { name: 'Safety Officer', approved: false },
    ],
  },
  {
    id: '2',
    title: 'Replace Lighting',
    description: 'Replace all lighting in warehouse.',
    status: 'Approved',
    riskAssessments: ['Ladder use', 'Electrical hazard'],
    sops: ['Lighting Replacement SOP'],
    approvals: [
      { name: 'Supervisor', approved: true },
      { name: 'Safety Officer', approved: true },
    ],
  },
  {
    id: '3',
    title: 'Routine Maintenance',
    description: 'Monthly maintenance of machinery.',
    status: 'In Progress',
    riskAssessments: ['Pinch points', 'Lockout/Tagout'],
    sops: ['Maintenance SOP'],
    approvals: [
      { name: 'Supervisor', approved: true },
      { name: 'Safety Officer', approved: true },
    ],
  },
];

export const JobService = {
  getJobs: (status?: JobStatus) => {
    if (status) {
      return jobs.filter((job) => job.status === status);
    }
    return jobs;
  },
  getJobById: (id: string) => jobs.find((job) => job.id === id),
};
