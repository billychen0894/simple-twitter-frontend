import { NavLink } from 'react-router-dom';
import classnames from 'classnames/bind';

import styles from 'shared/components/UIElements/Button.module.scss';

function Button({
  type,
  href,
  to,
  children,
  onClick,
  disabled,
  inverse,
  className,
  state,
  replace,
}) {
  const cx = classnames.bind(styles);
  const classNames = cx({
    button: true,
    buttonInverse: inverse,
  });

  if (href) {
    return (
      <a className={`${classNames} ${className}`} href={href}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <NavLink
        to={to}
        className={`${classNames} ${className}`}
        state={state}
        onClick={onClick}
        end
        replace={replace}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button
      className={`${classNames} ${className}`}
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
