import React from 'react'

type bannerImage = {
  srcDesk: string;
  srcMob: string;
  alt: string;
};
interface BannerProps {
  /** Optional className for the banner container. */
  className?: string;
  imageArray: bannerImage[];
}

function Banner({ imageArray }: BannerProps) {
  return (
    
    <div className="w-full h-[80vh] p-5">
        <picture>
            <source media="(max-width: 767px)" srcSet={imageArray[0].srcMob} />
            <source media="(min-width: 768px)" srcSet={imageArray[0].srcDesk} />
            <img
                src={imageArray[0].srcMob}
                alt={imageArray[0].alt}
                className="w-full h-full object-fit"
                loading="lazy"
            />
        </picture>
    </div>
  )
}



export default Banner