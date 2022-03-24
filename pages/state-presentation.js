import Link from "next/link";
import { FormSelect } from "@capgeminiuk/dcx-react-library";
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function StatePresentationSpecies({ faoCode, dataTransformed, action = '/commodity-code' }) {
    const preventDefault = f => e => {
        e.preventDefault()
        f(e)
    }
    const router = useRouter()
    const [query, setQuery] = useState('')
    const handleParam = setValue => e => setValue(e.target.value)

    const handleSubmit = preventDefault(() => {
        router.push({
            pathname: action,
            query: {
                faoCode,
                stateDescription: query.split(',')[0],
                stateCode: query.split(',')[1],
                presentationDescription: query.split(',')[2],
                presentationCode: query.split(',')[3]
            },
        })
    })

    var statePresNames = dataTransformed.map(v => ({
        label: `${v.state.description}(${v.state.code}), ${v.presentation.description} (${v.presentation.code})`,
        value: `${v.state.description},${v.state.code},${v.presentation.description},${v.presentation.code}`
    }));
    return (
        <>
            <h1>Select State and Presentation</h1>
            <h2>
                <Link href="/">
                    <a>Back to Selecting Species</a>
                </Link>
            </h2>

            <form onSubmit={handleSubmit}>
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