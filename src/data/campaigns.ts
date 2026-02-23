export interface Campaign {
  id: string;
  title: string;
  summary: string;
  date?: string;
  results: { label: string; value: string }[];
  videoId?: string;
  demoUrl?: string;
  assets: { label: string; href: string; icon?: string }[];
  team: { name: string; role: string; email: string }[];
  cta: { label: string; href: string };
}

export const campaigns: Campaign[] = [
  {
    id: 'ai-finance-automation',
    title: 'AI Automation for Finance – Campaign Insights',
    summary: 'Tekvoro Technologies Pvt Ltd launched an AI-powered automation suite for finance operations, streamlining invoice processing, reconciliation, and compliance for enterprise clients.',
    date: 'Q2 2024',
    results: [
      { label: 'Annual Cost Savings', value: '₹40L' },
      { label: 'Faster Onboarding', value: '30%' },
      { label: 'Error Reduction', value: '95%' },
      { label: 'Manual Hours Saved', value: '2,000+' },
      { label: 'Adoption Rate', value: '80%+' },
      { label: 'Compliance Accuracy', value: '99.9%' },
    ],
    videoId: 'dQw4w9WgXcQ',
    assets: [
      {
        label: 'Campaign Brochure (PDF)',
        href: '/assets/tekvoro-ai-brochure.pdf',
        icon: 'FileText',
      },
      {
        label: 'Pitch Deck (PPTX)',
        href: '/assets/tekvoro-ai-pitchdeck.pptx',
        icon: 'Download',
      },
      {
        label: 'Case Study Report',
        href: '/assets/tekvoro-ai-casestudy.pdf',
        icon: 'FileText',
      },
    ],
    team: [
      { name: 'Priya Sharma', role: 'Marketing Lead', email: 'priya.sharma@tekvoro.com' },
      { name: 'Rahul Mehta', role: 'Campaign Manager', email: 'rahul.mehta@tekvoro.com' },
      { name: 'Anjali Rao', role: 'Content Strategist', email: 'anjali.rao@tekvoro.com' },
    ],
    cta: { label: 'Submit Lead', href: 'https://forms.gle/tekvoro-lead-form' },
  },
  {
    id: 'cloud-migration-success',
    title: 'Cloud Migration Success Story – Enterprise Client',
    summary: 'Successfully migrated a Fortune 500 client from legacy on-premise systems to cloud-native architecture, achieving 60% cost reduction and 99.9% uptime.',
    date: 'Q1 2024',
    results: [
      { label: 'Cost Reduction', value: '60%' },
      { label: 'System Uptime', value: '99.9%' },
      { label: 'Migration Time', value: '8 weeks' },
      { label: 'Data Loss', value: '0%' },
      { label: 'Performance Gain', value: '3x' },
      { label: 'Security Score', value: 'A+' },
    ],
    demoUrl: 'https://demo.tekvoro.com/cloud-migration',
    assets: [
      {
        label: 'Migration Case Study (PDF)',
        href: '/assets/cloud-migration-case-study.pdf',
        icon: 'FileText',
      },
      {
        label: 'Technical Architecture (PDF)',
        href: '/assets/cloud-architecture.pdf',
        icon: 'FileText',
      },
      {
        label: 'ROI Calculator (XLSX)',
        href: '/assets/cloud-roi-calculator.xlsx',
        icon: 'Download',
      },
    ],
    team: [
      { name: 'Vikram Singh', role: 'Cloud Solutions Lead', email: 'vikram.singh@tekvoro.com' },
      { name: 'Meera Patel', role: 'Technical Architect', email: 'meera.patel@tekvoro.com' },
      { name: 'Arjun Kumar', role: 'Project Manager', email: 'arjun.kumar@tekvoro.com' },
    ],
    cta: { label: 'Request Migration Assessment', href: 'https://forms.gle/cloud-migration-assessment' },
  },
];

export const getCampaignById = (id: string): Campaign | undefined => {
  return campaigns.find(campaign => campaign.id === id);
};

export const getAllCampaigns = (): Campaign[] => {
  return campaigns;
}; 