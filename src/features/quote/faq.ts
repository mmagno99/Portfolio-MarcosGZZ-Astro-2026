import type { Lang } from '../../lib/i18n';
interface FAQ {
  title: string;
  description: string;
  items: { question: string; answer: string }[];
}
export const quoteFAQ: Record<Lang, FAQ> = {
  es: {
    title: 'Preguntas frecuentes',
    description:
      'Si aún tienes preguntas, no dudes en escribirme para una comunicación más personalizada.',
    items: [
      {
        question: 'Tiempos de entrega',
        answer:
          'Aproximadamente 4 semanas, pero esto puede variar dependiendo del tamaño del proyecto y del tiempo de respuesta del cliente.',
      },
      {
        question: 'Costos de mantenimiento',
        answer:
          'El costo mensual para el hospedaje de tu sitio web va de $200 a $700 MXN, dependiendo del tamaño del sitio y de los requerimientos del proyecto.',
      },
      {
        question: 'Distribución de pagos',
        answer:
          'Se solicita un pago del 50% al inicio del proyecto y el otro 50% al entregar y publicar el sitio.',
      },
    ],
  },
  en: {
    title: 'Frequently asked questions',
    description:
      'If you still have questions, feel free to contact me for a more personal conversation.',
    items: [
      {
        question: 'Delivery times',
        answer:
          'Approximately 4 weeks, although this may vary depending on the size of the project and how quickly the client responds.',
      },
      {
        question: 'Maintenance costs',
        answer:
          'Monthly website hosting costs range from $200 to $700 MXN, depending on the size of the website and the project requirements.',
      },
      {
        question: 'Payment schedule',
        answer:
          'A 50% payment is requested at the start of the project, with the remaining 50% due when the website is delivered and published.',
      },
    ],
  },
  pt: {
    title: 'Perguntas frequentes',
    description:
      'Se ainda tiver dúvidas, entre em contato comigo para uma conversa mais personalizada.',
    items: [
      {
        question: 'Prazos de entrega',
        answer:
          'Aproximadamente 4 semanas, mas o prazo pode variar conforme o tamanho do projeto e o tempo de resposta do cliente.',
      },
      {
        question: 'Custos de manutenção',
        answer:
          'O custo mensal de hospedagem do site varia de $200 a $700 MXN, dependendo do tamanho do site e dos requisitos do projeto.',
      },
      {
        question: 'Distribuição dos pagamentos',
        answer:
          'É solicitado um pagamento de 50% no início do projeto e os outros 50% na entrega e publicação do site.',
      },
    ],
  },
};
