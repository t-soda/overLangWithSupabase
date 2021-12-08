import React, { forwardRef } from "react";

export const Item = forwardRef(
  ({ name, description, style, ...props }: any, ref) => {
    return (
      <div
        ref={ref}
        style={{
          display: "inline-block",
          backgroundColor: "#ddd",
          padding: ".5rem",
          height: "40px",
          margin: "0 1rem 1rem 0",
          ...style,
        }}
        {...props}
      >
        {props.id}
        <br />
        {description}
      </div>
    );
  }
);
