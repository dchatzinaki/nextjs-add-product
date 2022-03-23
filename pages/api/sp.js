// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const species = req.body["species-choice"].replace(/.*\(|\).*/g, "");
  if (!species) {
    res.redirect("http://localhost:3000/");
  }

  const statePres = await fetch(
    `http://localhost:9000/v1/speciesStateLookup?faoCode=${species}`
  );

  const data = await statePres.json();
  const dataTransformed = data.reduce((preV, cV) => {
    console.log("cV", cV);
    const y = cV.presentations.map((i) => ({
      state: cV.state,
      presentation: i,
    }));
    const newObj = y;
    return [...preV, ...newObj];
  }, []);
  console.log("dataTransformed");
  console.log(dataTransformed);
  res.redirect("http://localhost:3000/state-presentation");
}
