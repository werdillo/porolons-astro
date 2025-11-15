/**
 * Dropdown Script - Language Selector
 * Handles dropdown toggle, click outside, and keyboard navigation
 */

export function initDropdown() {
  const dropdownToggle = document.getElementById("languageDropdown");
  const dropdownMenu = document.getElementById("languageMenu");

  if (!dropdownToggle || !dropdownMenu) return;

  const openDropdown = () => {
    dropdownToggle.setAttribute("aria-expanded", "true");
    dropdownMenu.classList.add("show");
  };

  const closeDropdown = () => {
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownMenu.classList.remove("show");
  };

  const toggleDropdown = () => {
    const isExpanded = dropdownToggle.getAttribute("aria-expanded") === "true";
    isExpanded ? closeDropdown() : openDropdown();
  };

  // Toggle dropdown on button click
  dropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    const target = e.target as Node;
    if (!dropdownToggle.contains(target) && !dropdownMenu.contains(target)) {
      closeDropdown();
    }
  });

  // Close dropdown on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdown();
    }
  });
}

// Auto-initialize when DOM is ready
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDropdown);
  } else {
    initDropdown();
  }
}
