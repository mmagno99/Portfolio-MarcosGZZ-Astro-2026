import es from '../locales/es/translation.json';
import en from '../locales/en/translation.json';
import pt from '../locales/pt/translation.json';
export const languages = ['es', 'en', 'pt'] as const;
export type Lang = (typeof languages)[number];
const dictionaries = { es, en, pt };
export function translate(lang: Lang, key: string): string {
  const read = (obj: unknown): unknown =>
    key.split('.').reduce((value: any, part) => value?.[part], obj);
  return String(read(dictionaries[lang]) ?? read(es) ?? key);
}
export function localized(lang: Lang, path = '') {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const spanish: Record<string, string> = {
    projects: 'proyectos',
    about: 'acerca-de',
    'privacy-policy': 'politica-de-privacidad',
    'cookie-policy': 'politica-de-cookies',
    terms: 'terminos-y-condiciones',
  };
  const portuguese: Record<string, string> = {
    'privacy-policy': 'politica-de-privacidade',
    'cookie-policy': 'politica-de-cookies',
    terms: 'termos-e-condicoes',
  };
  const translated =
    lang === 'es'
      ? (spanish[clean] ?? clean)
      : lang === 'pt'
        ? (portuguese[clean] ?? clean)
        : clean;
  return `${lang === 'es' ? '' : '/' + lang}/${translated}`;
}
export const copy = {
  es: {
    role: 'DESARROLLADOR WORDPRESS & FRONTEND',
    profileRole: 'WordPress Specialist · Frontend Developer',
    downloadCV: 'Descargar CV',
    homeSEO: 'Marcos González — Desarrollador WordPress & Frontend',
    hero: 'Ideas que cobran',
    accent: 'vida en la web.',
    intro:
      'Soy Marcos González. Combino diseño y código para crear experiencias digitales que se sienten tan bien como funcionan.',
    work: 'Explorar proyectos',
    contact: 'Hablemos',
    selected: 'Una selección de mi trabajo',
    selectedDesc:
      'De una idea a una experiencia real. Diseño, desarrollo y atención a cada detalle.',
    all: 'Ver todos los proyectos',
    craft: 'Buen diseño. Mejor código.',
    craftDesc:
      'Un conjunto de herramientas para construir soluciones completas, desde la primera pantalla hasta lo que sucede detrás.',
    aboutLabel: 'UN POCO SOBRE MÍ',
    aboutTitle: 'Mi trayectoria en desarrollo web.',
    aboutLink: 'Conoce mi trayectoria',
    journal: 'Desarrollo web, explicado desde la práctica.',
    journalDesc:
      'Artículos sobre frontend, backend y crecimiento profesional: conceptos, ejemplos de código y aprendizajes para seguir construyendo.',
    read: 'Leer artículo',
    cta: '¿Tienes una idea en mente?',
    ctaDesc: 'Convirtámosla en una experiencia que merezca un lugar en la web.',
    email: 'Escríbeme',
    details: 'Ver proyecto',
    live: 'Visitar sitio',
    repo: 'Ver código',
    back: 'Volver',
    soon: 'Próximamente',
    personal: 'Exploraciones personales',
    workTitle: 'Proyectos que he llevado a la web.',
    workDesc:
      'Explora mi trabajo en TDI y Balabox, junto con proyectos personales: sitios web, tiendas en línea y aplicaciones.',
    experience: 'Mi trayectoria',
    stack: 'Herramientas & tecnologías',
    blogNote:
      'Artículos sobre desarrollo web, disponibles en español, inglés y portugués.',
    skip: 'Saltar al contenido',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
    language: 'Idioma',
    top: 'Volver arriba',
    previous: 'Anterior',
    next: 'Siguiente',
    collection: 'Colección',
    personalDesc:
      'Proyectos propios para explorar ideas, poner en práctica nuevas tecnologías y seguir aprendiendo.',
    bbxDesc: 'Proyectos desarrollados durante mi etapa en Balabox.',
    tdiDesc:
      'Sitios corporativos, tiendas en línea y aplicaciones desarrollados durante mi etapa en TDI.',
    available: 'Diseño con intención · Código con propósito',
    article: 'ARTÍCULO',
    home: 'Volver al inicio',
    portfolio: 'Portafolio',
    categories: 'Encuentra tu próxima inspiración.',
    noDemo: 'Demo próximamente',
    noRepo: 'Repositorio próximamente',
    quote: 'Cotizar proyecto',
    demoNotice:
      'Ejemplo de demostración. No representa un proyecto real ni un cliente de TDI.',
    aboutDesc:
      'Soy Marcos González, desarrollador web especializado en WordPress y enfocado en Frontend. Conoce mi experiencia, los proyectos en los que he participado y cómo he evolucionado profesionalmente.',
  },
  en: {
    role: 'WORDPRESS & FRONTEND DEVELOPER',
    profileRole: 'WordPress Specialist · Frontend Developer',
    downloadCV: 'Download CV',
    homeSEO: 'Marcos González — WordPress & Frontend Developer',
    hero: 'Ideas brought',
    accent: 'to life on the web.',
    intro:
      'I’m Marcos González. I combine design and code to create digital experiences that feel as good as they work.',
    work: 'Explore projects',
    contact: 'Let’s talk',
    selected: 'A selection of my work',
    selectedDesc:
      'From an idea to a real experience. Design, development, and care for every detail.',
    all: 'View all projects',
    craft: 'Good design. Better code.',
    craftDesc:
      'A toolkit for building complete solutions, from the first screen to everything behind it.',
    aboutLabel: 'A LITTLE ABOUT ME',
    aboutTitle: 'My journey in web development.',
    aboutLink: 'Discover my journey',
    journal: 'Web development, through practical experience.',
    journalDesc:
      'Articles on frontend, backend and professional growth: concepts, code examples and lessons to help you keep building.',
    read: 'Read article',
    cta: 'Have an idea in mind?',
    ctaDesc:
      'Let’s turn it into an experience that deserves a place on the web.',
    email: 'Email me',
    details: 'View project',
    live: 'Visit website',
    repo: 'View code',
    back: 'Go back',
    soon: 'Coming soon',
    personal: 'Personal explorations',
    workTitle: 'Projects I have brought to the web.',
    workDesc:
      'Explore my work at TDI and Balabox alongside personal projects: websites, online stores and applications.',
    experience: 'My journey',
    stack: 'Tools & technologies',
    blogNote:
      'Web development articles, available in Spanish, English and Portuguese.',
    skip: 'Skip to content',
    menu: 'Open menu',
    close: 'Close menu',
    language: 'Language',
    top: 'Back to top',
    previous: 'Previous',
    next: 'Next',
    collection: 'Collection',
    personalDesc:
      'Personal projects to explore ideas, put new technologies into practice and keep learning.',
    bbxDesc: 'Projects developed during my time at Balabox.',
    tdiDesc:
      'Corporate websites, online stores and applications developed during my time at TDI.',
    available: 'Intentional design · Purposeful code',
    article: 'ARTICLE',
    home: 'Back to home',
    portfolio: 'Portfolio',
    categories: 'Find your next inspiration.',
    noDemo: 'Demo coming soon',
    noRepo: 'Repository coming soon',
    quote: 'Get a quote',
    demoNotice:
      'Demonstration example. This does not represent a real TDI project or client.',
    aboutDesc:
      'I’m Marcos González, a web developer specializing in WordPress with a focus on Frontend. Discover my experience, the projects I have contributed to and how I have grown professionally.',
  },
  pt: {
    role: 'DESENVOLVEDOR WORDPRESS & FRONTEND',
    profileRole: 'Especialista em WordPress · Desenvolvedor Frontend',
    downloadCV: 'Baixar CV',
    homeSEO: 'Marcos González — Desenvolvedor WordPress & Frontend',
    hero: 'Ideias que ganham',
    accent: 'vida na web.',
    intro:
      'Sou Marcos González. Combino design e código para criar experiências digitais tão agradáveis quanto funcionais.',
    work: 'Explorar projetos',
    contact: 'Vamos conversar',
    selected: 'Uma seleção do meu trabalho',
    selectedDesc:
      'De uma ideia a uma experiência real. Design, desenvolvimento e atenção a cada detalhe.',
    all: 'Ver todos os projetos',
    craft: 'Bom design. Código melhor.',
    craftDesc:
      'Ferramentas para construir soluções completas, da primeira tela a tudo o que acontece por trás.',
    aboutLabel: 'UM POUCO SOBRE MIM',
    aboutTitle: 'Minha trajetória no desenvolvimento web.',
    aboutLink: 'Conheça minha trajetória',
    journal: 'Desenvolvimento web na prática.',
    journalDesc:
      'Artigos sobre frontend, backend e crescimento profissional: conceitos, exemplos de código e aprendizados para continuar construindo.',
    read: 'Ler artigo',
    cta: 'Tem uma ideia em mente?',
    ctaDesc:
      'Vamos transformá-la em uma experiência que merece um lugar na web.',
    email: 'Escreva para mim',
    details: 'Ver projeto',
    live: 'Visitar site',
    repo: 'Ver código',
    back: 'Voltar',
    soon: 'Em breve',
    personal: 'Explorações pessoais',
    workTitle: 'Projetos que levei para a web.',
    workDesc:
      'Explore meu trabalho na TDI e na Balabox, além de projetos pessoais: sites, lojas virtuais e aplicações.',
    experience: 'Minha trajetória',
    stack: 'Ferramentas & tecnologias',
    blogNote:
      'Artigos sobre desenvolvimento web, disponíveis em espanhol, inglês e português.',
    skip: 'Pular para o conteúdo',
    menu: 'Abrir menu',
    close: 'Fechar menu',
    language: 'Idioma',
    top: 'Voltar ao topo',
    previous: 'Anterior',
    next: 'Próximo',
    collection: 'Coleção',
    personalDesc:
      'Projetos próprios para explorar ideias, colocar novas tecnologias em prática e continuar aprendendo.',
    bbxDesc: 'Projetos desenvolvidos durante minha passagem pela Balabox.',
    tdiDesc:
      'Sites corporativos, lojas virtuais e aplicações desenvolvidos durante minha passagem pela TDI.',
    available: 'Design com intenção · Código com propósito',
    article: 'ARTIGO',
    home: 'Voltar ao início',
    portfolio: 'Portfólio',
    categories: 'Encontre sua próxima inspiração.',
    noDemo: 'Demo em breve',
    noRepo: 'Repositório em breve',
    quote: 'Solicitar orçamento',
    demoNotice:
      'Exemplo de demonstração. Não representa um projeto real nem um cliente da TDI.',
    aboutDesc:
      'Sou Marcos González, desenvolvedor web especializado em WordPress e focado em Frontend. Conheça minha experiência, os projetos dos quais participei e como evoluí profissionalmente.',
  },
};
