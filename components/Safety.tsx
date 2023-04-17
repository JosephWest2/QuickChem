import SafetyIcon from "./SafetyIcon";


export default function getSafetyArray({SDS}:{SDS:any}) {
    const safetyIcons = new Array();
    const safetyCodes = new Array();
    const error = <h3 style={{gridArea:"Safety", backgroundColor:"whitesmoke", borderRadius:"0.5rem", padding:"1rem", boxShadow: "2px 2px 5px rgba(0,0,0,0.4)"}}>No GHS safety codes found</h3>

    const safetyInformation = SDS.Record.Section.find((section:any) => section.TOCHeading === "Safety and Hazards")
    ?.Section.find((safetySection:any) => safetySection.TOCHeading === "Hazards Identification")
    ?.Section.find((hazardsSection:any) => hazardsSection.TOCHeading === "GHS Classification")
    ?.Information;

    if (safetyInformation == null) {return error}


    const markup = safetyInformation[0].Value.StringWithMarkup?.[0].Markup;
    if (markup == null) {return error}
    safetyInformation[0].Value.StringWithMarkup?.[0].Markup.forEach((GHSElement:any, index:number) => {
      safetyIcons.push(
        <SafetyIcon key={"GHS" + index} imageSource={GHSElement.URL} description={GHSElement.Extra}/>
      )
    })

    const safetyValue = safetyInformation[1].Value.StringWithMarkup[0].String
    safetyInformation[2].Value.StringWithMarkup.forEach((dangerElement:any, index:number) => {
      safetyCodes.push(
        <p key={"safety" + index}>{dangerElement.String}</p>
      )
    })

    return (
        <div style={{gridArea:"Safety", display:"flex", flexDirection:"column", borderRadius:"0.5rem", backgroundColor:"whitesmoke", padding:"1rem", boxShadow: "2px 2px 5px rgba(0,0,0,0.4)"}}>
            <div style={{display:"flex", flexDirection:"row"}}>{...safetyIcons}</div>
            <h3 style={{marginBottom:"0.5rem"}}>{safetyValue}</h3>
            <div style={{display:"flex", flexDirection:"column", gap:"0.2rem"}}>{...safetyCodes}</div>
        </div>
    );
  }