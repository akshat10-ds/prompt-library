export interface FeaturedPrompt {
  id: string;
  highlight?: string;
}

export const featuredPrompts: FeaturedPrompt[] = [
  { id: 'sales-cold-outreach', highlight: 'Most Popular' },
  { id: 'engineering-code-review', highlight: "Editor's Pick" },
  { id: 'productivity-meeting-notes', highlight: 'Quick Start' },
  { id: 'design-user-research-plan' },
  { id: 'marketing-campaign-brief' },
];
