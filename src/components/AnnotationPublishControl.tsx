import {
  Button,
  CancelIcon,
  GlobeIcon,
  GroupsIcon,
  LockFilledIcon,
  MenuExpandIcon,
} from '@hypothesis/frontend-shared';
import classnames from 'classnames';

import type { Group } from '../helpers/types';
import Menu from './Menu';
import MenuItem from './MenuItem';

export type AnnotationPublishControlProps = {
  /** The group this annotation or draft would publish to */
  group: Group;

  /**
   * Should the save button be disabled? Hint: it will be if the annotation has
   * no content
   */
  isDisabled?: boolean;

  /** Annotation or draft is "Only Me" */
  isPrivate: boolean;

  /** Callback for cancel button click */
  onCancel: () => void;

  /** Callback for save button click */
  onSave: () => void;

  /** Callback when privacy level is changed (publish to group vs. Only me) */
  onSetPrivate: (isPrivate: boolean) => void;
};

/**
 * Render a compound control button for publishing (saving) an annotation:
 * - Save the annotation — left side of button
 * - Choose sharing/privacy option - drop-down menu on right side of button
 *
 * @param {AnnotationPublishControlProps} props
 */
export default function AnnotationPublishControl({
  group,
  isDisabled,
  isPrivate,
  onCancel,
  onSave,
  onSetPrivate,
}: AnnotationPublishControlProps) {
  const menuLabel = (
    <div className="w-9 h-9 flex items-center justify-center text-color-text-inverted">
      <MenuExpandIcon className="w-4 h-4" />
    </div>
  );

  return (
    <div className="flex flex-row gap-x-3">
      <div className="flex relative">
        <Button
          classes={classnames(
            // Turn off right-side border radius to align with menu-open button
            'rounded-r-none',
          )}
          data-testid="publish-control-button"
          onClick={onSave}
          disabled={isDisabled}
          size="lg"
          variant="primary"
        >
          Post to {isPrivate ? 'Only Me' : group.name}
        </Button>
        {/* This wrapper div is necessary because of peculiarities with
             Safari: see https://github.com/hypothesis/client/issues/2302 */}
        <div
          className={classnames(
            // Round the right side of this menu-open button only
            'flex flex-row rounded-r bg-grey-7 hover:bg-grey-8',
          )}
        >
          <Menu
            containerPositioned={false}
            contentClass={classnames(
              // Ensure the menu is wide enough to "reach" the right-aligned
              // up-pointing menu arrow
              'min-w-full',
            )}
            label={menuLabel}
            menuIndicator={false}
            title="Change annotation sharing setting"
            align="left"
          >
            <MenuItem
              icon={group.type === 'open' ? GlobeIcon : GroupsIcon}
              label={group.name}
              isSelected={!isPrivate}
              onClick={() => onSetPrivate(false)}
            />
            <MenuItem
              icon={LockFilledIcon}
              label="Only Me"
              isSelected={isPrivate}
              onClick={() => onSetPrivate(true)}
            />
          </Menu>
        </div>
      </div>
      <div>
        <Button data-testid="cancel-button" onClick={onCancel} size="lg">
          <CancelIcon />
          Cancel
        </Button>
      </div>
    </div>
  );
}
