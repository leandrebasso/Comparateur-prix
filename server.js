const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

const FUEL_API = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records';

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'PrixCompare API', timestamp: new Date().toISOString() });
});

// Stations-service (carburants)
app.get('/api/stations', async (req, res) => {
  try {
    const { lat, lng, radius = 10, fuel } = req.query;
    
    let where = `distance(geom, GEOM'POINT(${lng} ${lat})') < ${radius * 1000}`;
    if (fuel) where += ` AND carburant = '${fuel}'`;

    const response = await axios.get(FUEL_API, {
      params: { where, limit: 100 },
      timeout: 15000
    });

    const stations = response.data.results.map(r => ({
      id: r.id,
      name: r.name || 'Station',
      brand: r.brand || 'Indépendant',
      address: r.address,
      city: r.city,
      latitude: r.geom?.lat,
      longitude: r.geom?.lon,
      fuels: ['gazole','sp95','sp98','e85'].filter(t => r[t] > 0).map(t => ({
        type: t.toUpperCase(),
        price: parseFloat(r[t])
      }))
    }));

    res.json({ success: true, count: stations.length, stations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur API carburants', message: err.message });
  }
});

// Produits (mockés pour l'instant)
app.get('/api/products', (req, res) => {
  res.json({ 
    success: true, 
    data: [
      { id: 1, name: 'Coca-Cola 1.5L', category: 'Alimentation', min_price: 1.75 },
      { id: 2, name: 'Nutella 750g', category: 'Alimentation', min_price: 4.99 },
      { id: 3, name: 'iPhone 15 128Go', category: 'Électronique', min_price: 949 }
    ]
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
