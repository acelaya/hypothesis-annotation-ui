import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import type { UsersForMentions } from './mention-suggestions';
import type { MentionMode } from './mentions';
import type { Annotation, Group } from './types';

export type AnnotationContextType = {
  /** Features affect how some pieces of UI look and behave */
  features: {
    atMentions: boolean;
    displayNamesEnabled: boolean;
    groupModeration: boolean;
    imageDescriptions: boolean;
  };

  flaggingEnabled?: boolean;
  sharingEnabled?: boolean;

  mentionMode: MentionMode;
  usersForMentions: UsersForMentions;

  tagSuggestions: string[];

  group: Group | null;
  authorName: string;
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

    onStartEdit?: () => void;
    onReply?: () => void;
    onFlag?: () => void;
    onDelete?: () => void;

    onAddTag?: (newTag: string) => void;
    onRemoveTag?: (tag: string) => boolean;
    onSetPrivate?: (isPrivate: boolean) => boolean;

    onCopyShareLink?: (options: { successfullyCopied: boolean }) => void;
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
