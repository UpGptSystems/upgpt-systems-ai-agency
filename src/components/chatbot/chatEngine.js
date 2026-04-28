// ─── Language detection ────────────────────────────────────────────────────

const LANG_SIGNALS = {
  sq: {
    chars: /[ëç]/i,
    words: ['mirë', 'faleminderit', 'shërbim', 'çmim', 'ndihmë', 'çfarë', 'keni', 'jeni', 'bëni', 'është', 'dhe', 'por', 'shumë', 'mirëdita', 'pershendetje', 'tungjatjeta'],
  },
  es: {
    chars: /[ñáéíóúü¿¡]/i,
    words: ['hola', 'gracias', 'servicio', 'precio', 'cómo', 'qué', 'cuánto', 'tengo', 'quiero', 'puedo', 'tienen', 'hacen', 'buenos días', 'buenas'],
  },
  fr: {
    chars: /[àâêîôûœæ]/i,
    words: ['bonjour', 'merci', 'service', 'prix', 'comment', 'vous', 'pouvez', 'faites', 'offrez', 'combien', 'est-ce', 'bonsoir', 'salut'],
  },
  de: {
    chars: /[äöüß]/i,
    words: ['hallo', 'danke', 'service', 'preis', 'kosten', 'wie', 'was', 'können', 'haben', 'machen', 'bieten', 'guten tag', 'guten morgen'],
  },
  it: {
    chars: /[àèéìíîòóùú]/i,
    words: ['ciao', 'grazie', 'servizio', 'prezzo', 'come', 'cosa', 'quanto', 'avete', 'fate', 'offrite', 'buongiorno', 'salve'],
  },
}

export const detectLanguage = (text, fallback = 'en') => {
  const lower = text.toLowerCase()
  for (const [lang, { chars, words }] of Object.entries(LANG_SIGNALS)) {
    if (chars.test(text) || words.some(w => lower.includes(w))) return lang
  }
  return fallback
}

// ─── Intent detection ──────────────────────────────────────────────────────

const INTENTS = {
  greeting: [
    'hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'howdy', 'sup', 'yo', 'what\'s up',
    'whats up', 'greetings', 'hi there', 'hey there', 'morning', 'evening', 'afternoon',
    'mirëdita', 'përshëndetje', 'tungjatjeta', 'hej', 'ç\'kemi',
    'hola', 'buenos días', 'buenas tardes', 'buenas',
    'bonjour', 'salut', 'bonsoir', 'coucou',
    'hallo', 'guten morgen', 'guten tag', 'guten abend',
    'ciao', 'buongiorno', 'buonasera', 'salve',
  ],
  services: [
    'service', 'what do you do', 'what you do', 'what can you do', 'what do you offer',
    'offer', 'provide', 'build', 'make', 'create', 'sell', 'product', 'solution',
    'capabilities', 'speciali', 'expertise', 'help with', 'work on', 'develop',
    'shërbim', 'çfarë bëni', 'ofroni', 'ndërtoni',
    'servicio', 'qué hacen', 'ofrecen', 'hacen',
    'que faites', 'proposez', 'offrez',
    'dienstleistung', 'was machen', 'anbieten', 'entwickeln',
    'servizio', 'cosa fate', 'offrite', 'sviluppate',
  ],
  pricing: [
    'price', 'cost', 'how much', 'pricing', 'rates', 'invest', 'investment', 'budget',
    'fee', 'charge', 'pay', 'payment', 'expensive', 'affordable', 'cheap', 'value',
    'package', 'plan', 'tier', 'subscription', 'monthly', 'one-time', 'quote', 'estimate',
    'worth it', 'money', 'euro', '€', 'dollar', '$', 'pound',
    'çmim', 'sa kushton', 'buxhet', 'paguaj',
    'precio', 'cuánto', 'costo', 'inversión', 'pagar', 'cobran',
    'prix', 'combien', 'tarif', 'coût', 'payer', 'facturer',
    'preis', 'kosten', 'wie viel', 'bezahlen', 'zahlen',
    'prezzo', 'quanto', 'costo', 'pagare', 'fatturare',
  ],
  timeline: [
    'how long', 'timeline', 'when', 'deploy', 'launch', 'setup', 'how fast', 'speed',
    'duration', 'ready', 'start', 'begin', 'get started', 'quickly', 'fast', 'asap',
    'days', 'weeks', 'months', 'delivery', 'turnaround', 'eta',
    'sa kohë', 'afat', 'kur', 'shpejt',
    'cuánto tiempo', 'plazo', 'cuándo', 'rápido', 'empezar',
    'combien de temps', 'délai', 'quand', 'rapidement', 'commencer',
    'wie lange', 'zeitplan', 'wann', 'schnell', 'anfangen',
    'quanto tempo', 'quando', 'velocemente', 'iniziare',
  ],
  results: [
    'result', 'roi', 'return', 'benefit', 'success', 'case study', 'proof', 'outcome',
    'achieve', 'impact', 'difference', 'improvement', 'growth', 'increase', 'revenue',
    'conversion', 'leads generated', 'numbers', 'statistics', 'data', 'metrics',
    'actually work', 'does it work', 'really work', 'proven',
    'rezultat', 'klienti', 'provë', 'rritje',
    'resultado', 'cliente', 'prueba', 'funciona', 'mejora',
    'résultat', 'client', 'preuve', 'fonctionne', 'amélioration',
    'ergebnis', 'kunde', 'beweis', 'funktioniert', 'verbesserung',
    'risultato', 'cliente', 'prova', 'funziona', 'miglioramento',
  ],
  about: [
    'who are you', 'about you', 'about upgpt', 'about the company', 'tell me about',
    'who is behind', 'team', 'company', 'agency', 'upgpt', 'founder', 'background',
    'experience', 'how long have you', 'years in business', 'history', 'story',
    'who made', 'who built', 'your company', 'your team', 'your agency',
    'kush jeni', 'rreth jush', 'ekip', 'kompani',
    'quiénes son', 'sobre ustedes', 'equipo', 'empresa',
    'qui êtes-vous', 'à propos', 'équipe', 'entreprise',
    'wer sind sie', 'über euch', 'team', 'unternehmen',
    'chi siete', 'di voi', 'chi è', 'azienda',
  ],
  contact: [
    'contact', 'reach', 'email', 'instagram', 'social media', 'get in touch',
    'message you', 'find you', 'reach out', 'connect', 'talk to someone', 'speak to',
    'human', 'real person', 'speak with team', 'where can i', 'how do i contact',
    'kontakt', 'email', 'telefononi',
    'contacto', 'correo', 'encontrar',
    'contact', 'courriel', 'trouver',
    'kontakt', 'e-mail', 'finden',
    'contatto', 'email', 'trovare',
  ],
  booking: [
    'book', 'call', 'demo', 'meeting', 'schedule', 'appointment', 'consultation',
    'talk', 'speak', 'consult', 'strategy', 'free call', 'free consultation',
    'interested', 'want to start', 'ready to start', 'sign up', 'get started',
    'next step', 'move forward', 'let\'s do it', 'sounds good', 'yes please',
    'rezervo', 'thirrje', 'takim', 'interesoj',
    'reservar', 'llamada', 'reunión', 'cita', 'interesado',
    'réserver', 'appel', 'réunion', 'rendez-vous', 'intéressé',
    'buchen', 'anruf', 'treffen', 'termin', 'interessiert',
    'prenotare', 'chiamata', 'riunione', 'interessato',
  ],
  chatbot: [
    'chatbot', 'ai chat', 'bot', 'chat widget', 'website chat', 'live chat',
    'chat on my website', 'chat for my site', 'chat feature', 'chat system',
    'automated chat', 'conversation bot', 'virtual assistant', 'ai agent',
    'robot', 'asistent', 'bot faqe',
    'asistente virtual', 'bot web',
    'assistant virtuel', 'bot de chat',
    'virtueller assistent', 'website bot',
    'assistente virtuale', 'bot per sito',
  ],
  whatsapp: [
    'whatsapp', 'wa', 'messaging', 'sms', 'text', 'text message', 'automated message',
    'message automation', 'instant message', 'dm', 'direct message',
    'mesazh', 'whatsapp automation',
    'mensajes', 'automatización mensajes',
    'message automatique',
    'nachricht automatisierung',
    'messaggi automatici',
  ],
  crm: [
    'crm', 'lead management', 'pipeline', 'sales funnel', 'hubspot', 'gohighlevel',
    'salesforce', 'workflow', 'follow up', 'follow-up', 'lead tracking', 'customer data',
    'database', 'contacts', 'nurturing', 'lead nurture', 'drip campaign',
    'shitje', 'automatizim', 'ndjekje',
    'ventas', 'automatización', 'clientes potenciales',
    'ventes', 'automatisation', 'prospects',
    'verkauf', 'automatisierung', 'interessenten',
    'vendite', 'automazione', 'clienti potenziali',
  ],

  // ── NEW INTENTS ────────────────────────────────────────────────────────────

  industry: [
    'restaurant', 'cafe', 'coffee shop', 'hotel', 'clinic', 'dental', 'dentist', 'doctor',
    'medical', 'healthcare', 'gym', 'fitness', 'salon', 'spa', 'beauty', 'barbershop',
    'real estate', 'property', 'mortgage', 'lawyer', 'law firm', 'attorney', 'accountant',
    'coach', 'coaching', 'consultant', 'agency', 'marketing agency', 'freelancer',
    'ecommerce', 'online store', 'shopify', 'woocommerce', 'retail', 'shop',
    'startup', 'saas', 'software', 'tech company', 'construction', 'contractor',
    'cleaning', 'plumber', 'electrician', 'insurance', 'finance', 'bank',
    'school', 'education', 'tutor', 'training', 'course', 'academy',
    'church', 'nonprofit', 'charity', 'ngo', 'government',
    'i have a', 'i run a', 'i own a', 'my business is', 'my company is',
    'we are a', 'we run', 'we own', 'our business',
  ],
  guarantee: [
    'guarantee', 'guaranteed', 'refund', 'money back', 'money-back', 'risk',
    'what if it doesn\'t work', 'what if it fails', 'what if i don\'t like',
    'not satisfied', 'not happy', 'doesn\'t work', 'not working', 'fail',
    'risk free', 'risk-free', 'no risk', 'safe to try', 'commitment',
    'contract', 'locked in', 'lock in', 'minimum', 'minimum term', 'cancel',
    'cancellation', 'exit', 'stop', 'quit', 'walk away', 'binding',
    'obligation', 'try before', 'trial',
  ],
  difference: [
    'different', 'unique', 'stand out', 'why you', 'why choose you', 'why upgpt',
    'why not', 'competitor', 'competition', 'vs', 'versus', 'compared to',
    'better than', 'best', 'advantage', 'edge', 'special', 'other agencies',
    'other companies', 'alternatives', 'options', 'what sets you apart',
    'what makes you', 'why should i', 'convince me', 'sell yourself',
    'other ai', 'chatgpt', 'openai', 'other bots', 'manychat', 'tidio', 'intercom',
  ],
  trust: [
    'trust', 'trusted', 'trustworthy', 'safe', 'secure', 'legit', 'legitimate',
    'scam', 'real', 'fake', 'reliable', 'credible', 'verified', 'proof',
    'how do i know', 'can i trust', 'is this real', 'is this safe', 'worried',
    'concerned', 'skeptical', 'sceptical', 'nervous', 'unsure about',
    'privacy', 'data', 'gdpr', 'confidential', 'secure', 'security',
  ],
  support_ongoing: [
    'support', 'after launch', 'after delivery', 'ongoing', 'maintenance',
    'update', 'updates', 'change', 'modify', 'edit', 'adjust', 'tweak',
    'help after', 'stuck', 'issue', 'bug', 'problem after', 'who do i call',
    'if something breaks', 'breaks', 'stops working', 'down', 'not responding',
    'customer service', 'help desk', 'ticket', 'assistance',
  ],
  technical: [
    'technical', 'tech', 'not tech', 'not technical', 'not good with tech',
    'not good with technology', 'not techy', 'not savvy', 'tech savvy',
    'complicated', 'complex', 'difficult', 'hard to use', 'easy to use',
    'do i need', 'need coding', 'need developer', 'developer', 'coding',
    'programming', 'code', 'know how to', 'simple', 'user friendly',
    'no experience', 'beginner', 'non technical', 'run it myself',
  ],
  integration: [
    'integrate', 'integration', 'connect', 'connect to', 'connect with',
    'my website', 'my site', 'wordpress', 'wix', 'squarespace', 'webflow',
    'shopify', 'existing system', 'existing software', 'existing crm',
    'work with', 'compatible', 'plugin', 'embed', 'add to my',
    'api', 'zapier', 'make', 'n8n', 'link to', 'sync',
  ],
  location: [
    'where are you', 'where are you based', 'based', 'location', 'country',
    'office', 'remote', 'worldwide', 'global', 'local', 'europe', 'usa',
    'where do you operate', 'which country', 'timezone',
  ],
  examples: [
    'portfolio', 'example', 'show me', 'can i see', 'sample', 'demo',
    'previous work', 'past work', 'what have you built', 'showcase',
    'who have you worked with', 'clients you\'ve worked', 'your clients',
    'see the chatbot', 'see an example', 'live example',
  ],
  growth: [
    'grow', 'growth', 'scale', 'scaling', 'more clients', 'more leads',
    'more customers', 'more sales', 'increase revenue', 'double', 'triple',
    'expand', 'expand my business', 'take my business', 'next level',
    'struggling to grow', 'stuck', 'plateau', 'want to grow', 'need to grow',
    'generate leads', 'get more', 'attract more',
  ],
  problem: [
    'problem', 'struggling', 'issue', 'frustrated', 'frustrating',
    'not working', 'failing', 'losing leads', 'missing leads', 'losing customers',
    'losing clients', 'slow', 'manual', 'too much time', 'wasting time',
    'overwhelmed', 'no time', 'too busy', 'burnout', 'stressed',
    'can\'t keep up', 'can\'t handle', 'missing out', 'leaving money on table',
    'not converting', 'low conversion', 'website not converting',
  ],
  social_proof: [
    'review', 'reviews', 'testimonial', 'testimonials', 'rating', 'ratings',
    'feedback', 'what do clients say', 'happy clients', 'satisfied',
    'how many clients', 'how many businesses', 'years in business',
    'track record', 'experience', 'established', 'how long you\'ve been',
    'references', 'recommendation',
  ],
  ai_general: [
    'what is ai', 'how does ai work', 'artificial intelligence', 'machine learning',
    'how does it work', 'how does the ai', 'ai technology', 'powered by',
    'gpt', 'llm', 'language model', 'smart', 'intelligent', 'learn',
    'is this ai', 'real ai', 'behind the scenes', 'technology',
  ],
  small_business: [
    'small business', 'small company', 'startup', 'solopreneur', 'sole trader',
    'freelancer', 'just me', 'one person', 'two people', 'few employees',
    'no team', 'budget is tight', 'limited budget', 'can\'t afford',
    'worth it for small', 'too small', 'big companies only',
  ],
}

export const detectIntent = (text) => {
  const lower = text.toLowerCase()

  // Check all intents — longer patterns first to avoid short-word false positives
  const sorted = Object.entries(INTENTS).sort(
    (a, b) => Math.max(...b[1].map(p => p.length)) - Math.max(...a[1].map(p => p.length))
  )

  for (const [intent, patterns] of sorted) {
    if (patterns.some(p => lower.includes(p))) return intent
  }
  return 'fallback'
}

// ─── Knowledge base responses ──────────────────────────────────────────────

const R = {
  greeting: {
    en: `Hey, good to have you here! I'm the UpGpt assistant — I can tell you pretty much anything about what we do, how we work, or help you figure out if we're a good fit.\n\nWhat's on your mind?`,
    sq: `Hej, mirë se erdhe! Unë jam asistenti i UpGpt — mund të të tregoj gjithçka rreth asaj që bëjmë, si punojmë, ose të ndihmoj të kuptosh nëse jemi i përshtatshëm për ty.\n\nÇfarë ke në mendje?`,
    es: `¡Hola, qué bueno tenerte aquí! Soy el asistente de UpGpt — puedo contarte prácticamente todo sobre lo que hacemos, cómo trabajamos, o ayudarte a ver si encajamos bien con tu negocio.\n\n¿Qué tienes en mente?`,
    fr: `Salut, content de vous avoir ici! Je suis l'assistant UpGpt — je peux vous parler de tout ce que nous faisons, comment nous travaillons, ou vous aider à voir si nous sommes le bon choix.\n\nQu'est-ce qui vous amène?`,
    de: `Hallo, schön dass Sie da sind! Ich bin der UpGpt-Assistent — ich kann Ihnen so ziemlich alles über das erzählen, was wir tun, wie wir arbeiten, oder Ihnen helfen herauszufinden, ob wir gut zu Ihnen passen.\n\nWas liegt Ihnen auf dem Herzen?`,
    it: `Ciao, che bello averti qui! Sono l'assistente di UpGpt — posso dirti praticamente tutto su quello che facciamo, come lavoriamo, o aiutarti a capire se siamo la scelta giusta per te.\n\nCosa hai in mente?`,
  },
  services: {
    en: `So basically, we build AI systems that handle the work your team shouldn't have to do manually.\n\nThat usually means a **chatbot on your website** that captures and qualifies leads around the clock, **WhatsApp automation** that follows up with people the moment they reach out, **CRM pipelines** that score and track every lead automatically, and **outbound sequences** that reach prospects on autopilot.\n\nWe don't do cookie-cutter stuff — everything is built specifically for your business. What kind of business are you running? That'd help me point you to the most useful piece.`,
    sq: `Në thelb, ne ndërtojmë sisteme AI që kryejnë punën që ekipi juaj nuk duhet ta bëjë manualisht.\n\nKjo zakonisht do të thotë një **chatbot në faqen tuaj** që kap dhe kualifikon klientë gjatë gjithë kohës, **automatizim WhatsApp** që ndjek menjëherë, **pipeline CRM** që gjurmon çdo lead automatikisht, dhe **sekuenca dalëse** me autopilot.\n\nNuk bëjmë gjëra standarde — gjithçka ndërtohet posaçërisht për biznesin tuaj. Çfarë lloj biznesi drejtoni?`,
    es: `Básicamente, construimos sistemas de IA que hacen el trabajo que tu equipo no debería hacer manualmente.\n\nEso normalmente significa un **chatbot en tu web** que captura y califica leads todo el día, **automatización de WhatsApp** que hace seguimiento al instante, **pipelines CRM** que rastrean cada lead automáticamente, y **secuencias outbound** en piloto automático.\n\nNo hacemos cosas estándar — todo se construye específicamente para tu negocio. ¿Qué tipo de negocio tienes?`,
    fr: `En gros, nous construisons des systèmes IA qui font le travail que votre équipe ne devrait pas faire manuellement.\n\nCela signifie généralement un **chatbot sur votre site** qui capture et qualifie les leads en permanence, une **automatisation WhatsApp** qui fait le suivi immédiatement, des **pipelines CRM** qui tracent chaque lead automatiquement, et des **séquences sortantes** en pilote automatique.\n\nNous ne faisons pas de solutions standard — tout est construit spécifiquement pour votre entreprise. Quel type d'entreprise gérez-vous?`,
    de: `Im Grunde bauen wir KI-Systeme, die die Arbeit übernehmen, die Ihr Team nicht manuell erledigen sollte.\n\nDas bedeutet typischerweise einen **Chatbot auf Ihrer Website**, der rund um die Uhr Leads erfasst und qualifiziert, **WhatsApp-Automatisierung**, die sofort nachfasst, **CRM-Pipelines**, die jeden Lead automatisch verfolgen, und **Outbound-Sequenzen** auf Autopilot.\n\nWir machen keine Standardlösungen — alles wird speziell für Ihr Unternehmen entwickelt. Was für ein Unternehmen führen Sie?`,
    it: `Fondamentalmente, costruiamo sistemi AI che gestiscono il lavoro che il tuo team non dovrebbe fare manualmente.\n\nDi solito significa un **chatbot sul tuo sito** che cattura e qualifica lead tutto il giorno, **automazione WhatsApp** che fa follow-up all'istante, **pipeline CRM** che tracciano ogni lead automaticamente, e **sequenze outbound** in autopilota.\n\nNon facciamo soluzioni standard — tutto viene costruito specificamente per la tua azienda. Che tipo di attività gestisci?`,
  },
  pricing: {
    en: `Honestly, it depends on what you need. Here's how it breaks down:\n\n**Starter — €1,497** one-time setup\nIncludes 1 AI chatbot with lead capture. Maintenance is **€19/month** — covers hosting, updates, and keeping everything running smoothly.\n\n**Growth — €3,997** one-time setup\nThe full stack: chatbot + WhatsApp AI + CRM automation, all wired together. Maintenance is **€55/month**.\n\n**Premium — custom pricing**\nFor bigger operations with multiple channels and advanced automations. Maintenance is **€99/month**.\n\nMost clients make their money back within the first month — sometimes a lot faster. The maintenance fee is honestly the smallest line on their budget once the system is generating leads.\n\nWant to figure out which one fits your situation?`,
    sq: `Sinqerisht, varet nga çfarë keni nevojë. Ja si ndahet:\n\n**Starter — €1,497** setup njëherësh\nPërfshin 1 chatbot AI me kapje plumbash. Mirëmbajtja është **€19/muaj**.\n\n**Growth — €3,997** setup njëherësh\nPaketa e plotë: chatbot + WhatsApp AI + CRM. Mirëmbajtja është **€55/muaj**.\n\n**Premium — çmim i personalizuar**\nPër operacione më të mëdha. Mirëmbajtja është **€99/muaj**.\n\nShumica e klientëve rikuperojnë investimin brenda muajit të parë. Doni të gjejmë opsionin e duhur?`,
    es: `Honestamente, depende de lo que necesites. Así es como se divide:\n\n**Starter — €1,497** configuración única\nIncluye 1 chatbot IA con captura de leads. Mantenimiento **€19/mes**.\n\n**Growth — €3,997** configuración única\nTodo conectado: chatbot + WhatsApp IA + CRM. Mantenimiento **€55/mes**.\n\n**Premium — precio personalizado**\nPara operaciones más grandes. Mantenimiento **€99/mes**.\n\nLa mayoría de clientes recuperan su inversión en el primer mes. ¿Quieres encontrar la opción que tiene más sentido?`,
    fr: `Honnêtement, ça dépend de ce dont vous avez besoin. Voici comment ça se décompose:\n\n**Starter — €1,497** configuration unique\nInclut 1 chatbot IA avec capture de leads. Maintenance **€19/mois**.\n\n**Growth — €3,997** configuration unique\nTout connecté: chatbot + WhatsApp IA + CRM. Maintenance **€55/mois**.\n\n**Premium — tarif personnalisé**\nPour les opérations plus importantes. Maintenance **€99/mois**.\n\nLa plupart des clients récupèrent leur investissement dans le premier mois. Voulez-vous trouver l'option qui vous convient?`,
    de: `Ehrlich gesagt kommt es darauf an, was Sie brauchen. So sieht es aus:\n\n**Starter — €1.497** einmalige Einrichtung\nEnthält 1 KI-Chatbot mit Lead-Erfassung. Wartung **€19/Monat**.\n\n**Growth — €3.997** einmalige Einrichtung\nAlles verbunden: Chatbot + WhatsApp KI + CRM. Wartung **€55/Monat**.\n\n**Premium — individueller Preis**\nFür größere Betriebe. Wartung **€99/Monat**.\n\nDie meisten Kunden holen ihre Investition im ersten Monat wieder rein. Wollen wir die passende Option finden?`,
    it: `Onestamente, dipende da cosa hai bisogno. Ecco come si divide:\n\n**Starter — €1.497** configurazione una tantum\nInclude 1 chatbot AI con acquisizione lead. Manutenzione **€19/mese**.\n\n**Growth — €3.997** configurazione una tantum\nTutto collegato: chatbot + WhatsApp AI + CRM. Manutenzione **€55/mese**.\n\n**Premium — prezzo personalizzato**\nPer operazioni più grandi. Manutenzione **€99/mese**.\n\nLa maggior parte dei clienti recupera l'investimento entro il primo mese. Vuoi trovare l'opzione giusta per te?`,
  },
  timeline: {
    en: `Pretty fast, honestly. We've got the process dialled in at this point.\n\nTypically it goes like this — first couple of days we get clear on what you need and map everything out. Then we build for about a week. After that it's testing, integrations, fine-tuning. By day 11 to 14 you're live.\n\nMost agencies stretch this to months. We ship in two weeks because we've built enough of these to know exactly what works. Does that timeline work for what you have in mind?`,
    sq: `Mjaft shpejt, sinqerisht. E kemi procesin të rafinuar tashmë.\n\nZakonisht shkon kështu — ditët e para qartësojmë çfarë nevojitet. Pastaj ndërtojmë për rreth një javë. Pas kësaj testime dhe integrime. Deri në ditën 11-14 jeni live.\n\nShumica e agjencive e zgjatin këtë në muaj. Ne dorëzojmë në dy javë. A funksionon ky afat kohor për atë që keni parasysh?`,
    es: `Bastante rápido, honestamente. Ya tenemos el proceso muy afinado.\n\nNormalmente va así — los primeros días aclaramos qué necesitas. Luego construimos durante una semana. Después pruebas, integraciones, ajustes. Para el día 11-14 estás en vivo.\n\nLa mayoría de agencias alargan esto meses. Nosotros entregamos en dos semanas. ¿Ese timeline funciona para lo que tienes en mente?`,
    fr: `Assez vite, honnêtement. Nous avons bien rodé le processus à ce stade.\n\nEn général ça se passe comme ça — les premiers jours on clarifie ce dont vous avez besoin. Ensuite on construit pendant une semaine environ. Après ça vient les tests, intégrations, ajustements. Vers le jour 11-14 vous êtes en ligne.\n\nLa plupart des agences étirent ça sur des mois. Nous livrons en deux semaines. Ce délai vous convient-il?`,
    de: `Ziemlich schnell, ehrlich gesagt. Wir haben den Prozess inzwischen gut eingespielt.\n\nIn der Regel läuft es so — in den ersten Tagen klären wir, was Sie brauchen. Dann bauen wir etwa eine Woche. Danach Tests, Integrationen, Feinabstimmung. Bis Tag 11-14 sind Sie live.\n\nDie meisten Agenturen dehnen das auf Monate aus. Wir liefern in zwei Wochen. Passt dieser Zeitplan zu Ihren Vorstellungen?`,
    it: `Abbastanza velocemente, onestamente. Abbiamo il processo ben rodato a questo punto.\n\nDi solito va così — i primi giorni chiarissimo cosa hai bisogno. Poi costruiamo per circa una settimana. Dopo vengono test, integrazioni, ottimizzazione. Entro il giorno 11-14 sei live.\n\nLa maggior parte delle agenzie dilata questo a mesi. Noi consegniamo in due settimane. Questa tempistica funziona per quello che hai in mente?`,
  },
  results: {
    en: `The honest answer is it varies, but the pattern we see consistently is somewhere between **3 and 10x ROI** in the first 60 days.\n\nThe biggest thing clients notice first is that leads stop falling through the cracks. Everything gets captured, followed up, qualified — without anyone on the team lifting a finger.\n\nOne of our clients runs a dental clinic. She closed **three new Invisalign cases in her first month** — more than covering the whole system. Another one cut their manual follow-up time by about 80%.\n\nThe 98% open rate on WhatsApp versus around 22% for email is also a big deal — it means your messages actually get seen. Is there a specific result you're trying to achieve?`,
    sq: `Përgjigja e sinqertë është se ndryshon, por modeli që shohim vazhdimisht është diku midis **3 dhe 10 herë ROI** në 60 ditët e para.\n\nGjëja kryesore që klientët vërejnë së pari është se klientët potencialë nuk humbasin më. Gjithçka kapet, ndiqet, kualifikohet — automatikisht.\n\nNjë nga klientët tanë drejton një klinikë dentare. Ajo mbylli **tre raste të reja Invisalign në muajin e parë** — duke mbuluar tërë sistemin. Është një ndryshim i vërtetë. A ka ndonjë rezultat specifik që po përpiqeni të arrini?`,
    es: `La respuesta honesta es que varía, pero el patrón que vemos consistentemente está entre **3 y 10x ROI** en los primeros 60 días.\n\nLo primero que notan los clientes es que los leads dejan de perderse. Todo se captura, se hace seguimiento, se califica — sin que nadie del equipo tenga que hacer nada.\n\nUna de nuestras clientes dirige una clínica dental. Cerró **tres nuevos casos de Invisalign en su primer mes** — cubriendo con creces todo el sistema. ¿Hay algún resultado específico que estés intentando lograr?`,
    fr: `La réponse honnête est que ça varie, mais le modèle que nous voyons régulièrement se situe entre **3 et 10x ROI** dans les 60 premiers jours.\n\nLa première chose que les clients remarquent, c'est que les leads ne passent plus entre les mailles. Tout est capturé, suivi, qualifié — automatiquement.\n\nL'une de nos clientes gère une clinique dentaire. Elle a conclu **trois nouveaux cas d'Invisalign dans son premier mois** — couvrant largement tout le système. Y a-t-il un résultat spécifique que vous essayez d'atteindre?`,
    de: `Die ehrliche Antwort ist, dass es variiert, aber das Muster, das wir konsistent sehen, liegt irgendwo zwischen **3 und 10x ROI** in den ersten 60 Tagen.\n\nDas Erste, was Kunden bemerken, ist, dass Leads aufhören, durch die Maschen zu fallen. Alles wird erfasst, nachgefasst, qualifiziert — automatisch.\n\nEine unserer Kundinnen betreibt eine Zahnklinik. Sie schloss **drei neue Invisalign-Fälle in ihrem ersten Monat** ab — mehr als genug, um das gesamte System zu decken. Gibt es ein bestimmtes Ergebnis, das Sie anstreben?`,
    it: `La risposta onesta è che varia, ma il modello che vediamo costantemente è da qualche parte tra **3 e 10x ROI** nei primi 60 giorni.\n\nLa prima cosa che i clienti notano è che i lead smettono di andare persi. Tutto viene catturato, seguito, qualificato — automaticamente.\n\nUna delle nostre clienti gestisce una clinica dentale. Ha chiuso **tre nuovi casi di Invisalign nel suo primo mese** — coprendo abbondantemente l'intero sistema. C'è un risultato specifico che stai cercando di raggiungere?`,
  },
  about: {
    en: `We're **UpGpt Systems** — a small, focused AI automation agency. We don't try to do everything. We specialise in systems that help businesses generate and convert leads without needing a bigger team to do it.\n\nWe've built AI systems for 50-plus businesses — e-commerce, healthcare, real estate, agencies, professional services. Pretty varied. The team is tight, which means when you work with us you're not getting handed off to someone junior.\n\nYou can reach us directly at upgptsystems@gmail.com or find us on Instagram at @upgpt_systems. What made you reach out today?`,
    sq: `Jemi **UpGpt Systems** — një agjenci e vogël, e fokusuar e automatizimit AI. Nuk përpiqemi të bëjmë gjithçka. Specializohemi në sisteme që ndihmojnë bizneset të gjenerojnë dhe konvertojnë klientë pa pasur nevojë për një ekip më të madh.\n\nKemi ndërtuar sisteme AI për 50+ biznese — tregtinë elektronike, kujdesin shëndetësor, pasuri të paluajtshme, agjenci, shërbime profesionale.\n\nMund të na kontaktoni drejtpërdrejt në upgptsystems@gmail.com ose na gjeni në Instagram tek @upgpt_systems. Çfarë ju solli sot?`,
    es: `Somos **UpGpt Systems** — una agencia de automatización IA pequeña y enfocada. No intentamos hacer de todo. Nos especializamos en sistemas que ayudan a los negocios a generar y convertir leads sin necesitar un equipo más grande.\n\nHemos construido sistemas de IA para más de 50 negocios — e-commerce, salud, inmobiliaria, agencias, servicios profesionales.\n\nPuedes contactarnos directamente en upgptsystems@gmail.com o encontrarnos en Instagram como @upgpt_systems. ¿Qué te trajo hoy?`,
    fr: `Nous sommes **UpGpt Systems** — une petite agence d'automatisation IA bien ciblée. Nous n'essayons pas de tout faire. Nous nous spécialisons dans les systèmes qui aident les entreprises à générer et convertir des leads sans avoir besoin d'une équipe plus grande.\n\nNous avons construit des systèmes IA pour plus de 50 entreprises — e-commerce, santé, immobilier, agences, services professionnels.\n\nVous pouvez nous contacter directement à upgptsystems@gmail.com ou nous trouver sur Instagram à @upgpt_systems. Qu'est-ce qui vous amène aujourd'hui?`,
    de: `Wir sind **UpGpt Systems** — eine kleine, fokussierte KI-Automatisierungsagentur. Wir versuchen nicht, alles zu machen. Wir spezialisieren uns auf Systeme, die Unternehmen helfen, Leads zu generieren und zu konvertieren, ohne ein größeres Team zu benötigen.\n\nWir haben KI-Systeme für über 50 Unternehmen gebaut — E-Commerce, Gesundheitswesen, Immobilien, Agenturen, professionelle Dienstleistungen.\n\nSie können uns direkt unter upgptsystems@gmail.com erreichen oder uns auf Instagram unter @upgpt_systems finden. Was hat Sie heute hergeführt?`,
    it: `Siamo **UpGpt Systems** — una piccola agenzia di automazione AI focalizzata. Non cerchiamo di fare tutto. Ci specializziamo in sistemi che aiutano le aziende a generare e convertire lead senza dover avere un team più grande.\n\nAbbiamo costruito sistemi AI per oltre 50 aziende — e-commerce, sanità, immobiliare, agenzie, servizi professionali.\n\nPuoi contattarci direttamente a upgptsystems@gmail.com o trovarci su Instagram a @upgpt_systems. Cosa ti ha portato qui oggi?`,
  },
  contact: {
    en: `Best way to reach us is email — **upgptsystems@gmail.com**. We're also on Instagram at **@upgpt_systems** if you want to see what we're up to.\n\nOr if you'd rather skip straight to a conversation with the team, I can point you to our contact page and you can pick a time that works. We usually get back to people within a few hours.\n\nWhat would be easiest for you?`,
    sq: `Mënyra më e mirë për të na kontaktuar është email — **upgptsystems@gmail.com**. Jemi edhe në Instagram tek **@upgpt_systems**.\n\nOse nëse preferoni të kaloni drejtpërdrejt në një bisedë me ekipin, mund t'ju drejtoj në faqen tonë të kontaktit. Zakonisht u përgjigjemi njerëzve brenda disa orësh.\n\nÇfarë do të ishte më e lehtë për ju?`,
    es: `La mejor forma de contactarnos es por email — **upgptsystems@gmail.com**. También estamos en Instagram como **@upgpt_systems**.\n\nO si prefieres pasar directamente a una conversación con el equipo, puedo enviarte a nuestra página de contacto para que elijas un horario. Normalmente respondemos en pocas horas.\n\n¿Qué sería más fácil para ti?`,
    fr: `La meilleure façon de nous contacter c'est par email — **upgptsystems@gmail.com**. Nous sommes aussi sur Instagram à **@upgpt_systems**.\n\nOu si vous préférez passer directement à une conversation avec l'équipe, je peux vous diriger vers notre page de contact. Nous répondons généralement en quelques heures.\n\nQu'est-ce qui serait le plus simple pour vous?`,
    de: `Der beste Weg, uns zu erreichen, ist per E-Mail — **upgptsystems@gmail.com**. Wir sind auch auf Instagram unter **@upgpt_systems**.\n\nOder wenn Sie lieber direkt ein Gespräch mit dem Team führen möchten, kann ich Sie zu unserer Kontaktseite weiterleiten. Wir antworten normalerweise innerhalb weniger Stunden.\n\nWas wäre am einfachsten für Sie?`,
    it: `Il modo migliore per contattarci è l'email — **upgptsystems@gmail.com**. Siamo anche su Instagram a **@upgpt_systems**.\n\nO se preferisci passare direttamente a una conversazione con il team, posso portarti alla nostra pagina contatti per scegliere un orario. Di solito rispondiamo entro poche ore.\n\nCosa sarebbe più facile per te?`,
  },
  booking: {
    en: `The fastest way is to just book a call — it's free, 15 minutes, and we'll be straight with you about whether we can actually help or not. No pressure, no pitch.\n\nIn those 15 minutes we'll look at your current setup, figure out your biggest automation opportunity, and give you a clear plan. Whether you work with us or not, you'll leave with something useful.\n\nLet me send you to the contact page now so you can grab a time that works.`,
    sq: `Mënyra më e shpejtë është thjesht të rezervoni një thirrje — është falas, 15 minuta, dhe do të jemi të sinqertë me ju nëse mund t'ju ndihmojmë apo jo.\n\nNë ato 15 minuta do të shikojmë konfigurimin tuaj aktual, do të identifikojmë mundësinë tuaj kryesore të automatizimit dhe do t'ju japim një plan të qartë.\n\nLë të ju dërgoj në faqen e kontaktit tani.`,
    es: `La forma más rápida es simplemente reservar una llamada — es gratis, 15 minutos, y seremos directos contigo sobre si podemos ayudarte o no. Sin presión, sin discurso de ventas.\n\nEn esos 15 minutos veremos tu configuración actual, identificaremos tu mayor oportunidad de automatización y te daremos un plan claro.\n\nDéjame enviarte a la página de contacto ahora.`,
    fr: `Le moyen le plus rapide est de simplement réserver un appel — c'est gratuit, 15 minutes, et nous serons directs avec vous sur ce que nous pouvons ou non faire. Pas de pression, pas de discours de vente.\n\nPendant ces 15 minutes nous examinerons votre configuration actuelle, identifierons votre plus grande opportunité d'automatisation et vous fournirons un plan clair.\n\nLaissez-moi vous diriger vers la page de contact maintenant.`,
    de: `Der schnellste Weg ist einfach einen Anruf zu buchen — kostenlos, 15 Minuten, und wir werden ehrlich mit Ihnen darüber sein, ob wir tatsächlich helfen können oder nicht. Kein Druck, keine Verkaufsgespräche.\n\nIn diesen 15 Minuten schauen wir uns Ihre aktuelle Situation an, identifizieren Ihre größte Automatisierungsmöglichkeit und geben Ihnen einen klaren Plan.\n\nIch leite Sie jetzt zur Kontaktseite weiter.`,
    it: `Il modo più veloce è semplicemente prenotare una chiamata — è gratuita, 15 minuti, e saremo diretti con te su se possiamo davvero aiutarti o meno. Nessuna pressione, nessun discorso di vendita.\n\nIn quei 15 minuti esamineremo la tua configurazione attuale, identificheremo la tua principale opportunità di automazione e ti daremo un piano chiaro.\n\nLasciami portarti alla pagina dei contatti ora.`,
  },
  chatbot: {
    en: `The website chatbot is what a lot of people start with, and honestly for good reason — it's what captures leads before they bounce off your site.\n\nIt sits there 24/7, handles questions, qualifies people based on whatever criteria matter to you, and books calls directly into your calendar. No human needed.\n\nThe one you're talking to right now is basically a version of what we build — though yours would be fully branded, connected to your actual knowledge base and CRM, and trained on your specific business.\n\nDo you have anything handling leads on your site right now, or starting from scratch?`,
    sq: `Chatbot-i i faqes web është ajo me të cilën shumë njerëz fillojnë, dhe sinqerisht për arsye të mira — është ajo që kap klientët potencialë para se të largohen nga faqja juaj.\n\nQëndron aty 24/7, trajton pyetjet, kualifikon njerëzit dhe rezervon thirrje direkt. Asnjë njerëz i nevojshëm.\n\nAi me të cilin po flisni tani është në thelb një version i asaj që ne ndërtojmë — edhe pse i juaji do të ishte plotësisht i markës.\n\nKeni diçka që trajton klientët potencialë në faqen tuaj aktualisht?`,
    es: `El chatbot de la web es con lo que mucha gente empieza, y honestamente con razón — es lo que captura leads antes de que reboten en tu sitio.\n\nEstá ahí 24/7, maneja preguntas, califica a la gente y reserva llamadas directamente. Sin necesidad de humanos.\n\nEl que estás usando ahora mismo es básicamente una versión de lo que construimos — aunque el tuyo estaría completamente personalizado.\n\n¿Tienes algo gestionando leads en tu web ahora mismo, o empezarías desde cero?`,
    fr: `Le chatbot de site web, c'est par là que beaucoup de gens commencent, et honnêtement pour de bonnes raisons — c'est ce qui capture les leads avant qu'ils ne quittent votre site.\n\nIl est là 24/7, gère les questions, qualifie les gens et réserve des rendez-vous directement. Pas besoin d'humain.\n\nCelui avec lequel vous parlez en ce moment est essentiellement une version de ce que nous construisons — mais le vôtre serait entièrement personnalisé.\n\nAvez-vous quelque chose qui gère les leads sur votre site en ce moment?`,
    de: `Der Website-Chatbot ist das, womit viele Leute anfangen, und ehrlich gesagt aus gutem Grund — er ist das, was Leads erfasst, bevor sie Ihre Website verlassen.\n\nEr ist rund um die Uhr da, beantwortet Fragen, qualifiziert Menschen und bucht direkt Termine. Kein Mensch erforderlich.\n\nDer, mit dem Sie gerade sprechen, ist im Grunde eine Version dessen, was wir bauen — Ihrer wäre aber vollständig gebrandmarkt und mit Ihrem CRM verbunden.\n\nHaben Sie momentan etwas, das Leads auf Ihrer Website verwaltet?`,
    it: `Il chatbot del sito web è quello con cui molte persone iniziano, e onestamente per buone ragioni — è quello che cattura i lead prima che rimbalzino via dal tuo sito.\n\nÈ lì 24/7, gestisce le domande, qualifica le persone e prenota direttamente le chiamate. Nessun umano necessario.\n\nQuello con cui stai parlando ora è fondamentalmente una versione di ciò che costruiamo — ma il tuo sarebbe completamente brandizzato e connesso al tuo CRM.\n\nHai qualcosa che gestisce i lead sul tuo sito in questo momento?`,
  },
  whatsapp: {
    en: `WhatsApp is honestly underrated for business. The open rate sits around **98%** — which sounds wild compared to email, but makes complete sense when you think about how people use their phones.\n\nWe build bots that kick in the moment someone messages you. They qualify the lead, answer questions, book calls — all in that one conversation thread, automatically. The businesses that see the biggest jump from this are usually ones that were manually following up on WhatsApp and just couldn't keep up with the volume.\n\nAre you currently using WhatsApp for your business at all?`,
    sq: `WhatsApp është sinqerisht i nënvlerësuar për bizneset. Norma e hapjes qëndron rreth **98%** — gjë e cila tingëllon e çmendur krahasuar me emailin, por ka kuptim të plotë kur mendoni se si njerëzit përdorin telefonat e tyre.\n\nNdërtojmë bote që aktivizohen në momentin kur dikush ju dërgon mesazh. Ata kualifikojnë klientin, u përgjigjen pyetjeve, rezervojnë thirrje — gjithçka automatikisht.\n\nA po përdorni aktualisht WhatsApp për biznesin tuaj?`,
    es: `WhatsApp está honestamente infravalorado para los negocios. La tasa de apertura está alrededor del **98%** — lo cual suena increíble comparado con el email, pero tiene todo el sentido cuando piensas en cómo la gente usa sus teléfonos.\n\nConstruimos bots que se activan en el momento en que alguien te escribe. Califican al lead, responden preguntas, reservan llamadas — todo en ese hilo de conversación, automáticamente.\n\n¿Estás usando WhatsApp para tu negocio actualmente?`,
    fr: `WhatsApp est honnêtement sous-estimé pour les entreprises. Le taux d'ouverture se situe autour de **98%** — ce qui semble fou comparé à l'email, mais a tout son sens quand on pense à la façon dont les gens utilisent leur téléphone.\n\nNous construisons des bots qui se déclenchent au moment où quelqu'un vous envoie un message. Ils qualifient le lead, répondent aux questions, réservent des rendez-vous — tout automatiquement.\n\nUtilisez-vous WhatsApp pour votre entreprise en ce moment?`,
    de: `WhatsApp ist ehrlich gesagt für Unternehmen unterschätzt. Die Öffnungsrate liegt bei rund **98%** — was im Vergleich zu E-Mail verrückt klingt, aber völlig Sinn macht, wenn man bedenkt, wie Menschen ihre Handys nutzen.\n\nWir bauen Bots, die aktiv werden, sobald jemand Ihnen schreibt. Sie qualifizieren den Lead, beantworten Fragen, buchen Termine — alles automatisch.\n\nNutzen Sie WhatsApp derzeit für Ihr Unternehmen?`,
    it: `WhatsApp è onestamente sottovalutato per le aziende. Il tasso di apertura si aggira intorno al **98%** — il che sembra pazzesco rispetto all'email, ma ha perfettamente senso quando pensi a come le persone usano i loro telefoni.\n\nConstruiamo bot che si attivano nel momento in cui qualcuno ti scrive. Qualificano il lead, rispondono alle domande, prenotano chiamate — tutto automaticamente.\n\nStai usando WhatsApp per la tua attività al momento?`,
  },
  crm: {
    en: `The CRM piece is basically the connective tissue — it makes sure every lead from every channel ends up in one place, gets scored, and gets followed up automatically.\n\nA lot of businesses we talk to have leads coming in from different places with nothing tying it together. That's where a lot of revenue quietly disappears.\n\nWe work with **HubSpot, GoHighLevel, Salesforce** — or if you have something custom, we can usually integrate with that too. What does your current setup look like? Do you even have a CRM right now?`,
    sq: `Pjesa CRM është në thelb lidhësi — siguron që çdo klient potencial nga çdo kanal mbaron në një vend, vlerësohet dhe ndiqet automatikisht.\n\nShumë biznese me të cilat flasim kanë klientë potencialë që vijnë nga vende të ndryshme pa asgjë që t'i lidh. Aty është ku shumë të ardhura zhduken.\n\nPunojmë me **HubSpot, GoHighLevel, Salesforce**. Si duket konfigurimi juaj aktual? A keni fare CRM tani?`,
    es: `La parte del CRM es básicamente el tejido conectivo — se asegura de que cada lead de cada canal acabe en un solo lugar, se puntúe y se haga seguimiento automáticamente.\n\nMuchos negocios con los que hablamos tienen leads que llegan de diferentes lugares sin nada que los una. Ahí es donde desaparecen silenciosamente muchos ingresos.\n\nTrabajamos con **HubSpot, GoHighLevel, Salesforce**. ¿Cómo es tu configuración actual? ¿Tienes algún CRM ahora mismo?`,
    fr: `La partie CRM est essentiellement le tissu conjonctif — elle s'assure que chaque lead de chaque canal se retrouve au même endroit, est scoré et fait l'objet d'un suivi automatique.\n\nBeaucoup d'entreprises à qui nous parlons ont des leads qui arrivent de différents endroits sans rien pour les relier. C'est là que beaucoup de revenus disparaissent silencieusement.\n\nNous travaillons avec **HubSpot, GoHighLevel, Salesforce**. À quoi ressemble votre configuration actuelle? Avez-vous un CRM en ce moment?`,
    de: `Das CRM-Stück ist im Grunde das Bindegewebe — es stellt sicher, dass jeder Lead aus jedem Kanal an einem Ort landet, bewertet wird und automatisch nachgefasst wird.\n\nViele Unternehmen, mit denen wir sprechen, haben Leads, die aus verschiedenen Quellen kommen, ohne dass irgendetwas sie verbindet. Da verschwinden viele Einnahmen still und leise.\n\nWir arbeiten mit **HubSpot, GoHighLevel, Salesforce**. Wie sieht Ihre aktuelle Konfiguration aus? Haben Sie überhaupt ein CRM?`,
    it: `La parte CRM è fondamentalmente il tessuto connettivo — assicura che ogni lead da ogni canale finisca in un posto, venga valutato e seguito automaticamente.\n\nMolte aziende con cui parliamo hanno lead che arrivano da posti diversi senza nulla che li colleghi. È lì che scompaiono silenziosamente molti ricavi.\n\nLavoriamo con **HubSpot, GoHighLevel, Salesforce**. Com'è la tua configurazione attuale? Hai già un CRM?`,
  },
  fallback: {
    en: `I'm not 100% sure what you're after, but I'll do my best to help. I know the most about what we build, how it works, pricing, timelines, and results we've seen with clients.\n\nIf you had something specific in mind just ask and I'll give you a straight answer. Or if it's easier, you could just book a quick call and talk to the team directly — they'll be able to help with pretty much anything.`,
    sq: `Nuk jam 100% i sigurt çfarë po kërkoni, por do të bëj çmundem të ndihmoj. Di më shumë rreth asaj që ndërtojmë, si funksionon, çmimet, afatet dhe rezultatet.\n\nNëse keni diçka specifike në mendje, thjesht pyesni dhe do t'ju jap një përgjigje të drejtpërdrejtë. Ose mund të rezervoni një thirrje të shpejtë dhe të flisni drejtpërdrejt me ekipin.`,
    es: `No estoy 100% seguro de lo que buscas, pero haré lo posible para ayudarte. Sé más sobre lo que construimos, cómo funciona, precios, plazos y resultados.\n\nSi tienes algo específico en mente simplemente pregunta y te daré una respuesta directa. O si es más fácil, puedes reservar una llamada rápida y hablar directamente con el equipo.`,
    fr: `Je ne suis pas sûr à 100% de ce que vous cherchez, mais je ferai de mon mieux pour vous aider. Je connais surtout ce que nous construisons, comment ça fonctionne, les prix, les délais et les résultats.\n\nSi vous avez quelque chose de spécifique en tête posez la question et je vous donnerai une réponse directe. Ou si c'est plus simple, vous pouvez réserver un rapide appel et parler directement à l'équipe.`,
    de: `Ich bin nicht 100% sicher, was Sie suchen, aber ich werde mein Bestes tun, um zu helfen. Ich kenne mich am besten damit aus, was wir bauen, wie es funktioniert, Preise, Zeitpläne und Ergebnisse.\n\nWenn Sie etwas Bestimmtes im Sinn haben, fragen Sie einfach und ich gebe Ihnen eine direkte Antwort. Oder wenn es einfacher ist, können Sie einen kurzen Anruf buchen und direkt mit dem Team sprechen.`,
    it: `Non sono sicuro al 100% di cosa stai cercando, ma farò del mio meglio per aiutarti. So di più su cosa costruiamo, come funziona, prezzi, tempistiche e risultati.\n\nSe hai qualcosa di specifico in mente chiedi pure e ti darò una risposta diretta. O se è più facile, puoi prenotare una rapida chiamata e parlare direttamente con il team.`,
  },

  industry: {
    en: `Good question — yes, we work across pretty much every industry. The AI systems we build adapt to whatever business you're running.\n\nSome of the industries we've worked with: dental clinics, gyms, real estate agencies, e-commerce stores, coaches, consultants, law firms, restaurants, beauty salons, SaaS companies, and more.\n\nHonestly, if your business takes leads or has customers it needs to communicate with — there's almost certainly an automation that makes sense for you. What kind of business are you running? That'll help me give you a more specific answer.`,
  },
  guarantee: {
    en: `Fair question — nobody wants to invest money and feel stuck if things don't go the way they hoped.\n\nHere's how we handle it: we do a proper strategy call before anything starts, so we're both clear on what the system will do and what success looks like. We don't take on projects unless we're confident we can deliver.\n\nAs for contracts — we don't lock you into long-term commitments. Once the system is built and delivered, it's yours. If you want ongoing support that's a separate conversation, but there's no forced minimum.\n\nIf something isn't right after launch, we fix it. Simple as that. Does that help?`,
  },
  difference: {
    en: `Honestly, a few things set us apart from most AI agencies out there.\n\nFirst — we're **specialists**, not generalists. We don't do websites, branding, or social media. We do AI automation, and we do it well because that's all we focus on.\n\nSecond — **speed**. Most agencies take months to deliver. We're typically live in 7-14 days.\n\nThird — we build **custom systems**, not plug-and-play tools with your logo slapped on them. Every system is built around your specific business, your leads, your sales process.\n\nAnd honestly? The results speak for themselves — 50+ businesses, consistent 3-10x ROI. What specifically were you comparing us to?`,
  },
  trust: {
    en: `That's a completely reasonable thing to think about — you're considering spending real money, so of course you want to know who you're dealing with.\n\nHere's what I can tell you: we've worked with 50+ businesses across different industries, and we don't take on projects we're not confident we can deliver on. You can find us on Instagram at **@upgpt_systems** to see what we're about.\n\nWe also don't ask for full payment upfront — the process is structured so there's a clear checkpoint before the final delivery.\n\nYour data is kept confidential, nothing gets shared, and the systems we build are hosted on your own accounts — you own everything. Anything specific you were worried about?`,
  },
  support_ongoing: {
    en: `Good thing to ask about before committing. Every system we deliver comes with a 30-day support window after launch — so if anything needs tweaking, we're on it.\n\nAfter that, we offer ongoing maintenance packages if you want us to keep managing things. Or if you prefer to run it yourself, we make sure you and your team know exactly how everything works before we hand it over.\n\nWe're also reachable by email if something urgent comes up. We're not the kind of agency that disappears after payment. What kind of support were you thinking you'd need?`,
  },
  technical: {
    en: `Not a problem at all — and honestly, most of our clients aren't particularly technical people.\n\nYou don't need to know how to code, you don't need to understand AI, and you don't need a developer on your team. We handle everything on the technical side. You just tell us what you need, we build it, and we walk you through how to use it.\n\nThe interfaces your team actually interacts with day-to-day are dead simple — dashboards, a conversation inbox, maybe a CRM. Nothing complex.\n\nIf you can use WhatsApp and email, you can manage what we build. Does that ease the concern a bit?`,
  },
  integration: {
    en: `Yes, integration is a big part of what we do — we don't build things that sit in isolation.\n\nFor websites, we can embed on WordPress, Wix, Squarespace, Webflow, Shopify, custom-built sites — basically anything. It's usually just a snippet of code your developer (or we) drop in.\n\nFor your existing tools, we integrate with most CRMs, email platforms, calendar software, and booking systems. If you're using HubSpot, GoHighLevel, Calendly, Google Calendar, Notion — we've connected to all of those before.\n\nWhat does your current tech stack look like? That'll tell me whether there's anything complicated to plan around.`,
  },
  location: {
    en: `We operate fully remotely, so location isn't really a barrier — we work with businesses across Europe, the UK, the US, and beyond.\n\nAll our calls are online, all delivery is digital, and we're used to working across time zones. You won't need to meet us in person for anything.\n\nAnything else you wanted to know?`,
  },
  examples: {
    en: `The chatbot you're talking to right now is actually one of our builds — so you're already seeing an example in action.\n\nFor more specific examples, that's best shown on a call where we can walk you through live systems we've built for businesses in your industry. We don't publicly post client work out of respect for their privacy, but we can absolutely show you relevant examples during a strategy session.\n\nWant to book a quick call and we can do exactly that?`,
  },
  growth: {
    en: `That's really what everything we build comes back to — helping businesses grow without having to throw more people at the problem.\n\nThe way we think about it: if you can capture every lead, follow up instantly, and qualify automatically — your team only ever speaks to people who are ready to buy. That's where the growth happens.\n\nMost of our clients see a meaningful jump in booked calls from the same amount of traffic they were already getting. No extra ad spend needed.\n\nWhat's the main thing holding back your growth right now? Is it not enough leads coming in, or leads that don't convert?`,
  },
  problem: {
    en: `Yeah, that's actually the conversation that leads a lot of our clients to us — something isn't working the way it should, and it's costing them.\n\nA lot of the time it comes down to the same things: leads falling through the cracks, follow-up happening too slow or not at all, or the team spending too much time on manual tasks that could be automated.\n\nIf any of that sounds familiar, there's almost certainly a system we could build that fixes it. Tell me a bit more about what you're dealing with — what's the specific thing that's frustrating you most?`,
  },
  social_proof: {
    en: `We've worked with 50+ businesses at this point, across a pretty wide range of industries. The feedback we hear most often is that clients wish they'd done it sooner.\n\nOne thing I'll be straight about — we don't post testimonials publicly, mostly because our clients are private about their results (understandably, since those results are a competitive advantage for them).\n\nWhat we can do is connect you with a relevant case during a strategy call, or just let the conversation speak for itself. The chatbot you're using right now is our own — if you're impressed by it, imagine what a fully custom version tuned to your business looks like.\n\nAnything specific you wanted to know about our track record?`,
  },
  ai_general: {
    en: `Good question. The AI we use is built on large language models — the same underlying technology behind ChatGPT and similar tools, but configured and trained specifically for your business.\n\nSo instead of a generic AI that knows everything about everything, what we build knows your products, your pricing, your sales process, your FAQs, your tone of voice. It answers questions the way you would, qualifies leads the way you would, and books calls the way you would — just 24/7 and at scale.\n\nYou don't need to understand the technical side for it to work. We handle all of that. Any specific aspect you were curious about?`,
  },
  small_business: {
    en: `Totally valid thing to wonder — and the answer is yes, small businesses are actually some of our best clients.\n\nThe Starter package at €1,497 is built exactly for this. You don't need a big team or a big budget for AI automation to work — you just need leads coming in and a process that converts them. If anything, smaller businesses often see a bigger impact because the automation does work that previously just wasn't getting done at all.\n\nOne of our clients was a solo dentist. Three new Invisalign cases in month one — covered the whole system.\n\nWhat size is your business right now?`,
  },
}

const resolve = (lang, intent) => R[intent]?.[lang] || R[intent]?.en || R.fallback.en

// ─── Starter prompts ───────────────────────────────────────────────────────

export const STARTER_PROMPTS = {
  en: [
    { icon: '💼', text: 'What services do you offer?' },
    { icon: '💰', text: 'How much does it cost?' },
    { icon: '📈', text: 'What results do clients get?' },
    { icon: '📅', text: 'Book a free strategy call' },
  ],
  sq: [
    { icon: '💼', text: 'Çfarë shërbimesh ofroni?' },
    { icon: '💰', text: 'Sa kushton?' },
    { icon: '📈', text: 'Çfarë rezultatesh marrin klientët?' },
    { icon: '📅', text: 'Rezervoni thirrje strategjie falas' },
  ],
  es: [
    { icon: '💼', text: '¿Qué servicios ofrecen?' },
    { icon: '💰', text: '¿Cuánto cuesta?' },
    { icon: '📈', text: '¿Qué resultados logran los clientes?' },
    { icon: '📅', text: 'Reservar llamada estratégica gratuita' },
  ],
  fr: [
    { icon: '💼', text: 'Quels services proposez-vous?' },
    { icon: '💰', text: 'Combien ça coûte?' },
    { icon: '📈', text: 'Quels résultats obtiennent les clients?' },
    { icon: '📅', text: 'Réserver un appel stratégique gratuit' },
  ],
  de: [
    { icon: '💼', text: 'Welche Dienstleistungen bieten Sie an?' },
    { icon: '💰', text: 'Was kostet es?' },
    { icon: '📈', text: 'Welche Ergebnisse erzielen Kunden?' },
    { icon: '📅', text: 'Kostenlosen Strategiegespräch buchen' },
  ],
  it: [
    { icon: '💼', text: 'Quali servizi offrite?' },
    { icon: '💰', text: 'Quanto costa?' },
    { icon: '📈', text: 'Che risultati ottengono i clienti?' },
    { icon: '📅', text: 'Prenota una chiamata strategica gratuita' },
  ],
}

export const getStarterPrompts = (lang) => STARTER_PROMPTS[lang] || STARTER_PROMPTS.en

export const getGreeting = (lang) => R.greeting[lang] || R.greeting.en

// ─── Main entry point ──────────────────────────────────────────────────────

export const processMessage = (userText, _history = [], preferredLang = 'en') => {
  const lang    = detectLanguage(userText, preferredLang)
  const intent  = detectIntent(userText)
  const text    = resolve(lang, intent)
  const typingMs = Math.min(2200, Math.max(750, text.length * 11))

  return { text, lang, intent, typingMs, navigateTo: intent === 'booking' ? '/contact' : null }
}
