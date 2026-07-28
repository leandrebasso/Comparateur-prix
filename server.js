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

// Stations-service (carburants) - CORRIGÉ
app.get('/api/stations', async (req, res) => {
  try {
    const { lat, lng, radius = 10, fuel } = req.query;

    // Vérification des paramètres
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Paramètres lat et lng requis' });
    }

    // Construction de la requête API data.gouv.fr
    const params = {
      limit: 100,
      offset: 0
    };

    // Filtre géographique (syntaxe OpenDataSoft)
    params.geofilter_distance = `${lat},${lng},${radius * 1000}`;

    // Filtre par type de carburant si demandé
    if (fuel) {
      params.where = `carburant="${fuel.toUpperCase()}"`;
    }

    console.log('Appel API carburants avec params:', params);

    const response = await axios.get(FUEL_API, {
      params,
      timeout: 20000
    });

    // Si pas de résultats
    if (!response.data.results || response.data.results.length === 0) {
      return res.json({ success: true, count: 0, stations: [] });
    }

    // Mapping des résultats
    const stations = response.data.results.map(r => {
      const fuels = [];
      const types = ['gazole', 'sp95', 'e98', 'e85', 'e10', 'gplc'];
      
      types.forEach(type => {
        if (r[type] && parseFloat(r[type]) > 0) {
          fuels.push({
            type: type.toUpperCase(),
            price: parseFloat(r[type])
          });
        }
      });

      return {
        id: r.id || Math.random().toString(36),
        name: r.name || 'Station-service',
        brand: r.brand || 'Indépendant',
        address: r.address || '',
        city: r.city || '',
        latitude: r.geom?.lat || r.latitude,
        longitude: r.geom?.lon || r.longitude,
        fuels: fuels,
        lastUpdate: r.update_date || new Date().toISOString()
      };
    }).filter(s => s.fuels.length > 0); // Ne garder que les stations avec des prix

    res.json({ success: true, count: stations.length, stations });

  } catch (err) {
    console.error('Erreur API carburants:', err.message);
    
    // Fallback : données de démo pour que l'app fonctionne quand même
    const demoStations = [
      {
        id: '1', name: 'TotalEnergies Paris 12', brand: 'TotalEnergies',
        address: '12 Avenue de Paris', city: 'Paris',
        latitude: 48.8566, longitude: 2.3522,
        fuels: [{ type: 'GAZOLE', price: 1.72 }, { type: 'SP95', price: 1.85 }]
      },
      {
        id: '2', name: 'Shell Bastille', brand: 'Shell',
        address: '45 Boulevard Bastille', city: 'Paris',
        latitude: 48.853, longitude: 2.369,
        fuels: [{ type: 'GAZOLE', price: 1.75 }, { type: 'SP98', price: 1.92 }]
      },
      {
        id: '3', name: 'Carrefour Market', brand: 'Carrefour',
        address: '8 Rue de Rivoli', city: 'Paris',
        latitude: 48.858, longitude: 2.34,
        fuels: [{ type: 'GAZOLE', price: 1.68 }, { type: 'E85', price: 0.95 }]
      }
    ];

    res.json({ 
      success: true, 
      count: demoStations.length, 
      stations: demoStations,
      warning: 'Données de démonstration - API externe temporairement indisponible'
    });
  }
});

// Produits
app.get('/api/products', (req, res) => {
  res.json({ 
    success: true, 
    data: [
      { id: 1, name: 'Coca-Cola 1.5L', category: 'Alimentation', min_price: 1.75, store_count: 3 },
      { id: 2, name: 'Nutella 750g', category: 'Alimentation', min_price: 4.99, store_count: 4 },
      { id: 3, name: 'iPhone 15 128Go', category: 'Électronique', min_price: 949, store_count: 3 },
      { id: 4, name: 'AirPods Pro 2', category: 'Électronique', min_price: 249, store_count: 2 },
      { id: 5, name: 'Le Petit Marseillais 250ml', category: 'Hygiène', min_price: 2.29, store_count: 3 }
    ]
  });
});

// Détails produit
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const prices = [
    { store_name: 'Carrefour', price: productId === 1 ? 1.89 : productId === 2 ? 5.49 : 969, in_stock: true },
    { store_name: 'Leclerc', price: productId === 1 ? 1.75 : productId === 2 ? 4.99 : 959, in_stock: true },
    { store_name: 'Amazon', price: productId === 1 ? 1.99 : productId === 2 ? 5.29 : 949, in_stock: true }
  ];
  
  res.json({
    success: true,
    product: { id: productId, name: 'Produit ' + productId },
    prices: prices
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
