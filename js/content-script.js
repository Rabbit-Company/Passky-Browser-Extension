chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Security check: Only allow messages from the same extension (Passky)
  if (sender.id !== chrome.runtime.id) return;

  const { username, password } = request;
  if (username == null || password == null) return;

  const inputs = findAllInputs();

  const usernameField = findBestInput(inputs, scoreUsernameInput);
  const passwordField = findBestInput(inputs, scorePasswordInput);

  if (usernameField) setInputValue(usernameField, username);
  if (passwordField) setInputValue(passwordField, password);
});

/**
 * Finds all input elements, including those in open shadow dom
 * and same-origin iframes.
 */
function findAllInputs(root = document, results = []) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    null
  );

  let node;
  while ((node = walker.nextNode())) {
    if (node.tagName === "INPUT") {
      results.push(node);
    }

    if (node.shadowRoot) {
      findAllInputs(node.shadowRoot, results);
    }
  }

  if (root === document) {
    for (const iframe of document.querySelectorAll("iframe")) {
      try {
        const doc = iframe.contentDocument;
        if (doc) findAllInputs(doc, results);
      } catch {}
    }
  }

  return results;
}

/**
 * Finds the input with the highest score according to the scoring function.
 * Returns null if no valid candidate is found (all scores <= 0).
 */
function findBestInput(inputs, scoreFn) {
  let bestInput = null;
  let bestScore = 0;

  for (const input of inputs) {
    if (!isVisible(input)) continue;

    const score = scoreFn(input);
    if (score > bestScore) {
      bestScore = score;
      bestInput = input;
    }
  }

  return bestInput;
}

/**
 * Scores an input element for how likely it is to be a username/email field.
 * Higher score = better match. Score of 0 or less = not a valid candidate.
 */
function scoreUsernameInput(input) {
  const type = input.type?.toLowerCase() || '';
  const name = input.name?.toLowerCase() || '';
  const id = input.id?.toLowerCase() || '';
  const autocomplete = input.autocomplete?.toLowerCase() || '';
  const placeholder = input.placeholder?.toLowerCase() || '';

  // Must be a text-like input
  if (type !== 'text' && type !== 'email' && type !== '') return 0;

  // Honeypot detection
  if (name.includes('fake') || id.includes('fake')) return 0;
  if (input.style.display === 'none' || input.style.visibility === 'hidden') return 0;

  let score = 1; // Base score for being a valid text input

  // Autocomplete hints (strongest signal)
  if (autocomplete === 'username') score += 50;
  if (autocomplete === 'email') score += 45;

  // Type hints
  if (type === 'email') score += 30;

  // Name/id hints
  const identifier = `${name} ${id}`;
  if (identifier.includes('username')) score += 25;
  if (identifier.includes('user') && !identifier.includes('username')) score += 20;
  if (identifier.includes('email')) score += 20;
  if (identifier.includes('login')) score += 15;
  if (identifier.includes('account')) score += 10;

  // Placeholder hints
  if (placeholder.includes('username')) score += 15;
  if (placeholder.includes('email')) score += 15;
  if (placeholder.includes('user')) score += 10;

  // Negative signals
  if (identifier.includes('search')) score -= 50;
  if (identifier.includes('query')) score -= 50;
  if (identifier.includes('firstname') || identifier.includes('first_name')) score -= 30;
  if (identifier.includes('lastname') || identifier.includes('last_name')) score -= 30;
  if (identifier.includes('phone')) score -= 30;

  return score;
}

/**
 * Scores an input element for how likely it is to be a password field.
 * Higher score = better match. Score of 0 or less = not a valid candidate.
 */
function scorePasswordInput(input) {
  const type = input.type?.toLowerCase() || '';
  const name = input.name?.toLowerCase() || '';
  const id = input.id?.toLowerCase() || '';
  const autocomplete = input.autocomplete?.toLowerCase() || '';

  // Must be a password input
  if (type !== 'password') return 0;

  // Honeypot detection
  if (name.includes('fake') || id.includes('fake')) return 0;

  let score = 1; // Base score for being a password input

  // Autocomplete hints (strongest signal)
  if (autocomplete === 'current-password') score += 50;
  if (autocomplete === 'password') score += 40;

  // Name/id hints for login password
  const identifier = `${name} ${id}`;
  if (identifier.includes('login')) score += 20;
  if (identifier.includes('password')) score += 15;
  if (identifier.includes('current')) score += 10;

  // Negative signals (registration/change password forms)
  if (autocomplete === 'new-password') score -= 40;
  if (identifier.includes('new')) score -= 30;
  if (identifier.includes('confirm')) score -= 50;
  if (identifier.includes('repeat')) score -= 50;
  if (identifier.includes('retype')) score -= 50;
  if (identifier.includes('register')) score -= 20;
  if (identifier.includes('signup')) score -= 20;

  return score;
}

/**
 * Checks if an element is visible and usable in the DOM.
 */
function isVisible(el) {
  if (!el || !(el instanceof Element)) return false;

  const style = getComputedStyle(el);

  if (style.display === 'none') return false;
  if (style.visibility === 'hidden' || style.visibility === 'collapse') return false;
  if (parseFloat(style.opacity) === 0) return false;

  // Interaction-disabled elements are effectively invisible
  if (style.pointerEvents === 'none') return false;

  // ARIA / accessibility-based hiding (common honeypot technique)
  if (el.getAttribute('aria-hidden') === 'true') return false;
  if (el.tabIndex === -1 && !el.hasAttribute('tabindex')) return false;

  // Check for near-zero size and completely offscreen elements (common honeypot)
  const rect = el.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  if (rect.width < 4 || rect.height < 4) return false;
  if (rect.bottom < 0 || rect.right < 0 || rect.top > viewportHeight || rect.left > viewportWidth) return false;

  return true;
}

/**
 * Sets the value of an input element, simulating real user input
 * to work with React/Vue/Angular and other frameworks.
 */
function setInputValue(input, value) {

  // Focus the input element
  input.focus();

  // Get the input element's native setter, if possible.
  const setter =
    Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(input),
      "value"
    )?.set ||
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    )?.set;

  // Set value using native setter, if possible,
  // otherwise set directly.
  setter
    ? setter.call(input, value)
    : (input.value = value);

  // Dispatch an "input" event on the input element.
  let event;
  try {
    event = new InputEvent("input", {
      bubbles: true,
      inputType: "insertText",
      data: value,
    });
  } catch {
    event = new Event("input", { bubbles: true });
  }
  input.dispatchEvent(event);

  // Remove focus
  input.blur();

  // Dispatch a "change" event on the input element.
  input.dispatchEvent(new Event("change", { bubbles: true }));
}
