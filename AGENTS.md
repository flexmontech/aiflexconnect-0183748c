<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep Phase 1A as a single homepage with section navigation and preview dialogs; this preserves the explicitly homepage-only scope without dead links.
- Store sample directory content in a browser-safe data module and keep discovery state in React; the UI phase must not imply live listings or persist accounts.
- Define all brand colors in the global semantic token system; shared tokens keep the dark and light page bands consistent.
