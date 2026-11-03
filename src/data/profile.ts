/**
 * EDIT THIS FILE to personalise the portfolio.
 * Contact fields are left empty on purpose: fill them in and the links on the
 * Contact page switch on automatically. Empty fields show a neutral placeholder.
 */
export const profile = {
  name: 'Venkat Ramanan M',
  roleShort: 'BIM Modeler',
  disciplines: ['Architecture', 'Structure', 'MEP'],
  tagline: 'Building Information Modeling & Technical Documentation Portfolio',
  roleLine: 'Junior BIM Modeler | Civil Engineering',
  location: 'Tirunelveli, Tamil Nadu, India',
  education: 'BE Civil Engineering — Kumaraguru College of Technology',
  training: 'BIM Training — Pumo Technovation, Coimbatore',
  goal: 'Seeking BIM Modeler positions in India, Singapore and other international markets.',

  // ---- Contact (fill in; leave '' to keep the placeholder) ----
  contact: {
    email: '', // e.g. 'name@example.com'
    phone: '', // e.g. '+91 00000 00000'
    linkedin: '', // full URL, e.g. 'https://www.linkedin.com/in/your-id'
    behance: '', // full URL, e.g. 'https://www.behance.net/your-id'
  },

  // Source drawing set (served from /public/pdf). Used for "open original PDF page" links.
  sourcePdf: 'pdf/bim-drawings.pdf',
};

export type Profile = typeof profile;
