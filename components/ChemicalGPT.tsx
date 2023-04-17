import styles from "./ChemicalGPT.module.css"
import { useState, useEffect } from "react"

export default function ChemicalGPT({ chemicalName }: {chemicalName:string}) {

    type ChemicalInfo = {
        Safety: Array<string>,
        Reactions: Array<string>,
        Equipment: Array<string>
    }

    const [chemicalInfo, setChemicalInfo] = useState<ChemicalInfo | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(() => {
        if (chemicalName === "") {return}

        setIsLoading(true)

        const dataFetch = async () => {
            const response = await fetch("/api/chemicalGPT", {
                method: "POST",
                body: chemicalName
            });

            const data = await response.json();
            const dataObj = JSON.parse(data);
            
            setChemicalInfo(dataObj);
            setIsLoading(false);
        }

        dataFetch();
    }, [chemicalName])
    


    return (<>
        <div className={styles.main}>
            <div className={styles.section}>
                <h4 className={styles.sectionHeaders} data-status={isLoading ? "inactive" : "active"}>Safety</h4>
                <ul className={styles.list} data-status={isLoading ? "inactive" : "active"}>
                    {chemicalInfo?.Safety.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.section}>
            <h4 className={styles.sectionHeaders} data-status={isLoading ? "inactive" : "active"}>Reactions</h4>
            <div className={styles.loadingElement} data-loading={isLoading ? "true" : "false"}></div>
            <h4 className={styles.loadingElement2} data-loading={isLoading ? "true" : "false"}>Loading</h4>
                <ul className={styles.list} data-status={isLoading ? "inactive" : "active"}>
                    {chemicalInfo?.Reactions.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.section}>
            <h4 className={styles.sectionHeaders} data-status={isLoading ? "inactive" : "active"}>Equipment</h4>
                <ul className={styles.list} data-status={isLoading ? "inactive" : "active"}>
                    {chemicalInfo?.Equipment.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    </>)
}