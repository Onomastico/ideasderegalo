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

// Process gifts by hobby (hobbies_por_grupo_urls_with_links.json)
giftsByHobby.forEach((gift: any) => {
  const mappedGift: Gift = {
    id: giftId++,
    name: gift['Regalo recomendado'] || 'Regalo sin nombre',
    description: `${gift['Regalo recomendado']} - Perfecto para personas que disfrutan de ${gift.Hobby}. Precio estimado: ${gift['Precio estimado']}.`,
    price: formatPrice(gift['Precio estimado']),
    category: mapCategory(gift.Hobby, gift.Hobby),
    gender: mapGender(gift.Grupo),
    ageRange: mapAgeRange(gift.Grupo),
    hobby: gift.Hobby,
    type: mapType(gift.Hobby, gift['Regalo recomendado'], gift.Hobby),
    image: gift.URL_Imagen || 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: gift.purchase_url,
    source: 'hobbies_por_grupo_urls_with_links.json',
    group: gift.Grupo
  };
  allGifts.push(mappedGift);
});

// Process gifts by profession (regalos_profesiones_500_with_links.json)
giftsByProfession.forEach((gift: any) => {
  const mappedGift: Gift = {
    id: giftId++,
    name: gift.Producto || gift.producto || 'Regalo sin nombre',
    description: gift.Descripción || gift.descripcion || gift.Descripcion || `Regalo ideal para ${gift.Profesión || gift.profesion}`,
    price: formatPrice(gift.Precio || gift.precio || gift['Precio estimado'] || 'medio'),
    category: mapCategory(gift.Categoría || gift.categoria || gift.Categoria || '', gift.Profesión),
    gender: 'unisex',
    ageRange: '25-55',
    profession: gift.Profesión || gift.profesion,
    type: mapType(gift.Categoría || gift.categoria || '', gift.Descripción || gift.descripcion || '', gift.Profesión),
    image: gift.URL_Imagen || gift.url_imagen || gift.imagen || 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: gift.URL_Amazon || gift.url_amazon || gift.amazon_url || gift.purchase_url,
    source: 'regalos_profesiones_500_with_links.json'
  };
  allGifts.push(mappedGift);
});

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
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
    link: "https://www.sanjigen.cl",
    source: "Sanjigen 3D Printing"
  },
  {
    id: giftId++,
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