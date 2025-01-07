const bussines = [
  {
    "business_id": "b1",
    "name": "Restaurante El Rincón Mexicano",
    "description": "Disfruta de los auténticos sabores mexicanos en un ambiente acogedor.",
    "category": ["restaurante", "familiar"],
    "location": { "latitude": 21.5075, "longitude": -104.8955 },
    "address": "Av. Insurgentes 123, Tepic, Nayarit, México",
    "opening_hours": {
      "lunes": "9:00 - 22:00",
      "martes": "9:00 - 22:00",
      "miércoles": "9:00 - 22:00",
      "jueves": "9:00 - 22:00",
      "viernes": "9:00 - 23:00",
      "sábado": "9:00 - 23:00",
      "domingo": "9:00 - 21:00"
    },
    "menu": ["Tacos al pastor", "Chiles en nogada", "Pozole"],
    "rating": 4.7,
    "images": ["https://picsum.photos/200", "https://picsum.photos/200"],
    "premium": true,
    "created_at": "2025-01-01T12:00:00Z"
  },
  {
    "business_id": "b2",
    "name": "Bar La Terraza",
    "description": "El mejor lugar para disfrutar de música en vivo y cocteles únicos.",
    "category": ["bar", "música en vivo"],
    "location": { "latitude": 21.5009, "longitude": -104.9083 },
    "address": "Calle Hidalgo 456, Tepic, Nayarit, México",
    "opening_hours": {
      "lunes": "17:00 - 1:00",
      "martes": "17:00 - 1:00",
      "miércoles": "17:00 - 1:00",
      "jueves": "17:00 - 2:00",
      "viernes": "17:00 - 3:00",
      "sábado": "17:00 - 3:00",
      "domingo": "Cerrado"
    },
    "menu": ["Margarita", "Piña colada", "Cerveza artesanal"],
    "rating": 4.5,
    "images": ["https://picsum.photos/200", "https://picsum.photos/200"],
    "premium": false,
    "created_at": "2025-01-02T15:30:00Z"
  },
  {
    "business_id": "b3",
    "name": "Cafetería La Luna",
    "description": "Un lugar tranquilo para disfrutar del mejor café de la región.",
    "category": ["cafetería", "postres"],
    "location": { "latitude": 21.5089, "longitude": -104.8912 },
    "address": "Av. México 789, Tepic, Nayarit, México",
    "opening_hours": {
      "lunes": "8:00 - 21:00",
      "martes": "8:00 - 21:00",
      "miércoles": "8:00 - 21:00",
      "jueves": "8:00 - 21:00",
      "viernes": "8:00 - 22:00",
      "sábado": "8:00 - 22:00",
      "domingo": "8:00 - 20:00"
    },
    "menu": ["Latte", "Capuchino", "Cheesecake"],
    "rating": 4.8,
    "images": ["https://picsum.photos/200", "https://picsum.photos/200"],
    "premium": true,
    "created_at": "2025-01-03T10:00:00Z"
  },
  {
    "business_id": "b4",
    "name": "Spa Belleza y Salud",
    "description": "Relájate y renueva tu cuerpo en nuestro spa profesional.",
    "category": ["spa", "belleza"],
    "location": { "latitude": 21.5123, "longitude": -104.8847 },
    "address": "Blvd. Tepic-Xalisco 321, Tepic, Nayarit, México",
    "opening_hours": {
      "lunes": "10:00 - 20:00",
      "martes": "10:00 - 20:00",
      "miércoles": "10:00 - 20:00",
      "jueves": "10:00 - 20:00",
      "viernes": "10:00 - 21:00",
      "sábado": "10:00 - 21:00",
      "domingo": "10:00 - 18:00"
    },
    "menu": ["Masaje relajante", "Faciales", "Manicura y pedicura"],
    "rating": 4.6,
    "images": ["https://picsum.photos/200", "https://picsum.photos/200"],
    "premium": false,
    "created_at": "2025-01-04T09:00:00Z"
  },
  {
    "business_id": "b5",
    "name": "Gimnasio Fitness Plus",
    "description": "Tu mejor opción para mantenerte en forma y saludable.",
    "category": ["gimnasio", "deportes"],
    "location": { "latitude": 21.5098, "longitude": -104.8801 },
    "address": "Col. Centro, Tepic, Nayarit, México",
    "opening_hours": {
      "lunes": "6:00 - 22:00",
      "martes": "6:00 - 22:00",
      "miércoles": "6:00 - 22:00",
      "jueves": "6:00 - 22:00",
      "viernes": "6:00 - 22:00",
      "sábado": "7:00 - 20:00",
      "domingo": "8:00 - 14:00"
    },
    "menu": ["Clases de yoga", "Entrenamiento personal", "CrossFit"],
    "rating": 4.9,
    "images": ["https://picsum.photos/200", "https://picsum.photos/200"],
    "premium": true,
    "created_at": "2025-01-05T07:00:00Z"
  }
]

export default bussines;