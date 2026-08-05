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

// 400 stations-service réparties dans toute la France
const stations = [
  {
    "id": "1",
    "name": "Carrefour Paris 1",
    "brand": "Carrefour",
    "address": "107 Chemin de Paris",
    "city": "Paris",
    "latitude": 48.840058,
    "longitude": 2.371935,
    "fuels": [
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "GPLC",
        "price": 1.14
      },
      {
        "type": "SP95",
        "price": 1.69
      },
      {
        "type": "SP98",
        "price": 1.97
      }
    ]
  },
  {
    "id": "2",
    "name": "Esso Paris 2",
    "brand": "Esso",
    "address": "100 Boulevard de Paris",
    "city": "Paris",
    "latitude": 48.830415,
    "longitude": 2.348788,
    "fuels": [
      {
        "type": "E10",
        "price": 1.62
      },
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "SP95",
        "price": 1.89
      }
    ]
  },
  {
    "id": "3",
    "name": "Casino Paris 3",
    "brand": "Casino",
    "address": "193 Place de Paris",
    "city": "Paris",
    "latitude": 48.84667,
    "longitude": 2.414244,
    "fuels": [
      {
        "type": "E85",
        "price": 0.91
      },
      {
        "type": "GAZOLE",
        "price": 1.55
      },
      {
        "type": "SP95",
        "price": 1.75
      }
    ]
  },
  {
    "id": "4",
    "name": "Shell Paris 4",
    "brand": "Shell",
    "address": "18 Avenue de Paris",
    "city": "Paris",
    "latitude": 48.898023,
    "longitude": 2.360317,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.18
      },
      {
        "type": "SP95",
        "price": 1.65
      },
      {
        "type": "SP98",
        "price": 2.11
      }
    ]
  },
  {
    "id": "5",
    "name": "Intermarché Paris 5",
    "brand": "Intermarché",
    "address": "154 Allée de Paris",
    "city": "Paris",
    "latitude": 48.870916,
    "longitude": 2.349664,
    "fuels": [
      {
        "type": "E10",
        "price": 1.71
      },
      {
        "type": "GPLC",
        "price": 1.18
      },
      {
        "type": "SP98",
        "price": 1.82
      }
    ]
  },
  {
    "id": "6",
    "name": "Elan Paris 6",
    "brand": "Elan",
    "address": "87 Avenue de Paris",
    "city": "Paris",
    "latitude": 48.906148,
    "longitude": 2.312954,
    "fuels": [
      {
        "type": "E85",
        "price": 0.95
      },
      {
        "type": "GAZOLE",
        "price": 1.65
      },
      {
        "type": "GPLC",
        "price": 1.21
      }
    ]
  },
  {
    "id": "7",
    "name": "TotalEnergies Paris 7",
    "brand": "TotalEnergies",
    "address": "18 Rue de Paris",
    "city": "Paris",
    "latitude": 48.882788,
    "longitude": 2.398988,
    "fuels": [
      {
        "type": "E85",
        "price": 0.9
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      },
      {
        "type": "SP95",
        "price": 1.81
      },
      {
        "type": "SP98",
        "price": 2.01
      }
    ]
  },
  {
    "id": "8",
    "name": "Avia Paris 8",
    "brand": "Avia",
    "address": "102 Boulevard de Paris",
    "city": "Paris",
    "latitude": 48.842937,
    "longitude": 2.414265,
    "fuels": [
      {
        "type": "E10",
        "price": 1.94
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      },
      {
        "type": "GPLC",
        "price": 1.02
      },
      {
        "type": "SP95",
        "price": 1.94
      },
      {
        "type": "SP98",
        "price": 1.82
      }
    ]
  },
  {
    "id": "9",
    "name": "Casino Paris 9",
    "brand": "Casino",
    "address": "176 Avenue de Paris",
    "city": "Paris",
    "latitude": 48.868207,
    "longitude": 2.319961,
    "fuels": [
      {
        "type": "E10",
        "price": 1.8
      },
      {
        "type": "GAZOLE",
        "price": 1.68
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP98",
        "price": 2.11
      }
    ]
  },
  {
    "id": "10",
    "name": "Esso Paris 10",
    "brand": "Esso",
    "address": "117 Route de Paris",
    "city": "Paris",
    "latitude": 48.801003,
    "longitude": 2.301807,
    "fuels": [
      {
        "type": "E85",
        "price": 0.95
      },
      {
        "type": "GAZOLE",
        "price": 1.83
      },
      {
        "type": "GPLC",
        "price": 0.94
      },
      {
        "type": "SP95",
        "price": 1.72
      },
      {
        "type": "SP98",
        "price": 1.84
      }
    ]
  },
  {
    "id": "11",
    "name": "Indépendant Paris 11",
    "brand": "Indépendant",
    "address": "184 Place de Paris",
    "city": "Paris",
    "latitude": 48.925188,
    "longitude": 2.422,
    "fuels": [
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "GAZOLE",
        "price": 1.73
      },
      {
        "type": "GPLC",
        "price": 1.01
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
    "id": "12",
    "name": "Intermarché Paris 12",
    "brand": "Intermarché",
    "address": "93 Chemin de Paris",
    "city": "Paris",
    "latitude": 48.788491,
    "longitude": 2.287205,
    "fuels": [
      {
        "type": "E10",
        "price": 1.73
      },
      {
        "type": "E85",
        "price": 0.88
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      },
      {
        "type": "SP95",
        "price": 1.69
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "13",
    "name": "Casino Paris 13",
    "brand": "Casino",
    "address": "73 Allée de Paris",
    "city": "Paris",
    "latitude": 48.915916,
    "longitude": 2.285475,
    "fuels": [
      {
        "type": "E10",
        "price": 1.68
      },
      {
        "type": "E85",
        "price": 1.01
      },
      {
        "type": "GPLC",
        "price": 0.98
      },
      {
        "type": "SP95",
        "price": 1.69
      }
    ]
  },
  {
    "id": "14",
    "name": "Avia Paris 14",
    "brand": "Avia",
    "address": "169 Rue de Paris",
    "city": "Paris",
    "latitude": 48.860606,
    "longitude": 2.320792,
    "fuels": [
      {
        "type": "E10",
        "price": 1.75
      },
      {
        "type": "GAZOLE",
        "price": 1.58
      },
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP95",
        "price": 1.9
      },
      {
        "type": "SP98",
        "price": 1.86
      }
    ]
  },
  {
    "id": "15",
    "name": "Intermarché Paris 15",
    "brand": "Intermarché",
    "address": "189 Boulevard de Paris",
    "city": "Paris",
    "latitude": 48.924947,
    "longitude": 2.35077,
    "fuels": [
      {
        "type": "E85",
        "price": 0.98
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "SP98",
        "price": 1.97
      }
    ]
  },
  {
    "id": "16",
    "name": "Casino Marseille 1",
    "brand": "Casino",
    "address": "177 Rue de Marseille",
    "city": "Marseille",
    "latitude": 43.295765,
    "longitude": 5.323014,
    "fuels": [
      {
        "type": "E10",
        "price": 1.89
      },
      {
        "type": "E85",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.93
      },
      {
        "type": "SP98",
        "price": 1.97
      }
    ]
  },
  {
    "id": "17",
    "name": "Indépendant Marseille 2",
    "brand": "Indépendant",
    "address": "147 Allée de Marseille",
    "city": "Marseille",
    "latitude": 43.277726,
    "longitude": 5.357284,
    "fuels": [
      {
        "type": "E10",
        "price": 1.84
      },
      {
        "type": "E85",
        "price": 1.05
      },
      {
        "type": "GAZOLE",
        "price": 1.67
      },
      {
        "type": "GPLC",
        "price": 1.19
      },
      {
        "type": "SP95",
        "price": 1.68
      }
    ]
  },
  {
    "id": "18",
    "name": "Leclerc Marseille 3",
    "brand": "Leclerc",
    "address": "195 Chemin de Marseille",
    "city": "Marseille",
    "latitude": 43.305334,
    "longitude": 5.411776,
    "fuels": [
      {
        "type": "E10",
        "price": 1.8
      },
      {
        "type": "GAZOLE",
        "price": 1.75
      }
    ]
  },
  {
    "id": "19",
    "name": "BP Marseille 4",
    "brand": "BP",
    "address": "5 Route de Marseille",
    "city": "Marseille",
    "latitude": 43.340936,
    "longitude": 5.35013,
    "fuels": [
      {
        "type": "E85",
        "price": 1.04
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      }
    ]
  },
  {
    "id": "20",
    "name": "BP Marseille 5",
    "brand": "BP",
    "address": "138 Boulevard de Marseille",
    "city": "Marseille",
    "latitude": 43.338282,
    "longitude": 5.365356,
    "fuels": [
      {
        "type": "E10",
        "price": 1.73
      },
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "SP98",
        "price": 2.1
      }
    ]
  },
  {
    "id": "21",
    "name": "Indépendant Marseille 6",
    "brand": "Indépendant",
    "address": "68 Boulevard de Marseille",
    "city": "Marseille",
    "latitude": 43.341786,
    "longitude": 5.436361,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "GAZOLE",
        "price": 1.87
      },
      {
        "type": "GPLC",
        "price": 1.09
      }
    ]
  },
  {
    "id": "22",
    "name": "Esso Marseille 7",
    "brand": "Esso",
    "address": "125 Avenue de Marseille",
    "city": "Marseille",
    "latitude": 43.249733,
    "longitude": 5.31852,
    "fuels": [
      {
        "type": "E10",
        "price": 1.8
      },
      {
        "type": "E85",
        "price": 0.97
      },
      {
        "type": "GAZOLE",
        "price": 1.72
      },
      {
        "type": "SP95",
        "price": 1.67
      },
      {
        "type": "SP98",
        "price": 2.01
      }
    ]
  },
  {
    "id": "23",
    "name": "Avia Marseille 8",
    "brand": "Avia",
    "address": "155 Boulevard de Marseille",
    "city": "Marseille",
    "latitude": 43.307856,
    "longitude": 5.303838,
    "fuels": [
      {
        "type": "E85",
        "price": 1.16
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      },
      {
        "type": "GPLC",
        "price": 1.05
      }
    ]
  },
  {
    "id": "24",
    "name": "Casino Marseille 9",
    "brand": "Casino",
    "address": "91 Impasse de Marseille",
    "city": "Marseille",
    "latitude": 43.270642,
    "longitude": 5.416702,
    "fuels": [
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "SP98",
        "price": 2.12
      }
    ]
  },
  {
    "id": "25",
    "name": "Indépendant Marseille 10",
    "brand": "Indépendant",
    "address": "150 Chemin de Marseille",
    "city": "Marseille",
    "latitude": 43.230575,
    "longitude": 5.408658,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "E85",
        "price": 0.96
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "26",
    "name": "Carrefour Marseille 11",
    "brand": "Carrefour",
    "address": "144 Impasse de Marseille",
    "city": "Marseille",
    "latitude": 43.330901,
    "longitude": 5.371959,
    "fuels": [
      {
        "type": "E85",
        "price": 0.96
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "27",
    "name": "Carrefour Marseille 12",
    "brand": "Carrefour",
    "address": "71 Boulevard de Marseille",
    "city": "Marseille",
    "latitude": 43.265081,
    "longitude": 5.344059,
    "fuels": [
      {
        "type": "E85",
        "price": 0.88
      },
      {
        "type": "GAZOLE",
        "price": 1.89
      },
      {
        "type": "GPLC",
        "price": 1.23
      }
    ]
  },
  {
    "id": "28",
    "name": "Système U Lyon 1",
    "brand": "Système U",
    "address": "89 Allée de Lyon",
    "city": "Lyon",
    "latitude": 45.804395,
    "longitude": 4.897328,
    "fuels": [
      {
        "type": "E10",
        "price": 1.92
      },
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "GPLC",
        "price": 0.93
      },
      {
        "type": "SP95",
        "price": 1.82
      }
    ]
  },
  {
    "id": "29",
    "name": "Casino Lyon 2",
    "brand": "Casino",
    "address": "96 Place de Lyon",
    "city": "Lyon",
    "latitude": 45.773241,
    "longitude": 4.776312,
    "fuels": [
      {
        "type": "E10",
        "price": 1.65
      },
      {
        "type": "GPLC",
        "price": 1.23
      },
      {
        "type": "SP98",
        "price": 1.85
      }
    ]
  },
  {
    "id": "30",
    "name": "Shell Lyon 3",
    "brand": "Shell",
    "address": "12 Boulevard de Lyon",
    "city": "Lyon",
    "latitude": 45.802925,
    "longitude": 4.846672,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.78
      },
      {
        "type": "SP95",
        "price": 1.7
      }
    ]
  },
  {
    "id": "31",
    "name": "Système U Lyon 4",
    "brand": "Système U",
    "address": "38 Impasse de Lyon",
    "city": "Lyon",
    "latitude": 45.779345,
    "longitude": 4.777255,
    "fuels": [
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "SP95",
        "price": 1.85
      },
      {
        "type": "SP98",
        "price": 1.91
      }
    ]
  },
  {
    "id": "32",
    "name": "Intermarché Lyon 5",
    "brand": "Intermarché",
    "address": "77 Chemin de Lyon",
    "city": "Lyon",
    "latitude": 45.78672,
    "longitude": 4.76661,
    "fuels": [
      {
        "type": "E85",
        "price": 0.95
      },
      {
        "type": "GAZOLE",
        "price": 1.71
      },
      {
        "type": "GPLC",
        "price": 0.95
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "33",
    "name": "Esso Lyon 6",
    "brand": "Esso",
    "address": "164 Avenue de Lyon",
    "city": "Lyon",
    "latitude": 45.742657,
    "longitude": 4.881049,
    "fuels": [
      {
        "type": "E10",
        "price": 1.93
      },
      {
        "type": "GPLC",
        "price": 0.95
      }
    ]
  },
  {
    "id": "34",
    "name": "Casino Lyon 7",
    "brand": "Casino",
    "address": "64 Place de Lyon",
    "city": "Lyon",
    "latitude": 45.736748,
    "longitude": 4.888555,
    "fuels": [
      {
        "type": "E10",
        "price": 1.94
      },
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "GAZOLE",
        "price": 1.7
      }
    ]
  },
  {
    "id": "35",
    "name": "BP Lyon 8",
    "brand": "BP",
    "address": "55 Place de Lyon",
    "city": "Lyon",
    "latitude": 45.749446,
    "longitude": 4.886458,
    "fuels": [
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "SP98",
        "price": 2.07
      }
    ]
  },
  {
    "id": "36",
    "name": "TotalEnergies Lyon 9",
    "brand": "TotalEnergies",
    "address": "153 Impasse de Lyon",
    "city": "Lyon",
    "latitude": 45.706175,
    "longitude": 4.809691,
    "fuels": [
      {
        "type": "E85",
        "price": 1.02
      },
      {
        "type": "GAZOLE",
        "price": 1.58
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "37",
    "name": "Shell Lyon 10",
    "brand": "Shell",
    "address": "131 Chemin de Lyon",
    "city": "Lyon",
    "latitude": 45.817508,
    "longitude": 4.836893,
    "fuels": [
      {
        "type": "E10",
        "price": 1.93
      },
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      }
    ]
  },
  {
    "id": "38",
    "name": "Indépendant Lyon 11",
    "brand": "Indépendant",
    "address": "193 Allée de Lyon",
    "city": "Lyon",
    "latitude": 45.69496,
    "longitude": 4.814618,
    "fuels": [
      {
        "type": "E10",
        "price": 1.85
      },
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "GPLC",
        "price": 0.95
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "39",
    "name": "Leclerc Lyon 12",
    "brand": "Leclerc",
    "address": "178 Chemin de Lyon",
    "city": "Lyon",
    "latitude": 45.770793,
    "longitude": 4.863698,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.05
      },
      {
        "type": "SP98",
        "price": 2.04
      }
    ]
  },
  {
    "id": "40",
    "name": "Elan Toulouse 1",
    "brand": "Elan",
    "address": "162 Rue de Toulouse",
    "city": "Toulouse",
    "latitude": 43.588679,
    "longitude": 1.456095,
    "fuels": [
      {
        "type": "E10",
        "price": 1.68
      },
      {
        "type": "E85",
        "price": 0.91
      },
      {
        "type": "GPLC",
        "price": 1.1
      },
      {
        "type": "SP98",
        "price": 1.82
      }
    ]
  },
  {
    "id": "41",
    "name": "Système U Toulouse 2",
    "brand": "Système U",
    "address": "29 Impasse de Toulouse",
    "city": "Toulouse",
    "latitude": 43.554978,
    "longitude": 1.40828,
    "fuels": [
      {
        "type": "E85",
        "price": 0.88
      },
      {
        "type": "SP95",
        "price": 1.83
      },
      {
        "type": "SP98",
        "price": 2.11
      }
    ]
  },
  {
    "id": "42",
    "name": "Leclerc Toulouse 3",
    "brand": "Leclerc",
    "address": "145 Route de Toulouse",
    "city": "Toulouse",
    "latitude": 43.538988,
    "longitude": 1.430492,
    "fuels": [
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "GAZOLE",
        "price": 1.53
      },
      {
        "type": "GPLC",
        "price": 0.93
      },
      {
        "type": "SP95",
        "price": 1.98
      },
      {
        "type": "SP98",
        "price": 1.81
      }
    ]
  },
  {
    "id": "43",
    "name": "Elan Toulouse 4",
    "brand": "Elan",
    "address": "95 Route de Toulouse",
    "city": "Toulouse",
    "latitude": 43.646764,
    "longitude": 1.46074,
    "fuels": [
      {
        "type": "E10",
        "price": 1.87
      },
      {
        "type": "GAZOLE",
        "price": 1.73
      },
      {
        "type": "GPLC",
        "price": 1.2
      }
    ]
  },
  {
    "id": "44",
    "name": "TotalEnergies Toulouse 5",
    "brand": "TotalEnergies",
    "address": "42 Rue de Toulouse",
    "city": "Toulouse",
    "latitude": 43.589388,
    "longitude": 1.418122,
    "fuels": [
      {
        "type": "E10",
        "price": 1.77
      },
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "GAZOLE",
        "price": 1.88
      },
      {
        "type": "SP95",
        "price": 1.92
      }
    ]
  },
  {
    "id": "45",
    "name": "Avia Toulouse 6",
    "brand": "Avia",
    "address": "193 Place de Toulouse",
    "city": "Toulouse",
    "latitude": 43.584353,
    "longitude": 1.430264,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "GAZOLE",
        "price": 1.7
      },
      {
        "type": "GPLC",
        "price": 1.18
      }
    ]
  },
  {
    "id": "46",
    "name": "Leclerc Toulouse 7",
    "brand": "Leclerc",
    "address": "150 Allée de Toulouse",
    "city": "Toulouse",
    "latitude": 43.642632,
    "longitude": 1.510703,
    "fuels": [
      {
        "type": "E10",
        "price": 1.64
      },
      {
        "type": "E85",
        "price": 0.96
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "GPLC",
        "price": 0.98
      },
      {
        "type": "SP98",
        "price": 1.78
      }
    ]
  },
  {
    "id": "47",
    "name": "Intermarché Toulouse 8",
    "brand": "Intermarché",
    "address": "48 Allée de Toulouse",
    "city": "Toulouse",
    "latitude": 43.610122,
    "longitude": 1.466987,
    "fuels": [
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "GPLC",
        "price": 1.06
      },
      {
        "type": "SP95",
        "price": 1.71
      }
    ]
  },
  {
    "id": "48",
    "name": "Esso Toulouse 9",
    "brand": "Esso",
    "address": "199 Rue de Toulouse",
    "city": "Toulouse",
    "latitude": 43.654966,
    "longitude": 1.436684,
    "fuels": [
      {
        "type": "E85",
        "price": 1.12
      },
      {
        "type": "GAZOLE",
        "price": 1.71
      },
      {
        "type": "GPLC",
        "price": 0.97
      }
    ]
  },
  {
    "id": "49",
    "name": "TotalEnergies Toulouse 10",
    "brand": "TotalEnergies",
    "address": "121 Rue de Toulouse",
    "city": "Toulouse",
    "latitude": 43.67138,
    "longitude": 1.414325,
    "fuels": [
      {
        "type": "E10",
        "price": 1.67
      },
      {
        "type": "SP98",
        "price": 1.77
      }
    ]
  },
  {
    "id": "50",
    "name": "Système U Nice 1",
    "brand": "Système U",
    "address": "109 Place de Nice",
    "city": "Nice",
    "latitude": 43.696837,
    "longitude": 7.287205,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.74
      },
      {
        "type": "SP95",
        "price": 1.79
      }
    ]
  },
  {
    "id": "51",
    "name": "Casino Nice 2",
    "brand": "Casino",
    "address": "49 Place de Nice",
    "city": "Nice",
    "latitude": 43.655208,
    "longitude": 7.296311,
    "fuels": [
      {
        "type": "E85",
        "price": 1.04
      },
      {
        "type": "GAZOLE",
        "price": 1.67
      },
      {
        "type": "GPLC",
        "price": 1.16
      },
      {
        "type": "SP95",
        "price": 1.74
      },
      {
        "type": "SP98",
        "price": 2.05
      }
    ]
  },
  {
    "id": "52",
    "name": "Indépendant Nice 3",
    "brand": "Indépendant",
    "address": "71 Allée de Nice",
    "city": "Nice",
    "latitude": 43.659249,
    "longitude": 7.193927,
    "fuels": [
      {
        "type": "E10",
        "price": 1.67
      },
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "GAZOLE",
        "price": 1.71
      },
      {
        "type": "SP95",
        "price": 1.83
      },
      {
        "type": "SP98",
        "price": 1.78
      }
    ]
  },
  {
    "id": "53",
    "name": "BP Nice 4",
    "brand": "BP",
    "address": "67 Chemin de Nice",
    "city": "Nice",
    "latitude": 43.732541,
    "longitude": 7.257831,
    "fuels": [
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "GAZOLE",
        "price": 1.63
      },
      {
        "type": "SP95",
        "price": 1.68
      }
    ]
  },
  {
    "id": "54",
    "name": "Elan Nice 5",
    "brand": "Elan",
    "address": "50 Rue de Nice",
    "city": "Nice",
    "latitude": 43.755463,
    "longitude": 7.247445,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GAZOLE",
        "price": 1.75
      },
      {
        "type": "GPLC",
        "price": 1.14
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "55",
    "name": "Système U Nice 6",
    "brand": "Système U",
    "address": "73 Route de Nice",
    "city": "Nice",
    "latitude": 43.773417,
    "longitude": 7.25447,
    "fuels": [
      {
        "type": "E10",
        "price": 1.74
      },
      {
        "type": "E85",
        "price": 0.87
      },
      {
        "type": "GAZOLE",
        "price": 1.77
      },
      {
        "type": "SP95",
        "price": 1.76
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "56",
    "name": "TotalEnergies Nice 7",
    "brand": "TotalEnergies",
    "address": "123 Allée de Nice",
    "city": "Nice",
    "latitude": 43.670683,
    "longitude": 7.256851,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "GAZOLE",
        "price": 1.79
      },
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
    "id": "57",
    "name": "Carrefour Nice 8",
    "brand": "Carrefour",
    "address": "81 Impasse de Nice",
    "city": "Nice",
    "latitude": 43.76886,
    "longitude": 7.315392,
    "fuels": [
      {
        "type": "E85",
        "price": 1.02
      },
      {
        "type": "GAZOLE",
        "price": 1.83
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.91
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "58",
    "name": "Système U Nice 9",
    "brand": "Système U",
    "address": "127 Route de Nice",
    "city": "Nice",
    "latitude": 43.725115,
    "longitude": 7.256606,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "GPLC",
        "price": 1.24
      },
      {
        "type": "SP95",
        "price": 1.94
      },
      {
        "type": "SP98",
        "price": 1.83
      }
    ]
  },
  {
    "id": "59",
    "name": "Indépendant Nice 10",
    "brand": "Indépendant",
    "address": "35 Route de Nice",
    "city": "Nice",
    "latitude": 43.705365,
    "longitude": 7.321713,
    "fuels": [
      {
        "type": "E85",
        "price": 0.96
      },
      {
        "type": "SP98",
        "price": 1.84
      }
    ]
  },
  {
    "id": "60",
    "name": "Esso Nantes 1",
    "brand": "Esso",
    "address": "178 Chemin de Nantes",
    "city": "Nantes",
    "latitude": 47.212154,
    "longitude": -1.604827,
    "fuels": [
      {
        "type": "E10",
        "price": 1.73
      },
      {
        "type": "GPLC",
        "price": 1.2
      },
      {
        "type": "SP95",
        "price": 1.82
      }
    ]
  },
  {
    "id": "61",
    "name": "TotalEnergies Nantes 2",
    "brand": "TotalEnergies",
    "address": "90 Boulevard de Nantes",
    "city": "Nantes",
    "latitude": 47.186139,
    "longitude": -1.587783,
    "fuels": [
      {
        "type": "E85",
        "price": 1.02
      },
      {
        "type": "SP95",
        "price": 1.81
      }
    ]
  },
  {
    "id": "62",
    "name": "Casino Nantes 3",
    "brand": "Casino",
    "address": "101 Chemin de Nantes",
    "city": "Nantes",
    "latitude": 47.217058,
    "longitude": -1.522721,
    "fuels": [
      {
        "type": "E10",
        "price": 1.8
      },
      {
        "type": "E85",
        "price": 1.08
      },
      {
        "type": "GPLC",
        "price": 1.01
      },
      {
        "type": "SP95",
        "price": 1.81
      },
      {
        "type": "SP98",
        "price": 1.78
      }
    ]
  },
  {
    "id": "63",
    "name": "Casino Nantes 4",
    "brand": "Casino",
    "address": "68 Route de Nantes",
    "city": "Nantes",
    "latitude": 47.199942,
    "longitude": -1.609705,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.6
      },
      {
        "type": "GPLC",
        "price": 1.23
      },
      {
        "type": "SP95",
        "price": 1.97
      }
    ]
  },
  {
    "id": "64",
    "name": "TotalEnergies Nantes 5",
    "brand": "TotalEnergies",
    "address": "69 Avenue de Nantes",
    "city": "Nantes",
    "latitude": 47.208516,
    "longitude": -1.581334,
    "fuels": [
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "GAZOLE",
        "price": 1.55
      }
    ]
  },
  {
    "id": "65",
    "name": "Système U Nantes 6",
    "brand": "Système U",
    "address": "108 Rue de Nantes",
    "city": "Nantes",
    "latitude": 47.153811,
    "longitude": -1.495665,
    "fuels": [
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "GPLC",
        "price": 1.24
      }
    ]
  },
  {
    "id": "66",
    "name": "Avia Nantes 7",
    "brand": "Avia",
    "address": "21 Chemin de Nantes",
    "city": "Nantes",
    "latitude": 47.164906,
    "longitude": -1.507535,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.66
      },
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP95",
        "price": 1.91
      },
      {
        "type": "SP98",
        "price": 1.8
      }
    ]
  },
  {
    "id": "67",
    "name": "Shell Nantes 8",
    "brand": "Shell",
    "address": "50 Impasse de Nantes",
    "city": "Nantes",
    "latitude": 47.176697,
    "longitude": -1.6017,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "SP98",
        "price": 2.04
      }
    ]
  },
  {
    "id": "68",
    "name": "Elan Nantes 9",
    "brand": "Elan",
    "address": "140 Place de Nantes",
    "city": "Nantes",
    "latitude": 47.232627,
    "longitude": -1.52773,
    "fuels": [
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "GPLC",
        "price": 1.07
      }
    ]
  },
  {
    "id": "69",
    "name": "Leclerc Nantes 10",
    "brand": "Leclerc",
    "address": "161 Avenue de Nantes",
    "city": "Nantes",
    "latitude": 47.274548,
    "longitude": -1.537442,
    "fuels": [
      {
        "type": "E10",
        "price": 1.89
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "70",
    "name": "Intermarché Strasbourg 1",
    "brand": "Intermarché",
    "address": "134 Chemin de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.535687,
    "longitude": 7.779345,
    "fuels": [
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "GPLC",
        "price": 1.06
      },
      {
        "type": "SP98",
        "price": 1.95
      }
    ]
  },
  {
    "id": "71",
    "name": "Esso Strasbourg 2",
    "brand": "Esso",
    "address": "168 Avenue de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.5427,
    "longitude": 7.758181,
    "fuels": [
      {
        "type": "E10",
        "price": 1.79
      },
      {
        "type": "GAZOLE",
        "price": 1.63
      },
      {
        "type": "GPLC",
        "price": 0.96
      },
      {
        "type": "SP95",
        "price": 1.82
      },
      {
        "type": "SP98",
        "price": 1.97
      }
    ]
  },
  {
    "id": "72",
    "name": "TotalEnergies Strasbourg 3",
    "brand": "TotalEnergies",
    "address": "111 Impasse de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.63298,
    "longitude": 7.722067,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.67
      },
      {
        "type": "GPLC",
        "price": 1.13
      },
      {
        "type": "SP95",
        "price": 1.83
      }
    ]
  },
  {
    "id": "73",
    "name": "Indépendant Strasbourg 4",
    "brand": "Indépendant",
    "address": "144 Avenue de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.564082,
    "longitude": 7.684477,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.81
      },
      {
        "type": "SP98",
        "price": 2.1
      }
    ]
  },
  {
    "id": "74",
    "name": "Casino Strasbourg 5",
    "brand": "Casino",
    "address": "122 Allée de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.531347,
    "longitude": 7.784625,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "E85",
        "price": 1.05
      },
      {
        "type": "GAZOLE",
        "price": 1.89
      },
      {
        "type": "SP95",
        "price": 1.77
      }
    ]
  },
  {
    "id": "75",
    "name": "BP Strasbourg 6",
    "brand": "BP",
    "address": "119 Allée de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.569111,
    "longitude": 7.735964,
    "fuels": [
      {
        "type": "E10",
        "price": 1.7
      },
      {
        "type": "GAZOLE",
        "price": 1.79
      },
      {
        "type": "GPLC",
        "price": 1.21
      },
      {
        "type": "SP95",
        "price": 1.9
      },
      {
        "type": "SP98",
        "price": 2.05
      }
    ]
  },
  {
    "id": "76",
    "name": "Leclerc Strasbourg 7",
    "brand": "Leclerc",
    "address": "4 Allée de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.515402,
    "longitude": 7.777678,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "GPLC",
        "price": 1.04
      },
      {
        "type": "SP98",
        "price": 1.9
      }
    ]
  },
  {
    "id": "77",
    "name": "TotalEnergies Strasbourg 8",
    "brand": "TotalEnergies",
    "address": "26 Place de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.581668,
    "longitude": 7.737518,
    "fuels": [
      {
        "type": "E85",
        "price": 1.01
      },
      {
        "type": "GAZOLE",
        "price": 1.53
      },
      {
        "type": "SP95",
        "price": 1.98
      }
    ]
  },
  {
    "id": "78",
    "name": "TotalEnergies Strasbourg 9",
    "brand": "TotalEnergies",
    "address": "70 Impasse de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.509005,
    "longitude": 7.80203,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "GAZOLE",
        "price": 1.67
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.77
      }
    ]
  },
  {
    "id": "79",
    "name": "TotalEnergies Strasbourg 10",
    "brand": "TotalEnergies",
    "address": "59 Chemin de Strasbourg",
    "city": "Strasbourg",
    "latitude": 48.574304,
    "longitude": 7.707043,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.66
      },
      {
        "type": "GPLC",
        "price": 0.95
      },
      {
        "type": "SP98",
        "price": 2.08
      }
    ]
  },
  {
    "id": "80",
    "name": "Intermarché Montpellier 1",
    "brand": "Intermarché",
    "address": "76 Impasse de Montpellier",
    "city": "Montpellier",
    "latitude": 43.667782,
    "longitude": 3.887066,
    "fuels": [
      {
        "type": "E85",
        "price": 1.08
      },
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.83
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "81",
    "name": "Indépendant Montpellier 2",
    "brand": "Indépendant",
    "address": "108 Avenue de Montpellier",
    "city": "Montpellier",
    "latitude": 43.644223,
    "longitude": 3.897344,
    "fuels": [
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "82",
    "name": "Leclerc Montpellier 3",
    "brand": "Leclerc",
    "address": "137 Impasse de Montpellier",
    "city": "Montpellier",
    "latitude": 43.565571,
    "longitude": 3.818839,
    "fuels": [
      {
        "type": "E85",
        "price": 1.12
      },
      {
        "type": "SP95",
        "price": 1.91
      }
    ]
  },
  {
    "id": "83",
    "name": "Indépendant Montpellier 4",
    "brand": "Indépendant",
    "address": "27 Chemin de Montpellier",
    "city": "Montpellier",
    "latitude": 43.644139,
    "longitude": 3.896075,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "GPLC",
        "price": 0.98
      }
    ]
  },
  {
    "id": "84",
    "name": "Leclerc Montpellier 5",
    "brand": "Leclerc",
    "address": "109 Route de Montpellier",
    "city": "Montpellier",
    "latitude": 43.671417,
    "longitude": 3.869956,
    "fuels": [
      {
        "type": "E10",
        "price": 1.7
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      }
    ]
  },
  {
    "id": "85",
    "name": "Leclerc Montpellier 6",
    "brand": "Leclerc",
    "address": "16 Chemin de Montpellier",
    "city": "Montpellier",
    "latitude": 43.649511,
    "longitude": 3.939092,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.84
      },
      {
        "type": "GPLC",
        "price": 1.11
      },
      {
        "type": "SP95",
        "price": 1.89
      },
      {
        "type": "SP98",
        "price": 1.9
      }
    ]
  },
  {
    "id": "86",
    "name": "Système U Montpellier 7",
    "brand": "Système U",
    "address": "185 Impasse de Montpellier",
    "city": "Montpellier",
    "latitude": 43.560953,
    "longitude": 3.871571,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "GAZOLE",
        "price": 1.75
      }
    ]
  },
  {
    "id": "87",
    "name": "Elan Montpellier 8",
    "brand": "Elan",
    "address": "30 Route de Montpellier",
    "city": "Montpellier",
    "latitude": 43.630976,
    "longitude": 3.944797,
    "fuels": [
      {
        "type": "E85",
        "price": 1.16
      },
      {
        "type": "GAZOLE",
        "price": 1.65
      }
    ]
  },
  {
    "id": "88",
    "name": "Elan Bordeaux 1",
    "brand": "Elan",
    "address": "75 Impasse de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.900522,
    "longitude": -0.593462,
    "fuels": [
      {
        "type": "E10",
        "price": 1.77
      },
      {
        "type": "GAZOLE",
        "price": 1.74
      }
    ]
  },
  {
    "id": "89",
    "name": "Shell Bordeaux 2",
    "brand": "Shell",
    "address": "72 Avenue de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.80993,
    "longitude": -0.513283,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "E85",
        "price": 1.02
      },
      {
        "type": "SP95",
        "price": 1.75
      },
      {
        "type": "SP98",
        "price": 1.85
      }
    ]
  },
  {
    "id": "90",
    "name": "Leclerc Bordeaux 3",
    "brand": "Leclerc",
    "address": "11 Chemin de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.863321,
    "longitude": -0.632381,
    "fuels": [
      {
        "type": "E10",
        "price": 1.73
      },
      {
        "type": "GAZOLE",
        "price": 1.58
      },
      {
        "type": "SP95",
        "price": 1.89
      }
    ]
  },
  {
    "id": "91",
    "name": "TotalEnergies Bordeaux 4",
    "brand": "TotalEnergies",
    "address": "79 Impasse de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.848338,
    "longitude": -0.593059,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "92",
    "name": "Casino Bordeaux 5",
    "brand": "Casino",
    "address": "184 Impasse de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.803527,
    "longitude": -0.581335,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "GAZOLE",
        "price": 1.61
      }
    ]
  },
  {
    "id": "93",
    "name": "Système U Bordeaux 6",
    "brand": "Système U",
    "address": "5 Route de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.816744,
    "longitude": -0.596825,
    "fuels": [
      {
        "type": "E10",
        "price": 1.91
      },
      {
        "type": "SP95",
        "price": 1.93
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "94",
    "name": "Elan Bordeaux 7",
    "brand": "Elan",
    "address": "6 Route de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.89362,
    "longitude": -0.519464,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "E85",
        "price": 1.08
      },
      {
        "type": "SP95",
        "price": 1.68
      }
    ]
  },
  {
    "id": "95",
    "name": "Casino Bordeaux 8",
    "brand": "Casino",
    "address": "19 Allée de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.800984,
    "longitude": -0.588152,
    "fuels": [
      {
        "type": "E10",
        "price": 1.7
      },
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GPLC",
        "price": 1.1
      },
      {
        "type": "SP98",
        "price": 2.11
      }
    ]
  },
  {
    "id": "96",
    "name": "TotalEnergies Bordeaux 9",
    "brand": "TotalEnergies",
    "address": "91 Chemin de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.807063,
    "longitude": -0.516168,
    "fuels": [
      {
        "type": "E85",
        "price": 1.16
      },
      {
        "type": "GAZOLE",
        "price": 1.52
      },
      {
        "type": "GPLC",
        "price": 1.12
      },
      {
        "type": "SP95",
        "price": 1.73
      },
      {
        "type": "SP98",
        "price": 1.82
      }
    ]
  },
  {
    "id": "97",
    "name": "Leclerc Bordeaux 10",
    "brand": "Leclerc",
    "address": "88 Boulevard de Bordeaux",
    "city": "Bordeaux",
    "latitude": 44.843092,
    "longitude": -0.52201,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "GPLC",
        "price": 1.19
      },
      {
        "type": "SP98",
        "price": 2.01
      }
    ]
  },
  {
    "id": "98",
    "name": "Esso Lille 1",
    "brand": "Esso",
    "address": "93 Rue de Lille",
    "city": "Lille",
    "latitude": 50.66442,
    "longitude": 3.075627,
    "fuels": [
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "SP95",
        "price": 1.89
      }
    ]
  },
  {
    "id": "99",
    "name": "Shell Lille 2",
    "brand": "Shell",
    "address": "102 Chemin de Lille",
    "city": "Lille",
    "latitude": 50.663881,
    "longitude": 2.994557,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "E85",
        "price": 1.17
      },
      {
        "type": "GAZOLE",
        "price": 1.78
      },
      {
        "type": "GPLC",
        "price": 1.21
      },
      {
        "type": "SP95",
        "price": 1.7
      }
    ]
  },
  {
    "id": "100",
    "name": "Indépendant Lille 3",
    "brand": "Indépendant",
    "address": "60 Place de Lille",
    "city": "Lille",
    "latitude": 50.565275,
    "longitude": 3.03095,
    "fuels": [
      {
        "type": "E10",
        "price": 1.62
      },
      {
        "type": "E85",
        "price": 0.9
      },
      {
        "type": "GAZOLE",
        "price": 1.63
      },
      {
        "type": "GPLC",
        "price": 1.18
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "101",
    "name": "BP Lille 4",
    "brand": "BP",
    "address": "116 Chemin de Lille",
    "city": "Lille",
    "latitude": 50.600413,
    "longitude": 3.108406,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "GAZOLE",
        "price": 1.61
      }
    ]
  },
  {
    "id": "102",
    "name": "BP Lille 5",
    "brand": "BP",
    "address": "142 Place de Lille",
    "city": "Lille",
    "latitude": 50.637762,
    "longitude": 3.019093,
    "fuels": [
      {
        "type": "E10",
        "price": 1.63
      },
      {
        "type": "GAZOLE",
        "price": 1.7
      },
      {
        "type": "SP98",
        "price": 1.91
      }
    ]
  },
  {
    "id": "103",
    "name": "BP Lille 6",
    "brand": "BP",
    "address": "186 Allée de Lille",
    "city": "Lille",
    "latitude": 50.650389,
    "longitude": 3.059842,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "E85",
        "price": 1.17
      },
      {
        "type": "GAZOLE",
        "price": 1.88
      },
      {
        "type": "GPLC",
        "price": 1.13
      },
      {
        "type": "SP98",
        "price": 1.8
      }
    ]
  },
  {
    "id": "104",
    "name": "TotalEnergies Lille 7",
    "brand": "TotalEnergies",
    "address": "200 Allée de Lille",
    "city": "Lille",
    "latitude": 50.591611,
    "longitude": 2.996147,
    "fuels": [
      {
        "type": "E85",
        "price": 1.16
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      }
    ]
  },
  {
    "id": "105",
    "name": "Leclerc Lille 8",
    "brand": "Leclerc",
    "address": "181 Allée de Lille",
    "city": "Lille",
    "latitude": 50.693096,
    "longitude": 3.045628,
    "fuels": [
      {
        "type": "E85",
        "price": 1.17
      },
      {
        "type": "GAZOLE",
        "price": 1.73
      },
      {
        "type": "GPLC",
        "price": 1.04
      },
      {
        "type": "SP95",
        "price": 1.72
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "106",
    "name": "Carrefour Lille 9",
    "brand": "Carrefour",
    "address": "6 Boulevard de Lille",
    "city": "Lille",
    "latitude": 50.650427,
    "longitude": 3.062926,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GAZOLE",
        "price": 1.73
      },
      {
        "type": "GPLC",
        "price": 1.15
      },
      {
        "type": "SP95",
        "price": 1.73
      }
    ]
  },
  {
    "id": "107",
    "name": "Leclerc Lille 10",
    "brand": "Leclerc",
    "address": "154 Impasse de Lille",
    "city": "Lille",
    "latitude": 50.689759,
    "longitude": 3.096027,
    "fuels": [
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "GAZOLE",
        "price": 1.87
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "108",
    "name": "Intermarché Rennes 1",
    "brand": "Intermarché",
    "address": "75 Avenue de Rennes",
    "city": "Rennes",
    "latitude": 48.092982,
    "longitude": -1.67837,
    "fuels": [
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "GAZOLE",
        "price": 1.53
      },
      {
        "type": "GPLC",
        "price": 1.14
      },
      {
        "type": "SP95",
        "price": 1.85
      },
      {
        "type": "SP98",
        "price": 1.96
      }
    ]
  },
  {
    "id": "109",
    "name": "Leclerc Rennes 2",
    "brand": "Leclerc",
    "address": "24 Allée de Rennes",
    "city": "Rennes",
    "latitude": 48.151544,
    "longitude": -1.634562,
    "fuels": [
      {
        "type": "E85",
        "price": 0.86
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "GPLC",
        "price": 1.01
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "110",
    "name": "Leclerc Rennes 3",
    "brand": "Leclerc",
    "address": "85 Boulevard de Rennes",
    "city": "Rennes",
    "latitude": 48.055395,
    "longitude": -1.703033,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "SP98",
        "price": 1.86
      }
    ]
  },
  {
    "id": "111",
    "name": "Elan Rennes 4",
    "brand": "Elan",
    "address": "65 Chemin de Rennes",
    "city": "Rennes",
    "latitude": 48.10034,
    "longitude": -1.665001,
    "fuels": [
      {
        "type": "E10",
        "price": 1.85
      },
      {
        "type": "E85",
        "price": 1.16
      },
      {
        "type": "GPLC",
        "price": 1.1
      },
      {
        "type": "SP95",
        "price": 1.71
      }
    ]
  },
  {
    "id": "112",
    "name": "Shell Rennes 5",
    "brand": "Shell",
    "address": "179 Impasse de Rennes",
    "city": "Rennes",
    "latitude": 48.142586,
    "longitude": -1.715604,
    "fuels": [
      {
        "type": "E10",
        "price": 1.84
      },
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "GAZOLE",
        "price": 1.84
      }
    ]
  },
  {
    "id": "113",
    "name": "Avia Rennes 6",
    "brand": "Avia",
    "address": "193 Chemin de Rennes",
    "city": "Rennes",
    "latitude": 48.138056,
    "longitude": -1.697059,
    "fuels": [
      {
        "type": "E85",
        "price": 1.17
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      },
      {
        "type": "GPLC",
        "price": 0.98
      },
      {
        "type": "SP95",
        "price": 1.94
      },
      {
        "type": "SP98",
        "price": 1.98
      }
    ]
  },
  {
    "id": "114",
    "name": "Leclerc Reims 1",
    "brand": "Leclerc",
    "address": "16 Rue de Reims",
    "city": "Reims",
    "latitude": 49.198738,
    "longitude": 4.078823,
    "fuels": [
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "GPLC",
        "price": 1.17
      }
    ]
  },
  {
    "id": "115",
    "name": "Casino Reims 2",
    "brand": "Casino",
    "address": "131 Boulevard de Reims",
    "city": "Reims",
    "latitude": 49.311734,
    "longitude": 4.056365,
    "fuels": [
      {
        "type": "E85",
        "price": 0.98
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      },
      {
        "type": "SP95",
        "price": 1.71
      }
    ]
  },
  {
    "id": "116",
    "name": "Leclerc Reims 3",
    "brand": "Leclerc",
    "address": "148 Place de Reims",
    "city": "Reims",
    "latitude": 49.299538,
    "longitude": 4.079998,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      }
    ]
  },
  {
    "id": "117",
    "name": "Système U Reims 4",
    "brand": "Système U",
    "address": "34 Rue de Reims",
    "city": "Reims",
    "latitude": 49.27522,
    "longitude": 3.974927,
    "fuels": [
      {
        "type": "E10",
        "price": 1.89
      },
      {
        "type": "E85",
        "price": 0.9
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      },
      {
        "type": "SP95",
        "price": 1.99
      }
    ]
  },
  {
    "id": "118",
    "name": "BP Reims 5",
    "brand": "BP",
    "address": "80 Impasse de Reims",
    "city": "Reims",
    "latitude": 49.297769,
    "longitude": 3.966426,
    "fuels": [
      {
        "type": "E10",
        "price": 1.74
      },
      {
        "type": "SP98",
        "price": 1.95
      }
    ]
  },
  {
    "id": "119",
    "name": "Intermarché Reims 6",
    "brand": "Intermarché",
    "address": "80 Avenue de Reims",
    "city": "Reims",
    "latitude": 49.249104,
    "longitude": 4.015139,
    "fuels": [
      {
        "type": "E85",
        "price": 0.87
      },
      {
        "type": "GPLC",
        "price": 1.14
      }
    ]
  },
  {
    "id": "120",
    "name": "Intermarché Le Havre 1",
    "brand": "Intermarché",
    "address": "36 Avenue de Le Havre",
    "city": "Le Havre",
    "latitude": 49.543926,
    "longitude": 0.075725,
    "fuels": [
      {
        "type": "E85",
        "price": 0.99
      },
      {
        "type": "SP98",
        "price": 1.9
      }
    ]
  },
  {
    "id": "121",
    "name": "Avia Le Havre 2",
    "brand": "Avia",
    "address": "40 Rue de Le Havre",
    "city": "Le Havre",
    "latitude": 49.522267,
    "longitude": 0.076864,
    "fuels": [
      {
        "type": "E10",
        "price": 1.71
      },
      {
        "type": "E85",
        "price": 1.15
      },
      {
        "type": "GAZOLE",
        "price": 1.52
      },
      {
        "type": "SP98",
        "price": 2.1
      }
    ]
  },
  {
    "id": "122",
    "name": "Leclerc Le Havre 3",
    "brand": "Leclerc",
    "address": "18 Impasse de Le Havre",
    "city": "Le Havre",
    "latitude": 49.524873,
    "longitude": 0.156927,
    "fuels": [
      {
        "type": "E10",
        "price": 1.81
      },
      {
        "type": "GAZOLE",
        "price": 1.84
      },
      {
        "type": "GPLC",
        "price": 1.21
      }
    ]
  },
  {
    "id": "123",
    "name": "Indépendant Le Havre 4",
    "brand": "Indépendant",
    "address": "140 Impasse de Le Havre",
    "city": "Le Havre",
    "latitude": 49.549614,
    "longitude": 0.099015,
    "fuels": [
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GAZOLE",
        "price": 1.76
      },
      {
        "type": "SP95",
        "price": 1.69
      }
    ]
  },
  {
    "id": "124",
    "name": "Esso Le Havre 5",
    "brand": "Esso",
    "address": "137 Chemin de Le Havre",
    "city": "Le Havre",
    "latitude": 49.487714,
    "longitude": 0.051242,
    "fuels": [
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "GAZOLE",
        "price": 1.83
      }
    ]
  },
  {
    "id": "125",
    "name": "BP Saint-Étienne 1",
    "brand": "BP",
    "address": "185 Chemin de Saint-Étienne",
    "city": "Saint-Étienne",
    "latitude": 45.415595,
    "longitude": 4.319127,
    "fuels": [
      {
        "type": "E10",
        "price": 1.84
      },
      {
        "type": "GAZOLE",
        "price": 1.55
      },
      {
        "type": "GPLC",
        "price": 0.94
      }
    ]
  },
  {
    "id": "126",
    "name": "Système U Saint-Étienne 2",
    "brand": "Système U",
    "address": "134 Route de Saint-Étienne",
    "city": "Saint-Étienne",
    "latitude": 45.479516,
    "longitude": 4.436198,
    "fuels": [
      {
        "type": "E10",
        "price": 1.64
      },
      {
        "type": "GAZOLE",
        "price": 1.83
      },
      {
        "type": "GPLC",
        "price": 1.12
      },
      {
        "type": "SP95",
        "price": 1.89
      }
    ]
  },
  {
    "id": "127",
    "name": "Intermarché Saint-Étienne 3",
    "brand": "Intermarché",
    "address": "36 Avenue de Saint-Étienne",
    "city": "Saint-Étienne",
    "latitude": 45.445812,
    "longitude": 4.40023,
    "fuels": [
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "GAZOLE",
        "price": 1.87
      },
      {
        "type": "GPLC",
        "price": 1.24
      },
      {
        "type": "SP95",
        "price": 1.83
      },
      {
        "type": "SP98",
        "price": 2.01
      }
    ]
  },
  {
    "id": "128",
    "name": "Intermarché Saint-Étienne 4",
    "brand": "Intermarché",
    "address": "162 Rue de Saint-Étienne",
    "city": "Saint-Étienne",
    "latitude": 45.499859,
    "longitude": 4.358571,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "GAZOLE",
        "price": 1.79
      },
      {
        "type": "SP98",
        "price": 2.09
      }
    ]
  },
  {
    "id": "129",
    "name": "BP Saint-Étienne 5",
    "brand": "BP",
    "address": "196 Avenue de Saint-Étienne",
    "city": "Saint-Étienne",
    "latitude": 45.396753,
    "longitude": 4.396541,
    "fuels": [
      {
        "type": "E10",
        "price": 1.93
      },
      {
        "type": "GPLC",
        "price": 1.04
      }
    ]
  },
  {
    "id": "130",
    "name": "Carrefour Toulon 1",
    "brand": "Carrefour",
    "address": "167 Chemin de Toulon",
    "city": "Toulon",
    "latitude": 43.181558,
    "longitude": 5.952908,
    "fuels": [
      {
        "type": "E10",
        "price": 1.68
      },
      {
        "type": "E85",
        "price": 1.13
      },
      {
        "type": "SP98",
        "price": 1.97
      }
    ]
  },
  {
    "id": "131",
    "name": "Elan Toulon 2",
    "brand": "Elan",
    "address": "9 Place de Toulon",
    "city": "Toulon",
    "latitude": 43.094877,
    "longitude": 5.958308,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GAZOLE",
        "price": 1.68
      },
      {
        "type": "GPLC",
        "price": 1.1
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "132",
    "name": "Shell Toulon 3",
    "brand": "Shell",
    "address": "110 Route de Toulon",
    "city": "Toulon",
    "latitude": 43.061717,
    "longitude": 5.911307,
    "fuels": [
      {
        "type": "E85",
        "price": 1.15
      },
      {
        "type": "GAZOLE",
        "price": 1.58
      },
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP95",
        "price": 1.98
      }
    ]
  },
  {
    "id": "133",
    "name": "Indépendant Toulon 4",
    "brand": "Indépendant",
    "address": "149 Route de Toulon",
    "city": "Toulon",
    "latitude": 43.091303,
    "longitude": 5.963004,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "GPLC",
        "price": 0.92
      },
      {
        "type": "SP95",
        "price": 1.71
      },
      {
        "type": "SP98",
        "price": 1.86
      }
    ]
  },
  {
    "id": "134",
    "name": "Indépendant Toulon 5",
    "brand": "Indépendant",
    "address": "97 Place de Toulon",
    "city": "Toulon",
    "latitude": 43.116129,
    "longitude": 5.997673,
    "fuels": [
      {
        "type": "E10",
        "price": 1.67
      },
      {
        "type": "E85",
        "price": 0.98
      },
      {
        "type": "GPLC",
        "price": 0.96
      },
      {
        "type": "SP95",
        "price": 1.75
      },
      {
        "type": "SP98",
        "price": 1.78
      }
    ]
  },
  {
    "id": "135",
    "name": "Carrefour Grenoble 1",
    "brand": "Carrefour",
    "address": "141 Route de Grenoble",
    "city": "Grenoble",
    "latitude": 45.194164,
    "longitude": 5.694488,
    "fuels": [
      {
        "type": "E10",
        "price": 1.7
      },
      {
        "type": "E85",
        "price": 0.85
      },
      {
        "type": "GPLC",
        "price": 1.21
      },
      {
        "type": "SP98",
        "price": 1.87
      }
    ]
  },
  {
    "id": "136",
    "name": "Intermarché Grenoble 2",
    "brand": "Intermarché",
    "address": "156 Rue de Grenoble",
    "city": "Grenoble",
    "latitude": 45.173492,
    "longitude": 5.723716,
    "fuels": [
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "SP95",
        "price": 1.74
      }
    ]
  },
  {
    "id": "137",
    "name": "Leclerc Grenoble 3",
    "brand": "Leclerc",
    "address": "174 Impasse de Grenoble",
    "city": "Grenoble",
    "latitude": 45.169979,
    "longitude": 5.759749,
    "fuels": [
      {
        "type": "E10",
        "price": 1.77
      },
      {
        "type": "GAZOLE",
        "price": 1.53
      },
      {
        "type": "GPLC",
        "price": 1.22
      },
      {
        "type": "SP95",
        "price": 1.88
      }
    ]
  },
  {
    "id": "138",
    "name": "Carrefour Grenoble 4",
    "brand": "Carrefour",
    "address": "69 Rue de Grenoble",
    "city": "Grenoble",
    "latitude": 45.139717,
    "longitude": 5.712186,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.76
      },
      {
        "type": "SP95",
        "price": 1.9
      }
    ]
  },
  {
    "id": "139",
    "name": "Avia Grenoble 5",
    "brand": "Avia",
    "address": "134 Chemin de Grenoble",
    "city": "Grenoble",
    "latitude": 45.122965,
    "longitude": 5.724586,
    "fuels": [
      {
        "type": "E85",
        "price": 1.07
      },
      {
        "type": "GAZOLE",
        "price": 1.84
      },
      {
        "type": "GPLC",
        "price": 1.23
      },
      {
        "type": "SP95",
        "price": 1.69
      }
    ]
  },
  {
    "id": "140",
    "name": "Carrefour Dijon 1",
    "brand": "Carrefour",
    "address": "65 Route de Dijon",
    "city": "Dijon",
    "latitude": 47.265177,
    "longitude": 5.041953,
    "fuels": [
      {
        "type": "E10",
        "price": 1.71
      },
      {
        "type": "E85",
        "price": 0.87
      },
      {
        "type": "GPLC",
        "price": 1.02
      },
      {
        "type": "SP95",
        "price": 1.76
      },
      {
        "type": "SP98",
        "price": 1.8
      }
    ]
  },
  {
    "id": "141",
    "name": "Avia Dijon 2",
    "brand": "Avia",
    "address": "165 Boulevard de Dijon",
    "city": "Dijon",
    "latitude": 47.374503,
    "longitude": 4.973361,
    "fuels": [
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "GAZOLE",
        "price": 1.54
      },
      {
        "type": "SP95",
        "price": 1.81
      },
      {
        "type": "SP98",
        "price": 1.89
      }
    ]
  },
  {
    "id": "142",
    "name": "BP Dijon 3",
    "brand": "BP",
    "address": "12 Chemin de Dijon",
    "city": "Dijon",
    "latitude": 47.391429,
    "longitude": 4.981045,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.72
      },
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "143",
    "name": "Avia Dijon 4",
    "brand": "Avia",
    "address": "132 Rue de Dijon",
    "city": "Dijon",
    "latitude": 47.310345,
    "longitude": 4.972873,
    "fuels": [
      {
        "type": "E10",
        "price": 1.85
      },
      {
        "type": "E85",
        "price": 1.15
      },
      {
        "type": "SP95",
        "price": 1.76
      }
    ]
  },
  {
    "id": "144",
    "name": "Shell Dijon 5",
    "brand": "Shell",
    "address": "60 Route de Dijon",
    "city": "Dijon",
    "latitude": 47.321973,
    "longitude": 5.023006,
    "fuels": [
      {
        "type": "E10",
        "price": 1.92
      },
      {
        "type": "E85",
        "price": 0.88
      },
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "GPLC",
        "price": 1.07
      },
      {
        "type": "SP95",
        "price": 1.76
      }
    ]
  },
  {
    "id": "145",
    "name": "Avia Angers 1",
    "brand": "Avia",
    "address": "76 Avenue de Angers",
    "city": "Angers",
    "latitude": 47.489485,
    "longitude": -0.630718,
    "fuels": [
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "GAZOLE",
        "price": 1.74
      },
      {
        "type": "SP95",
        "price": 1.75
      },
      {
        "type": "SP98",
        "price": 1.95
      }
    ]
  },
  {
    "id": "146",
    "name": "Elan Angers 2",
    "brand": "Elan",
    "address": "176 Rue de Angers",
    "city": "Angers",
    "latitude": 47.474046,
    "longitude": -0.569865,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "GPLC",
        "price": 1.24
      }
    ]
  },
  {
    "id": "147",
    "name": "Avia Angers 3",
    "brand": "Avia",
    "address": "116 Allée de Angers",
    "city": "Angers",
    "latitude": 47.441846,
    "longitude": -0.587705,
    "fuels": [
      {
        "type": "E10",
        "price": 1.79
      },
      {
        "type": "E85",
        "price": 0.99
      },
      {
        "type": "GPLC",
        "price": 1.19
      },
      {
        "type": "SP98",
        "price": 2.05
      }
    ]
  },
  {
    "id": "148",
    "name": "Elan Angers 4",
    "brand": "Elan",
    "address": "18 Boulevard de Angers",
    "city": "Angers",
    "latitude": 47.444733,
    "longitude": -0.603306,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.58
      },
      {
        "type": "GPLC",
        "price": 1.2
      },
      {
        "type": "SP95",
        "price": 1.71
      }
    ]
  },
  {
    "id": "149",
    "name": "Leclerc Angers 5",
    "brand": "Leclerc",
    "address": "156 Allée de Angers",
    "city": "Angers",
    "latitude": 47.498548,
    "longitude": -0.497958,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "SP95",
        "price": 1.84
      }
    ]
  },
  {
    "id": "150",
    "name": "Esso Nîmes 1",
    "brand": "Esso",
    "address": "65 Rue de Nîmes",
    "city": "Nîmes",
    "latitude": 43.768187,
    "longitude": 4.299086,
    "fuels": [
      {
        "type": "E10",
        "price": 1.79
      },
      {
        "type": "GPLC",
        "price": 1.14
      }
    ]
  },
  {
    "id": "151",
    "name": "Esso Nîmes 2",
    "brand": "Esso",
    "address": "179 Place de Nîmes",
    "city": "Nîmes",
    "latitude": 43.860194,
    "longitude": 4.353262,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.65
      },
      {
        "type": "GPLC",
        "price": 1.05
      },
      {
        "type": "SP98",
        "price": 1.87
      }
    ]
  },
  {
    "id": "152",
    "name": "Casino Nîmes 3",
    "brand": "Casino",
    "address": "6 Rue de Nîmes",
    "city": "Nîmes",
    "latitude": 43.770848,
    "longitude": 4.389041,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "GAZOLE",
        "price": 1.72
      },
      {
        "type": "GPLC",
        "price": 1.22
      }
    ]
  },
  {
    "id": "153",
    "name": "Leclerc Nîmes 4",
    "brand": "Leclerc",
    "address": "90 Rue de Nîmes",
    "city": "Nîmes",
    "latitude": 43.832884,
    "longitude": 4.429484,
    "fuels": [
      {
        "type": "E10",
        "price": 1.7
      },
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "SP95",
        "price": 1.71
      },
      {
        "type": "SP98",
        "price": 1.92
      }
    ]
  },
  {
    "id": "154",
    "name": "Leclerc Nîmes 5",
    "brand": "Leclerc",
    "address": "88 Rue de Nîmes",
    "city": "Nîmes",
    "latitude": 43.806946,
    "longitude": 4.340316,
    "fuels": [
      {
        "type": "E10",
        "price": 1.77
      },
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.93
      },
      {
        "type": "SP98",
        "price": 1.93
      }
    ]
  },
  {
    "id": "155",
    "name": "Carrefour Villeurbanne 1",
    "brand": "Carrefour",
    "address": "187 Place de Villeurbanne",
    "city": "Villeurbanne",
    "latitude": 45.838461,
    "longitude": 4.861573,
    "fuels": [
      {
        "type": "E85",
        "price": 1.16
      },
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.94
      }
    ]
  },
  {
    "id": "156",
    "name": "Elan Villeurbanne 2",
    "brand": "Elan",
    "address": "68 Boulevard de Villeurbanne",
    "city": "Villeurbanne",
    "latitude": 45.70698,
    "longitude": 4.928721,
    "fuels": [
      {
        "type": "E10",
        "price": 1.79
      },
      {
        "type": "GPLC",
        "price": 1.19
      }
    ]
  },
  {
    "id": "157",
    "name": "TotalEnergies Villeurbanne 3",
    "brand": "TotalEnergies",
    "address": "101 Rue de Villeurbanne",
    "city": "Villeurbanne",
    "latitude": 45.716141,
    "longitude": 4.958987,
    "fuels": [
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GAZOLE",
        "price": 1.82
      }
    ]
  },
  {
    "id": "158",
    "name": "Indépendant Villeurbanne 4",
    "brand": "Indépendant",
    "address": "32 Boulevard de Villeurbanne",
    "city": "Villeurbanne",
    "latitude": 45.732072,
    "longitude": 4.944772,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.78
      },
      {
        "type": "GPLC",
        "price": 1.15
      }
    ]
  },
  {
    "id": "159",
    "name": "TotalEnergies Clermont-Ferrand 1",
    "brand": "TotalEnergies",
    "address": "164 Avenue de Clermont-Ferrand",
    "city": "Clermont-Ferrand",
    "latitude": 45.791701,
    "longitude": 3.078536,
    "fuels": [
      {
        "type": "E10",
        "price": 1.92
      },
      {
        "type": "E85",
        "price": 1.1
      },
      {
        "type": "GAZOLE",
        "price": 1.82
      },
      {
        "type": "GPLC",
        "price": 1.16
      },
      {
        "type": "SP98",
        "price": 2.09
      }
    ]
  },
  {
    "id": "160",
    "name": "Shell Clermont-Ferrand 2",
    "brand": "Shell",
    "address": "3 Impasse de Clermont-Ferrand",
    "city": "Clermont-Ferrand",
    "latitude": 45.798224,
    "longitude": 3.109369,
    "fuels": [
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "GAZOLE",
        "price": 1.75
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.68
      },
      {
        "type": "SP98",
        "price": 2.04
      }
    ]
  },
  {
    "id": "161",
    "name": "Indépendant Clermont-Ferrand 3",
    "brand": "Indépendant",
    "address": "117 Chemin de Clermont-Ferrand",
    "city": "Clermont-Ferrand",
    "latitude": 45.719976,
    "longitude": 3.059116,
    "fuels": [
      {
        "type": "E85",
        "price": 1.04
      },
      {
        "type": "SP98",
        "price": 2.01
      }
    ]
  },
  {
    "id": "162",
    "name": "Leclerc Clermont-Ferrand 4",
    "brand": "Leclerc",
    "address": "184 Rue de Clermont-Ferrand",
    "city": "Clermont-Ferrand",
    "latitude": 45.719185,
    "longitude": 3.046729,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.88
      },
      {
        "type": "GPLC",
        "price": 0.98
      }
    ]
  },
  {
    "id": "163",
    "name": "Carrefour Clermont-Ferrand 5",
    "brand": "Carrefour",
    "address": "135 Boulevard de Clermont-Ferrand",
    "city": "Clermont-Ferrand",
    "latitude": 45.716596,
    "longitude": 3.088066,
    "fuels": [
      {
        "type": "E85",
        "price": 1.12
      },
      {
        "type": "GAZOLE",
        "price": 1.85
      }
    ]
  },
  {
    "id": "164",
    "name": "Esso Aix-en-Provence 1",
    "brand": "Esso",
    "address": "189 Boulevard de Aix-en-Provence",
    "city": "Aix-en-Provence",
    "latitude": 43.591225,
    "longitude": 5.426345,
    "fuels": [
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "165",
    "name": "Elan Aix-en-Provence 2",
    "brand": "Elan",
    "address": "18 Impasse de Aix-en-Provence",
    "city": "Aix-en-Provence",
    "latitude": 43.490825,
    "longitude": 5.454211,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.72
      },
      {
        "type": "SP95",
        "price": 1.85
      }
    ]
  },
  {
    "id": "166",
    "name": "Intermarché Aix-en-Provence 3",
    "brand": "Intermarché",
    "address": "162 Route de Aix-en-Provence",
    "city": "Aix-en-Provence",
    "latitude": 43.465361,
    "longitude": 5.411348,
    "fuels": [
      {
        "type": "E85",
        "price": 0.85
      },
      {
        "type": "GAZOLE",
        "price": 1.67
      }
    ]
  },
  {
    "id": "167",
    "name": "Leclerc Aix-en-Provence 4",
    "brand": "Leclerc",
    "address": "117 Impasse de Aix-en-Provence",
    "city": "Aix-en-Provence",
    "latitude": 43.500124,
    "longitude": 5.439988,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GPLC",
        "price": 1.08
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "168",
    "name": "Elan Aix-en-Provence 5",
    "brand": "Elan",
    "address": "55 Avenue de Aix-en-Provence",
    "city": "Aix-en-Provence",
    "latitude": 43.473491,
    "longitude": 5.489608,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "GAZOLE",
        "price": 1.66
      },
      {
        "type": "SP98",
        "price": 2.07
      }
    ]
  },
  {
    "id": "169",
    "name": "Indépendant Brest 1",
    "brand": "Indépendant",
    "address": "38 Route de Brest",
    "city": "Brest",
    "latitude": 48.440928,
    "longitude": -4.537986,
    "fuels": [
      {
        "type": "GPLC",
        "price": 0.95
      },
      {
        "type": "SP98",
        "price": 2.1
      }
    ]
  },
  {
    "id": "170",
    "name": "Intermarché Brest 2",
    "brand": "Intermarché",
    "address": "47 Impasse de Brest",
    "city": "Brest",
    "latitude": 48.401833,
    "longitude": -4.530139,
    "fuels": [
      {
        "type": "E10",
        "price": 1.84
      },
      {
        "type": "E85",
        "price": 0.88
      },
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "SP95",
        "price": 1.86
      },
      {
        "type": "SP98",
        "price": 1.78
      }
    ]
  },
  {
    "id": "171",
    "name": "Intermarché Brest 3",
    "brand": "Intermarché",
    "address": "164 Boulevard de Brest",
    "city": "Brest",
    "latitude": 48.435944,
    "longitude": -4.454342,
    "fuels": [
      {
        "type": "E85",
        "price": 1.15
      },
      {
        "type": "GPLC",
        "price": 1.09
      },
      {
        "type": "SP95",
        "price": 1.9
      }
    ]
  },
  {
    "id": "172",
    "name": "Intermarché Brest 4",
    "brand": "Intermarché",
    "address": "121 Rue de Brest",
    "city": "Brest",
    "latitude": 48.385168,
    "longitude": -4.496451,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.89
      },
      {
        "type": "SP98",
        "price": 1.85
      }
    ]
  },
  {
    "id": "173",
    "name": "Casino Brest 5",
    "brand": "Casino",
    "address": "191 Allée de Brest",
    "city": "Brest",
    "latitude": 48.381711,
    "longitude": -4.546875,
    "fuels": [
      {
        "type": "E10",
        "price": 1.76
      },
      {
        "type": "SP95",
        "price": 1.97
      }
    ]
  },
  {
    "id": "174",
    "name": "Carrefour Limoges 1",
    "brand": "Carrefour",
    "address": "191 Rue de Limoges",
    "city": "Limoges",
    "latitude": 45.866591,
    "longitude": 1.267143,
    "fuels": [
      {
        "type": "E10",
        "price": 1.76
      },
      {
        "type": "E85",
        "price": 1.17
      },
      {
        "type": "GPLC",
        "price": 1.04
      },
      {
        "type": "SP95",
        "price": 1.82
      },
      {
        "type": "SP98",
        "price": 1.96
      }
    ]
  },
  {
    "id": "175",
    "name": "Elan Limoges 2",
    "brand": "Elan",
    "address": "42 Route de Limoges",
    "city": "Limoges",
    "latitude": 45.825283,
    "longitude": 1.26204,
    "fuels": [
      {
        "type": "E85",
        "price": 0.88
      },
      {
        "type": "SP95",
        "price": 1.79
      }
    ]
  },
  {
    "id": "176",
    "name": "Leclerc Limoges 3",
    "brand": "Leclerc",
    "address": "138 Boulevard de Limoges",
    "city": "Limoges",
    "latitude": 45.836744,
    "longitude": 1.322399,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "GPLC",
        "price": 1.24
      }
    ]
  },
  {
    "id": "177",
    "name": "Intermarché Limoges 4",
    "brand": "Intermarché",
    "address": "48 Route de Limoges",
    "city": "Limoges",
    "latitude": 45.84558,
    "longitude": 1.244661,
    "fuels": [
      {
        "type": "E85",
        "price": 1.15
      },
      {
        "type": "GAZOLE",
        "price": 1.59
      },
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP95",
        "price": 1.76
      }
    ]
  },
  {
    "id": "178",
    "name": "Carrefour Limoges 5",
    "brand": "Carrefour",
    "address": "18 Impasse de Limoges",
    "city": "Limoges",
    "latitude": 45.881031,
    "longitude": 1.196616,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "E85",
        "price": 1.05
      },
      {
        "type": "SP95",
        "price": 1.8
      }
    ]
  },
  {
    "id": "179",
    "name": "Intermarché Tours 1",
    "brand": "Intermarché",
    "address": "199 Impasse de Tours",
    "city": "Tours",
    "latitude": 47.358229,
    "longitude": 0.639478,
    "fuels": [
      {
        "type": "E85",
        "price": 1.13
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "180",
    "name": "Intermarché Tours 2",
    "brand": "Intermarché",
    "address": "54 Boulevard de Tours",
    "city": "Tours",
    "latitude": 47.438882,
    "longitude": 0.619757,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.79
      },
      {
        "type": "GPLC",
        "price": 1.08
      },
      {
        "type": "SP95",
        "price": 1.99
      }
    ]
  },
  {
    "id": "181",
    "name": "Shell Tours 3",
    "brand": "Shell",
    "address": "168 Rue de Tours",
    "city": "Tours",
    "latitude": 47.432058,
    "longitude": 0.639959,
    "fuels": [
      {
        "type": "E10",
        "price": 1.92
      },
      {
        "type": "E85",
        "price": 1.08
      },
      {
        "type": "GPLC",
        "price": 1.14
      },
      {
        "type": "SP95",
        "price": 1.8
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "182",
    "name": "BP Tours 4",
    "brand": "BP",
    "address": "149 Boulevard de Tours",
    "city": "Tours",
    "latitude": 47.412527,
    "longitude": 0.632002,
    "fuels": [
      {
        "type": "E10",
        "price": 1.79
      },
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "GPLC",
        "price": 1.24
      },
      {
        "type": "SP98",
        "price": 1.94
      }
    ]
  },
  {
    "id": "183",
    "name": "Intermarché Tours 5",
    "brand": "Intermarché",
    "address": "1 Allée de Tours",
    "city": "Tours",
    "latitude": 47.43025,
    "longitude": 0.739437,
    "fuels": [
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "184",
    "name": "Système U Amiens 1",
    "brand": "Système U",
    "address": "114 Allée de Amiens",
    "city": "Amiens",
    "latitude": 49.940978,
    "longitude": 2.276712,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "SP98",
        "price": 2.09
      }
    ]
  },
  {
    "id": "185",
    "name": "Indépendant Amiens 2",
    "brand": "Indépendant",
    "address": "117 Route de Amiens",
    "city": "Amiens",
    "latitude": 49.86012,
    "longitude": 2.266248,
    "fuels": [
      {
        "type": "E10",
        "price": 1.91
      },
      {
        "type": "GPLC",
        "price": 1.14
      }
    ]
  },
  {
    "id": "186",
    "name": "Intermarché Amiens 3",
    "brand": "Intermarché",
    "address": "154 Boulevard de Amiens",
    "city": "Amiens",
    "latitude": 49.881936,
    "longitude": 2.236695,
    "fuels": [
      {
        "type": "E85",
        "price": 1.17
      },
      {
        "type": "GAZOLE",
        "price": 1.85
      },
      {
        "type": "GPLC",
        "price": 0.92
      }
    ]
  },
  {
    "id": "187",
    "name": "Avia Amiens 4",
    "brand": "Avia",
    "address": "79 Place de Amiens",
    "city": "Amiens",
    "latitude": 49.841828,
    "longitude": 2.316486,
    "fuels": [
      {
        "type": "E10",
        "price": 1.8
      },
      {
        "type": "GAZOLE",
        "price": 1.82
      },
      {
        "type": "GPLC",
        "price": 1.25
      },
      {
        "type": "SP95",
        "price": 1.78
      },
      {
        "type": "SP98",
        "price": 2.1
      }
    ]
  },
  {
    "id": "188",
    "name": "TotalEnergies Amiens 5",
    "brand": "TotalEnergies",
    "address": "129 Place de Amiens",
    "city": "Amiens",
    "latitude": 49.952075,
    "longitude": 2.301315,
    "fuels": [
      {
        "type": "E10",
        "price": 1.95
      },
      {
        "type": "E85",
        "price": 1.01
      },
      {
        "type": "GAZOLE",
        "price": 1.69
      },
      {
        "type": "GPLC",
        "price": 1.09
      },
      {
        "type": "SP98",
        "price": 2.11
      }
    ]
  },
  {
    "id": "189",
    "name": "Avia Perpignan 1",
    "brand": "Avia",
    "address": "25 Chemin de Perpignan",
    "city": "Perpignan",
    "latitude": 42.669881,
    "longitude": 2.950495,
    "fuels": [
      {
        "type": "E85",
        "price": 1.1
      },
      {
        "type": "GPLC",
        "price": 1.22
      }
    ]
  },
  {
    "id": "190",
    "name": "Avia Perpignan 2",
    "brand": "Avia",
    "address": "29 Chemin de Perpignan",
    "city": "Perpignan",
    "latitude": 42.668585,
    "longitude": 2.879339,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.75
      },
      {
        "type": "SP95",
        "price": 1.74
      },
      {
        "type": "SP98",
        "price": 1.85
      }
    ]
  },
  {
    "id": "191",
    "name": "Intermarché Perpignan 3",
    "brand": "Intermarché",
    "address": "22 Allée de Perpignan",
    "city": "Perpignan",
    "latitude": 42.619705,
    "longitude": 2.887108,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "SP98",
        "price": 1.92
      }
    ]
  },
  {
    "id": "192",
    "name": "BP Perpignan 4",
    "brand": "BP",
    "address": "79 Boulevard de Perpignan",
    "city": "Perpignan",
    "latitude": 42.644954,
    "longitude": 2.845082,
    "fuels": [
      {
        "type": "E85",
        "price": 0.86
      },
      {
        "type": "GAZOLE",
        "price": 1.79
      },
      {
        "type": "GPLC",
        "price": 1.09
      },
      {
        "type": "SP95",
        "price": 1.7
      },
      {
        "type": "SP98",
        "price": 1.85
      }
    ]
  },
  {
    "id": "193",
    "name": "Intermarché Metz 1",
    "brand": "Intermarché",
    "address": "122 Route de Metz",
    "city": "Metz",
    "latitude": 49.164193,
    "longitude": 6.182468,
    "fuels": [
      {
        "type": "E10",
        "price": 1.94
      },
      {
        "type": "GAZOLE",
        "price": 1.8
      },
      {
        "type": "GPLC",
        "price": 1.01
      },
      {
        "type": "SP95",
        "price": 1.67
      },
      {
        "type": "SP98",
        "price": 1.93
      }
    ]
  },
  {
    "id": "194",
    "name": "Leclerc Metz 2",
    "brand": "Leclerc",
    "address": "80 Route de Metz",
    "city": "Metz",
    "latitude": 49.174028,
    "longitude": 6.192803,
    "fuels": [
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "GPLC",
        "price": 1.2
      },
      {
        "type": "SP95",
        "price": 1.96
      }
    ]
  },
  {
    "id": "195",
    "name": "Intermarché Metz 3",
    "brand": "Intermarché",
    "address": "163 Place de Metz",
    "city": "Metz",
    "latitude": 49.082739,
    "longitude": 6.114743,
    "fuels": [
      {
        "type": "E10",
        "price": 1.84
      },
      {
        "type": "GAZOLE",
        "price": 1.54
      },
      {
        "type": "GPLC",
        "price": 0.98
      },
      {
        "type": "SP95",
        "price": 1.79
      }
    ]
  },
  {
    "id": "196",
    "name": "Intermarché Metz 4",
    "brand": "Intermarché",
    "address": "37 Place de Metz",
    "city": "Metz",
    "latitude": 49.146138,
    "longitude": 6.188678,
    "fuels": [
      {
        "type": "E10",
        "price": 1.8
      },
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "GAZOLE",
        "price": 1.86
      },
      {
        "type": "GPLC",
        "price": 0.96
      },
      {
        "type": "SP95",
        "price": 1.97
      }
    ]
  },
  {
    "id": "197",
    "name": "Elan Besançon 1",
    "brand": "Elan",
    "address": "39 Rue de Besançon",
    "city": "Besançon",
    "latitude": 47.195059,
    "longitude": 5.975963,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "GAZOLE",
        "price": 1.73
      },
      {
        "type": "GPLC",
        "price": 1.23
      },
      {
        "type": "SP95",
        "price": 1.79
      }
    ]
  },
  {
    "id": "198",
    "name": "Système U Besançon 2",
    "brand": "Système U",
    "address": "34 Route de Besançon",
    "city": "Besançon",
    "latitude": 47.25448,
    "longitude": 6.030922,
    "fuels": [
      {
        "type": "E85",
        "price": 1.11
      },
      {
        "type": "GAZOLE",
        "price": 1.78
      },
      {
        "type": "GPLC",
        "price": 1.14
      },
      {
        "type": "SP95",
        "price": 1.74
      },
      {
        "type": "SP98",
        "price": 2.07
      }
    ]
  },
  {
    "id": "199",
    "name": "Système U Besançon 3",
    "brand": "Système U",
    "address": "30 Avenue de Besançon",
    "city": "Besançon",
    "latitude": 47.247685,
    "longitude": 6.025161,
    "fuels": [
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "SP98",
        "price": 1.76
      }
    ]
  },
  {
    "id": "200",
    "name": "Système U Besançon 4",
    "brand": "Système U",
    "address": "91 Impasse de Besançon",
    "city": "Besançon",
    "latitude": 47.200318,
    "longitude": 5.990805,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "GAZOLE",
        "price": 1.65
      },
      {
        "type": "GPLC",
        "price": 1.09
      }
    ]
  },
  {
    "id": "201",
    "name": "Leclerc Orléans 1",
    "brand": "Leclerc",
    "address": "35 Impasse de Orléans",
    "city": "Orléans",
    "latitude": 47.865296,
    "longitude": 1.944243,
    "fuels": [
      {
        "type": "E10",
        "price": 1.91
      },
      {
        "type": "E85",
        "price": 0.96
      },
      {
        "type": "GAZOLE",
        "price": 1.55
      },
      {
        "type": "GPLC",
        "price": 1.16
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "202",
    "name": "Indépendant Orléans 2",
    "brand": "Indépendant",
    "address": "24 Allée de Orléans",
    "city": "Orléans",
    "latitude": 47.927738,
    "longitude": 1.964945,
    "fuels": [
      {
        "type": "E10",
        "price": 1.8
      },
      {
        "type": "E85",
        "price": 0.97
      },
      {
        "type": "GPLC",
        "price": 1.08
      },
      {
        "type": "SP95",
        "price": 1.73
      }
    ]
  },
  {
    "id": "203",
    "name": "TotalEnergies Orléans 3",
    "brand": "TotalEnergies",
    "address": "99 Impasse de Orléans",
    "city": "Orléans",
    "latitude": 47.969295,
    "longitude": 1.975417,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "E85",
        "price": 0.88
      },
      {
        "type": "GAZOLE",
        "price": 1.82
      },
      {
        "type": "SP95",
        "price": 1.72
      },
      {
        "type": "SP98",
        "price": 1.97
      }
    ]
  },
  {
    "id": "204",
    "name": "Avia Orléans 4",
    "brand": "Avia",
    "address": "162 Impasse de Orléans",
    "city": "Orléans",
    "latitude": 47.944408,
    "longitude": 1.943314,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.74
      },
      {
        "type": "GPLC",
        "price": 1.14
      },
      {
        "type": "SP95",
        "price": 1.95
      },
      {
        "type": "SP98",
        "price": 1.8
      }
    ]
  },
  {
    "id": "205",
    "name": "Esso Rouen 1",
    "brand": "Esso",
    "address": "41 Impasse de Rouen",
    "city": "Rouen",
    "latitude": 49.394394,
    "longitude": 1.072232,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.24
      },
      {
        "type": "SP98",
        "price": 2.08
      }
    ]
  },
  {
    "id": "206",
    "name": "Intermarché Rouen 2",
    "brand": "Intermarché",
    "address": "121 Chemin de Rouen",
    "city": "Rouen",
    "latitude": 49.488546,
    "longitude": 1.063364,
    "fuels": [
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.68
      },
      {
        "type": "SP98",
        "price": 1.96
      }
    ]
  },
  {
    "id": "207",
    "name": "BP Rouen 3",
    "brand": "BP",
    "address": "38 Avenue de Rouen",
    "city": "Rouen",
    "latitude": 49.465584,
    "longitude": 1.148348,
    "fuels": [
      {
        "type": "E10",
        "price": 1.87
      },
      {
        "type": "GAZOLE",
        "price": 1.55
      },
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP95",
        "price": 1.97
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "208",
    "name": "TotalEnergies Rouen 4",
    "brand": "TotalEnergies",
    "address": "29 Chemin de Rouen",
    "city": "Rouen",
    "latitude": 49.43979,
    "longitude": 1.149496,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "GAZOLE",
        "price": 1.86
      },
      {
        "type": "SP95",
        "price": 1.7
      }
    ]
  },
  {
    "id": "209",
    "name": "Indépendant Rouen 5",
    "brand": "Indépendant",
    "address": "104 Route de Rouen",
    "city": "Rouen",
    "latitude": 49.37707,
    "longitude": 1.136253,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "SP98",
        "price": 2.07
      }
    ]
  },
  {
    "id": "210",
    "name": "Esso Mulhouse 1",
    "brand": "Esso",
    "address": "61 Avenue de Mulhouse",
    "city": "Mulhouse",
    "latitude": 47.783279,
    "longitude": 7.390318,
    "fuels": [
      {
        "type": "E10",
        "price": 1.75
      },
      {
        "type": "SP95",
        "price": 1.89
      }
    ]
  },
  {
    "id": "211",
    "name": "Leclerc Mulhouse 2",
    "brand": "Leclerc",
    "address": "96 Chemin de Mulhouse",
    "city": "Mulhouse",
    "latitude": 47.693191,
    "longitude": 7.378195,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "E85",
        "price": 1.18
      },
      {
        "type": "GPLC",
        "price": 1.11
      },
      {
        "type": "SP95",
        "price": 1.7
      },
      {
        "type": "SP98",
        "price": 1.84
      }
    ]
  },
  {
    "id": "212",
    "name": "Intermarché Mulhouse 3",
    "brand": "Intermarché",
    "address": "145 Allée de Mulhouse",
    "city": "Mulhouse",
    "latitude": 47.716871,
    "longitude": 7.351657,
    "fuels": [
      {
        "type": "E85",
        "price": 1.11
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.96
      }
    ]
  },
  {
    "id": "213",
    "name": "Indépendant Mulhouse 4",
    "brand": "Indépendant",
    "address": "106 Avenue de Mulhouse",
    "city": "Mulhouse",
    "latitude": 47.799571,
    "longitude": 7.405788,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "E85",
        "price": 1.07
      },
      {
        "type": "GAZOLE",
        "price": 1.88
      },
      {
        "type": "SP95",
        "price": 1.69
      }
    ]
  },
  {
    "id": "214",
    "name": "Avia Caen 1",
    "brand": "Avia",
    "address": "171 Impasse de Caen",
    "city": "Caen",
    "latitude": 49.222167,
    "longitude": -0.321392,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "E85",
        "price": 1.11
      },
      {
        "type": "GAZOLE",
        "price": 1.7
      },
      {
        "type": "SP95",
        "price": 1.72
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "215",
    "name": "Casino Caen 2",
    "brand": "Casino",
    "address": "75 Rue de Caen",
    "city": "Caen",
    "latitude": 49.124574,
    "longitude": -0.408499,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.82
      },
      {
        "type": "GPLC",
        "price": 1.24
      },
      {
        "type": "SP95",
        "price": 1.79
      },
      {
        "type": "SP98",
        "price": 1.81
      }
    ]
  },
  {
    "id": "216",
    "name": "Intermarché Caen 3",
    "brand": "Intermarché",
    "address": "184 Boulevard de Caen",
    "city": "Caen",
    "latitude": 49.213763,
    "longitude": -0.382866,
    "fuels": [
      {
        "type": "E10",
        "price": 1.75
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
        "type": "SP98",
        "price": 1.8
      }
    ]
  },
  {
    "id": "217",
    "name": "Esso Caen 4",
    "brand": "Esso",
    "address": "153 Impasse de Caen",
    "city": "Caen",
    "latitude": 49.173469,
    "longitude": -0.427835,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "GAZOLE",
        "price": 1.71
      },
      {
        "type": "SP95",
        "price": 1.92
      },
      {
        "type": "SP98",
        "price": 1.8
      }
    ]
  },
  {
    "id": "218",
    "name": "Carrefour Nancy 1",
    "brand": "Carrefour",
    "address": "49 Chemin de Nancy",
    "city": "Nancy",
    "latitude": 48.739015,
    "longitude": 6.129236,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.68
      },
      {
        "type": "SP98",
        "price": 2.1
      }
    ]
  },
  {
    "id": "219",
    "name": "Leclerc Nancy 2",
    "brand": "Leclerc",
    "address": "39 Impasse de Nancy",
    "city": "Nancy",
    "latitude": 48.645219,
    "longitude": 6.12489,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP98",
        "price": 2.01
      }
    ]
  },
  {
    "id": "220",
    "name": "Casino Nancy 3",
    "brand": "Casino",
    "address": "125 Chemin de Nancy",
    "city": "Nancy",
    "latitude": 48.679956,
    "longitude": 6.154696,
    "fuels": [
      {
        "type": "E85",
        "price": 0.89
      },
      {
        "type": "SP95",
        "price": 1.86
      },
      {
        "type": "SP98",
        "price": 1.99
      }
    ]
  },
  {
    "id": "221",
    "name": "Carrefour Nancy 4",
    "brand": "Carrefour",
    "address": "101 Avenue de Nancy",
    "city": "Nancy",
    "latitude": 48.654028,
    "longitude": 6.169328,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.8
      },
      {
        "type": "SP98",
        "price": 1.76
      }
    ]
  },
  {
    "id": "222",
    "name": "Shell Saint-Malo 1",
    "brand": "Shell",
    "address": "77 Chemin de Saint-Malo",
    "city": "Saint-Malo",
    "latitude": 48.619817,
    "longitude": -2.086567,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "GPLC",
        "price": 1.06
      }
    ]
  },
  {
    "id": "223",
    "name": "Elan Saint-Malo 2",
    "brand": "Elan",
    "address": "90 Chemin de Saint-Malo",
    "city": "Saint-Malo",
    "latitude": 48.649163,
    "longitude": -2.03838,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "GPLC",
        "price": 1.18
      },
      {
        "type": "SP95",
        "price": 1.89
      },
      {
        "type": "SP98",
        "price": 1.99
      }
    ]
  },
  {
    "id": "224",
    "name": "Système U Saint-Malo 3",
    "brand": "Système U",
    "address": "120 Boulevard de Saint-Malo",
    "city": "Saint-Malo",
    "latitude": 48.675391,
    "longitude": -2.024191,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "GAZOLE",
        "price": 1.77
      }
    ]
  },
  {
    "id": "225",
    "name": "Shell Biarritz 1",
    "brand": "Shell",
    "address": "39 Allée de Biarritz",
    "city": "Biarritz",
    "latitude": 43.507258,
    "longitude": -1.523421,
    "fuels": [
      {
        "type": "E10",
        "price": 1.95
      },
      {
        "type": "E85",
        "price": 0.95
      },
      {
        "type": "GAZOLE",
        "price": 1.63
      },
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.68
      }
    ]
  },
  {
    "id": "226",
    "name": "Avia Biarritz 2",
    "brand": "Avia",
    "address": "37 Rue de Biarritz",
    "city": "Biarritz",
    "latitude": 43.428476,
    "longitude": -1.54759,
    "fuels": [
      {
        "type": "E10",
        "price": 1.71
      },
      {
        "type": "GAZOLE",
        "price": 1.71
      },
      {
        "type": "GPLC",
        "price": 1.11
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "227",
    "name": "Shell Biarritz 3",
    "brand": "Shell",
    "address": "54 Chemin de Biarritz",
    "city": "Biarritz",
    "latitude": 43.439933,
    "longitude": -1.501002,
    "fuels": [
      {
        "type": "E10",
        "price": 1.79
      },
      {
        "type": "E85",
        "price": 0.91
      },
      {
        "type": "GAZOLE",
        "price": 1.85
      },
      {
        "type": "GPLC",
        "price": 1.09
      },
      {
        "type": "SP95",
        "price": 1.81
      }
    ]
  },
  {
    "id": "228",
    "name": "Elan Annecy 1",
    "brand": "Elan",
    "address": "89 Allée de Annecy",
    "city": "Annecy",
    "latitude": 45.8577,
    "longitude": 6.167806,
    "fuels": [
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "GAZOLE",
        "price": 1.6
      },
      {
        "type": "SP95",
        "price": 1.76
      },
      {
        "type": "SP98",
        "price": 1.95
      }
    ]
  },
  {
    "id": "229",
    "name": "Shell Annecy 2",
    "brand": "Shell",
    "address": "85 Rue de Annecy",
    "city": "Annecy",
    "latitude": 45.919287,
    "longitude": 6.144421,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.67
      },
      {
        "type": "SP95",
        "price": 1.94
      }
    ]
  },
  {
    "id": "230",
    "name": "Shell Annecy 3",
    "brand": "Shell",
    "address": "129 Avenue de Annecy",
    "city": "Annecy",
    "latitude": 45.885712,
    "longitude": 6.190866,
    "fuels": [
      {
        "type": "E85",
        "price": 0.99
      },
      {
        "type": "GPLC",
        "price": 1.23
      },
      {
        "type": "SP95",
        "price": 1.79
      }
    ]
  },
  {
    "id": "231",
    "name": "Casino Cannes 1",
    "brand": "Casino",
    "address": "89 Route de Cannes",
    "city": "Cannes",
    "latitude": 43.517663,
    "longitude": 7.07651,
    "fuels": [
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GAZOLE",
        "price": 1.52
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.91
      },
      {
        "type": "SP98",
        "price": 2.11
      }
    ]
  },
  {
    "id": "232",
    "name": "Carrefour Cannes 2",
    "brand": "Carrefour",
    "address": "84 Impasse de Cannes",
    "city": "Cannes",
    "latitude": 43.607869,
    "longitude": 7.080122,
    "fuels": [
      {
        "type": "E10",
        "price": 1.73
      },
      {
        "type": "E85",
        "price": 1.17
      },
      {
        "type": "GAZOLE",
        "price": 1.85
      }
    ]
  },
  {
    "id": "233",
    "name": "Esso Cannes 3",
    "brand": "Esso",
    "address": "184 Route de Cannes",
    "city": "Cannes",
    "latitude": 43.572458,
    "longitude": 7.066002,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.83
      },
      {
        "type": "SP95",
        "price": 1.78
      }
    ]
  },
  {
    "id": "234",
    "name": "Leclerc Colmar 1",
    "brand": "Leclerc",
    "address": "130 Rue de Colmar",
    "city": "Colmar",
    "latitude": 48.03322,
    "longitude": 7.348533,
    "fuels": [
      {
        "type": "E10",
        "price": 1.7
      },
      {
        "type": "GAZOLE",
        "price": 1.76
      },
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.71
      }
    ]
  },
  {
    "id": "235",
    "name": "Esso Colmar 2",
    "brand": "Esso",
    "address": "88 Place de Colmar",
    "city": "Colmar",
    "latitude": 48.082822,
    "longitude": 7.291313,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "E85",
        "price": 0.97
      },
      {
        "type": "GAZOLE",
        "price": 1.81
      },
      {
        "type": "GPLC",
        "price": 1.04
      },
      {
        "type": "SP95",
        "price": 1.89
      }
    ]
  },
  {
    "id": "236",
    "name": "Carrefour Colmar 3",
    "brand": "Carrefour",
    "address": "92 Chemin de Colmar",
    "city": "Colmar",
    "latitude": 48.048303,
    "longitude": 7.403238,
    "fuels": [
      {
        "type": "E10",
        "price": 1.63
      },
      {
        "type": "GAZOLE",
        "price": 1.72
      },
      {
        "type": "SP95",
        "price": 1.81
      },
      {
        "type": "SP98",
        "price": 2.05
      }
    ]
  },
  {
    "id": "237",
    "name": "Shell Avignon 1",
    "brand": "Shell",
    "address": "70 Avenue de Avignon",
    "city": "Avignon",
    "latitude": 43.891208,
    "longitude": 4.872247,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.9
      },
      {
        "type": "SP98",
        "price": 1.9
      }
    ]
  },
  {
    "id": "238",
    "name": "Carrefour Avignon 2",
    "brand": "Carrefour",
    "address": "93 Rue de Avignon",
    "city": "Avignon",
    "latitude": 43.938344,
    "longitude": 4.805127,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "GAZOLE",
        "price": 1.65
      },
      {
        "type": "SP95",
        "price": 1.67
      },
      {
        "type": "SP98",
        "price": 1.89
      }
    ]
  },
  {
    "id": "239",
    "name": "TotalEnergies Avignon 3",
    "brand": "TotalEnergies",
    "address": "82 Avenue de Avignon",
    "city": "Avignon",
    "latitude": 44.016551,
    "longitude": 4.821548,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "GAZOLE",
        "price": 1.63
      },
      {
        "type": "GPLC",
        "price": 1.22
      },
      {
        "type": "SP95",
        "price": 1.82
      },
      {
        "type": "SP98",
        "price": 1.76
      }
    ]
  },
  {
    "id": "240",
    "name": "Leclerc La Rochelle 1",
    "brand": "Leclerc",
    "address": "11 Allée de La Rochelle",
    "city": "La Rochelle",
    "latitude": 46.13345,
    "longitude": -1.179334,
    "fuels": [
      {
        "type": "E10",
        "price": 1.87
      },
      {
        "type": "GAZOLE",
        "price": 1.68
      },
      {
        "type": "SP95",
        "price": 1.91
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "241",
    "name": "Avia La Rochelle 2",
    "brand": "Avia",
    "address": "186 Route de La Rochelle",
    "city": "La Rochelle",
    "latitude": 46.092677,
    "longitude": -1.082877,
    "fuels": [
      {
        "type": "E85",
        "price": 1.12
      },
      {
        "type": "GAZOLE",
        "price": 1.83
      },
      {
        "type": "SP95",
        "price": 1.88
      },
      {
        "type": "SP98",
        "price": 2.07
      }
    ]
  },
  {
    "id": "242",
    "name": "Shell La Rochelle 3",
    "brand": "Shell",
    "address": "41 Avenue de La Rochelle",
    "city": "La Rochelle",
    "latitude": 46.161149,
    "longitude": -1.179847,
    "fuels": [
      {
        "type": "E85",
        "price": 1.15
      },
      {
        "type": "GPLC",
        "price": 1.05
      },
      {
        "type": "SP98",
        "price": 1.86
      }
    ]
  },
  {
    "id": "243",
    "name": "Indépendant Poitiers 1",
    "brand": "Indépendant",
    "address": "90 Place de Poitiers",
    "city": "Poitiers",
    "latitude": 46.633755,
    "longitude": 0.341246,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "E85",
        "price": 0.98
      },
      {
        "type": "GAZOLE",
        "price": 1.73
      },
      {
        "type": "GPLC",
        "price": 1.19
      },
      {
        "type": "SP98",
        "price": 2.12
      }
    ]
  },
  {
    "id": "244",
    "name": "Intermarché Poitiers 2",
    "brand": "Intermarché",
    "address": "70 Chemin de Poitiers",
    "city": "Poitiers",
    "latitude": 46.583906,
    "longitude": 0.389697,
    "fuels": [
      {
        "type": "E10",
        "price": 1.93
      },
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "GPLC",
        "price": 1.02
      }
    ]
  },
  {
    "id": "245",
    "name": "Carrefour Poitiers 3",
    "brand": "Carrefour",
    "address": "73 Rue de Poitiers",
    "city": "Poitiers",
    "latitude": 46.559465,
    "longitude": 0.308444,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.59
      },
      {
        "type": "GPLC",
        "price": 1.21
      },
      {
        "type": "SP95",
        "price": 1.74
      }
    ]
  },
  {
    "id": "246",
    "name": "Carrefour Pau 1",
    "brand": "Carrefour",
    "address": "151 Boulevard de Pau",
    "city": "Pau",
    "latitude": 43.275355,
    "longitude": -0.326151,
    "fuels": [
      {
        "type": "E10",
        "price": 1.87
      },
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "SP95",
        "price": 1.69
      },
      {
        "type": "SP98",
        "price": 1.78
      }
    ]
  },
  {
    "id": "247",
    "name": "Indépendant Pau 2",
    "brand": "Indépendant",
    "address": "143 Boulevard de Pau",
    "city": "Pau",
    "latitude": 43.274486,
    "longitude": -0.385141,
    "fuels": [
      {
        "type": "E10",
        "price": 1.84
      },
      {
        "type": "GAZOLE",
        "price": 1.8
      },
      {
        "type": "SP98",
        "price": 1.99
      }
    ]
  },
  {
    "id": "248",
    "name": "Casino Pau 3",
    "brand": "Casino",
    "address": "62 Place de Pau",
    "city": "Pau",
    "latitude": 43.344749,
    "longitude": -0.390303,
    "fuels": [
      {
        "type": "E85",
        "price": 1.13
      },
      {
        "type": "GAZOLE",
        "price": 1.87
      },
      {
        "type": "GPLC",
        "price": 1.05
      },
      {
        "type": "SP95",
        "price": 1.8
      },
      {
        "type": "SP98",
        "price": 1.92
      }
    ]
  },
  {
    "id": "249",
    "name": "Casino Carcassonne 1",
    "brand": "Casino",
    "address": "112 Avenue de Carcassonne",
    "city": "Carcassonne",
    "latitude": 43.222542,
    "longitude": 2.29351,
    "fuels": [
      {
        "type": "E85",
        "price": 1.05
      },
      {
        "type": "GAZOLE",
        "price": 1.69
      },
      {
        "type": "SP95",
        "price": 1.8
      },
      {
        "type": "SP98",
        "price": 2.1
      }
    ]
  },
  {
    "id": "250",
    "name": "BP Carcassonne 2",
    "brand": "BP",
    "address": "2 Chemin de Carcassonne",
    "city": "Carcassonne",
    "latitude": 43.200178,
    "longitude": 2.324818,
    "fuels": [
      {
        "type": "E10",
        "price": 1.65
      },
      {
        "type": "E85",
        "price": 1.11
      },
      {
        "type": "GPLC",
        "price": 1.16
      },
      {
        "type": "SP95",
        "price": 1.96
      }
    ]
  },
  {
    "id": "251",
    "name": "Elan Carcassonne 3",
    "brand": "Elan",
    "address": "85 Chemin de Carcassonne",
    "city": "Carcassonne",
    "latitude": 43.19509,
    "longitude": 2.326372,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      },
      {
        "type": "GPLC",
        "price": 0.98
      },
      {
        "type": "SP95",
        "price": 1.93
      }
    ]
  },
  {
    "id": "252",
    "name": "Système U Bourges 1",
    "brand": "Système U",
    "address": "170 Allée de Bourges",
    "city": "Bourges",
    "latitude": 47.097955,
    "longitude": 2.406718,
    "fuels": [
      {
        "type": "E85",
        "price": 1.11
      },
      {
        "type": "GAZOLE",
        "price": 1.72
      },
      {
        "type": "GPLC",
        "price": 0.95
      },
      {
        "type": "SP95",
        "price": 1.74
      },
      {
        "type": "SP98",
        "price": 1.8
      }
    ]
  },
  {
    "id": "253",
    "name": "Elan Bourges 2",
    "brand": "Elan",
    "address": "126 Allée de Bourges",
    "city": "Bourges",
    "latitude": 47.027943,
    "longitude": 2.418685,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "GAZOLE",
        "price": 1.87
      },
      {
        "type": "SP95",
        "price": 1.77
      },
      {
        "type": "SP98",
        "price": 1.99
      }
    ]
  },
  {
    "id": "254",
    "name": "Leclerc Bourges 3",
    "brand": "Leclerc",
    "address": "64 Boulevard de Bourges",
    "city": "Bourges",
    "latitude": 47.019176,
    "longitude": 2.35294,
    "fuels": [
      {
        "type": "E10",
        "price": 1.81
      },
      {
        "type": "GAZOLE",
        "price": 1.55
      }
    ]
  },
  {
    "id": "255",
    "name": "Leclerc Blois 1",
    "brand": "Leclerc",
    "address": "41 Impasse de Blois",
    "city": "Blois",
    "latitude": 47.563552,
    "longitude": 1.34098,
    "fuels": [
      {
        "type": "E85",
        "price": 1.1
      },
      {
        "type": "GAZOLE",
        "price": 1.69
      }
    ]
  },
  {
    "id": "256",
    "name": "Avia Blois 2",
    "brand": "Avia",
    "address": "127 Chemin de Blois",
    "city": "Blois",
    "latitude": 47.56882,
    "longitude": 1.276703,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "GAZOLE",
        "price": 1.58
      },
      {
        "type": "SP95",
        "price": 1.98
      },
      {
        "type": "SP98",
        "price": 1.8
      }
    ]
  },
  {
    "id": "257",
    "name": "Intermarché Blois 3",
    "brand": "Intermarché",
    "address": "14 Chemin de Blois",
    "city": "Blois",
    "latitude": 47.520629,
    "longitude": 1.315373,
    "fuels": [
      {
        "type": "E10",
        "price": 1.75
      },
      {
        "type": "E85",
        "price": 0.97
      },
      {
        "type": "GAZOLE",
        "price": 1.69
      },
      {
        "type": "SP95",
        "price": 1.67
      }
    ]
  },
  {
    "id": "258",
    "name": "Leclerc Chambéry 1",
    "brand": "Leclerc",
    "address": "187 Avenue de Chambéry",
    "city": "Chambéry",
    "latitude": 45.556855,
    "longitude": 5.950555,
    "fuels": [
      {
        "type": "E10",
        "price": 1.65
      },
      {
        "type": "E85",
        "price": 0.88
      },
      {
        "type": "GPLC",
        "price": 1.18
      },
      {
        "type": "SP95",
        "price": 1.7
      },
      {
        "type": "SP98",
        "price": 1.82
      }
    ]
  },
  {
    "id": "259",
    "name": "Shell Chambéry 2",
    "brand": "Shell",
    "address": "74 Rue de Chambéry",
    "city": "Chambéry",
    "latitude": 45.534491,
    "longitude": 5.866429,
    "fuels": [
      {
        "type": "E10",
        "price": 1.68
      },
      {
        "type": "GPLC",
        "price": 0.97
      }
    ]
  },
  {
    "id": "260",
    "name": "Esso Chambéry 3",
    "brand": "Esso",
    "address": "173 Rue de Chambéry",
    "city": "Chambéry",
    "latitude": 45.513214,
    "longitude": 5.859419,
    "fuels": [
      {
        "type": "E10",
        "price": 1.64
      },
      {
        "type": "GAZOLE",
        "price": 1.83
      },
      {
        "type": "GPLC",
        "price": 1.23
      },
      {
        "type": "SP95",
        "price": 1.8
      },
      {
        "type": "SP98",
        "price": 1.82
      }
    ]
  },
  {
    "id": "261",
    "name": "Avia Quimper 1",
    "brand": "Avia",
    "address": "113 Rue de Quimper",
    "city": "Quimper",
    "latitude": 47.989915,
    "longitude": -4.151707,
    "fuels": [
      {
        "type": "E10",
        "price": 1.91
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.99
      },
      {
        "type": "SP98",
        "price": 1.76
      }
    ]
  },
  {
    "id": "262",
    "name": "Esso Quimper 2",
    "brand": "Esso",
    "address": "82 Place de Quimper",
    "city": "Quimper",
    "latitude": 47.946629,
    "longitude": -4.093381,
    "fuels": [
      {
        "type": "E10",
        "price": 1.86
      },
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP95",
        "price": 1.65
      },
      {
        "type": "SP98",
        "price": 1.91
      }
    ]
  },
  {
    "id": "263",
    "name": "Casino Quimper 3",
    "brand": "Casino",
    "address": "7 Chemin de Quimper",
    "city": "Quimper",
    "latitude": 48.036714,
    "longitude": -4.098783,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "GPLC",
        "price": 1.06
      }
    ]
  },
  {
    "id": "264",
    "name": "Système U Cherbourg 1",
    "brand": "Système U",
    "address": "151 Place de Cherbourg",
    "city": "Cherbourg",
    "latitude": 49.576028,
    "longitude": -1.621591,
    "fuels": [
      {
        "type": "E10",
        "price": 1.76
      },
      {
        "type": "SP95",
        "price": 1.91
      },
      {
        "type": "SP98",
        "price": 1.95
      }
    ]
  },
  {
    "id": "265",
    "name": "TotalEnergies Cherbourg 2",
    "brand": "TotalEnergies",
    "address": "26 Chemin de Cherbourg",
    "city": "Cherbourg",
    "latitude": 49.568702,
    "longitude": -1.686277,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.16
      },
      {
        "type": "SP95",
        "price": 1.81
      }
    ]
  },
  {
    "id": "266",
    "name": "Indépendant Cherbourg 3",
    "brand": "Indépendant",
    "address": "37 Boulevard de Cherbourg",
    "city": "Cherbourg",
    "latitude": 49.693494,
    "longitude": -1.600433,
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
        "type": "GPLC",
        "price": 1.13
      },
      {
        "type": "SP95",
        "price": 1.95
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "267",
    "name": "Casino Calais 1",
    "brand": "Casino",
    "address": "91 Chemin de Calais",
    "city": "Calais",
    "latitude": 50.967033,
    "longitude": 1.789252,
    "fuels": [
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "GPLC",
        "price": 1.12
      },
      {
        "type": "SP95",
        "price": 1.86
      },
      {
        "type": "SP98",
        "price": 2.07
      }
    ]
  },
  {
    "id": "268",
    "name": "Leclerc Calais 2",
    "brand": "Leclerc",
    "address": "163 Allée de Calais",
    "city": "Calais",
    "latitude": 51.003106,
    "longitude": 1.857371,
    "fuels": [
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "SP98",
        "price": 1.78
      }
    ]
  },
  {
    "id": "269",
    "name": "Carrefour Calais 3",
    "brand": "Carrefour",
    "address": "194 Chemin de Calais",
    "city": "Calais",
    "latitude": 50.934878,
    "longitude": 1.820605,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "GAZOLE",
        "price": 1.68
      },
      {
        "type": "GPLC",
        "price": 1.06
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "270",
    "name": "BP Boulogne-sur-Mer 1",
    "brand": "BP",
    "address": "37 Avenue de Boulogne-sur-Mer",
    "city": "Boulogne-sur-Mer",
    "latitude": 50.774651,
    "longitude": 1.565709,
    "fuels": [
      {
        "type": "E10",
        "price": 1.62
      },
      {
        "type": "E85",
        "price": 1.18
      },
      {
        "type": "GPLC",
        "price": 1.11
      },
      {
        "type": "SP95",
        "price": 1.81
      }
    ]
  },
  {
    "id": "271",
    "name": "Intermarché Boulogne-sur-Mer 2",
    "brand": "Intermarché",
    "address": "33 Avenue de Boulogne-sur-Mer",
    "city": "Boulogne-sur-Mer",
    "latitude": 50.767585,
    "longitude": 1.56589,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "E85",
        "price": 1.05
      },
      {
        "type": "GAZOLE",
        "price": 1.67
      },
      {
        "type": "GPLC",
        "price": 0.98
      },
      {
        "type": "SP98",
        "price": 1.87
      }
    ]
  },
  {
    "id": "272",
    "name": "Casino Boulogne-sur-Mer 3",
    "brand": "Casino",
    "address": "36 Route de Boulogne-sur-Mer",
    "city": "Boulogne-sur-Mer",
    "latitude": 50.747761,
    "longitude": 1.569289,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "SP95",
        "price": 1.86
      }
    ]
  },
  {
    "id": "273",
    "name": "Esso Dunkerque 1",
    "brand": "Esso",
    "address": "113 Impasse de Dunkerque",
    "city": "Dunkerque",
    "latitude": 51.096235,
    "longitude": 2.378941,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "GAZOLE",
        "price": 1.55
      },
      {
        "type": "GPLC",
        "price": 0.92
      },
      {
        "type": "SP95",
        "price": 1.77
      },
      {
        "type": "SP98",
        "price": 1.96
      }
    ]
  },
  {
    "id": "274",
    "name": "Avia Dunkerque 2",
    "brand": "Avia",
    "address": "101 Boulevard de Dunkerque",
    "city": "Dunkerque",
    "latitude": 51.012799,
    "longitude": 2.322034,
    "fuels": [
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "GAZOLE",
        "price": 1.78
      },
      {
        "type": "GPLC",
        "price": 1.23
      },
      {
        "type": "SP98",
        "price": 1.96
      }
    ]
  },
  {
    "id": "275",
    "name": "Casino Dunkerque 3",
    "brand": "Casino",
    "address": "87 Avenue de Dunkerque",
    "city": "Dunkerque",
    "latitude": 51.017898,
    "longitude": 2.326915,
    "fuels": [
      {
        "type": "E85",
        "price": 0.91
      },
      {
        "type": "GAZOLE",
        "price": 1.82
      },
      {
        "type": "GPLC",
        "price": 1.07
      },
      {
        "type": "SP95",
        "price": 1.71
      },
      {
        "type": "SP98",
        "price": 1.91
      }
    ]
  },
  {
    "id": "276",
    "name": "Shell Arras 1",
    "brand": "Shell",
    "address": "50 Rue de Arras",
    "city": "Arras",
    "latitude": 50.338163,
    "longitude": 2.736369,
    "fuels": [
      {
        "type": "E10",
        "price": 1.84
      },
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "SP95",
        "price": 1.84
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "277",
    "name": "Elan Arras 2",
    "brand": "Elan",
    "address": "154 Chemin de Arras",
    "city": "Arras",
    "latitude": 50.324204,
    "longitude": 2.712964,
    "fuels": [
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "GAZOLE",
        "price": 1.52
      }
    ]
  },
  {
    "id": "278",
    "name": "Casino Arras 3",
    "brand": "Casino",
    "address": "123 Allée de Arras",
    "city": "Arras",
    "latitude": 50.335971,
    "longitude": 2.793454,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.71
      },
      {
        "type": "SP95",
        "price": 1.76
      }
    ]
  },
  {
    "id": "279",
    "name": "TotalEnergies Beauvais 1",
    "brand": "TotalEnergies",
    "address": "8 Allée de Beauvais",
    "city": "Beauvais",
    "latitude": 49.482739,
    "longitude": 2.123007,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "E85",
        "price": 1.16
      },
      {
        "type": "GAZOLE",
        "price": 1.74
      },
      {
        "type": "SP95",
        "price": 1.83
      },
      {
        "type": "SP98",
        "price": 2.08
      }
    ]
  },
  {
    "id": "280",
    "name": "Indépendant Beauvais 2",
    "brand": "Indépendant",
    "address": "35 Avenue de Beauvais",
    "city": "Beauvais",
    "latitude": 49.423657,
    "longitude": 2.064509,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "SP95",
        "price": 1.78
      },
      {
        "type": "SP98",
        "price": 1.81
      }
    ]
  },
  {
    "id": "281",
    "name": "Esso Beauvais 3",
    "brand": "Esso",
    "address": "165 Place de Beauvais",
    "city": "Beauvais",
    "latitude": 49.470355,
    "longitude": 2.119473,
    "fuels": [
      {
        "type": "E85",
        "price": 1.11
      },
      {
        "type": "SP95",
        "price": 1.97
      }
    ]
  },
  {
    "id": "282",
    "name": "Casino Compiègne 1",
    "brand": "Casino",
    "address": "187 Boulevard de Compiègne",
    "city": "Compiègne",
    "latitude": 49.41382,
    "longitude": 2.77168,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      }
    ]
  },
  {
    "id": "283",
    "name": "Casino Compiègne 2",
    "brand": "Casino",
    "address": "96 Place de Compiègne",
    "city": "Compiègne",
    "latitude": 49.422885,
    "longitude": 2.856861,
    "fuels": [
      {
        "type": "E85",
        "price": 0.88
      },
      {
        "type": "GAZOLE",
        "price": 1.67
      },
      {
        "type": "GPLC",
        "price": 1.19
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "284",
    "name": "Esso Compiègne 3",
    "brand": "Esso",
    "address": "142 Allée de Compiègne",
    "city": "Compiègne",
    "latitude": 49.397443,
    "longitude": 2.771546,
    "fuels": [
      {
        "type": "E10",
        "price": 1.95
      },
      {
        "type": "GAZOLE",
        "price": 1.74
      }
    ]
  },
  {
    "id": "285",
    "name": "TotalEnergies Soissons 1",
    "brand": "TotalEnergies",
    "address": "104 Impasse de Soissons",
    "city": "Soissons",
    "latitude": 49.429005,
    "longitude": 3.322779,
    "fuels": [
      {
        "type": "E10",
        "price": 1.7
      },
      {
        "type": "E85",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.75
      },
      {
        "type": "SP98",
        "price": 1.81
      }
    ]
  },
  {
    "id": "286",
    "name": "BP Soissons 2",
    "brand": "BP",
    "address": "48 Allée de Soissons",
    "city": "Soissons",
    "latitude": 49.328313,
    "longitude": 3.377843,
    "fuels": [
      {
        "type": "E10",
        "price": 1.64
      },
      {
        "type": "E85",
        "price": 0.91
      }
    ]
  },
  {
    "id": "287",
    "name": "Casino Soissons 3",
    "brand": "Casino",
    "address": "11 Avenue de Soissons",
    "city": "Soissons",
    "latitude": 49.408089,
    "longitude": 3.263449,
    "fuels": [
      {
        "type": "E10",
        "price": 1.62
      },
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "SP98",
        "price": 1.8
      }
    ]
  },
  {
    "id": "288",
    "name": "TotalEnergies Troyes 1",
    "brand": "TotalEnergies",
    "address": "116 Impasse de Troyes",
    "city": "Troyes",
    "latitude": 48.320599,
    "longitude": 4.081225,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP95",
        "price": 1.86
      },
      {
        "type": "SP98",
        "price": 2.11
      }
    ]
  },
  {
    "id": "289",
    "name": "Leclerc Troyes 2",
    "brand": "Leclerc",
    "address": "75 Route de Troyes",
    "city": "Troyes",
    "latitude": 48.307955,
    "longitude": 4.109492,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "GAZOLE",
        "price": 1.85
      },
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.88
      },
      {
        "type": "SP98",
        "price": 1.92
      }
    ]
  },
  {
    "id": "290",
    "name": "Indépendant Troyes 3",
    "brand": "Indépendant",
    "address": "185 Boulevard de Troyes",
    "city": "Troyes",
    "latitude": 48.339395,
    "longitude": 4.059428,
    "fuels": [
      {
        "type": "E10",
        "price": 1.63
      },
      {
        "type": "SP95",
        "price": 1.83
      }
    ]
  },
  {
    "id": "291",
    "name": "Carrefour Charleville-Mézières 1",
    "brand": "Carrefour",
    "address": "197 Chemin de Charleville-Mézières",
    "city": "Charleville-Mézières",
    "latitude": 49.819328,
    "longitude": 4.661012,
    "fuels": [
      {
        "type": "E10",
        "price": 1.64
      },
      {
        "type": "E85",
        "price": 1.11
      }
    ]
  },
  {
    "id": "292",
    "name": "Elan Charleville-Mézières 2",
    "brand": "Elan",
    "address": "151 Rue de Charleville-Mézières",
    "city": "Charleville-Mézières",
    "latitude": 49.824464,
    "longitude": 4.74266,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.82
      },
      {
        "type": "SP95",
        "price": 1.97
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "293",
    "name": "Leclerc Sedan 1",
    "brand": "Leclerc",
    "address": "129 Allée de Sedan",
    "city": "Sedan",
    "latitude": 49.714719,
    "longitude": 4.940005,
    "fuels": [
      {
        "type": "E85",
        "price": 0.95
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "GPLC",
        "price": 1.13
      },
      {
        "type": "SP98",
        "price": 1.95
      }
    ]
  },
  {
    "id": "294",
    "name": "Système U Sedan 2",
    "brand": "Système U",
    "address": "169 Impasse de Sedan",
    "city": "Sedan",
    "latitude": 49.668623,
    "longitude": 4.967448,
    "fuels": [
      {
        "type": "E10",
        "price": 1.68
      },
      {
        "type": "E85",
        "price": 1.11
      },
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "GPLC",
        "price": 1.06
      },
      {
        "type": "SP95",
        "price": 1.93
      }
    ]
  },
  {
    "id": "295",
    "name": "Leclerc Verdun 1",
    "brand": "Leclerc",
    "address": "112 Route de Verdun",
    "city": "Verdun",
    "latitude": 49.15177,
    "longitude": 5.379449,
    "fuels": [
      {
        "type": "E10",
        "price": 1.91
      },
      {
        "type": "E85",
        "price": 1.02
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "GPLC",
        "price": 1.0
      },
      {
        "type": "SP98",
        "price": 1.85
      }
    ]
  },
  {
    "id": "296",
    "name": "Système U Verdun 2",
    "brand": "Système U",
    "address": "133 Chemin de Verdun",
    "city": "Verdun",
    "latitude": 49.176576,
    "longitude": 5.439059,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "E85",
        "price": 0.99
      },
      {
        "type": "GAZOLE",
        "price": 1.77
      },
      {
        "type": "GPLC",
        "price": 1.07
      },
      {
        "type": "SP95",
        "price": 1.96
      }
    ]
  },
  {
    "id": "297",
    "name": "Elan Épinal 1",
    "brand": "Elan",
    "address": "61 Avenue de Épinal",
    "city": "Épinal",
    "latitude": 48.187107,
    "longitude": 6.403683,
    "fuels": [
      {
        "type": "E10",
        "price": 1.95
      },
      {
        "type": "E85",
        "price": 1.01
      },
      {
        "type": "SP95",
        "price": 1.87
      }
    ]
  },
  {
    "id": "298",
    "name": "Avia Épinal 2",
    "brand": "Avia",
    "address": "123 Rue de Épinal",
    "city": "Épinal",
    "latitude": 48.122611,
    "longitude": 6.490771,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.78
      },
      {
        "type": "GPLC",
        "price": 1.08
      },
      {
        "type": "SP98",
        "price": 2.0
      }
    ]
  },
  {
    "id": "299",
    "name": "Carrefour Saint-Dié 1",
    "brand": "Carrefour",
    "address": "126 Impasse de Saint-Dié",
    "city": "Saint-Dié",
    "latitude": 48.236448,
    "longitude": 6.968276,
    "fuels": [
      {
        "type": "E85",
        "price": 0.87
      },
      {
        "type": "GAZOLE",
        "price": 1.8
      },
      {
        "type": "SP95",
        "price": 1.81
      },
      {
        "type": "SP98",
        "price": 1.85
      }
    ]
  },
  {
    "id": "300",
    "name": "Carrefour Saint-Dié 2",
    "brand": "Carrefour",
    "address": "92 Allée de Saint-Dié",
    "city": "Saint-Dié",
    "latitude": 48.317952,
    "longitude": 7.006835,
    "fuels": [
      {
        "type": "E85",
        "price": 1.03
      },
      {
        "type": "GAZOLE",
        "price": 1.85
      }
    ]
  },
  {
    "id": "301",
    "name": "Esso Vesoul 1",
    "brand": "Esso",
    "address": "162 Avenue de Vesoul",
    "city": "Vesoul",
    "latitude": 47.580011,
    "longitude": 6.086073,
    "fuels": [
      {
        "type": "E10",
        "price": 1.93
      },
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP95",
        "price": 1.69
      },
      {
        "type": "SP98",
        "price": 1.84
      }
    ]
  },
  {
    "id": "302",
    "name": "Shell Vesoul 2",
    "brand": "Shell",
    "address": "7 Route de Vesoul",
    "city": "Vesoul",
    "latitude": 47.660865,
    "longitude": 6.160603,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "E85",
        "price": 1.08
      },
      {
        "type": "GAZOLE",
        "price": 1.69
      }
    ]
  },
  {
    "id": "303",
    "name": "Carrefour Lons-le-Saunier 1",
    "brand": "Carrefour",
    "address": "122 Boulevard de Lons-le-Saunier",
    "city": "Lons-le-Saunier",
    "latitude": 46.727243,
    "longitude": 5.587861,
    "fuels": [
      {
        "type": "E85",
        "price": 1.04
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "GPLC",
        "price": 1.16
      },
      {
        "type": "SP95",
        "price": 1.88
      },
      {
        "type": "SP98",
        "price": 2.05
      }
    ]
  },
  {
    "id": "304",
    "name": "Indépendant Lons-le-Saunier 2",
    "brand": "Indépendant",
    "address": "17 Impasse de Lons-le-Saunier",
    "city": "Lons-le-Saunier",
    "latitude": 46.637882,
    "longitude": 5.499261,
    "fuels": [
      {
        "type": "E85",
        "price": 1.02
      },
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "GPLC",
        "price": 1.25
      },
      {
        "type": "SP98",
        "price": 1.93
      }
    ]
  },
  {
    "id": "305",
    "name": "Indépendant Mâcon 1",
    "brand": "Indépendant",
    "address": "91 Chemin de Mâcon",
    "city": "Mâcon",
    "latitude": 46.261376,
    "longitude": 4.812601,
    "fuels": [
      {
        "type": "E85",
        "price": 1.15
      },
      {
        "type": "GPLC",
        "price": 1.09
      }
    ]
  },
  {
    "id": "306",
    "name": "Elan Mâcon 2",
    "brand": "Elan",
    "address": "193 Allée de Mâcon",
    "city": "Mâcon",
    "latitude": 46.266487,
    "longitude": 4.876289,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "E85",
        "price": 0.96
      },
      {
        "type": "GAZOLE",
        "price": 1.88
      },
      {
        "type": "SP98",
        "price": 1.82
      }
    ]
  },
  {
    "id": "307",
    "name": "Leclerc Roanne 1",
    "brand": "Leclerc",
    "address": "71 Boulevard de Roanne",
    "city": "Roanne",
    "latitude": 46.012445,
    "longitude": 4.075663,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.74
      },
      {
        "type": "GPLC",
        "price": 1.21
      },
      {
        "type": "SP95",
        "price": 1.71
      },
      {
        "type": "SP98",
        "price": 1.77
      }
    ]
  },
  {
    "id": "308",
    "name": "Shell Roanne 2",
    "brand": "Shell",
    "address": "46 Place de Roanne",
    "city": "Roanne",
    "latitude": 46.089593,
    "longitude": 4.0952,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "E85",
        "price": 1.12
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      },
      {
        "type": "GPLC",
        "price": 1.21
      },
      {
        "type": "SP95",
        "price": 1.89
      }
    ]
  },
  {
    "id": "309",
    "name": "TotalEnergies Vichy 1",
    "brand": "TotalEnergies",
    "address": "84 Route de Vichy",
    "city": "Vichy",
    "latitude": 46.083119,
    "longitude": 3.482915,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      },
      {
        "type": "GPLC",
        "price": 1.1
      },
      {
        "type": "SP95",
        "price": 1.86
      }
    ]
  },
  {
    "id": "310",
    "name": "Avia Vichy 2",
    "brand": "Avia",
    "address": "66 Avenue de Vichy",
    "city": "Vichy",
    "latitude": 46.094794,
    "longitude": 3.370147,
    "fuels": [
      {
        "type": "E10",
        "price": 1.71
      },
      {
        "type": "E85",
        "price": 0.98
      },
      {
        "type": "GAZOLE",
        "price": 1.69
      },
      {
        "type": "SP98",
        "price": 1.99
      }
    ]
  },
  {
    "id": "311",
    "name": "Intermarché Moulins 1",
    "brand": "Intermarché",
    "address": "117 Allée de Moulins",
    "city": "Moulins",
    "latitude": 46.573703,
    "longitude": 3.301689,
    "fuels": [
      {
        "type": "E85",
        "price": 0.98
      },
      {
        "type": "SP95",
        "price": 1.86
      }
    ]
  },
  {
    "id": "312",
    "name": "Système U Moulins 2",
    "brand": "Système U",
    "address": "110 Avenue de Moulins",
    "city": "Moulins",
    "latitude": 46.61029,
    "longitude": 3.296124,
    "fuels": [
      {
        "type": "E10",
        "price": 1.91
      },
      {
        "type": "GPLC",
        "price": 0.95
      },
      {
        "type": "SP95",
        "price": 1.92
      }
    ]
  },
  {
    "id": "313",
    "name": "Casino Nevers 1",
    "brand": "Casino",
    "address": "100 Impasse de Nevers",
    "city": "Nevers",
    "latitude": 47.006137,
    "longitude": 3.117619,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.59
      },
      {
        "type": "GPLC",
        "price": 1.02
      },
      {
        "type": "SP95",
        "price": 1.71
      },
      {
        "type": "SP98",
        "price": 2.0
      }
    ]
  },
  {
    "id": "314",
    "name": "Shell Nevers 2",
    "brand": "Shell",
    "address": "157 Boulevard de Nevers",
    "city": "Nevers",
    "latitude": 47.014948,
    "longitude": 3.111054,
    "fuels": [
      {
        "type": "E85",
        "price": 1.04
      },
      {
        "type": "SP95",
        "price": 1.91
      }
    ]
  },
  {
    "id": "315",
    "name": "Système U Auxerre 1",
    "brand": "Système U",
    "address": "180 Avenue de Auxerre",
    "city": "Auxerre",
    "latitude": 47.80926,
    "longitude": 3.616524,
    "fuels": [
      {
        "type": "E85",
        "price": 0.9
      },
      {
        "type": "GAZOLE",
        "price": 1.61
      },
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.66
      },
      {
        "type": "SP98",
        "price": 1.99
      }
    ]
  },
  {
    "id": "316",
    "name": "Esso Auxerre 2",
    "brand": "Esso",
    "address": "150 Boulevard de Auxerre",
    "city": "Auxerre",
    "latitude": 47.776493,
    "longitude": 3.629318,
    "fuels": [
      {
        "type": "E10",
        "price": 1.7
      },
      {
        "type": "E85",
        "price": 1.16
      },
      {
        "type": "GPLC",
        "price": 0.93
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "317",
    "name": "Leclerc Sens 1",
    "brand": "Leclerc",
    "address": "30 Allée de Sens",
    "city": "Sens",
    "latitude": 48.26411,
    "longitude": 3.228683,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.16
      },
      {
        "type": "SP98",
        "price": 2.02
      }
    ]
  },
  {
    "id": "318",
    "name": "TotalEnergies Sens 2",
    "brand": "TotalEnergies",
    "address": "62 Chemin de Sens",
    "city": "Sens",
    "latitude": 48.24112,
    "longitude": 3.23766,
    "fuels": [
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "SP95",
        "price": 1.83
      },
      {
        "type": "SP98",
        "price": 2.02
      }
    ]
  },
  {
    "id": "319",
    "name": "Shell Montargis 1",
    "brand": "Shell",
    "address": "189 Avenue de Montargis",
    "city": "Montargis",
    "latitude": 48.06469,
    "longitude": 2.675036,
    "fuels": [
      {
        "type": "E10",
        "price": 1.69
      },
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "GPLC",
        "price": 1.15
      },
      {
        "type": "SP95",
        "price": 1.96
      }
    ]
  },
  {
    "id": "320",
    "name": "Shell Montargis 2",
    "brand": "Shell",
    "address": "180 Route de Montargis",
    "city": "Montargis",
    "latitude": 47.9644,
    "longitude": 2.769119,
    "fuels": [
      {
        "type": "E10",
        "price": 1.65
      },
      {
        "type": "GAZOLE",
        "price": 1.74
      },
      {
        "type": "GPLC",
        "price": 1.1
      },
      {
        "type": "SP95",
        "price": 1.66
      }
    ]
  },
  {
    "id": "321",
    "name": "Système U Chartres 1",
    "brand": "Système U",
    "address": "5 Place de Chartres",
    "city": "Chartres",
    "latitude": 48.452857,
    "longitude": 1.509744,
    "fuels": [
      {
        "type": "E10",
        "price": 1.81
      },
      {
        "type": "E85",
        "price": 1.05
      },
      {
        "type": "GPLC",
        "price": 1.18
      },
      {
        "type": "SP95",
        "price": 1.99
      },
      {
        "type": "SP98",
        "price": 1.94
      }
    ]
  },
  {
    "id": "322",
    "name": "BP Chartres 2",
    "brand": "BP",
    "address": "120 Rue de Chartres",
    "city": "Chartres",
    "latitude": 48.407114,
    "longitude": 1.452295,
    "fuels": [
      {
        "type": "E10",
        "price": 1.87
      },
      {
        "type": "GAZOLE",
        "price": 1.53
      },
      {
        "type": "GPLC",
        "price": 1.24
      },
      {
        "type": "SP95",
        "price": 1.74
      }
    ]
  },
  {
    "id": "323",
    "name": "Système U Évreux 1",
    "brand": "Système U",
    "address": "6 Impasse de Évreux",
    "city": "Évreux",
    "latitude": 49.005937,
    "longitude": 1.211982,
    "fuels": [
      {
        "type": "E85",
        "price": 1.04
      },
      {
        "type": "SP98",
        "price": 1.84
      }
    ]
  },
  {
    "id": "324",
    "name": "Elan Évreux 2",
    "brand": "Elan",
    "address": "153 Place de Évreux",
    "city": "Évreux",
    "latitude": 49.044546,
    "longitude": 1.104038,
    "fuels": [
      {
        "type": "E10",
        "price": 1.73
      },
      {
        "type": "E85",
        "price": 1.1
      },
      {
        "type": "GPLC",
        "price": 1.02
      },
      {
        "type": "SP95",
        "price": 1.94
      }
    ]
  },
  {
    "id": "325",
    "name": "BP Dieppe 1",
    "brand": "BP",
    "address": "109 Route de Dieppe",
    "city": "Dieppe",
    "latitude": 49.917913,
    "longitude": 1.112581,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "E85",
        "price": 1.08
      },
      {
        "type": "SP95",
        "price": 1.69
      }
    ]
  },
  {
    "id": "326",
    "name": "Elan Dieppe 2",
    "brand": "Elan",
    "address": "19 Allée de Dieppe",
    "city": "Dieppe",
    "latitude": 49.963809,
    "longitude": 1.068295,
    "fuels": [
      {
        "type": "E10",
        "price": 1.93
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      },
      {
        "type": "GPLC",
        "price": 1.22
      },
      {
        "type": "SP98",
        "price": 1.77
      }
    ]
  },
  {
    "id": "327",
    "name": "Esso Le Mans 1",
    "brand": "Esso",
    "address": "110 Route de Le Mans",
    "city": "Le Mans",
    "latitude": 48.012993,
    "longitude": 0.230871,
    "fuels": [
      {
        "type": "E10",
        "price": 1.89
      },
      {
        "type": "GAZOLE",
        "price": 1.62
      },
      {
        "type": "GPLC",
        "price": 1.01
      },
      {
        "type": "SP95",
        "price": 1.69
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "328",
    "name": "Leclerc Le Mans 2",
    "brand": "Leclerc",
    "address": "163 Route de Le Mans",
    "city": "Le Mans",
    "latitude": 47.982052,
    "longitude": 0.245961,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "E85",
        "price": 1.07
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "GPLC",
        "price": 1.2
      },
      {
        "type": "SP98",
        "price": 1.9
      }
    ]
  },
  {
    "id": "329",
    "name": "Elan Alençon 1",
    "brand": "Elan",
    "address": "43 Avenue de Alençon",
    "city": "Alençon",
    "latitude": 48.413158,
    "longitude": 0.135343,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.98
      },
      {
        "type": "SP98",
        "price": 2.02
      }
    ]
  },
  {
    "id": "330",
    "name": "Shell Alençon 2",
    "brand": "Shell",
    "address": "124 Impasse de Alençon",
    "city": "Alençon",
    "latitude": 48.498157,
    "longitude": 0.056434,
    "fuels": [
      {
        "type": "GPLC",
        "price": 0.99
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "331",
    "name": "Indépendant Laval 1",
    "brand": "Indépendant",
    "address": "170 Place de Laval",
    "city": "Laval",
    "latitude": 48.081787,
    "longitude": -0.705782,
    "fuels": [
      {
        "type": "E85",
        "price": 1.17
      },
      {
        "type": "GPLC",
        "price": 1.16
      }
    ]
  },
  {
    "id": "332",
    "name": "Elan Laval 2",
    "brand": "Elan",
    "address": "101 Allée de Laval",
    "city": "Laval",
    "latitude": 48.10029,
    "longitude": -0.752787,
    "fuels": [
      {
        "type": "E85",
        "price": 0.95
      },
      {
        "type": "GAZOLE",
        "price": 1.67
      },
      {
        "type": "SP98",
        "price": 1.91
      }
    ]
  },
  {
    "id": "333",
    "name": "Leclerc Saint-Brieuc 1",
    "brand": "Leclerc",
    "address": "197 Avenue de Saint-Brieuc",
    "city": "Saint-Brieuc",
    "latitude": 48.44577,
    "longitude": -2.733055,
    "fuels": [
      {
        "type": "E85",
        "price": 1.07
      },
      {
        "type": "SP95",
        "price": 1.76
      },
      {
        "type": "SP98",
        "price": 1.84
      }
    ]
  },
  {
    "id": "334",
    "name": "BP Saint-Brieuc 2",
    "brand": "BP",
    "address": "200 Place de Saint-Brieuc",
    "city": "Saint-Brieuc",
    "latitude": 48.563331,
    "longitude": -2.734485,
    "fuels": [
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "GAZOLE",
        "price": 1.54
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.79
      },
      {
        "type": "SP98",
        "price": 1.97
      }
    ]
  },
  {
    "id": "335",
    "name": "Carrefour Saint-Nazaire 1",
    "brand": "Carrefour",
    "address": "40 Impasse de Saint-Nazaire",
    "city": "Saint-Nazaire",
    "latitude": 47.251812,
    "longitude": -2.257989,
    "fuels": [
      {
        "type": "E85",
        "price": 0.85
      },
      {
        "type": "GAZOLE",
        "price": 1.74
      }
    ]
  },
  {
    "id": "336",
    "name": "Elan Saint-Nazaire 2",
    "brand": "Elan",
    "address": "161 Chemin de Saint-Nazaire",
    "city": "Saint-Nazaire",
    "latitude": 47.255502,
    "longitude": -2.212293,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.15
      },
      {
        "type": "SP95",
        "price": 1.94
      }
    ]
  },
  {
    "id": "337",
    "name": "Avia Les Sables-d'Olonne 1",
    "brand": "Avia",
    "address": "122 Chemin de Les Sables-d'Olonne",
    "city": "Les Sables-d'Olonne",
    "latitude": 46.445898,
    "longitude": -1.795546,
    "fuels": [
      {
        "type": "E85",
        "price": 1.17
      },
      {
        "type": "GPLC",
        "price": 1.21
      },
      {
        "type": "SP95",
        "price": 1.79
      },
      {
        "type": "SP98",
        "price": 1.78
      }
    ]
  },
  {
    "id": "338",
    "name": "TotalEnergies Les Sables-d'Olonne 2",
    "brand": "TotalEnergies",
    "address": "95 Route de Les Sables-d'Olonne",
    "city": "Les Sables-d'Olonne",
    "latitude": 46.553563,
    "longitude": -1.791711,
    "fuels": [
      {
        "type": "E10",
        "price": 1.74
      },
      {
        "type": "E85",
        "price": 1.01
      },
      {
        "type": "GAZOLE",
        "price": 1.68
      },
      {
        "type": "SP95",
        "price": 1.69
      },
      {
        "type": "SP98",
        "price": 1.79
      }
    ]
  },
  {
    "id": "339",
    "name": "Avia La Roche-sur-Yon 1",
    "brand": "Avia",
    "address": "75 Allée de La Roche-sur-Yon",
    "city": "La Roche-sur-Yon",
    "latitude": 46.676117,
    "longitude": -1.414817,
    "fuels": [
      {
        "type": "E10",
        "price": 1.89
      },
      {
        "type": "E85",
        "price": 0.96
      },
      {
        "type": "GAZOLE",
        "price": 1.84
      },
      {
        "type": "GPLC",
        "price": 1.05
      },
      {
        "type": "SP98",
        "price": 1.81
      }
    ]
  },
  {
    "id": "340",
    "name": "Elan La Roche-sur-Yon 2",
    "brand": "Elan",
    "address": "171 Route de La Roche-sur-Yon",
    "city": "La Roche-sur-Yon",
    "latitude": 46.606255,
    "longitude": -1.49326,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "E85",
        "price": 0.96
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      }
    ]
  },
  {
    "id": "341",
    "name": "Indépendant Fontenay-le-Comte 1",
    "brand": "Indépendant",
    "address": "82 Rue de Fontenay-le-Comte",
    "city": "Fontenay-le-Comte",
    "latitude": 46.504761,
    "longitude": -0.78001,
    "fuels": [
      {
        "type": "E10",
        "price": 1.8
      },
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "SP95",
        "price": 1.65
      }
    ]
  },
  {
    "id": "342",
    "name": "Système U Fontenay-le-Comte 2",
    "brand": "Système U",
    "address": "81 Chemin de Fontenay-le-Comte",
    "city": "Fontenay-le-Comte",
    "latitude": 46.411914,
    "longitude": -0.816944,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "E85",
        "price": 1.13
      },
      {
        "type": "GPLC",
        "price": 1.11
      },
      {
        "type": "SP95",
        "price": 1.88
      },
      {
        "type": "SP98",
        "price": 1.98
      }
    ]
  },
  {
    "id": "343",
    "name": "BP Niort 1",
    "brand": "BP",
    "address": "76 Rue de Niort",
    "city": "Niort",
    "latitude": 46.323677,
    "longitude": -0.507321,
    "fuels": [
      {
        "type": "E10",
        "price": 1.76
      },
      {
        "type": "GAZOLE",
        "price": 1.84
      },
      {
        "type": "GPLC",
        "price": 0.97
      },
      {
        "type": "SP95",
        "price": 1.89
      },
      {
        "type": "SP98",
        "price": 1.86
      }
    ]
  },
  {
    "id": "344",
    "name": "Indépendant Niort 2",
    "brand": "Indépendant",
    "address": "62 Boulevard de Niort",
    "city": "Niort",
    "latitude": 46.332468,
    "longitude": -0.412621,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.07
      },
      {
        "type": "SP95",
        "price": 1.65
      }
    ]
  },
  {
    "id": "345",
    "name": "Leclerc Angoulême 1",
    "brand": "Leclerc",
    "address": "133 Avenue de Angoulême",
    "city": "Angoulême",
    "latitude": 45.698152,
    "longitude": 0.108139,
    "fuels": [
      {
        "type": "E10",
        "price": 1.93
      },
      {
        "type": "GAZOLE",
        "price": 1.78
      }
    ]
  },
  {
    "id": "346",
    "name": "Indépendant Angoulême 2",
    "brand": "Indépendant",
    "address": "96 Boulevard de Angoulême",
    "city": "Angoulême",
    "latitude": 45.70872,
    "longitude": 0.171604,
    "fuels": [
      {
        "type": "E10",
        "price": 1.88
      },
      {
        "type": "GAZOLE",
        "price": 1.88
      },
      {
        "type": "GPLC",
        "price": 1.15
      },
      {
        "type": "SP95",
        "price": 1.66
      },
      {
        "type": "SP98",
        "price": 2.03
      }
    ]
  },
  {
    "id": "347",
    "name": "Leclerc Saintes 1",
    "brand": "Leclerc",
    "address": "25 Avenue de Saintes",
    "city": "Saintes",
    "latitude": 45.758798,
    "longitude": -0.673995,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.22
      },
      {
        "type": "SP98",
        "price": 1.87
      }
    ]
  },
  {
    "id": "348",
    "name": "Leclerc Saintes 2",
    "brand": "Leclerc",
    "address": "121 Boulevard de Saintes",
    "city": "Saintes",
    "latitude": 45.716966,
    "longitude": -0.609202,
    "fuels": [
      {
        "type": "E10",
        "price": 1.89
      },
      {
        "type": "GAZOLE",
        "price": 1.86
      }
    ]
  },
  {
    "id": "349",
    "name": "Intermarché Rochefort 1",
    "brand": "Intermarché",
    "address": "75 Impasse de Rochefort",
    "city": "Rochefort",
    "latitude": 45.993857,
    "longitude": -0.911596,
    "fuels": [
      {
        "type": "E85",
        "price": 0.95
      },
      {
        "type": "GPLC",
        "price": 1.04
      }
    ]
  },
  {
    "id": "350",
    "name": "Système U Rochefort 2",
    "brand": "Système U",
    "address": "54 Boulevard de Rochefort",
    "city": "Rochefort",
    "latitude": 45.880971,
    "longitude": -0.971534,
    "fuels": [
      {
        "type": "GPLC",
        "price": 1.14
      },
      {
        "type": "SP95",
        "price": 1.85
      },
      {
        "type": "SP98",
        "price": 1.83
      }
    ]
  },
  {
    "id": "351",
    "name": "Leclerc Libourne 1",
    "brand": "Leclerc",
    "address": "112 Chemin de Libourne",
    "city": "Libourne",
    "latitude": 44.877195,
    "longitude": -0.29679,
    "fuels": [
      {
        "type": "E10",
        "price": 1.75
      },
      {
        "type": "GAZOLE",
        "price": 1.71
      },
      {
        "type": "SP98",
        "price": 1.81
      }
    ]
  },
  {
    "id": "352",
    "name": "Intermarché Libourne 2",
    "brand": "Intermarché",
    "address": "196 Avenue de Libourne",
    "city": "Libourne",
    "latitude": 44.951655,
    "longitude": -0.240705,
    "fuels": [
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "GPLC",
        "price": 0.94
      },
      {
        "type": "SP98",
        "price": 1.82
      }
    ]
  },
  {
    "id": "353",
    "name": "Casino Bergerac 1",
    "brand": "Casino",
    "address": "18 Avenue de Bergerac",
    "city": "Bergerac",
    "latitude": 44.825846,
    "longitude": 0.510069,
    "fuels": [
      {
        "type": "E10",
        "price": 1.66
      },
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "GAZOLE",
        "price": 1.69
      },
      {
        "type": "GPLC",
        "price": 1.18
      },
      {
        "type": "SP98",
        "price": 1.96
      }
    ]
  },
  {
    "id": "354",
    "name": "Casino Bergerac 2",
    "brand": "Casino",
    "address": "56 Allée de Bergerac",
    "city": "Bergerac",
    "latitude": 44.890944,
    "longitude": 0.549927,
    "fuels": [
      {
        "type": "E85",
        "price": 0.89
      },
      {
        "type": "GAZOLE",
        "price": 1.69
      },
      {
        "type": "GPLC",
        "price": 1.16
      },
      {
        "type": "SP95",
        "price": 1.67
      },
      {
        "type": "SP98",
        "price": 1.84
      }
    ]
  },
  {
    "id": "355",
    "name": "TotalEnergies Périgueux 1",
    "brand": "TotalEnergies",
    "address": "179 Avenue de Périgueux",
    "city": "Périgueux",
    "latitude": 45.246852,
    "longitude": 0.743858,
    "fuels": [
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "SP95",
        "price": 1.74
      }
    ]
  },
  {
    "id": "356",
    "name": "Intermarché Périgueux 2",
    "brand": "Intermarché",
    "address": "174 Chemin de Périgueux",
    "city": "Périgueux",
    "latitude": 45.173177,
    "longitude": 0.720115,
    "fuels": [
      {
        "type": "E10",
        "price": 1.94
      },
      {
        "type": "E85",
        "price": 0.86
      },
      {
        "type": "GAZOLE",
        "price": 1.75
      },
      {
        "type": "SP95",
        "price": 1.77
      },
      {
        "type": "SP98",
        "price": 2.1
      }
    ]
  },
  {
    "id": "357",
    "name": "Avia Brive-la-Gaillarde 1",
    "brand": "Avia",
    "address": "128 Impasse de Brive-la-Gaillarde",
    "city": "Brive-la-Gaillarde",
    "latitude": 45.137479,
    "longitude": 1.526079,
    "fuels": [
      {
        "type": "E10",
        "price": 1.63
      },
      {
        "type": "SP98",
        "price": 2.11
      }
    ]
  },
  {
    "id": "358",
    "name": "Esso Brive-la-Gaillarde 2",
    "brand": "Esso",
    "address": "10 Chemin de Brive-la-Gaillarde",
    "city": "Brive-la-Gaillarde",
    "latitude": 45.200184,
    "longitude": 1.591628,
    "fuels": [
      {
        "type": "E10",
        "price": 1.81
      },
      {
        "type": "GAZOLE",
        "price": 1.78
      },
      {
        "type": "GPLC",
        "price": 1.12
      },
      {
        "type": "SP98",
        "price": 2.01
      }
    ]
  },
  {
    "id": "359",
    "name": "TotalEnergies Tulle 1",
    "brand": "TotalEnergies",
    "address": "176 Rue de Tulle",
    "city": "Tulle",
    "latitude": 45.31963,
    "longitude": 1.812542,
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
    "id": "360",
    "name": "Intermarché Tulle 2",
    "brand": "Intermarché",
    "address": "44 Boulevard de Tulle",
    "city": "Tulle",
    "latitude": 45.196067,
    "longitude": 1.707214,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "GAZOLE",
        "price": 1.64
      }
    ]
  },
  {
    "id": "361",
    "name": "BP Aurillac 1",
    "brand": "BP",
    "address": "6 Allée de Aurillac",
    "city": "Aurillac",
    "latitude": 44.98295,
    "longitude": 2.471223,
    "fuels": [
      {
        "type": "E10",
        "price": 1.83
      },
      {
        "type": "SP98",
        "price": 1.86
      }
    ]
  },
  {
    "id": "362",
    "name": "Carrefour Aurillac 2",
    "brand": "Carrefour",
    "address": "80 Impasse de Aurillac",
    "city": "Aurillac",
    "latitude": 44.902542,
    "longitude": 2.392102,
    "fuels": [
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "GAZOLE",
        "price": 1.84
      },
      {
        "type": "GPLC",
        "price": 1.1
      },
      {
        "type": "SP95",
        "price": 1.73
      }
    ]
  },
  {
    "id": "363",
    "name": "Elan Saint-Flour 1",
    "brand": "Elan",
    "address": "85 Impasse de Saint-Flour",
    "city": "Saint-Flour",
    "latitude": 45.079908,
    "longitude": 3.050934,
    "fuels": [
      {
        "type": "E10",
        "price": 1.71
      },
      {
        "type": "GAZOLE",
        "price": 1.84
      },
      {
        "type": "GPLC",
        "price": 1.13
      },
      {
        "type": "SP95",
        "price": 1.89
      },
      {
        "type": "SP98",
        "price": 2.09
      }
    ]
  },
  {
    "id": "364",
    "name": "Shell Saint-Flour 2",
    "brand": "Shell",
    "address": "186 Boulevard de Saint-Flour",
    "city": "Saint-Flour",
    "latitude": 44.972636,
    "longitude": 3.094053,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.7
      },
      {
        "type": "GPLC",
        "price": 1.0
      },
      {
        "type": "SP95",
        "price": 1.86
      }
    ]
  },
  {
    "id": "365",
    "name": "BP Mende 1",
    "brand": "BP",
    "address": "78 Allée de Mende",
    "city": "Mende",
    "latitude": 44.459661,
    "longitude": 3.490256,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "E85",
        "price": 0.95
      },
      {
        "type": "GAZOLE",
        "price": 1.87
      },
      {
        "type": "GPLC",
        "price": 1.16
      },
      {
        "type": "SP95",
        "price": 1.75
      }
    ]
  },
  {
    "id": "366",
    "name": "Esso Mende 2",
    "brand": "Esso",
    "address": "87 Chemin de Mende",
    "city": "Mende",
    "latitude": 44.505853,
    "longitude": 3.570431,
    "fuels": [
      {
        "type": "E10",
        "price": 1.95
      },
      {
        "type": "E85",
        "price": 1.1
      },
      {
        "type": "GAZOLE",
        "price": 1.57
      },
      {
        "type": "SP95",
        "price": 1.94
      },
      {
        "type": "SP98",
        "price": 1.97
      }
    ]
  },
  {
    "id": "367",
    "name": "Casino Millau 1",
    "brand": "Casino",
    "address": "17 Boulevard de Millau",
    "city": "Millau",
    "latitude": 44.089584,
    "longitude": 3.059462,
    "fuels": [
      {
        "type": "E10",
        "price": 1.71
      },
      {
        "type": "E85",
        "price": 1.0
      },
      {
        "type": "GAZOLE",
        "price": 1.82
      },
      {
        "type": "GPLC",
        "price": 1.24
      },
      {
        "type": "SP98",
        "price": 2.0
      }
    ]
  },
  {
    "id": "368",
    "name": "BP Millau 2",
    "brand": "BP",
    "address": "50 Chemin de Millau",
    "city": "Millau",
    "latitude": 44.158687,
    "longitude": 3.0834,
    "fuels": [
      {
        "type": "E10",
        "price": 1.67
      },
      {
        "type": "E85",
        "price": 1.18
      }
    ]
  },
  {
    "id": "369",
    "name": "Intermarché Rodez 1",
    "brand": "Intermarché",
    "address": "85 Impasse de Rodez",
    "city": "Rodez",
    "latitude": 44.399659,
    "longitude": 2.633227,
    "fuels": [
      {
        "type": "E85",
        "price": 1.14
      },
      {
        "type": "GAZOLE",
        "price": 1.55
      },
      {
        "type": "GPLC",
        "price": 1.17
      },
      {
        "type": "SP95",
        "price": 1.81
      },
      {
        "type": "SP98",
        "price": 1.96
      }
    ]
  },
  {
    "id": "370",
    "name": "Intermarché Rodez 2",
    "brand": "Intermarché",
    "address": "5 Avenue de Rodez",
    "city": "Rodez",
    "latitude": 44.416482,
    "longitude": 2.521011,
    "fuels": [
      {
        "type": "E85",
        "price": 1.01
      },
      {
        "type": "GAZOLE",
        "price": 1.56
      },
      {
        "type": "GPLC",
        "price": 1.13
      }
    ]
  },
  {
    "id": "371",
    "name": "Système U Villefranche-de-Rouergue 1",
    "brand": "Système U",
    "address": "66 Allée de Villefranche-de-Rouergue",
    "city": "Villefranche-de-Rouergue",
    "latitude": 44.344924,
    "longitude": 1.985582,
    "fuels": [
      {
        "type": "E10",
        "price": 1.79
      },
      {
        "type": "E85",
        "price": 0.85
      },
      {
        "type": "GPLC",
        "price": 1.01
      },
      {
        "type": "SP95",
        "price": 1.65
      }
    ]
  },
  {
    "id": "372",
    "name": "Système U Villefranche-de-Rouergue 2",
    "brand": "Système U",
    "address": "127 Rue de Villefranche-de-Rouergue",
    "city": "Villefranche-de-Rouergue",
    "latitude": 44.348353,
    "longitude": 2.01254,
    "fuels": [
      {
        "type": "E85",
        "price": 1.11
      },
      {
        "type": "GAZOLE",
        "price": 1.53
      },
      {
        "type": "GPLC",
        "price": 1.19
      },
      {
        "type": "SP95",
        "price": 1.72
      },
      {
        "type": "SP98",
        "price": 1.88
      }
    ]
  },
  {
    "id": "373",
    "name": "Shell Albi 1",
    "brand": "Shell",
    "address": "185 Rue de Albi",
    "city": "Albi",
    "latitude": 43.868095,
    "longitude": 2.175609,
    "fuels": [
      {
        "type": "E85",
        "price": 0.98
      },
      {
        "type": "GAZOLE",
        "price": 1.76
      }
    ]
  },
  {
    "id": "374",
    "name": "Indépendant Albi 2",
    "brand": "Indépendant",
    "address": "6 Rue de Albi",
    "city": "Albi",
    "latitude": 43.861397,
    "longitude": 2.170978,
    "fuels": [
      {
        "type": "E10",
        "price": 1.85
      },
      {
        "type": "GAZOLE",
        "price": 1.67
      }
    ]
  },
  {
    "id": "375",
    "name": "Elan Castres 1",
    "brand": "Elan",
    "address": "47 Route de Castres",
    "city": "Castres",
    "latitude": 43.636737,
    "longitude": 2.190458,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.53
      },
      {
        "type": "GPLC",
        "price": 0.99
      },
      {
        "type": "SP95",
        "price": 1.91
      },
      {
        "type": "SP98",
        "price": 2.0
      }
    ]
  },
  {
    "id": "376",
    "name": "TotalEnergies Castres 2",
    "brand": "TotalEnergies",
    "address": "98 Rue de Castres",
    "city": "Castres",
    "latitude": 43.535443,
    "longitude": 2.180819,
    "fuels": [
      {
        "type": "E10",
        "price": 1.82
      },
      {
        "type": "SP95",
        "price": 1.94
      }
    ]
  },
  {
    "id": "377",
    "name": "Elan Montauban 1",
    "brand": "Elan",
    "address": "163 Rue de Montauban",
    "city": "Montauban",
    "latitude": 44.052239,
    "longitude": 1.351,
    "fuels": [
      {
        "type": "E85",
        "price": 1.11
      },
      {
        "type": "GAZOLE",
        "price": 1.66
      },
      {
        "type": "GPLC",
        "price": 1.08
      },
      {
        "type": "SP95",
        "price": 1.78
      },
      {
        "type": "SP98",
        "price": 1.86
      }
    ]
  },
  {
    "id": "378",
    "name": "Casino Montauban 2",
    "brand": "Casino",
    "address": "125 Place de Montauban",
    "city": "Montauban",
    "latitude": 44.03733,
    "longitude": 1.352411,
    "fuels": [
      {
        "type": "E10",
        "price": 1.78
      },
      {
        "type": "E85",
        "price": 1.09
      }
    ]
  },
  {
    "id": "379",
    "name": "BP Agen 1",
    "brand": "BP",
    "address": "102 Boulevard de Agen",
    "city": "Agen",
    "latitude": 44.142374,
    "longitude": 0.594822,
    "fuels": [
      {
        "type": "E85",
        "price": 1.04
      },
      {
        "type": "GPLC",
        "price": 1.24
      },
      {
        "type": "SP95",
        "price": 1.84
      }
    ]
  },
  {
    "id": "380",
    "name": "Système U Agen 2",
    "brand": "Système U",
    "address": "41 Place de Agen",
    "city": "Agen",
    "latitude": 44.201836,
    "longitude": 0.590311,
    "fuels": [
      {
        "type": "E10",
        "price": 1.91
      },
      {
        "type": "E85",
        "price": 0.92
      },
      {
        "type": "GAZOLE",
        "price": 1.75
      }
    ]
  },
  {
    "id": "381",
    "name": "Indépendant Villeneuve-sur-Lot 1",
    "brand": "Indépendant",
    "address": "64 Avenue de Villeneuve-sur-Lot",
    "city": "Villeneuve-sur-Lot",
    "latitude": 44.366653,
    "longitude": 0.67682,
    "fuels": [
      {
        "type": "E85",
        "price": 1.16
      },
      {
        "type": "GAZOLE",
        "price": 1.54
      },
      {
        "type": "GPLC",
        "price": 0.98
      },
      {
        "type": "SP95",
        "price": 1.98
      }
    ]
  },
  {
    "id": "382",
    "name": "Indépendant Villeneuve-sur-Lot 2",
    "brand": "Indépendant",
    "address": "174 Route de Villeneuve-sur-Lot",
    "city": "Villeneuve-sur-Lot",
    "latitude": 44.370122,
    "longitude": 0.722468,
    "fuels": [
      {
        "type": "E85",
        "price": 1.18
      },
      {
        "type": "GAZOLE",
        "price": 1.79
      },
      {
        "type": "SP95",
        "price": 1.88
      },
      {
        "type": "SP98",
        "price": 1.83
      }
    ]
  },
  {
    "id": "383",
    "name": "Casino Dax 1",
    "brand": "Casino",
    "address": "32 Allée de Dax",
    "city": "Dax",
    "latitude": 43.735705,
    "longitude": -1.016454,
    "fuels": [
      {
        "type": "E10",
        "price": 1.87
      },
      {
        "type": "GAZOLE",
        "price": 1.65
      },
      {
        "type": "GPLC",
        "price": 1.0
      },
      {
        "type": "SP98",
        "price": 1.99
      }
    ]
  },
  {
    "id": "384",
    "name": "Casino Dax 2",
    "brand": "Casino",
    "address": "131 Avenue de Dax",
    "city": "Dax",
    "latitude": 43.734223,
    "longitude": -1.119423,
    "fuels": [
      {
        "type": "E10",
        "price": 1.76
      },
      {
        "type": "GAZOLE",
        "price": 1.58
      },
      {
        "type": "GPLC",
        "price": 1.0
      },
      {
        "type": "SP95",
        "price": 1.85
      },
      {
        "type": "SP98",
        "price": 2.09
      }
    ]
  },
  {
    "id": "385",
    "name": "Système U Mont-de-Marsan 1",
    "brand": "Système U",
    "address": "195 Rue de Mont-de-Marsan",
    "city": "Mont-de-Marsan",
    "latitude": 43.825881,
    "longitude": -0.453669,
    "fuels": [
      {
        "type": "E10",
        "price": 1.87
      },
      {
        "type": "E85",
        "price": 1.15
      }
    ]
  },
  {
    "id": "386",
    "name": "Indépendant Mont-de-Marsan 2",
    "brand": "Indépendant",
    "address": "171 Avenue de Mont-de-Marsan",
    "city": "Mont-de-Marsan",
    "latitude": 43.889091,
    "longitude": -0.4954,
    "fuels": [
      {
        "type": "E10",
        "price": 1.72
      },
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "GPLC",
        "price": 1.19
      },
      {
        "type": "SP95",
        "price": 1.74
      },
      {
        "type": "SP98",
        "price": 2.07
      }
    ]
  },
  {
    "id": "387",
    "name": "Esso Auch 1",
    "brand": "Esso",
    "address": "6 Place de Auch",
    "city": "Auch",
    "latitude": 43.623376,
    "longitude": 0.591034,
    "fuels": [
      {
        "type": "E85",
        "price": 0.9
      },
      {
        "type": "GAZOLE",
        "price": 1.89
      },
      {
        "type": "GPLC",
        "price": 0.99
      },
      {
        "type": "SP95",
        "price": 1.66
      },
      {
        "type": "SP98",
        "price": 2.1
      }
    ]
  },
  {
    "id": "388",
    "name": "Esso Auch 2",
    "brand": "Esso",
    "address": "74 Allée de Auch",
    "city": "Auch",
    "latitude": 43.69493,
    "longitude": 0.526984,
    "fuels": [
      {
        "type": "E10",
        "price": 1.87
      },
      {
        "type": "GAZOLE",
        "price": 1.58
      },
      {
        "type": "GPLC",
        "price": 1.09
      },
      {
        "type": "SP95",
        "price": 1.88
      },
      {
        "type": "SP98",
        "price": 2.02
      }
    ]
  },
  {
    "id": "389",
    "name": "Elan Condom 1",
    "brand": "Elan",
    "address": "66 Chemin de Condom",
    "city": "Condom",
    "latitude": 43.992501,
    "longitude": 0.406033,
    "fuels": [
      {
        "type": "GAZOLE",
        "price": 1.63
      },
      {
        "type": "GPLC",
        "price": 0.98
      },
      {
        "type": "SP95",
        "price": 1.78
      }
    ]
  },
  {
    "id": "390",
    "name": "Elan Condom 2",
    "brand": "Elan",
    "address": "173 Route de Condom",
    "city": "Condom",
    "latitude": 43.946515,
    "longitude": 0.428446,
    "fuels": [
      {
        "type": "E10",
        "price": 1.73
      },
      {
        "type": "E85",
        "price": 1.06
      },
      {
        "type": "GAZOLE",
        "price": 1.71
      },
      {
        "type": "GPLC",
        "price": 1.18
      }
    ]
  },
  {
    "id": "391",
    "name": "Intermarché Tarbes 1",
    "brand": "Intermarché",
    "address": "137 Boulevard de Tarbes",
    "city": "Tarbes",
    "latitude": 43.189991,
    "longitude": 0.044956,
    "fuels": [
      {
        "type": "E85",
        "price": 1.09
      },
      {
        "type": "SP95",
        "price": 1.97
      },
      {
        "type": "SP98",
        "price": 1.77
      }
    ]
  },
  {
    "id": "392",
    "name": "Indépendant Tarbes 2",
    "brand": "Indépendant",
    "address": "80 Boulevard de Tarbes",
    "city": "Tarbes",
    "latitude": 43.234799,
    "longitude": 0.060139,
    "fuels": [
      {
        "type": "E85",
        "price": 0.86
      },
      {
        "type": "SP95",
        "price": 1.78
      },
      {
        "type": "SP98",
        "price": 1.91
      }
    ]
  },
  {
    "id": "393",
    "name": "BP Lourdes 1",
    "brand": "BP",
    "address": "78 Rue de Lourdes",
    "city": "Lourdes",
    "latitude": 43.128061,
    "longitude": -0.070122,
    "fuels": [
      {
        "type": "E85",
        "price": 0.89
      },
      {
        "type": "SP98",
        "price": 1.9
      }
    ]
  },
  {
    "id": "394",
    "name": "Shell Lourdes 2",
    "brand": "Shell",
    "address": "107 Avenue de Lourdes",
    "city": "Lourdes",
    "latitude": 43.125238,
    "longitude": -0.106353,
    "fuels": [
      {
        "type": "E10",
        "price": 1.7
      },
      {
        "type": "E85",
        "price": 0.87
      },
      {
        "type": "GAZOLE",
        "price": 1.64
      },
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP98",
        "price": 2.06
      }
    ]
  },
  {
    "id": "395",
    "name": "Casino Saint-Gaudens 1",
    "brand": "Casino",
    "address": "179 Route de Saint-Gaudens",
    "city": "Saint-Gaudens",
    "latitude": 43.174684,
    "longitude": 0.687547,
    "fuels": [
      {
        "type": "E10",
        "price": 1.9
      },
      {
        "type": "E85",
        "price": 0.93
      },
      {
        "type": "GPLC",
        "price": 1.02
      },
      {
        "type": "SP95",
        "price": 1.71
      },
      {
        "type": "SP98",
        "price": 2.09
      }
    ]
  },
  {
    "id": "396",
    "name": "Elan Saint-Gaudens 2",
    "brand": "Elan",
    "address": "157 Place de Saint-Gaudens",
    "city": "Saint-Gaudens",
    "latitude": 43.066723,
    "longitude": 0.721203,
    "fuels": [
      {
        "type": "E85",
        "price": 0.96
      },
      {
        "type": "GAZOLE",
        "price": 1.66
      },
      {
        "type": "GPLC",
        "price": 0.94
      }
    ]
  },
  {
    "id": "397",
    "name": "BP Foix 1",
    "brand": "BP",
    "address": "15 Allée de Foix",
    "city": "Foix",
    "latitude": 43.031114,
    "longitude": 1.591099,
    "fuels": [
      {
        "type": "E10",
        "price": 1.93
      },
      {
        "type": "GAZOLE",
        "price": 1.84
      },
      {
        "type": "GPLC",
        "price": 1.03
      },
      {
        "type": "SP95",
        "price": 1.69
      }
    ]
  },
  {
    "id": "398",
    "name": "Shell Foix 2",
    "brand": "Shell",
    "address": "55 Place de Foix",
    "city": "Foix",
    "latitude": 42.91972,
    "longitude": 1.566911,
    "fuels": [
      {
        "type": "SP95",
        "price": 1.72
      },
      {
        "type": "SP98",
        "price": 2.12
      }
    ]
  },
  {
    "id": "399",
    "name": "Avia Pamiers 1",
    "brand": "Avia",
    "address": "151 Allée de Pamiers",
    "city": "Pamiers",
    "latitude": 43.115627,
    "longitude": 1.549665,
    "fuels": [
      {
        "type": "E85",
        "price": 1.12
      },
      {
        "type": "GPLC",
        "price": 0.96
      },
      {
        "type": "SP98",
        "price": 1.76
      }
    ]
  },
  {
    "id": "400",
    "name": "Esso Pamiers 2",
    "brand": "Esso",
    "address": "21 Route de Pamiers",
    "city": "Pamiers",
    "latitude": 43.146616,
    "longitude": 1.655222,
    "fuels": [
      {
        "type": "E85",
        "price": 0.94
      },
      {
        "type": "GAZOLE",
        "price": 1.75
      },
      {
        "type": "GPLC",
        "price": 1.22
      },
      {
        "type": "SP95",
        "price": 1.98
      }
    ]
  }
];

// Endpoint stations avec filtres optionnels
app.get('/api/stations', (req, res) => {
  const { lat, lng, radius = 50, fuel } = req.query;

  let result = [...stations];

  // Filtre par type de carburant
  if (fuel) {
    const fuelUpper = fuel.toUpperCase();
    result = result.map(s => ({
      ...s,
      fuels: s.fuels.filter(f => f.type === fuelUpper)
    })).filter(s => s.fuels.length > 0);
  }

  // Si lat/lng fournis, tri par proximité
  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    result = result.map(s => {
      const dLat = s.latitude - userLat;
      const dLng = s.longitude - userLng;
      const dist = Math.sqrt(dLat*dLat + dLng*dLng) * 111;
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
