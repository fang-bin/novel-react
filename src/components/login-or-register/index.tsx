import './index.less';
import React from 'react';

export default (props: any) => {
  return (
    <div className="home-page">
      <div className="form-box">
        { props.children }
      </div>
    </div>
  )
}