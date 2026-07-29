const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'PrixCompare API', timestamp: new Date().toISOString() });
});

// Stations-service (DONNÉES DE DÉMO - fonctionnent immédiatement)
app.get('/api/stations', (req, res) => {
  const { lat, lng, radius = 10, fuel } = req.query;

  // Données réalistes autour de Paris
  const stations = [
    {
      id: '1', name: 'TotalEnergies Paris 12', brand: 'TotalEnergies',
      address: '12 Avenue de Paris', city: 'Paris',
      latitude: 48.8566, longitude: 2.3522,
      fuels: [
        { type: 'GAZOLE', price: 1.72 },
        { type: 'SP95', price: 1.85 },
        { type: 'SP98', price: 1.92 }
      ]
    },
    {
      id: '2', name: 'Shell Bastille', brand: 'Shell',
      address: '45 Boulevard Bastille', city: 'Paris',
      latitude: 48.853, longitude: 2.369,
      fuels: [
        { type: 'GAZOLE', price: 1.75 },
        { type: 'SP95', price: 1.88 }
      ]
    },
    {
      id: '3', name: 'Carrefour Market Rivoli', brand: 'Carrefour',
      address: '8 Rue de Rivoli', city: 'Paris',
      latitude: 48.858, longitude: 2.34,
      fuels: [
        { type: 'GAZOLE', price: 1.68 },
        { type: 'E85', price: 0.95 }
      ]
    },
    {
      id: '4', name: 'Esso Express Nation', brand: 'Esso',
      address: '15 Place de la Nation', city: 'Paris',
      latitude: 48.848, longitude: 2.395,
      fuels: [
        { type: 'GAZOLE', price: 1.70 },
        { type: 'SP98', price: 1.90 },
        { type: 'E10', price: 1.78 }
      ]
    },
    {
      id: '5', name: 'Intermarché Montreuil', brand: 'Intermarché',
      address: '32 Avenue de la République', city: 'Montreuil',
      latitude: 48.862, longitude: 2.42,
      fuels: [
        { type: 'GAZOLE', price: 1.65 },
        { type: 'SP95', price: 1.82 }
      ]
    },
    {
      id: '6', name: 'BP République', brand: 'BP',
      address: '78 Boulevard de la République', city: 'Paris',
      latitude: 48.867, longitude: 2.363,
      fuels: [
        { type: 'GAZOLE', price: 1.74 },
        { type: 'SP98', price: 1.93 },
        { type: 'E10', price: 1.80 }
      ]
    },
    {
      id: '7', name: 'Avia Père Lachaise', brand: 'Avia',
      address: '22 Rue du Père Lachaise', city: 'Paris',
      latitude: 48.861, longitude: 2.385,
      fuels: [
        { type: 'GAZOLE', price: 1.71 },
        { type: 'SP95', price: 1.86 }
      ]
    },
    {
      id: '8', name: 'Elan Charonne', brand: 'Elan',
      address: '105 Rue de Charonne', city: 'Paris',
      latitude: 48.851, longitude: 2.378,
      fuels: [
        { type: 'GAZOLE', price: 1.69 },
        { type: 'E85', price: 0.92 }
      ]
    }
  ];

  // Filtre par type de carburant si demandé
  let result = stations;
  if (fuel) {
    const fuelUpper = fuel.toUpperCase();
    result = stations.map(s => ({
      ...s,
      fuels: s.fuels.filter(f => f.type === fuelUpper)
    })).filter(s => s.fuels.length > 0);
  }

  res.json({ success: true, count: result.length, stations: result });
});

// Produits
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Coca-Cola 1.5L', category: 'Alimentation', min_price: 1.75, store_count: 3, image_url: 'https://placehold.co/300x300/orange/white?text=Coca' },
      { id: 2, name: 'Nutella 750g', category: 'Alimentation', min_price: 4.99, store_count: 4, image_url: 'https://placehold.co/300x300/orange/white?text=Nutella' },
      { id: 3, name: 'iPhone 15 128Go', category: 'Électronique', min_price: 949, store_count: 3, image_url: 'https://placehold.co/300x300/333/white?text=iPhone' },
      { id: 4, name: 'AirPods Pro 2', category: 'Électronique', min_price: 249, store_count: 2, image_url: 'https://placehold.co/300x300/333/white?text=AirPods' },
      { id: 5, name: 'Le Petit Marseillais 250ml', category: 'Hygiène', min_price: 2.29, store_count: 3, image_url: 'https://placehold.co/300x300/blue/white?text=Gel+douche' },
      { id: 6, name: 'Always Ultra+ x14', category: 'Hygiène', min_price: 3.19, store_count: 3, image_url: 'https://placehold.co/300x300/blue/white?text=Always' },
      { id: 7, name: 'Essuie-tout Lotus x6', category: 'Maison', min_price: 4.49, store_count: 2, image_url: 'https://placehold.co/300x300/green/white?text=Essuie-tout' },
      { id: 8, name: 'Ariel pods x30', category: 'Maison', min_price: 7.99, store_count: 2, image_url: 'https://placehold.co/300x300/green/white?text=Ariel' },
      { id: 9, name: 'Nike Air Force 1', category: 'Mode', min_price: 99.99, store_count: 2, image_url: 'https://placehold.co/300x300/purple/white?text=Nike' },
      { id: 10, name: 'T-shirt Levi\'s', category: 'Mode', min_price: 24.99, store_count: 2, image_url: 'https://placehold.co/300x300/purple/white?text=Levis' }
    ]
  });
});

// Détails produit
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const names = ['Coca-Cola 1.5L', 'Nutella 750g', 'iPhone 15 128Go', 'AirPods Pro 2', 'Le Petit Marseillais', 'Always Ultra+', 'Essuie-tout Lotus', 'Ariel pods', 'Nike Air Force 1', 'T-shirt Levi\'s'];
  
  res.json({
    success: true,
    product: { id, name: names[id-1] || 'Produit', description: 'Description du produit', image_url: `https://placehold.co/300x300/333/white?text=Produit+${id}` },
    prices: [
      { store_name: 'Carrefour', price: (Math.random() * 50 + 10).toFixed(2), in_stock: true, url: '#' },
      { store_name: 'Leclerc', price: (Math.random() * 50 + 8).toFixed(2), in_stock: true, url: '#' },
      { store_name: 'Amazon', price: (Math.random() * 50 + 12).toFixed(2), in_stock: Math.random() > 0.2, url: '#' }
    ],
    history: Array.from({length: 7}, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      avg_price: (Math.random() * 20 + 10).toFixed(2)
    }))
  });
});

// Auth (mock)
app.post('/api/auth/register', (req, res) => {
  res.json({ success: true, token: 'fake-jwt-token', user: { id: 1, email: req.body.email, name: req.body.name } });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ success: true, token: 'fake-jwt-token', user: { id: 1, email: req.body.email, name: 'Utilisateur' } });
});

app.get('/api/auth/me', (req, res) => {
  res.json({ success: true, user: { id: 1, email: 'user@example.com', name: 'Utilisateur' } });
});

// Alertes (mock)
app.get('/api/alerts', (req, res) => {
  res.json({ success: true, alerts: [] });
});

app.post('/api/alerts', (req, res) => {
  res.json({ success: true, message: 'Alerte créée' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
