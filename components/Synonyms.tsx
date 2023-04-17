export default function Synonyms({ SDS }: {SDS:any}) {

    const synonyms = new Array()

    SDS.Record.Section.find((section:any) => section.TOCHeading === "Names and Identifiers")
    ?.Section.find((section:any) => section.TOCHeading === "Synonyms")
    ?.Section.find((section:any) => section.TOCHeading === "Depositor-Supplied Synonyms")
    ?.Information[0].Value.StringWithMarkup.forEach((element:any) => {
        synonyms.push(<p>{element.String}</p>)
    })

    return (
        <div style={{gridArea:"Synonyms"}}>{...synonyms}</div>
    )
}