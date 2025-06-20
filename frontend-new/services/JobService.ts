// JobService.ts
export type JobStatus = 'Pending' | 'Approved' | 'In Progress' | 'Completed';

export interface Worker {
  name: string;
  clockIn: string;
  clockOut?: string;
}

export interface JobEvent {
  timestamp: string;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  riskAssessments: string[];
  sops: string[];
  approvals: { name: string; approved: boolean }[];
  workers: Worker[];
  events: JobEvent[];
  location?: string;
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
    workers: [
      { name: 'Alice', clockIn: '2025-06-20T08:00', clockOut: undefined },
      { name: 'Bob', clockIn: '2025-06-20T08:15', clockOut: '2025-06-20T12:00' },
    ],
    events: [
      {
        timestamp: '2025-06-20T09:00',
        description: 'Sample B was contaminated, new sample collected.',
      },
      {
        timestamp: '2025-06-20T10:30',
        description: 'Section 3.2 of SOP not applicable for this soil type.',
      },
    ],
    location: 'Field A',
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
    workers: [],
    events: [],
    location: 'Greenhouse 1',
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
    workers: [],
    events: [],
    location: 'Research Plot B',
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
    workers: [],
    events: [],
    location: 'Field C',
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
    workers: [],
    events: [],
    location: 'Experimental Plot C',
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
