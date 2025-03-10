import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { LinearBlurProps, RLBBlurObj } from './types';
import clsx from 'clsx';
import "./LinearBlur.scss";

const LinearBlur = forwardRef<HTMLDivElement, LinearBlurProps>(({
    children,
    direction = "vertical",
    strength = 10,
    offset = 0,
    by = "pixel",
    elementProps
}, ref) => {

    const [size, setSize] = useState({ width: 0, height: 0 });
    const internalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => internalRef.current!);

    const obj = useMemo<RLBBlurObj>(() => {
        if (by === "strength") {
            return Array.from({ length: strength }).map((_, i) => i + 1);
        }

        const sz = direction === "horizontal" ? size.width : size.height;

        return Array.from({ length: sz }).map((_, i) =>
            i / sz * strength
        );
    }, [strength, offset, direction, by, size]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setSize({ width, height });
        });

        resizeObserver.observe(internalRef.current!);

        return () => {
            resizeObserver.disconnect();
        }
    }, []);

    return (
        <div {...elementProps} className={clsx(
            "lb-linear-blur",
            `lb-linear-blur--${direction}`,
            `lb-linear-blur--${by}`,
            elementProps?.className
        )} ref={internalRef}>
            {obj.map((d, i) => (
                <div
                    key={i}
                    className={clsx(
                        "lb-linear-blur__layer",
                        `lb-linear-blur__layer--${direction}`,
                        `lb-linear-blur__layer--${i}`
                    )}
                    style={{
                        backdropFilter: `blur(${d}px)`
                    }}
                />
            ))}
        </div>
    )
});

export default LinearBlur;