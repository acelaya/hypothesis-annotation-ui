import { useMemo, useState } from 'preact/hooks';

import { useAnnotationContext } from '../helpers/AnnotationContext';
import {
  annotationRole,
  isPublic,
  isSaved,
  quote,
  shape,
} from '../helpers/annotation-metadata';
import type { Annotation, Draft } from '../helpers/types';
import AnnotationBody from './AnnotationBody';
import AnnotationEditor from './AnnotationEditor';
import AnnotationHeader from './AnnotationHeader';
import AnnotationQuote from './AnnotationQuote';

export type AnnotationProps = {
  annotation: Annotation;
};

export default function Annotation({ annotation }: AnnotationProps) {
  const { authorName, isHighlighted, isOrphan, isHovered, isSaving } =
    useAnnotationContext();
  const [draft, setDraft] = useState<Draft>({
    annotation,
    text: annotation.text,
    description: annotation.target[0]?.description,
    tags: annotation.tags,
    isPrivate: !isPublic(annotation),
  });

  const isEditing = !!draft && !isSaving;
  const annotationQuote = quote(annotation);
  const targetShape = useMemo(() => shape(annotation), [annotation]);

  const annotationDescription = isSaved(annotation)
    ? annotationRole(annotation)
    : `New ${annotationRole(annotation).toLowerCase()}`;
  const state = isHighlighted ? ' - Highlighted' : '';

  return (
    <div
      className="flex flex-col gap-y-4"
      aria-label={`${annotationDescription} by ${authorName}${state}`}
    >
      <AnnotationHeader annotation={annotation} />
      {targetShape &&
        // TODO <AnnotationThumbnail />
        null}
      {annotationQuote && (
        <AnnotationQuote
          quote={annotationQuote}
          isOrphan={isOrphan}
          isHovered={isHovered}
        />
      )}

      {!isEditing && <AnnotationBody annotation={annotation} />}
      {isEditing && <AnnotationEditor annotation={annotation} draft={draft} />}
    </div>
  );
}
