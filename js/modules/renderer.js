/**
 * تابع رندرینگ سراسری (Renderer)* محتوای جدید را در یک المان والد تزریق می‌کند.
 * * @param {HTMLElement} mountEl - عنصر DOM والد برای تزریق محتوا.
 * @param {string|Node|Array<string|Node>} content - محتوای جدید.
 * @param {Object} store - وضعیت سراسری برنامه (اختیاری).
 * @param {function(HTMLElement, Object): void} [afterRenderCallback] - تابعی که پس از رندر اجرا می‌شود (برای اتصال رویدادها).
 */
// renderer.js
/**
 * render(mountEl, content, options)
 * content: string | Node | DocumentFragment
 * options: { enterClass, leaveClass, keepScroll }
 */ 
export async function render(mountEl, content,store, options = {}) {
  if (!mountEl) throw new Error("mountEl required");
  mountEl.innerHTML = "";

  const {
    enterClass = "page-enter",
    leaveClass = "page-leave",
    keepScroll = false,
  } = options;

  // create new wrapper
  const newNode = document.createElement("div");
  newNode.classList.add("page-wrapper");

  // accept different content types
  if (typeof content === "string") {
    newNode.innerHTML = content;
  } else if (content instanceof Node) {
    newNode.appendChild(content);
  } else if (content instanceof DocumentFragment) {
    newNode.appendChild(content);
  } else {
    // throw new Error("Unsupported content type for renderer");
  }

  // transition: leave old -> enter new
  const old = mountEl.querySelector(".page-wrapper");
  if (old) {
    old.classList.add(leaveClass);
    // when leave finished remove
    old.addEventListener(
      "animationend",
      () => {
        if (old && old.parentNode) old.parentNode.removeChild(old);
      },
      { once: true }
    );
  }

  // prepare enter
  newNode.classList.add(enterClass);
  mountEl.appendChild(newNode);

  // cleanup enter class after animation
  newNode.addEventListener(
    "animationend",
    () => {
      newNode.classList.remove(enterClass);
    },
    { once: true }
  );

  if (!keepScroll) window.scrollTo(0, 0);
}

 