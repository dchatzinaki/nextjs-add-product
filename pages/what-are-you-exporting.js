import Product_read_species from "../components/Product_read_species";
import {getUkSpecies, getStatusPresentation} from "../services/Product";
import Link from "next/link";
import {FormSelect} from "@capgeminiuk/dcx-react-library";

export default function whatAreYouExporting({ speciesData, product }) {
    // console.log(speciesData)

    return (
        <div>
            { !product && speciesData && (
                <Product_read_species speciesData={speciesData}/>
            )}

        </div>
    );
}

export async function getServerSideProps(context) {
    if (!context.query['species-choice']) {
        return  await getUkSpecies()
    } else {
        return  await getStatusPresentation(context)
    }

    return {props: {}}

}
