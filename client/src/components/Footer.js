import { useState } from "react"


const Footer = () => {
    const [height, setHeight] = useState("100px")

    return (
        <>
        <div style={{zIndex:"1", height:height}}/>
        <div id="Footer" className="footer">
            {(e) => setHeight(e.style.height)}
            <p>Matkollen</p>
        </div>
        </>
    )
}

export default Footer
