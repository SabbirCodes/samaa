"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Copy, Facebook, Twitter, Instagram } from "lucide-react";

interface ShareButtonProps {
  blogSlug: string;
}

export default function ShareButton({ blogSlug }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const shareUrl = `${window.location.origin}/blog/${blogSlug}`;

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    showToastNotification("Link copied to clipboard");
    setIsOpen(false);
  };

  const shareToSocial = (platform: string) => {
    // In a real app, this would open the respective sharing API
    showToastNotification(`Shared to ${platform}`);
    setIsOpen(false);
  };

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
      >
        <Share2 size={20} />
      </button>

      {/* Custom Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in duration-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share this in</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4 justify-center mb-6">
              <button
                onClick={() => shareToSocial("Facebook")}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100"
                aria-label="Share to Facebook"
              >
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-3 rounded-full"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <span className="text-sm">Facebook</span>
              </button>

              <button
                onClick={() => shareToSocial("Twitter")}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100"
                aria-label="Share to Twitter"
              >
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-500 text-white p-3 rounded-full"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <span className="text-sm">Twitter</span>
              </button>

              <button
                onClick={() => shareToSocial("Instagram")}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100"
                aria-label="Share to Instagram"
              >
                <a
                  href={`https://www.instagram.com/?url=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white p-3 rounded-full"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <span className="text-sm">Instagram</span>
              </button>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or copy link
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex-1 rounded-md border px-3 py-2 text-sm truncate">
                {shareUrl}
              </div>
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg animate-in slide-in-from-bottom-5 duration-300 z-50">
          {toastMessage}
        </div>
      )}
    </>
  );
}
