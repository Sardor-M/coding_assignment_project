import React from 'react';

export interface HeaderProps {
    title?: string;
    className?: string;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
    ({ title = '지원자분 성함을 적어주세요', className = '' }, ref) => {
        return (
            <>
                {/* Mobile Header */}
                <header
                    ref={ref}
                    className={`flex h-[52px] items-center justify-center gap-2.5 px-5 py-[17px] relative w-full bg-transparent md:hidden z-10 ${className}`}
                >
                    <div className="font-pretendard font-medium text-white text-sm tracking-[-0.30px] leading-[21.0px] relative flex-1 text-center">
                        {title}
                    </div>
                </header>

                {/* Desktop Header - Hidden on mobile */}
                <div className="hidden md:block px-4 py-6 w-full relative z-10">
                    <p className="text-lg text-white text-center">{title}</p>
                </div>
            </>
        );
    }
);

Header.displayName = 'Header';
