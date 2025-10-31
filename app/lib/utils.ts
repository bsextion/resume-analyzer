export function formatSize(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';

    const KB = 1024;
    const MB = KB * 1024;
    const GB = MB * 1024;

    const format = (value: number) => {
        const s = value.toFixed(2);
        return s.replace(/\.00$|(\.\d)0$/, '$1'); // remove trailing .00 or trailing zero in one-decimal values
    };

    if (bytes < KB) return `${bytes} B`;
    if (bytes < MB) return `${format(bytes / KB)} KB`;
    if (bytes < GB) return `${format(bytes / MB)} MB`;
    return `${format(bytes / GB)} GB`;
}