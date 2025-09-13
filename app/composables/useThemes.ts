import { getCookie } from 'h3';

export type Theme = 'light' | 'dark' | 'beige' | 'graphite';
const ALLOWED: Theme[] = ['light', 'beige', 'graphite', 'dark'];
const KEY = 'theme';

const isAllowed = (t: any): t is Theme => ALLOWED.includes(t as Theme);

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => {
    if (import.meta.server) {
      const event = useRequestEvent();
      const c = event ? getCookie(event, KEY) : null;
      if (c && isAllowed(c)) return c as Theme;
      return 'light';
    }

    const ls = localStorage.getItem(KEY);
    if (ls && isAllowed(ls)) return ls as Theme;

    const cookie = useCookie<Theme | null>(KEY).value;
    if (cookie && isAllowed(cookie)) return cookie;

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const apply = (t: Theme) => {
    const html = document.documentElement;
    html.setAttribute('data-theme', t);
    html.classList.toggle('dark', t === 'dark' || t === 'graphite');
  };

  if (import.meta.client) {
    const themeCookie = useCookie<Theme | null>(KEY, {
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 365,
      path: '/'
    });

    watch(
      theme,
      (t) => {
        localStorage.setItem(KEY, t);
        themeCookie.value = t;
        apply(t);
      },
      { immediate: true }
    );

    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(KEY);
      if (!stored) theme.value = e.matches ? 'dark' : 'light';
    };
    mq?.addEventListener?.('change', onChange);
    onBeforeUnmount(() => mq?.removeEventListener?.('change', onChange));
  }

  const nextTheme = () => {
    const list: Theme[] = ALLOWED;
    theme.value = list[(list.indexOf(theme.value) + 1) % list.length] as Theme;
  };

  return { theme, setTheme: (t: Theme) => (theme.value = t), nextTheme };
};
