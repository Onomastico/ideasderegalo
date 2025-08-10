import giftsByHobby from './hobbies_por_grupo_urls_with_links.json';
import giftsByProfession from './regalos_profesiones_500_with_links.json';

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
  group?: string;
}

// Helper function to format price from different sources
function formatPrice(priceStr: string | number): number {
  if (typeof priceStr === 'number') return priceStr;
  if (typeof priceStr === 'string') {
    const lowerPrice = priceStr.toLowerCase();
    if (lowerPrice.includes('bajo')) return 15000;
    if (lowerPrice.includes('medio')) return 35000;
    if (lowerPrice.includes('alto')) return 75000;
    
    // Try to extract number from string
    const cleanPrice = priceStr.replace(/[^\d]/g, '');
    return parseInt(cleanPrice) || 25000;
  }
  return 25000;
}

// Helper function to determine category from Spanish text
function mapCategory(categoryText: string, hobby?: string): string {
  const categoryMap: { [key: string]: string } = {
    // From hobby categories
    'pesca': 'Deportes',
    'ciclismo': 'Deportes', 
    'gimnasio': 'Deportes',
    'senderismo': 'Deportes',
    'deportes': 'Deportes',
    'videojuegos': 'Videojuegos',
    'fotografía': 'Tecnología',
    'fotografia': 'Tecnología',
    'cocina': 'Hogar',
    'carpintería': 'Herramientas',
    'carpinteria': 'Herramientas',
    'automodelismo': 'Juguetes',
    'yoga': 'Deportes',
    'pilates': 'Deportes',
    'manualidades': 'Manualidades',
    'jardinería': 'Jardinería',
    'jardineria': 'Jardinería',
    'lectura': 'Libros',
    'repostería': 'Hogar',
    'reposteria': 'Hogar',
    'pintura': 'Arte',
    'dibujo': 'Arte',
    'baile': 'Entretenimiento',
    'viajar': 'Viajes',
    'música': 'Música',
    'musica': 'Música',
    'juegos': 'Juguetes',
    'voluntariado': 'Experiencias',
    'construcción': 'Juguetes',
    'construccion': 'Juguetes',
    'patinaje': 'Deportes',
    'programación': 'Tecnología',
    'programacion': 'Tecnología',
    'astronomía': 'Ciencia',
    'astronomia': 'Ciencia',
    'mascotas': 'Mascotas',
    'educación': 'Educación',
    'educacion': 'Educación',
    'belleza': 'Belleza',
    'moda': 'Moda',
    'bienestar': 'Bienestar',
    'decoración': 'Hogar',
    'decoracion': 'Hogar',
    'vintage': 'Coleccionables',
    'retro': 'Coleccionables',
    'cine': 'Entretenimiento',
    'series': 'Entretenimiento',
    'coleccionismo': 'Coleccionables',
    'modelismo': 'Juguetes',
    'crianza': 'Familia',
    'tcg': 'Juegos',
    'escritura': 'Libros',
    'figuras': 'Coleccionables',
    'k-pop': 'Música',
    'kpop': 'Música'
  };

  const searchText = (categoryText + ' ' + (hobby || '')).toLowerCase();
  
  for (const [key, value] of Object.entries(categoryMap)) {
    if (searchText.includes(key)) {
      return value;
    }
  }
  
  return 'Otros';
}

// Helper function to determine type from category and description
function mapType(category: string, description: string, hobby?: string): Gift['type'] {
  const desc = description.toLowerCase();
  const cat = category.toLowerCase();
  const hobbyText = (hobby || '').toLowerCase();
  
  if (desc.includes('personalizado') || desc.includes('3d')) return 'personalizado';
  if (cat.includes('tecnología') || desc.includes('bluetooth') || desc.includes('digital') || hobbyText.includes('programación')) return 'tecnológico';
  if (cat.includes('deportes') || desc.includes('ejercicio') || desc.includes('fitness') || hobbyText.includes('gimnasio')) return 'deportivo';
  if (cat.includes('hogar') || desc.includes('casa') || desc.includes('cocina') || hobbyText.includes('cocina')) return 'hogar';
  if (cat.includes('moda') || cat.includes('belleza') || desc.includes('ropa')) return 'moda';
  if (cat.includes('experiencia') || desc.includes('experiencia') || desc.includes('spa') || hobbyText.includes('voluntariado')) return 'experiencia';
  
  return 'artesanal';
}

// Helper function to map gender from group
function mapGender(group: string): Gift['gender'] {
  const lower = group.toLowerCase();
  if (lower.includes('hombre') || lower === 'hombres') return 'masculino';
  if (lower.includes('mujer') || lower === 'mujeres') return 'femenino';
  return 'unisex';
}

// Helper function to map age range from group
function mapAgeRange(group: string): string {
  const lower = group.toLowerCase();
  if (lower.includes('niño') || lower.includes('niños')) return '6-16';
  if (lower.includes('adolescent')) return '12-18';
  if (lower.includes('adultos mayores')) return '55+';
  if (lower.includes('adultos')) return '25-55';
  return '18-65';
}

// Convert gifts from different JSON sources
let giftId = 1;
const allGifts: Gift[] = [];

// Helper function to generate appropriate gift name based on category and group
function generateGiftName(hobby: string, group: string, originalName: string): string {
  if (originalName && originalName !== 'Regalo sin nombre') {
    return originalName;
  }
  
  const giftMap: { [key: string]: { [key: string]: string } } = {
    'Pesca deportiva': {
      'Hombres': 'Caña de pescar telescópica',
      'default': 'Kit de pesca completo'
    },
    'Ciclismo': {
      'Hombres': 'Casco de ciclismo profesional',
      'Mujeres': 'Botella térmica deportiva',
      'Niños': 'Casco infantil colorido',
      'default': 'Accesorios para bicicleta'
    },
    'Gimnasio': {
      'Hombres': 'Mancuernas ajustables',
      'Mujeres': 'Esterilla de yoga premium',
      'default': 'Kit de ejercicio en casa'
    },
    'Videojuegos': {
      'Hombres': 'Auriculares gaming RGB',
      'Adolescentes': 'Mando inalámbrico pro',
      'Niños': 'Juego educativo interactivo',
      'default': 'Accesorios gaming'
    },
    'Senderismo': {
      'Hombres': 'Bastones de trekking',
      'Mujeres': 'Mochila de senderismo',
      'Mixtos': 'Brújula profesional',
      'default': 'Equipo de montaña'
    },
    'Fotografía': {
      'Hombres': 'Trípode profesional',
      'Mujeres': 'Ring light portátil',
      'Adolescentes': 'Lentes para smartphone',
      'default': 'Accesorios de fotografía'
    },
    'Cocina gourmet': {
      'Hombres': 'Set de cuchillos chef',
      'Mujeres': 'Batidora de mano premium',
      'default': 'Utensilios de cocina'
    },
    'Carpintería': {
      'Hombres': 'Taladro inalámbrico',
      'default': 'Kit de herramientas básico'
    },
    'Automodelismo': {
      'Hombres': 'Maqueta de auto clásico',
      'Niños': 'Kit de construcción LEGO',
      'default': 'Modelo para armar'
    },
    'Deportes de equipo': {
      'Hombres': 'Balón de fútbol profesional',
      'Niños': 'Pelota multicolor',
      'default': 'Equipamiento deportivo'
    },
    'Yoga y pilates': {
      'Mujeres': 'Set completo de yoga',
      'default': 'Accesorios de bienestar'
    },
    'Manualidades': {
      'Mujeres': 'Kit de scrapbooking',
      'Niños': 'Set de manualidades creativas',
      'default': 'Materiales para crear'
    },
    'Jardinería': {
      'Mujeres': 'Set de herramientas de jardín',
      'Mixtos': 'Kit de plantas aromáticas',
      'Niños': 'Mi primer huerto',
      'default': 'Accesorios de jardinería'
    },
    'Lectura': {
      'Mujeres': 'Lámpara de lectura LED',
      'Niños': 'Colección de cuentos',
      'Adolescentes': 'E-reader básico',
      'default': 'Accesorios para lectura'
    },
    'Repostería': {
      'Mujeres': 'Set de moldes creativos',
      'default': 'Utensilios de repostería'
    },
    'Pintura/dibujo': {
      'Mujeres': 'Set de acuarelas profesional',
      'Niños': 'Kit de pintura infantil',
      'default': 'Materiales de arte'
    },
    'Baile': {
      'Mujeres': 'Zapatillas de baile',
      'Adolescentes': 'Ropa de danza moderna',
      'default': 'Accesorios de baile'
    },
    'Viajar': {
      'Mujeres': 'Organizador de viaje',
      'Mixtos': 'Almohada cervical',
      'Adultos': 'Maleta inteligente',
      'default': 'Accesorios de viaje'
    },
    'Música básica': {
      'Niños': 'Xilófono colorido',
      'default': 'Instrumento musical'
    },
    'Deportes': {
      'Niños': 'Set deportivo infantil',
      'Para Todos': 'Botella deportiva',
      'default': 'Equipamiento deportivo'
    },
    'Juegos de mesa': {
      'Niños': 'Juego educativo',
      'Adolescentes': 'Juego de estrategia',
      'Para Todos': 'Juego familiar',
      'default': 'Juego de mesa clásico'
    }
  };
  
  const hobbyGifts = giftMap[hobby];
  if (hobbyGifts) {
    return hobbyGifts[group] || hobbyGifts['default'] || `Regalo para ${hobby}`;
  }
  
  return `Regalo para ${hobby}`;
}

// Helper function to get appropriate image for hobby/category
function getImageForHobby(hobby: string, group: string): string {
  const imageMap: { [key: string]: string } = {
    'Pesca deportiva': 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Ciclismo': 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Gimnasio': 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Videojuegos': 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Senderismo': 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Fotografía': 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Cocina gourmet': 'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Carpintería': 'https://images.pexels.com/photos/162553/tools-hand-tools-work-bench-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Automodelismo': 'https://images.pexels.com/photos/35619/capri-ford-oldtimer-automotive.jpg?auto=compress&cs=tinysrgb&w=400',
    'Deportes de equipo': 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Yoga y pilates': 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Manualidades': 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Jardinería': 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Lectura': 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Repostería': 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Pintura/dibujo': 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Baile': 'https://images.pexels.com/photos/1701194/pexels-photo-1701194.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Viajar': 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Música básica': 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Deportes': 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Juegos de mesa': 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Creación de contenido': 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Lectura juvenil': 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Programación': 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Gastronomía': 'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Yoga/meditación': 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Jardinería avanzada': 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Pintura/artes': 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Montañismo': 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Caminatas suaves': 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Cocina tradicional': 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Pintura/cerámica': 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Canto/coral': 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Clubes sociales': 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Arte': 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Construcción': 'https://images.pexels.com/photos/162553/tools-hand-tools-work-bench-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Escritura': 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
    'TCG': 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Coleccionismo': 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Figuras de acción': 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Modelismo': 'https://images.pexels.com/photos/35619/capri-ford-oldtimer-automotive.jpg?auto=compress&cs=tinysrgb&w=400',
    'Astronomía': 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400',
    'Crianza Responsable': 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Mascotas': 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Educación': 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400',
    'K-pop': 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Cine': 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Series': 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Decoración': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Vintage/Retro': 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Belleza': 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Moda': 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Bienestar': 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Tecnología': 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Deportes acuáticos': 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400'
  };
  
  const hobbyGifts = imageMap[hobby];
  if (hobbyGifts) {
    return hobbyGifts;
  }
  
  return 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=400';
}

// Process gifts by hobby (hobbies_por_grupo_urls_with_links.json)
giftsByHobby.forEach((gift: any) => {
  const giftName = generateGiftName(gift.Hobby, gift.Grupo, gift['Regalo recomendado']);
  const giftImage = gift.URL_Imagen && gift.URL_Imagen !== 'placeholder_light_gray_block.png' 
    ? gift.URL_Imagen 
    : getImageForHobby(gift.Hobby, gift.Grupo);
    
  const mappedGift: Gift = {
    id: giftId++,
    name: giftName,
    description: `${giftName} - Perfecto para personas que disfrutan de ${gift.Hobby}. Precio estimado: ${gift['Precio estimado']}.`,
    price: formatPrice(gift['Precio estimado']),
    category: mapCategory(gift.Hobby, gift.Hobby),
    gender: mapGender(gift.Grupo),
    ageRange: mapAgeRange(gift.Grupo),
    hobby: gift.Hobby,
    type: mapType(gift.Hobby, gift['Regalo recomendado'], gift.Hobby),
    image: giftImage,
    link: gift.purchase_url,
    source: 'hobbies_por_grupo_urls_with_links.json',
    group: gift.Grupo
  };
  allGifts.push(mappedGift);
});

// Process gifts by profession (regalos_profesiones_500_with_links.json)
giftsByProfession.forEach((gift: any) => {
  const giftName = gift.Producto || gift.producto || gift['Regalo recomendado'] || 'Regalo profesional';
  const giftImage = gift.URL_Imagen && gift.URL_Imagen !== 'placeholder_light_gray_block.png'
    ? gift.URL_Imagen
    : getProfessionImage(gift.Profesión || gift.profesion);
    
  const mappedGift: Gift = {
    id: giftId++,
    name: giftName,
    description: gift.Descripción || gift.descripcion || gift.Descripcion || `Regalo ideal para ${gift.Profesión || gift.profesion}`,
    price: formatPrice(gift.Precio || gift.precio || gift['Precio estimado'] || 'medio'),
    category: mapCategory(gift.Categoría || gift.categoria || gift.Categoria || '', gift.Profesión),
    gender: 'unisex',
    ageRange: '25-55',
    profession: gift.Profesión || gift.profesion,
    type: mapType(gift.Categoría || gift.categoria || '', gift.Descripción || gift.descripcion || '', gift.Profesión),
    image: giftImage,
    link: gift.URL_Amazon || gift.url_amazon || gift.amazon_url || gift.purchase_url,
    source: 'regalos_profesiones_500_with_links.json'
  };
  allGifts.push(mappedGift);
});

// Helper function to get profession-specific images
function getProfessionImage(profession: string): string {
  const professionImageMap: { [key: string]: string } = {
    'Médico': 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Enfermero/a': 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Profesor/a de educación básica': 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Profesor/a de educación media': 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Ingeniero/a en informática': 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Desarrollador/a web': 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Diseñador/a gráfico/a': 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Psicólogo/a': 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Abogado/a': 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Contador/a': 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Administrador/a de empresas': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Chef': 'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Cocinero/a': 'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Fotógrafo/a': 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Community manager': 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Periodista': 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Actor/actriz': 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Cantante': 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Músico/a': 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Arquitecto/a': 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Constructor/a civil': 'https://images.pexels.com/photos/162553/tools-hand-tools-work-bench-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Maestro/a de obras': 'https://images.pexels.com/photos/162553/tools-hand-tools-work-bench-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Técnico/a en electricidad': 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Mecánico/a automotriz': 'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Vendedor/a': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Cajero/a': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Guardia de seguridad': 'https://images.pexels.com/photos/8112199/pexels-photo-8112199.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Repartidor/a': 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Chofer profesional': 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Piloto/a': 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Auxiliar de vuelo': 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Guía turístico/a': 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Recepcionista': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Terapeuta ocupacional': 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Kinesiólogo/a': 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Entrenador/a personal': 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Nutricionista': 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Científico/a': 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Investigador/a de datos': 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Técnico/a en laboratorio': 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Veterinario/a': 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Peluquero/a': 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Estilista': 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Maquillador/a profesional': 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Carpintero/a': 'https://images.pexels.com/photos/162553/tools-hand-tools-work-bench-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Albañil': 'https://images.pexels.com/photos/162553/tools-hand-tools-work-bench-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Jardinero/a': 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Agricultor/a': 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Ingeniero/a civil': 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Diseñador/a de modas': 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400'
  };
  
  return professionImageMap[profession] || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400';
}
// Add some personalized 3D gifts from Sanjigen
const personalizedGifts: Gift[] = [
  {
    id: giftId++,
    name: "Figura 3D Personalizada",
    description: "Figura única impresa en 3D basada en tu foto o diseño personalizado. Perfecta para crear un recuerdo único e inolvidable.",
    price: 35000,
    category: "Personalizado",
    gender: "unisex",
    ageRange: "16-65",
    type: "personalizado",
    image: "https://res.cloudinary.com/dsvtg3khr/image/upload/v1751943463/Imagen_de_WhatsApp_2025-07-03_a_las_12.13.38_74fed3e7_w27chn.jpg",
    link: "https://www.sanjigen.cl",
    source: "Sanjigen 3D Printing"
  },
  {
    id: giftId++,
    name: "Llavero 3D Personalizado",
    description: "Llavero único impreso en 3D con tu diseño, logo o texto personalizado. Material resistente y acabado profesional.",
    price: 2000,
    category: "Personalizado",
    gender: "unisex",
    ageRange: "12-65",
    type: "personalizado",
    image: "https://res.cloudinary.com/dsvtg3khr/image/upload/v1751244831/IMG_20250625_200904_odprgp.jpg",
    link: "https://www.sanjigen.cl",
    source: "Sanjigen 3D Printing"
  },
  {
    id: giftId++,
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
    id: giftId++,
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
    id: giftId++,
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
    id: giftId++,
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

allGifts.push(...personalizedGifts);

export const gifts = allGifts;

// Extract unique categories from the data
export const categories = [
  "Todos",
  ...Array.from(new Set(allGifts.map(gift => gift.category))).sort()
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

// Extract unique professions from the data
export const professions = [
  "Todas",
  ...Array.from(new Set(allGifts.filter(gift => gift.profession).map(gift => gift.profession!))).sort()
];

// Extract unique hobbies from the data
export const hobbies = [
  "Todos",
  ...Array.from(new Set(allGifts.filter(gift => gift.hobby).map(gift => gift.hobby!))).sort()
];

// Extract unique groups from the data
export const groups = [
  "Todos",
  ...Array.from(new Set(allGifts.filter(gift => gift.group).map(gift => gift.group!))).sort()
];

// Data sources information
export const dataSources = [
  {
    name: "Regalos por Hobby",
    file: "hobbies_por_grupo_urls_with_links.json",
    description: "Datos de regalos categorizados por hobbies y grupos demográficos",
    count: giftsByHobby.length
  },
  {
    name: "Regalos por Profesión", 
    file: "regalos_profesiones_500_with_links.json",
    description: "Datos de regalos categorizados por profesión",
    count: giftsByProfession.length
  },
  {
    name: "Impresión 3D Sanjigen",
    file: "sanjigen_3d_printing",
    description: "Regalos personalizados con impresión 3D de www.sanjigen.cl",
    count: personalizedGifts.length
  }
];

console.log(`✅ Loaded ${allGifts.length} gifts from ${dataSources.length} sources`);
console.log(`📊 Categories: ${categories.length - 1} unique categories`);
console.log(`👥 Professions: ${professions.length - 1} unique professions`);
console.log(`🎯 Hobbies: ${hobbies.length - 1} unique hobbies`);