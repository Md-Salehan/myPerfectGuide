import React from 'react'

export function TagChip({title}: {title: string}) {
    return (
        <em className="not-italic rounded-full bg-[#F1F4F7] px-[12px] py-[5px]">
            {title}
        </em>
    )
}

export function TagChipList({tags}: {tags: string[]}) {
    return (
        <div className="mb-[6px] mt-[18px] flex flex-wrap gap-[8px] text-[13px] font-semibold text-[#1C2B33]">
            {tags.map((tag, index) => (
                tag && <TagChip key={index} title={tag} />
            ))}
        </div>
    )
}

