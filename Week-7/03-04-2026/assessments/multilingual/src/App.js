import { useState, useContext, createContext, useEffect } from "react";

const translations = {
  en: {
    name: "English", flag: "🇬🇧",
    nav: { home: "Home", about: "About", services: "Services", contact: "Contact", login: "Login", logout: "Logout", welcome: "Welcome back" },
    home: {
      hero: "Build Without Limits",
      sub: "We craft digital experiences that transform ideas into impactful realities — design-led, technology-driven.",
      cta: "Explore Our Work",
      stats: [{ val: "200+", label: "Projects Delivered" }, { val: "98%", label: "Client Satisfaction" }, { val: "12+", label: "Years Experience" }, { val: "40+", label: "Team Experts" }],
      feature1: "Strategic Design", f1desc: "Every pixel placed with purpose and intent.",
      feature2: "Agile Development", f2desc: "Fast iterations, clean code, flawless delivery.",
      feature3: "Data-Driven", f3desc: "Insights that guide every decision we make.",
    },
    about: {
      title: "Our Story",
      p1: "Founded in 2012, Luminary Studio was born from a simple belief: that great technology should feel human. We blend strategic thinking with creative craft to build digital products that people genuinely love.",
      p2: "Our team of 40+ designers, engineers, and strategists work across time zones, united by a shared obsession with quality and impact.",
      values: ["Integrity", "Innovation", "Inclusion", "Impact"],
      valLabel: "Core Values",
      teamTitle: "Leadership Team",
      members: [{ name: "Aryan Mehta", role: "CEO & Co-Founder" }, { name: "Sofia Reyes", role: "CTO" }, { name: "Lena Böhm", role: "Head of Design" }],
    },
    services: {
      title: "What We Do",
      sub: "End-to-end digital solutions tailored to your ambitions.",
      items: [
        { icon: "◈", title: "UX Strategy", desc: "Research, wireframes, and user journeys that convert.", price: "$4,000+" },
        { icon: "◉", title: "Web Development", desc: "Performant, accessible, and beautifully coded web apps.", price: "$8,000+" },
        { icon: "◆", title: "Brand Identity", desc: "Visual systems that communicate who you truly are.", price: "$3,500+" },
        { icon: "◇", title: "Mobile Apps", desc: "Native and cross-platform apps users keep coming back to.", price: "$12,000+" },
        { icon: "○", title: "AI Integration", desc: "Intelligent features woven seamlessly into your product.", price: "$6,000+" },
        { icon: "□", title: "Growth Analytics", desc: "Data pipelines and dashboards that illuminate opportunity.", price: "$2,500+" },
      ],
    },
    contact: {
      title: "Let's Connect",
      sub: "Tell us about your project. We respond within 24 hours.",
      namePh: "Your Name", emailPh: "Email Address", msgPh: "Describe your project...",
      send: "Send Message", sent: "Message Sent!",
      info: ["hello@luminary.studio", "+1 (415) 823-0041", "San Francisco, CA"],
    },
    login: { title: "Welcome Back", sub: "Sign in to your account", emailPh: "Email", passPh: "Password", btn: "Sign In", demo: "Demo: any email + password" },
  },
  es: {
    name: "Español", flag: "🇪🇸",
    nav: { home: "Inicio", about: "Nosotros", services: "Servicios", contact: "Contacto", login: "Entrar", logout: "Salir", welcome: "Bienvenido de vuelta" },
    home: {
      hero: "Construye Sin Límites",
      sub: "Creamos experiencias digitales que transforman ideas en realidades impactantes — guiadas por diseño, impulsadas por tecnología.",
      cta: "Explorar Nuestro Trabajo",
      stats: [{ val: "200+", label: "Proyectos Entregados" }, { val: "98%", label: "Satisfacción del Cliente" }, { val: "12+", label: "Años de Experiencia" }, { val: "40+", label: "Expertos en el Equipo" }],
      feature1: "Diseño Estratégico", f1desc: "Cada pixel colocado con propósito e intención.",
      feature2: "Desarrollo Ágil", f2desc: "Iteraciones rápidas, código limpio, entrega perfecta.",
      feature3: "Basado en Datos", f3desc: "Perspectivas que guían cada decisión que tomamos.",
    },
    about: {
      title: "Nuestra Historia",
      p1: "Fundado en 2012, Luminary Studio nació de una simple creencia: que la gran tecnología debe sentirse humana. Combinamos el pensamiento estratégico con la creatividad para construir productos digitales que la gente genuinamente ama.",
      p2: "Nuestro equipo de más de 40 diseñadores, ingenieros y estrategas trabaja en diferentes zonas horarias, unidos por una obsesión compartida por la calidad y el impacto.",
      values: ["Integridad", "Innovación", "Inclusión", "Impacto"],
      valLabel: "Valores Fundamentales",
      teamTitle: "Equipo de Liderazgo",
      members: [{ name: "Aryan Mehta", role: "CEO y Cofundador" }, { name: "Sofia Reyes", role: "CTO" }, { name: "Lena Böhm", role: "Directora de Diseño" }],
    },
    services: {
      title: "Lo Que Hacemos",
      sub: "Soluciones digitales integrales adaptadas a tus ambiciones.",
      items: [
        { icon: "◈", title: "Estrategia UX", desc: "Investigación, wireframes y flujos de usuario que convierten.", price: "$4,000+" },
        { icon: "◉", title: "Desarrollo Web", desc: "Aplicaciones web performantes, accesibles y bellamente codificadas.", price: "$8,000+" },
        { icon: "◆", title: "Identidad de Marca", desc: "Sistemas visuales que comunican quién eres realmente.", price: "$3,500+" },
        { icon: "◇", title: "Apps Móviles", desc: "Apps nativas y multiplataforma a las que los usuarios vuelven.", price: "$12,000+" },
        { icon: "○", title: "Integración IA", desc: "Funciones inteligentes tejidas sin problemas en tu producto.", price: "$6,000+" },
        { icon: "□", title: "Analítica de Crecimiento", desc: "Pipelines de datos y dashboards que iluminan oportunidades.", price: "$2,500+" },
      ],
    },
    contact: {
      title: "Conectemos",
      sub: "Cuéntanos sobre tu proyecto. Respondemos en 24 horas.",
      namePh: "Tu Nombre", emailPh: "Correo Electrónico", msgPh: "Describe tu proyecto...",
      send: "Enviar Mensaje", sent: "¡Mensaje Enviado!",
      info: ["hola@luminary.studio", "+1 (415) 823-0041", "San Francisco, CA"],
    },
    login: { title: "Bienvenido de Nuevo", sub: "Inicia sesión en tu cuenta", emailPh: "Correo", passPh: "Contraseña", btn: "Iniciar Sesión", demo: "Demo: cualquier correo + contraseña" },
  },
  fr: {
    name: "Français", flag: "🇫🇷",
    nav: { home: "Accueil", about: "À Propos", services: "Services", contact: "Contact", login: "Connexion", logout: "Déconnexion", welcome: "Bon retour" },
    home: {
      hero: "Construire Sans Limites",
      sub: "Nous créons des expériences numériques qui transforment les idées en réalités percutantes — guidées par le design, propulsées par la technologie.",
      cta: "Découvrir Notre Travail",
      stats: [{ val: "200+", label: "Projets Livrés" }, { val: "98%", label: "Satisfaction Clients" }, { val: "12+", label: "Ans d'Expérience" }, { val: "40+", label: "Experts en Équipe" }],
      feature1: "Design Stratégique", f1desc: "Chaque pixel placé avec intention et propos.",
      feature2: "Développement Agile", f2desc: "Itérations rapides, code propre, livraison parfaite.",
      feature3: "Basé sur les Données", f3desc: "Des insights qui guident chaque décision prise.",
    },
    about: {
      title: "Notre Histoire",
      p1: "Fondé en 2012, Luminary Studio est né d'une conviction simple : que la technologie doit se sentir humaine. Nous allions pensée stratégique et créativité pour construire des produits numériques que les gens aiment vraiment.",
      p2: "Notre équipe de 40+ designers, ingénieurs et stratèges travaille à travers les fuseaux horaires, unie par une obsession commune pour la qualité et l'impact.",
      values: ["Intégrité", "Innovation", "Inclusion", "Impact"],
      valLabel: "Valeurs Fondamentales",
      teamTitle: "Équipe de Direction",
      members: [{ name: "Aryan Mehta", role: "PDG & Co-Fondateur" }, { name: "Sofia Reyes", role: "CTO" }, { name: "Lena Böhm", role: "Directrice Design" }],
    },
    services: {
      title: "Ce Que Nous Faisons",
      sub: "Solutions numériques complètes adaptées à vos ambitions.",
      items: [
        { icon: "◈", title: "Stratégie UX", desc: "Recherche, maquettes et parcours utilisateurs qui convertissent.", price: "4 000$+" },
        { icon: "◉", title: "Développement Web", desc: "Applications web performantes, accessibles et magnifiquement codées.", price: "8 000$+" },
        { icon: "◆", title: "Identité de Marque", desc: "Systèmes visuels qui communiquent qui vous êtes vraiment.", price: "3 500$+" },
        { icon: "◇", title: "Apps Mobiles", desc: "Apps natives et multi-plateformes auxquelles les utilisateurs reviennent.", price: "12 000$+" },
        { icon: "○", title: "Intégration IA", desc: "Fonctionnalités intelligentes intégrées seamlessly à votre produit.", price: "6 000$+" },
        { icon: "□", title: "Analytique de Croissance", desc: "Pipelines de données et tableaux de bord qui révèlent les opportunités.", price: "2 500$+" },
      ],
    },
    contact: {
      title: "Connectons-Nous",
      sub: "Parlez-nous de votre projet. Nous répondons sous 24 heures.",
      namePh: "Votre Nom", emailPh: "Adresse Email", msgPh: "Décrivez votre projet...",
      send: "Envoyer le Message", sent: "Message Envoyé !",
      info: ["bonjour@luminary.studio", "+1 (415) 823-0041", "San Francisco, CA"],
    },
    login: { title: "Bon Retour", sub: "Connectez-vous à votre compte", emailPh: "Email", passPh: "Mot de Passe", btn: "Se Connecter", demo: "Démo : n'importe quel email + mot de passe" },
  },
  hi: {
    name: "हिन्दी", flag: "🇮🇳",
    nav: { home: "होम", about: "हमारे बारे में", services: "सेवाएं", contact: "संपर्क", login: "लॉगिन", logout: "लॉगआउट", welcome: "वापसी पर स्वागत" },
    home: {
      hero: "बिना सीमा के बनाएं",
      sub: "हम डिजिटल अनुभव बनाते हैं जो विचारों को प्रभावशाली वास्तविकताओं में बदल देते हैं — डिज़ाइन-नेतृत्व में, तकनीक से संचालित।",
      cta: "हमारा काम देखें",
      stats: [{ val: "200+", label: "परियोजनाएं पूर्ण" }, { val: "98%", label: "ग्राहक संतुष्टि" }, { val: "12+", label: "वर्षों का अनुभव" }, { val: "40+", label: "टीम विशेषज्ञ" }],
      feature1: "रणनीतिक डिज़ाइन", f1desc: "हर पिक्सेल उद्देश्य और इरादे के साथ रखा गया।",
      feature2: "एजाइल डेवलपमेंट", f2desc: "तेज़ पुनरावृत्ति, स्वच्छ कोड, निर्दोष वितरण।",
      feature3: "डेटा-संचालित", f3desc: "अंतर्दृष्टि जो हर निर्णय को मार्गदर्शन देती है।",
    },
    about: {
      title: "हमारी कहानी",
      p1: "2012 में स्थापित, Luminary Studio एक साधारण विश्वास से जन्मा था: कि महान तकनीक मानवीय महसूस होनी चाहिए। हम रणनीतिक सोच को रचनात्मक कौशल के साथ मिलाकर डिजिटल उत्पाद बनाते हैं जिन्हें लोग वास्तव में पसंद करते हैं।",
      p2: "हमारी 40+ डिज़ाइनरों, इंजीनियरों और रणनीतिकारों की टीम विभिन्न टाइम ज़ोन में काम करती है, गुणवत्ता और प्रभाव के प्रति साझा जुनून से एकजुट।",
      values: ["ईमानदारी", "नवाचार", "समावेश", "प्रभाव"],
      valLabel: "मूल मूल्य",
      teamTitle: "नेतृत्व दल",
      members: [{ name: "अर्यन मेहता", role: "सीईओ और सह-संस्थापक" }, { name: "सोफिया रेयेस", role: "सीटीओ" }, { name: "लेना बोम", role: "डिज़ाइन प्रमुख" }],
    },
    services: {
      title: "हम क्या करते हैं",
      sub: "आपकी महत्वाकांक्षाओं के अनुरूप संपूर्ण डिजिटल समाधान।",
      items: [
        { icon: "◈", title: "UX रणनीति", desc: "अनुसंधान, वायरफ्रेम और उपयोगकर्ता यात्राएं जो परिणाम देती हैं।", price: "₹3,20,000+" },
        { icon: "◉", title: "वेब डेवलपमेंट", desc: "प्रदर्शनकारी, सुलभ और खूबसूरती से कोड किए गए वेब ऐप्स।", price: "₹6,40,000+" },
        { icon: "◆", title: "ब्रांड पहचान", desc: "दृश्य प्रणालियां जो बताती हैं आप वास्तव में कौन हैं।", price: "₹2,80,000+" },
        { icon: "◇", title: "मोबाइल ऐप्स", desc: "नेटिव और क्रॉस-प्लेटफॉर्म ऐप्स जिन पर उपयोगकर्ता वापस आते हैं।", price: "₹9,60,000+" },
        { icon: "○", title: "AI एकीकरण", desc: "बुद्धिमान सुविधाएं जो आपके उत्पाद में सहजता से बुनी गई हैं।", price: "₹4,80,000+" },
        { icon: "□", title: "ग्रोथ एनालिटिक्स", desc: "डेटा पाइपलाइन और डैशबोर्ड जो अवसर प्रकाशित करते हैं।", price: "₹2,00,000+" },
      ],
    },
    contact: {
      title: "आइए जुड़ें",
      sub: "हमें अपनी परियोजना के बारे में बताएं। हम 24 घंटे में जवाब देते हैं।",
      namePh: "आपका नाम", emailPh: "ईमेल पता", msgPh: "अपनी परियोजना का वर्णन करें...",
      send: "संदेश भेजें", sent: "संदेश भेज दिया!",
      info: ["hello@luminary.studio", "+91 98765 43210", "मुंबई, भारत"],
    },
    login: { title: "वापसी पर स्वागत", sub: "अपने खाते में साइन इन करें", emailPh: "ईमेल", passPh: "पासवर्ड", btn: "साइन इन करें", demo: "डेमो: कोई भी ईमेल + पासवर्ड" },
  },
};

const LangContext = createContext(null);
const AuthContext = createContext(null);

function useLang() { return useContext(LangContext); }
function useAuth() { return useContext(AuthContext); }

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0a0a0f; color: #e8e4dc; overflow-x: hidden; }
  :root {
    --gold: #c9a96e;
    --gold-dim: #9a7a4e;
    --cream: #e8e4dc;
    --bg: #0a0a0f;
    --bg2: #111118;
    --bg3: #161620;
    --border: rgba(201,169,110,0.18);
    --border-hi: rgba(201,169,110,0.45);
    --text-muted: #7a7585;
  }
  .serif { font-family: 'Cormorant Garamond', serif; }

  /* NAVBAR */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(10,10,15,0.9); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem; height: 68px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 700; color: var(--gold); letter-spacing: 0.04em; cursor: pointer; }
  .nav-links { display: flex; align-items: center; gap: 0.25rem; }
  .nav-link {
    padding: 0.45rem 0.85rem; border-radius: 6px; cursor: pointer;
    font-size: 0.82rem; font-weight: 400; letter-spacing: 0.03em;
    color: var(--text-muted); transition: all 0.2s; border: none; background: none;
  }
  .nav-link:hover { color: var(--cream); }
  .nav-link.active { color: var(--cream); }
  .nav-right { display: flex; align-items: center; gap: 0.75rem; }

  /* ⭐ LANGUAGE SWITCHER — HERO FEATURE */
  .lang-switcher {
    position: relative; display: flex; align-items: center;
  }
  .lang-badge {
    display: flex; align-items: center; gap: 6px;
    padding: 0.42rem 0.9rem; border-radius: 999px; cursor: pointer;
    background: linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.08));
    border: 1.5px solid var(--border-hi);
    font-size: 0.78rem; font-weight: 500; color: var(--gold);
    transition: all 0.25s; letter-spacing: 0.04em;
    box-shadow: 0 0 18px rgba(201,169,110,0.12);
  }
  .lang-badge:hover { background: linear-gradient(135deg, rgba(201,169,110,0.3), rgba(201,169,110,0.15)); box-shadow: 0 0 28px rgba(201,169,110,0.22); }
  .lang-badge .flag { font-size: 1rem; }
  .lang-badge .chevron { font-size: 0.6rem; transition: transform 0.2s; opacity: 0.7; }
  .lang-badge .chevron.open { transform: rotate(180deg); }
  .lang-label-glow {
    position: absolute; top: -18px; left: 50%; transform: translateX(-50%);
    font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--gold-dim); white-space: nowrap; font-weight: 500;
  }
  .lang-dropdown {
    position: absolute; top: calc(100% + 10px); right: 0; width: 180px;
    background: var(--bg2); border: 1px solid var(--border-hi);
    border-radius: 12px; overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--border);
    animation: dropIn 0.18s ease;
  }
  @keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  .lang-opt {
    display: flex; align-items: center; gap: 10px;
    padding: 0.72rem 1rem; cursor: pointer;
    font-size: 0.84rem; color: var(--cream);
    transition: background 0.15s; border: none; background: none; width: 100%; text-align: left;
  }
  .lang-opt:hover { background: rgba(201,169,110,0.1); }
  .lang-opt.selected { color: var(--gold); background: rgba(201,169,110,0.08); }
  .lang-opt .check { margin-left: auto; font-size: 0.7rem; color: var(--gold); }
  .lang-divider { height: 1px; background: var(--border); margin: 2px 0; }
  .lang-header-in-dropdown { padding: 0.55rem 1rem 0.3rem; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.14em; color: var(--text-muted); }
  .context-api-pill {
    display: inline-flex; align-items: center; gap: 5px;
    background: linear-gradient(135deg, rgba(201,169,110,0.18), rgba(201,169,110,0.06));
    border: 1px solid var(--border);
    border-radius: 999px; padding: 0.18rem 0.7rem;
    font-size: 0.63rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--gold-dim); margin: 0.25rem 0.5rem;
  }

  /* AUTH BUTTON */
  .auth-btn {
    padding: 0.42rem 1rem; border-radius: 6px; cursor: pointer;
    font-size: 0.8rem; font-weight: 500; letter-spacing: 0.03em;
    transition: all 0.2s; border: 1px solid var(--border); background: var(--bg3); color: var(--cream);
  }
  .auth-btn:hover { border-color: var(--border-hi); background: var(--bg2); }
  .auth-btn.login { background: var(--gold); color: #0a0a0f; border-color: var(--gold); }
  .auth-btn.login:hover { background: #dbb97e; }

  /* PAGE WRAPPER */
  .page { padding-top: 68px; min-height: 100vh; }

  /* HOME */
  .hero {
    min-height: calc(100vh - 68px); display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center;
    padding: 4rem 2rem; position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; overflow: hidden;
    background: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,169,110,0.06) 0%, transparent 70%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px; mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  .hero-label { font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
  .hero-title {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 300; line-height: 0.95; margin-bottom: 1.5rem; letter-spacing: -0.02em; color: var(--cream);
  }
  .hero-title span { color: var(--gold); font-style: italic; }
  .hero-sub { max-width: 540px; font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 2.5rem; }
  .hero-cta {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0.85rem 2rem; border-radius: 999px; cursor: pointer;
    background: var(--gold); color: #0a0a0f; font-weight: 500; font-size: 0.88rem;
    border: none; transition: all 0.25s; letter-spacing: 0.04em;
  }
  .hero-cta:hover { background: #dbb97e; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,169,110,0.3); }
  .stats-row { display: flex; gap: 0; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-top: 5rem; background: var(--bg2); }
  .stat-cell { padding: 1.5rem 2rem; flex: 1; border-right: 1px solid var(--border); text-align: center; }
  .stat-cell:last-child { border-right: none; }
  .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 600; color: var(--gold); }
  .stat-label { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.3rem; }
  .features-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); margin: 5rem 2rem; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; max-width: 900px; width: 100%; }
  .feat-card { background: var(--bg2); padding: 2rem; }
  .feat-icon { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--gold); margin-bottom: 1rem; }
  .feat-title { font-size: 0.95rem; font-weight: 500; color: var(--cream); margin-bottom: 0.5rem; }
  .feat-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; }

  /* ABOUT */
  .section { padding: 5rem 2rem; max-width: 1000px; margin: 0 auto; }
  .section-label { font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; line-height: 1.1; margin-bottom: 2rem; }
  .about-body { font-size: 1rem; line-height: 1.8; color: var(--text-muted); max-width: 680px; }
  .values-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 2.5rem; }
  .value-chip { padding: 0.5rem 1.2rem; border-radius: 999px; border: 1px solid var(--border-hi); font-size: 0.82rem; color: var(--gold); }
  .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem; }
  .member-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; }
  .member-avatar { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--gold-dim)); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: #0a0a0f; font-weight: 700; margin-bottom: 1rem; }
  .member-name { font-size: 0.95rem; font-weight: 500; color: var(--cream); }
  .member-role { font-size: 0.78rem; color: var(--text-muted); margin-top: 0.25rem; }

  /* SERVICES */
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-top: 3rem; }
  .svc-card { background: var(--bg2); padding: 2rem 1.75rem; transition: background 0.2s; cursor: default; }
  .svc-card:hover { background: var(--bg3); }
  .svc-icon { font-size: 1.5rem; color: var(--gold); margin-bottom: 1.25rem; display: block; }
  .svc-title { font-size: 0.95rem; font-weight: 500; margin-bottom: 0.5rem; }
  .svc-desc { font-size: 0.8rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem; }
  .svc-price { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--gold); }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; margin-top: 3rem; align-items: start; }
  .contact-info-list { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem; }
  .contact-info-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.88rem; color: var(--text-muted); }
  .contact-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .form-field { margin-bottom: 1.25rem; }
  .form-input {
    width: 100%; padding: 0.85rem 1rem; border-radius: 8px;
    background: var(--bg2); border: 1px solid var(--border);
    color: var(--cream); font-size: 0.88rem; font-family: 'DM Sans', sans-serif;
    transition: border 0.2s; outline: none;
  }
  .form-input:focus { border-color: var(--border-hi); }
  .form-input::placeholder { color: var(--text-muted); }
  textarea.form-input { min-height: 120px; resize: vertical; }
  .submit-btn {
    width: 100%; padding: 0.9rem; border-radius: 8px; cursor: pointer;
    background: var(--gold); color: #0a0a0f; font-weight: 500; font-size: 0.9rem;
    border: none; letter-spacing: 0.04em; transition: all 0.2s;
  }
  .submit-btn:hover { background: #dbb97e; }
  .submit-btn:disabled { opacity: 0.6; cursor: default; }
  .sent-msg { text-align: center; padding: 1rem; color: var(--gold); font-size: 0.9rem; }

  /* LOGIN PAGE */
  .login-wrap { min-height: calc(100vh - 68px); display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .login-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 20px; padding: 3rem; width: 100%; max-width: 400px; }
  .login-title { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300; margin-bottom: 0.5rem; }
  .login-sub { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 2rem; }
  .login-demo { font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 1rem; opacity: 0.7; }

  /* FOOTER */
  .footer { border-top: 1px solid var(--border); padding: 2rem; text-align: center; font-size: 0.78rem; color: var(--text-muted); }
  .footer span { color: var(--gold); }

  /* HIGHLIGHT BANNER */
  .highlight-banner {
    background: linear-gradient(90deg, rgba(201,169,110,0.1), rgba(201,169,110,0.05), rgba(201,169,110,0.1));
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 0.6rem 1.5rem;
    font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--gold-dim);
    text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.75rem;
  }
  .highlight-banner strong { color: var(--gold); }
  .pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.85); } }
  .user-pill { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: var(--text-muted); }
  .user-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; }
`;

function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = translations[lang];
  const langs = Object.entries(translations);

  useEffect(() => {
    const handler = (e) => { if (!e.target.closest('.lang-switcher')) setOpen(false); };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="lang-switcher" style={{ position: 'relative', marginTop: '10px' }}>
      <span className="lang-label-glow">Context API</span>
      <button className="lang-badge" onClick={() => setOpen(o => !o)}>
        <span className="flag">{current.flag}</span>
        <span>{current.name}</span>
        <span className={`chevron ${open ? 'open' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          <div className="lang-header-in-dropdown">Select Language</div>
          <div className="lang-divider" />
          {langs.map(([code, t]) => (
            <button key={code} className={`lang-opt ${code === lang ? 'selected' : ''}`}
              onClick={() => { setLang(code); setOpen(false); }}>
              <span style={{ fontSize: '1rem' }}>{t.flag}</span>
              <span>{t.name}</span>
              {code === lang && <span className="check">✓</span>}
            </button>
          ))}
          <div className="lang-divider" />
          <span className="context-api-pill">⚡ React Context API</span>
        </div>
      )}
    </div>
  );
}

function Navbar({ page, setPage }) {
  const { lang } = useLang();
  const { user, logout } = useAuth();
  const t = translations[lang].nav;

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => setPage('home')}>✦ Luminary</div>
      <div className="nav-links">
        {['home', 'about', 'services', 'contact'].map(p => (
          <button key={p} className={`nav-link ${page === p ? 'active' : ''}`} onClick={() => setPage(p)}>
            {t[p]}
          </button>
        ))}
      </div>
      <div className="nav-right">
        {user && <div className="user-pill"><div className="user-dot" />{t.welcome}</div>}
        <LanguageSwitcher />
        {user
          ? <button className="auth-btn" onClick={logout}>{t.logout}</button>
          : <button className="auth-btn login" onClick={() => setPage('login')}>{t.login}</button>
        }
      </div>
    </nav>
  );
}

function HomePage() {
  const { lang } = useLang();
  const t = translations[lang].home;
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div style={{ position: 'relative' }}>
          <div className="hero-label">Digital Studio · Est. 2012</div>
          <h1 className="hero-title">
            {t.hero.split(' ').map((w, i) => i === 1 ? <span key={i}> {w} </span> : w + ' ')}
          </h1>
          <p className="hero-sub">{t.sub}</p>
          <button className="hero-cta">{t.cta} →</button>
          <div className="stats-row" style={{ marginTop: '4rem' }}>
            {t.stats.map((s, i) => (
              <div key={i} className="stat-cell">
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="features-row">
          {[
            { title: t.feature1, desc: t.f1desc, icon: '◈' },
            { title: t.feature2, desc: t.f2desc, icon: '◉' },
            { title: t.feature3, desc: t.f3desc, icon: '◆' },
          ].map((f, i) => (
            <div key={i} className="feat-card">
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  const { lang } = useLang();
  const t = translations[lang].about;
  return (
    <div className="page">
      <div className="section">
        <div className="section-label">About Us</div>
        <h1 className="section-title serif">{t.title}</h1>
        <p className="about-body">{t.p1}</p>
        <p className="about-body" style={{ marginTop: '1.25rem' }}>{t.p2}</p>
        <div style={{ marginTop: '2.5rem' }}>
          <div className="section-label">{t.valLabel}</div>
          <div className="values-row">
            {t.values.map((v, i) => <div key={i} className="value-chip">{v}</div>)}
          </div>
        </div>
        <div style={{ marginTop: '4rem' }}>
          <div className="section-label">{t.teamTitle}</div>
          <div className="team-grid">
            {t.members.map((m, i) => (
              <div key={i} className="member-card">
                <div className="member-avatar">{m.name.split(' ').slice(0, 2).map(n => n[0]).join('')}</div>
                <div className="member-name">{m.name}</div>
                <div className="member-role">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  const { lang } = useLang();
  const t = translations[lang].services;
  return (
    <div className="page">
      <div className="section">
        <div className="section-label">Our Services</div>
        <h1 className="section-title serif">{t.title}</h1>
        <p className="about-body">{t.sub}</p>
        <div className="services-grid">
          {t.items.map((s, i) => (
            <div key={i} className="svc-card">
              <span className="svc-icon">{s.icon}</span>
              <div className="svc-title">{s.title}</div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-price">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const { lang } = useLang();
  const t = translations[lang].contact;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="page">
      <div className="section">
        <div className="section-label">Get In Touch</div>
        <h1 className="section-title serif">{t.title}</h1>
        <div className="contact-grid">
          <div>
            <p className="about-body">{t.sub}</p>
            <div className="contact-info-list">
              {t.info.map((info, i) => (
                <div key={i} className="contact-info-item">
                  <div className="contact-dot" />
                  {info}
                </div>
              ))}
            </div>
          </div>
          <div>
            {sent ? (
              <div className="sent-msg">✦ {t.sent}</div>
            ) : (
              <>
                <div className="form-field"><input className="form-input" placeholder={t.namePh} /></div>
                <div className="form-field"><input className="form-input" placeholder={t.emailPh} /></div>
                <div className="form-field"><textarea className="form-input" placeholder={t.msgPh} /></div>
                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                  {loading ? '...' : t.send}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ setPage }) {
  const { lang } = useLang();
  const { login } = useAuth();
  const t = translations[lang].login;
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    if (email && pass) { login(email); setPage('home'); }
  };

  return (
    <div className="page">
      <div className="login-wrap">
        <div className="login-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '1rem' }}>✦ Luminary</div>
          </div>
          <h2 className="login-title serif">{t.title}</h2>
          <p className="login-sub">{t.sub}</p>
          <div className="form-field">
            <input className="form-input" placeholder={t.emailPh} value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-field">
            <input className="form-input" type="password" placeholder={t.passPh} value={pass} onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          <button className="submit-btn" onClick={handleLogin}>{t.btn}</button>
          <p className="login-demo">{t.demo}</p>
        </div>
      </div>
    </div>
  );
}

function HighlightBanner() {
  const { lang } = useLang();
  const current = translations[lang];
  return (
    <div className="highlight-banner">
      <div className="pulse-dot" />
      <span>Context API Powers Live Translation</span>
      <strong>·</strong>
      <span>Currently: <strong>{current.flag} {current.name}</strong></span>
      <strong>·</strong>
      <span>4 Languages Available</span>
      <div className="pulse-dot" />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');

  const login = (email) => setUser({ email });
  const logout = () => { setUser(null); setPage('home'); };

  const pages = { home: HomePage, about: AboutPage, services: ServicesPage, contact: ContactPage, login: LoginPage };
  const PageComponent = pages[page] || HomePage;

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <AuthContext.Provider value={{ user, login, logout }}>
        <style>{styles}</style>
        <Navbar page={page} setPage={setPage} />
        <HighlightBanner />
        <PageComponent setPage={setPage} />
        <footer className="footer">
          © 2025 <span>Luminary Studio</span> · Built with React Context API for i18n
        </footer>
      </AuthContext.Provider>
    </LangContext.Provider>
  );
}
