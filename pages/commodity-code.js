import Link from 'next/link'
import { FormSelect } from "@capgeminiuk/dcx-react-library";

export default function CommodityCode({ data }) {

    //     addToFavourites: false
    // btn_submit: ""
    // commodity_code: "03028140"
    // commodity_code_description: "Fresh or chilled blue shark \"Prionace glauca\""
    // presentation: "GUH"
    // presentationLabel: "Gutted and headed"
    // redirect: "/create-catch-certificate/:documentNumber/what-are-you-exporting"
    // scientificName: "Prionace glauca"
    // species: "Blue shark (BSH)"
    // speciesCode: "BSH"
    // state: "FRE"
    // stateLabel: "Fresh"

    console.log('what is data here?', data);

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
            <FormSelect
                label="Commodity Code"
                name="commodityCode"
                id="commodityCode"
                options={commodityOptions}
                //onChang
                nullOption="Select..."
            />
        </>
    )
}

export async function getServerSideProps(context) {
    console.log("context from state-presentation");
    console.log(context.query);
    const { faoCode, stateCode, presentationCode } = context.query;

    const commodityCodes = await fetch(
        `http://localhost:9000/v1/commodities/search?speciesCode=${faoCode}&state=${stateCode}&presentation=${presentationCode}`
    );

    const data = await commodityCodes.json();

    return { props: { data } };
}