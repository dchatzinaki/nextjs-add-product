import Link from 'next/link'
import { FormSelect } from "@capgeminiuk/dcx-react-library";

export default function CommodityCode({data}) {

  console.log('what is data here?', data);
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
        name="state"
        id="state"
        options={["one", "two", "three"]}
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