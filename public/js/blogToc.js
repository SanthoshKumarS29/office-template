document.addEventListener("DOMContentLoaded", () => {

  const tocContainer = document.querySelector(".blog-toc-container");
  const toc = document.getElementById("toc");
  const content = document.querySelector(".blog-content");
  const collapseEl = document.getElementById("collapseExample");
  const arrow = document.querySelector(".toc-arrow");
  const shareBtn = document.querySelector(".blog-share-btn");
  const copyBtn = document.querySelector(".blog-copy-btn");

  if (!toc || !content) return;

  const headings = content.querySelectorAll("h3");
  if (headings.length === 0) return;

  // Build TOC
  headings.forEach(heading => {
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;

    a.addEventListener("click", () => {
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl)
        || new bootstrap.Collapse(collapseEl, { toggle: false });

      bsCollapse.hide(); // close collapse
    });

    li.appendChild(a);
    toc.appendChild(li);
  });

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

  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      url: window.location.href,
      // text: document.querySelector("meta[name='description']")?.content || "",
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("share cancelled")
      }
    } else {
      copyToClipBoard(shareData.url);
    }
  })

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text)
  }

  copyBtn.addEventListener("click", async () => {
    try{
      // const url =
      //   document.querySelector("link[rel='canonical']")?.href ||
      //   window.location.href;
      const url = window.location.href;

      await navigator.clipboard.writeText(url);

      copyBtn.querySelector("span").textContent = "Copied!"
      setTimeout(() => {
        copyBtn.querySelector("span").textContent = "Copy"
      }, 2000)
    } catch (err) {
      console.error("Copy Failed", err)
    }


  })

});
