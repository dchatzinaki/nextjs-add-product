import styles from "../styles/Home.module.css";

export default function Home({ speciesData }) {


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
      <button>Next</button>
     
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
