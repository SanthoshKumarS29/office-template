document.querySelector(".scroll-related-btn")
  .addEventListener("click", () => {
    document.querySelector("#related-services")
      .scrollIntoView({ behavior: "smooth" });
});
