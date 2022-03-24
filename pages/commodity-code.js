import Link from 'next/link'
import { FormSelect } from "@capgeminiuk/dcx-react-library";

export default function CommodityCode({ data, faoCode, species, scientificName, stateCode, stateLabel, presentationCode, presentationLabel }) {
   
    const commodityOptions = data.map(v => ({
        label: `${v.code} - ${v.description}`,
        value: `${v.code},${v.description}`
    }));

    return (
        <>
            <h1>Select Commodity Code</h1>
            <h2>
                <Link href="/state-presentation">
                    <a>Back to Selecting state presentation</a>
                </Link>
            </h2>
        

          <form action="http://localhost:3000/added-products-table" method="get">
          <FormSelect
                label="Commodity Code"
                name="commodityCode"
                id="commodityCode"
                options={commodityOptions}
                nullOption="Select..."
            />
             <input name="species" hidden value={species}/>    
             <input name="scientificName" hidden value={scientificName}/>    
             <input name="faoCode" hidden value={faoCode}/> 
             <input name="stateCode" hidden value={stateCode}/>    
             <input name="stateLabel" hidden value={stateLabel}/> 
             <input name="presentationCode" hidden value={presentationCode}/> 
             <input name="presentationLabel" hidden value={presentationLabel}/> 
             <button type="submit">Add Product</button>
            </form> 
        </>
    )
}

export async function getServerSideProps(context) {
    console.log("context from state-presentation");
    console.log(context.query);

    const { faoCode, species, scientificName } = context.query;
    const stateCode = context.query['state'].split(',')[1];
    const presentationCode = context.query['state'].split(',')[3];
    const stateLabel = context.query['state'].split(',')[0];
    const presentationLabel = context.query['state'].split(',')[2];

    const commodityCodes = await fetch(
        `http://localhost:9000/v1/commodities/search?speciesCode=${faoCode}&state=${stateCode}&presentation=${presentationCode}`
    );

    const data = await commodityCodes.json();

    return {
      props: {
        data,
        faoCode,
        species,
        scientificName,
        stateCode,
        stateLabel,
        presentationCode,
        presentationLabel
      }
    };
}