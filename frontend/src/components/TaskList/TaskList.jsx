import { TaskItem } from '../TaskItem';
import { useCarousel } from './useCarousel';
import { buildSlides, getActiveIndex } from './utils';

export const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const count = tasks.length;
  const { position, isAnimating, next, prev, goTo, handleTransitionEnd, swipeHandlers, pause, resume } =
    useCarousel(count);

  if (count === 0) {
    return (
      <div className="carousel-empty">
        <p>There is no tasks.</p>
      </div>
    );
  }

  const slides = buildSlides(tasks);
  const activeIndex = getActiveIndex(position, count);

  const trackStyle =
    count > 1
      ? {
          transform: `translateX(-${position * 100}%)`,
          transition: isAnimating ? 'transform 300ms ease' : 'none',
        }
      : undefined;

  return (
    <div className="carousel" onMouseEnter={pause} onMouseLeave={resume}>
      {count > 1 && (
        <button
          type="button"
          className="carousel__nav carousel__nav--prev"
          onClick={prev}
          aria-label="Previous task"
        >
          ‹
        </button>
      )}

      <div className="carousel__viewport" {...swipeHandlers}>
        <div className="carousel__track" style={trackStyle} onTransitionEnd={handleTransitionEnd}>
          {slides.map((task, index) => (
            <div className="carousel__slide" key={`${task.id}-${index}`}>
              <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <button
          type="button"
          className="carousel__nav carousel__nav--next"
          onClick={next}
          aria-label="Next task"
        >
          ›
        </button>
      )}

      {count > 1 && (
        <div className="carousel__footer">
          <div className="carousel__dots">
            {tasks.map((task, index) => (
              <button
                key={task.id}
                type="button"
                className={`carousel__dot ${index === activeIndex ? 'is-active' : ''}`}
                onClick={() => goTo(index)}
                aria-label={`Go to task ${index + 1}`}
              />
            ))}
          </div>
          <span className="carousel__counter">
            {activeIndex + 1} / {count}
          </span>
        </div>
      )}
    </div>
  );
}