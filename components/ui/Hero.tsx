import classNames from "classnames";
import React from "react";

interface HeroProps {
    children: React.ReactNode;
}

interface HeroElementProps {
    children: React.ReactNode;
    className?: string;
}


export const HeroTitle = ({ children, className }: HeroElementProps) => {
    return (
        <h1
            className={classNames(
                "text-text-main mt-16 mb-10 text-5xl md:text-8xl",
                className
            )}
        >
            {children}
        </h1>
    );
};

export const HeroSubtitle = ({ children, className }: HeroElementProps) => {
    return (
        <p
            className={classNames(
                "mb-12 text-lg text-text-main-sub md:text-xl",
                className
            )}
        >
            {children}
        </p>
    );
};


export const Hero = ({ children }: HeroProps) => {
    return <div className="text-center min-h-screen">
        <div className="circular-fadeout grid h-full min-h-screen w-full place-items-center overflow-clip bg-black">
            <div
                className="relative grid h-full w-full place-items-center [grid-area:1/1]"
                role="figure"
            >
                <div
                    className="h-1/2 w-1/2 rotate-[var(--gradientRotation,12deg)] rounded-[3vw] bg-primary-gradient mix-blend-hard-light"></div>
                <div
                    className="absolute inset-0 rotate-[var(--glassRotation,-16deg)] scale-[2] bg-frost bg-[size:var(--glassSectionWidth,20px)] mix-blend-color-dodge backdrop-blur-[var(--blur,20px)]"></div>
            </div>
            <div className="[grid-area:1/1] z-10">
                {children}
            </div>
        </div>
    </div>;
};
