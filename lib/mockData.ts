export interface Lead {
  name: string;
  company: string;
  title: string;
  summary: string;
}

// Mock leads data for testing and demonstration
export const mockLeads: Lead[] = [
  {
    name: "Sarah Johnson",
    company: "Bloom Analytics",
    title: "CMO",
    summary: "Leads growth marketing at a 15-person B2B SaaS startup helping eCom brands."
  },
  {
    name: "Michael Chen",
    company: "TechFlow Solutions",
    title: "CEO",
    summary: "Founder of a 50-person AI automation platform serving enterprise clients."
  },
  {
    name: "Emily Rodriguez",
    company: "GrowthHack Labs",
    title: "Marketing Director",
    summary: "Heads digital marketing for a fast-growing marketing automation platform."
  }
]; 