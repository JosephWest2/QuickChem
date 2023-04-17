export default function Description({SDS}:{SDS:any}) {

    const title:string | undefined = SDS.Record.RecordTitle;

    const description:string | undefined = SDS.Record.Section.find((section:any) => section.TOCHeading === "Names and Identifiers")
    ?.Section.find((section:any) => section.TOCHeading === "Record Description")
    ?.Information.find((section:any) => section.Description === "Ontology Summary")
    ?.Value.StringWithMarkup?.[0].String;

    const molecularFormula:string | undefined = SDS.Record.Section.find((section:any) => section.TOCHeading === "Names and Identifiers")
    ?.Section.find((section:any) => section.TOCHeading === "Molecular Formula")
    ?.Information[0].Value.StringWithMarkup[0].String;

    let formulaArray = new Array();
    if (molecularFormula != undefined) {
        for (let char of molecularFormula) {
            if (/^\d$/.test(char)) {
                formulaArray.push(<sub>{char}</sub>)
            } else {
                formulaArray.push(<>{char}</>)
            }
        }
    }
    
    return (
        <>
            <h1 style={{gridArea:"Title"}}>{title} <span style={{color: "var(--color-primary )"}}>{...formulaArray}</span></h1>
            <p style={{gridArea:"Description", backgroundColor:"whitesmoke", borderRadius:"0.5rem", padding: "1rem", boxShadow: "2px 2px 5px rgba(0,0,0,0.4)"}}>{description}</p>
        </>
    )

}