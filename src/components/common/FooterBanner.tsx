import React from 'react'


function FooterBanner() {
    return (
        <section className="border-t border-slate-100 py-10 lg:py-20">
            <div className="shell">
                {/* ---------- Header ---------- */}
                <div className="text-center mx-auto mb-12">
                    {/* <p className="text-rose-600 font-bold text-sm tracking-wide mb-3">STUDENT TESTIMONIALS</p> */}
                    <h2 className="section-title text-7xl max-sm:text-3xl leading-tight">
                        Dont be Like: {" "}
                        <span className="text-rose-600">I Will Start Tomorrow</span>
                    </h2>
                </div>
                <div className="w-[50vw] max-sm:w-full h-[45vh] max-sm:h-[25vh] p-5 mx-auto">
                    <img src={`${import.meta.env.BASE_URL}images/course-detail-asset/footer-banner-desk.png`}
                        alt="Taxation & Compliance Course Banner"
                        className="w-full h-full object-fit"
                    />
                </div>
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="section-title text-3xl max-sm:text-xl leading-tight">
                        <span className="text-blue-800">Tomorrow:</span> You has the same brain, the same energy
                        <span className="text-rose-600"> ... but double the work.</span>
                    </h2>
                </div>
            </div>
        </section>
    )
}



export default FooterBanner