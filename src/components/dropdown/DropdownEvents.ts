import type { DropdownHandler } from "./DropdownHandler";

/** Binds the clicks, keys and pointer events of a dropdown to its handler. */
export function bindDropdownEvents(h: DropdownHandler): void {
  const { dropdown, trigger, content } = h;
  if (!trigger || !content) return;

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    h.lastOpenSource = e.detail === 0 ? "keyboard" : "mouse";
    h.toggleDropdown();
  });

  trigger.addEventListener("keydown", (e) => triggerKeydown(h, e));

  // Close on a left-button press outside (not for touch, which would open the menu on scroll).
  document.addEventListener("pointerdown", (e) => {
    if (h.isOpen && !dropdown.contains(e.target as Node)) {
      // mousedown fires for every button; Ctrl-click is the macOS right click.
      if (e.button === 0 && e.ctrlKey === false && e.pointerType === "mouse") {
        h.closeDropdown();
      }
    }
  });

  // Close on a click outside the trigger and the content, for mobile.
  document.addEventListener("click", (e) => {
    if (
      !(h.trigger?.contains(e.target as Node) || h.content?.contains(e.target as Node)) &&
      h.isOpen
    ) {
      h.closeDropdown();
    }
  });

  content.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      h.closeDropdown();
      h.trigger?.focus();
    } else if (h.isOpen) {
      h.menu.handleKeydown(e);
    }
  });

  // Choosing an enabled item closes the dropdown.
  content.addEventListener("click", (e) => {
    const item = (e.target as HTMLElement).closest('[role="menuitem"]');
    if (item && !(item as HTMLElement).hasAttribute("data-disabled")) {
      h.closeDropdown();
    }
  });

  content.addEventListener("mouseover", (e) => {
    const menuItem = (e.target as HTMLElement).closest('[role="menuitem"]');
    if (menuItem && menuItem instanceof HTMLElement && h.isOpen === true) {
      h.menu.hover(menuItem);
    }
  });

  if (h.openOnHover) bindHoverEvents(h, trigger, content);
}

function triggerKeydown(h: DropdownHandler, e: KeyboardEvent): void {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    h.lastOpenSource = "keyboard";
    h.toggleDropdown();
  } else if (e.key === "Escape" && h.isOpen) {
    e.preventDefault();
    h.lastCloseSource = "keyboard";
    h.closeDropdown();
  } else if (h.isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
    e.preventDefault();
    h.lastOpenSource = "keyboard";
    h.menu.update();
    h.menu.focusEdge(e.key === "ArrowUp");
  }
}

/** With openOnHover the pointer opens the dropdown, and leaving it closes after closeDelay. */
function bindHoverEvents(h: DropdownHandler, trigger: HTMLElement, content: HTMLElement): void {
  trigger.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse") return;
    if (h.isClosing) return;
    if (!h.isOpen) {
      h.lastOpenSource = "mouse";
      h.openDropdown();
    } else {
      h.clearCloseTimer();
    }
  });

  h.dropdown.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "mouse") return;
    if (h.isOpen) {
      h.lastCloseSource = "mouse";
      h.closeDropdownDelayed();
    }
  });

  // Moving the pointer into the content keeps it open.
  content.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse") return;
    h.clearCloseTimer();
  });
}
