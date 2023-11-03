import { Inter } from "next/font/google";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import Draggable from "gsap/dist/Draggable";
import { gsapPlugins } from "gsap/dist/gsap";
import Contact from "@/components/contact";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  gsap.registerPlugin(ScrollTrigger, Draggable, gsapPlugins);
  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroller]");
    const sections = gsap.utils.toArray("section");
    const track = document.querySelector("[data-draggable]");
    const navLinks = gsap.utils.toArray("[data-link]");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    // Faire disparaitre .nav sur l'axe Y quand on scroll et que l'on arrive dans section_3
    gsap.to("nav", {
      scrollTrigger: {
        trigger: "#section_3",
        start: "top top",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none reverse",
      },
      opacity: 0,
    });

    // const colorsSection = document.querySelectorAll("section");

    // const colorTimeLine = gsap.timeline({ repeat: -1 });

    // sections.forEach((section, index) => {
    //   const colors = ["#ff0000", "#000000", "#808080", "#ffffff"];

    //   colorTimeLine.to(colorsSection, {
    //     backgroundColor: colors[index],
    //     scrollTrigger: {
    //       trigger: section,
    //       start: "top top",
    //       end: "bottom top",
    //       scrub: true,
    //       toggleActions: "play none none reverse",
    //     },
    //   });
    // });

    const lastItemWidth = () => navLinks[navLinks.length - 1].offsetWidth;

    const getUseableHeight = () =>
      document.documentElement.offsetHeight - window.innerHeight;

    const getDraggableWidth = () => {
      return track.offsetWidth * 0.5 - lastItemWidth();
    };

    const updatePosition = () => {
      const left = track.getBoundingClientRect().left * -1;
      const width = getDraggableWidth();
      const useableHeight = getUseableHeight();
      const y = gsap.utils.mapRange(0, width, 0, useableHeight, left);

      st.scroll(y);
    };

    const tl = gsap.timeline().to(track, {
      x: () => getDraggableWidth() * -1,
      ease: "none",
    });

    const st = ScrollTrigger.create({
      animation: tl,
      scrub: 0,
    });

    const draggableInstance = Draggable.create(track, {
      type: "x",
      inertia: true,
      bounds: {
        minX: 0,
        maxX: getDraggableWidth() * -1,
      },
      edgeResistance: 1,
      onDragStart: () => st.disable(),
      onDragEnd: () => st.enable(),
      onDrag: updatePosition,
      onThrowUpdate: updatePosition,
    });

    const initSectionAnimation = () => {
      /* Do nothing if user prefers reduced motion */
      if (prefersReducedMotion.matches) return;

      sections.forEach((section, index) => {
        const heading = section.querySelector("h2");
        const image = section.querySelector(".section__image");

        /* Set animation start state */
        gsap.set(heading, {
          opacity: 0,
          y: 50,
        });
        gsap.set(image, {
          opacity: 0,
          rotateY: 15,
        });

        /* Create the timeline */
        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: () => "top center",
            end: () => `+=${window.innerHeight}`,
            toggleActions: "play reverse play reverse",
            // toggleClass: 'is-active',
            // markers: true,
          },
        });

        /* Add tweens to the timeline */
        sectionTl
          .to(image, {
            opacity: 1,
            rotateY: -5,
            duration: 6,
            ease: "elastic",
          })
          .to(
            heading,
            {
              opacity: 1,
              y: 0,
              duration: 2,
            },
            0.5
          );

        /* Create a new timeline to add an active class to the nav link for the current section */
        const sectionTl2 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 20px",
            end: () => `bottom top`,
            toggleActions: "play none play reverse",
            onToggle: ({ isActive }) => {
              const sectionLink = navLinks[index];

              if (isActive) {
                sectionLink.classList.add("is-active");
              } else {
                sectionLink.classList.remove("is-active");
              }
            },
          },
        });
      });
    };

    initSectionAnimation();

    /* Allow navigation via keyboard */
    track.addEventListener("keyup", (e) => {
      const id = e.target.getAttribute("href");
      if (!id || e.key !== "Tab") return;

      const section = document.querySelector(id);
      const y = section.getBoundingClientRect().top + window.scrollY;

      st.scroll(y);
    });
  }, []);
  return (
    <>
      <Head>
        <title>AIDES</title>
        <meta name="description" content="Site web de la Cheeky Family" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <nav>
        <div className="marker"></div>

        <div className="nav__track" data-draggable>
          <ul className="nav__list">
            <li>
              <a href="#section_1" className="nav__link" data-link>
                <span>Hier</span>
              </a>
            </li>
            <li>
              <a href="#section_2" className="nav__link" data-link>
                <span>Aujourd'hui</span>
              </a>
            </li>
            <li>
              <a href="#section_3" className="nav__link" data-link>
                <span>Demain</span>
              </a>
            </li>
            <li>
              <a href="#section_4" className="nav__link" data-link>
                <span>1997</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="section_1" style={{ "--i": 0 }}>
          <div className="container">
            <h2 className="section__heading">
              <span className="first">Hier,</span>
              <span className="second">on ne savait pas quoi faire.</span>
            </h2>
            <div className="section__image">
              <img
                src="../assets/img/circle_1.png"
                width="1200"
                height="1200"
              />
            </div>
            <img
              className="alone__circle"
              src="../assets/img/circle_4.webp"
              width="1200"
              height="1200"
            />
          </div>
        </section>
        <section id="section_2" style={{ "--i": 1 }}>
          <div className="container">
            <h2 className="section__heading">
              <span className="first">Aujourd’hui, </span>
              <span className="second">on se réunit.</span>
            </h2>
            <div className="section__image">
              <img
                src="../assets/img/circle_2.png"
                width="1200"
                height="1200"
              />
            </div>
          </div>
        </section>
        <section id="section_3" style={{ "--i": 2 }}>
          <div className="container">
            <h2 className="section__heading">
              <span className="first">Demain, </span>
              <span className="second">on y aura mis fin.</span>
            </h2>
            <div className="section__image">
              <img
                src="../assets/img/circle_3.png"
                width="1200"
                height="1200"
              />
            </div>
          </div>
        </section>
        <section id="section_4" style={{ "--i": 3 }}>
          <div className="container__form">
            <div className="wrapper__content">
              <h3>Devenez acteurs de demain</h3>
              <img src="../assets/img/footer.jpg" width="1200" height="1200" />
            </div>
            <div className="wrapper__form">
              <Contact />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
