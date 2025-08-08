export interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  gender: 'masculino' | 'femenino' | 'unisex';
  ageRange: string;
  profession?: string;
  hobby?: string;
  type: 'tecnológico' | 'artesanal' | 'deportivo' | 'hogar' | 'moda' | 'experiencia' | 'personalizado';
  image: string;
  link?: string;
  source?: string;
}

export const gifts: Gift[] = [
  // Regalos para Hombres
  {
    id: 1,
    name: "Libro ilustrado 'The Watch Book Rolex'",
    description: "Tercera edición ampliada del libro ilustrado de Gisbert L. Brunner que analiza la historia y los relojes más emblemáticos de Rolex, con imágenes y textos detallados.",
    price: 89000,
    category: "Libros",
    gender: "masculino",
    ageRange: "25-65",
    profession: "ejecutivo",
    hobby: "lectura",
    type: "artesanal",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.westwing.es/the-watch-book-rolex",
    source: "gifts_by_sex.json"
  },
  {
    id: 2,
    name: "Mancuernas ajustables Ativafit",
    description: "Mancuernas regulables con dial que permiten cambiar el peso en segundos; están fabricadas en acero cromado y permiten entrenar con pesos hasta 20 kg.",
    price: 125000,
    category: "Deportes",
    gender: "masculino",
    ageRange: "18-50",
    profession: "deportista",
    hobby: "deportes",
    type: "deportivo",
    image: "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.amazon.es/Ativafit-Mancuernas-Ajustables",
    source: "gifts_by_sex.json"
  },
  {
    id: 3,
    name: "Tocadiscos 1 By One",
    description: "Reproductor de vinilos con sistema de absorción de vibraciones y altavoces incorporados; permite escuchar música desde vinilos o vía Bluetooth y ofrece un diseño vintage en madera y metal.",
    price: 180000,
    category: "Tecnología",
    gender: "masculino",
    ageRange: "25-55",
    profession: "músico",
    hobby: "música",
    type: "tecnológico",
    image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.amazon.es/1ByOne-Tocadiscos-Bluetooth",
    source: "gifts_by_sex.json"
  },
  {
    id: 4,
    name: "Perfume MYSLF de Yves Saint Laurent",
    description: "Fragancia floral amaderada con notas de bergamota de Calabria, azahar de Túnez y un acorde amaderado de pachulí; el frasco es recargable para reducir la huella ecológica.",
    price: 95000,
    category: "Belleza",
    gender: "masculino",
    ageRange: "20-50",
    type: "moda",
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.sephora.es/ysl-myslf",
    source: "gifts_by_sex.json"
  },
  {
    id: 5,
    name: "Auriculares inalámbricos Bowers & Wilkins PX8",
    description: "Auriculares inalámbricos con materiales de primera calidad y tecnología de alta definición; ofrecen sonido de lujo y varios acabados elegantes.",
    price: 320000,
    category: "Tecnología",
    gender: "masculino",
    ageRange: "25-55",
    hobby: "música",
    type: "tecnológico",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.bowerswilkins.com",
    source: "gifts_by_sex.json"
  },

  // Regalos para Mujeres
  {
    id: 6,
    name: "Cámara de impresión instantánea Kodak Printomatic",
    description: "Cámara instantánea con sensor de 5 MP y lente gran angular 1:2 que imprime fotografías sin necesidad de cartuchos de tinta, ideal para capturar recuerdos al momento.",
    price: 85000,
    category: "Tecnología",
    gender: "femenino",
    ageRange: "16-45",
    profession: "creativa",
    hobby: "fotografía",
    type: "tecnológico",
    image: "https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.amazon.es/Kodak-Printomatic",
    source: "gifts_by_sex.json"
  },
  {
    id: 7,
    name: "Plancha de pelo ghd Chronos Iced Luxe",
    description: "Plancha de edición limitada con tecnología motion‑responsive que ofrece un deslizamiento suave y brillo; incluye placas de calentamiento rápido y modo de suspensión automático.",
    price: 195000,
    category: "Belleza",
    gender: "femenino",
    ageRange: "18-50",
    profession: "estilista",
    hobby: "belleza",
    type: "tecnológico",
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.amazon.es/ghd-chronos-iced-luxe",
    source: "gifts_by_sex.json"
  },
  {
    id: 8,
    name: "Bolso shopping de poliéster reciclado Soie",
    description: "Bolso bicolor confeccionado con poliéster reciclado por la firma Soie; combina artesanía sostenible y diseño versátil para llevar como bolso de hombro o bandolera.",
    price: 65000,
    category: "Moda",
    gender: "femenino",
    ageRange: "20-50",
    profession: "diseñadora",
    hobby: "moda",
    type: "moda",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.soie.com/bolso-shopping-reciclado",
    source: "gifts_by_sex.json"
  },
  {
    id: 9,
    name: "Pendientes Témpanos de Papiroga",
    description: "Pendientes ultraligeros elaborados con placas de plexiglás turquesa y verde oliva y anillas bañadas en oro de 18 k, inspirados en la efímera belleza de los témpanos.",
    price: 45000,
    category: "Joyería",
    gender: "femenino",
    ageRange: "18-45",
    profession: "artista",
    hobby: "moda",
    type: "artesanal",
    image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.papiroga.com/pendientes-tempanos",
    source: "gifts_by_sex.json"
  },
  {
    id: 10,
    name: "Tarjeta regalo para tratamientos Royal Touch",
    description: "Tarjeta de regalo canjeable por masajes drenantes, tratamientos faciales o productos reafirmantes en el centro Royal Touch de Fernanda Silva.",
    price: 75000,
    category: "Experiencias",
    gender: "femenino",
    ageRange: "25-65",
    hobby: "bienestar",
    type: "experiencia",
    image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.royaltouch.com/regalo",
    source: "gifts_by_sex.json"
  },

  // Regalos Unisex
  {
    id: 11,
    name: "Tarjeta de regalo digital",
    description: "Tarjeta electrónica que permite al destinatario elegir su propio obsequio; las tarjetas de regalo son una de las opciones más populares en fechas especiales.",
    price: 50000,
    category: "Tarjetas Regalo",
    gender: "unisex",
    ageRange: "16-65",
    type: "experiencia",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.falabella.com/falabella-cl/cms/tarjetas-regalo",
    source: "gifts_by_sex.json"
  },
  {
    id: 12,
    name: "Audífonos inalámbricos de alta fidelidad",
    description: "Audífonos Bluetooth con cancelación de ruido para disfrutar música o podcasts; los audífonos inalámbricos se encuentran entre los regalos más buscados.",
    price: 120000,
    category: "Tecnología",
    gender: "unisex",
    ageRange: "16-55",
    hobby: "música",
    type: "tecnológico",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.amazon.es/Audifonos-Inalambricos-Cancelacion",
    source: "gifts_by_sex.json"
  },
  {
    id: 13,
    name: "Reloj inteligente",
    description: "Dispositivo wearable con seguimiento de actividad, notificaciones y aplicaciones; los relojes inteligentes figuran entre los productos más buscados en Chile.",
    price: 150000,
    category: "Tecnología",
    gender: "unisex",
    ageRange: "16-55",
    hobby: "deportes",
    type: "tecnológico",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.amazon.es/Reloj-Inteligente-Actividad",
    source: "gifts_by_sex.json"
  },

  // Regalos para Niños
  {
    id: 14,
    name: "Set de bloques LEGO",
    description: "Los bloques de construcción LEGO fomentan la creatividad y las habilidades de resolución de problemas; son un favorito eterno entre los niños de todas las edades.",
    price: 45000,
    category: "Juguetes",
    gender: "unisex",
    ageRange: "6-16",
    hobby: "construcción",
    type: "artesanal",
    image: "https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.lego.com/es-es/collections/lego-sets",
    source: "gifts_by_age.json"
  },
  {
    id: 15,
    name: "Nintendo Switch OLED",
    description: "La consola Nintendo Switch OLED cuenta con una pantalla OLED de 7 pulgadas, audio mejorado y base con puerto LAN para disfrutar de juegos en casa o en cualquier lugar.",
    price: 350000,
    category: "Videojuegos",
    gender: "unisex",
    ageRange: "8-18",
    hobby: "videojuegos",
    type: "tecnológico",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.nintendo.es/Nintendo-Switch-OLED",
    source: "gifts_by_age.json"
  },

  // Regalos por Profesión
  {
    id: 16,
    name: "Meta Ray‑Ban Smart Wayfarer",
    description: "Gafas inteligentes que permiten tomar fotos o vídeos, reproducir música directamente en los oídos y traducir textos; ideales para los amantes de la tecnología.",
    price: 280000,
    category: "Tecnología",
    gender: "unisex",
    ageRange: "25-50",
    profession: "ingeniero",
    hobby: "tecnología",
    type: "tecnológico",
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.ray-ban.com",
    source: "gifts_by_profession.json"
  },
  {
    id: 17,
    name: "Moleskine Smart Writing Set",
    description: "Kit de cuaderno y bolígrafo inteligente que digitaliza todo lo que se escribe, ideal para tomar notas o bocetos y organizarlos en la nube.",
    price: 95000,
    category: "Oficina",
    gender: "unisex",
    ageRange: "25-55",
    profession: "profesor",
    hobby: "escritura",
    type: "tecnológico",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.moleskine.com",
    source: "gifts_by_profession.json"
  },

  // Regalos por Hobby
  {
    id: 18,
    name: "Cafetera Moccamaster",
    description: "La cafetera Moccamaster se destaca como uno de los mejores gadgets de cocina; está diseñada para preparar café de alta calidad de forma rápida y precisa.",
    price: 220000,
    category: "Hogar",
    gender: "unisex",
    ageRange: "25-65",
    hobby: "cocina",
    type: "hogar",
    image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://example.com/moccamaster",
    source: "gifts_by_hobby.json"
  },
  {
    id: 19,
    name: "Kit de terrario Bloombox",
    description: "El kit de terrario está elaborado con vidrio reciclado y contiene todo lo necesario para crear un mini jardín de interior.",
    price: 35000,
    category: "Jardinería",
    gender: "unisex",
    ageRange: "20-65",
    hobby: "jardinería",
    type: "artesanal",
    image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://example.com/terrarium",
    source: "gifts_by_hobby.json"
  },

  // Regalos Personalizados 3D
  {
    id: 20,
    name: "Figura 3D Personalizada",
    description: "Figura única impresa en 3D basada en tu foto o diseño personalizado. Perfecta para crear un recuerdo único e inolvidable.",
    price: 35000,
    category: "Personalizado",
    gender: "unisex",
    ageRange: "16-65",
    type: "personalizado",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.sanjigen.cl",
    source: "Sanjigen 3D Printing"
  },
  {
    id: 21,
    name: "Llavero 3D Personalizado",
    description: "Llavero único impreso en 3D con tu diseño, logo o texto personalizado. Material resistente y acabado profesional.",
    price: 12000,
    category: "Personalizado",
    gender: "unisex",
    ageRange: "12-65",
    type: "personalizado",
    image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.sanjigen.cl",
    source: "Sanjigen 3D Printing"
  },
  {
    id: 22,
    name: "Miniatura 3D de Mascota",
    description: "Replica en miniatura de tu mascota favorita, impresa en 3D con gran detalle y precisión. Un regalo emotivo y único.",
    price: 45000,
    category: "Personalizado",
    gender: "unisex",
    ageRange: "16-65",
    type: "personalizado",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.sanjigen.cl",
    source: "Sanjigen 3D Printing"
  },
  {
    id: 23,
    name: "Soporte de Teléfono 3D Personalizado",
    description: "Soporte para teléfono móvil impreso en 3D con tu diseño personalizado. Funcional y único para escritorio o mesa de noche.",
    price: 18000,
    category: "Personalizado",
    gender: "unisex",
    ageRange: "16-65",
    type: "personalizado",
    image: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.sanjigen.cl",
    source: "Sanjigen 3D Printing"
  },
  {
    id: 24,
    name: "Trofeo 3D Personalizado",
    description: "Trofeo único impreso en 3D con texto, logo o diseño personalizado. Perfecto para reconocimientos, eventos deportivos o logros especiales.",
    price: 28000,
    category: "Personalizado",
    gender: "unisex",
    ageRange: "16-65",
    type: "personalizado",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.sanjigen.cl",
    source: "Sanjigen 3D Printing"
  },
  {
    id: 25,
    name: "Joyería 3D Personalizada",
    description: "Piezas de joyería únicas impresas en 3D: anillos, colgantes, pulseras con diseños completamente personalizados.",
    price: 55000,
    category: "Personalizado",
    gender: "unisex",
    ageRange: "18-65",
    type: "personalizado",
    image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.sanjigen.cl",
    source: "Sanjigen 3D Printing"
  }
];

export const categories = [
  "Todos",
  "Tecnología",
  "Deportes",
  "Hogar",
  "Moda",
  "Belleza",
  "Libros",
  "Juguetes",
  "Videojuegos",
  "Oficina",
  "Jardinería",
  "Joyería",
  "Experiencias",
  "Tarjetas Regalo",
  "Personalizado"
];

export const genders = [
  "Todos",
  "masculino",
  "femenino",
  "unisex"
];

export const ageRanges = [
  "Todos",
  "6-16",
  "12-18",
  "16-25",
  "18-35",
  "20-45",
  "25-55",
  "35-65",
  "55+"
];

export const types = [
  "Todos",
  "tecnológico",
  "artesanal",
  "deportivo",
  "hogar",
  "moda",
  "experiencia",
  "personalizado"
];

export const professions = [
  "Todas",
  "diseñador",
  "ejecutivo",
  "profesor",
  "médico",
  "ingeniero",
  "artista",
  "músico",
  "deportista",
  "estilista",
  "creativa"
];

export const hobbies = [
  "Todos",
  "deportes",
  "arte",
  "música",
  "lectura",
  "cocina",
  "jardinería",
  "fotografía",
  "tecnología",
  "belleza",
  "moda",
  "bienestar",
  "videojuegos",
  "construcción",
  "escritura"
];

// Fuentes de datos
export const dataSources = [
  {
    name: "Regalos por Sexo",
    file: "gifts_by_sex.json",
    description: "Datos de regalos categorizados por género"
  },
  {
    name: "Regalos por Edad",
    file: "gifts_by_age.json", 
    description: "Datos de regalos categorizados por grupos de edad"
  },
  {
    name: "Regalos por Profesión",
    file: "gifts_by_profession.json",
    description: "Datos de regalos categorizados por profesión"
  },
  {
    name: "Regalos por Hobby",
    file: "gifts_by_hobby.json",
    description: "Datos de regalos categorizados por hobbies e intereses"
  },
  {
    name: "Impresión 3D Sanjigen",
    file: "sanjigen_3d_printing",
    description: "Regalos personalizados con impresión 3D de www.sanjigen.cl"
  }
];