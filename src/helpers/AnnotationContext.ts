import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import { MentionMode } from './mentions';
import { Annotation, Draft, Group } from './types';

export type AnnotationContextType = {
  /** Features affect how some pieces of UI look and behave */
  features: {
    atMentions: boolean;
    displayNamesEnabled: boolean;
    groupModeration: boolean;
  };

  /**
   * Represents contextual information for the annotation, like extended
   * information of the group it belongs to, if any.
   */
  group: Group | null;
  mentionMode: MentionMode;

  isReply: boolean;
  isHighlighted: boolean;
  isOrphan: boolean;
  isHovered: boolean;
  isSaving: boolean;

  events?: {
    /**
     * Invoked after saving the annotation.
     * The annotation editor will not be available if not provided.
     */
    onSave?: (annotation: Annotation) => void;

    /** Invoked when cancelling the annotation edition */
    onCancel?: () => void;

    onSetPrivate?: (isPrivate: boolean) => void;
    onEditDescription?: (description: string) => void;

    onAddTag?: (newTag: string) => void;

    /** Invoked when a tag is removed */
    onRemoveTag?: (tag: string) => boolean;
  };
};

export const AnnotationContext = createContext<AnnotationContextType | null>(
  null,
);

export const AnnotationContextProvider = AnnotationContext.Provider;

export function useAnnotationContext(): AnnotationContextType {
  const context = useContext(AnnotationContext);
  if (!context) {
    throw new Error(
      'AnnotationCards can only be used inside an AnnotationContext',
    );
  }

  return context;
}
