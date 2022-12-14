import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { shadows } from '../../../../styles/shadows'
import { utils } from '../../../../styles/utils'
import { Icon } from '../../Icon'
import { gap } from './gap'
import { iconSize } from './iconSize'
import { padding } from './padding'
import { textStyle } from './textStyle'

const getBgColor = (destructive) => {
  return destructive ? colors.error : colors.gray
}

export const SecondaryGrayButton = ({
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
      <Content $iconOnlyMobile={iconOnlyMobile} $icon={icon}>{children}</Content>
      {iconTrailing && <Icon variant={iconVariant} />}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  --borderColor: ${(props) => props.theme.isLightMode ? getBgColor(props.destructive)['300'] : getBgColor(props.destructive)['600']};
  --backgroundColor: ${(props) => props.theme.primaryBackgroundColor};

  display: flex;
  justify-content: center;
  align-items: center;
  ${gap};
  ${iconSize};
  ${textStyle};
  ${padding};
  cursor: pointer;

  color: ${(props) => props.theme.isLightMode ? getBgColor(props.destructive)['700'] : getBgColor(props.destructive)['50']};
  background-color: var(--backgroundColor);
  border: 1px solid var(--borderColor);
  border-radius: 8px;
  box-shadow: ${shadows.xs};

  &:disabled {
    color: ${(props) => props.theme.isLightMode ? getBgColor(props.destructive)['300'] : getBgColor(props.destructive)['300']};
    --borderColor: ${(props) => props.theme.isLightMode ? getBgColor(props.destructive)['200'] : getBgColor(props.destructive)['200']};
    cursor: not-allowed;
  }

  &:not(&:disabled) {
    &[data-state="hover"], :hover {
      color: ${(props) => props.theme.isLightMode ? getBgColor(props.destructive)['800'] : getBgColor(props.destructive)['100']};
      --backgroundColor: ${(props) => props.theme.isLightMode ? getBgColor(props.destructive)['50'] : getBgColor(props.destructive)['600']};
    }

    &[data-state="focussed"],
    :focus,
    :active,
    :focus-visible {
      --borderColor: ${(props) => props.theme.isLightMode ? getBgColor(props.destructive)['200'] : getBgColor(props.destructive)['600']};

      outline: none;
      box-shadow: ${shadows.xs},
        0px 0px 0px 4px ${(props) => props.theme.isLightMode ? getBgColor(props.destructive)['100'] : getBgColor(props.destructive)['700']};
    }
  }
`

const Content = styled.span`
  ${props => (props.$icon === 'only') && utils.srOnly};

  @media (max-width: 768px) {
    ${props => (props.$iconOnlyMobile) && utils.srOnly};
  }
`
