import { afterEach, describe, expect, it, vi } from "vitest";

const renderMock = vi.fn();
const createRootMock = vi.fn(() => ({
  render: renderMock,
}));

vi.mock("react-dom/client", () => ({
  default: {
    createRoot: createRootMock,
  },
}));

vi.mock("../app/App", () => ({
  App: () => <div data-testid="app-root">App Root</div>,
}));

vi.mock("@google/model-viewer", () => ({}));

describe("main", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    renderMock.mockClear();
    createRootMock.mockClear();
    vi.resetModules();
  });

  it("mounts the app into the root element", async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await import("../main");

    expect(createRootMock).toHaveBeenCalledWith(
      document.getElementById("root"),
    );
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});
