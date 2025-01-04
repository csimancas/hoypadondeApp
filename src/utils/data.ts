export const bussines = [
    [
        {
          'business_id': 'rest001',
          'name': 'El Sazón Mexicano',
          'description': 'Auténtica comida mexicana preparada con amor.',
          'category': ['restaurante', 'mexicana'],
          'location': { 'latitude': 19.432608, 'longitude': -99.133209 },
          'address': 'Av. Insurgentes Sur 1234, Ciudad de México',
          'opening_hours': {
            'lunes': '9:00-21:00',
            'martes': '9:00-21:00',
            'miércoles': '9:00-21:00',
            'jueves': '9:00-21:00',
            'viernes': '9:00-23:00',
            'sábado': '10:00-23:00',
            'domingo': '10:00-18:00'
          },
          'menu': [
            { 'item': 'Tacos al Pastor', 'price': 15.0 },
            { 'item': 'Enchiladas Verdes', 'price': 50.0 }
          ],
          'rating': 4.7,
          'images': [
            'https://example.com/images/rest001_1.jpg',
            'https://example.com/images/rest001_2.jpg'
          ],
          'premium': true,
          'created_at': '2024-01-01T12:00:00Z'
        },
        {
          'business_id': 'bar001',
          'name': 'La Esquina del Mezcal',
          'description': 'El mejor mezcal artesanal en un ambiente único.',
          'category': ['bar', 'artesanal'],
          'location': { 'latitude': 20.673789, 'longitude': -103.344706 },
          'address': 'Calle Juárez 456, Guadalajara, Jalisco',
          'opening_hours': {
            'lunes': 'Cerrado',
            'martes': '18:00-2:00',
            'miércoles': '18:00-2:00',
            'jueves': '18:00-3:00',
            'viernes': '18:00-3:00',
            'sábado': '18:00-3:00',
            'domingo': '18:00-1:00'
          },
          'menu': [
            { 'item': 'Mezcal Oaxaqueño', 'price': 100.0 },
            { 'item': 'Coctel de la Casa', 'price': 120.0 }
          ],
          'rating': 4.8,
          'images': [
            'https://example.com/images/bar001_1.jpg',
            'https://example.com/images/bar001_2.jpg'
          ],
          'premium': false,
          'created_at': '2024-02-01T12:00:00Z'
        },
        {
          'business_id': 'cafe001',
          'name': 'Café Latte',
          'description': 'Café orgánico y postres caseros.',
          'category': ['cafetería', 'orgánico'],
          'location': { 'latitude': 21.161908, 'longitude': -86.851528 },
          'address': 'Plaza Central, Cancún, Quintana Roo',
          'opening_hours': {
            'lunes': '7:00-19:00',
            'martes': '7:00-19:00',
            'miércoles': '7:00-19:00',
            'jueves': '7:00-19:00',
            'viernes': '7:00-21:00',
            'sábado': '8:00-21:00',
            'domingo': '8:00-18:00'
          },
          'menu': [
            { 'item': 'Café Americano', 'price': 30.0 },
            { 'item': 'Cheesecake de Frutos Rojos', 'price': 65.0 }
          ],
          'rating': 4.5,
          'images': [
            'https://example.com/images/cafe001_1.jpg',
            'https://example.com/images/cafe001_2.jpg'
          ],
          'premium': false,
          'created_at': '2023-12-01T12:00:00Z'
        },
        {
          'business_id': 'shop001',
          'name': 'Moda Urbana',
          'description': 'Ropa casual y moderna para jóvenes.',
          'category': ['tienda', 'ropa'],
          'location': { 'latitude': 22.156469, 'longitude': -100.985540 },
          'address': 'Centro Comercial Altaria, San Luis Potosí',
          'opening_hours': {
            'lunes': '10:00-20:00',
            'martes': '10:00-20:00',
            'miércoles': '10:00-20:00',
            'jueves': '10:00-20:00',
            'viernes': '10:00-21:00',
            'sábado': '10:00-21:00',
            'domingo': '11:00-19:00'
          },
          'menu': [
            { 'item': 'Playera Básica', 'price': 200.0 },
            { 'item': 'Jeans Slim Fit', 'price': 450.0 }
          ],
          'rating': 4.3,
          'images': [
            'https://example.com/images/shop001_1.jpg',
            'https://example.com/images/shop001_2.jpg'
          ],
          'premium': true,
          'created_at': '2024-03-01T12:00:00Z'
        },
        {
          'business_id': 'gym001',
          'name': 'FitZone Gym',
          'description': 'El lugar ideal para lograr tus metas fitness.',
          'category': ['gimnasio', 'salud'],
          'location': { 'latitude': 19.246469, 'longitude': -98.964540 },
          'address': 'Av. Principal 123, Puebla, Puebla',
          'opening_hours': {
            'lunes': '6:00-22:00',
            'martes': '6:00-22:00',
            'miércoles': '6:00-22:00',
            'jueves': '6:00-22:00',
            'viernes': '6:00-22:00',
            'sábado': '8:00-20:00',
            'domingo': '8:00-14:00'
          },
          'menu': [
            { 'item': 'Membresía Mensual', 'price': 500.0 },
            { 'item': 'Clase Personalizada', 'price': 300.0 }
          ],
          'rating': 4.9,
          'images': [
            'https://example.com/images/gym001_1.jpg',
            'https://example.com/images/gym001_2.jpg'
          ],
          'premium': true,
          'created_at': '2024-04-01T12:00:00Z'
        },
      ],
];
