type NavigationRouteProp = {
  href: string;
  label: string;
};

type NavButtonProp = {
  route: NavigationRouteProp;
  isActive?: boolean;
};
