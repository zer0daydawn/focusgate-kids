(function () {
  const STRINGS = {
    fr: {
      'Parent Dashboard': 'Tableau de bord parent',
      'Overview': 'Aperçu',
      'Blocked Sites': 'Sites bloqués',
      'Schedules & Dates': 'Horaires et dates',
      'Simulator': 'Simulateur',
      'Advanced JSON': 'JSON avancé',
      'PIN Locked': 'PIN verrouillé',
      'Parent Unlocked': 'Parent déverrouillé',
      '● Shield Active': '● Protection active',
      '○ Shield Off': '○ Protection désactivée',
      'School & Homework Routine': 'Routine école et devoirs',
      '⚡ Grant 15-Min Screen Pass': '⚡ Accorder 15 min de temps écran',
      'Adjust Schedule Hours': 'Modifier les horaires',
      "Today's 24-Hour Routine Timeline": 'Routine des 24 heures aujourd’hui',
      'Wildcard Sub-Paths Covered': 'Sous-chemins couverts',
      'Auto-blocked under parent domain': 'Bloqués automatiquement sous le domaine parent',
      'Extreme Brainrot Feeds': 'Flux très distrayants',
      'Guarded during routine hours': 'Protégés pendant les heures définies',
      'Bedtime Sleep Sanctuary': 'Protection à l’heure du coucher',
      'No late-night blue light binge': 'Aucune utilisation tardive prolongée',
      'Parent Security Lock': 'Verrou parental',
      'Child cannot bypass in Chrome': 'Les réglages sont protégés dans Chrome',
      '💡 Healthy Offline Alternatives Shown to Your Child': '💡 Alternatives hors écran proposées à votre enfant',
      'Protected Children\'s Websites & Wildcard Patterns': 'Sites protégés et modèles génériques',
      '+ Add Custom Domain / Pattern': '+ Ajouter un domaine / modèle',
      'Add Custom Distracting Website or Wildcard Pattern': 'Ajouter un site ou modèle à limiter',
      'Platform Name': 'Nom de la plateforme',
      'Domain or Wildcard Pattern': 'Domaine ou modèle générique',
      'Category': 'Catégorie',
      'Short Video / Reels': 'Vidéos courtes / Reels',
      'Gaming & Streams': 'Jeux et diffusion',
      'Social Media & Chat': 'Réseaux sociaux et clavardage',
      'Cartoons & Video': 'Dessins animés et vidéos',
      'Cancel': 'Annuler',
      'Add to Blocklist': 'Ajouter à la liste de blocage',
      'Platform': 'Plateforme',
      'Pattern / Domain': 'Modèle / Domaine',
      'Sub-Paths Covered': 'Sous-chemins couverts',
      'Protection Status': 'État de protection',
      'Screen Time Schedules & Calendar Dates': 'Horaires de temps écran et dates',
      'Configure recurring routines and one-day exceptions.': 'Configurez les routines récurrentes et les exceptions d’une journée.',
      '+ Add Schedule': '+ Ajouter un horaire',
      '+ Add Date': '+ Ajouter une date',
      'Daily Usage Quotas': 'Quotas d’utilisation quotidiens',
      "Reset Today's Usage": 'Réinitialiser l’utilisation du jour',
      'Grace-period warning': 'Avertissement avant blocage',
      'Enabled': 'Activé',
      'min before block': 'min avant le blocage',
      'Add Schedule': 'Ajouter un horaire',
      'Edit Schedule': 'Modifier l’horaire',
      'Name': 'Nom',
      'Start': 'Début',
      'End': 'Fin',
      'Days': 'Jours',
      'Mon': 'Lun', 'Tue': 'Mar', 'Wed': 'Mer', 'Thu': 'Jeu', 'Fri': 'Ven', 'Sat': 'Sam', 'Sun': 'Dim',
      'Mode': 'Mode',
      'Block during this window': 'Bloquer pendant cette période',
      'Allow only during this window': 'Autoriser seulement pendant cette période',
      'Categories': 'Catégories',
      'Short video': 'Vidéo courte', 'Social': 'Social', 'Gaming': 'Jeux', 'Long video': 'Vidéo longue', 'Custom': 'Personnalisé',
      'Save Schedule': 'Enregistrer l’horaire',
      'Routine Name': 'Nom de la routine', 'Hours Window': 'Période', 'Active': 'Actif', 'Actions': 'Actions',
      'Add Date Override': 'Ajouter une exception de date', 'Edit Date Override': 'Modifier l’exception de date',
      'Date': 'Date', 'Action': 'Action', 'Block all day': 'Bloquer toute la journée', 'Allow all day': 'Autoriser toute la journée',
      'Notes': 'Notes', 'Save Date': 'Enregistrer la date',
      '📅 Calendar Date Overrides': '📅 Exceptions par date',
      'Wildcard URL Simulator': 'Simulateur d’URL générique',
      'Test Website URL (Sub-paths supported)': 'URL du site à tester (sous-chemins pris en charge)',
      'Simulated Time': 'Heure simulée', 'Evaluate Wildcard': 'Évaluer le modèle',
      'Shield Active · Blocked': 'Protection active · Bloqué',
      'Blocked by Wildcard Matching Engine': 'Bloqué par le moteur de correspondance',
      'Extension Configuration (JSON)': 'Configuration de l’extension (JSON)',
      'Save Raw JSON': 'Enregistrer le JSON',
      '🔒 Parent Authorization': '🔒 Autorisation parentale',
      'Enter your 4-digit Parent PIN to unlock modifications:': 'Entrez le PIN parental à 4 chiffres pour autoriser les modifications :',
      'Wrong PIN': 'PIN incorrect', 'Unlock': 'Déverrouiller', 'Default PIN is': 'Le PIN par défaut est',
      'Brain-Rot Protected': 'Protection FocusGate active',
      'Time for Real-World Play!': 'C’est le moment de faire autre chose !',
      'Go Back & Do Something Else': 'Retourner et faire autre chose',
      'Parent PIN Override': 'Dérogation avec PIN parental',
      'Verify': 'Vérifier',
      '💡 Healthy Fun Ideas Right Now': '💡 Idées d’activités pour maintenant',
      'Read a comic book, fantasy novel, or mystery story': 'Lire une BD, un roman fantastique ou une histoire policière',
      'Build something awesome with Lego, blocks, or cardboard': 'Construire quelque chose avec des Lego, des blocs ou du carton',
      'Ride your bicycle, skateboard, or toss a ball outside': 'Faire du vélo, de la planche ou jouer dehors',
      'Draw a superhero, design an invention, or color': 'Dessiner un superhéros, inventer quelque chose ou colorier',
      'Parent Pass Active': 'Passe parentale active',
      'Protection Paused': 'Protection en pause',
      'Enabled via Parent Dashboard': 'Activation depuis le tableau de bord parent',
      'Brain-Rot Shield Active': 'Protection FocusGate active',
      'Guarding YouTube Shorts, TikTok & Social': 'Protection des vidéos courtes, réseaux sociaux et sites configurés',
      'PROTECTED': 'PROTÉGÉ', 'PAUSED': 'PAUSE',
      'Open Parent Dashboard': 'Ouvrir le tableau de bord parent',
      'Parent PIN': 'PIN parental',
      'Grant 15-Min Pass': 'Accorder 15 min',
      '4-Digit PIN': 'PIN à 4 chiffres',
      'UNLOCKED': 'DÉVERROUILLÉ',
      '15-Minute screen pass granted for your child!': 'Passe de 15 minutes accordée.',
      'Guarded by Schedule': 'Protégé par horaire', 'Allowed All Times': 'Toujours autorisé',
      'Blocked Window': 'Période bloquée', 'Allowed Window': 'Période autorisée',
      'Off': 'Désactivé', 'Edit': 'Modifier', 'Delete': 'Supprimer',
      'Enter a name, start time, and end time.': 'Entrez un nom, une heure de début et une heure de fin.',
      'Select at least one day.': 'Sélectionnez au moins un jour.',
      'Select at least one category.': 'Sélectionnez au moins une catégorie.',
      'Enter a date and name.': 'Entrez une date et un nom.',
      'Reset all usage counters for today?': 'Réinitialiser tous les compteurs d’utilisation pour aujourd’hui ?',
      '✓ Saved successfully!': '✓ Enregistré avec succès !',
      'Invalid JSON: ': 'JSON invalide : ',
      'minutes left before shield re-engages': 'minutes avant la reprise de la protection',
      '✓ Pass granted for 15 minutes!': '✓ Passe accordée pour 15 minutes !',
      ' is Paused Right Now': ' est en pause pour le moment',
      'Incorrect Parent PIN. Please try again.': 'PIN parental incorrect. Réessayez.',
      'Language': 'Langue',
      'Anti-Brainrot Active': 'Protection FocusGate active',
      'Short videos & social feeds blocked': 'Vidéos courtes et réseaux sociaux bloqués',
      'Parent Lock: Enter PIN for 15-min pass': 'Verrou parental : entrez le PIN pour une passe de 15 min',
      'Parent PIN (Default 1234)': 'PIN parental (1234 par défaut)',
      'Grant 15-Min Allowance': 'Accorder 15 minutes',
      '⚙️ Open Full Parent Dashboard': '⚙️ Ouvrir le tableau de bord parent',
      'Screen Break Time! - FocusGate Kids': 'Pause écran - FocusGate Kids',
      'Access to': 'Accès à',
      'this video or social site': 'ce site vidéo ou social',
      'is currently paused by your scheduled screen time routine.': 'est actuellement en pause selon votre horaire de temps écran.',
      '"Real adventures happen in the real world! Give your brain a break from the screen."': '« Les vraies aventures se passent dans le monde réel ! Fais une pause d’écran. »',
      'Enter 4-Digit Parent PIN for a 15-minute pass:': 'Entrez le PIN parental à 4 chiffres pour une passe de 15 minutes :',
      '● Anti-Brainrot Routine Active · Wildcard Matching Engaged': '● Routine FocusGate active · Correspondance générique activée',
      'Parent domain and all sub-paths (including /shorts, /live, /feed, /reels) are automatically blocked under your scheduled routine.': 'Le domaine parent et tous ses sous-chemins (dont /shorts, /live, /feed, /reels) sont automatiquement bloqués selon votre horaire.',
      '🟣 Blocked Hours (School / Bedtime)   🟢 Allowed Play': '🟣 Heures bloquées (école / coucher)   🟢 Temps libre autorisé',
      '00:00 (Sleep)': '00:00 (Sommeil)', '08:00 (School)': '08:00 (École)', '16:00 (Homework)': '16:00 (Devoirs)', '20:30 (Bedtime)': '20:30 (Coucher)',
      'When an addictive site is blocked, FocusGate shows inspiring real-world ideas instead of cold errors:': 'Lorsqu’un site est bloqué, FocusGate propose des idées d’activités hors écran plutôt qu’un simple message d’erreur :',
      '📚 Read a comic book, fantasy or mystery story (20m)': '📚 Lire une BD ou une histoire fantastique/policière (20 min)',
      '🧱 Build an invention with Lego, blocks or cardboard (30m)': '🧱 Construire quelque chose avec des Lego, des blocs ou du carton (30 min)',
      '🚲 Ride a bike, skateboard or play outside (45m)': '🚲 Faire du vélo, de la planche ou jouer dehors (45 min)',
      '🎨 Draw a superhero, comic or design an invention (25m)': '🎨 Dessiner un superhéros, une BD ou une invention (25 min)',
      'Blocking a parent domain like': 'Bloquer un domaine parent comme',
      'Counts only active use while the site is otherwise allowed. Reaching the limit blocks that category until the next day.': 'Compte uniquement l’utilisation active lorsque le site est autrement autorisé. Lorsque la limite est atteinte, la catégorie est bloquée jusqu’au lendemain.',
      'Warn on the active protected site before a schedule cutoff or daily quota is reached.': 'Avertit sur le site protégé actif avant la fin d’un horaire ou l’atteinte du quota quotidien.',
      'One-day exceptions override the recurring routine for the selected categories.': 'Les exceptions d’une journée remplacent la routine récurrente pour les catégories sélectionnées.',
      'Test any sub-path (e.g.': 'Tester n’importe quel sous-chemin (ex. :',
      'Direct JSON backup or sync across multiple family computers:': 'Sauvegarde JSON directe ou synchronisation entre plusieurs ordinateurs familiaux :',
      'Default PIN is': 'Le PIN par défaut est',
      'English': 'English', 'French': 'Français',
      'Block page theme': 'Thème de la page de blocage',
      'Calm': 'Calme',
      'Playful': 'Ludique'
    }
  };

  let lang = 'en';
  function normalizeLang(v) { return v === 'fr' ? 'fr' : 'en'; }
  function t(text) {
    if (lang === 'en') return text;
    return STRINGS.fr[text] || text;
  }
  function apply(root = document) {
    document.documentElement.lang = lang;
    const walker = document.createTreeWalker(root.body || root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const raw = node.nodeValue;
      if (!raw || !raw.trim()) continue;
      const lead = raw.match(/^\s*/)?.[0] || '';
      const trail = raw.match(/\s*$/)?.[0] || '';
      const core = raw.trim();
      const translated = t(core);
      if (translated !== core) node.nodeValue = lead + translated + trail;
    }
    root.querySelectorAll?.('[placeholder]').forEach(el => {
      const p = el.getAttribute('placeholder');
      const translated = t(p);
      if (translated !== p) el.setAttribute('placeholder', translated);
    });
  }
  async function load() {
    try {
      const data = await chrome.storage.local.get(['focusGateConfig']);
      lang = normalizeLang(data.focusGateConfig?.settings?.language);
    } catch (_) {}
    apply();
    return lang;
  }
  async function setLanguage(next) {
    lang = normalizeLang(next);
    const data = await chrome.storage.local.get(['focusGateConfig']);
    const cfg = data.focusGateConfig || { settings: {} };
    cfg.settings = cfg.settings || {};
    cfg.settings.language = lang;
    await chrome.storage.local.set({ focusGateConfig: cfg });
    location.reload();
  }
  window.fgI18n = { t, apply, load, setLanguage, get language() { return lang; } };
  document.addEventListener('DOMContentLoaded', load);
})();
