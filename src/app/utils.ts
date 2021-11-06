import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const calculateScrollPercent = (element: HTMLElement) => {
  const { scrollTop, scrollHeight, clientHeight } = element;
  return (scrollTop / (scrollHeight - clientHeight)) * 100;
};

export const scrollBar = () => {
  return fromEvent(document, 'scroll').pipe(
    map(({ target }) =>
      calculateScrollPercent((target as Document).documentElement)
    )
  );
};

export const isMobile = (ua: string) => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
    ua
  );
};
