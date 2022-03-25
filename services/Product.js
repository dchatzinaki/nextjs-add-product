export const getUkSpecies = async () => {
    const res = await fetch(
        "http://localhost:9000/v1/species?uk=Y"
    );
    const speciesData = await res.json();

    return { props: { speciesData } };
}

export const getStatusPresentation = async (context) => {
    const faoCode = context.query['species-choice'].split(',')[1];
    const species = `${context.query['species-choice'].split(',')[0]} (${faoCode})`;
    const scientificName = context.query['species-choice'].split(',')[2];

    if (!faoCode) {
        context.res.redirect("http://localhost:3000/");
    }

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

    return { props: { faoCode, species, scientificName, dataTransformed } }
}