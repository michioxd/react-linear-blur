import React from 'react';
import { LinearBlurProps } from './types';
import clsx from 'clsx';
import "./LinearBlur.css";

const LinearBlur = ({
    children,
    direction = "vertical",
    strength = 10,
    offset = 0,
    elementProps
}: LinearBlurProps) => {

    return (
        <div className={clsx(
            "lb-linear-blur",
            `lb-linear-blur--${direction}`,
            elementProps?.className
        )} {...elementProps}>
            {Array.from({ length: strength }).map((_, i) => (
                <div
                    key={i}
                    className={clsx(
                        "lb-linear-blur__layer",
                        `lb-linear-blur__layer--${direction}`,
                        `lb-linear-blur__layer--${i}`
                    )}
                    style={{
                        backdropFilter: `blur(${i}px)`
                    }}
                />
            ))}
        </div>
    )
}

export default LinearBlur;