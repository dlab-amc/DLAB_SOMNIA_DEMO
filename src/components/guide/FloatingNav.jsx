import { useCallback, useEffect, useRef } from 'react';
import S from './GuideContents.styled';

const getScrollRoot = (el) => {
  let parent = el?.parentElement;
  while (parent) {
    const { overflowY } = window.getComputedStyle(parent);
    if (
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      parent.scrollHeight > parent.clientHeight
    ) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
};

const getRootTop = (scrollRoot) =>
  scrollRoot ? scrollRoot.getBoundingClientRect().top : 0;

const getMarkerY = (scrollRoot) => {
  if (scrollRoot) {
    const rect = scrollRoot.getBoundingClientRect();
    return rect.top + scrollRoot.clientHeight * 0.32;
  }
  return window.innerHeight * 0.32;
};

const FloatingNav = ({ links, currentIndex, setCurrentIndex }) => {
  const lockedIndexRef = useRef(null);
  const scrollRootRef = useRef(null);

  const handleNavClick = useCallback(
    (index, linkId) => {
      setCurrentIndex(index);

      const targetSection = document.getElementById(linkId);
      if (!targetSection) return;

      const scrollRoot = scrollRootRef.current;
      const rootTop = getRootTop(scrollRoot);
      const targetTop = targetSection.getBoundingClientRect().top;
      const alreadyThere = Math.abs(targetTop - rootTop) < 48;

      if (alreadyThere) {
        lockedIndexRef.current = null;
        return;
      }

      lockedIndexRef.current = index;
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    [setCurrentIndex]
  );

  useEffect(() => {
    const sectionEls = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);
    if (sectionEls.length === 0) return undefined;

    const scrollRoot = getScrollRoot(sectionEls[0]);
    scrollRootRef.current = scrollRoot;
    const scrollTarget = scrollRoot || window;

    let ticking = false;

    const pickActiveIndex = () => {
      const locked = lockedIndexRef.current;
      const markerY = getMarkerY(scrollRoot);
      const rootTop = getRootTop(scrollRoot);

      if (locked !== null) {
        const target = sectionEls[locked];
        if (target) {
          const reached =
            Math.abs(target.getBoundingClientRect().top - rootTop) < 48;
          setCurrentIndex(locked);
          if (reached) {
            lockedIndexRef.current = null;
          }
          ticking = false;
          return;
        }
        lockedIndexRef.current = null;
      }

      let activeIndex = 0;
      for (let i = sectionEls.length - 1; i >= 0; i -= 1) {
        if (sectionEls[i].getBoundingClientRect().top <= markerY + 12) {
          activeIndex = i;
          break;
        }
      }

      setCurrentIndex(activeIndex);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(pickActiveIndex);
      }
    };

    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    pickActiveIndex();

    return () => {
      scrollTarget.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [links, setCurrentIndex]);

  return (
    <S.FloatingNav>
      {links &&
        links.map((link, index) => (
          <div
            className={`link${index === currentIndex ? ' active' : ''}`}
            key={link.id || index}
            onClick={() => handleNavClick(index, link.id)}
          >
            {link.title}
          </div>
        ))}
    </S.FloatingNav>
  );
};

export default FloatingNav;
