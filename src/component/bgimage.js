import './bgimage.css'

export default function BGImage({ src = '/backgrounds/default.jpg' }) {
    return (
        <div
            className="bg-layer"
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden="true"
        />
    )
}