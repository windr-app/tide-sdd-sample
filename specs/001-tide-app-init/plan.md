# Implementation Plan: Tide Information Viewer

**Branch**: `001-tide-app-init` | **Date**: September 5, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-tide-app-init/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Tide Information Viewer web application to display tide times, types (high/low), coefficients, and dates for La Rochelle, France. NextJS 15 frontend with ShadCN UI components, using mock data extracted from La Rochelle tourism website. No external API calls required - data will be statically embedded for demonstration purposes.

## Technical Context
**Language/Version**: TypeScript with Next.js 15  
**Primary Dependencies**: Next.js, ShadCN UI, React, TailwindCSS, Lucide React (icons)  
**Storage**: Static mock data (no database required)  
**Testing**: Jest with React Testing Library, Playwright for E2E  
**Target Platform**: Web browsers (responsive design)
**Project Type**: web - determines frontend structure  
**Performance Goals**: <3s initial load, smooth transitions  
**Constraints**: No external API calls, mock data from https://www.larochelle-tourisme.com/horaires-des-marees?d=09  
**Scale/Scope**: Single-page application, ~5-10 components, demonstration purposes

**User Implementation Details**: NextJS and ShadCN Application, extract mock data from https://www.larochelle-tourisme.com/horaires-des-marees?d=09 no external API call

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (NextJS application only)
- Using framework directly? (Yes - NextJS, ShadCN, no wrapper classes)
- Single data model? (Yes - TideEvent entity, no DTOs needed for static data)
- Avoiding patterns? (Yes - no Repository pattern, direct data access from static imports)

**Architecture**:
- EVERY feature as library? (Single web app, components as reusable modules)
- Libraries listed: tide-data (data access), tide-components (UI components)
- CLI per library: N/A (web application)
- Library docs: README.md format planned

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? (Yes - tests written first)
- Git commits show tests before implementation? (Yes - will be enforced)
- Order: Contract→Integration→E2E→Unit strictly followed? (Yes)
- Real dependencies used? (Yes - actual Next.js app, real DOM testing)
- Integration tests for: component integration, data access, page rendering
- FORBIDDEN: Implementation before test, skipping RED phase

**Observability**:
- Structured logging included? (Console.log with context for development)
- Frontend logs → backend? (N/A - frontend only application)
- Error context sufficient? (React error boundaries, detailed error messages)

**Versioning**:
- Version number assigned? (1.0.0)
- BUILD increments on every change? (Yes)
- Breaking changes handled? (N/A for demo app)

## Project Structure

### Documentation (this feature)
```
specs/001-tide-app-init/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 2: Web application (NextJS frontend)
frontend/
├── src/
│   ├── app/             # NextJS 15 app router
│   ├── components/      # ShadCN UI components
│   │   ├── ui/         # Base ShadCN components
│   │   └── tide/       # Custom tide components
│   ├── lib/            # Utilities and data access
│   ├── data/           # Static mock tide data
│   └── types/          # TypeScript type definitions
├── tests/
│   ├── components/     # Component tests
│   ├── integration/    # Integration tests
│   └── e2e/           # Playwright E2E tests
├── public/             # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── components.json     # ShadCN configuration
```

**Structure Decision**: Option 2 (Web application) - NextJS frontend with no backend required

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `/scripts/update-agent-context.sh [claude|gemini|copilot]` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

No complexity violations identified. The solution follows constitutional principles:
- Single NextJS project (within 3-project limit)
- Direct framework usage without unnecessary wrapper classes
- Simple data model without complex patterns
- Test-first development approach enforced

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none required)

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (component contracts, data model, quickstart)
- Each component contract → component test task + implementation task
- Each data model entity → type definition + validation task
- Each user story from spec → integration test task
- Quickstart validation → E2E test tasks

**Ordering Strategy**:
- TDD order: Tests before implementation
- Dependency order: Types → Data Service → Components → Integration → E2E
- Mark [P] for parallel execution (independent components)
- Foundation first: Setup project, install dependencies, configure tools

**Estimated Output**: 20-25 numbered, ordered tasks in tasks.md

**Task Categories**:
1. **Setup & Configuration** (Tasks 1-5): Project init, dependencies, tooling
2. **Foundation** (Tasks 6-10): Types, data model, basic utilities
3. **Core Components** (Tasks 11-15): TideViewer, TideCalendar, TideDayCard components
4. **Integration** (Tasks 16-20): Component integration, data flow, error handling
5. **Validation** (Tasks 21-25): E2E tests, performance, accessibility checks

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*