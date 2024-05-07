export const categorias = [
    { value: "todos", label: "Todos" },
    { value: "smartphones", label: "Smartphones" },
    { value: "tablets", label: "Tablets" },
    { value: "accesorios", label: "Accesorios" },
]
export const dataCatalog = [];

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
                link: '/inicio',
            },
            {
                label: 'Services',
                link: '/servicios',
            },
            {
                label: 'About us',
                link: '/nosotros',
            },
            {
                label: 'Contact us',
                link: '/contacto',
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
            { title: 'Desarrollo web', description: 'Imagina tu página web ideal y déjanos hacerla realidad. Creamos sitios web corporativos, profesionales y personalizados según tus necesidades y visiones. Cuéntanos tu idea y nosotros la materializaremos.' },
            { title: 'Desarrollo móvil', description: 'Visualiza la aplicación móvil perfecta para tu empresa y permítenos convertirla en realidad. Creamos aplicaciones móviles corporativas profesionales y personalizadas que se ajustan a tus necesidades y objetivos.' },
            { title: 'Diseño UI/UX', description: 'Imagina la experiencia ideal para tu aplicación y déjanos hacerla realidad. Creamos diseños UI/UX profesionales y personalizados para garantizar una experiencia digital excepcional. Cuéntanos tu visión y nosotros la llevaremos a cabo.' },
            { title: 'E-Commerce', description: 'Impulsa el crecimiento de tu negocio mediante la apertura de una tienda virtual. Atrae a más clientes y aumenta tus ventas con nuestra solución diseñada para ayudarte a expandir tu presencia en línea y maximizar tus oportunidades de venta.' },
            { title: 'Presencia digital', description: 'Creamos estrategias para optimizar tu presencia en redes sociales y aumentar tu alcance en línea. Cuéntanos tus objetivos y nosotros nos encargaremos de impulsar tu presencia en la web.' },
            { title: 'Soporte informático', description: 'Mejora la eficiencia de tu empresa con nuestro servicio de soporte informático. Nos encargamos de resolver cualquier problema técnico para que puedas mantener tus operaciones sin interrupciones y concentrarte en tu negocio.' },
            { title: 'Consultoria informático', description: 'Resolvemos dudas e incidencias informáticas en tus equipos de trabajo. Nuestro servicio de asesoramiento informático te proporciona soluciones rápidas y efectivas para mantener tus operaciones sin interrupciones.' },
        ]
    },
    {
        idioma: 'en',
        titulo: 'Our services to enhance your SME',
        base: [
            { title: 'Web Development', description: 'Imagine your ideal website and let us make it a reality. We create corporate, professional, and customized websites according to your needs and visions. Tell us your idea, and we will materialize it.' },
            { title: 'Mobile Development', description: 'Visualize the perfect mobile application for your company and let us turn it into reality. We create professional, customized corporate mobile applications that fit your needs and objectives.' },
            { title: 'UI/UX Design', description: 'Imagine the ideal experience for your application and let us make it a reality. We create professional and customized UI/UX designs to ensure an exceptional digital experience. Tell us your vision, and we will bring it to life.' },
            { title: 'E-Commerce', description: 'Boost your business growth by opening an online store. Attract more customers and increase your sales with our solution designed to help you expand your online presence and maximize sales opportunities.' },
            { title: 'Digital Presence', description: 'We create strategies to optimize your presence on social media and increase your online reach. Tell us your goals, and we will boost your web presence.' },
            { title: 'IT Support', description: "Enhance your company's efficiency with our IT support service. We take care of resolving any technical issues so you can maintain uninterrupted operations and focus on your business." },
            { title: 'IT Consulting', description: 'We address IT doubts and incidents in your work environment. Our IT consulting service provides quick and effective solutions to keep your operations running smoothly.' },
        ]
    },
];