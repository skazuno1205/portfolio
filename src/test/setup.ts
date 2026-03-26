import "@testing-library/jest-dom/vitest";

class MockIntersectionObserver {
  disconnect() {}

  observe() {}

  unobserve() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  configurable: true,
  writable: true,
  value: MockIntersectionObserver,
});
