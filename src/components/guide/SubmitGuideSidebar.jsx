import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import S from './GuideContents.styled';
import { flattenSubmitGuideToc } from '../../assets/data/guide';
import { useI18n } from '../../assets/i18n';

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
    return rect.top + scrollRoot.clientHeight * 0.28;
  }
  return window.innerHeight * 0.28;
};

const collectChildIds = (item) => {
  const ids = [];
  const walk = (nodes) => {
    nodes?.forEach((node) => {
      if (node.id) ids.push(node.id);
      if (node.children?.length) walk(node.children);
    });
  };
  walk(item.children);
  return ids;
};

const TocItems = ({
  items,
  depth,
  activeId,
  onNavigate,
  expandedMap,
  onToggleExpand,
}) => (
  <ul className={`toc-list depth-${depth}`}>
    {items.map((item) => {
      const hasChildren = Boolean(item.children?.length);
      const isExpandable = hasChildren && depth === 0;
      const isExpanded = isExpandable ? expandedMap[item.id] !== false : true;

      return (
        <li key={item.id} className="toc-item">
            <button
              type="button"
              className={`toc-link depth-${depth}${
                activeId === item.id ? ' active' : ''
              }${isExpandable ? ' is-expandable' : ''}`}
              onClick={() => {
                if (isExpandable) {
                  if (!isExpanded) onToggleExpand(item.id, true);
                }
                onNavigate(item.id);
              }}
            >
              <span className="toc-text">{item.title}</span>
              {isExpandable && (
                <span
                  className={`caret${isExpanded ? ' open' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpand(item.id);
                  }}
                  role="presentation"
                />
              )}
            </button>

          {hasChildren && isExpanded ? (
            <TocItems
              items={item.children}
              depth={depth + 1}
              activeId={activeId}
              onNavigate={onNavigate}
              expandedMap={expandedMap}
              onToggleExpand={onToggleExpand}
            />
          ) : null}
        </li>
      );
    })}
  </ul>
);

const SubmitGuideSidebar = ({ toc }) => {
  const { tf } = useI18n();
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState(toc[0]?.id || 'step1');
  const expandableIds = useMemo(
    () => toc.filter((item) => item.children?.length).map((item) => item.id),
    [toc]
  );
  const [expandedMap, setExpandedMap] = useState(() =>
    Object.fromEntries(expandableIds.map((id) => [id, true]))
  );
  const lockedIdRef = useRef(null);
  const scrollRootRef = useRef(null);
  const flatIds = flattenSubmitGuideToc(toc);

  const handleToggleExpand = useCallback((id, forceOpen) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: forceOpen === true ? true : !prev[id],
    }));
  }, []);

  const handleNavigate = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;

    setActiveId(id);
    const scrollRoot = scrollRootRef.current;
    const rootTop = getRootTop(scrollRoot);
    const targetTop = target.getBoundingClientRect().top;
    const alreadyThere = Math.abs(targetTop - rootTop) < 48;

    if (alreadyThere) {
      lockedIdRef.current = null;
      return;
    }

    lockedIdRef.current = id;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    expandableIds.forEach((id) => {
      const parent = toc.find((item) => item.id === id);
      if (!parent) return;
      const under =
        activeId === id || collectChildIds(parent).includes(activeId);
      if (under) {
        setExpandedMap((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
      }
    });
  }, [activeId, expandableIds, toc]);

  useEffect(() => {
    const sectionEls = flatIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sectionEls.length === 0) return undefined;

    const scrollRoot = getScrollRoot(sectionEls[0]);
    scrollRootRef.current = scrollRoot;
    const scrollTarget = scrollRoot || window;

    let ticking = false;

    const pickActiveId = () => {
      const locked = lockedIdRef.current;
      const markerY = getMarkerY(scrollRoot);
      const rootTop = getRootTop(scrollRoot);

      if (locked) {
        const target = document.getElementById(locked);
        if (target) {
          const reached =
            Math.abs(target.getBoundingClientRect().top - rootTop) < 48;
          setActiveId(locked);
          if (reached) lockedIdRef.current = null;
          ticking = false;
          return;
        }
        lockedIdRef.current = null;
      }

      let nextActive = flatIds[0];
      for (let i = sectionEls.length - 1; i >= 0; i -= 1) {
        if (sectionEls[i].getBoundingClientRect().top <= markerY + 12) {
          nextActive = flatIds[i];
          break;
        }
      }
      setActiveId(nextActive);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(pickActiveId);
      }
    };

    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    pickActiveId();

    return () => {
      scrollTarget.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [flatIds]);

  return (
    <S.SubmitGuideSidebar className={collapsed ? 'is-collapsed' : ''}>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setCollapsed((v) => !v)}
        aria-expanded={!collapsed}
        aria-label={
          collapsed
            ? tf('목차 펼치기', 'Expand table of contents')
            : tf('목차 접기', 'Collapse table of contents')
        }
        title={tf('목차', 'Table of contents')}
      >
        <span className="toggle-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {!collapsed && (
          <span className="toggle-label">{tf('목차', 'Contents')}</span>
        )}
      </button>

      {!collapsed && (
        <nav
          className="sidebar-nav"
          aria-label={tf('제출 가이드 목차', 'Submission guide contents')}
        >
          <TocItems
            items={toc}
            depth={0}
            activeId={activeId}
            onNavigate={handleNavigate}
            expandedMap={expandedMap}
            onToggleExpand={handleToggleExpand}
          />
        </nav>
      )}
    </S.SubmitGuideSidebar>
  );
};

export default SubmitGuideSidebar;
