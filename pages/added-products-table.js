
import { GridRow, GridCol, Table, Button } from "govuk-react";

// POST for fish/add
// addToFavourites: false
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
export default function AddProductsTable({product}) {
    const products = [];
    products.push(product);

    return (
        <>
            <h1>Your products</h1>
            <GridRow>
                <GridCol>
                    <Table
                        id="species-table"
                        head={
                            <Table.Row>
                                <Table.CellHeader>Product</Table.CellHeader>
                                <Table.CellHeader>Commodity code</Table.CellHeader>
                                <Table.CellHeader style={{ textAlign: "right" }}>
                                    Action
                </Table.CellHeader>
                            </Table.Row>
                        }
                        body={products.map((product, index) => (
                            <Table.Row
                                id={`species_${product.speciesCode}_${product.state}_${product.presentation}`}
                                key={index}
                            >
                                <Table.Cell
                                    style={{ verticalAlign: "top", width: "40%" }}
                                >{`${product.species}, ${product.stateLabel}, ${product.presentationLabel}`}</Table.Cell>
                                <Table.Cell style={{ verticalAlign: "top", width: "50%" }}>
                                    {`${product.commodity_code} ${
                                        product.commodity_code_description
                                            ? "- " + product.commodity_code_description
                                            : ""
                                        }`.trim()}
                                </Table.Cell>
                                <Table.Cell style={{ verticalAlign: "top", width: "10%" }}>
                                    <GridRow style={{ margin: 0, placeContent: "flex-end" }}>
                                        <Button
                                            buttonColour="#f3f2f1"
                                            buttonHoverColour="#ffdd00"
                                            buttonShadowColour="#f47738"
                                            buttonTextColour="#0b0c0c"
                                            id={product.id}
                                            name="editProduct"
                                            style={{ minWidth: "67px", wordBreak: "normal" }}
                                        //onClick={this.editButtonHandler}
                                        >
                                            Edit
                    </Button>
                                        <Button
                                            buttonColour="#f3f2f1"
                                            buttonHoverColour="#ffdd00"
                                            buttonShadowColour="#f47738"
                                            buttonTextColour="#0b0c0c"
                                            id={product.id}
                                            name="removeProduct"
                                            style={{ minWidth: "100px" }}
                                        // onClick={this.removeButtonHandler}
                                        >
                                            Remove
                    </Button>
                                    </GridRow>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    />
                </GridCol>
            </GridRow>
        </>
    )
}

export async function getServerSideProps(context) {

    const { faoCode, species, scientificName, stateCode, stateLabel, presentationCode, presentationLabel } = context.query;
    const commodityCode = context.query['commodityCode'].split(',')[0];
    const commodityCodeDescription = context.query['commodityCode'].split(',')[1];

    console.log('what is specie', species, stateCode, presentationCode);

    const fishAdd = await fetch('http://localhost:5500/v1/fish/add', {
        body: JSON.stringify({
            addToFavourites: false, btn_submit: "", commodity_code: commodityCode, 
            commodity_code_description: commodityCodeDescription, presentation: presentationCode, 
            presentationLabel, scientificName, species, speciesCode: faoCode, state: stateCode, stateLabel,
            redirect: "/create-catch-certificate/:documentNumber/what-are-you-exporting"
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })


    const product = await fishAdd.json();
    console.log('this is the product', product);


    return { props: { product } }
}