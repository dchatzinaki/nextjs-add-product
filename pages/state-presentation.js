import Link from "next/link";
import { FormSelect } from "@capgeminiuk/dcx-react-library";

export default function StatePresentationSpecies({ faoCode, dataTransformed, action = '/commodity-code' }) {
 
    var statePresNames = dataTransformed.map(v => ({
        label: `${v.state.description}(${v.state.code}), ${v.presentation.description} (${v.presentation.code})`,
        value: `${faoCode},${v.state.description},${v.state.code},${v.presentation.description},${v.presentation.code}`
    }));
    return (
        <>
            <h1>Select State and Presentation</h1>
            <h2>
                <Link href="/">
                    <a>Back to Selecting Species</a>
                </Link>
            </h2>

            <form action="http://localhost:3000/commodity-code" method="get">
                <FormSelect
                    label="State"
                    name="state"
                    id="state"
                    options={statePresNames}
                    nullOption="Select..."
                    onChange={handleParam(setQuery)}
                />
                <button type="submit">Next</button>
            </form>
        </>
    );
}

export async function getServerSideProps(context) {
    const species = context.query['species-choice'].replace(/.*\(|\).*/g, "");

    if (!species) {
        context.res.redirect("http://localhost:3000/");
    }

    const statePres = await fetch(
        `http://localhost:9000/v1/speciesStateLookup?faoCode=${species}`
    );

    const data = await statePres.json();

    const dataTransformed = data.reduce((preV, cV) => {
        const y = cV.presentations.map((i) => ({
            state: cV.state,
            presentation: i,
        }));
        const newObj = y;
        return [...preV, ...newObj];
    }, []);

    return { props: { faoCode: species, dataTransformed } }
}