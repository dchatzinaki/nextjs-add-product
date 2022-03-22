export default function SpeciesSelection({ data }) {

    console.log('what is data???', data);
    return (
      <div>
          <label htmlFor="ice-cream-choice">Choose a flavor:</label>
          <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />
          <datalist id="ice-cream-flavors">
              <option value="Chocolate" />
              <option value="Coconut" />
              <option value="Mint" />
              <option value="Strawberry" />
              <option value="Vanilla" />
          </datalist>
       </div>
    );
  }
  
  // This gets called on every request
  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('http://localhost:3001/reference/api/v1/species?uk=Y')
    const data = await res.json()
  
    console.log('what is data here?', data);
    // Pass data to the page via props
    return { props: { data } }
  }
