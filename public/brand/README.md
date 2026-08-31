# MOVEXA MEDIA — logo files

The mark is a bold geometric **M** with a play triangle cut into its centre —
"motion + media" in one shape. Gradient runs navy → electric violet → magenta
(`#071B55 → #3023AE → #6C3BFF → #D728A9`), bottom-left to top-right.

| File | Use |
|---|---|
| `movexa-mark.svg` / `movexa-mark-1024.png` | Primary mark, gradient, transparent. Works on dark **and** light. |
| `movexa-mark-white.svg` / `-white-1024.png` | Flat white mark — over photos, colour, video. |
| `movexa-mark-badge.svg` / `-badge-1024.png` | Mark on the `#03030A` rounded square — social avatars, app icon. |
| `movexa-icon-512.png` | 512px badge — favicons, PWA icon, WhatsApp Business profile. |
| `movexa-lockup.svg` / `movexa-lockup-dark.png` | Horizontal lockup for **dark** backgrounds (white + grey wordmark). |
| `movexa-lockup-light.svg` / `movexa-lockup-light.png` | Horizontal lockup for **light** backgrounds. |

## Notes

- **Wordmark font** is *Clash Display* (700). The PNGs have it baked in; the
  lockup SVGs use `<text>` and need Clash Display (or fall back to Space Grotesk
  → system) when opened where that font isn't installed. For a fully portable
  vector lockup, outline the text in a vector editor.
- **Clear space:** keep at least the width of one M-leg around the logo.
- **Minimum size:** mark 16px, lockup 90px wide.
- **Don't** recolour the gradient, stretch, add shadows, or place the gradient
  mark on a busy background (use the white or badge version instead).

Colours, fonts and the full system live in `tailwind.config.ts` and `src/index.css`.
