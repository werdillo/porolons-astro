/**
 * Accordion Script - Hybrid approach
 * Height-based animations with iOS performance optimizations
 */

export function initAccordion() {
  const accordionButtons = document.querySelectorAll("[data-accordion-button]");

  if (accordionButtons.length === 0) return;

  // Add hardware acceleration hints to accordion content
  const accordionContents = document.querySelectorAll(
    "[data-accordion-content]",
  ) as NodeListOf<HTMLElement>;
  accordionContents.forEach((content) => {
    content.style.willChange = "height";
    content.style.transform = "translateZ(0)";
  });

  accordionButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const accordionItem = button.closest(".accordion-item");
        const accordionContent = accordionItem?.querySelector(
          "[data-accordion-content]",
        ) as HTMLElement;

        if (!accordionContent) return;

        const isExpanded = button.getAttribute("aria-expanded") === "true";

        // Use requestAnimationFrame for smoother rendering
        requestAnimationFrame(() => {
          // Close all other accordion items
          accordionButtons.forEach((otherButton) => {
            if (otherButton !== button) {
              const otherItem = otherButton.closest(".accordion-item");
              const otherContent = otherItem?.querySelector(
                "[data-accordion-content]",
              ) as HTMLElement;

              if (otherContent) {
                otherButton.setAttribute("aria-expanded", "false");
                otherContent.style.height = "0px";
                otherContent.classList.remove("active");
              }
            }
          });

          // Toggle current accordion item
          if (isExpanded) {
            button.setAttribute("aria-expanded", "false");
            accordionContent.style.height = "0px";
            accordionContent.classList.remove("active");
          } else {
            button.setAttribute("aria-expanded", "true");
            accordionContent.classList.add("active");
            const height = accordionContent.scrollHeight;
            accordionContent.style.height = `${height}px`;
          }
        });
      },
      { passive: true } as AddEventListenerOptions,
    );
  });

  // Recalculate heights on window resize with optimized debounce
  let resizeTimer: number;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        requestAnimationFrame(() => {
          accordionButtons.forEach((button) => {
            const isExpanded = button.getAttribute("aria-expanded") === "true";
            if (isExpanded) {
              const accordionItem = button.closest(".accordion-item");
              const accordionContent = accordionItem?.querySelector(
                "[data-accordion-content]",
              ) as HTMLElement;

              if (accordionContent) {
                const height = accordionContent.scrollHeight;
                accordionContent.style.height = `${height}px`;
              }
            }
          });
        });
      }, 250);
    },
    { passive: true } as AddEventListenerOptions,
  );
}

// Auto-initialize when DOM is ready
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAccordion);
  } else {
    initAccordion();
  }
}
