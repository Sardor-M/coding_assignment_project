import React from 'react';

export type InfoField = {
    label: string;
    value: string | number;
    isUrl?: boolean;
    href?: string;
};

export type InfoCardProps = {
    fields: InfoField[];
    className?: string;
    grouped?: boolean;
};

export const InfoCard: React.FC<InfoCardProps> = ({ fields, className = '' }) => {
    const groupedFields: InfoField[][] = [];

    for (let i = 0; i < fields.length; i += 2) {
        groupedFields.push(fields.slice(i, i + 2));
    }

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {groupedFields.map((group, groupIndex) => (
                <div key={groupIndex} className="flex flex-col gap-4 p-5 bg-white rounded-2xl">
                    <div className="flex flex-col gap-4 md:hidden">
                        {group.map((field, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <div className="font-medium text-[#111111] text-[15px] leading-[21px]">
                                    {field.label}
                                </div>
                                {field.isUrl && field.href ? (
                                    <a
                                        href={field.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#111111] opacity-50 text-[15px] leading-[21px] underline break-all"
                                    >
                                        {field.value}
                                    </a>
                                ) : (
                                    <div className="text-[#111111] opacity-50 text-[15px] leading-[21px]">
                                        {typeof field.value === 'number'
                                            ? field.value.toLocaleString()
                                            : field.value}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Mode*/}
                    <div className="hidden md:block">
                        {groupIndex < 2 ? (
                            <div className="flex flex-row gap-8">
                                {group.map((field, index) => (
                                    <div key={index} className="flex flex-col gap-1 flex-1">
                                        <div className="font-medium text-[#111111] text-[15px] leading-[21px]">
                                            {field.label}
                                        </div>
                                        <div className="text-[#111111] opacity-50 text-[15px] leading-[21px]">
                                            {typeof field.value === 'number'
                                                ? field.value.toLocaleString()
                                                : field.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {group.map((field, index) => (
                                    <div key={index} className="flex flex-col gap-1">
                                        <div className="font-medium text-[#111111] text-[15px] leading-[21px]">
                                            {field.label}
                                        </div>
                                        <a
                                            href={field.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#111111] opacity-50 text-[15px] leading-[21px] underline break-all"
                                        >
                                            {field.value}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
