// Will return whether the current environment is in a regular browser
// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

// Basic no operation function
export const noop = () => {};

export const getImage = (image: string | undefined, mugshot: string | undefined) => {
    if (image && image !== "") return image;
    if (mugshot && mugshot !== "") return `data:image/png;base64, ${mugshot}`;
    return "";
}
