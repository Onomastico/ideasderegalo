import giftsById from './gifts_by_sex.json';
import giftsByAge from './gifts_by_age.json';
import giftsByProfession from './gifts_by_profession.json';
import giftsByHobby from './gifts_by_hobby.json';

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

// Helper function to format price from different sources
function formatPrice(priceStr: string | number): number {
  if (typeof priceStr === 'number') return priceStr;
  if (typeof priceStr === 'string') {
    // Remove currency symbols and convert to number
    const cleanPrice = priceStr.replace(/[^\d]/g, '');
    return parseInt(cleanPrice) || 25000; // Default price if parsing fails
  }
  return 25000;
}

// Helper function to determine category from Spanish text
function mapCategory(categoryText: string): string {
  const categoryMap: { [key: string]: string } = {
    'libro': 'Libros',
    'deporte': 'Deportes', 
    'tecnología': 'Tecnología',
    'tecnologia': 'Tecnología',
    'belleza': 'Belleza',
    'audio': 'Tecnología',
    'hogar': 'Hogar',
    'joyería': 'Joyería',
    'joyeria': 'Joyería',
    'experiencia': 'Experiencias',
    'tarjeta': 'Tarjetas Regalo',
    'juguete': 'Juguetes',
    'consola': 'Videojuegos',
    'educativo': 'Juguetes',
    'tableta': 'Tecnología',
    'manualidades': 'Juguetes',
    'eco-friendly': 'Hogar',
    'gadget': 'Tecnología',
    'moda': 'Moda',
    'accesorios': 'Moda'
  };

  const lowerCategory = categoryText.toLowerCase();
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lowerCategory.includes(key)) {
      return value;
    }
  }
  return 'Otros';
}

// Helper function to determine type from category and description
function mapType(category: string, description: string): Gift['type'] {
  const desc = description.toLowerCase();
  const cat = category.toLowerCase();
  
  if (desc.includes('personalizado') || desc.includes('3d')) return 'personalizado';
  if (cat.includes('tecnología') || desc.includes('bluetooth') || desc.includes('digital')) return 'tecnológico';
  if (cat.includes('deportes') || desc.includes('ejercicio') || desc.includes('fitness')) return 'deportivo';
  if (cat.includes('hogar') || desc.includes('casa') || desc.includes('cocina')) return 'hogar';
  if (cat.includes('moda') || cat.includes('belleza') || desc.includes('ropa')) return 'moda';
  if (cat.includes('experiencia') || desc.includes('experiencia') || desc.includes('spa')) return 'experiencia';
  
  return 'artesanal';
}

// Helper function to map gender
function mapGender(genderText: string): Gift['gender'] {
  const lower = genderText.toLowerCase();
  if (lower.includes('hombre') || lower === 'male' || lower === 'masculino') return 'masculino';
  if (lower.includes('mujer') || lower === 'female' || lower === 'femenino') return 'femenino';
  return 'unisex';
}

// Convert gifts from different JSON sources
let giftId = 1;
const allGifts: Gift[] = [];

// Process gifts by sex
Object.entries(giftsById).forEach(([gender, giftList]) => {
  giftList.forEach((gift: any) => {
    const mappedGift: Gift = {
      id: giftId++,
      name: gift.nombre || gift.name || 'Regalo sin nombre',
      description: gift.descripcion || gift.description || 'Descripción no disponible',
      price: formatPrice(gift.precio || gift.price || '25000'),
      category: mapCategory(gift.categorias?.otros || gift.category || 'Otros'),
      gender: mapGender(gender),
      ageRange: '18-65',
      type: mapType(gift.categorias?.otros || '', gift.descripcion || gift.description || ''),
      image: gift.foto || gift.image || 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: gift.enlace || gift.link,
      source: 'gifts_by_sex.json'
    };
    allGifts.push(mappedGift);
  });
});

// Process gifts by age
Object.entries(giftsByAge).forEach(([ageGroup, giftList]) => {
  giftList.forEach((gift: any) => {
    const ageRangeMap: { [key: string]: string } = {
      'kids': '6-16',
      'teens': '12-18', 
      'adults': '25-55',
      'seniors': '55+'
    };

    const mappedGift: Gift = {
      id: giftId++,
      name: gift.nombre || gift.name || 'Regalo sin nombre',
      description: gift.descripcion || gift.description || 'Descripción no disponible',
      price: formatPrice(gift.precio || gift.price || '35000'),
      category: mapCategory(gift.categorias?.otros || gift.category || 'Otros'),
      gender: mapGender(gift.categorias?.sexo || 'unisex'),
      ageRange: ageRangeMap[ageGroup] || '18-65',
      type: mapType(gift.categorias?.otros || '', gift.descripcion || gift.description || ''),
      image: gift.foto || gift.image || 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: gift.enlace || gift.link,
      source: 'gifts_by_age.json'
    };
    allGifts.push(mappedGift);
  });
});

// Process gifts by profession
Object.entries(giftsByProfession).forEach(([profession, giftList]) => {
  giftList.forEach((gift: any) => {
    const mappedGift: Gift = {
      id: giftId++,
      name: gift.name || 'Regalo sin nombre',
      description: gift.description || 'Descripción no disponible',
      price: formatPrice(gift.price || '45000'),
      category: mapCategory(gift.categories?.hobby?.[0] || 'Otros'),
      gender: mapGender(gift.categories?.sex?.[0] || 'unisex'),
      ageRange: '25-55',
      profession: profession,
      type: mapType(gift.categories?.hobby?.[0] || '', gift.description || ''),
      image: gift.image || 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: gift.link,
      source: 'gifts_by_profession.json'
    };
    allGifts.push(mappedGift);
  });
});

// Process gifts by hobby
Object.entries(giftsByHobby).forEach(([hobby, giftList]) => {
  giftList.forEach((gift: any) => {
    const mappedGift: Gift = {
      id: giftId++,
      name: gift.name || 'Regalo sin nombre',
      description: gift.description || 'Descripción no disponible',
      price: formatPrice(gift.price || '40000'),
      category: mapCategory(gift.categories?.hobby?.[0] || 'Otros'),
      gender: mapGender(gift.categories?.sex?.[0] || 'unisex'),
      ageRange: '18-45',
      hobby: hobby,
      type: mapType(gift.categories?.hobby?.[0] || '', gift.description || ''),
      image: gift.image || 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: gift.link,
      source: 'gifts_by_hobby.json'
    };
    allGifts.push(mappedGift);
  });
});

// Add some personalized 3D gifts
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
  "Joyería",
  "Experiencias",
  "Tarjetas Regalo",
  "Personalizado",
  "Otros"
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
  "tech_worker",
  "teacher",
  "healthcare_worker",
  "artist",
  "designer",
  "engineer",
  "chef"
];

export const hobbies = [
  "Todos",
  "cooking",
  "music",
  "sports",
  "gardening",
  "travel",
  "photography",
  "art",
  "fitness",
  "technology",
  "reading"
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