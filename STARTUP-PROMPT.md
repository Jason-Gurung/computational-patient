# Startup Prompt

Before doing any work, ensure if you haven't, that you have read and understood:
1. **`CLAUDE.md`** — your operating instructions, available tools, skills, MCPs, and constraints.
2. **`PROJECT-BRIEF.md`** — full project context, key messages, demo concept, and scope.

If you haven't read both, do so now before proceeding.

## Tools at your disposal
- **Skills:** tailwind-v4-shadcn, vite, vitest, react-three-fiber, remotion-best-practices, vercel-react-best-practices, web-design-guidelines, vercel-composition-patterns, agent-browser, pptx, find-skills
- **MCP — Blender:** 3D modelling via socket connection. Blender must be open with BlenderMCP addon connected. Use for generating custom 3D scenes/models.
- **BMAD framework** (`_bmad/`): See CLAUDE.md for which agents apply.
- **Web lookups:** VPN blocks WebFetch/WebSearch. Always use `agent-browser` skill. `curl` to npm registry API works for package metadata.

## Keep documentation current
If at any point during work you notice that what we're doing has diverged from what's documented — in CLAUDE.md, PROJECT-BRIEF.md, or the docs/ folder — update the documentation to reflect reality. Don't let docs go stale. If scope shifts, plans change, or new decisions are made, capture them. Documentation should always describe where we actually are, not where we planned to be.
