import { FormSelect } from "@capgeminiuk/dcx-react-library";

export default function Home({ speciesData, dataTransformed }) {
  var statePresNames = dataTransformed ? dataTransformed.map(v => ({
    label: `${v.state.description}(${v.state.code}), ${v.presentation.description} (${v.presentation.code})`,
    value: `${v.state.description},${v.state.code},${v.presentation.description},${v.presentation.code}`
})) : [];
  return (
    <div>
      <div>
        <form action="http://localhost:3000/" method="get">
          <label htmlFor="species-choice-title">Common name or FAO code</label>
          <input list="species" id="species-choice" name="species-choice" />
          <datalist id="species">
            {speciesData.map((s) => (
              <option key={s.faoCode} value={`${s.faoName},${s.faoCode},${s.scientificName}`} />
            ))}
          </datalist>
          <button type="submit">Select</button>
        </form>
        <form action="http://localhost:3000/commodity-code" method="get">
          <FormSelect
            label="State"
            name="state"
            id="state"
            options={statePresNames}
            nullOption="Select..."
          />

          <button type="submit">Select</button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "http://localhost:9000/v1/species?uk=Y"
  );
  const speciesData = await res.json();

  if (context.query['species-choice']) {
    const faoCode = context.query['species-choice'].split(',')[1];

    const statePres = await fetch(
      `http://localhost:9000/v1/speciesStateLookup?faoCode=${faoCode}`
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

    return { props: { speciesData, dataTransformed } };
  }
  return { props: { speciesData } };
}
