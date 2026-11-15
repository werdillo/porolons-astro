# app

The composition root: the page frame, the layout, the global styles, the shared assets and the architecture tests.

- `layout/`: the HTML document shell (`Layout`).
- `frame/`: the navigation bar (`Navbar`).
- `styles/`: the design tokens (`tokens.css`) and the keyframes (`animations.css`). Classes and the element reset are UnoCSS (`uno.config.ts`).
- `assets/`: images used across boxes (the logo).
- `tests/`: the layers and boxes test (`boundaries.test.ts`).
