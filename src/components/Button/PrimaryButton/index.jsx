import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { shadows } from '../../../../styles/shadows'
import { Icon } from '../../Icon'
import { gap } from './gap'
import { iconSize } from './iconSize'
import { padding } from './padding'
import { textStyle } from './textStyle'

const getBgColor = (destructive) => {
  return destructive ? colors.error : colors[primaryColorKey]
}

export const PrimaryButton = ({
  size,
  icon = 'default',
  iconLeading,
  iconTrailing,
  iconVariant,
  iconOnlyMobile,
  destructive,
  state,
  disabled,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      icon={icon}
      size={size}
      disabled={disabled || state === 'disabled'}
      data-state={state}
      destructive={destructive}
      $iconOnlyMobile={iconOnlyMobile}
      {...rest}
    >
      {iconLeading && <Icon variant={iconVariant} />}
      {icon !== 'only' && <Content $iconOnlyMobile={iconOnlyMobile}>{children}</Content>}
      {iconTrailing && <Icon variant={iconVariant} />}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  --backgroundColor: ${(props) => getBgColor(props.destructive)['600']};

  display: flex;
  justify-content: center;
  align-items: center;
  ${gap};
  ${iconSize};
  ${textStyle};
  ${padding};
  cursor: pointer;

  color: ${colors.white};
  background-color: var(--backgroundColor);
  border: 1px solid var(--backgroundColor);
  border-radius: 8px;
  box-shadow: ${shadows.xs};

  &:disabled {
    --backgroundColor: ${(props) => getBgColor(props.destructive)['200']};
    cursor: not-allowed;
  }

  &:not(&:disabled) {
    &[data-state="hover"], :hover {
      --backgroundColor: ${(props) => getBgColor(props.destructive)['700']};
    }

    &[data-state="focussed"],
    :focus,
    :active,
    :focus-visible {
      --backgroundColor: ${(props) => getBgColor(props.destructive)['600']};

      outline: none;
      box-shadow: ${shadows.xs},
        0px 0px 0px 4px ${(props) => props.theme.isLightMode ? getBgColor(props.destructive)['100'] : getBgColor(props.destructive)['800']};
    }
  }

  transition: all 100ms ease-in;
  
  :hover {
    transform: scale(1.0125);
  }
`

const Content = styled.span`
  @media (max-width: 768px) {
    display: ${props => props.$iconOnlyMobile ? 'none' : 'inline'};
  }
`
