import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 10px 24px;

  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `
        background: ${theme.secondary};
        `
      : `
        background: ${theme.primary};
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    `
        opacity: 0.4;
        cursor: not-allowed;
    `}

  ${({ isLoading }) =>
    isLoading &&
    `
        opacity: 0.8;
        cursor: not-allowed;
    `}

  ${({ flex }) =>
    flex &&
    `
        flex: 1;
    `}
`;

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
}) => {
  return (
    <StyledButton
      onClick={() => !isDisabled && !isLoading && onClick()}
      isDisabled={isDisabled}
      type={type}
      isLoading={isLoading}
      flex={flex}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;

// import { CircularProgress } from "@mui/material";
// import React from "react";
// import styled from "styled-components";

// // Destructure the props to avoid passing them to the DOM element
// const StyledButton = styled.div.attrs(({ isLoading, isDisabled, flex }) => ({
//   // These props will not be passed to the DOM element
//   isLoading: undefined,
//   isDisabled: undefined,
//   flex: undefined,
// }))`
//   border-radius: 10px;
//   color: white;
//   font-size: 14px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 6px;
//   height: min-content;
//   padding: 10px 24px;

//   @media (max-width: 600px) {
//     padding: 8px 12px;
//   }

//   ${({ type, theme }) =>
//     type === "secondary"
//       ? `
//         background: ${theme.secondary};
//         `
//       : `
//         background: ${theme.primary};
//     `}

//   ${({ isDisabled }) =>
//     isDisabled &&
//     `
//         opacity: 0.4;
//         cursor: not-allowed;
//     `}

//   ${({ isLoading }) =>
//     isLoading &&
//     `
//         opacity: 0.8;
//         cursor: not-allowed;
//     `}

//   ${({ flex }) =>
//     flex &&
//     `
//         flex: 1;
//     `}
// `;


// const Button = ({
//   text,
//   isLoading,
//   isDisabled,
//   rightIcon,
//   leftIcon,
//   type,
//   onClick,
//   flex,
// }) => {
//   return (
//     <StyledButton
//       onClick={() => !isDisabled && !isLoading && onClick()}
//       isDisabled={isDisabled}
//       type={type}
//       isLoading={isLoading}
//       flex={flex}
//     >
//       {isLoading && (
//         <CircularProgress
//           style={{ width: "18px", height: "18px", color: "inherit" }}
//         />
//       )}
//       {leftIcon}
//       {text}
//       {isLoading && <> . . .</>}
//       {rightIcon}
//     </StyledButton>
//   );
// };

// export default Button;
