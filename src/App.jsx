import { useEffect, useMemo, useState } from 'react';

const serviceTiers = [
  {
    id: 'exclusive',
    tier: 'Exclusive Services',
    heading: 'Partner for end-to-end impact',
    body:
      'End-to-end design, build, and optimization of fast, reliable cloud-native web and native apps to power your business forward.',
    cta: 'Explore exclusive',
    featured: true,
  },
  {
    id: 'basic',
    tier: 'Basic Service',
    heading: 'Launch-ready MVPs',
    body:
      'Production-ready MVPs with essential features and basic cloud setup at a transparent price.',
    cta: 'Discover basic',
  },
  {
    id: 'intermediate',
    tier: 'Intermediate Service',
    heading: 'Grow with confidence',
    body:
      'Scalable backends, advanced features, and monitoring for growing products.',
    cta: 'See intermediate',
  },
  {
    id: 'advanced',
    tier: 'Advanced Service',
    heading: 'Mission-critical excellence',
    body:
      'Custom architecture, security hardening, and ongoing support for mission-critical apps.',
    cta: 'Review advanced',
  },
];

const brandValues = [
  {
    id: 'reliability',
    title: 'Reliability',
    description:
      'Redundant architectures, proactive observability, and incident-ready playbooks keep your apps steady.',
  },
  {
    id: 'performance',
    title: 'Performance',
    description:
      'Serverless, edge, and modern runtimes tuned for real-world workloads so every interaction feels instant.',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description:
      'We blend design thinking with emerging tech to unlock new business models and competitive edges.',
  },
];

const heroMetrics = [
  { id: 'uptime', metric: '99.99%', label: 'Uptime Engineering' },
  { id: 'velocity', metric: '6x', label: 'Faster Launches' },
  { id: 'monitoring', metric: '24/7', label: 'Cloud Monitoring' },
];

function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="contact-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Contact Cloudtechify"
      onClick={onClose}
    >
      <div className="contact-modal" onClick={event => event.stopPropagation()}>
        <button className="modal-close" type="button" aria-label="Close contact dialog" onClick={onClose}>
          &times;
        </button>
        <p className="eyebrow">Contact Cloudtechify</p>
        <h3>We’re ready when you are</h3>
        <p>
          Need a direct line? Email us and we’ll reply quickly with next steps on your cloud or product
          initiative.
        </p>
        <a className="primary" href="mailto:majdkilou@cloudtechify.com">
          majdkilou@cloudtechify.com
        </a>
        <p className="modal-subtext">Prefer forms? Use the consultation brief below anytime.</p>
      </div>
    </div>
  );
}

function ConsultationForm({ onOpenContact }) {
  const endpoint = 'https://formsubmit.co/majdkilou@cloudtechify.com';

  return (
    <form className="cta-form" action={endpoint} method="POST">
      <input type="hidden" name="_subject" value="Cloudtechify Consultation Request" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <div className="form-grid">
        <label className="form-field">
          <span>Full name</span>
          <input type="text" name="fullName" placeholder="Alex Founder" required />
        </label>
        <label className="form-field">
          <span>Work email</span>
          <input type="email" name="email" placeholder="you@company.com" required />
        </label>
        <label className="form-field">
          <span>Company / Team</span>
          <input type="text" name="company" placeholder="Cloudtechify Labs" />
        </label>
        <label className="form-field">
          <span>Product stage</span>
          <select name="stage" defaultValue="">
            <option value="" disabled>
              Select stage
            </option>
            <option value="idea">Idea / Pre-MVP</option>
            <option value="mvp">MVP shipping</option>
            <option value="scale">Scaling fast</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </label>
        <label className="form-field form-full">
          <span>What should we build together?</span>
          <textarea
            name="projectDetails"
            rows="4"
            placeholder="Share goals, timelines, tech stack, and success metrics."
            required
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="primary">
          Request a consultation
        </button>
        <button
          type="button"
          className="secondary ghost contact-trigger"
          onClick={() => onOpenContact?.()}
        >
          Contact Cloudtechify
        </button>
      </div>
    </form>
  );
}

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-animate]');
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isContactModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isContactModalOpen]);

  const handleNavClick = href => {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setNavOpen(false);
  };

  const openContactModal = () => {
    setContactModalOpen(true);
    setNavOpen(false);
  };

  const closeContactModal = () => setContactModalOpen(false);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <header className="site-header">
        <div className="logo">Cloudtechify</div>
        <nav className={`nav-links ${navOpen ? 'open' : ''}`}>
          {['#story', '#services', '#values', '#contact'].map(link => {
            const label = link.replace('#', '').replace(/^\w/, c => c.toUpperCase());
            const isContact = link === '#contact';
            return (
              <button
                key={link}
                type="button"
                className={`nav-link ${isContact ? 'highlight' : ''}`}
                onClick={() => (isContact ? openContactModal() : handleNavClick(link))}
              >
                {label}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          className="primary ghost"
          onClick={() => handleNavClick('#contact')}
        >
          Request Consultation
        </button>
        <button
          className={`mobile-menu ${navOpen ? 'active' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(open => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content" data-animate>
            <p className="eyebrow">Scalable cloud-native craftsmanship</p>
            <h1>
              Cloudtechify designs and builds high-performance web apps and native mobile apps on modern
              cloud infrastructure.
            </h1>
            <p className="tagline">
              Launch faster with scalable, secure systems that are easy to maintain and grow.
            </p>
            <div className="hero-ctas">
              <button type="button" className="primary" onClick={() => handleNavClick('#contact')}>
                Start a project
              </button>
              <button type="button" className="secondary" onClick={() => handleNavClick('#services')}>
                View our services
              </button>
            </div>
            <div className="hero-chips">
              <span>Reliability</span>
              <span>Performance</span>
              <span>Innovation</span>
            </div>
          </div>

          <div className="hero-visual" data-animate>
            <div className="orb orb-large" aria-hidden="true" />
            <div className="orb orb-small" aria-hidden="true" />
            <div className="grid-card">
              {heroMetrics.map(metric => (
                <div key={metric.id}>
                  <p className="metric">{metric.metric}</p>
                  <p className="label">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="story" id="story" data-animate>
          <div className="section-heading">
            <p className="eyebrow">Uncover Our Story</p>
            <h2>Pioneering cloud craftsmanship</h2>
          </div>
          <p className="story-text">
            At Cloudtechify, we pioneer the future by delivering groundbreaking technology solutions that
            power innovation and elevate performance beyond limits. Join us on a journey to transform ideas
            into reality and harness the full potential of tomorrow’s technology today.
          </p>
        </section>

        <section className="values" id="values">
          {brandValues.map(value => (
            <div key={value.id} className="value-card" data-animate>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </section>

        <section className="services" id="services">
          <div className="section-heading" data-animate>
            <p className="eyebrow">Service Tiers</p>
            <h2>Choose the momentum you need</h2>
          </div>
          <div className="service-grid">
            {serviceTiers.map(tier => (
              <article
                key={tier.id}
                className={`service-card ${tier.featured ? 'featured' : ''}`}
                data-animate
              >
                <p className="service-tier">{tier.tier}</p>
                <h3>{tier.heading}</h3>
                <p>{tier.body}</p>
                <button className="text-link">{tier.cta}</button>
              </article>
            ))}
          </div>
        </section>

        <section className="cta" id="contact" data-animate>
          <div className="cta-copy">
            <p className="eyebrow">Ready to build?</p>
            <h2>Let’s architect your next leap.</h2>
            <p>
              Tell us about your product, and we’ll craft a cloud-native plan that keeps you shipping with
              confidence.
            </p>
            <p className="contact-detail">
              Prefer direct email? Reach us anytime at{' '}
              <a href="mailto:majdkilou@cloudtechify.com">majdkilou@cloudtechify.com</a>.
            </p>
          </div>
          <ConsultationForm onOpenContact={openContactModal} />
        </section>
      </main>

      <footer className="site-footer">
        <p>© {currentYear} Cloudtechify · Built for reliability, performance, innovation.</p>
        <div className="footer-links">
          <button type="button" onClick={() => handleNavClick('#services')}>
            Services
          </button>
          <button type="button" onClick={() => handleNavClick('#story')}>
            Story
          </button>
          <button type="button" className="contact-trigger" onClick={openContactModal}>
            Contact
          </button>
        </div>
      </footer>

      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </>
  );
}

export default App;

