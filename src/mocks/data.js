export const idiomas = [
    {
        idioma: 'Español',
        base: [
            {
                label: 'Español',
                code: 'es',
            },
            {
                label: 'Inglés',
                code: 'en',
            },
        ],
    },
    {
        idioma: 'Inglés',
        base: [
            {
                label: 'Spanish',
                code: 'es',
            },
            {
                label: 'English',
                code: 'en',
            },
        ],
    },
]

export const menus = [
    {
        idioma: 'es',
        base: [
            {
                label: 'Inicio',
                link: '/inicio',
            },
            {
                label: 'Servicios',
                link: '/servicios',
            },
            {
                label: 'Nosotros',
                link: '/nosotros',
            },
            {
                label: 'Contáctanos',
                link: '/contacto',
            },
            {
                label: 'Idiomas',
                items: idiomas[0]['base'],
            },
        ]
    },
    {
        idioma: 'en',
        base: [
            {
                label: 'Home',
                link: '/home',
            },
            {
                label: 'Services',
                link: '/services',
            },
            {
                label: 'About us',
                link: '/about',
            },
            {
                label: 'Contact us',
                link: '/contact',
            },
            {
                label: 'Languages',
                items: idiomas[1]['base'],
            },
        ]
    },
]

export const presentacion = [
    {
        idioma: 'es',
        base: [
            { title: 'Innovación tecnológica para impulsar tu empresa hacia el éxito', description: 'Como equipo de desarrollo, comprendemos la singularidad de cada negocio. Por eso, nos comprometemos a proporcionar soluciones tecnológicas a medida, diseñadas específicamente para potenciar el éxito de las pymes en el mundo digital.' },
        ]
    },
    {
        idioma: 'en',
        base: [
            { title: 'Technological innovation to drive your company towards success', description: 'As a development team, we understand the uniqueness of each business. Therefore, we are committed to providing tailored technological solutions, specifically designed to enhance the success of SMEs in the digital world.' }
        ]
    },
]
export const servicios = [
    {
        idioma: 'es',
        titulo: 'Nuestros servicios para potenciar tu PyMe',
        base: [
            { image: '/assets/images/services/desarrollo-web.svg', title: 'Desarrollo web', description: 'Imagina tu página web ideal y déjanos hacerla realidad. Creamos sitios web corporativos, profesionales y personalizados según tus necesidades y visiones. Cuéntanos tu idea y nosotros la materializaremos.' },
            { image: '/assets/images/services/desarrollo-movil.svg', title: 'Desarrollo móvil', description: 'Visualiza la aplicación móvil perfecta para tu empresa y permítenos convertirla en realidad. Creamos aplicaciones móviles corporativas profesionales y personalizadas que se ajustan a tus necesidades y objetivos.' },
            { image: '/assets/images/services/diseno-ui-ux.svg', title: 'Diseño UI/UX', description: 'Imagina la experiencia ideal para tu aplicación y déjanos hacerla realidad. Creamos diseños UI/UX profesionales y personalizados para garantizar una experiencia digital excepcional. Cuéntanos tu visión y nosotros la llevaremos a cabo.' },
            { image: '/assets/images/services/e-commerce.svg', title: 'E-Commerce', description: 'Impulsa el crecimiento de tu negocio mediante la apertura de una tienda virtual. Atrae a más clientes y aumenta tus ventas con nuestra solución diseñada para ayudarte a expandir tu presencia en línea y maximizar tus oportunidades de venta.' },
            { image: '/assets/images/services/presencia-digital.svg', title: 'Presencia digital', description: 'Creamos estrategias para optimizar tu presencia en redes sociales y aumentar tu alcance en línea. Cuéntanos tus objetivos y nosotros nos encargaremos de impulsar tu presencia en la web.' },
            { image: '/assets/images/services/soporte-informatico.svg', title: 'Soporte informático', description: 'Mejora la eficiencia de tu empresa con nuestro servicio de soporte informático. Nos encargamos de resolver cualquier problema técnico para que puedas mantener tus operaciones sin interrupciones y concentrarte en tu negocio.' },
            { image: '/assets/images/services/consultoria-informatica.svg', title: 'Consultoría informática', description: 'Resolvemos dudas e incidencias informáticas en tus equipos de trabajo. Nuestro servicio de asesoramiento informático te proporciona soluciones rápidas y efectivas para mantener tus operaciones sin interrupciones.' },
        ]
    },
    {
        idioma: 'en',
        titulo: 'Our services to enhance your SME',
        base: [
            { image: '/assets/images/services/desarrollo-web.svg', title: 'Web Development', description: 'Imagine your ideal website and let us make it a reality. We create corporate, professional, and customized websites according to your needs and visions. Tell us your idea, and we will materialize it.' },
            { image: '/assets/images/services/desarrollo-movil.svg', title: 'Mobile Development', description: 'Visualize the perfect mobile application for your company and let us turn it into reality. We create professional, customized corporate mobile applications that fit your needs and objectives.' },
            { image: '/assets/images/services/diseno-ui-ux.svg', title: 'UI/UX Design', description: 'Imagine the ideal experience for your application and let us make it a reality. We create professional and customized UI/UX designs to ensure an exceptional digital experience. Tell us your vision, and we will bring it to life.' },
            { image: '/assets/images/services/e-commerce.svg', title: 'E-Commerce', description: 'Boost your business growth by opening an online store. Attract more customers and increase your sales with our solution designed to help you expand your online presence and maximize sales opportunities.' },
            { image: '/assets/images/services/presencia-digital.svg', title: 'Digital Presence', description: 'We create strategies to optimize your presence on social media and increase your online reach. Tell us your goals, and we will boost your web presence.' },
            { image: '/assets/images/services/soporte-informatico.svg', title: 'IT Support', description: "Enhance your company's efficiency with our IT support service. We take care of resolving any technical issues so you can maintain uninterrupted operations and focus on your business." },
            { image: '/assets/images/services/consultoria-informatica.svg', title: 'IT Consulting', description: 'We address IT doubts and incidents in your work environment. Our IT consulting service provides quick and effective solutions to keep your operations running smoothly.' },
        ]
    },
];
export const trabajarConNosotros = [
    {
        idioma: 'es',
        titulo: '¿Por qué trabajar con nosotros?',
        base: [
            { title: 'Experiencia Especializada', description: 'Contamos con un equipo experto en una amplia gama de servicios tecnológicos para impulsar el éxito de tu negocio en línea.' },
            { title: 'Innovación Constante', description: 'Diseñamos soluciones digitales alineando los objetivos de tu Pyme y tus necesidades como cliente.' },
            { title: 'Atención Personalizada', description: 'Te brindamos un servicio individualizado para entender y satisfacer tus necesidades tecnológicas específicas.' },
        ]
    },
    {
        idioma: 'en',
        titulo: 'Why should you join us?',
        base: [
            { title: 'Specialized Experience', description: 'We have a team of experts in a wide range of technological services to boost the success of your online business.' },
            { title: 'Constant Innovation', description: 'We design digital solutions aligning the objectives of your SME and your needs as a client.' },
            { title: 'Personalized Attention', description: 'We provide you with individualized service to understand and meet your specific technological needs.' },
        ]
    },
];
export const contactanos = [
    {
        idioma: 'es',
        base: [
            { title: '¿Quieres llevar tu empresa al siguiente nivel?', description: 'Contáctanos hoy mismo.' },
        ]
    },
    {
        idioma: 'en',
        base: [
            { title: 'Want to take your business to the next level?', description: 'Contact us right now.' }
        ]
    },
];

export const encontrarnos = [
    {
        idioma: 'es',
        base: [
            { title: 'También puedes encontrarnos en:', description: '' },
        ]
    },
    {
        idioma: 'en',
        base: [
            { title: 'You can also find us at:', description: '' }
        ]
    },
];

export const derechosReservados = [
    {
        idioma: 'es',
        base: [
            { title: 'Todos los Derechos Reservados', description: '' },
        ]
    },
    {
        idioma: 'en',
        base: [
            { title: 'All Rights Reserved', description: '' }
        ]
    },
];

// ACERCA DE
export const equipoPhentta = [
    {
        idioma: 'es',
        base: [
            { 
                name: 'Jean Sanchez',
                role: 'CEO',
                image: '/assets/images/team/jean-sanchez.png',
            },
            { 
                name: 'Cliver Flores',
                role: 'Director de Operaciones',
                image: '/assets/images/team/clver-flores.png',
            },
        ]
    },
    {
        idioma: 'en',
        base: [
            { 
                name: 'Jean Sanchez',
                role: 'CEO',
                image: '/assets/images/team/jean-sanchez.png',
            },
            { 
                name: 'Cliver Flores',
                role: 'Operations director',
                image: '/assets/images/team/clver-flores.png',
            },
        ]
    },
]