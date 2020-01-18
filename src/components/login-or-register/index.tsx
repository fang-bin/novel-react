import './index.less';
import React from 'react';

export default (props: any) => {
  const {
    className = '',
  } = props;
  return (
    <div className={`common-user-page ${className}`}>
      <div className="form-box">
        { props.children }
      </div>
    </div>
  )
}