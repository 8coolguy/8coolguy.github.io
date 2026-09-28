"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPen } from "@fortawesome/free-solid-svg-icons";

const DEFAULT_INK = "#33424d";
const INK_COLORS = [
  { name: "Slate", value: "#33424d" },
  { name: "Red", value: "#d4473f" },
  { name: "Blue", value: "#3867c7" },
  { name: "Green", value: "#2f8a62" },
  { name: "Yellow", value: "#c28a22" },
];
const STORAGE_PREFIX = "paper-sketch:";
const BLOCKED_ELEMENTS = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "iframe",
  "img",
  "video",
  "svg",
  "pre",
  "details",
  "canvas:not(.paper-canvas)",
  "[contenteditable='true']",
].join(",");

function storageKey(pathname = window.location.pathname) {
  return `${STORAGE_PREFIX}${pathname}`;
}

function getPaperSize() {
  const content = Array.from(document.body.children).filter(
    (element) =>
      !element.matches(".paper-canvas, .paper-controls, [data-nextjs-portal]"),
  );
  const bounds = content.map((element) => element.getBoundingClientRect());

  return {
    width: Math.max(
      window.innerWidth,
      ...content.map((element, index) =>
        Math.max(element.scrollWidth, bounds[index].right + window.scrollX),
      ),
    ),
    height: Math.max(
      window.innerHeight,
      ...content.map((element, index) =>
        Math.max(element.scrollHeight, bounds[index].bottom + window.scrollY),
      ),
    ),
  };
}

function pointInside(rect, x, y, padding = 5) {
  return (
    x >= rect.left - padding &&
    x <= rect.right + padding &&
    y >= rect.top - padding &&
    y <= rect.bottom + padding
  );
}

function collectBlockedRects(canvas) {
  const rects = [];
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const addRect = (rect) => {
    if (rect.width || rect.height) {
      rects.push({
        left: rect.left + scrollX,
        right: rect.right + scrollX,
        top: rect.top + scrollY,
        bottom: rect.bottom + scrollY,
      });
    }
  };

  document.querySelectorAll(BLOCKED_ELEMENTS).forEach((element) => {
    if (element !== canvas && !element.closest("[data-paper-controls]")) {
      addRect(element.getBoundingClientRect());
    }
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, noscript, [data-paper-controls]")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  while (walker.nextNode()) {
    const range = document.createRange();
    range.selectNodeContents(walker.currentNode);
    Array.from(range.getClientRects()).forEach(addRect);
  }

  return rects;
}

function drawSegment(context, from, to) {
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();
}

export default function PaperCanvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const strokesRef = useRef([]);
  const pathnameRef = useRef(null);
  const activeStrokeRef = useRef(null);
  const lastPointRef = useRef(null);
  const blockedRectsRef = useRef([]);
  const frameRef = useRef(null);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(DEFAULT_INK);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const selectedColorRef = useRef(DEFAULT_INK);

  selectedColorRef.current = selectedColor;

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const ratio = window.devicePixelRatio || 1;
    const { width, height } = getPaperSize();
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.ceil(width * ratio);
    canvas.height = Math.ceil(height * ratio);

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 2.25;
    context.globalAlpha = 0.82;

    strokesRef.current.forEach((stroke) => {
      context.strokeStyle = stroke.color || DEFAULT_INK;
      stroke.segments.forEach((segment) => {
        for (let index = 1; index < segment.length; index += 1) {
          drawSegment(context, segment[index - 1], segment[index]);
        }
      });
    });
  }, []);

  const scheduleResize = useCallback(() => {
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(redraw);
  }, [redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    contextRef.current = canvas.getContext("2d");

    function loadDrawingForCurrentPath() {
      const currentPath = window.location.pathname;
      if (pathnameRef.current === currentPath) return;

      pathnameRef.current = currentPath;
      activeStrokeRef.current = null;
      lastPointRef.current = null;

      try {
        const saved = JSON.parse(
          window.sessionStorage.getItem(storageKey(currentPath)) || "[]",
        );
        strokesRef.current = Array.isArray(saved) ? saved : [];
      } catch {
        strokesRef.current = [];
      }

      setHasDrawing(strokesRef.current.length > 0);
      redraw();
    }

    let routeTimer;
    function schedulePathCheck() {
      loadDrawingForCurrentPath();
      routeTimer = window.setTimeout(loadDrawingForCurrentPath, 100);
    }

    loadDrawingForCurrentPath();

    const resizeObserver = new ResizeObserver(scheduleResize);
    const routeObserver = new MutationObserver(schedulePathCheck);
    resizeObserver.observe(document.documentElement);
    routeObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", scheduleResize);
    window.addEventListener("popstate", schedulePathCheck);
    document.addEventListener("click", schedulePathCheck, true);

    return () => {
      resizeObserver.disconnect();
      routeObserver.disconnect();
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("popstate", schedulePathCheck);
      document.removeEventListener("click", schedulePathCheck, true);
      window.cancelAnimationFrame(frameRef.current);
      window.clearTimeout(routeTimer);
    };
  }, [redraw, scheduleResize]);

  useEffect(() => {
    const canvas = canvasRef.current;

    function isBlocked(point) {
      return blockedRectsRef.current.some((rect) =>
        pointInside(rect, point.x, point.y),
      );
    }

    function pathIsBlocked(from, to) {
      const distance = Math.hypot(to.x - from.x, to.y - from.y);
      const steps = Math.ceil(distance / 4);

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        if (
          isBlocked({
            x: from.x + (to.x - from.x) * progress,
            y: from.y + (to.y - from.y) * progress,
          })
        ) {
          return true;
        }
      }

      return false;
    }

    function getPoint(event) {
      return {
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY,
      };
    }

    function handlePointerDown(event) {
      if (event.button !== 0 || event.isPrimary === false) return;
      if (event.target instanceof Element && event.target.closest("[data-paper-controls]")) {
        return;
      }

      blockedRectsRef.current = collectBlockedRects(canvas);
      const point = getPoint(event);
      if (isBlocked(point)) return;

      event.preventDefault();
      contextRef.current.strokeStyle = selectedColorRef.current;
      const stroke = { color: selectedColorRef.current, segments: [[point]] };
      strokesRef.current.push(stroke);
      activeStrokeRef.current = stroke;
      lastPointRef.current = point;
      setHasDrawing(true);
    }

    function handlePointerMove(event) {
      const stroke = activeStrokeRef.current;
      if (!stroke || (event.buttons & 1) !== 1) return;

      event.preventDefault();
      const point = getPoint(event);

      if (
        isBlocked(point) ||
        (lastPointRef.current && pathIsBlocked(lastPointRef.current, point))
      ) {
        lastPointRef.current = null;
        return;
      }

      if (!lastPointRef.current) {
        stroke.segments.push([point]);
        lastPointRef.current = point;
        return;
      }

      const segment = stroke.segments.at(-1);
      segment.push(point);
      drawSegment(contextRef.current, lastPointRef.current, point);
      lastPointRef.current = point;
    }

    function finishStroke() {
      if (!activeStrokeRef.current) return;

      activeStrokeRef.current = null;
      lastPointRef.current = null;
      try {
        window.sessionStorage.setItem(
          storageKey(),
          JSON.stringify(strokesRef.current),
        );
      } catch {
        // Drawing still works when storage is unavailable or full.
      }
    }

    window.addEventListener("pointerdown", handlePointerDown, { passive: false });
    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", finishStroke);
    window.addEventListener("pointercancel", finishStroke);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", finishStroke);
      window.removeEventListener("pointercancel", finishStroke);
    };
  }, []);

  function clearDrawing() {
    strokesRef.current = [];
    activeStrokeRef.current = null;
    lastPointRef.current = null;
    try {
      window.sessionStorage.removeItem(storageKey());
    } catch {
      // The in-memory drawing is already cleared.
    }
    setHasDrawing(false);
    redraw();
  }

  function selectColor(color) {
    setSelectedColor(color);
    setColorMenuOpen(false);
  }

  return (
    <>
      <canvas className="paper-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="paper-controls" data-paper-controls>
        <div className="paper-pen-control">
          <button
            type="button"
            className="paper-tool-button"
            onClick={() => setColorMenuOpen((open) => !open)}
            aria-label="Choose pen color"
            aria-expanded={colorMenuOpen}
            aria-haspopup="true"
            title="Choose pen color"
          >
            <FontAwesomeIcon
              className="paper-tool-icon"
              icon={faPen}
              style={{ color: selectedColor }}
              aria-hidden="true"
            />
          </button>
          {colorMenuOpen ? (
            <div className="paper-color-menu" role="group" aria-label="Pen colors">
              {INK_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className="paper-color-swatch"
                  onClick={() => selectColor(color.value)}
                  aria-label={`${color.name} pen color`}
                  aria-pressed={selectedColor === color.value}
                  title={color.name}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="paper-tool-button"
          onClick={clearDrawing}
          aria-label="Erase all drawing"
          title={hasDrawing ? "Erase all drawing" : "No drawing to erase"}
          disabled={!hasDrawing}
        >
          <FontAwesomeIcon className="paper-tool-icon" icon={faEraser} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
