"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

interface HotPlateImageClientProps {
  imageUrl: string;
  menuPdfUrl: string | null;
  caption?: string;
}

function downloadUrl(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function DownloadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 3h6v6" />
      <path d="m21 3-7 7" />
      <path d="M9 21H3v-6" />
      <path d="m3 21 7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const iconButtonClass =
  "flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-green-dark shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] transition-[background,transform] hover:-translate-y-0.5 hover:bg-white";

export default function HotPlateImageClient({
  imageUrl,
  menuPdfUrl,
  caption,
}: HotPlateImageClientProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const altText = caption ?? "This month's hot plate special menu";
  const downloadUrlValue = menuPdfUrl ?? imageUrl;
  const downloadFilename = menuPdfUrl
    ? "hot-plate-menu.pdf"
    : "hot-plate-menu.jpg";

  function handleDownload(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    downloadUrl(downloadUrlValue, downloadFilename);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
        aria-label={`View larger: ${altText}`}
      >
        <img
          src={imageUrl}
          alt={altText}
          className="relative block w-full border border-green-dark/8 transition-[opacity,transform] duration-200 group-hover:opacity-95 group-hover:scale-[1.01]"
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-green-dark/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-green-dark shadow-[0_8px_20px_-6px_rgba(0,0,0,0.35)]">
            <ExpandIcon />
          </span>
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] h-[100dvh] w-screen bg-black"
            onClick={() => setOpen(false)}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              className="relative h-full w-full outline-none"
              onClick={(event) => event.stopPropagation()}
            >
              <span id={titleId} className="sr-only">
                {altText}
              </span>

              <img
                src={imageUrl}
                alt={altText}
                className="h-full w-full object-contain"
              />

              <div className="absolute top-4 right-4 z-10 flex gap-2.5 sm:top-6 sm:right-6">
                <button
                  type="button"
                  onClick={handleDownload}
                  className={iconButtonClass}
                  aria-label="Download menu"
                >
                  <DownloadIcon />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={iconButtonClass}
                  aria-label="Close preview"
                >
                  <CloseIcon />
                </button>
              </div>

              {caption && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 pt-16 pb-6 sm:px-10 sm:pb-8">
                  <p className="mx-auto max-w-[640px] text-center font-bricolage text-sm font-bold text-white/90 sm:text-base">
                    {caption}
                  </p>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
