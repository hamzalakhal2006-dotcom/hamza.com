"use strict";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-enabled");

  const heroVisual = document.querySelector(".hero-visual");
  const heroVideo = heroVisual?.querySelector("video");
  if (heroVisual && heroVideo) {
    heroVideo.addEventListener("playing", () => heroVisual.classList.add("has-playing-video"));
    heroVideo.addEventListener("error", () => heroVisual.classList.remove("has-playing-video"));
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#navigation");

  if (menuToggle && navigation) {
    let previousBodyOverflow = "";
    const closeNavigation = (returnFocus = false) => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
      navigation.classList.remove("is-open");
      document.body.classList.remove("mobile-navigation-open");
      document.body.style.overflow = previousBodyOverflow;
      if (returnFocus) {
        menuToggle.focus();
      }
    };
    const openNavigation = () => {
      previousBodyOverflow = document.body.style.overflow;
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Fermer le menu");
      navigation.classList.add("is-open");
      document.body.classList.add("mobile-navigation-open");
      navigation.querySelector("a")?.focus({ preventScroll: true });
    };
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeNavigation();
      } else {
        openNavigation();
      }
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeNavigation();
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeNavigation(true);
      }
    });
    window.matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
      if (event.matches && menuToggle.getAttribute("aria-expanded") === "true") {
        closeNavigation();
      }
    });
  }

  const languageSwitcher = document.querySelector("#language-switcher");
  if (languageSwitcher instanceof HTMLSelectElement) {
    const originalCopy = new Map();
    const originalTitle = document.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const originalDescription = descriptionTag?.getAttribute("content") || "";
    const localizedSeo = {
      en: {
        title: "Les Pierres De Hamza | Natural Moroccan Stone Supplier",
        description: "Natural Moroccan stone supplier based in Taza – Oued Amlil. Explore our stone selection and request a quotation for your project."
      },
      ar: {
        title: "LES PIERRES DE HAMZA | مورد الحجر الطبيعي المغربي",
        description: "مورد للحجر الطبيعي المغربي من تازة – واد أمليل. اكتشفوا مجموعتنا واطلبوا عرض سعر لمشروعكم."
      }
    };
    const translations = {
      en: {
        ".main-nav > a:nth-child(1)": "Home",
        ".main-nav > a:nth-child(2)": "Our stone",
        ".main-nav > a:nth-child(3)": "Applications",
        ".main-nav > a:nth-child(4)": "About",
        ".main-nav > a:nth-child(5)": "Export",
        ".main-nav > a:nth-child(6)": "Contact",
        ".main-nav > a:nth-child(7)": "Request a quote",
        ".hero .eyebrow": "TAZA, MOROCCO · NATURAL STONE",
        ".hero-tagline": "Natural Moroccan Stone,<br>Sourced with Character.",
        ".hero-copy": "Direct quarry sourcing, careful selection and project-specific formats for residential and architectural projects in Morocco and abroad.",
        ".hero-actions .button-light": "Discover our stones <span aria-hidden=\"true\">↘</span>",
        ".hero-actions .button-outline-light": "Request a quote <span aria-hidden=\"true\">↗</span>",
        ".hero-whatsapp": "WhatsApp <span aria-hidden=\"true\">↗</span>",
        "#pierres .section-heading h2": "Our natural <em>stone</em>",
        "#pierres .section-heading > p": "Explore the textures and tones in our selection. Formats, finishes and availability are confirmed for each project.",
        "#processus .section-heading h2": "From source to <em>project.</em>",
        "#professionnels .professionals-copy h2": "The right material,<br><em>for your project.</em>",
        "#professionnels .professionals-copy > p:last-child": "Architects, designers, contractors, developers, importers and distributors: share your specifications so we can review relevant materials and options.",
        ".intro-stats-eyebrow": "COLLECTION AT A GLANCE",
        ".stat-references-label": "listed references",
        ".stat-collections-label": "stone collections",
        ".stat-languages-label": "site languages",
        "#professionnels .professional-actions .button": "Have a project? Send us your dimensions and quantities.",
        "#export .export-content h2": "From Morocco to<br><em>your project.</em>",
        "#export .export-content > p:not(.eyebrow)": "We review enquiries from Morocco and abroad. Share your destination so we can discuss suitable preparation and delivery options.",
        "#devis .quote-heading h2": "Have a project?<br><em>Let’s talk.</em>",
        "#devis .form-submit": "Request a quotation <span aria-hidden=\"true\">↗</span>",
        "#contact .contact-main h2": "Have a project?<br><em>Let’s talk.</em>",
        "#contact .contact-main > p:not(.eyebrow)": "Les Pierres De Hamza is a natural stone supplier based in Taza – Oued Amlil, Morocco. Get in touch to discuss your stone and project.",
        "#contact .contact-main .button": "Message us on WhatsApp <span aria-hidden=\"true\">↗</span>"
      },
      ar: {
        ".main-nav > a:nth-child(1)": "الرئيسية",
        ".main-nav > a:nth-child(2)": "أحجارنا",
        ".main-nav > a:nth-child(3)": "التطبيقات",
        ".main-nav > a:nth-child(4)": "من نحن",
        ".main-nav > a:nth-child(5)": "التصدير",
        ".main-nav > a:nth-child(6)": "اتصل بنا",
        ".main-nav > a:nth-child(7)": "طلب عرض سعر",
        ".hero .eyebrow": "تازة، المغرب · حجر طبيعي",
        ".hero-tagline": "حجر طبيعي مغربي<br>لعمارة تنبض بالأصالة.",
        ".hero-copy": "توريد مباشر من المقالع، واختيار بعناية، ومقاسات تناسب المشاريع السكنية والمعمارية في المغرب وخارجه.",
        ".hero-actions .button-light": "اكتشف أحجارنا <span aria-hidden=\"true\">↘</span>",
        ".hero-actions .button-outline-light": "اطلب عرض سعر <span aria-hidden=\"true\">↗</span>",
        ".hero-whatsapp": "واتساب <span aria-hidden=\"true\">↗</span>",
        "#pierres .section-heading h2": "أحجارنا <em>الطبيعية</em>",
        "#pierres .section-heading > p": "اكتشفوا خامات وألوان مجموعتنا. يتم تأكيد المقاسات والتشطيبات والتوفر وفق كل مشروع.",
        "#processus .section-heading h2": "من المصدر إلى <em>المشروع.</em>",
        "#professionnels .professionals-copy h2": "الخامة المناسبة،<br><em>لمشروعكم.</em>",
        "#professionnels .professionals-copy > p:last-child": "للمهندسين المعماريين والمصممين والمقاولين والمطورين والمستوردين والموزعين: أرسلوا متطلباتكم لدراسة الخامات والخيارات المناسبة.",
        ".intro-stats-eyebrow": "لمحة عن المجموعة",
        ".stat-references-label": "مرجعًا مدرجًا",
        ".stat-collections-label": "مجموعات من الحجر",
        ".stat-languages-label": "لغات الموقع",
        "#professionnels .professional-actions .button": "لديكم مشروع؟ أرسلوا إلينا المقاسات والكميات.",
        "#export .export-content h2": "من المغرب إلى<br><em>مشروعكم.</em>",
        "#export .export-content > p:not(.eyebrow)": "ندرس الطلبات من المغرب والخارج. يرجى تحديد وجهة التسليم لمناقشة خيارات التجهيز والتسليم المناسبة.",
        "#devis .quote-heading h2": "لديكم مشروع؟<br><em>لنتحدث عنه.</em>",
        "#devis .form-submit": "اطلبوا عرض سعر <span aria-hidden=\"true\">↗</span>",
        "#contact .contact-main h2": "لديكم مشروع؟<br><em>لنتحدث عنه.</em>",
        "#contact .contact-main > p:not(.eyebrow)": "شركة LES PIERRES DE HAMZA مورّد للحجر الطبيعي، مقرها تازة – واد أمليل، المغرب. تواصلوا معنا لمناقشة الحجر ومشروعكم.",
        "#contact .contact-main .button": "راسلونا عبر واتساب <span aria-hidden=\"true\">↗</span>"
      }
    };

    const applyLanguage = (language) => {
      const dictionary = translations[language];
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.title = localizedSeo[language]?.title || originalTitle;
      descriptionTag?.setAttribute("content", localizedSeo[language]?.description || originalDescription);
      const selectors = new Set(Object.keys(translations.en).concat(Object.keys(translations.ar)));
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          if (!originalCopy.has(element)) {
            originalCopy.set(element, element.innerHTML);
          }
          element.innerHTML = dictionary?.[selector] || originalCopy.get(element);
        });
      });
      languageSwitcher.value = language;
    };

    languageSwitcher.addEventListener("change", () => applyLanguage(languageSwitcher.value));
    const mobileLanguageButtons = document.querySelectorAll(".mobile-language-options [data-language]");
    const updateMobileLanguageButtons = () => {
      mobileLanguageButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.language === languageSwitcher.value));
      });
    };
    mobileLanguageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const language = button.dataset.language;
        if (language && ["fr", "en", "ar"].includes(language)) {
          languageSwitcher.value = language;
          languageSwitcher.dispatchEvent(new Event("change", { bubbles: true }));
          updateMobileLanguageButtons();
        }
      });
    });
    languageSwitcher.addEventListener("change", updateMobileLanguageButtons);
    updateMobileLanguageButtons();
  }

  const makeProductMessage = (product) =>
    `Hello, I am interested in ${product}. I would like information about availability, dimensions, finishes and pricing.`;

  const quoteForm = document.querySelector("#quote-form");
  if (quoteForm) {
    const quoteFile = quoteForm.querySelector("#quote-file");
    const formNote = quoteForm.querySelector("#form-note");
    const defaultFormNote = "Votre demande s’ouvrira dans WhatsApp. Vérifiez les détails, puis joignez manuellement votre photo ou plan si vous en avez choisi un. Aucune donnée n’est enregistrée sur ce site.";
    const acceptedFileTypes = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
    const validateAttachment = () => {
      if (!(quoteFile instanceof HTMLInputElement)) {
        return true;
      }

      const file = quoteFile.files?.[0];
      if (!file) {
        quoteFile.setCustomValidity("");
        if (formNote) {
          formNote.textContent = defaultFormNote;
        }
        return true;
      }

      let error = "";
      if (!acceptedFileTypes.has(file.type)) {
        error = "Choisissez une image JPG, PNG ou WebP, ou un document PDF.";
      } else if (file.size > 10 * 1024 * 1024) {
        error = "Le fichier doit faire 10 Mo ou moins.";
      }

      quoteFile.setCustomValidity(error);
      if (formNote) {
        formNote.textContent = error || defaultFormNote;
      }
      if (error) {
        quoteFile.reportValidity();
      }
      return !error;
    };

    quoteFile?.addEventListener("change", validateAttachment);
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateAttachment() || !quoteForm.reportValidity()) {
        return;
      }

      const formData = new FormData(quoteForm);
      const attachment = quoteFile instanceof HTMLInputElement ? quoteFile.files?.[0] : undefined;
      const message = [
        "Hello Les Pierres De Hamza, I would like to request a quotation.",
        "",
        `Name: ${formData.get("nom")}`,
        `Company: ${formData.get("entreprise") || "Not provided"}`,
        `Destination country: ${formData.get("pays") || "Not provided"}`,
        `Email: ${formData.get("email") || "Not provided"}`,
        `WhatsApp / Phone: ${formData.get("whatsapp") || "Not provided"}`,
        `Stone: ${formData.get("pierre")}`,
        `Quantity: ${formData.get("quantite") || "Not provided"}`,
        `Format / dimensions: ${formData.get("formatDimensions") || "Not provided"}`,
        `Thickness: ${formData.get("epaisseur") || "Not provided"}`,
        `Finish: ${formData.get("finition") || "Not provided"}`,
        `Message: ${formData.get("message") || "Not provided"}`,
        ...(attachment ? [`File to attach manually in WhatsApp: ${attachment.name}`] : [])
      ].join("\n");

      const whatsappUrl = `https://wa.me/212767870765?text=${encodeURIComponent(message)}`;
      const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }
    });
  }

  const catalogControls = {
    search: document.querySelector("#stone-search"),
    category: document.querySelector("#stone-category"),
    color: document.querySelector("#stone-color"),
    application: document.querySelector("#stone-application"),
    origin: document.querySelector("#stone-origin"),
    reset: document.querySelector("#stone-reset"),
    result: document.querySelector("#catalog-result")
  };
  const stoneGrid = document.querySelector("#stone-grid");
  const carouselViewport = document.querySelector("#stone-carousel-viewport");
  const collectionTabs = document.querySelector("#stone-collection-tabs");
  const carouselProgress = document.querySelector("#stone-carousel-progress");
  const carouselProgressFill = document.querySelector("#stone-carousel-progress-fill");
  const carouselCount = document.querySelector("#stone-carousel-count");
  const carouselFeatureInfo = document.querySelector("#stone-feature-info");
  const carouselPrevious = document.querySelector("#stone-carousel-previous");
  const carouselNext = document.querySelector("#stone-carousel-next");
  const carouselRing = document.querySelector("#stone-orbit-ring");
  const carouselCaption = document.querySelector("#stone-orbit-caption");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let carouselSlides = [];
  let carouselActiveIndex = 0;
  let carouselTimer = 0;
  let carouselDragging = false;
  let carouselSuppressClick = false;
  let carouselPointerStart = 0;
  let carouselPointerId = null;
  let carouselDragOffset = 0;
  const normalizeCatalogValue = (value) =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  const getStoneFamily = (name) => {
    const normalized = normalizeCatalogValue(name);
    if (normalized.includes("eclate beige") || normalized.includes("beige eclatee")) return "Éclaté Beige";
    if (/^(beige taza|pierre taza beige)/.test(normalized)) return "Beige Taza";
    if (/^(gris taza|pierre taza grise)/.test(normalized)) return "Pierre de Taza Grise";
    if (normalized === "zola vieille") return "Marbre";
    if (normalized === "volubilis") return "Travertin Volubilis";
    if (normalized === "gris khenifra") return "Granit";
    return name;
  };
  const getStoneCategory = (name) => {
    const normalized = normalizeCatalogValue(name);
    if (normalized.includes("ardoise")) return "ardoise";
    if (normalized.includes("marbre") || normalized.includes("zola vieille") || normalized === "bir jdid") return "marbre";
    if (normalized.includes("granit") || normalized.includes("khenifra")) return "granit";
    if (normalized.includes("taza") || normalized.includes("volubilis")) return "taza";
    return "pierre naturelle";
  };
  const getStoneCollection = (name) => {
    const normalized = normalizeCatalogValue(name);
    if (normalized.includes("taza")) return "taza";
    if (normalized.includes("volubilis")) return "travertin";
    if (normalized.includes("ardoise")) return "ardoise";
    if (normalized.includes("marbre") || normalized.includes("zola vieille") || normalized === "bir jdid") return "marbre";
    if (normalized.includes("granit") || normalized.includes("khenifra")) return "granit";
    return "autres";
  };
  const getStoneImageDirectory = (name) => {
    const normalized = normalizeCatalogValue(name);
    if (/^(beige taza|pierre taza beige)/.test(normalized)) return "beige-taza";
    if (/^(gris taza|pierre taza grise|eclate gris taza)/.test(normalized)) return "pierre-taza-grise";
    if (normalized.includes("volubilis")) return "travertin-volubilis";
    if (normalized.includes("ardoise")) return "ardoise-multicolore";
    if (normalized.includes("marbre") || normalized === "zola vieille" || normalized === "bir jdid") return "marbre";
    if (normalized.includes("khenifra") || normalized.includes("granit")) return "granit";
    if (normalized.includes("azilal")) return "noir-azilal";
    if (normalized.includes("volcanique")) return "pierre-volcanique-noire";
    if (normalized.includes("eclate")) return "eclate-beige";
    if (normalized.includes("carthabon")) return "pierre-naturelle";
    return "pierre-naturelle";
  };
  const getStoneImageCandidates = (name, filename, legacySource = "") => {
    const basename = filename.replace(/\.[^.]+$/, "");
    const extensions = ["jpg", "jpeg", "png", "webp"];
    const paths = [
      ...extensions.map((extension) => `stones/${getStoneImageDirectory(name)}/${basename}.${extension}`),
      ...extensions.map((extension) => `images/stones/${basename}.${extension}`),
      ...extensions.map((extension) => `images/stones/official/${basename}.${extension}`),
      legacySource,
      ...extensions.map((extension) => `../images/stones/${basename}.${extension}`),
      ...extensions.map((extension) => `../images/stones/official/${basename}.${extension}`)
    ];
    return [...new Set(paths.filter(Boolean))];
  };
  const setImageSourceWithFallback = (image, candidates) => {
    let candidateIndex = 0;
    image.onerror = () => {
      candidateIndex += 1;
      if (candidateIndex < candidates.length) {
        image.src = candidates[candidateIndex];
      }
    };
    image.src = candidates[candidateIndex];
  };
  const collectionDefinitions = [
    { id: "taza", label: "Pierre de Taza" },
    { id: "travertin", label: "Travertin" },
    { id: "granit", label: "Granit" },
    { id: "marbre", label: "Marbre" },
    { id: "ardoise", label: "Ardoise" },
    { id: "autres", label: "Autres pierres" }
  ];
  let activeCollection = "toutes";
  const stoneCards = [...document.querySelectorAll(".stone-card")];
  const cardsByFamily = new Map();
  const usedImageSources = new Set([...document.images].map((image) => image.getAttribute("src")).filter(Boolean));

  stoneCards.forEach((card) => {
    const name = card.dataset.product || card.querySelector("h3")?.textContent || "Pierre naturelle";
    const family = getStoneFamily(name);
    card.dataset.family = family;
    card.dataset.category = getStoneCategory(name);
    card.dataset.collection = getStoneCollection(name);
    card.__referenceCount = 0;
    const image = card.querySelector(".stone-image img");
    const imageSource = image?.getAttribute("src") || "";
    const imageFilename = imageSource.split("/").pop() || "";
    card.__gallery = image
      ? [{
        src: imageSource,
        imageCandidates: getStoneImageCandidates(name, imageFilename, imageSource),
        alt: image.alt,
        label: name,
        url: ""
      }]
      : [];
    cardsByFamily.set(normalizeCatalogValue(family), card);
  });

  const newStoneGroups = new Map();
  const noDuplicateImageProducts = [];
  const officialStones = Array.isArray(window.hamzaStoneCatalog) ? window.hamzaStoneCatalog : [];

  officialStones.forEach((stone) => {
    const imageCandidates = getStoneImageCandidates(
      stone.name,
      stone.image,
      `images/stones/official/${stone.image}`
    );
    const source = imageCandidates[0];
    const family = getStoneFamily(stone.name);
    const familyKey = normalizeCatalogValue(family);
    const currentCard = cardsByFamily.get(familyKey);
    const currentGallery = currentCard?.__gallery || [];
    if (currentCard) {
      currentCard.__referenceCount += 1;
    }
    if (currentCard && currentGallery.some((image) => image.src === source)) {
      if (stone.name !== family) {
        const copy = currentCard.querySelector(".stone-copy");
        const hasLink = [...(copy?.querySelectorAll(".official-product-reference") || [])]
          .some((link) => link.href.endsWith(`/produits/${stone.url}`));
        if (copy && !hasLink) {
          const referenceLink = document.createElement("a");
          referenceLink.className = "official-product-reference";
          referenceLink.href = `https://lespierresdehamza.com/produits/${stone.url}`;
          referenceLink.target = "_blank";
          referenceLink.rel = "noopener noreferrer";
          referenceLink.textContent = `${stone.name} · fiche officielle ↗`;
          copy.append(referenceLink);
        }
      }
      return;
    }

    if (currentCard && usedImageSources.has(source)) {
      if (stone.name !== family) {
        const copy = currentCard.querySelector(".stone-copy");
        const hasLink = [...(copy?.querySelectorAll(".official-product-reference") || [])]
          .some((link) => link.href.endsWith(`/produits/${stone.url}`));
        if (copy && !hasLink) {
          const referenceLink = document.createElement("a");
          referenceLink.className = "official-product-reference";
          referenceLink.href = `https://lespierresdehamza.com/produits/${stone.url}`;
          referenceLink.target = "_blank";
          referenceLink.rel = "noopener noreferrer";
          referenceLink.textContent = `${stone.name} · fiche officielle ↗`;
          copy.append(referenceLink);
        }
      }
      return;
    }

    if (usedImageSources.has(source)) {
      noDuplicateImageProducts.push(stone);
      return;
    }

    usedImageSources.add(source);
    const galleryItem = {
      src: source,
      imageCandidates,
      alt: `${stone.name} — pierre naturelle`,
      label: stone.name,
      url: `https://lespierresdehamza.com/produits/${stone.url}`
    };

    if (currentCard) {
      currentCard.__gallery.push(galleryItem);
      return;
    }

    if (!newStoneGroups.has(familyKey)) {
      newStoneGroups.set(familyKey, { name: family, stones: [], gallery: [] });
    }
    const group = newStoneGroups.get(familyKey);
    group.stones.push(stone);
    group.gallery.push(galleryItem);
  });

  const addGalleryControls = (card) => {
    const gallery = card.__gallery || [];
    const imageLink = card.querySelector(".stone-image");
    if (!imageLink || !gallery.length) {
      return;
    }

    imageLink.setAttribute("href", gallery[0].url || "#galerie-pierres");
    imageLink.setAttribute("aria-label", `Ouvrir la galerie photos — ${gallery[0].label}`);
    const image = imageLink.querySelector("img");
    if (image) {
      setImageSourceWithFallback(image, gallery[0].imageCandidates || [gallery[0].src]);
      image.setAttribute("alt", gallery[0].alt);
      image.setAttribute("loading", "lazy");
      image.setAttribute("decoding", "async");
    }

    let controls = card.querySelector(".stone-gallery-controls");
    if (!controls) {
      controls = document.createElement("div");
      controls.className = "stone-gallery-controls";
      imageLink.insertAdjacentElement("afterend", controls);
    }
    controls.replaceChildren();

    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "stone-gallery-arrow";
    previous.setAttribute("aria-label", "Image précédente");
    previous.textContent = "←";
    const count = document.createElement("span");
    count.className = "stone-gallery-count";
    count.setAttribute("aria-live", "polite");
    const next = document.createElement("button");
    next.type = "button";
    next.className = "stone-gallery-arrow";
    next.setAttribute("aria-label", "Image suivante");
    next.textContent = "→";

    let activeIndex = 0;
    const showImage = (index) => {
      activeIndex = (index + gallery.length) % gallery.length;
      const item = gallery[activeIndex];
      if (image) {
        setImageSourceWithFallback(image, item.imageCandidates || [item.src]);
        image.alt = item.alt;
      }
      imageLink.href = item.url || "#galerie-pierres";
      imageLink.setAttribute("aria-label", `Ouvrir la galerie photos — ${item.label}`);
      count.textContent = `${item.label} · ${activeIndex + 1}/${gallery.length}`;
    };

    previous.addEventListener("click", () => showImage(activeIndex - 1));
    next.addEventListener("click", () => showImage(activeIndex + 1));
    controls.append(previous, count, next);
    showImage(0);
  };

  if (stoneGrid) {
    stoneCards.forEach(addGalleryControls);
    newStoneGroups.forEach((group) => {
      const card = document.createElement("article");
      const firstStone = group.stones[0];
      card.className = "stone-card official-stone-card reveal is-visible";
      card.dataset.product = group.name;
      card.dataset.family = group.name;
      card.dataset.category = getStoneCategory(group.name);
      card.__referenceCount = group.stones.length;
      card.dataset.color = firstStone.color;
      card.dataset.origin = "Maroc";
      card.dataset.applications = "à confirmer";
      const imageLink = document.createElement("a");
      imageLink.className = "stone-image";
      imageLink.href = group.gallery[0].url || "#galerie-pierres";
      imageLink.setAttribute("aria-label", `Ouvrir la galerie photos — ${group.gallery[0].label}`);
      const image = document.createElement("img");
      setImageSourceWithFallback(image, group.gallery[0].imageCandidates || [group.gallery[0].src]);
      image.alt = group.gallery[0].alt;
      image.loading = "lazy";
      image.decoding = "async";
      imageLink.append(image);
      const imageNumber = document.createElement("span");
      imageNumber.className = "stone-number";
      imageNumber.textContent = String(stoneCards.length + 1).padStart(2, "0");
      imageLink.append(imageNumber);
      card.append(imageLink);
      card.__gallery = group.gallery;
      addGalleryControls(card);

      const info = document.createElement("div");
      info.className = "stone-info";
      const copy = document.createElement("div");
      copy.className = "stone-copy";
      const title = document.createElement("h3");
      title.textContent = group.name;
      const description = document.createElement("p");
      description.textContent = group.stones.length > 1
        ? `${group.stones.length} références officielles et finitions présentées dans la galerie.`
        : `${firstStone.group} · finition : ${firstStone.finish}.`;
      const finish = document.createElement("p");
      finish.className = "stone-appearance";
      const finishLabel = document.createElement("strong");
      finishLabel.textContent = "Référence";
      finish.append(finishLabel, document.createTextNode(group.stones.map((stone) => stone.name).join(" · ")));
      const application = document.createElement("p");
      application.className = "stone-applications";
      const applicationLabel = document.createElement("strong");
      applicationLabel.textContent = "Disponibilité";
      application.append(applicationLabel, document.createTextNode("Caractéristiques et disponibilité à confirmer."));
      const details = document.createElement("a");
      details.className = "product-details official-product-link";
      details.href = group.gallery[0].url;
      details.target = "_blank";
      details.rel = "noopener noreferrer";
      details.textContent = "Voir la fiche officielle";
      copy.append(title, description, finish, application, details);

      const quote = document.createElement("a");
      quote.className = "card-quote";
      quote.href = `https://wa.me/212767870765?text=${encodeURIComponent(makeProductMessage(group.name))}`;
      quote.target = "_blank";
      quote.rel = "noopener noreferrer";
      quote.append(document.createTextNode("Demander un devis "));
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      quote.append(arrow);
      info.append(copy, quote);
      card.append(info);
      stoneGrid.append(card);
      stoneCards.push(card);
    });

    noDuplicateImageProducts.forEach((stone) => {
      const card = document.createElement("article");
      card.className = "stone-card official-stone-card official-stone-card--shared-photo reveal is-visible";
      card.dataset.product = stone.name;
      card.dataset.family = stone.name;
      card.dataset.category = getStoneCategory(stone.name);
      card.__referenceCount = 1;
      card.dataset.color = stone.color;
      card.dataset.origin = "Maroc";
      card.dataset.applications = "à confirmer";
      const title = document.createElement("h3");
      title.textContent = stone.name;
      const note = document.createElement("p");
      note.textContent = "La photo officielle correspond à un visuel déjà présent sur ce site ; elle n’est pas dupliquée dans le catalogue.";
      const link = document.createElement("a");
      link.className = "product-details official-product-link";
      link.href = `https://lespierresdehamza.com/produits/${stone.url}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Voir la fiche officielle";
      card.append(title, note, link);
      stoneGrid.append(card);
      stoneCards.push(card);
    });
  }

  stoneCards.forEach((card) => {
    const name = card.dataset.product || card.querySelector("h3")?.textContent || "Pierre naturelle";
    card.dataset.collection = getStoneCollection(name);
  });
  const renderCollectionTabs = () => {
    if (!collectionTabs) return;
    const counts = new Map(collectionDefinitions.map(({ id }) => [id, 0]));
    stoneCards.forEach((card) => {
      const count = card.__gallery?.length || 0;
      counts.set(card.dataset.collection, (counts.get(card.dataset.collection) || 0) + count);
    });
    const collections = [
      { id: "toutes", label: "Toutes les pierres", count: [...counts.values()].reduce((sum, count) => sum + count, 0) },
      ...collectionDefinitions.map((collection) => ({ ...collection, count: counts.get(collection.id) || 0 }))
    ];
    collectionTabs.replaceChildren(...collections.filter(({ count }) => count > 0).map((collection) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "stone-collection-tab";
      button.dataset.collection = collection.id;
      button.setAttribute("aria-pressed", String(collection.id === activeCollection));
      button.append(document.createTextNode(collection.label));
      const count = document.createElement("span");
      count.textContent = String(collection.count).padStart(2, "0");
      button.append(count);
      button.addEventListener("click", () => {
        activeCollection = collection.id;
        collectionTabs.querySelectorAll(".stone-collection-tab").forEach((tab) => {
          tab.setAttribute("aria-pressed", String(tab === button));
        });
        filterStones();
      });
      return button;
    }));
  };

  const stoneTotal = document.querySelector("#stone-total");
  if (stoneTotal) {
    stoneTotal.textContent = `${stoneCards.length} FICHES · ${officialStones.length} RÉFÉRENCES OFFICIELLES · PHOTOS SANS DOUBLONS`;
  }

  const visibleCarouselCards = () => stoneCards.filter((card) => !card.hidden);
  const normalizeCarouselIndex = (index) => carouselSlides.length
    ? (index % carouselSlides.length + carouselSlides.length) % carouselSlides.length
    : 0;
  const relativeCarouselIndex = (index) => {
    const count = carouselSlides.length;
    let offset = (index - carouselActiveIndex + count) % count;
    if (offset > count / 2) {
      offset -= count;
    }
    return offset;
  };
  const renderCarouselDetails = () => {
    const activeSlide = carouselSlides[carouselActiveIndex];
    const hasSlides = carouselSlides.length > 0;
    if (carouselProgress) {
      carouselProgress.hidden = !hasSlides;
      carouselProgress.setAttribute("aria-valuemin", "1");
      carouselProgress.setAttribute("aria-valuemax", String(Math.max(1, carouselSlides.length)));
      carouselProgress.setAttribute("aria-valuenow", String(hasSlides ? carouselActiveIndex + 1 : 1));
    }
    if (carouselCount) {
      carouselCount.textContent = `${String(hasSlides ? carouselActiveIndex + 1 : 0).padStart(2, "0")} / ${String(carouselSlides.length).padStart(2, "0")}`;
    }
    if (carouselProgressFill) {
      carouselProgressFill.style.transform = `scaleX(${hasSlides ? (carouselActiveIndex + 1) / carouselSlides.length : 0})`;
    }
    if (carouselCaption && activeSlide) {
      const label = document.createElement("strong");
      label.textContent = activeSlide.item.label;
      const count = document.createElement("span");
      count.textContent = activeSlide.item.family || "PIERRE NATURELLE DU MAROC";
      carouselCaption.replaceChildren(label, count);
    } else if (carouselCaption) {
      carouselCaption.replaceChildren();
    }
    if (carouselFeatureInfo) {
      if (activeSlide) {
        const sourceInfo = activeSlide.card.querySelector(".stone-info");
        const feature = sourceInfo?.cloneNode(true);
        const clonedDetails = feature?.querySelector(".product-details");
        const sourceDetails = activeSlide.card.querySelector(".product-details");
        clonedDetails?.addEventListener("click", () => sourceDetails?.click());
        carouselFeatureInfo.replaceChildren(...(feature ? [feature] : []));
        carouselFeatureInfo.hidden = !feature;
      } else {
        carouselFeatureInfo.replaceChildren();
        carouselFeatureInfo.hidden = true;
      }
    }
  };
  const positionCarouselSlides = () => {
    if (!carouselRing) {
      return;
    }
    const stageWidth = carouselViewport?.clientWidth || 0;
    const orbitStep = window.matchMedia("(max-width: 760px)").matches
      ? 0
      : Math.min(stageWidth * .36, 430);
    carouselSlides.forEach((slide, index) => {
      const offset = relativeCarouselIndex(index);
      const distance = Math.abs(offset);
      const active = distance === 0;
      const nearby = distance === 1;
      const scale = active ? 1 : .64;
      slide.element.style.left = `calc(50% + ${offset * orbitStep}px)`;
      slide.element.style.top = active ? "42%" : "45%";
      slide.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
      slide.element.style.opacity = active ? "1" : nearby ? ".78" : "0";
      slide.element.style.visibility = active || nearby ? "visible" : "hidden";
      slide.element.style.pointerEvents = active || nearby ? "auto" : "none";
      slide.element.style.zIndex = active ? "2" : "1";
      slide.element.style.filter = active ? "brightness(1)" : "brightness(.72)";
      slide.element.classList.toggle("is-orbit-front", active);
      slide.element.tabIndex = active ? 0 : -1;
      slide.image.loading = distance <= 1 ? "eager" : "lazy";
    });
  };
  const createCarouselSlides = () => {
    if (!carouselRing) {
      return;
    }
    const previousSlide = carouselSlides[carouselActiveIndex];
    carouselSlides = visibleCarouselCards().flatMap((card) => (card.__gallery || []).map((item, imageIndex) => ({
      card,
      item,
      imageIndex,
      element: document.createElement("button"),
      image: document.createElement("img")
    })));
    carouselSlides.forEach((slide) => {
      slide.item.family = slide.card.dataset.family || slide.card.dataset.product || "Pierre naturelle";
    });
    carouselRing.replaceChildren(...carouselSlides.map((slide) => {
      slide.element.type = "button";
      slide.element.className = "stone-orbit-slide";
      slide.element.setAttribute("aria-label", `Voir ${slide.item.label} en grand`);
      setImageSourceWithFallback(slide.image, slide.item.imageCandidates || [slide.item.src]);
      slide.image.alt = slide.item.alt;
      slide.image.loading = "lazy";
      slide.image.decoding = "async";
      slide.element.append(slide.image);
      slide.element.addEventListener("click", () => {
        if (!carouselSuppressClick) {
          openLightbox(slide.card, slide.imageIndex);
        }
      });
      return slide.element;
    }));
    carouselActiveIndex = previousSlide
      ? Math.max(0, carouselSlides.findIndex((slide) => slide.item.src === previousSlide.item.src))
      : normalizeCarouselIndex(carouselActiveIndex);
    carouselActiveIndex = normalizeCarouselIndex(carouselActiveIndex);
    positionCarouselSlides();
    renderCarouselDetails();
    const hasOverflow = carouselSlides.length > 1;
    if (carouselPrevious) carouselPrevious.disabled = !hasOverflow;
    if (carouselNext) carouselNext.disabled = !hasOverflow;
    syncCarouselAutoplay();
  };
  const updateCarousel = () => createCarouselSlides();
  const moveCarouselNext = () => {
    if (carouselSlides.length < 2 || carouselDragging) {
      return;
    }
    carouselActiveIndex = normalizeCarouselIndex(carouselActiveIndex + 1);
    positionCarouselSlides();
    renderCarouselDetails();
  };
  const moveCarouselPrevious = () => {
    if (carouselSlides.length < 2 || carouselDragging) {
      return;
    }
    carouselActiveIndex = normalizeCarouselIndex(carouselActiveIndex - 1);
    positionCarouselSlides();
    renderCarouselDetails();
  };
  const syncCarouselAutoplay = () => {
    if (carouselTimer) {
      window.clearInterval(carouselTimer);
      carouselTimer = 0;
    }
    const paused = !carouselViewport
      || carouselSlides.length < 2
      || reducedMotionQuery.matches
      || document.hidden
      || carouselViewport.matches(":hover")
      || carouselViewport.contains(document.activeElement)
      || carouselDragging;
    if (!paused) {
      carouselTimer = window.setInterval(moveCarouselNext, 3600);
    }
  };

  carouselPrevious?.addEventListener("click", () => {
    moveCarouselPrevious();
    syncCarouselAutoplay();
  });
  carouselNext?.addEventListener("click", () => {
    moveCarouselNext();
    syncCarouselAutoplay();
  });
  carouselViewport?.addEventListener("mouseenter", syncCarouselAutoplay);
  carouselViewport?.addEventListener("mouseleave", syncCarouselAutoplay);
  carouselViewport?.addEventListener("focusin", syncCarouselAutoplay);
  carouselViewport?.addEventListener("focusout", () => window.setTimeout(syncCarouselAutoplay, 0));
  carouselViewport?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      moveCarouselPrevious();
    } else if (event.key === "ArrowLeft") {
      moveCarouselNext();
    }
  });
  carouselViewport?.addEventListener("pointerdown", (event) => {
    if ((event.pointerType === "mouse" && event.button !== 0)
      || (event.target instanceof Element && event.target.closest(".stone-carousel-arrow"))) {
      return;
    }
    carouselPointerId = event.pointerId;
    carouselPointerStart = event.clientX;
    carouselDragOffset = 0;
    carouselDragging = false;
    carouselViewport.classList.add("is-orbit-dragging");
    syncCarouselAutoplay();
    if (event.isTrusted) {
      carouselViewport.setPointerCapture(event.pointerId);
    }
  });
  carouselViewport?.addEventListener("pointermove", (event) => {
    if (event.pointerId !== carouselPointerId) {
      return;
    }
    carouselDragOffset = event.clientX - carouselPointerStart;
    if (Math.abs(carouselDragOffset) > 8) {
      carouselDragging = true;
      carouselRing?.style.setProperty("--orbit-drag", `${carouselDragOffset * .18}px`);
      carouselRing?.classList.add("is-orbit-dragging");
    }
  });
  const endCarouselPointer = (event) => {
    if (event.pointerId !== carouselPointerId) {
      return;
    }
    const wasDragging = carouselDragging;
    carouselDragging = false;
    if (wasDragging) {
      carouselSuppressClick = true;
      if (Math.abs(carouselDragOffset) > 34) {
        const steps = Math.max(1, Math.round(Math.abs(carouselDragOffset) / Math.max(carouselViewport.clientWidth / 8, 36)));
        carouselActiveIndex = normalizeCarouselIndex(carouselActiveIndex + (carouselDragOffset < 0 ? steps : -steps));
      }
      positionCarouselSlides();
      renderCarouselDetails();
      window.setTimeout(() => {
        carouselSuppressClick = false;
      }, 0);
    }
    carouselPointerId = null;
    carouselViewport?.classList.remove("is-orbit-dragging");
    carouselRing?.classList.remove("is-orbit-dragging");
    carouselRing?.style.removeProperty("--orbit-drag");
    syncCarouselAutoplay();
  };
  carouselViewport?.addEventListener("pointerup", endCarouselPointer);
  carouselViewport?.addEventListener("pointercancel", endCarouselPointer);
  document.addEventListener("visibilitychange", syncCarouselAutoplay);
  reducedMotionQuery.addEventListener?.("change", syncCarouselAutoplay);
  window.addEventListener("resize", updateCarousel);

  const filterStones = () => {
    if (!catalogControls.search || !catalogControls.category || !catalogControls.color || !catalogControls.application || !catalogControls.origin) {
      return;
    }

    const term = normalizeCatalogValue(catalogControls.search.value.trim());
    const category = normalizeCatalogValue(catalogControls.category.value);
    const color = normalizeCatalogValue(catalogControls.color.value);
    const application = normalizeCatalogValue(catalogControls.application.value);
    const origin = normalizeCatalogValue(catalogControls.origin.value);
    let visibleCount = 0;

    stoneCards.forEach((card) => {
      const text = normalizeCatalogValue(card.textContent);
      const cardCategory = normalizeCatalogValue(card.dataset.category || "");
      const cardColor = normalizeCatalogValue(card.dataset.color || "");
      const cardApplications = normalizeCatalogValue(card.dataset.applications || "");
      const cardOrigin = normalizeCatalogValue(card.dataset.origin || "");
      const matches = (!term || text.includes(term))
        && (activeCollection === "toutes" || card.dataset.collection === activeCollection)
        && (!category || cardCategory === category)
        && (!color || cardColor === color)
        && (!application || cardApplications.includes(application))
        && (!origin || cardOrigin.includes(origin));
      card.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    if (catalogControls.result) {
      const visibleReferences = stoneCards
        .filter((card) => !card.hidden)
        .reduce((count, card) => count + (card.__referenceCount || 0), 0);
      catalogControls.result.textContent = `${visibleCount} ${visibleCount === 1 ? "fiche" : "fiches"} · ${visibleReferences} références`;
    }
    updateCarousel();
  };

  renderCollectionTabs();
  const catalogStats = {
    references: officialStones.length,
    collections: new Set(officialStones.map(({ name }) => getStoneCollection(name))).size,
    languages: languageSwitcher instanceof HTMLSelectElement ? languageSwitcher.options.length : 1
  };
  document.querySelectorAll("[data-site-stat]").forEach((stat) => {
    const value = catalogStats[stat.dataset.siteStat];
    if (typeof value === "number") {
      stat.textContent = String(value);
    }
  });
  [catalogControls.search, catalogControls.category, catalogControls.color, catalogControls.application, catalogControls.origin].forEach((control) => {
    control?.addEventListener("input", filterStones);
    control?.addEventListener("change", filterStones);
  });
  catalogControls.reset?.addEventListener("click", () => {
    if (catalogControls.search instanceof HTMLInputElement) {
      catalogControls.search.value = "";
    }
    [catalogControls.category, catalogControls.color, catalogControls.application, catalogControls.origin].forEach((control) => {
      if (control instanceof HTMLSelectElement) {
        control.value = "";
      }
    });
    activeCollection = "toutes";
    collectionTabs?.querySelectorAll(".stone-collection-tab").forEach((tab) => {
      tab.setAttribute("aria-pressed", String(tab.dataset.collection === activeCollection));
    });
    filterStones();
  });

  const lightbox = document.querySelector("#stone-lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxName = document.querySelector("#lightbox-name");
  const lightboxCaption = document.querySelector("#lightbox-caption");
  const lightboxCount = document.querySelector("#lightbox-count");
  const lightboxPrevious = document.querySelector(".lightbox-previous");
  const lightboxNext = document.querySelector(".lightbox-next");
  const lightboxClose = document.querySelector(".lightbox-close");
  let activeLightboxGallery = [];
  let activeLightboxIndex = 0;
  const updateLightbox = () => {
    const item = activeLightboxGallery[activeLightboxIndex];
    if (!item || !(lightboxImage instanceof HTMLImageElement)) {
      return;
    }
    setImageSourceWithFallback(lightboxImage, item.imageCandidates || [item.src]);
    lightboxImage.alt = item.alt;
    if (lightboxName) lightboxName.textContent = item.family || item.label;
    if (lightboxCaption) lightboxCaption.textContent = item.family ? item.label : "";
    if (lightboxCount) lightboxCount.textContent = `${activeLightboxIndex + 1} / ${activeLightboxGallery.length}`;
  };
  const openLightbox = (card, imageIndex = 0) => {
    if (!(lightbox instanceof HTMLDialogElement) || !Array.isArray(card.__gallery) || !card.__gallery.length) {
      return;
    }
    activeLightboxGallery = card.__gallery;
    activeLightboxIndex = imageIndex;
    updateLightbox();
    lightbox.showModal();
  };

  stoneGrid?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    if (carouselSuppressClick) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const card = target.closest(".stone-card");
    if (!card) {
      return;
    }
    if (target.closest(".stone-gallery-arrow")) {
      return;
    }
    const imageLink = target.closest(".stone-image");
    if (imageLink) {
      event.preventDefault();
      const label = imageLink.querySelector("img")?.alt;
      const imageIndex = card.__gallery?.findIndex((item) => item.alt === label) ?? 0;
      openLightbox(card, Math.max(0, imageIndex));
    }
  });

  lightboxPrevious?.addEventListener("click", () => {
    if (activeLightboxGallery.length) {
      activeLightboxIndex = (activeLightboxIndex - 1 + activeLightboxGallery.length) % activeLightboxGallery.length;
      updateLightbox();
    }
  });
  lightboxNext?.addEventListener("click", () => {
    if (activeLightboxGallery.length) {
      activeLightboxIndex = (activeLightboxIndex + 1) % activeLightboxGallery.length;
      updateLightbox();
    }
  });
  lightboxClose?.addEventListener("click", () => lightbox?.close());
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });
  filterStones();

  const productDialog = document.querySelector("#product-dialog");
  if (productDialog instanceof HTMLDialogElement) {
    const dialogImage = productDialog.querySelector("#product-dialog-image");
    const dialogTitle = productDialog.querySelector("#product-dialog-title");
    const dialogDescription = productDialog.querySelector("#product-dialog-description");
    const dialogAppearance = productDialog.querySelector("#product-dialog-appearance");
    const dialogPhotoNote = productDialog.querySelector("#product-dialog-photo-note");
    const dialogApplications = productDialog.querySelector("#product-dialog-applications");
    const dialogQuote = productDialog.querySelector("#product-dialog-quote");
    const productPageLink = productDialog.querySelector("#product-page-link");
    const closeButton = productDialog.querySelector(".dialog-close");

    document.querySelectorAll(".product-details").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".stone-card");
        if (!card || !dialogImage || !dialogTitle || !dialogDescription || !dialogApplications || !dialogQuote) {
          return;
        }

        const product = card.dataset.product || "Pierre naturelle";
        if (productPageLink instanceof HTMLAnchorElement && card.dataset.slug) {
          productPageLink.href = `stones/${card.dataset.slug}.html`;
        }
        const cardImage = card.querySelector(".stone-image img");
        const cardDescription = card.querySelector(".stone-copy > p");
        dialogTitle.textContent = product;
        dialogDescription.textContent = cardDescription?.textContent || "Contactez-nous pour en savoir plus sur cette pierre.";
        if (dialogAppearance) {
          dialogAppearance.textContent = card.dataset.appearance
            ? `Teinte & aspect : ${card.dataset.appearance}`
            : "";
          dialogAppearance.hidden = !card.dataset.appearance;
        }
        dialogImage.hidden = !cardImage;
        productDialog.classList.toggle("product-dialog--text-only", !cardImage);
        if (dialogPhotoNote) {
          dialogPhotoNote.hidden = Boolean(cardImage);
        }
        if (cardImage) {
          dialogImage.src = cardImage.getAttribute("src") || "";
          dialogImage.alt = cardImage.alt;
        } else {
          dialogImage.removeAttribute("src");
          dialogImage.alt = "";
        }

        dialogApplications.replaceChildren();
        const applicationNames = (card.dataset.applications || "Usages à discuter selon votre projet").split("|");
        applicationNames.forEach((application) => {
          const item = document.createElement("li");
          item.textContent = application;
          dialogApplications.append(item);
        });
        dialogQuote.href = `https://wa.me/212767870765?text=${encodeURIComponent(makeProductMessage(product))}`;
        productDialog.showModal();
      });
    });

    closeButton?.addEventListener("click", () => productDialog.close());
    productDialog.addEventListener("click", (event) => {
      if (event.target === productDialog) {
        productDialog.close();
      }
    });
  }

  document.querySelectorAll(".quote-link[data-product]").forEach((link) => {
    const product = link.dataset.product;
    if (product) {
      link.href = `https://wa.me/212767870765?text=${encodeURIComponent(makeProductMessage(product))}`;
    }
  });

  const year = document.querySelector("#year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }
});
