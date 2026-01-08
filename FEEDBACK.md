# Feedback Tracker

## Status Legend
- `[ ]` Open
- `[~]` In Progress
- `[x]` Completed
- `[-]` Won't Do

**Priority:** High / Medium / Low

---

## Enhancements

### User Collections & Ownership
| Status | Feature | Details | Priority |
|--------|---------|---------|----------|
| `[ ]` | Saved prompts | Users can save/bookmark prompts to a personal collection - "my prompts get lost, no place to see them" | High |
| `[ ]` | Export prompts | Quickly extract/export all saved prompts (JSON, Markdown, etc.) | High |
| `[ ]` | Prompt versioning | Show version history for prompts, track changes over time | Medium |

### Integrations & Workflow
| Status | Feature | Details | Priority |
|--------|---------|---------|----------|
| `[ ]` | Tool integrations | Connect directly with Gemini, Glean, agents, etc. - "plug in where prompts are most valuable" | High |
| `[ ]` | Auto-paste to tool | Go from prompt → preferred tool with auto-paste functionality | High |
| `[ ]` | GitHub-based architecture | Consider building on GitHub for versioning, discussions, contributions out of the box | Medium |

### Discovery & Search
| Status | Feature | Details | Priority |
|--------|---------|---------|----------|
| `[ ]` | Natural language search | AI-powered: "NL interpret the kind of prompt I might need" | High |
| `[ ]` | Related prompts | Show prompts that are related to the one being viewed | Medium |
| `[ ]` | Fork a prompt | Allow users to fork/remix existing prompts | Medium |

### Content Structure
| Status | Feature | Details | Priority |
|--------|---------|---------|----------|
| `[ ]` | Prompt snippets | Smaller, modular pieces that "tune" existing prompts vs. big monolithic ones | High |
| `[ ]` | Multi-category tagging | Allow prompts to belong to multiple categories | Medium |
| `[ ]` | Input/output examples | Add concrete examples, link to threads where prompt was used successfully | Medium |

### Social & Community
| Status | Feature | Details | Priority |
|--------|---------|---------|----------|
| `[ ]` | Top Rated / Most Used | Show which prompts are most popular - 89% wanted this, 56% mentioned in reactions | **High** |
| `[ ]` | Prove usefulness | Social features that demonstrate prompt effectiveness (usage stats, success stories) | Medium |

---

## UX/UI Improvements

| Status | Area | Suggestion | Priority |
|--------|------|------------|----------|
| `[ ]` | Browsing | "Feels laborious to browse the list" - improve discovery/navigation | High |
| `[ ]` | Prompt taxonomy | Focus less on "role" and more on "purpose" of the prompt | Medium |
| `[ ]` | Difficulty level | Clarify what difficulty means and what decision it supports | Low |

---

## Bugs

| Status | Issue | Details | Priority |
|--------|-------|---------|----------|
| | | | |

---

## New Prompts / Content

_From survey "magic wand" question: tasks users wish they had prompts for_

| Status | Request | Category | Details |
|--------|---------|----------|---------|
| `[ ]` | Bug tracking/debugging | Engineering | "Tracking down the culprit to a bug" - needs codebase context (Copilot workspace) |
| `[ ]` | Research session scheduling | Productivity | Scheduling sessions + sending reminders/confirmations 24hrs before |
| `[ ]` | Daily priority scanner | Productivity | Scan work items, return highest priority items for each day in order |
| `[ ]` | Expense report submission | Productivity | Submitting expense reports in Concur |
| `[ ]` | DL/Slack channel updates | Productivity | Update email DLs and Slack channels with new hires |
| `[ ]` | PRD creation | Product | Full PRD generation workflow |
| `[ ]` | Competitive analysis | Product | Structured competitive research |
| `[ ]` | Work complexity estimation | Product | Estimate effort/complexity for work items |
| `[ ]` | Prioritization framework | Product | Help prioritize work/features |
| `[ ]` | Customer research + outreach | Sales/Product | Find customers interested in a topic with contact details |

---

## Performance

| Status | Issue | Details | Priority |
|--------|-------|---------|----------|
| | | | |

---

## Survey Results (n=9)

### Respondent Profile
| Role | Count |
|------|-------|
| Product | 3 |
| Design | 2 |
| Engineering | 1 |
| Other | 3 |

**AI Usage:** 78% daily, 22% a few times/week

### Prototype Reactions (multi-select)
| Reaction | % |
|----------|---|
| "I like the organization/structure" | **100%** |
| "Prefer to see most popular/rated prompts" | 56% |
| "Not clear how this is better than Gemini directly" | 44% |
| "Wanted to edit or submit my own versions" | 33% |
| "Doesn't map well to the kind of work I do" | 33% |
| "Discovered use cases I didn't realize AI could help with" | 11% |

### Most Wanted Features (multi-select)
| Feature | % |
|---------|---|
| Personal Repository (save/organize my prompts) | **89%** |
| Discovery (Top Rated / Most Used) | **89%** |
| Simplicity (just a Copy button, don't want to contribute) | 44% |

### Likelihood to Save Time (1-5 scale)
**Average: 3.7/5**
- Score 5: 3 people
- Score 4: 2 people
- Score 3: 3 people
- Score 2: 1 person

### Barriers to Regular Use
| Barrier | Count |
|---------|-------|
| "I prefer writing my own prompts from scratch" | 3 |
| "I'd forget it exists" | 2 |
| "Nothing — I would use it" | 2 |
| "Copy/pasting adds too much friction" | 1 |

---

## Notes

### Key Insights from Survey
1. **Structure works** - 100% liked the organization, but need social proof (ratings/popularity)
2. **Personal repo is critical** - 89% want to save their own prompts (validates earlier feedback)
3. **Value prop unclear** - 44% don't see advantage over using Gemini directly
4. **Passive users exist** - 44% just want copy button, don't want to contribute
5. **Retention risk** - "I'd forget it exists" is a real concern (need hooks/integrations)
6. **Friction matters** - copy/paste workflow is a barrier; reinforces need for direct tool integration

### Reference Projects
- [prompts.chat](https://prompts.chat) - Community prompt collection
- [awesome-llm-prompt-libraries](https://github.com/danielrosehill/awesome-llm-prompt-libraries) - Curated list of prompt resources

### Key Themes
1. **Ownership** - Users want to save, track, and export their prompts
2. **Integration** - Seamless connection to where prompts are actually used
3. **Discoverability** - Better ways to find the right prompt (NL search, related, less browsing friction)
4. **Modularity** - Smaller snippets vs. large prompts, composable pieces
5. **Social proof** - Evidence that prompts work, community validation

---

## Changelog

| Date | Change |
|------|--------|
| 2025-12-22 | Added survey results from 9 respondents with analysis |
| 2025-12-22 | Added initial user feedback (15+ items across enhancements and UX) |
| 2025-12-22 | Created feedback tracker |
