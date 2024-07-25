export default class ModalContentProvider {
    constructor() {
        this.modalContents = {
            aboutMe: {
                title: 'About me',
                description: 'Recent graduate with a focus on web development using Angular. Proficient in HTML, CSS, JavaScript and TypeScript. Experienced in building dynamic and responsive web applications, emphasizing user experience and interface design. Strong problem-solving abilities, effective communication skills and a proactive learner open to new technologies and challenges. Eager to apply and expand technical expertise in innovative web development projects within a dynamic environment.',
            },
            projects: {
                title: 'Projects',
                description: 'The Compare RGM platform offers companies the ability to quickly and efficiently compare products and services offered by competitors, giving them the freedom to make informed decisions and identify the best options according to their needs and preferences.',
            },
            contactMe: {
                title: 'Contact me',
                description: 'Email: ciobanurobert100@gmail.com',
            },
        }
    }
    
    getModalInfo(portalName) {
        return this.modalContents[portalName];
    }
}