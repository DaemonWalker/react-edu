export default function isStringNullOrEmpty(str: string | undefined): boolean {
    if (str) {
        return str.length > 0;
    }
    else {
        return false;
    }
}
