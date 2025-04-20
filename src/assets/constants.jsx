

import { chakra, Flex, Img, useColorModeValue } from "@chakra-ui/react";


export const NSLogO = () => (
  <Flex alignItems={"center"} gap={2}>
    <Img src="/icon.png" w={"30px"} h={"30px"} alt={"NS LOGO"} />
 <chakra.h1 fontWeight="extrabold" color={"blue.500"} fontSize="2xl" mt={2}>
    Social</chakra.h1>
  </Flex>
);
 

const IconWrapper = (props) => {
  const iconColor = useColorModeValue("blue.500", "white");
  return (
    <chakra.svg
      color={iconColor}
      height="6"
      width="6"
      role="img"
      viewBox="0 0 24 24"
      {...props}
    />
  );
};

// Search Icon
export const SearchLogo = () => (
  <IconWrapper aria-label="Search">
    <path
      d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <line
      x1="16.511"
      y1="16.511"
      x2="22"
      y2="22"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </IconWrapper>
);

// Reels Icon
export const ReelsLogo = () => (
  <IconWrapper aria-label="Reels">
    <line x1="2.049" y1="7.002" x2="21.95" y2="7.002" stroke="currentColor" strokeWidth="2" />
    <line x1="13.504" y1="2.001" x2="16.362" y2="7.002" stroke="currentColor" strokeWidth="2" />
    <line x1="7.207" y1="2.11" x2="10.002" y2="7.002" stroke="currentColor" strokeWidth="2" />
    <path
      d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945C4.546 21.303 5.704 22 8.552 22h6.896c2.848 0 4.006-.698 4.946-1.606C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.698 18.296 2 15.448 2H8.552C5.704 2 4.546 2.698 3.606 3.607 2.698 4.546 2 5.703 2 8.552Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
      fill="currentColor"
    />
  </IconWrapper>
);

// Messages Icon
export const MessagesLogo = () => (
  <IconWrapper aria-label="Messenger">
    <path
      d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.739"
    />
    <path
      d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
      fill="currentColor"
    />
  </IconWrapper>
);

// Notifications Icon
export const NotificationsLogo = () => (
  <IconWrapper aria-label="Notifications">
    <path
      d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </IconWrapper>
);

// Unlike (Heart Red)
export const UnlikeLogo = () => (
  <chakra.svg
    aria-label="Unlike"
    fill="rgb(255, 48, 64)"
    height="6"
    width="6"
    viewBox="0 0 48 48"
  >
    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
  </chakra.svg>
);

// Add Post Icon
export const CreatePostLogo = () => (
  <IconWrapper aria-label="New post">
    <path
      d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944C4.546 21.303 5.704 22 8.552 22h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552C5.704 2 4.546 2.698 3.606 3.607 2.698 4.546 2 5.703 2 8.552Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line x1="6.545" y1="12.001" x2="17.455" y2="12.001" stroke="currentColor" strokeWidth="2" />
    <line x1="12.003" y1="6.545" x2="12.003" y2="17.455" stroke="currentColor" strokeWidth="2" />
  </IconWrapper>
);

// Comment Icon
export const CommentLogo = () => (
  <IconWrapper aria-label="Comment">
    <path
      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </IconWrapper>
);
