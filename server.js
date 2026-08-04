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

// 109 stations-service réparties en France
const stations = [
  {
    "id": "1",
    "name": "Elan Paris 1",
    "brand": "Elan",
    "address": "39 Rue de Paris",
    "city": "Paris",
    "latitude": 48.834757,
    "longitude": 2.331386,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.99
      },
      {
        "type": "SP95",
        "price": 1.73
      },
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "E85",
        "price": 1.12
      }
    ]
  },
  {
    "id": "2",
    "name": "Intermarché Paris 2",
    "brand": "Intermarché",
    "address": "57 Rue de Paris",
    "city": "Paris",
    "latitude": 48.848559,
    "longitude": 2.373849,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.99
      },
      {
        "type": "E10",
        "price": 1.8
      }
    ]
  },
  {
    "id": "3",
    "name": "Elan Paris 3",
    "brand": "Elan",
    "address": "50 Chemin de Paris",
    "city": "Paris",
    "latitude": 48.887996,
    "longitude": 2.335049,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.95
      },
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "GAZOLE",
        "price": 1.81
      }
    ]
  },
  {
    "id": "4",
    "name": "Carrefour Paris 4",
    "brand": "Carrefour",
    "address": "5 Boulevard de Paris",
    "city": "Paris",
    "latitude": 48.892326,
    "longitude": 2.361959,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.92
      },
      {
        "type": "SP98",
        "price": 1.82
      },
      {
        "type": "E85",
        "price": 1.07
      },
      {
        "type": "GAZOLE",
        "price": 1.78
      }
    ]
  },
  {
    "id": "5",
    "name": "BP Paris 5",
    "brand": "BP",
    "address": "12 Chemin de Paris",
    "city": "Paris",
    "latitude": 48.848082,
    "longitude": 2.344743,
    "fuels": [
      {
        "type": "E10",
        "price": 1.68
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      },
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "SP98",
        "price": 1.92
      }
    ]
  },
  {
    "id": "6",
    "name": "Carrefour Paris 6",
    "brand": "Carrefour",
    "address": "32 Route de Paris",
    "city": "Paris",
    "latitude": 48.871779,
    "longitude": 2.350132,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.7
      },
      {
        "type": "SP95",
        "price": 1.84
      },
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "E10",
        "price": 1.72
      }
    ]
  },
  {
    "id": "7",
    "name": "Casino Paris 7",
    "brand": "Casino",
    "address": "64 Rue de Paris",
    "city": "Paris",
    "latitude": 48.824314,
    "longitude": 2.364904,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.91
      },
      {
        "type": "E10",
        "price": 1.75
      }
    ]
  },
  {
    "id": "8",
    "name": "Casino Paris 8",
    "brand": "Casino",
    "address": "128 Chemin de Paris",
    "city": "Paris",
    "latitude": 48.883349,
    "longitude": 2.370237,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "E85",
        "price": 1.04
      }
    ]
  },
  {
    "id": "9",
    "name": "Elan Paris 9",
    "brand": "Elan",
    "address": "101 Avenue de Paris",
    "city": "Paris",
    "latitude": 48.866969,
    "longitude": 2.335357,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.93
      },
      {
        "type": "SP98",
        "price": 2.0
      }
    ]
  },
  {
    "id": "10",
    "name": "BP Paris 10",
    "brand": "BP",
    "address": "87 Avenue de Paris",
    "city": "Paris",
    "latitude": 48.849632,
    "longitude": 2.329446,
    "fuels": [
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "GAZOLE",
        "price": 1.68
      },
      {
        "type": "SP95",
        "price": 1.78
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "11",
    "name": "Leclerc Paris 11",
    "brand": "Leclerc",
    "address": "37 Route de Paris",
    "city": "Paris",
    "latitude": 48.853753,
    "longitude": 2.359962,
    "fuels": [
      {
        "type": "E85",
        "price": 1.04
      },
      {
        "type": "E10",
        "price": 1.78
      }
    ]
  },
  {
    "id": "12",
    "name": "Elan Paris 12",
    "brand": "Elan",
    "address": "99 Route de Paris",
    "city": "Paris",
    "latitude": 48.851737,
    "longitude": 2.349852,
    "fuels": [
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "GAZOLE",
        "price": 1.73
      },
      {
        "type": "SP98",
        "price": 1.8
      },
      {
        "type": "SP95",
        "price": 1.87
      }
    ]
  },
  {
    "id": "13",
    "name": "Esso Paris 13",
    "brand": "Esso",
    "address": "39 Boulevard de Paris",
    "city": "Paris",
    "latitude": 48.879705,
    "longitude": 2.381917,
    "fuels": [
      {
        "type": "SP98",
        "price": 2.03
      },
      {
        "type": "E85",
        "price": 1.13
      },
      {
        "type": "GAZOLE",
        "price": 1.78
      }
    ]
  },
  {
    "id": "14",
    "name": "TotalEnergies Paris 14",
    "brand": "TotalEnergies",
    "address": "114 Avenue de Paris",
    "city": "Paris",
    "latitude": 48.893771,
    "longitude": 2.343616,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "SP98",
        "price": 1.86
      },
      {
        "type": "E10",
        "price": 1.79
      },
      {
        "type": "SP95",
        "price": 1.93
      }
    ]
  },
  {
    "id": "15",
    "name": "TotalEnergies Paris 15",
    "brand": "TotalEnergies",
    "address": "150 Place de Paris",
    "city": "Paris",
    "latitude": 48.882933,
    "longitude": 2.357616,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.97
      },
      {
        "type": "SP98",
        "price": 2.05
      },
      {
        "type": "E10",
        "price": 1.78
      }
    ]
  },
  {
    "id": "16",
    "name": "Esso Paris 16",
    "brand": "Esso",
    "address": "21 Rue de Paris",
    "city": "Paris",
    "latitude": 48.887313,
    "longitude": 2.326056,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "SP98",
        "price": 2.0
      },
      {
        "type": "E85",
        "price": 0.91
      }
    ]
  },
  {
    "id": "17",
    "name": "Leclerc Paris 17",
    "brand": "Leclerc",
    "address": "135 Place de Paris",
    "city": "Paris",
    "latitude": 48.864302,
    "longitude": 2.317149,
    "fuels": [
      {
        "type": "E10",
        "price": 1.85
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      },
      {
        "type": "SP98",
        "price": 1.9
      },
      {
        "type": "SP95",
        "price": 1.98
      }
    ]
  },
  {
    "id": "18",
    "name": "Intermarché Paris 18",
    "brand": "Intermarché",
    "address": "35 Rue de Paris",
    "city": "Paris",
    "latitude": 48.872631,
    "longitude": 2.357321,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.83
      },
      {
        "type": "E10",
        "price": 1.75
      },
      {
        "type": "SP98",
        "price": 1.98
      },
      {
        "type": "E85",
        "price": 0.93
      }
    ]
  },
  {
    "id": "19",
    "name": "Avia Paris 19",
    "brand": "Avia",
    "address": "56 Rue de Paris",
    "city": "Paris",
    "latitude": 48.863067,
    "longitude": 2.359129,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.68
      },
      {
        "type": "SP95",
        "price": 1.8
      },
      {
        "type": "SP98",
        "price": 1.8
      },
      {
        "type": "E10",
        "price": 1.81
      }
    ]
  },
  {
    "id": "20",
    "name": "TotalEnergies Paris 20",
    "brand": "TotalEnergies",
    "address": "95 Boulevard de Paris",
    "city": "Paris",
    "latitude": 48.875904,
    "longitude": 2.353142,
    "fuels": [
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "GAZOLE",
        "price": 1.85
      },
      {
        "type": "E10",
        "price": 1.81
      },
      {
        "type": "SP98",
        "price": 1.96
      }
    ]
  },
  {
    "id": "21",
    "name": "Casino Lyon 1",
    "brand": "Casino",
    "address": "49 Boulevard de Lyon",
    "city": "Lyon",
    "latitude": 45.733423,
    "longitude": 4.808155,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "SP95",
        "price": 1.74
      },
      {
        "type": "E85",
        "price": 0.9
      }
    ]
  },
  {
    "id": "22",
    "name": "Casino Lyon 2",
    "brand": "Casino",
    "address": "117 Place de Lyon",
    "city": "Lyon",
    "latitude": 45.802919,
    "longitude": 4.870774,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.73
      },
      {
        "type": "E85",
        "price": 0.97
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "23",
    "name": "Avia Lyon 3",
    "brand": "Avia",
    "address": "31 Rue de Lyon",
    "city": "Lyon",
    "latitude": 45.75301,
    "longitude": 4.849129,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "SP95",
        "price": 1.71
      },
      {
        "type": "GAZOLE",
        "price": 1.7
      }
    ]
  },
  {
    "id": "24",
    "name": "Intermarché Lyon 4",
    "brand": "Intermarché",
    "address": "2 Boulevard de Lyon",
    "city": "Lyon",
    "latitude": 45.777583,
    "longitude": 4.845195,
    "fuels": [
      {
        "type": "E85",
        "price": 1.02
      },
      {
        "type": "GAZOLE",
        "price": 1.59
      }
    ]
  },
  {
    "id": "25",
    "name": "Avia Lyon 5",
    "brand": "Avia",
    "address": "76 Chemin de Lyon",
    "city": "Lyon",
    "latitude": 45.787611,
    "longitude": 4.847974,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "SP98",
        "price": 2.0
      }
    ]
  },
  {
    "id": "26",
    "name": "Intermarché Lyon 6",
    "brand": "Intermarché",
    "address": "93 Rue de Lyon",
    "city": "Lyon",
    "latitude": 45.800067,
    "longitude": 4.813957,
    "fuels": [
      {
        "type": "E10",
        "price": 1.67
      },
      {
        "type": "SP95",
        "price": 1.97
      },
      {
        "type": "GAZOLE",
        "price": 1.58
      },
      {
        "type": "SP98",
        "price": 1.89
      }
    ]
  },
  {
    "id": "27",
    "name": "Avia Lyon 7",
    "brand": "Avia",
    "address": "46 Place de Lyon",
    "city": "Lyon",
    "latitude": 45.79317,
    "longitude": 4.832384,
    "fuels": [
      {
        "type": "E85",
        "price": 1.13
      },
      {
        "type": "GAZOLE",
        "price": 1.65
      }
    ]
  },
  {
    "id": "28",
    "name": "BP Lyon 8",
    "brand": "BP",
    "address": "13 Boulevard de Lyon",
    "city": "Lyon",
    "latitude": 45.738122,
    "longitude": 4.835068,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.75
      },
      {
        "type": "SP98",
        "price": 1.97
      },
      {
        "type": "E10",
        "price": 1.77
      },
      {
        "type": "E85",
        "price": 1.1
      }
    ]
  },
  {
    "id": "29",
    "name": "BP Marseille 1",
    "brand": "BP",
    "address": "6 Boulevard de Marseille",
    "city": "Marseille",
    "latitude": 43.26951,
    "longitude": 5.338078,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "SP95",
        "price": 1.83
      },
      {
        "type": "E85",
        "price": 1.05
      },
      {
        "type": "SP98",
        "price": 2.04
      }
    ]
  },
  {
    "id": "30",
    "name": "BP Marseille 2",
    "brand": "BP",
    "address": "35 Avenue de Marseille",
    "city": "Marseille",
    "latitude": 43.302842,
    "longitude": 5.401046,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "E85",
        "price": 1.02
      },
      {
        "type": "SP95",
        "price": 1.83
      }
    ]
  },
  {
    "id": "31",
    "name": "Casino Marseille 3",
    "brand": "Casino",
    "address": "3 Place de Marseille",
    "city": "Marseille",
    "latitude": 43.308701,
    "longitude": 5.376517,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.72
      },
      {
        "type": "E10",
        "price": 1.8
      }
    ]
  },
  {
    "id": "32",
    "name": "Shell Marseille 4",
    "brand": "Shell",
    "address": "150 Place de Marseille",
    "city": "Marseille",
    "latitude": 43.322245,
    "longitude": 5.379549,
    "fuels": [
      {
        "type": "E10",
        "price": 1.77
      },
      {
        "type": "SP95",
        "price": 1.92
      },
      {
        "type": "GAZOLE",
        "price": 1.7
      },
      {
        "type": "SP98",
        "price": 1.97
      }
    ]
  },
  {
    "id": "33",
    "name": "Indépendant Marseille 5",
    "brand": "Indépendant",
    "address": "109 Rue de Marseille",
    "city": "Marseille",
    "latitude": 43.316629,
    "longitude": 5.361535,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.67
      },
      {
        "type": "E85",
        "price": 1.01
      }
    ]
  },
  {
    "id": "34",
    "name": "Indépendant Marseille 6",
    "brand": "Indépendant",
    "address": "84 Route de Marseille",
    "city": "Marseille",
    "latitude": 43.271259,
    "longitude": 5.381888,
    "fuels": [
      {
        "type": "E10",
        "price": 1.91
      },
      {
        "type": "E85",
        "price": 1.06
      }
    ]
  },
  {
    "id": "35",
    "name": "Avia Marseille 7",
    "brand": "Avia",
    "address": "140 Rue de Marseille",
    "city": "Marseille",
    "latitude": 43.278909,
    "longitude": 5.406798,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.79
      },
      {
        "type": "E85",
        "price": 1.1
      }
    ]
  },
  {
    "id": "36",
    "name": "Indépendant Marseille 8",
    "brand": "Indépendant",
    "address": "49 Place de Marseille",
    "city": "Marseille",
    "latitude": 43.330617,
    "longitude": 5.387638,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.71
      },
      {
        "type": "SP98",
        "price": 1.95
      }
    ]
  },
  {
    "id": "37",
    "name": "Leclerc Bordeaux 1",
    "brand": "Leclerc",
    "address": "89 Place de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.808907,
    "longitude": -0.55651,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.68
      },
      {
        "type": "E85",
        "price": 1.12
      }
    ]
  },
  {
    "id": "38",
    "name": "Leclerc Bordeaux 2",
    "brand": "Leclerc",
    "address": "68 Boulevard de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.810472,
    "longitude": -0.556959,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.79
      },
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "E10",
        "price": 1.77
      }
    ]
  },
  {
    "id": "39",
    "name": "Leclerc Bordeaux 3",
    "brand": "Leclerc",
    "address": "41 Rue de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.86149,
    "longitude": -0.59512,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.72
      },
      {
        "type": "SP98",
        "price": 1.96
      },
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "E85",
        "price": 0.93
      }
    ]
  },
  {
    "id": "40",
    "name": "Avia Bordeaux 4",
    "brand": "Avia",
    "address": "84 Chemin de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.805058,
    "longitude": -0.617951,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "SP95",
        "price": 1.93
      }
    ]
  },
  {
    "id": "41",
    "name": "Casino Bordeaux 5",
    "brand": "Casino",
    "address": "91 Rue de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.814221,
    "longitude": -0.569764,
    "fuels": [
      {
        "type": "SP98",
        "price": 2.0
      },
      {
        "type": "E85",
        "price": 0.89
      }
    ]
  },
  {
    "id": "42",
    "name": "Elan Bordeaux 6",
    "brand": "Elan",
    "address": "106 Chemin de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.821327,
    "longitude": -0.60141,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.91
      },
      {
        "type": "GAZOLE",
        "price": 1.84
      }
    ]
  },
  {
    "id": "43",
    "name": "Esso Lille 1",
    "brand": "Esso",
    "address": "45 Boulevard de Lille",
    "city": "Lille",
    "latitude": 50.602728,
    "longitude": 3.059608,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.72
      },
      {
        "type": "SP95",
        "price": 1.86
      },
      {
        "type": "E85",
        "price": 1.08
      }
    ]
  },
  {
    "id": "44",
    "name": "Casino Lille 2",
    "brand": "Casino",
    "address": "74 Route de Lille",
    "city": "Lille",
    "latitude": 50.647626,
    "longitude": 3.072134,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.87
      },
      {
        "type": "GAZOLE",
        "price": 1.61
      }
    ]
  },
  {
    "id": "45",
    "name": "Avia Lille 3",
    "brand": "Avia",
    "address": "24 Rue de Lille",
    "city": "Lille",
    "latitude": 50.643291,
    "longitude": 3.021411,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "SP95",
        "price": 1.96
      },
      {
        "type": "E85",
        "price": 1.07
      }
    ]
  },
  {
    "id": "46",
    "name": "Intermarché Lille 4",
    "brand": "Intermarché",
    "address": "94 Route de Lille",
    "city": "Lille",
    "latitude": 50.606746,
    "longitude": 3.07912,
    "fuels": [
      {
        "type": "SP98",
        "price": 2.02
      },
      {
        "type": "SP95",
        "price": 1.7
      },
      {
        "type": "E85",
        "price": 0.98
      },
      {
        "type": "E10",
        "price": 1.72
      }
    ]
  },
  {
    "id": "47",
    "name": "Indépendant Lille 5",
    "brand": "Indépendant",
    "address": "100 Chemin de Lille",
    "city": "Lille",
    "latitude": 50.620032,
    "longitude": 3.025447,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.78
      },
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "SP95",
        "price": 1.8
      },
      {
        "type": "E85",
        "price": 0.91
      }
    ]
  },
  {
    "id": "48",
    "name": "Esso Lille 6",
    "brand": "Esso",
    "address": "15 Boulevard de Lille",
    "city": "Lille",
    "latitude": 50.597312,
    "longitude": 3.052786,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "SP98",
        "price": 1.86
      },
      {
        "type": "E85",
        "price": 1.11
      }
    ]
  },
  {
    "id": "49",
    "name": "Shell Strasbourg 1",
    "brand": "Shell",
    "address": "149 Place de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.589864,
    "longitude": 7.768872,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.74
      },
      {
        "type": "E85",
        "price": 1.01
      },
      {
        "type": "SP98",
        "price": 2.04
      }
    ]
  },
  {
    "id": "50",
    "name": "BP Strasbourg 2",
    "brand": "BP",
    "address": "147 Place de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.55849,
    "longitude": 7.768016,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.82
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "SP95",
        "price": 1.9
      }
    ]
  },
  {
    "id": "51",
    "name": "Elan Strasbourg 3",
    "brand": "Elan",
    "address": "93 Rue de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.598483,
    "longitude": 7.729291,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "SP98",
        "price": 1.99
      },
      {
        "type": "SP95",
        "price": 1.68
      }
    ]
  },
  {
    "id": "52",
    "name": "Elan Strasbourg 4",
    "brand": "Elan",
    "address": "143 Avenue de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.585933,
    "longitude": 7.770205,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "E85",
        "price": 0.91
      },
      {
        "type": "SP98",
        "price": 2.02
      },
      {
        "type": "SP95",
        "price": 1.95
      }
    ]
  },
  {
    "id": "53",
    "name": "TotalEnergies Strasbourg 5",
    "brand": "TotalEnergies",
    "address": "133 Boulevard de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.59924,
    "longitude": 7.738278,
    "fuels": [
      {
        "type": "E85",
        "price": 0.99
      },
      {
        "type": "SP98",
        "price": 1.98
      },
      {
        "type": "GAZOLE",
        "price": 1.76
      },
      {
        "type": "E10",
        "price": 1.87
      }
    ]
  },
  {
    "id": "54",
    "name": "Carrefour Nantes 1",
    "brand": "Carrefour",
    "address": "132 Route de Nantes",
    "city": "Nantes",
    "latitude": 47.212866,
    "longitude": -1.518481,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.94
      },
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "GAZOLE",
        "price": 1.83
      },
      {
        "type": "E85",
        "price": 1.14
      }
    ]
  },
  {
    "id": "55",
    "name": "Shell Nantes 2",
    "brand": "Shell",
    "address": "134 Boulevard de Nantes",
    "city": "Nantes",
    "latitude": 47.212599,
    "longitude": -1.535882,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.82
      },
      {
        "type": "SP98",
        "price": 2.02
      }
    ]
  },
  {
    "id": "56",
    "name": "Elan Nantes 3",
    "brand": "Elan",
    "address": "29 Boulevard de Nantes",
    "city": "Nantes",
    "latitude": 47.204352,
    "longitude": -1.571927,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.8
      },
      {
        "type": "E10",
        "price": 1.77
      }
    ]
  },
  {
    "id": "57",
    "name": "Casino Nantes 4",
    "brand": "Casino",
    "address": "80 Chemin de Nantes",
    "city": "Nantes",
    "latitude": 47.253816,
    "longitude": -1.562638,
    "fuels": [
      {
        "type": "E85",
        "price": 1.15
      },
      {
        "type": "SP95",
        "price": 1.72
      },
      {
        "type": "SP98",
        "price": 1.99
      }
    ]
  },
  {
    "id": "58",
    "name": "Avia Nantes 5",
    "brand": "Avia",
    "address": "39 Route de Nantes",
    "city": "Nantes",
    "latitude": 47.228381,
    "longitude": -1.547508,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.69
      },
      {
        "type": "E10",
        "price": 1.8
      }
    ]
  },
  {
    "id": "59",
    "name": "TotalEnergies Toulouse 1",
    "brand": "TotalEnergies",
    "address": "9 Avenue de Toulouse",
    "city": "Toulouse",
    "latitude": 43.612572,
    "longitude": 1.418146,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.89
      },
      {
        "type": "SP95",
        "price": 1.92
      },
      {
        "type": "E85",
        "price": 1.01
      },
      {
        "type": "GAZOLE",
        "price": 1.68
      }
    ]
  },
  {
    "id": "60",
    "name": "Casino Toulouse 2",
    "brand": "Casino",
    "address": "121 Place de Toulouse",
    "city": "Toulouse",
    "latitude": 43.630671,
    "longitude": 1.453203,
    "fuels": [
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      }
    ]
  },
  {
    "id": "61",
    "name": "BP Toulouse 3",
    "brand": "BP",
    "address": "112 Rue de Toulouse",
    "city": "Toulouse",
    "latitude": 43.592437,
    "longitude": 1.412013,
    "fuels": [
      {
        "type": "SP98",
        "price": 2.05
      },
      {
        "type": "E10",
        "price": 1.71
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      }
    ]
  },
  {
    "id": "62",
    "name": "Indépendant Toulouse 4",
    "brand": "Indépendant",
    "address": "48 Boulevard de Toulouse",
    "city": "Toulouse",
    "latitude": 43.636447,
    "longitude": 1.450024,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.68
      },
      {
        "type": "SP95",
        "price": 1.7
      }
    ]
  },
  {
    "id": "63",
    "name": "Casino Toulouse 5",
    "brand": "Casino",
    "address": "10 Boulevard de Toulouse",
    "city": "Toulouse",
    "latitude": 43.61162,
    "longitude": 1.436919,
    "fuels": [
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "GAZOLE",
        "price": 1.55
      }
    ]
  },
  {
    "id": "64",
    "name": "Casino Toulouse 6",
    "brand": "Casino",
    "address": "64 Chemin de Toulouse",
    "city": "Toulouse",
    "latitude": 43.566676,
    "longitude": 1.438496,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.84
      },
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GAZOLE",
        "price": 1.83
      }
    ]
  },
  {
    "id": "65",
    "name": "Avia Nice 1",
    "brand": "Avia",
    "address": "72 Boulevard de Nice",
    "city": "Nice",
    "latitude": 43.742367,
    "longitude": 7.246566,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "SP95",
        "price": 1.81
      }
    ]
  },
  {
    "id": "66",
    "name": "Casino Nice 2",
    "brand": "Casino",
    "address": "66 Rue de Nice",
    "city": "Nice",
    "latitude": 43.727892,
    "longitude": 7.258433,
    "fuels": [
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.75
      }
    ]
  },
  {
    "id": "67",
    "name": "TotalEnergies Nice 3",
    "brand": "TotalEnergies",
    "address": "68 Place de Nice",
    "city": "Nice",
    "latitude": 43.71901,
    "longitude": 7.278309,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "SP98",
        "price": 2.07
      },
      {
        "type": "SP95",
        "price": 1.89
      }
    ]
  },
  {
    "id": "68",
    "name": "Carrefour Nice 4",
    "brand": "Carrefour",
    "address": "5 Avenue de Nice",
    "city": "Nice",
    "latitude": 43.710342,
    "longitude": 7.231059,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.94
      },
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "SP98",
        "price": 1.91
      }
    ]
  },
  {
    "id": "69",
    "name": "BP Nice 5",
    "brand": "BP",
    "address": "150 Rue de Nice",
    "city": "Nice",
    "latitude": 43.678631,
    "longitude": 7.242839,
    "fuels": [
      {
        "type": "E10",
        "price": 1.76
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "70",
    "name": "BP Rennes 1",
    "brand": "BP",
    "address": "145 Avenue de Rennes",
    "city": "Rennes",
    "latitude": 48.154919,
    "longitude": -1.646777,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.95
      },
      {
        "type": "E85",
        "price": 0.97
      },
      {
        "type": "GAZOLE",
        "price": 1.82
      },
      {
        "type": "E10",
        "price": 1.91
      }
    ]
  },
  {
    "id": "71",
    "name": "BP Rennes 2",
    "brand": "BP",
    "address": "40 Route de Rennes",
    "city": "Rennes",
    "latitude": 48.096086,
    "longitude": -1.698373,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.77
      },
      {
        "type": "E10",
        "price": 1.92
      }
    ]
  },
  {
    "id": "72",
    "name": "Esso Rennes 3",
    "brand": "Esso",
    "address": "64 Route de Rennes",
    "city": "Rennes",
    "latitude": 48.152009,
    "longitude": -1.710235,
    "fuels": [
      {
        "type": "E10",
        "price": 1.89
      },
      {
        "type": "E85",
        "price": 0.9
      }
    ]
  },
  {
    "id": "73",
    "name": "Esso Rennes 4",
    "brand": "Esso",
    "address": "74 Boulevard de Rennes",
    "city": "Rennes",
    "latitude": 48.100433,
    "longitude": -1.64711,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.75
      },
      {
        "type": "E85",
        "price": 0.98
      }
    ]
  },
  {
    "id": "74",
    "name": "Indépendant Montpellier 1",
    "brand": "Indépendant",
    "address": "29 Avenue de Montpellier",
    "city": "Montpellier",
    "latitude": 43.628816,
    "longitude": 3.881957,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.8
      },
      {
        "type": "E10",
        "price": 1.84
      }
    ]
  },
  {
    "id": "75",
    "name": "Intermarché Montpellier 2",
    "brand": "Intermarché",
    "address": "59 Place de Montpellier",
    "city": "Montpellier",
    "latitude": 43.604717,
    "longitude": 3.916051,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.91
      },
      {
        "type": "E10",
        "price": 1.72
      }
    ]
  },
  {
    "id": "76",
    "name": "Avia Montpellier 3",
    "brand": "Avia",
    "address": "57 Rue de Montpellier",
    "city": "Montpellier",
    "latitude": 43.60499,
    "longitude": 3.868258,
    "fuels": [
      {
        "type": "E10",
        "price": 1.85
      },
      {
        "type": "SP95",
        "price": 1.73
      }
    ]
  },
  {
    "id": "77",
    "name": "Esso Montpellier 4",
    "brand": "Esso",
    "address": "31 Place de Montpellier",
    "city": "Montpellier",
    "latitude": 43.627109,
    "longitude": 3.887994,
    "fuels": [
      {
        "type": "E10",
        "price": 1.65
      },
      {
        "type": "SP95",
        "price": 1.86
      }
    ]
  },
  {
    "id": "78",
    "name": "Elan Grenoble 1",
    "brand": "Elan",
    "address": "32 Boulevard de Grenoble",
    "city": "Grenoble",
    "latitude": 45.209951,
    "longitude": 5.750834,
    "fuels": [
      {
        "type": "E85",
        "price": 1.02
      },
      {
        "type": "GAZOLE",
        "price": 1.66
      }
    ]
  },
  {
    "id": "79",
    "name": "Esso Grenoble 2",
    "brand": "Esso",
    "address": "45 Avenue de Grenoble",
    "city": "Grenoble",
    "latitude": 45.205163,
    "longitude": 5.720589,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.77
      },
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "SP98",
        "price": 1.83
      }
    ]
  },
  {
    "id": "80",
    "name": "Indépendant Grenoble 3",
    "brand": "Indépendant",
    "address": "65 Rue de Grenoble",
    "city": "Grenoble",
    "latitude": 45.206107,
    "longitude": 5.763361,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.97
      },
      {
        "type": "E10",
        "price": 1.81
      }
    ]
  },
  {
    "id": "81",
    "name": "BP Dijon 1",
    "brand": "BP",
    "address": "141 Route de Dijon",
    "city": "Dijon",
    "latitude": 47.310619,
    "longitude": 5.059932,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.88
      },
      {
        "type": "E10",
        "price": 1.74
      },
      {
        "type": "E85",
        "price": 0.99
      }
    ]
  },
  {
    "id": "82",
    "name": "Indépendant Dijon 2",
    "brand": "Indépendant",
    "address": "69 Rue de Dijon",
    "city": "Dijon",
    "latitude": 47.341543,
    "longitude": 5.06553,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.82
      },
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "E85",
        "price": 1.1
      },
      {
        "type": "GAZOLE",
        "price": 1.71
      }
    ]
  },
  {
    "id": "83",
    "name": "Carrefour Dijon 3",
    "brand": "Carrefour",
    "address": "109 Rue de Dijon",
    "city": "Dijon",
    "latitude": 47.29583,
    "longitude": 5.05698,
    "fuels": [
      {
        "type": "E85",
        "price": 0.95
      },
      {
        "type": "SP98",
        "price": 1.98
      },
      {
        "type": "GAZOLE",
        "price": 1.67
      }
    ]
  },
  {
    "id": "84",
    "name": "BP Reims 1",
    "brand": "BP",
    "address": "141 Rue de Reims",
    "city": "Reims",
    "latitude": 49.274333,
    "longitude": 4.067386,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.89
      },
      {
        "type": "E85",
        "price": 1.07
      },
      {
        "type": "SP95",
        "price": 1.75
      },
      {
        "type": "GAZOLE",
        "price": 1.65
      }
    ]
  },
  {
    "id": "85",
    "name": "Esso Reims 2",
    "brand": "Esso",
    "address": "43 Chemin de Reims",
    "city": "Reims",
    "latitude": 49.268672,
    "longitude": 4.00796,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.91
      },
      {
        "type": "SP95",
        "price": 1.8
      },
      {
        "type": "E10",
        "price": 1.67
      }
    ]
  },
  {
    "id": "86",
    "name": "Carrefour Reims 3",
    "brand": "Carrefour",
    "address": "113 Place de Reims",
    "city": "Reims",
    "latitude": 49.248442,
    "longitude": 4.021226,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "SP95",
        "price": 1.94
      },
      {
        "type": "E85",
        "price": 0.9
      }
    ]
  },
  {
    "id": "87",
    "name": "Shell Le Havre 1",
    "brand": "Shell",
    "address": "58 Rue de Le Havre",
    "city": "Le Havre",
    "latitude": 49.524421,
    "longitude": 0.134649,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.97
      },
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "E10",
        "price": 1.73
      }
    ]
  },
  {
    "id": "88",
    "name": "Carrefour Le Havre 2",
    "brand": "Carrefour",
    "address": "92 Chemin de Le Havre",
    "city": "Le Havre",
    "latitude": 49.522591,
    "longitude": 0.133994,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "GAZOLE",
        "price": 1.75
      },
      {
        "type": "SP98",
        "price": 2.01
      }
    ]
  },
  {
    "id": "89",
    "name": "Elan Le Havre 3",
    "brand": "Elan",
    "address": "138 Boulevard de Le Havre",
    "city": "Le Havre",
    "latitude": 49.495936,
    "longitude": 0.079332,
    "fuels": [
      {
        "type": "E10",
        "price": 1.77
      },
      {
        "type": "SP95",
        "price": 1.69
      },
      {
        "type": "GAZOLE",
        "price": 1.63
      }
    ]
  },
  {
    "id": "90",
    "name": "Indépendant Saint-Étienne 1",
    "brand": "Indépendant",
    "address": "15 Place de Saint-Étienne",
    "city": "Saint-Étienne",
    "latitude": 45.444781,
    "longitude": 4.419198,
    "fuels": [
      {
        "type": "E85",
        "price": 1.13
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      }
    ]
  },
  {
    "id": "91",
    "name": "TotalEnergies Saint-Étienne 2",
    "brand": "TotalEnergies",
    "address": "132 Rue de Saint-Étienne",
    "city": "Saint-Étienne",
    "latitude": 45.402572,
    "longitude": 4.397837,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.8
      },
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "SP98",
        "price": 1.86
      },
      {
        "type": "GAZOLE",
        "price": 1.79
      }
    ]
  },
  {
    "id": "92",
    "name": "Carrefour Toulon 1",
    "brand": "Carrefour",
    "address": "138 Chemin de Toulon",
    "city": "Toulon",
    "latitude": 43.125282,
    "longitude": 5.949328,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "SP95",
        "price": 1.82
      },
      {
        "type": "GAZOLE",
        "price": 1.59
      }
    ]
  },
  {
    "id": "93",
    "name": "TotalEnergies Toulon 2",
    "brand": "TotalEnergies",
    "address": "31 Place de Toulon",
    "city": "Toulon",
    "latitude": 43.090058,
    "longitude": 5.930135,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "SP98",
        "price": 2.07
      }
    ]
  },
  {
    "id": "94",
    "name": "Elan Angers 1",
    "brand": "Elan",
    "address": "9 Rue de Angers",
    "city": "Angers",
    "latitude": 47.505255,
    "longitude": -0.5598,
    "fuels": [
      {
        "type": "E10",
        "price": 1.68
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      }
    ]
  },
  {
    "id": "95",
    "name": "Intermarché Angers 2",
    "brand": "Intermarché",
    "address": "129 Route de Angers",
    "city": "Angers",
    "latitude": 47.483662,
    "longitude": -0.58747,
    "fuels": [
      {
        "type": "E85",
        "price": 0.98
      },
      {
        "type": "SP98",
        "price": 1.97
      },
      {
        "type": "GAZOLE",
        "price": 1.76
      }
    ]
  },
  {
    "id": "96",
    "name": "Leclerc Nîmes 1",
    "brand": "Leclerc",
    "address": "147 Rue de Nîmes",
    "city": "Nîmes",
    "latitude": 43.818743,
    "longitude": 4.323367,
    "fuels": [
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "GAZOLE",
        "price": 1.79
      },
      {
        "type": "SP95",
        "price": 1.83
      },
      {
        "type": "SP98",
        "price": 1.98
      }
    ]
  },
  {
    "id": "97",
    "name": "BP Nîmes 2",
    "brand": "BP",
    "address": "125 Rue de Nîmes",
    "city": "Nîmes",
    "latitude": 43.818963,
    "longitude": 4.331655,
    "fuels": [
      {
        "type": "SP98",
        "price": 2.02
      },
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "E10",
        "price": 1.66
      }
    ]
  },
  {
    "id": "98",
    "name": "Avia Villeurbanne 1",
    "brand": "Avia",
    "address": "123 Avenue de Villeurbanne",
    "city": "Villeurbanne",
    "latitude": 45.800044,
    "longitude": 4.903115,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.89
      },
      {
        "type": "E10",
        "price": 1.7
      }
    ]
  },
  {
    "id": "99",
    "name": "Avia Villeurbanne 2",
    "brand": "Avia",
    "address": "132 Boulevard de Villeurbanne",
    "city": "Villeurbanne",
    "latitude": 45.755585,
    "longitude": 4.904637,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.86
      },
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "GAZOLE",
        "price": 1.72
      }
    ]
  },
  {
    "id": "100",
    "name": "Intermarché Clermont-Ferrand 1",
    "brand": "Intermarché",
    "address": "110 Route de Clermont-Ferrand",
    "city": "Clermont-Ferrand",
    "latitude": 45.741911,
    "longitude": 3.098681,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.99
      },
      {
        "type": "E85",
        "price": 1.07
      }
    ]
  },
  {
    "id": "101",
    "name": "Leclerc Clermont-Ferrand 2",
    "brand": "Leclerc",
    "address": "48 Boulevard de Clermont-Ferrand",
    "city": "Clermont-Ferrand",
    "latitude": 45.795104,
    "longitude": 3.084641,
    "fuels": [
      {
        "type": "E85",
        "price": 1.04
      },
      {
        "type": "GAZOLE",
        "price": 1.78
      },
      {
        "type": "E10",
        "price": 1.76
      },
      {
        "type": "SP95",
        "price": 1.69
      }
    ]
  },
  {
    "id": "102",
    "name": "BP Aix-en-Provence 1",
    "brand": "BP",
    "address": "148 Chemin de Aix-en-Provence",
    "city": "Aix-en-Provence",
    "latitude": 43.551246,
    "longitude": 5.432463,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.76
      },
      {
        "type": "SP98",
        "price": 2.0
      }
    ]
  },
  {
    "id": "103",
    "name": "Leclerc Aix-en-Provence 2",
    "brand": "Leclerc",
    "address": "86 Boulevard de Aix-en-Provence",
    "city": "Aix-en-Provence",
    "latitude": 43.563329,
    "longitude": 5.48739,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.99
      },
      {
        "type": "GAZOLE",
        "price": 1.72
      },
      {
        "type": "E10",
        "price": 1.87
      },
      {
        "type": "E85",
        "price": 0.99
      }
    ]
  },
  {
    "id": "104",
    "name": "Elan Brest 1",
    "brand": "Elan",
    "address": "88 Place de Brest",
    "city": "Brest",
    "latitude": 48.410759,
    "longitude": -4.480275,
    "fuels": [
      {
        "type": "E10",
        "price": 1.74
      },
      {
        "type": "SP98",
        "price": 1.98
      },
      {
        "type": "SP95",
        "price": 1.84
      }
    ]
  },
  {
    "id": "105",
    "name": "Avia Brest 2",
    "brand": "Avia",
    "address": "24 Rue de Brest",
    "city": "Brest",
    "latitude": 48.35802,
    "longitude": -4.475475,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "SP98",
        "price": 1.9
      }
    ]
  },
  {
    "id": "106",
    "name": "BP Limoges 1",
    "brand": "BP",
    "address": "117 Place de Limoges",
    "city": "Limoges",
    "latitude": 45.83567,
    "longitude": 1.292433,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.77
      },
      {
        "type": "SP98",
        "price": 2.04
      }
    ]
  },
  {
    "id": "107",
    "name": "Carrefour Limoges 2",
    "brand": "Carrefour",
    "address": "131 Chemin de Limoges",
    "city": "Limoges",
    "latitude": 45.869093,
    "longitude": 1.24816,
    "fuels": [
      {
        "type": "E10",
        "price": 1.77
      },
      {
        "type": "SP95",
        "price": 1.7
      },
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "GAZOLE",
        "price": 1.8
      }
    ]
  },
  {
    "id": "108",
    "name": "Elan Tours 1",
    "brand": "Elan",
    "address": "48 Route de Tours",
    "city": "Tours",
    "latitude": 47.368126,
    "longitude": 0.671236,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "E85",
        "price": 1.13
      },
      {
        "type": "SP95",
        "price": 1.81
      },
      {
        "type": "SP98",
        "price": 1.93
      }
    ]
  },
  {
    "id": "109",
    "name": "Elan Tours 2",
    "brand": "Elan",
    "address": "43 Place de Tours",
    "city": "Tours",
    "latitude": 47.364467,
    "longitude": 0.710485,
    "fuels": [
      {
        "type": "SP98",
        "price": 1.92
      },
      {
        "type": "E85",
        "price": 1.15
      }
    ]
  }
];

// Endpoint stations avec filtre optionnel
app.get('/api/stations', (req, res) => {
  const { lat, lng, radius = 10, fuel } = req.query;

  let result = [...stations];

  // Filtre par type de carburant
  if (fuel) {
    const fuelUpper = fuel.toUpperCase();
    result = result.map(s => ({
      ...s,
      fuels: s.fuels.filter(f => f.type === fuelUpper)
    })).filter(s => s.fuels.length > 0);
  }

  // Si lat/lng fournis, on simule un tri par proximité
  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    result = result.map(s => {
      const dLat = s.latitude - userLat;
      const dLng = s.longitude - userLng;
      const dist = Math.sqrt(dLat*dLat + dLng*dLng) * 111; // approx km
      return { ...s, distance: parseFloat(dist.toFixed(1)) };
    })
    .filter(s => s.distance <= parseFloat(radius))
    .sort((a, b) => a.distance - b.distance);
  }

  res.json({ success: true, count: result.length, stations: result });
});

// Détails d'une station
app.get('/api/stations/:id', (req, res) => {
  const station = stations.find(s => s.id === req.params.id);
  if (!station) return res.status(404).json({ error: 'Station non trouvée' });
  res.json({ success: true, station });
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
      { id: 10, name: "T-shirt Levi's", category: 'Mode', min_price: 24.99, store_count: 2, image_url: 'https://placehold.co/300x300/purple/white?text=Levis' }
    ]
  });
});

// Détails produit
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const names = ['Coca-Cola 1.5L', 'Nutella 750g', 'iPhone 15 128Go', 'AirPods Pro 2', 'Le Petit Marseillais', 'Always Ultra+', 'Essuie-tout Lotus', 'Ariel pods', 'Nike Air Force 1', "T-shirt Levi's"];
  res.json({
    success: true,
    product: { id, name: names[id-1] || 'Produit', description: 'Description du produit', image_url: `https://placehold.co/300x300/333/white?text=Produit+${id}` },
    prices: [
      { store_name: 'Carrefour', price: (Math.random() * 50 + 10).toFixed(2), in_stock: true, url: '#' },
      { store_name: 'Leclerc', price: (Math.random() * 50 + 8).toFixed(2), in_stock: true, url: '#' },
      { store_name: 'Amazon', price: (Math.random() * 50 + 12).toFixed(2), in_stock: Math.random() > 0.2, url: '#' }
    ]
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
