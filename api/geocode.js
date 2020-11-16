import MOCK_CANDIDATES from '../mock-data/geocode-candidates';

module.exports.geocode = (req, res) => {
  // FIXME: replace mock code with Pelias proxy once it's going
  return res.json({
    candidates: MOCK_CANDIDATES,
  });
};
