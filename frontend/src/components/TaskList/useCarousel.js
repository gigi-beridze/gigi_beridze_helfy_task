import { useState, useEffect, useRef } from 'react';

export const useCarousel = (count) => {
  const [position, setPosition] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const slidingRef = useRef(false);
  const animatingRef = useRef(true);
  const dragStartX = useRef(null);
  animatingRef.current = isAnimating;

  const canMove = () => !slidingRef.current && animatingRef.current && count > 1;

  useEffect(() => {
    setPosition(count > 1 ? 1 : 0);
    setIsAnimating(true);
    slidingRef.current = false;
  }, [count]);

  useEffect(() => {
    if (count <= 1 || isPaused) return undefined;
    const timer = setInterval(() => {
      if (!canMove()) return;
      slidingRef.current = true;
      setPosition((p) => p + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [count, isPaused]);

  useEffect(() => {
    if (isAnimating) return undefined;
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsAnimating(true)),
    );
    return () => cancelAnimationFrame(frame);
  }, [isAnimating]);

  const move = (delta) => {
    if (!canMove()) return;
    slidingRef.current = true;
    setPosition((p) => p + delta);
  };

  const goTo = (realIndex) => {
    if (!canMove() || realIndex + 1 === position) return;
    slidingRef.current = true;
    setPosition(realIndex + 1);
  };

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (position === 0) {
      setIsAnimating(false);
      setPosition(count);
    } else if (position === count + 1) {
      setIsAnimating(false);
      setPosition(1);
    }
    slidingRef.current = false;
  };

  const swipeHandlers = {
    onPointerDown: (e) => {
      dragStartX.current = e.clientX;
    },
    onPointerUp: (e) => {
      if (dragStartX.current === null) return;
      const dx = e.clientX - dragStartX.current;
      dragStartX.current = null;
      if (dx <= -40) move(1);
      else if (dx >= 40) move(-1);
    },
    onPointerLeave: () => {
      dragStartX.current = null;
    },
  };

  return {
    position,
    isAnimating,
    next: () => move(1),
    prev: () => move(-1),
    goTo,
    handleTransitionEnd,
    swipeHandlers,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
  };
}
