import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ArrowDown, ArrowRight, Bell, Check, ChevronDown, Clock3, CloudLightning, CloudRain, Download, ExternalLink, Info, MapPin, Menu, Search, ShieldCheck, Waves, Wind, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import stormCoast from "@/assets/storm-coast.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StormWatch India | Storm nowcasting outlook" },
      { name: "description", content: "Explore an illustrative India storm nowcasting dashboard with regional outlooks and severe weather safety guidance." },
      { property: "og:title", content: "StormWatch India | Storm nowcasting outlook" },
      { property: "og:description", content: "An illustrative public-service storm nowcasting outlook for India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Region = "All India" | "West India" | "North India" | "South India" | "East India";
type Window = "Next 1 hour" | "Next 3 hours" | "Next 6 hours";
type Layer = "Warnings" | "Rainfall" | "Wind";

const alerts = [
  { place: "Mumbai & Konkan coast", region: "West India", level: "Orange alert", kind: "Thunderstorm, heavy rain", icon: CloudLightning, detail: "Thunderstorms with intense spells of rain and gusty winds are possible. Avoid low-lying roads and exposed coastal areas." },
  { place: "Ahmedabad & central Gujarat", region: "West India", level: "Orange alert", kind: "Lightning, strong wind", icon: Wind, detail: "Lightning and short bursts of strong wind may occur. Move indoors and keep away from trees and open ground." },
  { place: "Bhopal & western Madhya Pradesh", region: "North India", level: "Yellow watch", kind: "Moderate rain, lightning", icon: CloudRain, detail: "Showers and isolated lightning are possible. Check local advisories before travel." },
  { place: "Bengaluru & south interior Karnataka", region: "South India", level: "Yellow watch", kind: "Thunderstorm, rain", icon: CloudLightning, detail: "Localized thunderstorms may develop. Seek shelter if thunder is heard." },
  { place: "Kolkata & lower Gangetic Bengal", region: "East India", level: "Yellow watch", kind: "Rain, isolated thunder", icon: CloudRain, detail: "Brief heavy showers are possible in isolated areas. Allow extra time for travel." },
];

const safety = [
  { icon: CloudLightning, title: "During lightning", text: "Go indoors immediately. Stay away from open fields, tall trees and water." },
  { icon: Waves, title: "During heavy rain", text: "Do not walk or drive through floodwater. Move to higher ground if needed." },
  { icon: Wind, title: "During high winds", text: "Secure loose objects and stay clear of weak structures and power lines." },
];

function Index() {
  const [region, setRegion] = useState<Region>("All India");
  const [window, setWindow] = useState<Window>("Next 3 hours");
  const [layer, setLayer] = useState<Layer>("Warnings");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const visibleAlerts = alerts.filter((alert) => (region === "All India" || alert.region === region) && `${alert.place} ${alert.kind}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="utility-bar">
        <div className="site-container flex items-center justify-between gap-3 py-2 text-xs">
          <span>Public weather information <span className="mx-2 opacity-40">|</span> India</span>
          <div className="flex items-center gap-4"><span className="hidden sm:inline">For awareness and preparedness</span><span className="utility-pill">DEMONSTRATION SITE</span></div>
        </div>
      </div>

      <header className="border-b border-border bg-background">
        <div className="site-container flex min-h-21 items-center justify-between gap-4 py-3">
          <a href="#top" className="flex min-w-0 items-center gap-3 sm:gap-4" aria-label="StormWatch India home">
            <div className="brand-mark"><CloudLightning size={27} strokeWidth={1.8} /></div>
            <div className="min-w-0"><div className="brand-title">StormWatch <span>India</span></div><div className="brand-subtitle">STORM NOWCASTING OUTLOOK</div></div>
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            <div className="border-r border-border pr-7 text-right"><div className="text-xs font-semibold text-foreground">Weather information</div><div className="mt-1 text-xs text-muted-foreground">India-wide illustrative outlook</div></div>
            <Button variant="outline" size="sm" onClick={() => setSubscribed(!subscribed)} className="h-10 border-primary text-primary hover:bg-secondary"><Bell size={15} />{subscribed ? "Updates on" : "Get updates"}</Button>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </header>

      <nav className="nav-band" aria-label="Main navigation">
        <div className={`site-container nav-inner ${menuOpen ? "nav-open" : ""}`}>
          <a href="#top" className="nav-link active" onClick={() => setMenuOpen(false)}>Overview</a>
          <a href="#nowcast" className="nav-link" onClick={() => setMenuOpen(false)}>Nowcast map</a>
          <a href="#alerts" className="nav-link" onClick={() => setMenuOpen(false)}>Regional alerts</a>
          <a href="#safety" className="nav-link" onClick={() => setMenuOpen(false)}>Safety guidance</a>
          <span className="ml-auto hidden items-center gap-2 text-xs text-primary-foreground/80 lg:flex"><span className="status-dot" /> Illustrative outlook · Not live</span>
        </div>
      </nav>

      <main id="top">
        {noticeOpen && <div className="notice-band"><div className="site-container flex items-start gap-3 py-3 sm:items-center"><Info size={17} className="mt-0.5 shrink-0 sm:mt-0" /><p className="flex-1 text-xs leading-relaxed sm:text-sm"><strong>Important:</strong> This is a design demonstration with illustrative alerts, not a live warning service. For official forecasts, visit <a href="https://mausam.imd.gov.in/" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">India Meteorological Department <ExternalLink className="inline size-3" /></a>.</p><Button variant="ghost" size="icon" aria-label="Dismiss notice" onClick={() => setNoticeOpen(false)} className="-my-1 size-7 shrink-0 text-foreground"><X size={16} /></Button></div></div>}

        <section className="hero" aria-labelledby="hero-title">
          <img src={stormCoast} alt="Monsoon storm clouds and rain approaching an Indian coastline" className="hero-image" width={1600} height={900} />
          <div className="hero-shade" />
          <div className="site-container relative z-10 flex h-full flex-col justify-center py-12 text-primary-foreground">
            <div className="hero-eyebrow"><span className="status-dot" /> WEATHER AWARENESS, AT A GLANCE</div>
            <h1 id="hero-title" className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[56px]">Know what the<br />storm may bring.</h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-primary-foreground/85 sm:text-base">A clear view of developing thunderstorms, rainfall and regional conditions across India.</p>
            <a href="#nowcast" className="mt-7 inline-flex w-fit items-center gap-2 border-b border-primary-foreground/70 pb-1 text-sm font-semibold hover:border-primary-foreground">Explore the outlook <ArrowDown size={16} /></a>
          </div>
          <div className="hero-caption">ILLUSTRATIVE WEATHER OUTLOOK <span className="mx-2">•</span> NOT REAL-TIME DATA</div>
        </section>

        <section className="snapshot-band" aria-label="Outlook summary"><div className="site-container snapshot-grid">
          <div className="snapshot-intro"><span className="section-kicker">AT A GLANCE</span><h2 className="font-display text-xl font-semibold">India outlook</h2><p>Illustrative conditions only</p></div>
          <div className="snapshot-item"><span className="snapshot-icon orange"><AlertTriangle size={21} /></span><div><strong>2</strong><span>Orange alerts</span></div></div>
          <div className="snapshot-item"><span className="snapshot-icon yellow"><CloudLightning size={23} /></span><div><strong>3</strong><span>Yellow watches</span></div></div>
          <div className="snapshot-item"><span className="snapshot-icon blue"><Clock3 size={21} /></span><div><strong>0–6 hr</strong><span>Outlook window</span></div></div>
        </div></section>

        <section id="nowcast" className="site-container py-12 md:py-16">
          <div className="section-heading"><div><div className="section-kicker">STORM NOWCAST</div><h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">Weather across India</h2><p className="mt-3 text-sm text-muted-foreground">Explore a sample regional outlook for developing storm conditions.</p></div><div className="sample-badge"><span className="status-dot" /> SAMPLE DATA · NOT LIVE</div></div>

          <div className="forecast-toolbar">
            <div className="toolbar-group"><label htmlFor="region-select">REGION</label><div className="select-wrap"><MapPin size={16} /><select id="region-select" value={region} onChange={(event) => { setRegion(event.target.value as Region); setSelected(null); }}><option>All India</option><option>West India</option><option>North India</option><option>South India</option><option>East India</option></select><ChevronDown size={15} /></div></div>
            <div className="toolbar-group"><label htmlFor="window-select">TIME WINDOW</label><div className="select-wrap"><Clock3 size={16} /><select id="window-select" value={window} onChange={(event) => setWindow(event.target.value as Window)}><option>Next 1 hour</option><option>Next 3 hours</option><option>Next 6 hours</option></select><ChevronDown size={15} /></div></div>
            <div className="toolbar-group layer-group"><span className="toolbar-label">MAP LAYER</span><div className="layer-options" role="group" aria-label="Map layer">{(["Warnings", "Rainfall", "Wind"] as const).map((option) => <Button key={option} variant={layer === option ? "default" : "ghost"} size="sm" onClick={() => setLayer(option)} aria-pressed={layer === option}>{option}</Button>)}</div></div>
          </div>

          <div className="outlook-layout">
            <div className="map-panel">
              <div className="map-topline"><div><span className="section-kicker">NATIONAL VIEW</span><h3 className="font-display text-xl font-semibold">{layer === "Warnings" ? "Storm warning outlook" : layer === "Rainfall" ? "Rainfall outlook" : "Wind outlook"}</h3></div><span className="text-xs text-muted-foreground">{window} · {region}</span></div>
              <div className={`map-stage map-${layer.toLowerCase()}`}><div className="map-watermark">ARABIAN SEA</div><img src="/india-alert-map.svg" alt="Illustrative state-level India map showing sample orange and yellow warning regions" width={510} height={550} className="india-map" /><div className="map-watermark right">BAY OF BENGAL</div><div className="map-note">Indicative map for visual demonstration only.<br />Boundaries are illustrative.</div></div>
              <div className="map-legend"><span className="legend-title">KEY</span><span><i className="legend-swatch orange" /> Orange alert</span><span><i className="legend-swatch yellow" /> Yellow watch</span><span><i className="legend-swatch clear" /> No sample alert</span></div>
            </div>

            <aside id="alerts" className="alerts-panel"><div className="alerts-heading"><div><span className="section-kicker">LOCAL OUTLOOK</span><h3 className="font-display text-xl font-semibold">Regional alerts</h3></div><span className="alert-count">{visibleAlerts.length}</span></div>
              <div className="search-wrap"><Search size={17} /><input aria-label="Search locations" placeholder="Search a location" value={query} onChange={(event) => { setQuery(event.target.value); setSelected(null); }} /></div>
              <div className="alert-list">{visibleAlerts.length ? visibleAlerts.map((alert) => { const index = alerts.indexOf(alert); const Icon = alert.icon; return <div className="alert-row" key={alert.place}><Button variant="ghost" className="alert-trigger" onClick={() => setSelected(selected === index ? null : index)} aria-expanded={selected === index}><span className={`alert-symbol ${alert.level.startsWith("Orange") ? "orange" : "yellow"}`}><Icon size={19} /></span><span className="alert-copy"><span className="alert-place">{alert.place}</span><span className="alert-kind">{alert.kind}</span></span><ArrowRight size={16} className={`alert-arrow ${selected === index ? "rotate-90" : ""}`} /></Button>{selected === index && <div className="alert-detail"><span className={alert.level.startsWith("Orange") ? "severity orange-text" : "severity yellow-text"}>{alert.level}</span><p>{alert.detail}</p><span>Sample outlook · {window.toLowerCase()}</span></div>}</div>; }) : <div className="empty-state">No sample alerts match this location or region.</div>}</div>
              <div className="alerts-footer"><Info size={16} /><p>Alerts shown here are examples. Always check official warnings before making decisions.</p></div>
            </aside>
          </div>
          <div className="data-note"><Info size={16} /><span>This demonstration does not use live meteorological observations, forecasts or location tracking.</span></div>
        </section>

        <section id="safety" className="safety-section"><div className="site-container py-12 md:py-16"><div className="section-kicker">BE PREPARED</div><div className="safety-heading"><div><h2 className="font-display text-3xl font-semibold md:text-4xl">When storms approach</h2><p className="mt-3 text-sm text-muted-foreground">Simple steps can help you stay safe in changing weather.</p></div><a href="https://mausam.imd.gov.in/" target="_blank" rel="noreferrer" className="official-link">Visit official weather service <ExternalLink size={15} /></a></div><div className="safety-grid">{safety.map((item) => <div className="safety-item" key={item.title}><div className="safety-icon"><item.icon size={25} strokeWidth={1.7} /></div><h3 className="font-display text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></div>)}</div></div></section>
      </main>

      <footer className="footer"><div className="site-container flex flex-col justify-between gap-6 py-9 md:flex-row md:items-center"><div className="flex items-center gap-3"><div className="footer-mark"><CloudLightning size={20} /></div><div><div className="font-display text-lg font-bold">StormWatch India</div><div className="text-xs text-primary-foreground/65">An illustrative public weather interface</div></div></div><div className="max-w-xl text-xs leading-6 text-primary-foreground/70">This independent concept is not affiliated with or endorsed by any government agency. It is not an official forecast or emergency warning service.</div></div></footer>
    </div>
  );
}