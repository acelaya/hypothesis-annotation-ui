## Components

### AnnotationCard

Used to render a single annotation in isolation.

```tsx
import { AnnotationCard, AnnotationContextProvider } from '@hypothesis/...';

return (
  <AnnotationContextProvider value={...}>
    <AnnotationCard annotation={annotation} />
  </AnnotationContextProvider>
);
```

### ThreadCard

Used to render a thread of annotations.

```tsx
import { AnnotationContextProvider, ThreadCard } from '@hypothesis/...';

return (
  <AnnotationContextProvider value={...}>
    <ThreadCard {...} />
  </AnnotationContextProvider>
);
```
