import { useState } from "react";
import { hotel, rooms, spaRituals } from "./data";

export default function SaltdriftHouseDemo() {
  const [activeRoomId, setActiveRoomId] = useState(rooms[0].id);
  const activeRoom = rooms.find((room) => room.id === activeRoomId) ?? rooms[0];

  return (
    <div className="saltdrift">
      <div className="saltdrift__haze" aria-hidden="true" />

      <nav className="saltdrift__nav" aria-label="Saltdrift House sections">
        <a className="saltdrift__hub" href="/">
          ← PoC hub
        </a>
        <strong className="saltdrift__brand-mark">{hotel.name}</strong>
        <div className="saltdrift__nav-links">
          <a href="#stay">Stay</a>
          <a href="#spa">Spa</a>
          <a href="#visit">Visit</a>
        </div>
      </nav>

      <header className="saltdrift__hero">
        <img
          alt="Coastal boutique hotel overlooking a quiet bay"
          className="saltdrift__hero-image"
          src={hotel.heroImage}
        />
        <div className="saltdrift__hero-veil" aria-hidden="true" />
        <div className="saltdrift__hero-content">
          <p className="saltdrift__brand">{hotel.name}</p>
          <h1>{hotel.tagline}</h1>
          <p className="saltdrift__hero-blurb">{hotel.blurb}</p>
          <div className="saltdrift__hero-actions">
            <a className="saltdrift__button" href="#visit">
              Reserve a stay
            </a>
            <a className="saltdrift__text-link" href="#spa">
              Explore the spa
            </a>
          </div>
        </div>
      </header>

      <section className="saltdrift__section saltdrift__stay" id="stay">
        <div className="saltdrift__section-heading">
          <span className="saltdrift__eyebrow">Stay</span>
          <h2>Rooms made for slow mornings.</h2>
          <p>
            Pale textiles, quiet corners, and windows that keep the sea close
            without asking for attention.
          </p>
        </div>

        <div className="saltdrift__room-layout">
          <div
            className="saltdrift__room-tabs"
            role="tablist"
            aria-label="Room types"
          >
            {rooms.map((room) => (
              <button
                key={room.id}
                aria-selected={activeRoomId === room.id}
                className={
                  activeRoomId === room.id
                    ? "saltdrift__room-tab saltdrift__room-tab--active"
                    : "saltdrift__room-tab"
                }
                onClick={() => setActiveRoomId(room.id)}
                role="tab"
                type="button"
              >
                <span>{room.name}</span>
                <small>{room.summary}</small>
              </button>
            ))}
          </div>

          <article className="saltdrift__room-feature" role="tabpanel">
            <figure className="saltdrift__room-media">
              <img alt={activeRoom.name} src={activeRoom.imageUrl} />
            </figure>
            <div className="saltdrift__room-copy">
              <h3>{activeRoom.name}</h3>
              <p>{activeRoom.detail}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="saltdrift__section saltdrift__spa" id="spa">
        <div className="saltdrift__spa-copy">
          <span className="saltdrift__eyebrow">Spa</span>
          <h2>Rituals that leave salt on the skin and quiet in the mind.</h2>
          <p>
            The spa is small on purpose. A few treatments, generous time, and
            rooms that smell faintly of mineral water and warm linen.
          </p>

          <ul className="saltdrift__ritual-list">
            {spaRituals.map((ritual) => (
              <li key={ritual.id} className="saltdrift__ritual">
                <div>
                  <h3>{ritual.name}</h3>
                  <p>{ritual.description}</p>
                </div>
                <span>{ritual.duration}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="saltdrift__spa-media">
          <img
            alt="Calm spa treatment room with soft natural light"
            src={hotel.spaImage}
          />
        </figure>
      </section>

      <section className="saltdrift__section saltdrift__coast" id="coast">
        <figure className="saltdrift__coast-media">
          <img
            alt="Soft coastal shoreline with pale sand and calm water"
            src={hotel.coastImage}
          />
        </figure>
        <div className="saltdrift__coast-copy">
          <span className="saltdrift__eyebrow">The coast</span>
          <h2>A headland house between sea mist and slow light.</h2>
          <p>{hotel.about}</p>
        </div>
      </section>

      <section className="saltdrift__section saltdrift__visit" id="visit">
        <div className="saltdrift__visit-copy">
          <span className="saltdrift__eyebrow">Visit</span>
          <h2>Come for a few quiet nights.</h2>
          <p>
            Tell us when you would like to arrive. We keep the house small, so
            every stay can feel unhurried.
          </p>

          <address className="saltdrift__address">
            {hotel.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
            <a href={`tel:${hotel.phone.replace(/[^\d+]/g, "")}`}>
              {hotel.phone}
            </a>
          </address>

          <a className="saltdrift__button" href={`mailto:${hotel.email}`}>
            Enquire to reserve
          </a>
        </div>
      </section>

      <footer className="saltdrift__footer">
        <strong>{hotel.name}</strong>
        <span>A fictional boutique hotel and spa PoC for poc.stanho.dev</span>
        <a href="/">← PoC hub</a>
      </footer>
    </div>
  );
}
