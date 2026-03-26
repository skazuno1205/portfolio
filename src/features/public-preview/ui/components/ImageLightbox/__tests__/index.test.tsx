import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ImageLightbox } from "..";

describe("ImageLightbox", () => {
  it("renders the preview image and closes from both controls", () => {
    const onClose = vi.fn();

    render(
      <ImageLightbox
        image={{ alt: "preview image", src: "/images/preview.png" }}
        onClose={onClose}
      />,
    );

    expect(
      screen.getByRole("dialog", { name: "作品画像プレビュー" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "preview image" })).toHaveAttribute(
      "src",
      "/images/preview.png",
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "背景を押して作品画像プレビューを閉じる",
      }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "作品画像プレビューを閉じる" }),
    );

    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
