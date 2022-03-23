import Link from "next/link";
import { FormSelect } from "@capgeminiuk/dcx-react-library";

export default function StatePresentationSpecies({ dataTransformed }) {
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
                options={dataTransformed}
                //onChang
                nullOption="Select..."
            //  value={selectedState}
            // containerClassName="form-group"
            //labelClassName="form-label form-label-bold"
            />
            <p>{dataTransformed.length}</p>
        </>
    );
}

export async function getServerSideProps(context) {
    console.log("context");
    console.log(context.query);

    const species = context.query['species-choice'].replace(/.*\(|\).*/g, "");

    if (!species) {
        context.res.redirect("http://localhost:3000/");
    }

    const statePres = await fetch(
        `http://localhost:9000/v1/speciesStateLookup?faoCode=${species}`
    );

    const data = await statePres.json();

    const dataTransformed = data.reduce((preV, cV) => {
        console.log("cV", cV);
        const y = cV.presentations.map((i) => ({
            state: cV.state,
            presentation: i,
        }));
        const newObj = y;
        return [...preV, ...newObj];
    }, []);

    return { props: { dataTransformed } }
}