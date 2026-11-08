document.documentElement.classList.add("js-ready");
if (!("IntersectionObserver" in window)) {
  document.documentElement.classList.remove("js-ready");
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll("[data-reveal]").forEach((node, index) => {
    node.classList.add("reveal");
    node.style.setProperty("--delay", `${Math.min(index % 4, 3) * 60}ms`);
    revealObserver.observe(node);
  });
}
