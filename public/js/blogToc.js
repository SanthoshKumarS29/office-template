document.addEventListener("DOMContentLoaded", () => {

  const tocContainer = document.querySelector(".blog-toc-container");
  const content = document.querySelector(".blog-content");
  const collapseEl = document.getElementById("collapseExample");
  const arrow = document.querySelector(".toc-arrow");
  const shareBtn = document.querySelector(".blog-share-btn");
  const copyBtn = document.querySelector(".blog-copy-btn");

  if (!content) return;

  // Get headings from blog content (they already have IDs now)
  const headings = content.querySelectorAll("h3");

  if (headings.length > 0 && tocContainer) {
    const firstHeadingTop = headings[0].offsetTop;
    const lastHeadingBottom =
      headings[headings.length - 1].offsetTop +
      headings[headings.length - 1].offsetHeight;

    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 120;

      const shouldShow =
        scrollPos >= firstHeadingTop &&
        scrollPos <= lastHeadingBottom;

      tocContainer.classList.toggle("toc-visible", shouldShow);
    });
  }

  // Collapse arrow animation
  if (collapseEl && arrow) {
    collapseEl.addEventListener("show.bs.collapse", () => {
      arrow.classList.add("rotate-up");
      arrow.classList.remove("rotate-down");
    });

    collapseEl.addEventListener("hide.bs.collapse", () => {
      arrow.classList.add("rotate-down");
      arrow.classList.remove("rotate-up");
    });
  }

  // Close collapse when clicking TOC link
  document.querySelectorAll(".toc-links a").forEach(link => {
    link.addEventListener("click", () => {
      const bsCollapse =
        bootstrap.Collapse.getInstance(collapseEl) ||
        new bootstrap.Collapse(collapseEl, { toggle: false });

      bsCollapse.hide();
    });
  });

  // Share button
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const shareData = {
        title: document.title,
        url: window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log("Share cancelled");
        }
      } else {
        navigator.clipboard.writeText(shareData.url);
      }
    });
  }

  // Copy button
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);

        const span = copyBtn.querySelector("span");
        if (span) {
          span.textContent = "Copied!";
          setTimeout(() => {
            span.textContent = "Copy";
          }, 2000);
        }
      } catch (err) {
        console.error("Copy Failed", err);
      }
    });
  }

});
