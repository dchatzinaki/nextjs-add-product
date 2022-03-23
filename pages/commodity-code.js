import Link from 'next/link'
import { FormSelect } from "@capgeminiuk/dcx-react-library";

export default function CommodityCode() {
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
        //  value={selectedState}
        // containerClassName="form-group"
        //labelClassName="form-label form-label-bold"
      />
    </>
  )
}