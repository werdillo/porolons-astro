import { bindDropdownEvents } from "./DropdownEvents";
import { DropdownMenu } from "./DropdownMenu";

/**
 * The state of one dropdown: whether it is open, its menu, and the sources and timers the
 * events read. The DOM events are bound by DropdownEvents.
 */
export class DropdownHandler {
  readonly dropdown: HTMLElement;
  readonly trigger: HTMLButtonElement | null;
  readonly content: HTMLElement | null;
  readonly menu: DropdownMenu;
  readonly openOnHover: boolean;
  readonly closeDelay: number;
  isOpen = false;
  isClosing = false;
  lastOpenSource: "keyboard" | "mouse" = "keyboard";
  lastCloseSource: "keyboard" | "mouse" = "keyboard";
  private animationDuration = 150;
  private closeTimerRef: number | null = null;

  constructor(dropdown: HTMLElement) {
    this.dropdown = dropdown;
    this.openOnHover = dropdown.getAttribute("data-open-on-hover") === "true";
    this.closeDelay = parseInt(dropdown.getAttribute("data-close-delay") || "200");

    // With asChild the trigger is the first child of the wrapper.
    const tempTrigger = dropdown.querySelector(".starwind-dropdown-trigger") as HTMLElement;
    if (tempTrigger?.hasAttribute("data-as-child")) {
      this.trigger = tempTrigger.firstElementChild as HTMLButtonElement;
    } else {
      this.trigger = tempTrigger as HTMLButtonElement;
    }

    this.content = dropdown.querySelector<HTMLElement>(".starwind-dropdown-content");
    this.menu = new DropdownMenu(this.content);

    if (!this.trigger || !this.content) return;

    // The open and close durations come from the inline animation-duration of the content.
    const animationDurationString = this.content.style.animationDuration;
    if (animationDurationString.endsWith("ms")) {
      this.animationDuration = parseFloat(animationDurationString);
    } else if (animationDurationString.endsWith("s")) {
      this.animationDuration = parseFloat(animationDurationString) * 1000;
    }
  }

  init(dropdownIdx: number): void {
    if (this.trigger && this.content) {
      this.trigger.id = `starwind-dropdown${dropdownIdx}-trigger`;
      this.content.id = `starwind-dropdown${dropdownIdx}-content`;
      this.trigger.setAttribute("aria-controls", this.content.id);
      this.content.setAttribute("aria-labelledby", this.trigger.id);
    }
    bindDropdownEvents(this);
  }

  toggleDropdown(): void {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    if (this.isClosing) return;
    if (!this.content || !this.trigger || this.trigger.disabled) return;

    this.isOpen = true;
    this.content.setAttribute("data-state", "open");
    this.trigger.setAttribute("aria-expanded", "true");
    this.content.style.removeProperty("display");

    this.menu.update();
    this.menu.reset();

    this.positionContent();
  }

  closeDropdown(): void {
    if (!this.content || !this.trigger) return;

    this.isClosing = true;
    this.isOpen = false;
    this.content.setAttribute("data-state", "closed");

    // Focus returns to the trigger unless the menu was opened and closed by hover.
    if (!this.openOnHover || this.lastOpenSource === "keyboard" || this.lastCloseSource === "keyboard") {
      requestAnimationFrame(() => {
        if (!this.trigger) return;
        this.trigger.focus();
      });
    }

    // The content hides once its close animation has run.
    setTimeout(() => {
      if (!this.content) return;
      this.content.style.display = "none";
      this.isClosing = false;
    }, this.animationDuration);

    this.trigger.setAttribute("aria-expanded", "false");
    this.menu.reset();
  }

  closeDropdownDelayed(): void {
    if (!this.content || !this.trigger) return;

    this.clearCloseTimer();

    this.closeTimerRef = window.setTimeout(() => {
      if (this.isOpen) {
        this.closeDropdown();
      }
      this.closeTimerRef = null;
    }, this.closeDelay);
  }

  clearCloseTimer(): void {
    if (this.closeTimerRef !== null) {
      window.clearTimeout(this.closeTimerRef);
      this.closeTimerRef = null;
    }
  }

  /** The content is as wide as the trigger. */
  private positionContent(): void {
    if (!this.content || !this.trigger) return;

    this.content.style.width = "var(--starwind-dropdown-trigger-width)";
    this.content.style.setProperty("--starwind-dropdown-trigger-width", `${this.trigger.offsetWidth}px`);
  }
}

/** Instances live in a WeakMap so a removed dropdown can be collected. */
const dropdownInstances = new WeakMap<HTMLElement, DropdownHandler>();

/** Sets up every dropdown on the page that has no handler yet. Runs again after a view transition. */
export function setupDropdowns(): void {
  document.querySelectorAll(".starwind-dropdown").forEach((dropdown, idx) => {
    if (dropdown instanceof HTMLElement && !dropdownInstances.has(dropdown)) {
      const handler = new DropdownHandler(dropdown);
      dropdownInstances.set(dropdown, handler);
      handler.init(idx);
    }
  });
}
