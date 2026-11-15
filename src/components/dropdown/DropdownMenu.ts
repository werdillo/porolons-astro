/** The enabled menu items of a dropdown and the one that has focus. */
export class DropdownMenu {
  private content: HTMLElement | null;
  private items: HTMLElement[] = [];
  private currentFocusIndex = -1;

  constructor(content: HTMLElement | null) {
    this.content = content;
  }

  /** Reads the enabled menu items from the DOM. */
  update(): void {
    if (!this.content) return;
    this.items = Array.from(
      this.content.querySelectorAll('[role="menuitem"]:not([data-disabled="true"])'),
    ) as HTMLElement[];
  }

  /** Focuses the item at idx, wrapping at both ends. */
  focusItem(idx: number): void {
    const targetIdx = (idx + this.items.length) % this.items.length;

    if (this.items[targetIdx]) {
      this.items[targetIdx].focus();
      this.currentFocusIndex = targetIdx;
    }
  }

  /** The first or last item, for opening the menu with an arrow key. */
  focusEdge(last: boolean): void {
    this.focusItem(last ? this.items.length - 1 : 0);
  }

  /** The pointer is over a menu item: focus it and remember it as current. */
  hover(menuItem: HTMLElement): void {
    this.update();
    menuItem.focus();
    this.currentFocusIndex = this.items.indexOf(menuItem);
  }

  reset(): void {
    this.currentFocusIndex = -1;
  }

  /** Arrow, Home, End, Enter and Space within the open menu. */
  handleKeydown(e: KeyboardEvent): void {
    this.update();

    if (this.items.length === 0) return;

    const currentIdx = this.currentFocusIndex;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.focusItem(currentIdx === -1 ? 0 : currentIdx + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        this.focusItem(currentIdx === -1 ? this.items.length - 1 : currentIdx - 1);
        break;
      case "Home":
        e.preventDefault();
        this.focusItem(0);
        break;
      case "End":
        e.preventDefault();
        this.focusItem(this.items.length - 1);
        break;
      case "Enter":
      case " ":
        if (currentIdx !== -1) {
          e.preventDefault();
          this.items[currentIdx].click();
        }
        break;
    }
  }
}
