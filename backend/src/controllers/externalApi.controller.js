import dotenv from "dotenv";
dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_LOCALEE;


const fetchPlaces = async (req, res) => {

    const { latitude, longitude, radius, type } = req.query;

    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`
        );
        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


const placeDeatils = async (req, res) => {
    
    const { place_id } = req.query;

    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_address,formatted_phone_number,reviews,photos,rating,opening_hours&key=${GOOGLE_API_KEY}`
        );
        res.json(response.data.result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const autoComplete = async (req, res) => {

    try {
      const { input } = req.query;

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input,
            types: 'geocode',
            components: 'country:in',
            key: GOOGLE_API_KEY,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from Google API');
    }
}

export {fetchPlaces, placeDeatils, autoComplete};