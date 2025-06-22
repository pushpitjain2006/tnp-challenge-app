import { Mail, MessageSquareText, Share2 } from "lucide-react";
import { Button } from "../ui/button";

type ShareOptionsProps = {
    link: string;
    isMobile: boolean;
};

export default function ShareOptions({ link, isMobile }: ShareOptionsProps) {
    const shareNative = async () => {
        if (!navigator.share) return;

        try {
            await navigator.share({
                title: "Shared Link",
                text: "View the shared student data:",
                url: link,
            });
        } catch (err) {
            console.error("Native share cancelled or failed", err);
        }
    };

    if (isMobile) {
        return (
            <div className="flex flex-col gap-2">
                <Button
                    variant="outline"
                    className="flex justify-start gap-2"
                    onClick={shareNative}
                >
                    <Share2 size={16} />
                    Share Link
                </Button>
            </div>
        );
    }

    // Fallback for desktop
    return (
        <div className="flex flex-col gap-2">
            <Button
                variant="outline"
                onClick={() =>
                    window.open(`mailto:?body=${encodeURIComponent(link)}`)
                }
                className="flex justify-start gap-2"
            >
                <Mail size={16} />
                Mail
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    window.open(`https://wa.me/?text=${encodeURIComponent(link)}`)
                }
                className="flex justify-start gap-2"
            >
                <MessageSquareText size={16} />
                WhatsApp
            </Button>
            {/* Other share options , navigator.share */}
            <Button
                variant="outline"
                onClick={async () => { try { await shareNative(); } catch (error) { } }}
                className="flex justify-start gap-2"
            >
                <Share2 size={16} />
                Other
            </Button>
        </div>
    );
}