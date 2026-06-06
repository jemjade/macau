/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor */
// Root: composes hero + sections + tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "scheduleView": "timeline",
  "accent": "#1b4d3e",
  "showStripe": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [, setReload] = React.useState(0);

  // Re-render when sheet data arrives
  React.useEffect(() => {
    const h = () => setReload(n => n + 1);
    window.addEventListener('sheet-loaded', h);
    return () => window.removeEventListener('sheet-loaded', h);
  }, []);

  // accent override — also derive deep/soft variants so theme stays cohesive
  React.useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--hot', t.accent);
    // derive deep shade (mix accent → ink ~40%) using color-mix
    root.setProperty('--hot-deep', `color-mix(in oklch, ${t.accent} 60%, #14110f)`);
    root.setProperty('--hot-soft', `color-mix(in oklch, ${t.accent} 14%, #f4f0e8)`);
  }, [t.accent]);

  return (
    <React.Fragment>
      <TopBar />
      <LogoStrip />
      <Hero />

      <People />

      <Schedule defaultView={t.scheduleView} />

      <PersonalSchedule />

      {t.showStripe && <div className="stripe" />}

      <Places />
      <MapSection />
      <InfoStrip />
      <ChecklistSection />
      <Announcements />
      <RecommendedCourses />
      <Gallery />

      <Footer />

      <TweaksPanel>
        <TweakSection label="Schedule view" />
        <TweakRadio
          label="Display mode"
          value={t.scheduleView}
          options={[
            { value: 'timeline', label: 'Timeline' },
            { value: 'cards', label: 'Cards' },
            { value: 'list', label: 'List' },
          ]}
          onChange={(v) => setTweak('scheduleView', v)}
        />
        <TweakSection label="Style" />
        <TweakColor
          label="Accent · Green"
          value={t.accent}
          options={['#1b4d3e', '#0e3b2e', '#2d5f3f', '#4a6b3a', '#1a3a2e']}
          onChange={(v) => setTweak('accent', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
