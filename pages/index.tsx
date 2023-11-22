import Head from 'next/head'
import { Inter } from 'next/font/google'
import ChemicalGPT from '@/components/ChemicalGPT'
import Safety from '@/components/Safety'
import Properties from '@/components/Properties'
import Description from '@/components/Description'
import { useEffect, useState } from 'react'
import styles from "./index.module.css"

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const [chemicalName, setChemicalName] = useState<string>("benzene");
  const [chemicalNameInput, setChemicalNameInput] = useState<string>("");
  const [validatedChemicalName, setValidatedChemicalName] = useState<string>("");
  const [SDS, setSDS] = useState<any>();
  const [chemCID, setChemCID] = useState<string | undefined>();
  const [chemImgSrc, setChemImgSrc] = useState<string>();
  const [searchError, setSearchError] = useState<boolean>(false);

  async function fetchSet(url:string, setter:Function) {
    const response = await fetch(url);
    const data = await response.json();
    setter(data);
  }

  useEffect(() => {
    if (chemCID == undefined) {return}
    setSearchError(false);
  
    fetchSet(`https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${chemCID}/JSON`, setSDS)
    setChemImgSrc(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${chemCID}/PNG?image_size=large`);
    setValidatedChemicalName(chemicalName);

  }, [chemCID])

  useEffect(() => {
    if (chemicalName === "") {return};

    async function fetchCID() {
      const response = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chemicalName}/cids/JSON`);
      if (response.ok) {
        const data = await response.json();
        setChemCID(data.IdentifierList.CID[0]);
      } else {
        setChemCID(undefined);
        setSearchError(true)
      }
      
    }

    fetchCID();

  }, [chemicalName])

  function inputKeyDown(e:any) {
    if (e.key === "Enter") {
      setChemicalName(chemicalNameInput)
    }
  }


  return (
    <>
      <Head>
        <title>Quick Chem</title>
        <meta name="description" content="Quickly find chemical SDS information in a concise and readable format" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="atom.png" />
      </Head>
      <main className={inter.className}>
        <div style={{margin:"2rem 0 1.5rem 2rem", display:"flex", flexDirection:"row", gap:"1rem"}}>
          <img style={{width:"2rem"}} src="atomLight.png"></img>
          <h1  style={{color:"grey"}}>Quick Chem</h1>
        </div>
        
        <div className={styles.chemicalInput}>
          <input placeholder="Chemical name" value={chemicalNameInput} onKeyDown={(e) => inputKeyDown(e)} onChange={(e) => {setChemicalNameInput(e.target.value)}}></input>
          <button data-found={searchError ? "false" : "true"} onClick={() => setChemicalName(chemicalNameInput)}><div style={{height:"100%", display:"inline-flex", alignItems:"center"}}><img src="chemical.png" style={{width:"1em", marginRight:"0.2rem"}}></img><div>Search</div></div></button>
        </div>
        {SDS ? <>
        <div className={styles.sdsContainer}>
          <Description SDS={SDS}/>
          <div style={{gridArea:"Image", backgroundColor:"whitesmoke", borderRadius:"0.5rem", display:"flex", justifyContent:"center", boxShadow: "2px 2px 5px rgba(0,0,0,0.4)"}}>
            <img src={chemImgSrc}></img>
          </div>
          <Safety SDS={SDS}/>
          <Properties SDS={SDS}/>
          <a style={{gridArea:"Reference", justifySelf:"end", textDecoration:"none"}} target="_blank" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${validatedChemicalName}`}>More Info</a>
        </div>
        </> : <></>}
        <ChemicalGPT chemicalName={validatedChemicalName}/>
        <div style={{display:"flex", flexDirection:"row", marginLeft: "2rem"}}>
          <img src="PubChemLogo.png" style={{height: "3rem", width:"auto", padding: "0.5rem", marginBottom:"1rem"}}></img>
          <img src='OpenAILogo.png' style={{height: "3rem", width:"auto", padding: "0.5rem", marginBottom:"1rem"}}></img>
        </div>
        
      </main>
    </>
  )
}
