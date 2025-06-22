import { Mail, MessageSquareText, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { shareNative } from "./ShareNativeUtil";


export default function DesktopShareOptions({ link }: { link: string }) {
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
                onClick={async () => { try { await shareNative(link); } catch (error) { } }}
                className="flex justify-start gap-2"
            >
                <Share2 size={16} />
                Other
            </Button>
        </div>
    );
}