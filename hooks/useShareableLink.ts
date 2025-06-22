"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";

export function useShareableLink() {
    const [link, setLink] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    }, []);

    const generateLink = useCallback(async () => {
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (res.status === 401) return (window.location.href = "/login");
            if (res.status !== 200) return toast.error("Failed to generate link");

            const data = await res.json();
            if (!data.shareToken) return toast.error("Invalid response from server");

            const baseUrl = window.location.origin;
            setLink(`${baseUrl}/student-data/${encodeURIComponent(data.shareToken)}`);
            toast.success("Link generated");
        } catch (err) {
            toast.error("Network error while generating link");
        }
    }, []);

    const downloadQR = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return toast("QR not ready.");
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-code.png";
        a.click();
    }, []);

    const shareQR = useCallback(async () => {
        const canvas = canvasRef.current;
        if (!canvas) return toast("QR not ready.");

        const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), "image/png");
        });

        if (!blob) return toast("Failed to create image.");
        const file = new File([blob], "qr-code.png", { type: "image/png" });

        if (navigator.canShare?.({ files: [file] })) {
            try {
                await navigator.share({
                    title: "QR Code Link",
                    text: "Scan this QR to view the shared student data.",
                    files: [file],
                });
            } catch {
                toast("Share cancelled");
            }
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(link)}`, "_blank");
        }
    }, [link]);

    return {
        link,
        isMobile,
        canvasRef,
        generateLink,
        downloadQR,
        shareQR,
    };
}