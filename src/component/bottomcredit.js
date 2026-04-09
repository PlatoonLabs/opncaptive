import './bottomcredit.css'

export default function BottomCredits() {
    return (
        <div className="flex justify-center items-center gap-10 bc">
            <a className="deciso-brand relative" href="https://deciso.com" target="_blank" rel="noopener">
                <img className="regular-logo" src="/deciso-brand.svg" />
                <img className="hover-logo" src="/deciso-brand-hover.svg" />
            </a>
            <a className="ptl-brand relative" href="https://platoonlabs.com" target="_blank" rel="noopener">
                <img className="regular-logo" src="/platoonlabslogo1text.svg" />
                <img className="hover-logo" src="/platoonlabslogo1texti.svg" />
            </a>
        </div>
    )
}