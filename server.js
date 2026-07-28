const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// URL de l'API carburants
const FUEL_API = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records';

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'PrixCompare API', timestamp: new Date().toISOString() });
});

// Stations-service (carburants) - VERSION CORRIGÉE
app.get('/api/stations', async (req, res) => {
  try {
    const { lat, lng, radius = 10, fuel } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Paramètres lat et lng requis' });
    }

    // Construction des paramètres pour l'API OpenDataSoft v2.1
    const params = {
      limit: 100,
      offset: 0,
      timezone: 'Europe/Paris'
    };

    // Filtre géographique : syntaxe correcte OpenDataSoft
    // On utilise geofilter.distance=lat,lon,distance_en_mètres
    const distanceMeters = parseInt(radius) * 1000;
    params['geofilter.distance'] = `${parseFloat(lat)},${parseFloat(lng)},${distanceMeters}`;

    // Filtre par type de carburant
    if (fuel) {
      params.where = `carburant="${fuel.toUpperCase()}"`;
    }

    console.log('Appel API:', FUEL_API);
    console.log('Params:', params);

    const response = await axios.get(FUEL_API, {
      params,
      timeout: 20000,
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Réponse API:', response.data?.results?.length || 0, 'résultats');

    // Si pas de résultats
    if (!response.data?.results || response.data.results.length === 0) {
      throw new Error('Aucune station trouvée dans ce rayon');
    }

    // Mapping des résultats
    const stations = response.data.results.map(r => {
      const fuels = [];
      const fuelTypes = [
        { key: 'gazole', label: 'GAZOLE' },
        { key: 'sp95', label: 'SP95' },
        { key: 'e98', label: 'SP98' },
        { key: 'e10', label: 'E10' },
        { key: 'e85', label: 'E85' },
        { key: 'gplc', label: 'GPLC' }
      ];

      fuelTypes.forEach(ft => {
        const price = r[ft.key];
        if (price && parseFloat(price) > 0) {
          fuels.push({
            type: ft.label,
            price: parseFloat(price)
          });
        }
      });

      return {
        id: r.id?.toString() || Math.random().toString(36).substr(2, 9),
        name: r.name || 'Station-service',
        brand: r.brand || 'Indépendant',
        address: r.address || '',
        city: r.city || '',
        latitude: r.geom?.lat || r.latitude,
        longitude: r.geom?.lon || r.longitude,
        fuels: fuels,
        lastUpdate: r.update_date || new Date().toISOString()
      };
    }).filter(s => s.fuels.length > 0);

    res.json({ success: true, count: stations.length, stations });

  } catch (err) {
    console.error('Erreur API carburants:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', JSON.stringify(err.response.data).substring(0, 500));
    }

    // Fallback : données de démo réalistes
    const demoStations = [
      {
        id: '1', name: 'TotalEnergies Paris 12', brand: 'TotalEnergies',
        address: '12 Avenue de Paris', city: 'Paris',
        latitude: 48.8566, longitude: 2.3522,
        fuels: [{ type: 'GAZOLE', price: 1.72 }, { type: 'SP95', price: 1.85 }, { type: 'SP98', price: 1.92 }]
      },
      {
        id: '2', name: 'Shell Bastille', brand: 'Shell',
        address: '45 Boulevard Bastille', city: 'Paris',
        latitude: 48.853, longitude: 2.369,
        fuels: [{ type: 'GAZOLE', price: 1.75 }, { type: 'SP95', price: 1.88 }]
      },
      {
        id: '3', name: 'Carrefour Market Rivoli', brand: 'Carrefour',
        address: '8 Rue de Rivoli', city: 'Paris',
        latitude: 48.858, longitude: 2.34,
        fuels: [{ type: 'GAZOLE', price: 1.68 }, { type: 'E85', price: 0.95 }]
      },
      {
        id: '4', name: 'Esso Express Nation', brand: 'Esso',
        address: '15 Place de la Nation', city: 'Paris',
        latitude: 48.848, longitude: 2.395,
        fuels: [{ type: 'GAZOLE', price: 1.70 }, { type: 'SP98', price: 1.90 }, { type: 'E10', price: 1.78 }]
      },
      {
        id: '5', name: 'Intermarché Montreuil', brand: 'Intermarché',
        address: '32 Avenue de la République', city: 'Montreuil',
        latitude: 48.862, longitude: 2.42,
        fuels: [{ type: 'GAZOLE', price: 1.65 }, { type: 'SP95', price: 1.82 }]
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
      { id: 1, name: 'Coca-Cola 1.5L', category: 'Alimentation', min_price: 1.75, store_count: 3, image_url: 'https://via.placeholder.com/300?text=Coca' },
      { id: 2, name: 'Nutella 750g', category: 'Alimentation', min_price: 4.99, store_count: 4, image_url: 'https://via.placeholder.com/300?text=Nutella' },
      { id: 3, name: 'iPhone 15 128Go', category: 'Électronique', min_price: 949, store_count: 3, image_url: 'https://via.placeholder.com/300?text=iPhone' },
      { id: 4, name: 'AirPods Pro 2', category: 'Électronique', min_price: 249, store_count: 2, image_url: 'https://via.placeholder.com/300?text=AirPods' },
      { id: 5, name: 'Le Petit Marseillais 250ml', category: 'Hygiène', min_price: 2.29, store_count: 3, image_url: 'https://via.placeholder.com/300?text=Gel+douche' },
      { id: 6, name: 'Always Ultra+ x14', category: 'Hygiène', min_price: 3.19, store_count: 3, image_url: 'https://via.placeholder.com/300?text=Always' },
      { id: 7, name: 'Essuie-tout Lotus x6', category: 'Maison', min_price: 4.49, store_count: 2, image_url: 'https://via.placeholder.com/300?text=Essuie-tout' },
      { id: 8, name: 'Ariel pods x30', category: 'Maison', min_price: 7.99, store_count: 2, image_url: 'https://via.placeholder.com/300?text=Ariel' },
      { id: 9, name: 'Nike Air Force 1', category: 'Mode', min_price: 99.99, store_count: 2, image_url: 'https://via.placeholder.com/300?text=Nike' },
      { id: 10, name: 'T-shirt Levi\'s', category: 'Mode', min_price: 24.99, store_count: 2, image_url: 'https://via.placeholder.com/300?text=Levis' }
    ]
  });
});

// Détails produit
app.get('/api/products/:id', (req, res) => {
  const products = {
    1: { name: 'Coca-Cola 1.5L', image_url: 'https://via.placeholder.com/300?text=Coca' },
    2: { name: 'Nutella 750g', image_url: 'https://via.placeholder.com/300?text=Nutella' },
    3: { name: 'iPhone 15 128Go', image_url: 'https://via.placeholder.com/300?text=iPhone' }
  };
  
  const p = products[req.params.id] || { name: 'Produit', image_url: '' };
  
  res.json({
    success: true,
    product: { id: parseInt(req.params.id), name: p.name, description: 'Description du produit', image_url: p.image_url },
    prices: [
      { store_name: 'Carrefour', price: Math.floor(Math.random() * 50) + 10, in_stock: true, url: '#' },
      { store_name: 'Leclerc', price: Math.floor(Math.random() * 50) + 8, in_stock: true, url: '#' },
      { store_name: 'Amazon', price: Math.floor(Math.random() * 50) + 12, in_stock: Math.random() > 0.2, url: '#' }
    ],
    history: Array.from({length: 7}, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      avg_price: (Math.random() * 20 + 10).toFixed(2)
    }))
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
