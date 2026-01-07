"use client";

import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroller({ children }: { children: React.ReactNode }) {
    return (
        // @ts-ignore
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
