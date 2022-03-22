import styles from "../styles/Home.module.css";
import { FormSelect } from "@capgeminiuk/dcx-react-library";
import { GridRow, GridCol, Table, Button } from "govuk-react";

export default function Home({ speciesData }) {
  const products = [
    {
      commodity_code: "03079100",
      commodity_code_description:
        'Live, fresh or chilled molluscs, even in shell (excl. oysters, scallops of the genera Pecten, Chlamys or Placopecten, mussels "Mytilus spp., Perna spp.", cuttle fish and squid, octopus "Octopus spp.", snails other than sea snails, clams, cockles and ark shells, abalone and stromboid conchs); fresh or chilled flours, meals and pellets of molluscs, fit for human consumption',
      id: "GBR-2022-CC-1267C1B34-33ef2f74-932f-4c07-b9e9-2c2d55b58074",
      presentation: "WHL",
      presentationLabel: "Whole",
      scientificName: "Buccinum undatum",
      species: "Whelk (WHE)",
      speciesCode: "WHE",
      state: "FRE",
      stateLabel: "Fresh",
      user_id: null
    }
  ];

  return (
    <div>
      <div>
        <label htmlFor="species-choice-title">Common name or FAO code</label>
        <input
          list="species"
          id="species-choice"
          name="species-choice"
        />
        <datalist id="species">
          {speciesData.map(s => (
            <option value={`${s.faoName}(${s.faoCode})`} />
          ))}
        </datalist>
      </div>
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
      <FormSelect
        label="Presentation"
        name="resentation"
        id="presentation"
        options={["one", "two", "three"]}
        //onChang
        nullOption="Select..."
        //  value={selectedState}
        // containerClassName="form-group"
        //labelClassName="form-label form-label-bold"
      />
      <h2 className="heading-large" id="productTableCaption">
        Your products
      </h2>
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
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:3001/reference/api/v1/species?uk=Y"
  );
  const speciesData = await res.json();

  return { props: { speciesData } };
}
