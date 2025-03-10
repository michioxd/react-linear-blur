import React from "react";

export interface LinearBlurProps {
    direction?: "horizontal" | "vertical";
    strength?: number;
    offset?: number;
    width?: number;
    height?: number;
    elementProps?: React.HTMLProps<HTMLDivElement>;
    children?: React.ReactNode;
}