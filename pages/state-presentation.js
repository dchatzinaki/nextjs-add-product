import Link from "next/link";
import { FormSelect } from "@capgeminiuk/dcx-react-library";
import bodyParser from "body-parser";
import util from "util";

const getBody = util.promisify(bodyParser.urlencoded());

export default function StatePresentationSpecies({ faoCode, species, scientificName, dataTransformed }) {
    // var statePresNames = dataTransformed.map(v => ({
    //     label: `${v.state.description}(${v.state.code}), ${v.presentation.description} (${v.presentation.code})`,
    //     value: `${v.state.description},${v.state.code},${v.presentation.description},${v.presentation.code}`
    // }));
    return (
        <>
            <h1>Select State and Presentation</h1>
            <h2>
                <Link href="/">
                    <a>Back to Selecting Species</a>
                </Link>
            </h2>

            {/*<form action="http://localhost:3000/commodity-code" method="get">*/}
            {/*    <FormSelect*/}
            {/*        label="State"*/}
            {/*        name="state"*/}
            {/*        id="state"*/}
            {/*        options={statePresNames}*/}
            {/*        nullOption="Select..."*/}
            {/*    />*/}
            {/* <input name="species" hidden value={species}/>    */}
            {/* <input name="scientificName" hidden value={scientificName}/>    */}
            {/* <input name="faoCode" hidden value={faoCode}/> */}
            {/* <button type="submit">Next</button>*/}
            {/*</form>*/}
        </>
    );
}

// export async function getServerSideProps({req}) {
//
//     console.log(req.method, req.body)
//     console.log(req.params, req.query)
//
//
//     return {props : {}}
//
//     // const faoCode = context.query['species-choice'].split(',')[1];
//     // const species = `${context.query['species-choice'].split(',')[0]} (${faoCode})`;
//     // const scientificName = context.query['species-choice'].split(',')[2];
//     //
//     // if (!faoCode) {
//     //     context.res.redirect("http://localhost:3000/");
//     // }
//     //
//     // const statePres = await fetch(
//     //     `http://localhost:9000/v1/speciesStateLookup?faoCode=${faoCode}`
//     // );
//     //
//     // const data = await statePres.json();
//     //
//     // const dataTransformed = data.reduce((preV, cV) => {
//     //     const y = cV.presentations.map((i) => ({
//     //         state: cV.state,
//     //         presentation: i,
//     //     }));
//     //     const newObj = y;
//     //     return [...preV, ...newObj];
//     // }, []);
//     //
//     // return { props: { faoCode, species, scientificName, dataTransformed } }
// }



export async function getServerSideProps({ req, res }) {
    await getBody(req, res);
    console.log(req.method, req.body);
    console.log(res.params, res.query);

    return {
        props: { }
    };
}