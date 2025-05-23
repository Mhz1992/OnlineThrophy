type NavigationData = {
    title: string;
    url: string;
    icon?: ReactNode;
    hasTab?: boolean;
};

type NavigationClassName = {
    container: string;
    activeLink: string;
    link: string;
};

type NavigationLinkProps = {
    navLinks: NavigationData[];
    classNames?: Partial<NavigationClassName>;
};
