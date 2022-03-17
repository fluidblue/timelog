export interface ToastOptions {
    autohide?: boolean;
    delay?: number;
}

export interface Toast {
    header?: string;
    body: string;

    options?: ToastOptions;
}
