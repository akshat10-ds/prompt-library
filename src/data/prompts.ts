import { Prompt } from './types';

export const prompts: Prompt[] = [
  // Marketing Prompts
  {
    id: 'marketing-campaign-brief',
    title: 'Campaign Brief Generator',
    description: 'Create comprehensive marketing campaign briefs with clear objectives and messaging.',
    tools: ['claude', 'chatgpt', 'gemini'],
    outputType: 'documentation',
    difficulty: 'intermediate',
    content: `Create a marketing campaign brief for the following:

**Campaign Name:** [Campaign name]
**Product/Service:** [What you're promoting]
**Target Audience:** [Primary and secondary audiences]
**Campaign Objective:** [Awareness/Leads/Conversions/Retention]
**Budget Range:** [Budget if known]
**Timeline:** [Campaign duration]

Please generate a brief that includes:

1. **Executive Summary**
   - Campaign overview in 2-3 sentences

2. **Objectives & KPIs**
   - Primary goal with measurable targets
   - Secondary objectives
   - Key metrics to track

3. **Target Audience Profile**
   - Demographics and psychographics
   - Pain points and motivations
   - Where they consume content

4. **Key Messages**
   - Primary value proposition
   - Supporting messages (3-5)
   - Tone and voice guidelines

5. **Channel Strategy**
   - Recommended channels with rationale
   - Content types per channel
   - Posting/publishing cadence

6. **Creative Direction**
   - Visual style recommendations
   - Copy guidelines
   - Asset requirements

7. **Timeline & Milestones**
   - Key dates and deliverables
   - Review checkpoints`,
    category: 'marketing',
    tags: ['campaign', 'strategy', 'planning', 'brief'],
    author: 'Sarah Chen',
    createdAt: '2024-11-15',
  },
  {
    id: 'marketing-social-content',
    title: 'Social Media Content Creator',
    description: 'Generate engaging social media posts optimized for each platform.',
    tools: ['claude', 'chatgpt'],
    outputType: 'other',
    difficulty: 'beginner',
    content: `Create social media content for the following:

**Topic/Announcement:** [What you want to communicate]
**Brand Voice:** [Professional/Casual/Playful/Authoritative]
**Target Platform(s):** [LinkedIn/Twitter/Instagram/Facebook]
**Goal:** [Engagement/Traffic/Awareness/Leads]
**Include:** [Hashtags/CTA/Emoji usage preferences]

Please generate:

**LinkedIn Post:**
- Professional tone, 150-300 words
- Hook in first line
- Clear value proposition
- Relevant hashtags (3-5)
- Call-to-action

**Twitter/X Thread:**
- 3-5 tweet thread
- Each tweet under 280 characters
- Engaging hook for first tweet
- Thread flow and conclusion

**Instagram Caption:**
- Engaging opening line
- Story-driven middle
- Clear CTA
- Hashtag strategy (mix of popular and niche)

**Content Calendar Suggestion:**
- Best posting times per platform
- Repurposing opportunities`,
    category: 'marketing',
    tags: ['social-media', 'content', 'copywriting', 'engagement'],
    author: 'Marcus Johnson',
    createdAt: '2024-11-20',
  },
  {
    id: 'marketing-email-sequence',
    title: 'Email Nurture Sequence',
    description: 'Design automated email sequences that convert leads into customers.',
    tools: ['claude', 'chatgpt', 'gemini'],
    outputType: 'email',
    difficulty: 'intermediate',
    content: `Design an email nurture sequence for:

**Sequence Goal:** [Welcome/Onboarding/Re-engagement/Sales]
**Target Audience:** [Who receives these emails]
**Trigger:** [What initiates this sequence]
**Product/Service:** [What you're ultimately promoting]
**Sequence Length:** [Number of emails, e.g., 5-7]

For each email in the sequence, provide:

**Email [#]: [Email Name]**

- **Subject Line Options** (3 variations, A/B test ready)
- **Preview Text**
- **Timing:** Days after trigger/previous email
- **Goal:** What this email should achieve
- **Body Copy:**
  - Opening hook
  - Main content
  - Social proof element (if applicable)
  - Call-to-action
- **Design Notes:** Layout and visual recommendations

Also include:
- Sequence flow diagram
- Key metrics to track per email
- Segmentation recommendations
- Exit criteria`,
    category: 'marketing',
    tags: ['email', 'automation', 'nurture', 'conversion'],
    createdAt: '2024-10-05',
  },
  {
    id: 'marketing-competitor-analysis',
    title: 'Competitor Analysis Framework',
    description: 'Analyze competitors to identify opportunities and differentiation strategies.',
    tools: ['claude', 'chatgpt'],
    outputType: 'analysis',
    difficulty: 'advanced',
    content: `Conduct a competitor analysis for:

**Your Company/Product:** [Your offering]
**Competitors to Analyze:** [List 3-5 competitors]
**Industry/Market:** [Your market segment]
**Focus Areas:** [Messaging/Pricing/Features/Content/etc.]

Please provide analysis on:

1. **Competitor Overview**
   - Company positioning and mission
   - Target audience
   - Key products/services

2. **Messaging Analysis**
   - Value propositions
   - Key differentiators they claim
   - Tone and voice
   - Common themes and keywords

3. **Content Strategy**
   - Content types and formats
   - Publishing frequency
   - Top-performing content themes
   - SEO focus areas

4. **Social Media Presence**
   - Platform focus
   - Engagement rates
   - Content strategy per platform

5. **Strengths & Weaknesses**
   - What they do well
   - Gaps and opportunities
   - Customer sentiment (if available)

6. **Differentiation Opportunities**
   - Underserved audience segments
   - Messaging gaps to exploit
   - Content opportunities
   - Positioning recommendations`,
    category: 'marketing',
    tags: ['competitor', 'analysis', 'strategy', 'research'],
    createdAt: '2024-09-12',
  },

  // Sales Prompts
  {
    id: 'sales-cold-outreach',
    title: 'Cold Outreach Email Generator',
    description: 'Craft personalized cold emails that get responses and book meetings.',
    tools: ['claude', 'chatgpt', 'gemini'],
    outputType: 'email',
    difficulty: 'beginner',
    content: `Create a cold outreach email for:

**Prospect Info:**
- Name: [Prospect name]
- Title: [Their role]
- Company: [Their company]
- Industry: [Their industry]

**Your Offering:**
- Product/Service: [What you're selling]
- Key Benefit: [Main value proposition]
- Target Pain Point: [Problem you solve]

**Personalization Hooks:**
- Recent company news: [If known]
- Shared connections: [If any]
- Their content/posts: [If applicable]

Please generate:

**Email Version 1: Pain Point Focus**
- Subject line (under 50 characters)
- Opening with personalized hook
- Pain point agitation
- Solution teaser
- Soft CTA (question, not meeting request)

**Email Version 2: Value-First**
- Subject line variation
- Lead with insight or value
- Brief credibility builder
- Clear next step

**Email Version 3: Social Proof**
- Subject line with curiosity gap
- Relevant case study mention
- Results-focused language
- Low-friction CTA

**Follow-up Sequence:**
- Follow-up #1 (3 days): Bump with new angle
- Follow-up #2 (7 days): Value-add content
- Follow-up #3 (14 days): Breakup email`,
    category: 'sales',
    tags: ['outreach', 'email', 'prospecting', 'cold-email'],
    author: 'Alex Rivera',
    createdAt: '2024-12-01',
  },
  {
    id: 'sales-discovery-questions',
    title: 'Discovery Call Question Bank',
    description: 'Prepare effective discovery questions to understand prospect needs.',
    tools: ['claude', 'chatgpt', 'gemini'],
    outputType: 'checklist',
    difficulty: 'beginner',
    content: `Generate discovery questions for:

**Product/Service:** [What you're selling]
**Target Buyer Persona:** [Role and responsibilities]
**Industry:** [Prospect's industry]
**Common Pain Points:** [Problems you solve]
**Sales Stage:** [Initial discovery/Deep dive/Technical]

Please provide questions organized by:

**1. Rapport & Context (2-3 questions)**
- Open-ended conversation starters
- Understanding their role and priorities

**2. Current State (4-5 questions)**
- How they handle [process] today
- Tools and workflows currently used
- Team structure and stakeholders

**3. Pain Points & Challenges (4-5 questions)**
- Biggest obstacles they face
- Impact of these challenges
- Failed solutions they've tried

**4. Goals & Desired Outcomes (3-4 questions)**
- What success looks like
- Timeline for achieving goals
- Metrics they care about

**5. Decision Process (3-4 questions)**
- Who else is involved
- Budget considerations
- Evaluation criteria
- Timeline for decision

**6. Closing & Next Steps (2-3 questions)**
- Confirming understanding
- Gauging interest level
- Proposing next steps

**Bonus:** Red flag questions to identify poor-fit prospects`,
    category: 'sales',
    tags: ['discovery', 'questions', 'qualification', 'calls'],
    createdAt: '2024-11-28',
  },
  {
    id: 'sales-proposal-template',
    title: 'Sales Proposal Builder',
    description: 'Create compelling proposals that address client needs and close deals.',
    tools: ['claude', 'chatgpt'],
    outputType: 'documentation',
    difficulty: 'intermediate',
    content: `Create a sales proposal for:

**Client:** [Company name]
**Contact:** [Primary contact and title]
**Opportunity:** [What they're looking to solve]
**Solution:** [What you're proposing]
**Deal Size:** [Approximate value]
**Competition:** [Known competitors in deal]

Generate a proposal with:

**1. Executive Summary**
- Their challenge in their words
- Your solution overview
- Key outcomes they'll achieve
- Why now

**2. Understanding of Needs**
- Recap of discovery findings
- Confirmed pain points
- Success criteria they defined

**3. Proposed Solution**
- Solution components
- How each addresses their needs
- Implementation approach
- Timeline overview

**4. Expected Outcomes**
- Quantified benefits
- ROI projections
- Time to value
- Risk mitigation

**5. Investment**
- Pricing options (if applicable)
- What's included
- Payment terms
- Guarantees

**6. Why [Your Company]**
- Relevant experience
- Case study highlights
- Differentiators
- Team and support

**7. Next Steps**
- Clear action items
- Decision timeline
- Contact information`,
    category: 'sales',
    tags: ['proposal', 'closing', 'deals', 'presentation'],
    createdAt: '2024-10-22',
  },
  {
    id: 'sales-objection-handling',
    title: 'Objection Response Library',
    description: 'Prepare responses to common sales objections with proven frameworks.',
    tools: ['claude', 'chatgpt', 'gemini'],
    outputType: 'other',
    difficulty: 'intermediate',
    content: `Create objection handling responses for:

**Product/Service:** [What you're selling]
**Price Point:** [General pricing level]
**Main Competitors:** [Who you compete against]
**Target Buyer:** [Role and industry]

Generate responses for these common objections:

**Pricing Objections:**
1. "It's too expensive"
2. "We don't have the budget"
3. "[Competitor] is cheaper"
4. "I need to get approval for this amount"

**Timing Objections:**
5. "Now isn't a good time"
6. "Let's revisit next quarter"
7. "We're in the middle of another project"

**Authority Objections:**
8. "I need to run this by my team"
9. "My boss would never approve this"
10. "We have a committee that decides"

**Need Objections:**
11. "We're happy with our current solution"
12. "I don't see how this helps us"
13. "This isn't a priority right now"

**Trust Objections:**
14. "I've never heard of your company"
15. "Do you have experience in our industry?"
16. "What if it doesn't work?"

For each objection, provide:
- Acknowledge: Validate their concern
- Ask: Clarifying question to dig deeper
- Address: Reframe or provide evidence
- Advance: Move conversation forward`,
    category: 'sales',
    tags: ['objections', 'negotiation', 'closing', 'responses'],
    createdAt: '2024-08-30',
  },

  // Product Design Prompts
  {
    id: 'design-user-research-plan',
    title: 'User Research Plan',
    description: 'Plan comprehensive user research studies to uncover insights.',
    tools: ['claude', 'chatgpt'],
    outputType: 'documentation',
    difficulty: 'intermediate',
    content: `Create a user research plan for:

**Project/Feature:** [What you're researching]
**Research Goal:** [What you want to learn]
**Target Users:** [Who you need to talk to]
**Timeline:** [Research timeline]
**Resources:** [Team, budget, tools]

Please generate:

**1. Research Objectives**
- Primary research questions (3-5)
- Secondary questions
- Hypotheses to validate

**2. Methodology Selection**
- Recommended methods with rationale:
  - User interviews
  - Usability testing
  - Surveys
  - Diary studies
  - Card sorting
  - A/B testing
- Sample size recommendations

**3. Participant Criteria**
- Screening questions
- Must-have characteristics
- Nice-to-have characteristics
- Exclusion criteria
- Recruitment strategy

**4. Discussion Guide / Test Script**
- Introduction and consent
- Warm-up questions
- Core questions by theme
- Tasks (if usability testing)
- Wrap-up and debrief

**5. Research Timeline**
- Preparation phase
- Recruitment
- Conducting research
- Analysis
- Reporting

**6. Deliverables**
- Research report structure
- Key artifacts (personas, journey maps, etc.)
- Stakeholder presentation outline`,
    category: 'product-design',
    tags: ['research', 'user-research', 'planning', 'methodology'],
    author: 'Emma Liu',
    createdAt: '2024-11-05',
  },
  {
    id: 'design-ux-audit',
    title: 'UX Audit Framework',
    description: 'Conduct thorough UX audits to identify usability issues and opportunities.',
    tools: ['claude', 'chatgpt'],
    outputType: 'checklist',
    difficulty: 'advanced',
    content: `Conduct a UX audit for:

**Product/Feature:** [What you're auditing]
**Key User Flows:** [Critical paths to analyze]
**Business Goals:** [What success looks like]
**Known Issues:** [Any reported problems]

Please evaluate against:

**1. Usability Heuristics**
- Visibility of system status
- Match between system and real world
- User control and freedom
- Consistency and standards
- Error prevention
- Recognition rather than recall
- Flexibility and efficiency
- Aesthetic and minimalist design
- Error recovery
- Help and documentation

**2. Accessibility (WCAG)**
- Color contrast
- Keyboard navigation
- Screen reader compatibility
- Alt text and labels
- Focus indicators
- Touch targets

**3. User Flow Analysis**
- Task completion paths
- Number of steps/clicks
- Friction points
- Drop-off risks
- Error states

**4. Visual Design**
- Hierarchy and scannability
- Consistency of patterns
- White space usage
- Typography legibility
- Responsive behavior

**5. Content & Copy**
- Clarity of messaging
- Action-oriented labels
- Error message helpfulness
- Microcopy effectiveness

**Output Format:**
- Severity ratings (Critical/High/Medium/Low)
- Screenshots with annotations
- Recommended fixes
- Quick wins vs. long-term improvements`,
    category: 'product-design',
    tags: ['ux-audit', 'usability', 'heuristics', 'accessibility'],
    createdAt: '2024-09-25',
  },
  {
    id: 'design-design-system',
    title: 'Design System Documentation',
    description: 'Document design system components with clear usage guidelines.',
    tools: ['claude', 'chatgpt'],
    outputType: 'documentation',
    difficulty: 'intermediate',
    content: `Document a design system component:

**Component Name:** [e.g., Button, Modal, Card]
**Component Type:** [Atom/Molecule/Organism]
**Platform:** [Web/iOS/Android/All]

Please create documentation including:

**1. Overview**
- Component description
- When to use
- When not to use
- Related components

**2. Anatomy**
- Visual breakdown of parts
- Required vs. optional elements
- Slot/content areas

**3. Variants**
- Primary/Secondary/Tertiary
- Size options (SM/MD/LG)
- State variations
- Use cases for each

**4. States**
- Default
- Hover
- Active/Pressed
- Focus
- Disabled
- Loading
- Error

**5. Behavior**
- Interactions
- Animations/transitions
- Responsive behavior
- Keyboard navigation

**6. Content Guidelines**
- Character limits
- Tone recommendations
- Do's and Don'ts
- Localization considerations

**7. Accessibility**
- ARIA attributes
- Keyboard support
- Screen reader behavior
- Color contrast requirements

**8. Code Examples**
- Basic implementation
- With props/variants
- Composition patterns
- Common pitfalls`,
    category: 'product-design',
    tags: ['design-system', 'documentation', 'components', 'patterns'],
    createdAt: '2024-10-15',
  },
  {
    id: 'design-feature-spec',
    title: 'Feature Specification Writer',
    description: 'Write detailed feature specifications for design and development handoff.',
    tools: ['claude', 'chatgpt', 'gemini'],
    outputType: 'documentation',
    difficulty: 'advanced',
    content: `Write a feature specification for:

**Feature Name:** [Feature title]
**Problem Statement:** [What problem this solves]
**Target Users:** [Who benefits]
**Success Metrics:** [How we measure success]

Please create a spec including:

**1. Overview**
- Feature summary
- Goals and non-goals
- User stories
- Acceptance criteria

**2. User Flow**
- Entry points
- Step-by-step flow
- Decision points
- Exit points
- Edge cases

**3. Functional Requirements**
- Core functionality
- Input requirements
- Output/results
- Validation rules
- Error handling

**4. UI Requirements**
- Screen/component list
- Layout requirements
- Interactive elements
- Empty states
- Loading states
- Error states
- Success states

**5. Content Requirements**
- Copy needs
- Dynamic content
- Personalization
- Localization needs

**6. Technical Considerations**
- API requirements
- Data model implications
- Performance requirements
- Security considerations

**7. Dependencies**
- Blocked by
- Blocks
- Related features

**8. Open Questions**
- Decisions needed
- Risks and mitigations`,
    category: 'product-design',
    tags: ['specification', 'requirements', 'documentation', 'handoff'],
    createdAt: '2024-11-10',
  },

  // Engineering Prompts
  {
    id: 'engineering-code-review',
    title: 'Code Review Assistant',
    description: 'Get thorough code reviews with actionable feedback on best practices.',
    tools: ['claude'],
    outputType: 'analysis',
    difficulty: 'advanced',
    content: `Review the following code and provide detailed feedback on:

**Language/Framework:** [e.g., TypeScript/React]
**Context:** [What this code does]
**Focus Areas:** [Performance/Security/Readability/All]

\`\`\`
[paste code here]
\`\`\`

Please evaluate:

**1. Code Quality**
- Readability and naming conventions
- Code organization and structure
- DRY principles
- Single responsibility
- Comments and documentation

**2. Best Practices**
- Language/framework idioms
- Design patterns usage
- Error handling
- Edge cases covered

**3. Performance**
- Algorithmic complexity
- Memory usage
- Unnecessary re-renders (if applicable)
- Optimization opportunities

**4. Security**
- Input validation
- SQL injection risks
- XSS vulnerabilities
- Authentication/authorization
- Sensitive data handling

**5. Testing**
- Testability of code
- Suggested test cases
- Edge cases to cover

**6. Maintainability**
- Extensibility
- Coupling and cohesion
- Technical debt risks

For each issue found:
- **Severity:** Critical/Major/Minor/Suggestion
- **Location:** Line number or section
- **Problem:** What's wrong
- **Solution:** How to fix with code example`,
    category: 'engineering',
    tags: ['code-review', 'best-practices', 'quality', 'feedback'],
    author: 'David Park',
    createdAt: '2024-12-05',
  },
  {
    id: 'engineering-technical-design',
    title: 'Technical Design Document',
    description: 'Create comprehensive technical design documents for new features.',
    tools: ['claude'],
    outputType: 'documentation',
    difficulty: 'advanced',
    content: `Create a technical design document for:

**Feature/System:** [What you're building]
**Problem:** [What problem it solves]
**Scope:** [In scope / out of scope]
**Team:** [Who's involved]

Please generate:

**1. Overview**
- Background and motivation
- Goals and success metrics
- Non-goals

**2. Current State**
- Existing architecture
- Pain points
- Limitations

**3. Proposed Solution**
- High-level approach
- Architecture diagram description
- Key components

**4. Detailed Design**
- Data models
- API contracts
- Sequence diagrams (text description)
- State management
- Key algorithms

**5. Technical Considerations**
- Scalability
- Performance requirements
- Security implications
- Monitoring and observability

**6. Dependencies**
- External services
- Team dependencies
- Infrastructure needs

**7. Rollout Plan**
- Phases
- Feature flags
- Migration strategy (if applicable)
- Rollback plan

**8. Risks & Mitigations**
- Technical risks
- Dependencies risks
- Mitigation strategies

**9. Open Questions**
- Decisions needed
- Areas needing more research

**10. Timeline**
- Milestones
- Estimated effort`,
    category: 'engineering',
    tags: ['design-doc', 'architecture', 'planning', 'documentation'],
    createdAt: '2024-11-25',
  },
  {
    id: 'engineering-debugging',
    title: 'Debug Detective',
    description: 'Systematic debugging assistance to identify and fix issues.',
    tools: ['claude', 'chatgpt'],
    outputType: 'code',
    difficulty: 'advanced',
    content: `Help debug this issue:

**Environment:**
- Language/Framework: [e.g., Node.js/Express]
- Version: [Relevant versions]
- Environment: [Dev/Staging/Production]

**The Problem:**
- Expected behavior: [What should happen]
- Actual behavior: [What's happening instead]
- Reproducibility: [Always/Sometimes/Rare]

**Error Information:**
\`\`\`
[paste error message/stack trace here]
\`\`\`

**Relevant Code:**
\`\`\`
[paste code here]
\`\`\`

**What I've Tried:**
- [Debugging steps taken]

Please help me:

1. **Analyze the Error**
   - Parse the error message
   - Identify the root cause
   - Explain why this is happening

2. **Debugging Strategy**
   - Key areas to investigate
   - Logging to add
   - Breakpoint suggestions

3. **Potential Solutions**
   - Most likely fix
   - Alternative approaches
   - Code examples

4. **Prevention**
   - How to prevent this in the future
   - Tests to add
   - Monitoring suggestions`,
    category: 'engineering',
    tags: ['debugging', 'troubleshooting', 'errors', 'problem-solving'],
    createdAt: '2024-10-30',
  },
  {
    id: 'engineering-api-design',
    title: 'API Design Guide',
    description: 'Design RESTful APIs with clear contracts and best practices.',
    tools: ['claude', 'chatgpt'],
    outputType: 'code',
    difficulty: 'intermediate',
    content: `Design an API for:

**Resource/Feature:** [What the API manages]
**Consumers:** [Who will use this API]
**Requirements:** [Key functionality needed]

Please design:

**1. Resource Design**
- Resource naming
- URL structure
- Relationships

**2. Endpoints**

For each endpoint:
\`\`\`
[METHOD] /path
Description: What it does
Request:
  Headers: Required headers
  Query Params: Optional filters
  Body: Request schema
Response:
  Success (200/201): Response schema
  Errors: Possible error responses
\`\`\`

**3. Data Models**
- Request/Response schemas
- Field types and validation
- Required vs optional fields

**4. Authentication & Authorization**
- Auth method recommendation
- Permission model
- Scope requirements

**5. Error Handling**
- Error response format
- Common error codes
- Error messages

**6. Pagination & Filtering**
- Pagination strategy
- Filter parameters
- Sorting options

**7. Versioning**
- Versioning strategy
- Breaking change policy

**8. Rate Limiting**
- Rate limit recommendations
- Headers to include

**9. Documentation**
- OpenAPI/Swagger structure
- Example requests/responses`,
    category: 'engineering',
    tags: ['api-design', 'rest', 'architecture', 'documentation'],
    createdAt: '2024-09-18',
  },

  // Productivity Prompts
  {
    id: 'productivity-meeting-notes',
    title: 'Meeting Notes Summarizer',
    description: 'Transform raw meeting notes into structured action items and summaries.',
    tools: ['claude', 'chatgpt', 'gemini'],
    outputType: 'report',
    difficulty: 'beginner',
    content: `Summarize the following meeting notes:

**Meeting Notes:**
[Paste your raw meeting notes here]

**Meeting Context:**
- Meeting Type: [Team sync/Planning/Review/1:1/etc.]
- Attendees: [List of participants]
- Date: [Meeting date]

Please provide:

**1. Executive Summary**
- 2-3 sentence overview of what was discussed
- Key decisions made

**2. Action Items**
For each action item:
- [ ] Task description
- Owner: [Person responsible]
- Due date: [If mentioned]
- Priority: [High/Medium/Low]

**3. Key Discussion Points**
- Main topics covered
- Different viewpoints raised
- Unresolved questions

**4. Decisions Made**
- What was agreed upon
- Any changes to previous plans

**5. Next Steps**
- Follow-up meetings needed
- Items to prepare before next meeting
- Parking lot items for future discussion`,
    category: 'productivity',
    tags: ['meetings', 'notes', 'action-items', 'summary'],
    author: 'Lisa Park',
    createdAt: '2024-12-10',
  },
  {
    id: 'productivity-weekly-review',
    title: 'Weekly Review Generator',
    description: 'Create comprehensive weekly progress reports and plan upcoming priorities.',
    tools: ['claude', 'chatgpt'],
    outputType: 'report',
    difficulty: 'beginner',
    content: `Help me create a weekly review and plan:

**This Week's Activities:**
[List what you worked on this week]

**Completed Tasks:**
[List completed items]

**Blockers Encountered:**
[Any obstacles or challenges]

**Role/Team:** [Your role and team]

Please generate:

**1. Week in Review**
- Summary of accomplishments
- Impact delivered
- Challenges overcome

**2. Progress on Goals**
- Status of key objectives
- Metrics/numbers if applicable
- What moved forward

**3. Learnings & Insights**
- What went well
- What could improve
- Key takeaways

**4. Next Week's Priorities**
- Top 3 focus areas
- Key deliverables
- Important meetings/deadlines

**5. Support Needed**
- Blockers to escalate
- Resources required
- Decisions needed from others

**6. Wins to Celebrate**
- Personal accomplishments
- Team successes
- Recognition deserved`,
    category: 'productivity',
    tags: ['weekly-review', 'planning', 'progress', 'reporting'],
    createdAt: '2024-11-18',
  },
  {
    id: 'productivity-email-drafting',
    title: 'Professional Email Drafter',
    description: 'Compose clear, professional emails for various business situations.',
    tools: ['claude', 'chatgpt', 'gemini'],
    outputType: 'email',
    difficulty: 'beginner',
    content: `Draft a professional email for:

**Email Type:** [Request/Follow-up/Update/Announcement/Apology/Thank you]
**Recipient:** [Name and role/relationship]
**Subject/Topic:** [What the email is about]
**Key Points to Cover:** [Main message points]
**Desired Outcome:** [What action you want them to take]
**Tone:** [Formal/Friendly/Urgent/Apologetic]

Please provide:

**3 Subject Line Options:**
- Option A: [Direct approach]
- Option B: [Curiosity-driven]
- Option C: [Action-oriented]

**Email Draft:**
- Professional greeting
- Opening that establishes context
- Body with key points (clear and scannable)
- Specific ask or call-to-action
- Professional closing

**Shorter Alternative:**
- Condensed version for busy recipients

**Tips:**
- Best time to send
- Follow-up timing if no response`,
    category: 'productivity',
    tags: ['email', 'communication', 'writing', 'professional'],
    createdAt: '2024-10-08',
  },
  {
    id: 'productivity-task-breakdown',
    title: 'Project Task Breakdown',
    description: 'Break down complex projects into manageable, actionable tasks.',
    tools: ['claude', 'chatgpt'],
    outputType: 'checklist',
    difficulty: 'intermediate',
    content: `Break down this project into tasks:

**Project Name:** [Project title]
**Project Goal:** [What you're trying to achieve]
**Deadline:** [When it needs to be done]
**Team Size:** [Working alone or team size]
**Current Status:** [Not started/In progress/Blocked]

Please provide:

**1. Project Overview**
- Scope summary
- Success criteria
- Key constraints

**2. Major Milestones**
For each milestone:
- Milestone name
- Target date
- Deliverables

**3. Task Breakdown**
For each task:
- [ ] Task name
- Estimated time
- Dependencies
- Priority level
- Skills/resources needed

**4. Quick Wins**
- Tasks that can be done immediately
- Low-effort, high-impact items

**5. Risk Assessment**
- Potential blockers
- Mitigation strategies

**6. Suggested Timeline**
- Week-by-week or day-by-day breakdown
- Buffer time recommendations

**7. Definition of Done**
- How to know each task is complete
- Quality checklist`,
    category: 'productivity',
    tags: ['project-management', 'planning', 'tasks', 'breakdown'],
    author: 'Michael Torres',
    createdAt: '2024-11-02',
  },
];
