

export default function Product_read_species ({ speciesData }) {
    return (
        <form action="http://localhost:3000/what-are-you-exporting" method="get">
            <label htmlFor="species-choice-title">Common name or FAO code</label>
            <input list="species" id="species-choice" name="species-choice" />
            <datalist id="species">
                {speciesData.map((s) => (
                    <option key={s.faoCode} value={`${s.faoName},${s.faoCode},${s.scientificName}`} />
                ))}
            </datalist>
            <button type="submit">Next</button>
        </form>
    );
}