import type { Lang } from '../../lib/i18n';
export type PolicyKey = 'privacy-policy' | 'cookie-policy' | 'terms';
interface Policy {
  title: string;
  description: string;
  updated: string;
  sections: { title: string; paragraphs: string[] }[];
}
export const policyDate = '2026-10-03';
export const policies: Record<Lang, Record<PolicyKey, Policy>> = {
  es: {
    terms: {
      title: 'Términos y condiciones',
      description:
        'Información sobre el uso del portfolio, las cotizaciones y las condiciones generales de los proyectos de desarrollo web.',
      updated: 'Última actualización',
      sections: [
        {
          title: 'Uso del portfolio',
          paragraphs: [
            'Este sitio, gestionado por Marcos González bajo el nombre Marcos GZZ, presenta proyectos, experiencia, artículos y servicios de desarrollo web. Puedes navegar, consultar el contenido y contactar para comentar un proyecto. El contenido del blog tiene una finalidad informativa.',
          ],
        },
        {
          title: 'Cotizaciones y contratación',
          paragraphs: [
            'El cotizador automático genera una estimación orientativa en pesos mexicanos, válida por 30 días. Descargar el PDF, enviar el formulario o escribir por WhatsApp no realiza un pago ni contrata automáticamente un servicio.',
            'Antes de comenzar se acuerdan por escrito el alcance, los entregables, el precio total con los impuestos aplicables, los plazos y las condiciones particulares. Las solicitudes personalizadas se revisan antes de preparar una propuesta.',
          ],
        },
        {
          title: 'Plazos y colaboración',
          paragraphs: [
            'El plazo orientativo es de aproximadamente 4 semanas. Puede variar según el tamaño del proyecto, la entrega de contenidos y los tiempos de respuesta y aprobación del cliente. El calendario definitivo se acuerda para cada proyecto.',
            'Los cambios de alcance, funciones adicionales y sus efectos en precio o plazos se revisan y acuerdan antes de implementarlos.',
          ],
        },
        {
          title: 'Pagos y mantenimiento',
          paragraphs: [
            'La distribución general de pagos es del 50% al inicio del proyecto y del 50% al entregar y publicar el sitio. Las condiciones concretas quedan recogidas en la propuesta acordada.',
            'El hospedaje mensual va de $200 a $700 MXN según el tamaño del sitio y los requerimientos. El cotizador desglosa sus opciones de mantenimiento e impuestos; otros servicios, licencias o funciones adicionales se detallan en la propuesta.',
            'Si hay una cancelación, se revisan por escrito el trabajo realizado, los costos comprometidos y las condiciones acordadas, respetando los derechos aplicables.',
          ],
        },
        {
          title: 'Contenidos y servicios externos',
          paragraphs: [
            'Los textos, código, marcas e imágenes mostrados pertenecen a sus respectivos titulares. Mostrar un proyecto en el portfolio no transfiere derechos de uso. Los permisos y la entrega de archivos de cada proyecto se acuerdan en su propuesta.',
            'Los enlaces a redes sociales y los botones para compartir artículos abren servicios externos. El visitante decide si envía o publica el contenido, y cada servicio aplica sus propias condiciones.',
          ],
        },
        {
          title: 'Contacto y actualización',
          paragraphs: [
            'Para dudas sobre estas condiciones o una propuesta, escribe a contacto@marcosgzz.tech. Las políticas de privacidad y cookies explican el tratamiento de datos y las tecnologías utilizadas.',
            'Los cambios se publicarán aquí con su fecha de actualización. Una actualización del sitio no modifica por sí sola las condiciones de un proyecto ya acordado.',
          ],
        },
      ],
    },
    'privacy-policy': {
      title: 'Política de privacidad',
      description:
        'Cómo se utilizan tus datos al navegar por el portfolio, solicitar una cotización o contactar por WhatsApp.',
      updated: 'Última actualización',
      sections: [
        {
          title: 'Quién gestiona este sitio',
          paragraphs: [
            'Este portfolio es gestionado por Marcos González, bajo el nombre Marcos GZZ. Para consultas sobre privacidad y tratamiento de datos, puedes escribir a contacto@marcosgzz.tech.',
          ],
        },
        {
          title: 'Datos que compartes y su finalidad',
          paragraphs: [
            'Al solicitar una cotización personalizada, compartes tu nombre, teléfono o WhatsApp, descripción del proyecto y rango de presupuesto. El correo electrónico y la empresa son opcionales. Estos datos se utilizan para revisar tu solicitud, preparar una propuesta y contactar contigo acerca de ese proyecto.',
            'El formulario solicita tu autorización antes del envío. No te inscribe en una lista de publicidad. Evita incluir contraseñas, documentos de identidad, datos de pago u otra información sensible en los campos de texto.',
          ],
        },
        {
          title: 'Cotización instantánea y PDF',
          paragraphs: [
            'La cotización instantánea se calcula en tu navegador. Los datos que introduces para el PDF se incorporan al documento descargado y no se envían al servidor mediante esa modalidad. Las selecciones se mantienen en memoria durante la visita, sin una base de datos de cotizaciones.',
            'Si compartes después ese PDF por correo o WhatsApp, también compartes los datos que contiene.',
          ],
        },
        {
          title: 'Correo, WhatsApp y proveedores',
          paragraphs: [
            'Las solicitudes personalizadas se envían a la dirección de contacto configurada mediante Brevo, que presta el servicio de correo. El destinatario y el proveedor de correo pueden conservar el mensaje para gestionar la consulta.',
            'El botón de WhatsApp abre un servicio externo con un mensaje preparado. La web no envía automáticamente el mensaje: tú decides si lo envías. Si lo haces, se reciben tu mensaje, número y los datos de perfil que WhatsApp permita mostrar. Se utilizan para atender tu consulta; el servicio de WhatsApp se rige también por su propia política de privacidad.',
            'Vercel aloja la web e ImageKit sirve parte de las imágenes. Estos servicios pueden tratar información técnica de las peticiones, como IP, navegador y registros de acceso, para prestar y proteger sus servicios.',
          ],
        },
        {
          title: 'Conservación y seguridad',
          paragraphs: [
            'Los mensajes y datos de contacto se conservarán durante el tiempo necesario para atender la solicitud y, si se contrata un servicio, gestionar la relación y las obligaciones aplicables. No se establece aquí un plazo fijo para todos los casos.',
            'El formulario aplica validación, protección contra envíos automatizados y un límite temporal de solicitudes por IP. Las credenciales de correo se utilizan en el servidor. Estas medidas no sustituyen el cuidado al compartir información por Internet.',
          ],
        },
        {
          title: 'Tus solicitudes de privacidad',
          paragraphs: [
            'Puedes escribir a contacto@marcosgzz.tech para solicitar acceso, rectificación, cancelación u oposición respecto de tus datos, o revocar la autorización para atender futuras comunicaciones. Indica la solicitud y el canal por el que contactaste, sin enviar documentos sensibles en el primer mensaje. Si es necesario, se acordará una forma adecuada de verificar tu identidad.',
            'Las modificaciones de esta política se publicarán en esta página con su fecha de actualización. La política de cookies explica el uso de tecnologías del navegador.',
          ],
        },
      ],
    },
    'cookie-policy': {
      title: 'Política de cookies',
      description:
        'Información sobre cookies, almacenamiento del navegador y servicios externos de este portfolio.',
      updated: 'Última actualización',
      sections: [
        {
          title: 'Qué son las cookies',
          paragraphs: [
            'Las cookies son pequeños archivos que un sitio puede guardar en el navegador. Otras tecnologías, como el almacenamiento local, también permiten conservar información entre visitas.',
          ],
        },
        {
          title: 'Qué utiliza este portfolio',
          paragraphs: [
            'La versión actual no incorpora cookies propias de analítica o publicidad ni scripts de seguimiento de campañas. La etiqueta de verificación de Google Search Console acredita la propiedad del sitio y no instala un sistema de analítica.',
            'El cotizador mantiene las selecciones en memoria del navegador, no en cookies ni en almacenamiento local persistente. El PDF se genera localmente. Los proveedores de infraestructura pueden utilizar mecanismos técnicos de seguridad y generar registros de acceso.',
          ],
        },
        {
          title: 'Servicios y enlaces externos',
          paragraphs: [
            'Parte de las imágenes se carga desde ImageKit. Al solicitar esos archivos, el navegador comunica datos técnicos al proveedor. Los enlaces a GitHub, LinkedIn, Instagram, Facebook, X y WhatsApp llevan a servicios externos, cuyas cookies y políticas dependen de sus respectivos proveedores.',
            'El logo de WhatsApp y los iconos sociales se incluyen en el HTML del sitio. El servicio de WhatsApp se abre al pulsar su enlace.',
          ],
        },
        {
          title: 'Cómo controlar las cookies',
          paragraphs: [
            'Puedes consultar, bloquear o eliminar cookies desde la configuración de tu navegador. Las preferencias pueden afectar a servicios externos que visites. Si se incorporan nuevas tecnologías de seguimiento a este portfolio, esta política deberá actualizarse y su uso se gestionará según corresponda.',
            'Para preguntas sobre esta política, escribe a contacto@marcosgzz.tech. La política de privacidad explica el tratamiento de datos del formulario y de las consultas por WhatsApp.',
          ],
        },
      ],
    },
  },
  en: {
    terms: {
      title: 'Terms and conditions',
      description:
        'Information about using the portfolio, requesting quotes and the general conditions for web development projects.',
      updated: 'Last updated',
      sections: [
        {
          title: 'Using the portfolio',
          paragraphs: [
            'This website, managed by Marcos González under the name Marcos GZZ, presents projects, experience, articles and web development services. You may browse the content and get in touch to discuss a project. Blog content is provided for information.',
          ],
        },
        {
          title: 'Quotes and service agreements',
          paragraphs: [
            'The automatic calculator produces an indicative estimate in Mexican pesos, valid for 30 days. Downloading a PDF, submitting the form or sending a WhatsApp message does not make a payment or automatically book a service.',
            'Before work starts, the scope, deliverables, total price including applicable taxes, schedule and specific conditions are agreed in writing. Custom requests are reviewed before a proposal is prepared.',
          ],
        },
        {
          title: 'Timelines and collaboration',
          paragraphs: [
            'The indicative delivery time is approximately 4 weeks. It may vary with project size, content delivery and client response and approval times. The final schedule is agreed for each project.',
            'Scope changes, additional features and their effect on pricing or delivery times are reviewed and agreed before implementation.',
          ],
        },
        {
          title: 'Payments and maintenance',
          paragraphs: [
            'The general payment schedule is 50% at the start and 50% when the website is delivered and published. Specific conditions are included in the agreed proposal.',
            'Monthly hosting ranges from $200 to $700 MXN depending on website size and requirements. The calculator itemizes maintenance options and taxes; other services, licenses or additional features are specified in the proposal.',
            'If a project is cancelled, completed work, committed costs and agreed conditions are reviewed in writing, respecting applicable rights.',
          ],
        },
        {
          title: 'Content and external services',
          paragraphs: [
            'Displayed text, code, trademarks and images belong to their respective owners. Displaying a project in the portfolio does not transfer usage rights. Permissions and delivery of project files are agreed in the proposal.',
            'Social links and article sharing buttons open external services. Visitors decide whether to send or publish content, and each service applies its own terms.',
          ],
        },
        {
          title: 'Contact and updates',
          paragraphs: [
            'For questions about these terms or a proposal, email contacto@marcosgzz.tech. The privacy and cookie policies explain data processing and the technologies used.',
            'Updates will be published here with their date. Updating this website does not, by itself, change the conditions of an existing project agreement.',
          ],
        },
      ],
    },
    'privacy-policy': {
      title: 'Privacy policy',
      description:
        'How your details are used when visiting the portfolio, requesting a quote or contacting me through WhatsApp.',
      updated: 'Last updated',
      sections: [
        {
          title: 'Who manages this website',
          paragraphs: [
            'This portfolio is managed by Marcos González under the name Marcos GZZ. For questions about privacy and personal data, email contacto@marcosgzz.tech.',
          ],
        },
        {
          title: 'Details you share and their purpose',
          paragraphs: [
            'A custom quote request includes your name, phone or WhatsApp number, project description and budget range. Your email and company are optional. These details are used to review the request, prepare a proposal and contact you about that project.',
            'The form asks for your authorization before submitting. It does not subscribe you to advertising lists. Avoid including passwords, identity documents, payment details or other sensitive information in text fields.',
          ],
        },
        {
          title: 'Instant quotes and PDFs',
          paragraphs: [
            'Instant quotes are calculated in your browser. Details entered for the PDF are included in the downloaded document and are not sent to the server through this option. Selections remain in memory during the visit, without a quote database.',
            'If you later share that PDF by email or WhatsApp, you also share the information it contains.',
          ],
        },
        {
          title: 'Email, WhatsApp and service providers',
          paragraphs: [
            'Custom requests are sent to the configured contact address through Brevo, the email delivery provider. The recipient and email provider may retain the message to manage your inquiry.',
            'The WhatsApp button opens an external service with a prepared message. The website does not send the message automatically: you decide whether to send it. If you do, your message, number and any profile details WhatsApp makes visible are received to handle the inquiry. WhatsApp also operates under its own privacy policy.',
            'Vercel hosts the website and ImageKit serves some images. These providers may process technical request information, such as IP addresses, browser information and access logs, to deliver and protect their services.',
          ],
        },
        {
          title: 'Retention and security',
          paragraphs: [
            'Messages and contact details will be retained for as long as needed to handle the inquiry and, if services are contracted, manage the relationship and applicable obligations. This policy does not specify one fixed retention period for every situation.',
            'The form uses validation, protection against automated submissions and a temporary request limit by IP address. Email credentials are used on the server. These measures do not replace care when sharing information online.',
          ],
        },
        {
          title: 'Your privacy requests',
          paragraphs: [
            'Email contacto@marcosgzz.tech to request access, correction, cancellation or objection regarding your information, or to withdraw authorization for future communications. Describe the request and how you contacted me, without attaching sensitive documents to your first message. If necessary, an appropriate way to verify your identity will be agreed.',
            'Changes to this policy will be published here with an updated date. The cookie policy explains the use of browser technologies.',
          ],
        },
      ],
    },
    'cookie-policy': {
      title: 'Cookie policy',
      description:
        'Information about cookies, browser storage and external services used by this portfolio.',
      updated: 'Last updated',
      sections: [
        {
          title: 'What cookies are',
          paragraphs: [
            'Cookies are small files a website may store in your browser. Other technologies, such as local storage, can also retain information between visits.',
          ],
        },
        {
          title: 'What this portfolio uses',
          paragraphs: [
            'The current version does not include its own analytics or advertising cookies, or campaign tracking scripts. The Google Search Console verification tag verifies ownership and does not install an analytics system.',
            'The calculator keeps selections in browser memory, rather than cookies or persistent local storage. PDFs are generated locally. Infrastructure providers may use technical security mechanisms and generate access logs.',
          ],
        },
        {
          title: 'External services and links',
          paragraphs: [
            'Some images load from ImageKit. When requesting those files, your browser sends technical information to that provider. Links to GitHub, LinkedIn, Instagram, Facebook, X and WhatsApp lead to external services with their own cookie practices and policies.',
            'The WhatsApp logo and social icons are included in the website HTML. WhatsApp opens when you select its link.',
          ],
        },
        {
          title: 'Controlling cookies',
          paragraphs: [
            'You can inspect, block or remove cookies in your browser settings. Your preferences may affect external services you visit. If new tracking technologies are added to this portfolio, this policy must be updated and their use managed as appropriate.',
            'For questions about this policy, email contacto@marcosgzz.tech. The privacy policy explains how form details and WhatsApp inquiries are handled.',
          ],
        },
      ],
    },
  },
  pt: {
    terms: {
      title: 'Termos e condições',
      description:
        'Informações sobre o uso do portfólio, os orçamentos e as condições gerais dos projetos de desenvolvimento web.',
      updated: 'Última atualização',
      sections: [
        {
          title: 'Uso do portfólio',
          paragraphs: [
            'Este site, administrado por Marcos González sob o nome Marcos GZZ, apresenta projetos, experiência, artigos e serviços de desenvolvimento web. Você pode navegar, consultar o conteúdo e entrar em contato para conversar sobre um projeto. O conteúdo do blog tem finalidade informativa.',
          ],
        },
        {
          title: 'Orçamentos e contratação',
          paragraphs: [
            'O calculador automático gera uma estimativa orientativa em pesos mexicanos, válida por 30 dias. Baixar o PDF, enviar o formulário ou escrever pelo WhatsApp não realiza um pagamento nem contrata automaticamente um serviço.',
            'Antes do início, são acordados por escrito o escopo, as entregas, o preço total com os impostos aplicáveis, os prazos e as condições específicas. As solicitações personalizadas são analisadas antes da preparação de uma proposta.',
          ],
        },
        {
          title: 'Prazos e colaboração',
          paragraphs: [
            'O prazo orientativo é de aproximadamente 4 semanas. Pode variar conforme o tamanho do projeto, a entrega de conteúdos e os tempos de resposta e aprovação do cliente. O cronograma definitivo é acordado para cada projeto.',
            'Mudanças de escopo, funções adicionais e seus efeitos sobre preços ou prazos são analisados e acordados antes da implementação.',
          ],
        },
        {
          title: 'Pagamentos e manutenção',
          paragraphs: [
            'A distribuição geral dos pagamentos é de 50% no início e 50% na entrega e publicação do site. As condições específicas constam da proposta acordada.',
            'A hospedagem mensal varia de $200 a $700 MXN conforme o tamanho do site e os requisitos. O calculador detalha opções de manutenção e impostos; outros serviços, licenças ou funções adicionais constam da proposta.',
            'Em caso de cancelamento, o trabalho realizado, os custos comprometidos e as condições acordadas são analisados por escrito, respeitando os direitos aplicáveis.',
          ],
        },
        {
          title: 'Conteúdos e serviços externos',
          paragraphs: [
            'Textos, código, marcas e imagens apresentados pertencem aos respectivos titulares. Exibir um projeto no portfólio não transfere direitos de uso. As permissões e a entrega de arquivos de cada projeto são acordadas na proposta.',
            'Links para redes sociais e botões de compartilhamento dos artigos abrem serviços externos. O visitante decide se envia ou publica o conteúdo, e cada serviço aplica suas próprias condições.',
          ],
        },
        {
          title: 'Contato e atualização',
          paragraphs: [
            'Para dúvidas sobre estas condições ou uma proposta, escreva para contacto@marcosgzz.tech. As políticas de privacidade e cookies explicam o tratamento de dados e as tecnologias utilizadas.',
            'As alterações serão publicadas aqui com sua data. Uma atualização do site não modifica, por si só, as condições de um projeto já acordado.',
          ],
        },
      ],
    },
    'privacy-policy': {
      title: 'Política de privacidade',
      description:
        'Como seus dados são utilizados ao visitar o portfólio, solicitar um orçamento ou entrar em contato pelo WhatsApp.',
      updated: 'Última atualização',
      sections: [
        {
          title: 'Quem administra este site',
          paragraphs: [
            'Este portfólio é administrado por Marcos González, sob o nome Marcos GZZ. Para dúvidas sobre privacidade e dados pessoais, escreva para contacto@marcosgzz.tech.',
          ],
        },
        {
          title: 'Dados compartilhados e sua finalidade',
          paragraphs: [
            'Uma solicitação de orçamento personalizado inclui nome, telefone ou WhatsApp, descrição do projeto e faixa de orçamento. E-mail e empresa são opcionais. Os dados são usados para analisar a solicitação, preparar uma proposta e entrar em contato sobre esse projeto.',
            'O formulário solicita sua autorização antes do envio. Ele não inscreve você em listas de publicidade. Evite incluir senhas, documentos de identidade, dados de pagamento ou outras informações sensíveis nos campos de texto.',
          ],
        },
        {
          title: 'Orçamento instantâneo e PDF',
          paragraphs: [
            'O orçamento instantâneo é calculado no navegador. Os dados informados para o PDF são incluídos no documento baixado e não são enviados ao servidor nessa modalidade. As seleções permanecem na memória durante a visita, sem um banco de dados de orçamentos.',
            'Se compartilhar depois esse PDF por e-mail ou WhatsApp, você também compartilha as informações contidas nele.',
          ],
        },
        {
          title: 'E-mail, WhatsApp e fornecedores',
          paragraphs: [
            'As solicitações personalizadas são enviadas ao endereço de contato configurado por meio da Brevo, responsável pelo envio de e-mails. O destinatário e o provedor de e-mail podem conservar a mensagem para atender à consulta.',
            'O botão do WhatsApp abre um serviço externo com uma mensagem preparada. O site não envia a mensagem automaticamente: você decide se deseja enviá-la. Nesse caso, são recebidos sua mensagem, número e os dados de perfil que o WhatsApp permitir mostrar, para atender à consulta. O WhatsApp também possui sua própria política de privacidade.',
            'A Vercel hospeda o site e a ImageKit fornece parte das imagens. Esses serviços podem tratar informações técnicas das requisições, como IP, navegador e registros de acesso, para fornecer e proteger seus serviços.',
          ],
        },
        {
          title: 'Conservação e segurança',
          paragraphs: [
            'Mensagens e dados de contato serão conservados pelo tempo necessário para atender à solicitação e, se houver contratação, administrar a relação e as obrigações aplicáveis. Não se estabelece um único prazo fixo para todos os casos.',
            'O formulário utiliza validação, proteção contra envios automatizados e um limite temporário de solicitações por IP. As credenciais de e-mail são utilizadas no servidor. Essas medidas não substituem o cuidado ao compartilhar informações pela Internet.',
          ],
        },
        {
          title: 'Suas solicitações de privacidade',
          paragraphs: [
            'Escreva para contacto@marcosgzz.tech para solicitar acesso, correção, cancelamento ou oposição em relação aos seus dados, ou revogar a autorização para futuras comunicações. Informe a solicitação e o canal utilizado, sem anexar documentos sensíveis na primeira mensagem. Se necessário, será combinada uma forma adequada de verificar sua identidade.',
            'As alterações desta política serão publicadas nesta página com a data de atualização. A política de cookies explica o uso de tecnologias do navegador.',
          ],
        },
      ],
    },
    'cookie-policy': {
      title: 'Política de cookies',
      description:
        'Informações sobre cookies, armazenamento do navegador e serviços externos deste portfólio.',
      updated: 'Última atualização',
      sections: [
        {
          title: 'O que são cookies',
          paragraphs: [
            'Cookies são pequenos arquivos que um site pode armazenar no navegador. Outras tecnologias, como o armazenamento local, também permitem conservar informações entre visitas.',
          ],
        },
        {
          title: 'O que este portfólio utiliza',
          paragraphs: [
            'A versão atual não inclui cookies próprios de análise ou publicidade nem scripts de rastreamento de campanhas. A etiqueta de verificação do Google Search Console confirma a propriedade do site e não instala um sistema de análise.',
            'O calculador mantém as seleções na memória do navegador, sem cookies ou armazenamento local persistente. O PDF é gerado localmente. Fornecedores de infraestrutura podem utilizar mecanismos técnicos de segurança e gerar registros de acesso.',
          ],
        },
        {
          title: 'Serviços e links externos',
          paragraphs: [
            'Parte das imagens é carregada pela ImageKit. Ao solicitar esses arquivos, o navegador comunica dados técnicos ao fornecedor. Os links para GitHub, LinkedIn, Instagram, Facebook, X e WhatsApp levam a serviços externos, com cookies e políticas próprios.',
            'O logo do WhatsApp e os ícones sociais estão incluídos no HTML do site. O serviço do WhatsApp abre quando você seleciona o link.',
          ],
        },
        {
          title: 'Como controlar cookies',
          paragraphs: [
            'Você pode consultar, bloquear ou excluir cookies nas configurações do navegador. Essas preferências podem afetar serviços externos que visitar. Se novas tecnologias de rastreamento forem adicionadas ao portfólio, esta política deverá ser atualizada e seu uso administrado conforme necessário.',
            'Para dúvidas sobre esta política, escreva para contacto@marcosgzz.tech. A política de privacidade explica o tratamento dos dados do formulário e das consultas pelo WhatsApp.',
          ],
        },
      ],
    },
  },
};
