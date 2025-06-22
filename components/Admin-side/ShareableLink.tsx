"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QRCodeCanvas } from "qrcode.react";
import { Share2, Download, ClipboardCopy, ExternalLinkIcon } from "lucide-react";
import { useShareableLink } from "@/hooks/useShareableLink";
import { toast } from "sonner";
import DesktopShareOptions from "@/components/Admin-side/ShareOptions";
import { shareNative } from "./ShareNativeUtil";

export default function ShareableLink() {
  const {
    link,
    isMobile,
    canvasRef,
    generateLink,
    downloadQR,
    shareQR,
  } = useShareableLink();

  return (
    <div className="mt-6 space-y-4">
      <Button onClick={generateLink}>Generate Shareable Link</Button>

      {link && (
        <div className="space-y-2">
          <label className="block font-medium">Shareable Link</label>
          <div className="flex gap-1 items-center">
            <Input
              value={link}
              readOnly
              className="flex-1 truncate"
              aria-label="Generated Shareable Link"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Share options">
                  <Share2 size={18} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-52 p-2">
                {isMobile && (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="flex justify-start gap-2"
                      onClick={() => shareNative(link)}
                    >
                      <Share2 size={16} />
                      Share Link
                    </Button>
                  </div>
                )}
                {!isMobile && (
                  <DesktopShareOptions
                    link={link}
                  />
                )}
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              onClick={() => { navigator.clipboard.writeText(link); toast.success("Link copied to clipboard"); }}
              aria-label="Copy link to clipboard"
            >
              <ClipboardCopy size={16} />
            </Button>
            {/* redirect button */}
            <Button
              variant="ghost"
              asChild
              aria-label="Open link in new tab"
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-4 border rounded p-4 bg-white w-fit shadow-sm">
            <QRCodeCanvas
              value={link}
              size={150}
              id="qr-canvas"
              className="mx-auto"
              ref={canvasRef}
            />

            <div className="mt-2 flex gap-2">
              <Button
                variant="ghost"
                onClick={downloadQR}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download QR
              </Button>

              <Button
                variant="ghost"
                onClick={shareQR}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Share2 size={16} />
                Share QR
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}