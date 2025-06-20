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
    title: 'Soil pH Analysis',
    description: 'Analyze the pH level of soil samples collected from Field A.',
    status: 'Pending',
    riskAssessments: ['Chemical handling', 'Sample contamination'],
    sops: ['Soil pH Measurement SOP'],
    approvals: [
      { name: 'Lab Supervisor', approved: false },
      { name: 'Quality Officer', approved: false },
    ],
  },
  {
    id: '2',
    title: 'Leaf Nutrient Analysis',
    description: 'Determine nutrient content in maize leaf samples.',
    status: 'Approved',
    riskAssessments: ['Chemical exposure', 'Glassware breakage'],
    sops: ['Leaf Nutrient Extraction SOP'],
    approvals: [
      { name: 'Lab Supervisor', approved: true },
      { name: 'Quality Officer', approved: true },
    ],
  },
  {
    id: '3',
    title: 'Soil Texture Test',
    description: 'Assess soil texture using hydrometer method for research plot B.',
    status: 'In Progress',
    riskAssessments: ['Slippery surfaces', 'Sample mislabeling'],
    sops: ['Soil Texture Analysis SOP'],
    approvals: [
      { name: 'Lab Supervisor', approved: true },
      { name: 'Quality Officer', approved: true },
    ],
  },
  {
    id: '4',
    title: 'Leaf Chlorophyll Content',
    description: 'Measure chlorophyll content in soybean leaves using spectrophotometry.',
    status: 'Completed',
    riskAssessments: ['UV exposure', 'Equipment calibration error'],
    sops: ['Chlorophyll Measurement SOP'],
    approvals: [
      { name: 'Lab Supervisor', approved: true },
      { name: 'Quality Officer', approved: true },
    ],
  },
  {
    id: '5',
    title: 'Soil Organic Matter Determination',
    description: 'Quantify organic matter in soil samples from experimental plot C.',
    status: 'Pending',
    riskAssessments: ['Chemical burns', 'Fire hazard'],
    sops: ['Soil Organic Matter SOP'],
    approvals: [
      { name: 'Lab Supervisor', approved: false },
      { name: 'Quality Officer', approved: false },
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
