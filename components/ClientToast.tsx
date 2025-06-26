"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import type { TypeOptions } from "react-toastify";

type ToastProps = {
    type: Exclude<TypeOptions, 'default'>;
    message: string;
};

export const Toast = ({ type, message }: ToastProps) => {
    useEffect(() => {
        toast[type](message);
    }, [type, message]);

    return null;
}
