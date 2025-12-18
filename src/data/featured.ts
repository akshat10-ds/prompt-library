export interface FeaturedPrompt {
  id: string;
  highlight?: string;
}

export const featuredPrompts: FeaturedPrompt[] = [
  { id: 'productivity-meeting-notes', highlight: 'Most Popular' },
  { id: 'productivity-weekly-review', highlight: "Editor's Pick" },
  { id: 'productivity-email-drafting', highlight: 'Quick Start' },
  { id: 'productivity-task-breakdown' },
  { id: 'engineering-code-review' },
  { id: 'sales-cold-outreach' },
];
