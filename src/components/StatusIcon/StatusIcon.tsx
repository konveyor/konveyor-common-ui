import * as React from 'react';
import {
  CheckCircleIcon,
  WarningTriangleIcon,
  ExclamationCircleIcon,
} from '@patternfly/react-icons';
import {
  global_disabled_color_200 as disabledColor,
  global_success_color_100 as successColor,
  global_warning_color_100 as warningColor,
  global_danger_color_100 as dangerColor,
} from '@patternfly/react-tokens';

export enum StatusType {
  Ok = 'Ok',
  Warning = 'Warning',
  Error = 'Error',
}

export interface IStatusIconProps {
  status: StatusType;
  isDisabled?: boolean;
  className?: string;
}

export const StatusIcon: React.FunctionComponent<IStatusIconProps> = ({
  status,
  isDisabled,
  className = '',
}: IStatusIconProps) => {
  if (status === StatusType.Ok) {
    return (
      <CheckCircleIcon
        className={className}
        color={isDisabled ? disabledColor.value : successColor.value}
      />
    );
  }
  if (status === StatusType.Warning) {
    return (
      <WarningTriangleIcon
        className={className}
        color={isDisabled ? disabledColor.value : warningColor.value}
      />
    );
  }
  if (status === StatusType.Error) {
    return (
      <ExclamationCircleIcon
        className={className}
        color={isDisabled ? disabledColor.value : dangerColor.value}
      />
    );
  }
  return null;
};
