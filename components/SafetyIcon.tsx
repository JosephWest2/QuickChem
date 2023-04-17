export default function SafetyIcon({ imageSource, description }: {imageSource:string, description:string}) {
    return (
        <div style={{backgroundColor:"whitesmoke", borderRadius:"0.5rem", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding: "0.5rem", margin: "0.5rem"}}>
            <img src={imageSource}></img>
            <p style={{}}>{description}</p>
        </div>
    )
}