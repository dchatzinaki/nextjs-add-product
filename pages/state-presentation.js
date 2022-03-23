import Link from 'next/link'
import { FormSelect } from "@capgeminiuk/dcx-react-library";

export default function StatePresentationSpecies() {
  return (
    <>
      <h1>Select State and Presentation</h1>
      <h2>
        <Link href="/">
          <a>Back to Selecting Species</a>
        </Link>
      </h2>
      <FormSelect
        label="State"
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