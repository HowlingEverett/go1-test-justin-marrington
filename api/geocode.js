const axios = require('axios');

const peliasPath =
  process.env.PELIAS_ROOT || 'http://pelias_api.pelias_default:4000';

module.exports.geocode = async (req, res, next) => {
  const autocompleteUrl = `${peliasPath}/v1/autocomplete`;
  const addressFragment = req.query.address;
  try {
    const response = await axios.get(autocompleteUrl, {
      params: { text: addressFragment },
    });
    const candidates = response.data.features.map(mapCandidate);
    return res.json({ candidates });
  } catch (error) {
    next(error);
  }
};

const mapCandidate = (candidate) => {
  const {
    geometry: { coordinates },
    properties: {
      street,
      housenumber,
      postalcode: postalCode,
      locality,
      region,
      country,
      unit,
      unit_type: unitType,
    },
  } = candidate;
  const [longitude, latitude] = coordinates;
  return {
    coordinates: {
      latitude,
      longitude,
    },
    address: {
      addressOne: `${housenumber} ${street}`,
      addressTwo: unit && unitType && `${unitType} ${unit}`,
      locality,
      region,
      postalCode,
      country,
    },
  };
};
