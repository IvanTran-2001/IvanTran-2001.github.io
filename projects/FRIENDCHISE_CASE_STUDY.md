# FriendChise — Complete Project Specification

> This project is in active development. What's documented here is the design and planning process — from identifying the problem and defining user personas, to making architectural tradeoffs and wireframing the UI. I'm sharing this to show how I approach building software, not just the finished code.

---

## 1. Project Overview

**Name:** FriendChise

**One-liner:** A task management and knowledge-sharing platform for franchise businesses that auto-optimizes task rotations for workers and connects franchisees to community-driven best practices — built to create consistency and prevent costly mistakes from day one.

**Problem:** Small-to-medium franchise operations (food chains, cleaning services, retail) rely on group chats, spreadsheets, and verbal instructions to manage recurring tasks across branches. There's no single system where an owner can define what needs to happen, a manager can schedule who does it, and a worker can see their daily checklist — all with proper access control so each branch only sees its own data.

**Solution:** A web app where franchise owners define task libraries and timetable templates at the franchise level, managers apply those templates to generate weekly schedules for their branch, and workers check off tasks from a daily view. Everything is scoped by organization with role-based permissions.

**Status:** Work in progress. Service layer, REST API, task management, member management, auth, and timetable view fully implemented. Timetable template system, schedule generation, and completion stats not yet started.

**Repo:** https://github.com/IvanTran-2001/management-app

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Package Manager | pnpm |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | Auth.js v5 (NextAuth) — Google OAuth, JWT sessions |
| Frontend Styling | Tailwind CSS v4 + shadcn/ui |
| Validation | Zod |
| Runtime | Node.js |

---

## 3. The Problem

Franchise businesses — especially food franchises like donut shops — struggle with **consistency, knowledge sharing, and task execution** across locations.

### How things are done now:
- Task planning and execution is often managed through **paper checklists**, generic scheduling/reminder apps, group chats, or "just remember it"
- Recipes shared as **unorganized paper stacks** — imagine flipping through 50+ recipes mid-rush with no search, no organization, and no way to share improvements
- Knowledge shared through **group chats, word of mouth, or not at all**
- Training depends entirely on **whoever happens to be available** — and not everyone is a good teacher
- Some franchisees have found **faster, better ways** to make recipes — but there's no system to share that knowledge with others
- Doing tasks differently is not always a bad thing — it **is** a bad thing if it has a legal issue, is very ineffective, or lowers the quality of goods

### What goes wrong:

| Problem | Impact |
|---|---|
| Uneven task distribution | Some workers are overloaded, others never learn key tasks — leads to burnout and breakdowns during 12-hour shifts |
| Poor/no training | Workers feel clueless even after months, managers blame workers when the real issue is lack of structure. People aren't all good teachers, and the franchisee may just be an investor with no operational knowledge |
| Knowledge stays trapped | Better methods exist at other locations but no one ever finds out. One person knows the "right way" but never shares it |
| Recipes are inconsistent | Different locations make things differently — quality varies, customers notice |
| New franchisees make avoidable mistakes | Bad habits form from day one, early sales without asking anyone, creating recipes wrong from the start can ruin reputation and cause confusion |
| Customer complaints mishandled | Workers don't know how to respond because they were never trained to |
| Conflict between franchisor & franchisee | Struggling franchisees don't understand why they're failing and don't trust top-down advice. Some people trust living proof more than the words of a successful franchisor |
| Mass hiring problems | Ridiculously high expenses at the start due to mass hire with no structure to support them |

### The real cost:
- **Reputation damage** that affects the entire franchise brand
- **Lost customers** — both new and existing
- **High employee turnover** — not because workers are bad, but because training is
- **Expensive fixes** — mass hiring, sending workers between locations (costly and ineffective, especially if franchisees don't get along)
- **Long-term and short-term damage** — can be the difference between killing the business from the start
- In the worst case — **killing a business before it even gets started**

### Personal connection:
> "I worked at a donut franchise that started as a **top 5 location out of 30**. Within time, it dropped to **bottom 2**. I saw firsthand why:
>
> - Workers were thrown in without proper training — including myself
> - 12-hour shifts with unfair task distribution led to burnout and breakdowns
> - Managers blamed workers for underperforming, when the real issue was a lack of training and structure
> - Mass hiring at launch led to ridiculously high expenses with no return because most hires weren't set up to succeed
> - Customer complaints were ignored or mishandled because workers simply didn't know how to respond
> - Undisciplined habits formed early and were never corrected
> - Recipes were on scattered papers — no way to search, organize, or learn better methods from others
>
> **The problems weren't the people — it was the system.** There was no structure, no knowledge sharing, and no consistency. Friendchise is the tool I wish existed."

---

## 4. User Personas

### 🏢 Persona 1: Frank — The Franchisor
| Field | Detail |
|---|---|
| Age | 52 |
| Role | Franchisor / Brand Owner |
| Background | Frank built his donut brand from scratch 15 years ago and now has 30+ franchise locations. He knows the business inside out but can't be everywhere at once. |
| Goals | Maintain consistent quality across all locations. Share official procedures. Identify struggling franchisees early. Raise the overall brand standard. Discover better methods from franchisees and share them. |
| Frustrations | Some locations are damaging the brand reputation. He shares advice but franchisees don't always trust top-down instructions. He has no visibility into what's going wrong at individual locations. |
| How Friendchise helps | He sets default tasks and official procedures. He can flag urgent posts, share recipes with role-based permissions, monitor franchisee performance, and let the community reinforce his standards through peer-to-peer knowledge sharing. |

### 🆕 Persona 2: Nina — The New Franchisee
| Field | Detail |
|---|---|
| Age | 29 |
| Role | New Franchise Owner |
| Background | Nina just invested her savings into opening her first donut franchise. She's excited but overwhelmed — she has no food industry experience and just hired 8 workers. She doesn't know where to start. |
| Goals | Get her location running smoothly from day one. Avoid costly beginner mistakes. Train her workers properly. Build a good reputation early. |
| Frustrations | She's flipping through 50+ paper recipes. She doesn't know what tasks to prioritize. She mass-hired but doesn't have the experience to train anyone. She's terrified of failing before she even starts. |
| How Friendchise helps | She inherits Frank's default tasks automatically. She watches video tutorials on each task. She sees warnings and key points before doing anything. The auto-generated task cycle structures her entire week. She learns from succeeding franchisees instead of figuring it out alone. |

### 📉 Persona 3: Derek — The Struggling Franchisee
| Field | Detail |
|---|---|
| Age | 41 |
| Role | Struggling Franchise Owner |
| Background | Derek opened his location 2 years ago. It started strong but has been declining steadily. He's losing customers, his workers are burnt out, and he doesn't fully understand why things went wrong. He's frustrated with the franchisor's advice because it feels disconnected from his reality. |
| Goals | Figure out what's going wrong. Learn from franchisees who are actually succeeding. Fix his task distribution. Rebuild his reputation. |
| Frustrations | He doesn't trust top-down advice from Frank. His workers are overloaded and quitting. He knows something is off but can't pinpoint it. He feels isolated — no one to compare notes with. |
| How Friendchise helps | He compares his task times to successful locations. He reads peer feedback from other franchisees going through similar challenges. He sees what factors contribute to success. He uses the forum to ask for help from people he trusts — other franchisees. |

### 🏆 Persona 4: Sarah — The Succeeding Franchisee
| Field | Detail |
|---|---|
| Age | 35 |
| Role | Top-Performing Franchise Owner |
| Background | Sarah's location has been top 5 for 3 years straight. She's figured out efficient systems, her workers are happy, and customers love her store. She's proud of what she's built and wants to help others. |
| Goals | Share what works. Help the brand succeed overall. Get recognized for her contributions. Help struggling franchisees without having to physically be there. |
| Frustrations | She has great methods but no platform to share them. When she helps other locations in person it's expensive and time-consuming. She doesn't feel recognized for going above and beyond. |
| How Friendchise helps | She posts videos, tips, and comments under tasks. She shares her task cycle setup for others to learn from. The upvote system and monthly rewards recognize her contributions. Her knowledge helps the entire franchise without her leaving her store. |

### 👷 Persona 5: Marcus — The New Worker
| Field | Detail |
|---|---|
| Age | 22 |
| Role | New Worker |
| Background | Marcus just got hired at Nina's location. It's his first job. He showed up on day one and nobody told him what to do. He's eager to learn but feels lost and anxious about messing up. |
| Goals | Know exactly what he's doing each day. Learn tasks at a steady pace. Not get yelled at for things he was never taught. Build confidence. |
| Frustrations | He was thrown in without training. He doesn't know where the recipes are. He's scared of making mistakes. He cleaned the ice cream machine 4 times this week while others never touched it. |
| How Friendchise helps | He sees his daily tasks clearly on his phone. He's eased into tasks gradually by the smart cycle. He clicks on any task and finds step-by-step instructions and videos. Work is evenly distributed so he's not stuck doing the same thing every day. |

### 🧑‍💼 Persona 6: Jay — The Shift Lead / Experienced Worker
| Field | Detail |
|---|---|
| Age | 27 |
| Role | Shift Lead / Manager |
| Background | Jay has been working at Derek's location for 3 years. He started as a regular worker and worked his way up. He knows every task inside out, trains most of the new hires, and is the go-to person when things go wrong. But he's stretched thin — he's basically running the floor while also being expected to teach everyone. |
| Goals | Stop being the only person who knows how to do everything. Have new workers come in with some basic knowledge so he's not starting from scratch every time. Manage the schedule fairly without complaints. Focus on his own responsibilities instead of babysitting. |
| Frustrations | He's tired of training people who quit after 2 weeks. He gets blamed when new workers mess up — even though he didn't have the time or tools to teach them properly. He manually creates the schedule and it's never fair enough for everyone. He has a lot of knowledge but no way to document it for future hires. |
| How Friendchise helps | He adjusts the task cycle when someone calls in sick. The auto-generated cycle takes the pressure off manual scheduling. New workers can self-learn through task videos and posts so he's not the only source of training. He can post his own tips and methods so his knowledge lives on even if he's not on shift. He assigns permissions and manages roles for his team. |

### 🕵️ Persona 7: Rico — The Franchise Auditor / Field Support
| Field | Detail |
|---|---|
| Age | 38 |
| Role | Franchise Field Auditor / Support |
| Background | Rico ran one of the top-performing locations for 5 years. The franchisor noticed and hired him to travel between locations, audit operations, and help struggling franchisees improve. On paper it's a great role — in reality, it's a nightmare. |
| Goals | Help struggling locations improve without causing conflict. Identify problems quickly without spending days at each site. Build trust with franchisees so they actually listen. Report findings back to the franchisor accurately. |
| Frustrations | Franchisees don't trust him — they see him as a spy for the franchisor, not a helper. He got into a heated argument with a struggling franchisee who felt judged and attacked. Some locations hide their problems when he visits so he never sees the real picture. He's stressed and burnt out from travelling and dealing with conflict. His advice is ignored because franchisees think "every store is different, you don't understand mine." He has no consistent data to back up his observations — it's all based on what he sees during short visits. |
| How Friendchise helps | He can view franchisee performance data remotely instead of relying on in-person visits. He can see task completion rates, cycle setups, and forum activity to identify real problems before showing up. He doesn't have to be the bad guy — the data speaks for itself. Struggling franchisees can see community-driven proof of what works instead of just hearing it from Rico. The forum reduces the need for confrontation — franchisees learn from peers they trust instead of an auditor they resent. He can point franchisees to specific posts and videos instead of arguing his own opinion. |

---

## 5. User Stories (34 Total)

### 🆕 New Franchisee (3)
1. As a new franchisee, I want to see video tutorials attached to each task so that I can learn how to do things properly without relying on someone to teach me in person.
2. As a new franchisee, I want to see major warnings and key points on each task so that I know what to watch out for before I start.
3. As a new franchisee, I want to inherit the franchisor's default tasks automatically so that I have a structured starting point from day one.

### 📉 Struggling Franchisee (4)
4. As a struggling franchisee, I want to see how top-performing locations handle the same tasks so that I can identify what I'm doing wrong.
5. As a struggling franchisee, I want to compare how long tasks should take vs how long my workers take so that I can spot inefficiencies.
6. As a struggling franchisee, I want to see factors that contribute to a successful franchise so that I know what to focus on improving.
7. As a struggling franchisee, I want to get feedback from other franchisees, not just the franchisor so that I can learn from people going through the same challenges.

### 👷 Worker (4)
8. As a worker, I want to see my assigned tasks for the week in a clear schedule so that I know exactly what I'm responsible for each day.
9. As a worker, I want to search for recipes quickly so that I don't have to dig through piles of paper.
10. As a worker, I want tasks to be evenly distributed so that I'm not burnt out doing more than everyone else.
11. As a worker, I want a checklist or standard for each task so that the person before me doesn't leave a mess for me to clean up.

### 🆕 New Worker (4)
12. As a new worker, I want to see exactly what tasks I need to do today so that I'm not confused on my first day.
13. As a new worker, I want to see what a full week of work looks like so that I can mentally prepare and feel confident.
14. As a new worker, I want to be eased into tasks gradually so that I can learn at a steady pace without being overwhelmed.
15. As a new worker, I want step-by-step details on how to execute each task so that I build good habits from the start and avoid mistakes.

### 🏢 Franchisor (5)
16. As a franchisor, I want to flag posts as urgent or official so that franchisees know which procedures are mandatory.
17. As a franchisor, I want to create a default set of tasks that all franchisees must follow so that every location maintains the same standard.
18. As a franchisor, I want to discover better methods from franchisees and share them across all locations so that the overall standard improves.
19. As a franchisor, I want to share recipes with role-based permissions so that only authorized people (e.g., chefs) can view secret recipes.
20. As a franchisor, I want to see the performance/status of each franchisee so that I can identify who needs help.

### 🏆 Succeeding Franchisee (3)
21. As a succeeding franchisee, I want to share my knowledge and methods so that the overall franchise reputation improves.
22. As a succeeding franchisee, I want to be rewarded for contributing so that I'm motivated to keep sharing.
23. As a succeeding franchisee, I want to share my task cycle setup so that others can learn from my scheduling approach.

### 💬 Franchise Member — Forum (3)
24. As a franchise member, I want to post tips, videos, and comments under any task or recipe so that I can share my knowledge with others — based on my permission role.
25. As a franchise member, I want to upvote/downvote posts and comments so that the best methods naturally rise to the top.
26. As a franchise member, I want to search the forum so that I can quickly find information on a specific task or topic.

### 🔄 Manager — Cycle (2)
27. As a manager, I want to manually adjust the task cycle if needed so that I can handle edge cases like someone calling in sick.
28. As a manager, I want to auto-generate an optimal task cycle when I'm unsure how to distribute tasks so that the system handles it for me.

### ✅ Manager — Tasks (1)
29. As a manager, I want to see which tasks have been completed so that I can track progress and hold workers accountable.

### 🔐 Owner — Roles & Permissions (5)
30. As a franchisee owner, I want to create custom ranks with custom names so that my team structure fits my business (e.g., "Head Baker", "Shift Lead").
31. As a franchisee owner, I want to assign permission roles to each rank (e.g., comment, post, manage tasks) so that I control who can do what.
32. As a franchisee owner, I want two default ranks — Worker and Owner — so that new members are automatically assigned the basic role when joining.
33. As someone with a management permission, I want to assign and manage permission roles for others so that I can delegate responsibilities.
34. As a worker, I want to check off tasks on my phone as I complete them so that everyone knows what's done and what's left.

---

## 6. Feature List (MoSCoW Prioritized — 36 Total)

### 🔴 Must Have (14) — Core, app doesn't work without these

| # | Feature | Description |
|---|---|---|
| 1 | User authentication & registration | Google OAuth with JWT sessions |
| 2 | Role & permission system | Custom ranks with assignable permissions. Each role represents an action. Management role holders can assign permissions to others. Two defaults: Worker and Owner. Worker is default when joining. |
| 3 | Franchisor default task creation | All franchisees inherit these tasks. Think of franchisor as parent — default tasks like abstraction |
| 4 | Franchisee custom task creation | Add their own tasks on top of defaults. Can also create local recipes. These won't be "brand" tasks, only local |
| 5 | Task detail view | Step-by-step instructions, key warnings, major points to consider before doing anything |
| 6 | Smart task cycle generator | Auto-distributes tasks evenly across workers. Supports multi-person tasks. Customizable per location based on equipment and size. Example: 4 workers, 1 task every 2 days = 8-day cycle so everyone does it once. Scales across many tasks with different frequencies and qualification requirements |
| 7 | Cycle customization by franchisee | Exclude/add tasks based on equipment (some locations don't have ovens so can't bake). Adjust frequency within franchisor-set min/max bounds. Anyone with management permission can modify |
| 8 | Worker daily/weekly timetable view | See assigned tasks on phone or any device. Filter to "My Tasks Today" from the overall timetable |
| 9 | Task check-off / completion tracking | Workers press "Done" to mark completion. Trust-based for now. In a donut place it's very obvious if tasks haven't been done |
| 10 | Recipe database | Searchable, role-based access. Some recipes locked based on roles (e.g., only chefs see secret recipes). Franchisee/manager can also be workers — they can include themselves in the timetable |
| 11 | Task-linked forum | Every task and recipe is also a forum topic. Click a task → see posts, videos, tips from other franchisees. Comments and upvotes/downvotes. Indirectly a feedback system from the community |
| 12 | Search functionality | Search tasks, recipes, forum posts. Multiple ways to access information |
| 13 | Timetable filtering | Workers filter the overall mixed timetable to see only their assigned tasks |
| 14 | Self-assignment for owners/managers | Franchisees and managers can add themselves to the worker timetable if they want to physically work |

### 🟡 Should Have (10) — Important, makes the app significantly better

| # | Feature | Description |
|---|---|---|
| 15 | Video/media attachments | On tasks and posts. Workers might be able to self-learn by clicking the task and watching videos. Can save money on teaching and time. New workers might prep at home |
| 16 | Upvote/downvote system | On posts and comments. Best methods naturally rise to the top |
| 17 | Urgent/official post flagging | Franchisor can flag posts with urgency level |
| 18 | Role-based content visibility | Secret recipes only visible to certain roles (e.g., chefs can see recipes, waiters can't). No outsiders can post or view |
| 19 | Franchisee performance dashboard | Task completion rates, cycle data, activity. For franchisor + Rico-type auditor roles |
| 20 | Task time tracking | Expected time vs actual time per task. Allows comparison between franchisees |
| 21 | General forum | Separate from task-linked posts. Open discussion area |
| 22 | Franchisor overview of all franchisees | Who's struggling, who's thriving. Recent forum activity. Click to see detailed view of each franchisee |
| 23 | New worker gradual onboarding | Cycle algorithm eases new workers into tasks slowly. They learn each task at a steady pace |
| 24 | Task modification by franchisees | Can edit task details but not franchisor-set titles. Like abstraction — inherited but customizable |

### 🟢 Nice to Have (12) — Future additions, bonus features

| # | Feature | Description |
|---|---|---|
| 25 | Reward/recognition system | Monthly best post, top contributor badges. Incentivize sharing. Create opportunities for franchisees to create new recipes and post them |
| 26 | Shareable cycle profiles | Succeeding franchisees share their entire cycle setup for others to learn from |
| 27 | Success factor insights | What common traits top franchisees share. Help struggling franchisees see the factors |
| 28 | Notification system | Alerts for urgent posts, schedule changes, new assignments. Requires mobile app eventually |
| 29 | Mobile app | Currently responsive web only. Mobile app in the future |
| 30 | AI-generated posts/suggestions | AI can automatically post something interesting. Future topic |
| 31 | Comparison tool | Side-by-side franchisee performance comparison |
| 32 | Worker self-learning mode | Prep at home by watching task videos before starting work |
| 33 | Proof system for task completion | Photo/verification system. Not needed for v1 |
| 34 | Demographic-based smart recommendations | Grab data on demographics of each franchisee area. If your area has average age 50, recommend posts from successful franchisees with similar demographics. Like Netflix but for franchise knowledge |
| 35 | AI compliance/safety flagging | Auto-detect posts with potential legal, health, or safety violations. Example: "Cut veggies and meat on the same board" → flag as cross-contamination risk |
| 36 | Reporting system | Manual reports for inappropriate content or behavior |

---

## 7. User Flows (9 Total)

### Flow 1: 🆕 New Franchisee Onboarding (Nina)
```
Signs up / Gets invited by Franchisor
        │
        ▼
Creates franchise location profile
(Name, address, size, equipment available)
        │
        ▼
Automatically inherits franchisor's default tasks
        │
        ▼
Reviews inherited tasks
        │
        ├── Excludes tasks that don't apply (no oven = no baking)
        ├── Adjusts frequency within min/max bounds
        └── Adds custom tasks specific to their location
        │
        ▼
Adds workers (invite by email/code)
        │
        ▼
Assigns roles/ranks to workers
        │
        ▼
Generates first task cycle
(Auto-optimized based on workers + tasks + frequency)
        │
        ▼
Publishes timetable → Workers can now see their schedule
```

### Flow 2: 👷 Worker Daily Routine (Marcus)
```
Opens app
        │
        ▼
Sees full timetable (all workers, all tasks)
        │
        ▼
Filters to "My Tasks Today"
        │
        ▼
Sees list of assigned tasks for the day
        │
        ▼
Clicks on a task
        │
        ├── Views step-by-step instructions
        ├── Sees key warnings / major points
        ├── Watches attached video tutorial
        └── Reads forum posts/tips from other franchisees
        │
        ▼
Completes the task
        │
        ▼
Presses "Done" → Task marked as complete
        │
        ▼
Moves to next task
```

### Flow 3: 🍩 Recipe Search (Marcus / Any Worker)
```
Opens app
        │
        ▼
Goes to Recipe section OR uses Search bar
        │
        ▼
Types recipe name (e.g., "Glazed Donut")
        │
        ▼
Results filtered by role permission
(Only sees recipes their role allows)
        │
        ▼
Clicks on recipe
        │
        ▼
Sees official recipe (from franchisor)
        │
        ├── Reads community posts underneath
        ├── Watches video of how others do it
        ├── Sees upvoted tips (e.g., "Let glaze cool 2 min longer")
        └── Can comment / post their own method (if permission allows)
```

### Flow 4: 🔄 Cycle Generation & Adjustment (Jay / Manager)
```
Opens app → Goes to Cycle Manager
        │
        ▼
Sees current active tasks for the location
(Inherited + custom tasks)
        │
        ▼
Chooses: Auto-generate OR Manual setup
        │
        ├── AUTO: System calculates optimal cycle
        │   based on:
        │   - Number of workers
        │   - Task frequency (min/max wait)
        │   - Multi-person task requirements
        │   - New worker gradual onboarding
        │
        └── MANUAL: Drag and drop / assign tasks to workers
        │
        ▼
Reviews generated timetable
        │
        ├── Adjusts if needed (someone called in sick, swap tasks)
        └── Confirms
        │
        ▼
Publishes → All workers see updated timetable
```

### Flow 5: 💬 Forum Interaction (Any Franchise Member)
```
Accesses forum via:
        ├── Clicking a task → "View Posts"
        ├── Clicking a recipe → Community section
        └── Going to General Forum directly
        │
        ▼
Browses posts OR searches for a topic
        │
        ▼
Reads a post
        │
        ├── Upvotes / Downvotes
        ├── Reads comments
        ├── Watches attached video
        └── Comments their own tip (if permission allows)
        │
        ▼
OR creates a new post
        │
        ├── Selects category (task-linked, recipe, general)
        ├── Writes post content
        ├── Attaches media (video, images)
        └── Submits
```

### Flow 6: 🏢 Franchisor Overview (Frank)
```
Opens app → Franchisor Dashboard
        │
        ▼
Sees overview of all franchise locations
        │
        ├── Performance metrics (task completion, activity)
        ├── Which locations are thriving vs struggling
        └── Recent forum activity
        │
        ▼
Clicks on a specific franchisee
        │
        ▼
Sees detailed view:
        ├── Their task setup (which tasks excluded/added)
        ├── Frequency adjustments they've made
        ├── Task completion rates
        └── Worker activity
        │
        ▼
Can also:
        ├── Create/edit default tasks (pushed to all franchisees)
        ├── Post official procedures (flagged as urgent)
        └── Share recipes with role-based permissions
```

### Flow 7: 📉 Struggling Franchisee Seeking Help (Derek)
```
Opens app → Notices low performance metrics
        │
        ▼
Goes to Forum
        │
        ▼
Searches for a specific problem
(e.g., "workers taking too long on prep")
        │
        ▼
Finds posts from successful franchisees
        │
        ├── Reads tips sorted by upvotes
        ├── Watches video tutorials
        ├── Sees time comparisons (their avg vs top locations)
        └── Comments asking for specific advice
        │
        ▼
Applies changes:
        ├── Adjusts task cycle based on recommendations
        ├── Shares new methods with workers via task details
        └── Monitors improvement over time
```

### Flow 8: 🕵️ Field Audit (Rico)
```
Opens app → Sees franchisor-level overview
        │
        ▼
Identifies struggling locations remotely
(Low completion rates, inactive forum, poor metrics)
        │
        ▼
Reviews specific location data:
        ├── Task setup and exclusions
        ├── Cycle configuration
        ├── Worker completion rates
        └── Forum engagement
        │
        ▼
Before visiting, prepares:
        ├── Saves relevant successful posts to share
        ├── Notes specific data points (not opinions)
        └── Identifies comparable successful locations
        │
        ▼
Visits location armed with data
        │
        ▼
Points franchisee to:
        ├── Specific forum posts
        ├── Successful cycle profiles
        └── Community-proven methods
        │
        ▼
Data speaks for itself → Less conflict, more trust
```

### Flow 9: 🔐 Role & Permission Setup (Franchisee Owner)
```
Opens app → Goes to Team Management
        │
        ▼
Sees default ranks: Worker, Owner
        │
        ▼
Creates custom ranks
(e.g., "Head Baker", "Shift Lead", "Trainee")
        │
        ▼
Assigns permissions to each rank:
        ├── Can comment?
        ├── Can post?
        ├── Can manage tasks/cycle?
        ├── Can assign roles to others?
        ├── Can view secret recipes?
        └── Can mark tasks as complete?
        │
        ▼
Assigns ranks to workers
(e.g., Marcus = Trainee, Jay = Shift Lead)
        │
        ▼
Workers now see/access only what their rank allows
```

---

## 8. Sitemap / Information Architecture

### Multi-Tenant Hierarchical Model

```
Platform (FriendChise)
├── Landing / Marketing Page (unauthenticated)
├── Sign Up
├── Sign In (Google OAuth)
└── App Shell (authenticated)
    ├── Org Switcher (dropdown — user may belong to multiple orgs, could own KFC and be a franchisee of Walkers)
    ├── Create Organization
    │   ├── Create Independent Org (full control)
    │   └── Create Franchisee Org (requires one-time invite link from parent brand)
    └── /orgs/[orgId]/ (selected org context)
        ├── Overview (dashboard — placeholder for v2)
        ├── Timetable
        │   ├── Weekly Calendar View (materialised schedule, real dates)
        │   ├── Day View
        │   ├── Simple List View (tasks in time order)
        │   └── Templates (Cycle Profiles)
        │       ├── Template List
        │       └── Template Editor (Day 1–N grid, drag/drop tasks, right sidebar task library)
        ├── Tasks
        │   ├── Task Library (list of reusable task templates)
        │   └── Create/Edit Task
        ├── Recipes
        │   ├── Recipe Library (searchable, role-permission gated)
        │   └── Create/Edit Recipe (also a forum topic)
        ├── Forum
        │   ├── Forum Home (browsable, searchable)
        │   ├── Task-linked threads (each task = a topic)
        │   ├── Recipe-linked threads (each recipe = a topic)
        │   └── General Discussion
        ├── Team
        │   ├── Member List (with roles/ranks)
        │   ├── Invite Member
        │   └── Role/Rank Management (create ranks, assign permissions)
        ├── Franchisees (parent org only)
        │   ├── Child Org List (overview of all franchisees)
        │   ├── Create Franchisee Link (one-time token, expires in minutes, used once)
        │   └── Franchisee Detail (drill into specific franchisee's data)
        ├── Progress (v2 — completion stats)
        └── Settings (v2 — org settings)
```

### Organization Types

| Type | Description |
|---|---|
| Root / Independent Org | Created normally. Full settings, full control. No parent. |
| Parent Org (Brand) | Same as root, but can issue franchisee creation links. Defines default tasks/recipes/roles. Can view child orgs. Also treated as a normal store — can have its own workers, timetable, local tasks. It's the "original store." |
| Child Org (Franchisee) | Created only via invite link. Inherits published tasks/recipes/roles from parent. Has reduced control depending on parent. Can create own local tasks and recipes. Manages own members, timetable, cycle. |

---

## 9. Permission Matrix (RBAC v1)

### Core Idea
- Permissions are evaluated within the **current org** (the org selected in the dropdown)
- Parent orgs (brands) have an extra section to manage child orgs
- Each role represents actions. If you have a management role, you can give other people permission roles
- Each rank can have its own name, with 2 defaults: Worker and Owner
- Worker is the default when joining
- Child-org owners/managers can invite/remove members freely (no parent approval needed)

### Permission Table

| Action | Owner | Manager | Worker |
|---|---|---|---|
| Create/delete org | ✅ | ❌ | ❌ |
| Manage members (invite/remove/change role) | ✅ | ❌ | ❌ |
| Create/edit/delete task templates | ✅ | ✅ | ❌ |
| Create/edit timetable templates | ✅ | ✅ | ❌ |
| Apply template to a week (materialise) | ✅ | ✅ | ❌ |
| Edit materialised instances (reassign, reschedule) | ✅ | ✅ | ❌ |
| Assign members to task instances | ✅ | ✅ | ❌ |
| View timetable (full week) | ✅ | ✅ | ❌ |
| View own daily tasks | ✅ | ✅ | ✅ |
| Update task status (TODO/IN_PROGRESS/DONE/SKIPPED) | ✅ | ✅ | ✅ (own tasks only) |
| View all org members | ✅ | ✅ | ✅ (read-only) |
| Create/manage custom ranks | ✅ | ❌ | ❌ |
| Assign permissions to ranks | ✅ | ❌ | ❌ |
| Create local tasks/recipes | ✅ | ✅ | ❌ |
| Post in forum | ✅ | ✅ | Role-dependent |
| Comment in forum | ✅ | ✅ | Role-dependent |
| View secret recipes | ✅ | Role-dependent | Role-dependent |

### Permission Enum Values in Code
`ORG_MANAGE`, `ROLE_MANAGE`, `TASK_CREATE`, `TASK_UPDATE`, `TASK_DELETE`, `TASK_ASSIGN`, `TASKINSTANCE_COMPLETE`

### How It Works
- Each org has `Role` records (e.g., "Owner", "Manager", "Worker", "Head Baker", "Shift Lead")
- Each `Role` has `RolePermission` rows linking to `OrgPermission` enum values
- Every API route and Server Action checks permissions via `requireOrgPermission(orgId, permission)`
- Authorization helper returns `{ ok: false, response: 401|403 }` on failure for early return

### Parent/Child Role Inheritance
- Parent org defines a default role set (Owner/Manager/Chef/Service Staff/Worker etc.)
- When a child org is created, it receives a **copy** of those roles
- Child org can: add new roles, modify role names/permissions, delete roles it doesn't want
- Roles are templated at creation time, not permanently synced

---

## 10. Multi-Tenant Architecture

### Hierarchical Model
- **Parent org** (brand) → **Child org** (franchisee) via one-time invite links
- A single user can belong to multiple orgs (e.g., owns both KFC + McDonald's franchises)
- UI has an org dropdown listing every org the user is a member of
- Any org created using a link is a child node with less control depending on the parent node

### Invite Link System (Planned)
- Brand owner goes to "Franchisees" → "Generate Franchisee Link"
- System generates a **one-time token link** that expires in a few minutes and can only be used once
- New franchisee owner logs in → goes to Create Organization → chooses "Create Franchisee under Brand" → pastes token
- System validates token → creates child org with `parentOrgId` = brand org → adds creator as Owner

### Task/Recipe Inheritance Rules
- Tasks are **shared/canonical** — they are NOT copied into child orgs
- Each canonical task has **one shared forum thread** that everyone comments under (within the same brand network — KFC tasks are NOT visible to McDonald's users)
- Title and main description are **read-only** for child orgs
- Comments/forum is **free** — anyone can comment based on their permissions
- Child orgs can create their own **local tasks and local recipes**
- Local tasks won't be "brand" tasks — only specialized to that location
- All inherited tasks default to **accessible/enabled** for new child orgs
- Franchisees don't have to include everything in their cycle — they simply don't drag unneeded tasks into their template

### What Children Inherit (Conceptual)
| Inherited | Can Modify? |
|---|---|
| Brand tasks/recipes (title + description) | Read-only (title). Can modify details but not title |
| Role templates | Receive copy. Can add/modify/delete their own |
| Forum threads (per task/recipe) | Can comment, post, upvote/downvote |

### What Children Control
- Their own task cycle / timetable templates
- Their own scheduling and assignments
- Their own local tasks and recipes
- Their own members (invite/remove freely)
- Their own local roles and permissions

---

## 11. Task Frequency System

### Min/Max Wait Design
Each task has two recurrence variables:
- **minWaitDays** — Minimum days before the task must be done again
- **maxWaitDays** — Maximum days before the task must be done again

### Examples

| Min | Max | Meaning |
|---|---|---|
| 0 | 1 | Do it every day |
| 1 | 2 | Do it every 1-2 days (flexible). Could be: 2 days, 2 days, 1 day, 2 days, etc. |
| 2 | 7 | Do it at least once a week but no sooner than every 2 days |

### Rules
- Franchisees can **shorten** the frequency but cannot exceed the max set by the franchisor
- Franchisor can see what each franchisee has set
- `Task` model holds `minWaitDays` and `maxWaitDays` as the global recommendation
- `TaskInstance` is the unique factor that goes on the timetable calendar, unique to each franchisee

### Cycle Example (demonstrates the algorithm)
- 4 workers, 1 task that needs to happen every 2 days
- = **8-day cycle** so every worker does it exactly once
- Worker 1 does it on Day 1, Worker 2 does it on Day 3, Worker 3 does it on Day 5, Worker 4 does it on Day 7
- That's the basic idea but scaled across many tasks with different frequencies and qualification requirements
- **This is the algorithmically impressive feature** — not just CRUD

---

## 12. Timetable System Design

### How the Timetable System Works (Core Architecture)

The timetable system has two layers:

**Layer 1: Template / Cycle Profile (pattern definition)**
- A `TimetableTemplate` is a named cycle profile, e.g., "Standard Week" with `cycleDays: 7`
- Inside a template, task placements are stored as `TaskInstance` rows with:
  - `templateId` (which template this belongs to)
  - `dayOffset` (0 = Day 1, 1 = Day 2, etc.) — represents "this task is set on Day 1"
  - `startTimeMin` (minutes from midnight, e.g., 540 = 9:00 AM)
  - Reference to the `Task` template
- These have **NO real dates** — they're relative positions in a cycle
- The Template Editor page shows "Day 1, Day 2 … Day N" columns
- A cycle can be 3 days to infinite. It represents what a certain period of tasks looks like
- Treated as **profiles** — future vision: 4 cycles combined next to each other (seasonal, e.g., different tasks when cherries aren't in season)

**Layer 2: Materialised Schedule (real calendar)**
- When a manager selects a template from the dropdown on the Timetable page:
  - The system takes each template placement
  - Calculates real dates: `weekStartDate + dayOffset` = actual date
  - Calculates real times: converts `startTimeMin` to a real DateTime
  - Creates new `TaskInstance` rows with `scheduledStartAt` and `scheduledEndAt`
  - These are the rows that show up on the calendar with real dates
- These materialised instances can then be independently edited (reassign, reschedule, change status)
- **Past is untouched** — template edits only affect future applied weeks

### Why Materialised (Not Virtual Projection)
- Real scenario: Someone completed a task at 9am. Later that day you edit the template to move it to 2pm. Virtual projection would now show "scheduled at 2pm, done at 9am" — misleading
- Materialised rows give you an **audit trail** — you can see who completed what and when
- You can query "all tasks that were scheduled but not done" for a given past week
- The storage cost is minimal (a few hundred rows per week per org)

### Apply / Overwrite Flow
1. Manager goes to Timetable page (shows current week's materialised schedule)
2. Selects a template from the `[Templates ▼]` dropdown
3. If the week has no existing instances → materialise directly
4. If the week already has instances → show confirmation: **"Apply [Template Name] to [Mar 18 – Mar 24]? This will replace existing scheduled tasks."**
5. On confirm → delete existing instances for that week, create new ones from template
6. If any existing instances have status ≠ TODO, warn before overwriting (in-progress or completed work would be lost)
7. **Cycle must start on a Monday** (enforced by backend + UI)

### Template Editor (Page 2)
- Route: `/orgs/[orgId]/timetable/templates/[templateName]`
- Shows **relative days** (Day 1, Day 2 … Day N) — no real dates
- Right sidebar: task library (searchable list of all org tasks)
- Drag/drop tasks onto the grid, or right-click → add
- Click a placed task to edit: set time, duration, assign eligible roles
- Controls: Add Day / Remove Day / View modes (Custom, Calendar, Simple)
- "Create" button for new template (popup: enter template name)
- Cycle header shows: "Cycle: 7 Days. Day 1 - 7"
- Pagination: once end of cycle, wraps back to Day 1

### Timetable View (Page 1)
- Route: `/orgs/[orgId]/timetable`
- Shows **real calendar dates** (Mon 18 – Sun 24, 2026)
- Displays materialised TaskInstance rows with assignees, status, duration
- Views: Calendar (Week/Day) + Simple (list)
- Controls:
  - `[Week ▼]` — toggle between weekly and daily view (calendar mode only)
  - `[Templates ▼]` — select + apply a template to materialise this week
  - `[Filter ▼]` — filter by role / self / assignee
  - `[Calendar | Simple]` — toggle view mode
  - `[Actions ▼]` — future actions
  - `[Prev / Next]` — navigate weeks/days via `?week=` URL param
- Status indicators on each block:
  - ⚪ TODO (default/gray)
  - 🟡 IN_PROGRESS (yellow/amber)
  - 🟢 DONE (green)
  - 🔴 SKIPPED (red/strikethrough)
- Current day is highlighted
- Overlapping tasks are displayed side-by-side in columns
- Block height is proportional to duration

### Editing Rules
- **Edit template** → changes only affect preview projection + future applied weeks. Does not retroactively modify already materialised weeks
- **Edit a materialised instance** (week-specific) → drag/drop changes scheduledStartAt/EndAt. Popup edits: time, duration, assignees, status. Local to that week only

---

## 13. Data Model / Database Schema

### Models

| Model | Description |
|---|---|
| `Organization` | Top-level tenant. Owns all other resources. Has `parentOrgId` for brand→franchisee hierarchy. Has `ownerUserId`, `openTimeMin`, `closeTimeMin`, `timezone`. |
| `User` | A user account, identified by email. Created on first Google OAuth sign-in. |
| `Account` | OAuth account record (Google), linked to User. Managed by Auth.js. |
| `Session` | Auth.js session record (JWT strategy, so sessions are in cookies not DB). |
| `Membership` | Join table: User ↔ Organization, with a Role. |
| `Role` | An org-scoped role (e.g., Owner, Manager, Worker) with a set of permissions. Has `key` for programmatic access. |
| `RolePermission` | Grants a specific `OrgPermission` enum value to a `Role`. |
| `Task` | A reusable task template belonging to an org (title, description, durationMin, peopleRequired, preferredStartTimeMin, minWaitDays, maxWaitDays). |
| `TaskEligibility` | Links a `Task` to a `Role`, defining which roles can be assigned to it. |
| `TimetableTemplate` | A named cycle profile (e.g., "Standard Week") belonging to an org. Has `templateDays` count (default 7) and optional `effectiveFrom`. |
| `TaskInstance` | A scheduled occurrence of a Task, with status, scheduled times, and assignees. Serves dual purpose — template placements (relative: dayOffset + startTimeMin) AND materialised schedule entries (absolute: scheduledStartAt + scheduledEndAt). |
| `TaskInstanceAssignee` | Links a Membership to a TaskInstance (many-to-many). |

### Key Relationships
- Organization → has many Memberships, Roles, Tasks, TimetableTemplates, TaskInstances
- User → has many Memberships (can belong to multiple orgs)
- Membership → belongs to one User + one Organization + one Role
- Role → belongs to Organization, has many RolePermissions
- Task → belongs to Organization, has many TaskEligibility (linking to Roles), has many TaskInstances
- TimetableTemplate → belongs to Organization, has many TaskInstances (template placements)
- TaskInstance → belongs to Task + Organization + optionally TimetableTemplate, has many TaskInstanceAssignees
- TaskInstanceAssignee → belongs to TaskInstance + Membership

### TaskInstance Dual-Purpose Design
TaskInstance serves two purposes:
1. **Template placements** (relative): Have `templateId`, `dayOffset` (day within cycle), `startTimeMin` (minutes from midnight). No real dates.
2. **Materialised schedule entries** (absolute): Have `scheduledStartAt`, `scheduledEndAt` (real DateTime values), `status`, `startedAt`, `completedAt`. Generated when a template is applied to a specific week.

### TaskInstance Status Enum
`TODO` (default) → `IN_PROGRESS` → `DONE` or `SKIPPED`

### OrgPermission Enum
`ORG_MANAGE`, `ROLE_MANAGE`, `TASK_CREATE`, `TASK_UPDATE`, `TASK_DELETE`, `TASK_ASSIGN`, `TASKINSTANCE_COMPLETE`

---

## 14. Key Technical Decisions & Tradeoffs

### Decision 1: Materialised Scheduling vs Virtual Projection
- **Options considered:**
  - **Virtual projection:** Compute the week's schedule on-the-fly from the template via `projectTemplateToWeek()`. No stored rows. Lighter storage.
  - **Materialised scheduling:** Generate real TaskInstance rows when a template is applied. Stored in the database.
- **Chose:** Materialised scheduling
- **Why:** Once a week is materialised, each instance can be independently edited (reassign a specific task, change status, adjust time). Virtual projection can't support per-instance overrides without a complex exception layer. Materialised rows also give you an audit trail — you can see who completed what and when. If you edit the template after completion, virtual projection would show misleading data (e.g., "scheduled at 2pm, done at 9am"). The storage cost is minimal (a few hundred rows per week per org).

### Decision 2: One Table (TaskInstance) for Both Template Placements and Materialised Instances
- **Options considered:**
  - **Separate tables:** `TemplatePlacement` and `TaskInstance` as distinct models
  - **Single table:** `TaskInstance` serves both purposes, differentiated by which fields are populated
- **Chose:** Single table (for now)
- **Why:** Reduces schema complexity for v1. Template placements have `templateId` + `dayOffset` + `startTimeMin` set. Materialised instances have `scheduledStartAt` + `scheduledEndAt` set. You can distinguish them by checking which fields are populated. If this causes query confusion later, splitting into two tables is a clean refactor.

### Decision 3: Auth Config Split for Edge Runtime Compatibility
- **Problem:** Next.js middleware runs on the Edge runtime, which cannot import Node.js modules like `@prisma/client`
- **Solution:** Auth.js config is split into two files:
  - `auth.config.ts` — Edge-compatible config (no Prisma). Used by middleware for fast auth checks.
  - `auth.ts` — Full config with Prisma adapter and JWT session callback. Used by API routes and server components.

### Decision 4: Service Layer Shared Between Server Actions and API Routes
- **Problem:** The app has two mutation paths — Server Actions (for the web UI) and API Routes (for external/mobile clients). Business logic shouldn't be duplicated.
- **Solution:** Both are thin wrappers that handle auth and input validation, then delegate to `lib/services/`. The service layer holds all database logic and is shared between both paths. Server Actions additionally call `revalidatePath` to invalidate the Next.js cache.

### Decision 5: Permission Checks via Discriminated Union Result Type
- **Pattern:** Authorization helpers (`requireUser`, `requireOrgMember`, `requireOrgPermission`) return `{ ok: true, user, membership }` or `{ ok: false, response: NextResponse(401|403) }`
- **Why:** Routes can early-return with `if (!authz.ok) return authz.response` — clean, consistent, no exceptions for control flow.

### Decision 6: Shared Tasks with Single Forum Thread (Not Copied)
- **Problem:** Should each franchisee get a copy of each task, or should tasks be shared?
- **Chose:** Shared/canonical. Tasks are NOT copied into child orgs. Each task has one forum thread that all franchisees (within the same brand network) can comment under.
- **Why:** Avoids data duplication. Updates to task details propagate automatically. Community knowledge is centralized. KFC tasks remain isolated from McDonald's tasks (scoped by brand org).

---

## 15. Authentication & Authorization

### Authentication
- Auth.js v5 (NextAuth) with Google OAuth provider
- JWT session strategy — tokens signed with AUTH_SECRET, stored in httpOnly cookie
- No DB reads on every request (stateless JWT)
- Prisma adapter stores User and Account records for OAuth account linking
- The signed-in user's database `id` is mapped from `token.sub` into `session.user.id`
- Middleware (`proxy.ts`) uses edge-compatible auth config to protect routes without DB access

### Authorization Model
- `requireUser()` — user must be signed in (any authenticated user)
- `requireOrgMember(orgId)` — user must be signed in AND have a Membership in the org
- `requireOrgPermission(orgId, permission)` — user must be a member whose Role has the given OrgPermission
- All return discriminated union: `{ ok: true, ... }` or `{ ok: false, response: 401|403 }`
- All `/orgs/[orgId]/*` pages are guarded by at least `requireOrgMember`

---

## 16. API Routes (Implemented)

All routes prefixed with `/api`.

### Orgs — `/api/orgs`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/orgs | Signed in | Create a new org. Auto-creates Owner and Member roles with permissions and adds the creator as Owner. |

### Memberships — `/api/orgs/[orgId]/memberships`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /api/orgs/[orgId]/memberships | ORG_MANAGE | List all members (includes user and role) |
| POST | /api/orgs/[orgId]/memberships | ORG_MANAGE | Add a user to an org with a role |
| DELETE | /api/orgs/[orgId]/memberships | ORG_MANAGE | Remove a user from an org |

### Tasks — `/api/orgs/[orgId]/tasks`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /api/orgs/[orgId]/tasks | Member | List all task templates for an org |
| POST | /api/orgs/[orgId]/tasks | TASK_CREATE | Create a new task template |
| DELETE | /api/orgs/[orgId]/tasks | TASK_DELETE | Delete a task template |

### Task Instances — `/api/orgs/[orgId]/task-instances`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /api/orgs/[orgId]/task-instances | Member | List task instances. Supports ?status= or ?completed=true\|false |
| POST | /api/orgs/[orgId]/task-instances | TASK_CREATE | Create a new task instance from a task template |
| GET | /api/orgs/[orgId]/task-instances/[id] | Member | Get a single task instance by ID |

### Task Instance Assignees — `.../task-instances/[id]/assignees`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | .../assignees | Member | List all assignees (includes membership, user, role) |
| POST | .../assignees | TASK_ASSIGN | Assign a member to a task instance |
| DELETE | .../assignees | TASK_ASSIGN | Remove a member from a task instance |

### Task Instance Status — `.../task-instances/[id]/status`
| Method | Path | Auth | Description |
|---|---|---|---|
| PATCH | .../status | TASKINSTANCE_COMPLETE | Update status (TODO, IN_PROGRESS, DONE, SKIPPED) |

---

## 17. Project Structure (Implemented)

```
app/
  (app)/          # Authenticated app shell (navbar + sidebar layout)
    orgs/
      new/        # Create org page
      [orgId]/
        page.tsx         # Org overview
        tasks/           # Task list + create task form
        memberships/     # Members list
        timetable/       # Weekly timetable (calendar + simple modes)
  (auth)/         # Unauthenticated pages (sign in)
  actions/        # Server Actions (web UI mutations)
    orgs.ts       # createOrg action
    tasks.ts      # createTaskAction
  api/            # REST API route handlers (external/mobile clients)
components/
  layout/
    navbar.tsx              # Top bar (server component)
    navbar-context-actions.tsx  # Route-aware action buttons (client boundary)
    actions/                # Per-page action button components
      tasks-actions.tsx
      members-actions.tsx
    sidebar.tsx             # Dynamic sidebar nav (client component)
    org-switcher.tsx        # Org selector dropdown
  ui/             # shadcn/ui primitives
lib/
  services/       # Business logic layer — shared between API routes and Server Actions
    types.ts      # ServiceResult<T> discriminated union
    orgs.ts
    memberships.ts
    tasks.ts
    task-instances.ts
    assignees.ts
  authz.ts        # Server-side auth guard helpers
  rbac.ts         # Predefined role key constants
  prisma.ts       # Prisma client singleton
  validators/     # Zod schemas for request body validation
prisma/
  schema.prisma   # Database schema
  seed.ts         # Dev seed data
```

---

## 18. Pages (Implemented)

| Route | Guard | Description |
|---|---|---|
| `/` | Signed in | Home — authenticated app shell |
| `/signin` | — | Google OAuth sign-in |
| `/orgs/new` | Signed in | Create a new organization |
| `/orgs/[orgId]` | requireOrgMember | Org overview (placeholder) |
| `/orgs/[orgId]/tasks` | requireOrgMember | Task template list |
| `/orgs/[orgId]/tasks/new` | requireOrgPermission TASK_CREATE | Create a new task template |
| `/orgs/[orgId]/memberships` | requireOrgMember | Member list |
| `/orgs/[orgId]/memberships/new` | requireOrgPermission ORG_MANAGE | Invite a new member by email |
| `/orgs/[orgId]/timetable` | requireOrgMember | Timetable — calendar or simple mode, week navigation |
| `/orgs/[orgId]/timetable/templates` | requireOrgMember | Timetable templates (coming soon) |

---

## 19. UI Design Notes

### Timetable Calendar View
- Server page fetches the week's instances scoped to `scheduledStartAt` in `[monday, monday+7)`
- Client component handles interactive timetable UI
- Calendar view uses absolute positioning to render task blocks by time
- Block height is proportional to task duration
- Overlapping tasks are assigned side-by-side columns using a column-packing algorithm
- Week/day navigation via `?week=` and `?mode=` search params

### Status Colors
- Gray = TODO
- Amber = IN_PROGRESS
- Green = DONE
- Red = SKIPPED

### Sidebar
- Uses prefix matching so nested pages (e.g., `/tasks/new`) correctly highlight the parent nav item
- Org Overview item uses exact matching to avoid highlighting on every org page

### Form Validation
- Server-action errors rendered inline next to each field with `aria-invalid` / `aria-describedby` for accessibility
- Sonner toast summary for overall form errors

### Figma Wireframes Exist For:
- Timetable page (materialised calendar view with real dates)
- Template editor page (relative Day 1–N grid with task library sidebar)

---

## 20. What This Project Demonstrates (For Recruiters)

### Product Thinking
- Started with a **real problem**, not a tutorial
- Defined **7 user personas** with distinct needs, pain points, and goals
- Wrote **34 user stories** covering all user types
- Prioritized **36 features** using MoSCoW framework (Must/Should/Could/Won't)
- Designed the information architecture and sitemap before writing code
- Personal connection to the problem — worked in the industry and saw the failures firsthand

### System Design
- Designed a **hierarchical multi-tenant architecture** (Platform → Brand → Franchisee)
- Built a flexible **RBAC system** with org-scoped roles, custom ranks, and granular permissions
- Architected a **two-layer timetable system** (template patterns → materialised schedules)
- Designed a **task frequency system** with min/max wait days for optimal cycle generation
- Evaluated architectural tradeoffs and documented the reasoning (virtual vs materialised, single table vs split, shared tasks vs copied)
- Designed **parent/child org inheritance** with invite link onboarding

### Engineering Practices
- Auth config split for Edge runtime compatibility (a real production pattern)
- Service layer shared between Server Actions and API routes (no duplicated business logic)
- Discriminated union result types for clean error handling
- Zod schema validation on all inputs
- Feature branch workflow with pull requests
- CodeRabbit AI code review integrated on each PR

### Technical Depth
- Full RBAC implementation (not just "admin vs user")
- Multi-tenant data isolation at the query level
- JWT session strategy with httpOnly cookies
- Server-side rendering with client-side interactivity (RSC + client components)
- Calendar UI with overlap detection and column-packing algorithm
- Algorithm design for fair task distribution (min/max frequency, multi-person tasks, gradual onboarding)

---

## 21. Future Vision / Roadmap

### Actively Working On
- [ ] Timetable template editor (drag/drop task placement on Day 1–N grid)
- [ ] Template materialisation (apply template → generate weekly schedule)
- [ ] Template overwrite with confirmation dialog

### Planned (v1.5)
- [ ] Worker "Today" view (filtered daily checklist)
- [ ] Recipe database (searchable, role-based access)
- [ ] Task-linked forum (each task/recipe = topic with posts/comments)
- [ ] Completion tracking + basic stats dashboard

### Future (v2+)
- [ ] Parent/child org hierarchy (brand → franchisee with invite links)
- [ ] Fair rotation algorithm for task assignment
- [ ] Recipes / SOP attachments on tasks
- [ ] Forum / announcements per org with upvote/downvote
- [ ] Notifications for upcoming/overdue tasks
- [ ] Demographic-based smart recommendations (match franchisees by area demographics → recommend posts from similar successful locations)
- [ ] AI compliance/safety flagging (auto-detect posts with potential legal, health, or safety violations)
- [ ] Seasonal cycle chaining (multiple cycle profiles combined for different seasons)
- [ ] Mobile app
- [ ] Reward/recognition system (monthly best post, top contributor)

---

## 22. Development Workflow

- **Feature branching:** Each feature developed on its own branch, keeping `main` stable
- **Pull requests:** Every feature branch merged via PR, not pushed directly to `main`
- **CodeRabbit AI code review:** Integrated on each PR for automated summaries, inline feedback, error detection, and code quality checks
- **Clean commit history:** Merging via PRs keeps Git history readable and each change traceable

---

## 23. Portfolio Highlights — Features That Stand Out

These are the features that separate this project from typical portfolio work:

| Feature | Why It's Impressive |
|---|---|
| Min/Max frequency cycle algorithm | Shows algorithmic thinking — not just CRUD. 4 workers, task every 2 days = 8-day cycle calculated automatically |
| Parent/child task inheritance | Shows understanding of abstraction and software architecture. Like OOP inheritance applied to franchise operations |
| Demographic recommendation engine (planned) | Shows data-driven product thinking (even as a future feature) |
| AI safety flagging (planned) | Shows awareness of real-world compliance and responsible AI |
| Granular permission system | Shows security and access control design beyond "admin vs user" |
| Personal problem → technical solution | Shows the full engineer mindset: identify problem, research users, design system, build it |
| Two-layer timetable system | Shows system design maturity: template patterns vs materialised schedules, with clear tradeoff reasoning |

> Even listing planned features shows a recruiter you think beyond v1. That's senior-level product thinking from an entry-level candidate.

---

## 24. Recipe/Forum System Design

### Every Recipe Is a Forum Post
- Each recipe is added to the database AND is also a forum topic
- Other franchisees can comment under it, share their own version, show how they do it differently
- The community naturally surfaces the most effective methods through upvotes/downvotes
- Think: Reddit meets a recipe book meets task management

### Example Structure
```
📋 Recipe: Glazed Donut
├── 📄 Official recipe (from franchisor)
├── 💬 Comment: "We let the glaze cool 2 min longer, way less dripping" ⬆️ 47
├── 🎥 Video: "Here's our glazing technique" ⬆️ 112
├── 💬 Comment: "We tried adding vanilla, customers loved it" ⬆️ 23
└── 💬 Comment: "Don't skip the second rise, trust me" ⬆️ 89
```

### Access Rules
- Recipes are role-permission locked (only certain roles see certain recipes)
- Anyone with the right permission can search recipes
- Secret recipes: only authorized roles (e.g., chefs) can view
- No outsiders can post or view — everything is within the brand network
- The forum post could also be indirectly a feedback mechanism from the franchisee community

---

## 25. Cycle Profile Details

### What Is a Cycle Profile?
- A reusable pattern that represents "what a period of work looks like"
- NOT tied to actual dates — purely relative (Day 1, Day 2 … Day N)
- Can start on any real calendar date when applied (must be a Monday)
- Length is flexible: 3 days → N days (effectively infinite)
- Treated as "profiles" — you can have multiple saved profiles

### Future Vision: Seasonal Chaining
- 4 cycles combined next to each other
- Each season treated differently (e.g., cherries not available in winter → different prep tasks)
- A "Calendar Program" that references templates in sequence
- `[Cycle A for 30 days] → [Cycle B for 60 days] → [Cycle C for 20 days]`

### Cycle Customization Per Franchisee
- Not all franchisees have the same equipment — some are so small they don't have an oven and cannot bake
- Each franchisee can customize which tasks are in their cycle based on their location's equipment, size, and capabilities
- The cycle generator only schedules tasks that apply to that specific location

---

## 26. Key Terminology

| Term | Definition |
|---|---|
| Organization (Org) | A workspace/tenant in the platform. Can be independent, a brand (parent), or a franchisee (child) |
| Cycle Profile / Timetable Template | A reusable pattern defining what tasks happen on which relative days |
| Materialise / Apply | The act of generating real scheduled TaskInstance rows from a template for a specific week |
| TaskInstance | A single occurrence of a task — either a template placement (relative) or a materialised schedule entry (absolute) |
| Min/Max Wait | Recurrence constraints on a task: minimum and maximum days between occurrences |
| Rank | A named role within an org (e.g., "Head Baker", "Shift Lead") with assigned permissions |
| Permission | A specific capability granted to a rank (e.g., TASK_CREATE, TASKINSTANCE_COMPLETE) |
