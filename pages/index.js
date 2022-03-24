import styles from "../styles/Home.module.css";

export default function Home({ speciesData }) {
  return (
    <div>
      <div>
        <form action="http://localhost:3000/state-presentation" method="get">
          <label htmlFor="species-choice-title">Common name or FAO code</label>
          <input list="species" id="species-choice" name="species-choice" />
          <datalist id="species">
            {speciesData.map((s) => (
              <option key={s.faoCode} value={`${s.faoName},${s.faoCode},${s.scientificName}`} />
            ))}
          </datalist>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:9000/v1/species?uk=Y"
  );
  const speciesData = await res.json();

  return { props: { speciesData } };
}
