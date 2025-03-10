import React from "react";

export interface LinearBlurProps {
    // The direction of the blur effect
    direction?: "horizontal" | "vertical";
    strength?: number;
    offset?: number;
    by?: "pixel" | "strength";
    elementProps?: React.HTMLProps<HTMLDivElement>;
    children?: React.ReactNode;
}

export type RLBBlurObj = number[];