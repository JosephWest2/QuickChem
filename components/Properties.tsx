import styles from "./Properties.module.css"

export default function Properties({SDS}:{SDS:any}) {

    const properties:Array<any> | undefined = SDS.Record.Section.find((section:any) => section.TOCHeading === "Chemical and Physical Properties")
    ?.Section;

    const computedProperties:Array<any> | undefined = properties?.find((section:any) => section.TOCHeading === "Computed Properties")
    ?.Section;

    const molecularWeight:string | undefined = computedProperties?.find((section:any) => section.TOCHeading === "Molecular Weight")
    ?.Information[0].Value.StringWithMarkup?.[0].String

    const exactMass:string | undefined = computedProperties?.find((section:any) => section.TOCHeading === "Exact Mass")
    ?.Information[0].Value.StringWithMarkup?.[0].String

    const experimentalProperties:Array<any> | undefined = properties?.find((section:any) => section.TOCHeading === "Experimental Properties")
    ?.Section;

    const boilingPoint:string | undefined = experimentalProperties?.find((section:any) => section.TOCHeading === "Boiling Point")
    ?.Information.find((reference:any) => reference.Value.StringWithMarkup?.[0].String.includes("°C"))
    ?.Value.StringWithMarkup[0].String

    const meltingPoint:string | undefined = experimentalProperties?.find((section:any) => section.TOCHeading === "Melting Point")
    ?.Information.find((reference:any) => reference.Value?.StringWithMarkup?.[0].String.includes("°C"))
    ?.Value.StringWithMarkup[0].String

    const density:string | undefined = experimentalProperties?.find((section:any) => section.TOCHeading === "Density")
    ?.Information.find((reference:any) => reference.Value.StringWithMarkup?.[0].String.includes("°C"))
    ?.Value.StringWithMarkup[0].String

    
    return (
        <div style={{gridArea:"Properties", display:"grid", gridTemplateColumns:"auto auto", gap:"0.5rem", gridTemplateRows:"auto", padding: "1rem", borderRadius:"0.5rem", backgroundColor:"whitesmoke", alignContent:"start", boxShadow: "2px 2px 5px rgba(0,0,0,0.4)"}}>
            <h4 className={styles.tableValue}>Molecular Weight:</h4>
            <h4 className={styles.tableValue}>{molecularWeight}</h4>
            <h4 className={styles.tableValue}>Exact Mass:</h4>
            <h4 className={styles.tableValue}>{exactMass}</h4>
            <h4 className={styles.tableValue}>BP:</h4>
            <h4 className={styles.tableValue}>{boilingPoint}</h4>
            <h4 className={styles.tableValue}>MP:</h4>
            <h4 className={styles.tableValue}>{meltingPoint}</h4>
            <h4 className={styles.tableValue}>Density:</h4>
            <h4 className={styles.tableValue}>{density}</h4>
        </div>
    )

}