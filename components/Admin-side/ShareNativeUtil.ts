export const shareNative = async (link: string) => {
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