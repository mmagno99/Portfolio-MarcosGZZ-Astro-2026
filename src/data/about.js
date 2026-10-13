// helpers/listAbout.js
const listAbout = {
  profileImage: 'https://ik.imagekit.io/mmagnodev/professional_photo.png', // O la ruta correcta a tu imagen
  name: 'Marcos González',
  descriptionKey: 'about.description',

  jobs: [
    {
      job: 'Desarrollador Web',
      jobKey: 'about.tdi.role',
      company: 'Tierra de ideas',
      dateKey: 'about.tdi.date',
      imagejob: 'https://ik.imagekit.io/mmagnodev/Logo%20TDI.webp',
      descjobKey: 'about.tdi.description',
      recommendationUrl:
        'https://ik.imagekit.io/mmagnodev/Carta_Recomendacion_TDI.pdf',
      recommendationButtonKey: 'about.button.title',
    },
    {
      job: 'Desarrollador Frontend',
      jobKey: 'about.bbx.role',
      company: 'Balabox',
      dateKey: 'about.bbx.date',
      imagejob: 'https://ik.imagekit.io/mmagnodev/balabox.webp',
      descjobKey: 'about.bbx.description',
      recommendationUrl:
        'https://ik.imagekit.io/mmagnodev/CARTA%20DE%20RECOMENDACIO%CC%81N%20Marcos.pdf', // URL de la carta
      recommendationButtonKey: 'about.button.title', // Clave para el texto del botón
    },
    {
      job: 'Maquetador Web - Autonomo',
      jobKey: 'about.sah.role',
      company: 'SAH',
      dateKey: 'about.sah.date',
      imagejob: 'https://ik.imagekit.io/mmagnodev/sah_logo.webp',
      descjobKey: 'about.sah.description',
      recommendationUrl:
        'https://ik.imagekit.io/mmagnodev/CONSTANCIA%20LABORAL%20SISTEMA%20AGUAS%20DE%20HUIXQUILUCAN.pdf', // URL de la carta
      recommendationButtonKey: 'about.button.title', // Clave para el texto del botón
    },
  ],
};

export default listAbout;
