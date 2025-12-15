import { Prompt } from './types';

export const prompts: Prompt[] = [
  // Coding
  {
    id: 'code-review',
    title: 'Code Review Assistant',
    description: 'Get thorough code reviews with actionable feedback on best practices, performance, and security.',
    content: `Review the following code and provide detailed feedback on:

1. **Code Quality**: Readability, naming conventions, and structure
2. **Best Practices**: Design patterns and idiomatic usage
3. **Performance**: Potential bottlenecks or optimizations
4. **Security**: Vulnerabilities or security concerns
5. **Testing**: Suggestions for test cases

For each issue found, explain:
- What the problem is
- Why it matters
- How to fix it with a code example

Code to review:
\`\`\`
[paste code here]
\`\`\``,
    category: 'coding',
    tags: ['code-review', 'best-practices', 'debugging'],
  },
  {
    id: 'debug-helper',
    title: 'Debug Detective',
    description: 'Systematic debugging assistance to identify and fix issues in your code.',
    content: `I'm experiencing a bug and need help debugging. Here's the context:

**Expected behavior:**
[Describe what should happen]

**Actual behavior:**
[Describe what's happening instead]

**Error message (if any):**
\`\`\`
[paste error here]
\`\`\`

**Relevant code:**
\`\`\`
[paste code here]
\`\`\`

**What I've tried:**
- [List debugging steps taken]

Please help me:
1. Identify the root cause
2. Explain why this is happening
3. Provide a fix with explanation`,
    category: 'coding',
    tags: ['debugging', 'troubleshooting', 'errors'],
  },
  {
    id: 'refactor-code',
    title: 'Refactoring Guide',
    description: 'Transform messy code into clean, maintainable solutions.',
    content: `Refactor the following code to improve its quality. Focus on:

- **Readability**: Clear naming and structure
- **Maintainability**: Single responsibility, DRY principles
- **Modern patterns**: Use current best practices
- **Performance**: Optimize where beneficial

Current code:
\`\`\`
[paste code here]
\`\`\`

Please provide:
1. The refactored code
2. Explanation of each change made
3. Any trade-offs to consider`,
    category: 'coding',
    tags: ['refactoring', 'clean-code', 'best-practices'],
  },

  // Writing
  {
    id: 'blog-post',
    title: 'Blog Post Writer',
    description: 'Create engaging blog posts with proper structure and SEO optimization.',
    content: `Write a blog post about the following topic:

**Topic:** [Your topic here]
**Target audience:** [Who will read this]
**Tone:** [Professional/Casual/Technical/Friendly]
**Length:** [Word count or short/medium/long]

Requirements:
- Compelling headline and introduction
- Clear subheadings for easy scanning
- Actionable insights or takeaways
- Strong conclusion with call-to-action
- SEO-friendly structure

Additional context:
[Any specific points to cover or avoid]`,
    category: 'writing',
    tags: ['blog', 'content', 'seo'],
  },
  {
    id: 'email-composer',
    title: 'Professional Email Composer',
    description: 'Craft clear, professional emails for any business situation.',
    content: `Help me write a professional email with these details:

**Purpose:** [What you want to achieve]
**Recipient:** [Their role/relationship to you]
**Context:** [Background information]
**Key points to include:**
- [Point 1]
- [Point 2]
- [Point 3]

**Tone:** [Formal/Semi-formal/Friendly]
**Desired action:** [What should they do after reading]

Please provide:
1. Subject line options
2. Email body
3. Appropriate sign-off`,
    category: 'writing',
    tags: ['email', 'professional', 'communication'],
  },
  {
    id: 'documentation',
    title: 'Technical Documentation',
    description: 'Create clear technical documentation for code, APIs, or processes.',
    content: `Create technical documentation for:

**What to document:** [Feature/API/Process]
**Target reader:** [Developer/End-user/Both]
**Documentation type:** [README/API docs/Tutorial/Reference]

Include:
- Overview and purpose
- Prerequisites or requirements
- Step-by-step instructions
- Code examples where relevant
- Common issues and solutions
- Related resources

Source material:
\`\`\`
[paste code or details here]
\`\`\``,
    category: 'writing',
    tags: ['documentation', 'technical', 'developer'],
  },

  // Analysis
  {
    id: 'data-analysis',
    title: 'Data Analysis Framework',
    description: 'Structured approach to analyzing datasets and extracting insights.',
    content: `Analyze the following data and provide insights:

**Data description:**
[What the data represents]

**Data sample:**
\`\`\`
[paste data here]
\`\`\`

**Analysis goals:**
- [What questions to answer]
- [What patterns to look for]

Please provide:
1. **Summary statistics**: Key metrics and distributions
2. **Patterns & trends**: Notable observations
3. **Anomalies**: Outliers or unexpected findings
4. **Insights**: Actionable conclusions
5. **Recommendations**: Next steps or further analysis`,
    category: 'analysis',
    tags: ['data', 'analytics', 'insights'],
  },
  {
    id: 'research-summary',
    title: 'Research Summarizer',
    description: 'Condense research papers or articles into actionable summaries.',
    content: `Summarize the following research/article:

**Source:**
[paste text or key excerpts]

Please provide:

1. **Key Findings** (3-5 bullet points)
   - Main discoveries or conclusions

2. **Methodology**
   - How the research was conducted

3. **Implications**
   - Why this matters and who it affects

4. **Limitations**
   - Caveats or constraints

5. **Action Items**
   - How to apply these findings`,
    category: 'analysis',
    tags: ['research', 'summary', 'academic'],
  },

  // Creative
  {
    id: 'brainstorm',
    title: 'Idea Generator',
    description: 'Generate creative ideas and solutions through structured brainstorming.',
    content: `Help me brainstorm ideas for:

**Challenge/Goal:** [What you're trying to solve or create]
**Context:** [Relevant background]
**Constraints:** [Budget, time, resources, requirements]
**Target audience:** [Who is this for]

Please generate:
1. **10 conventional ideas** - Proven approaches
2. **5 innovative ideas** - Creative twists
3. **3 wild ideas** - Outside-the-box thinking

For each idea, briefly explain:
- The core concept
- Why it could work
- Potential challenges`,
    category: 'creative',
    tags: ['brainstorming', 'ideas', 'innovation'],
  },
  {
    id: 'story-starter',
    title: 'Story Starter',
    description: 'Get creative story prompts and narrative frameworks to spark your writing.',
    content: `Create a story concept based on these parameters:

**Genre:** [Fantasy/Sci-Fi/Mystery/Romance/etc.]
**Setting:** [Time period and location]
**Theme:** [Central message or idea]
**Tone:** [Dark/Light/Humorous/Serious]

Please provide:
1. **Hook** - Opening line or scene
2. **Main character** - Brief profile with motivation
3. **Conflict** - Central tension or problem
4. **Plot outline** - 5 key story beats
5. **Twist idea** - Unexpected element to consider`,
    category: 'creative',
    tags: ['storytelling', 'writing', 'fiction'],
  },

  // Business
  {
    id: 'meeting-notes',
    title: 'Meeting Notes Organizer',
    description: 'Transform raw meeting notes into structured, actionable summaries.',
    content: `Organize these meeting notes into a clear summary:

**Meeting type:** [Team sync/Client call/Planning/etc.]
**Attendees:** [List of participants]
**Date:** [When it occurred]

**Raw notes:**
[paste notes here]

Please structure as:
1. **Meeting Purpose**
2. **Key Discussion Points**
3. **Decisions Made**
4. **Action Items**
   - [ ] Task | Owner | Due date
5. **Open Questions**
6. **Next Steps**`,
    category: 'business',
    tags: ['meetings', 'notes', 'organization'],
  },
  {
    id: 'proposal-writer',
    title: 'Business Proposal Writer',
    description: 'Create compelling business proposals that win clients and stakeholders.',
    content: `Help me write a business proposal:

**Proposal type:** [Project/Service/Partnership]
**Client/Audience:** [Who will receive this]
**Problem to solve:** [What challenge does this address]
**Proposed solution:** [Your offering]
**Budget range:** [If applicable]
**Timeline:** [Expected duration]

Please include:
1. **Executive Summary**
2. **Problem Statement**
3. **Proposed Solution**
4. **Deliverables & Timeline**
5. **Investment/Pricing**
6. **Why Us/Qualifications**
7. **Next Steps**`,
    category: 'business',
    tags: ['proposal', 'sales', 'client'],
  },

  // Education
  {
    id: 'explain-concept',
    title: 'Concept Explainer',
    description: 'Break down complex topics into easy-to-understand explanations.',
    content: `Explain the following concept:

**Topic:** [Concept to explain]
**My current understanding:** [What I already know]
**Learning goal:** [What I want to understand]
**Preferred style:** [ELI5/Technical/Visual/Analogy-based]

Please provide:
1. **Simple explanation** (2-3 sentences)
2. **Detailed breakdown** with key components
3. **Real-world analogy**
4. **Common misconceptions**
5. **Practice question** to test understanding`,
    category: 'education',
    tags: ['learning', 'explanation', 'concepts'],
  },
  {
    id: 'quiz-generator',
    title: 'Quiz Generator',
    description: 'Create quizzes and practice questions for any topic.',
    content: `Generate a quiz on the following topic:

**Subject:** [Topic or material to test]
**Difficulty:** [Beginner/Intermediate/Advanced]
**Number of questions:** [How many]
**Question types:** [Multiple choice/True-false/Short answer/Mixed]

Source material (optional):
[paste content to base questions on]

Please create questions that test:
- Recall of key facts
- Understanding of concepts
- Application of knowledge
- Analysis and critical thinking

Include an answer key with explanations.`,
    category: 'education',
    tags: ['quiz', 'testing', 'learning'],
  },
];
